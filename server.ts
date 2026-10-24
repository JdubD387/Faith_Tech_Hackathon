import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import {
  parseFlexibleAddressAndChurch,
  normalizeDenomination,
  inferStateFromZip,
  detectLanguageFromText,
  STATE_NAME_AND_TYPO_MAP,
} from './src/utils/addressParser';
import { LanguageCode, SUPPORTED_LANGUAGES } from './src/i18n/translations';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Post-process and normalize any extracted fields from either Gemini or heuristic parser
function postProcessExtractedFields(
  rawExtracted: Record<string, any>,
  current: Record<string, any> = {}
): Record<string, any> {
  const cleaned: Record<string, any> = {};

  for (const [k, v] of Object.entries(rawExtracted || {})) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'string' && v.trim() === '') continue;
    cleaned[k] = typeof v === 'string' ? v.trim() : v;
  }

  // Normalize state if full name or typo was returned
  if (typeof cleaned.state === 'string' && cleaned.state.length > 2) {
    const mapped = STATE_NAME_AND_TYPO_MAP[cleaned.state.toLowerCase()];
    if (mapped) {
      cleaned.state = mapped;
    }
  } else if (typeof cleaned.state === 'string' && cleaned.state.length === 2) {
    cleaned.state = cleaned.state.toUpperCase();
  }

  // Infer state from US ZIP if state is still missing
  const activeZip = cleaned.zipCode || current.zipCode;
  if (!cleaned.state && !current.state && typeof activeZip === 'string') {
    const inferred = inferStateFromZip(activeZip);
    if (inferred) {
      cleaned.state = inferred;
    }
  }

  // Normalize denomination to match form select options
  if (typeof cleaned.denomination === 'string') {
    const normDenom = normalizeDenomination(cleaned.denomination);
    if (normDenom) {
      cleaned.denomination = normDenom;
    }
  }

  // Default country to United States if US state or US zip is present and country isn't set
  if ((cleaned.state || cleaned.zipCode) && !cleaned.country && !current.country) {
    cleaned.country = 'United States';
  }

  return cleaned;
}

// API endpoint to process conversational registration messages
app.post('/api/assistant', async (req, res) => {
  try {
    const {
      message,
      formState = {},
      chatHistory = [],
      visibleFields = [],
      language = 'en',
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Detect if the user switched language naturally in their message
    const heuristicLang = detectLanguageFromText(message) as LanguageCode | null;
    const effectiveLanguage: LanguageCode = heuristicLang || (language as LanguageCode) || 'en';
    const langMeta =
      SUPPORTED_LANGUAGES.find((l) => l.code === effectiveLanguage) || SUPPORTED_LANGUAGES[0];

    // Always compute the flexible heuristic extraction first as a fast, deterministic baseline
    const heuristicResult = getHeuristicResponse(message, formState, effectiveLanguage);

    if (!ai) {
      return res.json({
        ...heuristicResult,
        detectedLanguage: heuristicLang || effectiveLanguage,
      });
    }

    const systemInstruction = `
You are Baptize The World AI, an empathetic, conversational, multilingual registration assistant for an international church gathering.
Your role is to guide church leaders, coordinators, and volunteers around the world through registering their church.

### MULTILINGUAL INSTRUCTION (CRITICAL):
- The user's selected/active language is: **${langMeta.name} (${langMeta.nativeName}, code: "${effectiveLanguage}")**.
- If the user writes their message in a different language (e.g. Spanish, Portuguese, French, Korean, Chinese, Tagalog, German, Arabic, Swahili, or English), respond in the language the user is speaking and set \`detectedLanguage\` to the 2-letter code ('en', 'es', 'pt', 'fr', 'ko', 'zh', 'tl', 'de', 'ar', 'sw'). Otherwise respond in **${langMeta.name} (${langMeta.nativeName})** and set \`detectedLanguage\` to "${effectiveLanguage}".
- Both \`aiResponse\` and \`suggestedQuickReplies\` MUST be written naturally in that target language!
- However, internal schema values in \`extractedFields\` MUST use standard canonical values:
  * \`coordinatorRole\`: "self" or "someone_else"
  * \`mapVisibility\`: "public" or "hidden"
  * \`arrivalTimeAmPm\`: "AM" or "PM"
  * \`denomination\`: Map to one of ["Non-denominational / Independent", "Baptist", "Methodist / Wesleyan", "Presbyterian / Reformed", "Pentecostal / Charismatic", "Lutheran", "Anglican / Episcopal", "Evangelical Free", "Assemblies of God", "Calvary Chapel", "Catholic", "Other Christian Tradition"]

### KEY EXTRACTION & CONVERSATION PRINCIPLES:
1. ULTRA-FLEXIBLE, TYPO-TOLERANT INTERNATIONAL ADDRESS & FIELD EXTRACTION:
   - Users enter domestic and international addresses with NO commas, all lowercase, typos in street names/suffixes/states, dashes or slashes instead of commas, missing ZIP/postal codes, or out-of-order components.
   - Automatically fix obvious spelling mistakes in street suffixes (e.g. "avnue" -> "Ave.", "strt" -> "St.", "boulvard" -> "Blvd."), city names, and state/province names (convert "California", "Cali", "Californa" -> "CA").
   - If the user provides only PART of the address (e.g. just the street "106 E Shields Ave", or just "Fresno CA 93704"), extract the fields they provided and ONLY ask for the remaining missing pieces! NEVER re-ask for the church name or street address if it is already provided.
   - If user provides combined contact information (e.g. "Pastor Mark Davis, pastor@gracechurch.org, 559-555-1234"), extract all 3 fields at once.
   - If a 5-digit US ZIP code is provided without a state, infer the 2-letter US state from the ZIP code.
   - If user mentions an arrival time like "9:30 AM", "a las 9:30 de la mañana", "오전 9시 30분", parse into:
     - arrivalTimeHour: "9"
     - arrivalTimeMinute: "30"
     - arrivalTimeAmPm: "AM" (or "PM")

2. CRITICAL SAFEGUARD - ZERO AUTO-DECISION ON SENSITIVE CHOICES:
   You MUST NEVER automatically decide, assume, or check off the following without explicit user response:
   - coordinatorRole ("self" vs "someone_else")
   - mapVisibility ("public" vs "hidden")
   - privacyConsent: Data processing consent. Ask the user if they consent to Baptize The World securely storing and processing their church registration data in accordance with the Privacy Policy.
   - CRITICAL REQUIREMENT ON COMMITMENTS: Participation Commitments (Host Orientation, Volunteer Welcomers, Code of Conduct) will be asked for at a later time closer to the gathering. Do NOT ask for participation commitments now — Privacy Consent is the ONLY consent the AI should ask for!
   - finalConfirmation: Only confirmed when validating the form.

3. DYNAMIC FORM ADAPTATION & COORDINATOR EXTRACTION:
   - If the user specifies or names another person as coordinator in any language:
     * Set coordinatorRole: "someone_else"
     * Set coordinatorName: the person's full name
     * Set coordinatorEmail: their email if provided
     * Set coordinatorPhone: their phone if provided
   - If the user says they will coordinate themselves:
     * Set coordinatorRole: "self"

Current formState (including already extracted values):
${JSON.stringify({ ...formState, ...heuristicResult.extractedFields }, null, 2)}

Active visible fields:
${JSON.stringify(visibleFields)}
`;

    // Race Gemini API call with ThinkingLevel.LOW for fast ~1s responses
    const geminiCall = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Target Language: ${langMeta.name} (${effectiveLanguage})\nConversation so far:\n${chatHistory.map((m: any) => `${m.role}: ${m.content}`).join('\n')}\n\nUser's latest message:\n"${message}"`,
            },
          ],
        },
      ],
      config: {
        systemInstruction,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            extractedFields: {
              type: Type.OBJECT,
              properties: {
                fullName: { type: Type.STRING },
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                churchName: { type: Type.STRING },
                country: { type: Type.STRING },
                address: { type: Type.STRING },
                city: { type: Type.STRING },
                state: { type: Type.STRING },
                zipCode: { type: Type.STRING },
                website: { type: Type.STRING },
                denomination: { type: Type.STRING },
                arrivalTimeHour: { type: Type.STRING },
                arrivalTimeMinute: { type: Type.STRING },
                arrivalTimeAmPm: { type: Type.STRING },
                coordinatorRole: { type: Type.STRING },
                coordinatorName: { type: Type.STRING },
                coordinatorEmail: { type: Type.STRING },
                coordinatorPhone: { type: Type.STRING },
                mapVisibility: { type: Type.STRING },
                commitmentOrientation: { type: Type.BOOLEAN },
                commitmentVolunteers: { type: Type.BOOLEAN },
                commitmentCodeOfConduct: { type: Type.BOOLEAN },
                privacyConsent: { type: Type.BOOLEAN },
                smsUpdates: { type: Type.BOOLEAN },
                finalConfirmation: { type: Type.BOOLEAN },
              },
              description: 'Fields extracted or updated from user message',
            },
            aiResponse: {
              type: Type.STRING,
              description: 'Conversational response in the target language',
            },
            suggestedQuickReplies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 4 quick action pills in the target language',
            },
            fieldHighlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Field names that were updated',
            },
            isReadyForReview: {
              type: Type.BOOLEAN,
              description: 'Whether all required fields are now filled',
            },
            detectedLanguage: {
              type: Type.STRING,
              description: '2-letter language code of user message (en, es, pt, fr, ko, zh, tl, de, ar, sw)',
            },
          },
          required: ['extractedFields', 'aiResponse', 'suggestedQuickReplies', 'fieldHighlights', 'isReadyForReview'],
        },
      },
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gemini timeout fallback')), 8000)
    );

    const response: any = await Promise.race([geminiCall, timeoutPromise]);
    const text = response.text || '{}';
    const parsed = JSON.parse(text);

    // Merge heuristic + Gemini extracted fields so neither misses anything
    const mergedExtracted = postProcessExtractedFields(
      {
        ...heuristicResult.extractedFields,
        ...(parsed.extractedFields || {}),
      },
      formState
    );

    const mergedHighlights = Array.from(
      new Set([
        ...heuristicResult.fieldHighlights,
        ...(parsed.fieldHighlights || []),
        ...Object.keys(mergedExtracted),
      ])
    );

    const combined = { ...formState, ...mergedExtracted };
    const isReady = computeIsReady(combined);

    return res.json({
      extractedFields: mergedExtracted,
      aiResponse: parsed.aiResponse || heuristicResult.aiResponse,
      suggestedQuickReplies:
        parsed.suggestedQuickReplies && parsed.suggestedQuickReplies.length > 0
          ? parsed.suggestedQuickReplies
          : heuristicResult.suggestedQuickReplies,
      fieldHighlights: mergedHighlights,
      isReadyForReview: isReady,
      detectedLanguage: heuristicLang || parsed.detectedLanguage || effectiveLanguage,
    });
  } catch (error) {
    console.error('Gemini assistant processing notice (using responsive fallback):', error);
    const reqLang = (detectLanguageFromText(req.body.message) || req.body.language || 'en') as LanguageCode;
    const fallback = getHeuristicResponse(req.body.message, req.body.formState, reqLang);
    return res.json({
      ...fallback,
      detectedLanguage: reqLang,
    });
  }
});

function computeIsReady(combined: Record<string, any>): boolean {
  return Boolean(
    combined.fullName &&
      combined.email &&
      combined.phone &&
      combined.churchName &&
      combined.address &&
      combined.city &&
      combined.state &&
      combined.denomination &&
      combined.arrivalTimeHour &&
      combined.coordinatorRole &&
      (combined.coordinatorRole !== 'someone_else' || (combined.coordinatorName && combined.coordinatorEmail)) &&
      combined.mapVisibility &&
      combined.privacyConsent
  );
}

// Localized prompt helper for deterministic heuristic responses across all 10 languages
function getLocalizedNextStep(
  step:
    | 'contact'
    | 'churchAndAddress'
    | 'churchOnly'
    | 'addressOnly'
    | 'cityState'
    | 'denomination'
    | 'arrivalTime'
    | 'coordinatorRole'
    | 'coordinatorDetails'
    | 'mapVisibility'
    | 'privacyConsent'
    | 'ready',
  lang: LanguageCode,
  combined: Record<string, any>
): { nextQ: string; quickReplies: string[] } {
  const firstName = (combined.fullName || '').split(' ')[0] || '';
  const church = combined.churchName || '';
  const addr = combined.address || '';

  if (lang === 'es') {
    switch (step) {
      case 'contact':
        return {
          nextQ: 'Para comenzar, ¿cuál es tu nombre completo, correo electrónico y número de teléfono móvil?',
          quickReplies: ['Pastor Carlos Mendoza, carlos@iglesia.org, (559) 555-0192', 'Soy el contacto principal'],
        };
      case 'churchAndAddress':
        return {
          nextQ: `¡Mucho gusto, ${firstName}! ¿Cuál es el nombre de tu iglesia y su dirección completa? (Puedes escribirla en cualquier formato).`,
          quickReplies: ['Iglesia Gracia, 106 E. Shields Ave., Fresno, CA 93704', 'Calvary Chapel 1200 Church St Austin TX 78701'],
        };
      case 'churchOnly':
        return {
          nextQ: `¡Tengo la dirección (${addr})! ¿Cuál es el nombre de tu iglesia?`,
          quickReplies: ['Iglesia Comunidad de Gracia', 'Calvary Chapel', 'Iglesia Nueva Vida'],
        };
      case 'addressOnly':
        return {
          nextQ: `¡Entendido — ${church}! ¿Cuál es la dirección (calle, ciudad y estado/región) de la iglesia?`,
          quickReplies: ['106 E. Shields Ave., Fresno, CA 93704', '1200 Church St, Austin, TX 78701'],
        };
      case 'cityState':
        return {
          nextQ: `Tengo a ${church} en ${addr}. ¿En qué ciudad y estado o provincia se encuentra?`,
          quickReplies: ['Fresno, CA 93704', 'Austin, TX 78701', 'Ciudad de México, CDMX'],
        };
      case 'denomination':
        return {
          nextQ: '¿Qué denominación o afiliación cristiana describe mejor a tu congregación?',
          quickReplies: ['No denominacional', 'Bautista', 'Metodista', 'Presbiteriana', 'Pentecostal'],
        };
      case 'arrivalTime':
        return {
          nextQ: '¿A qué hora planean llegar al evento? (Por ejemplo: 9:30 AM o 10:00 AM)',
          quickReplies: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
        };
      case 'coordinatorRole':
        return {
          nextQ: '¿Serás tú personalmente el coordinador del evento para tu iglesia, o coordinará otra persona?',
          quickReplies: ['Yo soy el coordinador', 'Otra persona'],
        };
      case 'coordinatorDetails':
        return {
          nextQ: 'Por favor proporciona el nombre completo, correo electrónico y teléfono del coordinador designado.',
          quickReplies: ['Elena Morales, elena@iglesia.org, 559-555-8822'],
        };
      case 'mapVisibility':
        return {
          nextQ: '¿Te gustaría que la ubicación de tu iglesia aparezca en el mapa público del evento, o prefieres mantenerla oculta/privada?',
          quickReplies: ['Mostrar en mapa público', 'Mantener ubicación oculta'],
        };
      case 'privacyConsent':
        return {
          nextQ: 'Por último, ¿das tu consentimiento para que Baptize The World almacene y procese de forma segura los datos de registro de tu iglesia conforme a nuestra Política de Privacidad? (Los compromisos de participación se confirmarán más adelante).',
          quickReplies: ['Sí, doy mi consentimiento', 'Acepto la política de privacidad'],
        };
      case 'ready':
        return {
          nextQ: '¡Hemos recopilado toda la información requerida! Ahora te muestro el formulario completo para que lo revises y confirmes.',
          quickReplies: ['Validar Formulario Ahora', 'Enviar Registro'],
        };
    }
  }

  if (lang === 'pt') {
    switch (step) {
      case 'contact':
        return {
          nextQ: 'Para começar, qual é o seu nome completo, e-mail e número de celular?',
          quickReplies: ['Pastor Lucas Silva, lucas@igreja.org, (559) 555-0192', 'Sou o contato principal'],
        };
      case 'churchAndAddress':
        return {
          nextQ: `Prazer em conhecê-lo, ${firstName}! Qual é o nome da sua igreja e o endereço completo?`,
          quickReplies: ['Igreja da Graça, 106 E. Shields Ave., Fresno, CA 93704', 'Calvary Chapel 1200 Church St Austin TX 78701'],
        };
      case 'churchOnly':
        return {
          nextQ: `Anotei o endereço (${addr})! Qual é o nome da sua igreja?`,
          quickReplies: ['Igreja Comunidade da Graça', 'Calvary Chapel', 'Igreja Nova Vida'],
        };
      case 'addressOnly':
        return {
          nextQ: `Entendido — ${church}! Qual é o endereço (rua, cidade e estado) da igreja?`,
          quickReplies: ['106 E. Shields Ave., Fresno, CA 93704', '1200 Church St, Austin, TX 78701'],
        };
      case 'cityState':
        return {
          nextQ: `Tenho ${church} em ${addr}. Em qual cidade e estado ela está localizada?`,
          quickReplies: ['Fresno, CA 93704', 'Austin, TX 78701', 'São Paulo, SP'],
        };
      case 'denomination':
        return {
          nextQ: 'Qual denominação ou tradição cristã melhor descreve sua congregação?',
          quickReplies: ['Não-denominacional', 'Batista', 'Metodista', 'Presbiteriana', 'Pentecostal'],
        };
      case 'arrivalTime':
        return {
          nextQ: 'A que horas vocês planejam chegar ao evento? (Por exemplo: 9:30 AM ou 10:00 AM)',
          quickReplies: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
        };
      case 'coordinatorRole':
        return {
          nextQ: 'Você mesmo atuará como coordenador do evento para sua igreja, ou outra pessoa irá coordenar?',
          quickReplies: ['Eu sou o coordenador', 'Outra pessoa'],
        };
      case 'coordinatorDetails':
        return {
          nextQ: 'Por favor, informe o nome completo, e-mail e telefone do coordenador designado.',
          quickReplies: ['Ana Costa, ana@igreja.org, 559-555-8822'],
        };
      case 'mapVisibility':
        return {
          nextQ: 'Gostaria que a localização da sua igreja aparecesse no mapa público do evento ou prefere mantê-la oculta/privada?',
          quickReplies: ['Listagem no mapa público', 'Manter localização oculta'],
        };
      case 'privacyConsent':
        return {
          nextQ: 'Por fim, você concorda que o Baptize The World armazene e processe com segurança os dados de inscrição da sua igreja de acordo com nossa Política de Privacidade?',
          quickReplies: ['Sim, eu concordo', 'Aceito a política de privacidad'],
        };
      case 'ready':
        return {
          nextQ: 'Todas as informações necessárias foram coletadas! Estou abrindo o formulário completo para sua validação.',
          quickReplies: ['Validar Formulário Agora', 'Enviar Inscrição'],
        };
    }
  }

  if (lang === 'fr') {
    switch (step) {
      case 'contact':
        return {
          nextQ: 'Pour commencer, quels sont votre nom complet, votre adresse e-mail et votre numéro de téléphone ?',
          quickReplies: ['Pasteur Marc Dupont, marc@eglise.org, (559) 555-0192', 'Je suis le contact principal'],
        };
      case 'churchAndAddress':
        return {
          nextQ: `Enchanté, ${firstName} ! Quel est le nom de votre église et son adresse complète ?`,
          quickReplies: ['Église Grâce, 106 E. Shields Ave., Fresno, CA 93704', 'Calvary Chapel 1200 Church St Austin TX 78701'],
        };
      case 'churchOnly':
        return {
          nextQ: `J'ai bien noté l'adresse (${addr}) ! Quel est le nom de votre église ?`,
          quickReplies: ['Église Communauté de Grâce', 'Calvary Chapel', 'Assemblée Nouvelle Vie'],
        };
      case 'addressOnly':
        return {
          nextQ: `C'est noté — ${church} ! Quelle est l'adresse (rue, ville et état/région) de l'église ?`,
          quickReplies: ['106 E. Shields Ave., Fresno, CA 93704', '1200 Church St, Austin, TX 78701'],
        };
      case 'cityState':
        return {
          nextQ: `J'ai ${church} au ${addr}. Dans quelle ville et quel état/région se trouve-t-elle ?`,
          quickReplies: ['Fresno, CA 93704', 'Austin, TX 78701', 'Paris, IDF'],
        };
      case 'denomination':
        return {
          nextQ: 'Quelle dénomination ou affiliation décrit le mieux votre assemblée ?',
          quickReplies: ['Non-dénominationnel', 'Baptiste', 'Méthodiste', 'Presbytérien', 'Pentecôtiste'],
        };
      case 'arrivalTime':
        return {
          nextQ: 'À quelle heure prévoyez-vous d’arriver à l’événement ? (ex. 9:30 AM ou 10:00 AM)',
          quickReplies: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
        };
      case 'coordinatorRole':
        return {
          nextQ: 'Serez-vous personnellement le coordinateur de l’événement pour votre église, ou quelqu’un d’autre coordonnera-t-il ?',
          quickReplies: ['Je suis le coordinateur', 'Quelqu’un d’autre'],
        };
      case 'coordinatorDetails':
        return {
          nextQ: 'Veuillez indiquer le nom complet, l’adresse e-mail et le numéro de téléphone du coordinateur désigné.',
          quickReplies: ['Claire Martin, claire@eglise.org, 559-555-8822'],
        };
      case 'mapVisibility':
        return {
          nextQ: 'Souhaitez-vous que l’emplacement de votre église apparaisse sur la carte publique ou préférez-vous qu’il reste masqué/privé ?',
          quickReplies: ['Carte publique', 'Garder l’emplacement masqué'],
        };
      case 'privacyConsent':
        return {
          nextQ: 'Enfin, consentez-vous à ce que Baptize The World stocke et traite vos données d’inscription conformément à notre Politique de Confidentialité ?',
          quickReplies: ['Oui, j’accepte', 'Je consens à la politique'],
        };
      case 'ready':
        return {
          nextQ: 'Toutes les informations requises ont été recueillies ! J’ouvre maintenant le formulaire complet pour validation.',
          quickReplies: ['Valider le Formulaire', 'Soumettre l’Inscription'],
        };
    }
  }

  if (lang === 'ko') {
    switch (step) {
      case 'contact':
        return {
          nextQ: '먼저 등록하시는 분의 성함, 이메일 주소, 휴대폰 번호를 알려주시겠어요?',
          quickReplies: ['김다윗 목사, david@grace.org, (559) 555-0192', '제가 대표 담당자입니다'],
        };
      case 'churchAndAddress':
        return {
          nextQ: `반갑습니다, ${firstName}님! 교회 이름과 전체 주소를 알려주시겠어요? (어떤 형식으로 입력하셔도 됩니다!)`,
          quickReplies: ['Grace Fellowship Church, 106 E. Shields Ave., Fresno, CA 93704', 'Calvary Chapel 1200 Church St Austin TX 78701'],
        };
      case 'churchOnly':
        return {
          nextQ: `주소(${addr})를 확인했습니다! 교회 이름은 무엇인가요?`,
          quickReplies: ['은혜펠로우십교회', '갈보리채플', '새생명교회'],
        };
      case 'addressOnly':
        return {
          nextQ: `${church} 확인되었습니다! 교회의 도로명 주소, 도시(City), 주(State)를 알려주세요.`,
          quickReplies: ['106 E. Shields Ave., Fresno, CA 93704', '1200 Church St, Austin, TX 78701'],
        };
      case 'cityState':
        return {
          nextQ: `${church} (${addr}) 주소를 입력했습니다. 어느 도시(City)와 주(State)에 위치해 있나요?`,
          quickReplies: ['Fresno, CA 93704', 'Austin, TX 78701', 'Los Angeles, CA 90001'],
        };
      case 'denomination':
        return {
          nextQ: '교회의 소속 교단이나 전통은 어떻게 되나요?',
          quickReplies: ['초교파 (Non-denominational)', '침례교 (Baptist)', '장로교 (Presbyterian)', '감리교 (Methodist)', '오순절 (Pentecostal)'],
        };
      case 'arrivalTime':
        return {
          nextQ: '행사 당일 몇 시에 도착하실 예정인가요? (예: 9:30 AM 또는 10:00 AM)',
          quickReplies: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
        };
      case 'coordinatorRole':
        return {
          nextQ: '본인이 직접 교회 행사 코디네이터를 맡으시나요, 아니면 다른 분이 코디네이터를 맡으시나요?',
          quickReplies: ['제가 코디네이터입니다', '다른 사람이 맡습니다'],
        };
      case 'coordinatorDetails':
        return {
          nextQ: '지정된 코디네이터의 성함, 이메일 주소, 전화번호를 알려주세요.',
          quickReplies: ['Sarah Miller, sarah@church.org, 559-555-8822'],
        };
      case 'mapVisibility':
        return {
          nextQ: '교회 위치를 공식 공개 지도 및 디렉토리에 표시할까요, 아니면 비공개(숨김)로 유지할까요?',
          quickReplies: ['공개 지도에 표시', '비공개로 유지'],
        };
      case 'privacyConsent':
        return {
          nextQ: '마지막으로, 개인정보 처리방침에 따라 Baptize The World가 교회 등록 데이터를 안전하게 저장 및 처리하는 것에 동의하시나요? (참여 서약은 추후 오리엔테이션에서 확인합니다).',
          quickReplies: ['네, 개인정보 처리에 동의합니다', '동의합니다'],
        };
      case 'ready':
        return {
          nextQ: '모든 필수 정보가 수집되었습니다! 최종 검토 및 제출을 위해 전체 등록 양식을 열어드립니다.',
          quickReplies: ['양식 검토하기', '등록 제출하기'],
        };
    }
  }

  if (lang === 'zh') {
    switch (step) {
      case 'contact':
        return {
          nextQ: '首先，请问您的全名、电子邮箱和手机号码是什么？',
          quickReplies: ['王大卫牧师, david@grace.org, (559) 555-0192', '我是主要联系人'],
        };
      case 'churchAndAddress':
        return {
          nextQ: `很高兴认识您，${firstName}！请问贵教会的名称和详细地址是什么？（任何格式都可以！）`,
          quickReplies: ['Grace Fellowship Church, 106 E. Shields Ave., Fresno, CA 93704', 'Calvary Chapel 1200 Church St Austin TX 78701'],
        };
      case 'churchOnly':
        return {
          nextQ: `已记录地址 (${addr})！请问贵教会的名称是什么？`,
          quickReplies: ['Grace Community Church', 'Calvary Chapel', '新生命教会'],
        };
      case 'addressOnly':
        return {
          nextQ: `收到 — ${church}！请问教会的街道地址、城市和州/省份是什么？`,
          quickReplies: ['106 E. Shields Ave., Fresno, CA 93704', '1200 Church St, Austin, TX 78701'],
        };
      case 'cityState':
        return {
          nextQ: `我已记录 ${church} (${addr})。请问它位于哪个城市和州/省？`,
          quickReplies: ['Fresno, CA 93704', 'Austin, TX 78701', 'Los Angeles, CA 90001'],
        };
      case 'denomination':
        return {
          nextQ: '请问贵教会属于哪个宗派或基督教传统？',
          quickReplies: ['跨宗派 (Non-denominational)', '浸信会 (Baptist)', '长老会 (Presbyterian)', '卫理公会 (Methodist)', '五旬节派 (Pentecostal)'],
        };
      case 'arrivalTime':
        return {
          nextQ: '请问贵教会团队预计几点到达活动现场？（例如：9:30 AM 或 10:00 AM）',
          quickReplies: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
        };
      case 'coordinatorRole':
        return {
          nextQ: '请问是由您本人担任贵教会的活动协调员，还是指定其他同工负责协调？',
          quickReplies: ['我本人是协调员', '指定其他人'],
        };
      case 'coordinatorDetails':
        return {
          nextQ: '请提供指定协调员的全名、电子邮箱和电话号码。',
          quickReplies: ['Sarah Miller, sarah@church.org, 559-555-8822'],
        };
      case 'mapVisibility':
        return {
          nextQ: '您希望将贵教会的位置显示在公开聚会地图上，还是保持隐藏/不公开？',
          quickReplies: ['在公开地图上显示', '保持位置隐藏'],
        };
      case 'privacyConsent':
        return {
          nextQ: '最后，您是否同意 Baptize The World 根据隐私政策安全地存储和处理贵教会的注册信息？（参与承诺将在稍后的主办方简报会中确认）。',
          quickReplies: ['是的，我同意隐私政策', '我同意'],
        };
      case 'ready':
        return {
          nextQ: '所有必填信息已收集完毕！现在为您打开完整注册表单以供核对和提交。',
          quickReplies: ['立即核对表单', '提交注册'],
        };
    }
  }

  // Default English
  switch (step) {
    case 'contact':
      return {
        nextQ: "Let's make sure we have your contact details. What is your full name, email, and best mobile phone number?",
        quickReplies: ['Pastor John Doe, john@grace.org, (559) 555-0199', 'I am the primary contact'],
      };
    case 'churchAndAddress':
      return {
        nextQ: `Great to meet you, ${firstName}! What is the name of your church and its address? (Any format is fine!)`,
        quickReplies: [
          'Grace Community Church, 106 E. Shields Ave., Fresno, CA 93704',
          'Calvary Chapel 1200 Church St Austin TX 78701',
        ],
      };
    case 'churchOnly':
      return {
        nextQ: `Got the address (${addr})! What is the name of your church?`,
        quickReplies: ['Grace Community Church', 'Calvary Chapel', 'New Life Fellowship'],
      };
    case 'addressOnly':
      return {
        nextQ: `Got it — ${church}! What is the street address, city, and state for the church?`,
        quickReplies: ['106 E. Shields Ave., Fresno, CA 93704', '1200 Church St, Austin, TX 78701'],
      };
    case 'cityState': {
      const missingParts = [!combined.city ? 'city' : '', !combined.state ? 'state/region' : '', !combined.zipCode ? 'postal/ZIP code' : '']
        .filter(Boolean)
        .join(' and ');
      return {
        nextQ: `I have ${church} at ${addr}. What ${missingParts} is it located in?`,
        quickReplies: ['Fresno, CA 93704', 'Austin, TX 78701', 'Los Angeles, CA 90001'],
      };
    }
    case 'denomination':
      return {
        nextQ: 'What denomination or church affiliation best describes your congregation?',
        quickReplies: ['Non-denominational', 'Baptist', 'Methodist', 'Presbyterian', 'Pentecostal'],
      };
    case 'arrivalTime':
      return {
        nextQ: 'What time should attendees arrive for the gathering? (For example: 9:30 AM or 10:00 AM)',
        quickReplies: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
      };
    case 'coordinatorRole':
      return {
        nextQ: 'Will you personally be serving as the event coordinator for your church, or will someone else be coordinating?',
        quickReplies: ['I am the coordinator', 'Someone else'],
      };
    case 'coordinatorDetails':
      return {
        nextQ: "Please provide the coordinator's full name, email, and phone number so we can send them event logistics.",
        quickReplies: ['Sarah Miller, sarah@church.org, 559-555-8822'],
      };
    case 'mapVisibility':
      return {
        nextQ: 'Would you like your church location to appear on the public map and event directory, or would you like it kept hidden/private?',
        quickReplies: ['Public map listing', 'Keep location hidden'],
      };
    case 'privacyConsent':
      return {
        nextQ: 'Lastly, do you consent to Baptize The World securely storing and processing your church registration data in accordance with our Privacy Policy? (Participation commitments will be confirmed at a later time during host orientation).',
        quickReplies: ['Yes, I consent to privacy policy', 'I consent'],
      };
    case 'ready':
      return {
        nextQ: 'All required information has been gathered! I am opening the complete registration form now so you can validate and review each field before official submission.',
        quickReplies: ['Validate Form Now', 'Submit Registration'],
      };
  }
}

// Heuristic fallback & pre-processor for resilience and immediate local parsing
function getHeuristicResponse(message: string, current: any = {}, lang: LanguageCode = 'en') {
  const extracted: Record<string, any> = {};
  const highlights: string[] = [];
  const lower = (message || '').toLowerCase();

  // Email pattern
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch && !current.email) {
    extracted.email = emailMatch[0];
    highlights.push('email');
  }

  // Phone pattern
  const phoneMatch = message.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}/);
  if (phoneMatch && !current.phone) {
    extracted.phone = phoneMatch[0].trim();
    highlights.push('phone');
  }

  // Time pattern e.g. 9:30 AM, 10am, 9:00 in the morning, 오전 9시 30분
  const timeMatch =
    message.match(/\b(\d{1,2}):(\d{2})\s*(am|pm)?\b/i) ||
    message.match(/\b(\d{1,2})\s*(am|pm)\b/i) ||
    message.match(/\b(?:at|around|a las|às|à|um|saa)\s+(\d{1,2})(?::(\d{2}))?\s*(?:in the (morning|afternoon|evening)|de la mañana|da manhã)?\b/i) ||
    message.match(/(?:오전|오후|早上|上午|下午)\s*(\d{1,2})\s*(?:시|:)\s*(\d{2})?/);

  if (timeMatch) {
    const rawHour = parseInt(timeMatch[1], 10);
    if (rawHour >= 1 && rawHour <= 12) {
      extracted.arrivalTimeHour = String(rawHour);
      const rawMin = timeMatch[2] && /^\d{2}$/.test(timeMatch[2]) ? timeMatch[2] : '00';
      extracted.arrivalTimeMinute = ['00', '15', '30', '45'].includes(rawMin) ? rawMin : '30';
      const periodRaw = (timeMatch[3] || timeMatch[2] || '').toLowerCase();
      if (
        periodRaw === 'pm' ||
        periodRaw === 'afternoon' ||
        periodRaw === 'evening' ||
        lower.includes('오후') ||
        lower.includes('下午') ||
        lower.includes('tarde')
      ) {
        extracted.arrivalTimeAmPm = 'PM';
      } else {
        extracted.arrivalTimeAmPm = 'AM';
      }
      highlights.push('arrivalTimeHour', 'arrivalTimeMinute', 'arrivalTimeAmPm');
    }
  }

  // Map visibility (multilingual)
  if (
    lower.includes('public map') ||
    lower.includes('publicly') ||
    lower.includes('show on map') ||
    lower.includes('list on map') ||
    lower === 'public' ||
    lower.includes('mapa público') ||
    lower.includes('público') ||
    lower.includes('carte publique') ||
    lower.includes('공개') ||
    lower.includes('公开') ||
    lower.includes('pampubliko') ||
    lower.includes('öffentlich') ||
    lower.includes('العامة') ||
    lower.includes('umma')
  ) {
    extracted.mapVisibility = 'public';
    highlights.push('mapVisibility');
  } else if (
    lower.includes('hidden') ||
    lower.includes('private') ||
    lower.includes('unlisted') ||
    lower.includes('hide location') ||
    lower.includes('oculto') ||
    lower.includes('oculta') ||
    lower.includes('privado') ||
    lower.includes('masqué') ||
    lower.includes('privé') ||
    lower.includes('비공개') ||
    lower.includes('숨김') ||
    lower.includes('隐藏') ||
    lower.includes('不公开') ||
    lower.includes('nakatago') ||
    lower.includes('verborgen') ||
    lower.includes('مخفي') ||
    lower.includes('ficha')
  ) {
    extracted.mapVisibility = 'hidden';
    highlights.push('mapVisibility');
  }

  // Coordinator role & details detection (multilingual)
  const isSelf =
    lower.includes('i am the coordinator') ||
    lower.includes("i'm the coordinator") ||
    lower.includes('myself') ||
    lower.includes('i will coordinate') ||
    lower.includes('i coordinate') ||
    lower.includes('i am coordinating') ||
    lower.includes('yo soy el coordinador') ||
    lower.includes('yo coordinaré') ||
    lower.includes('eu sou o coordenador') ||
    lower.includes('eu vou coordenar') ||
    lower.includes('je suis le coordinateur') ||
    lower.includes('je coordonnerai') ||
    lower.includes('제가 코디네이터') ||
    lower.includes('본인') ||
    lower.includes('我本人') ||
    lower.includes('我是协调员') ||
    lower.includes('ako ang magko-coordinate') ||
    lower.includes('ich koordiniere selbst') ||
    lower.includes('nitaratibu mwenyewe');

  const isDelegate =
    !isSelf &&
    (lower.includes('someone else') ||
      lower.includes('another person') ||
      lower.includes('different coordinator') ||
      lower.includes('delegate') ||
      lower.includes('coordinating') ||
      lower.includes('coordinator') ||
      lower.includes('coordinate') ||
      lower.includes('coordinates') ||
      lower.includes('organizer') ||
      lower.includes('otra persona') ||
      lower.includes('coordinará') ||
      lower.includes('outra pessoa') ||
      lower.includes('quelqu’un d’autre') ||
      lower.includes("quelqu'un d'autre") ||
      lower.includes('다른 사람') ||
      lower.includes('다른 분') ||
      lower.includes('其他人') ||
      lower.includes('另一位') ||
      lower.includes('ibang tao') ||
      lower.includes('jemand anderes') ||
      lower.includes('شخص آخر') ||
      lower.includes('mtu mwingine') ||
      current.coordinatorRole === 'someone_else');

  if (isSelf) {
    extracted.coordinatorRole = 'self';
    highlights.push('coordinatorRole');
  } else if (isDelegate) {
    extracted.coordinatorRole = 'someone_else';
    highlights.push('coordinatorRole');
  }

  // Extract Coordinator Name, Email, Phone whenever someone_else is active or implied
  if (extracted.coordinatorRole === 'someone_else' || current.coordinatorRole === 'someone_else' || isDelegate) {
    const coordMatch1 = message.match(/(?:coordinator(?:'s)?(?:\s+name)?(?:\s+is)?|coordinating|coordinate|delegating to|contact is)\s*(?::|-)?\s*([A-ZÀ-ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-ÿ][a-zà-ÿ]+)+)/i);
    const coordMatch2 = message.match(/([A-ZÀ-ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-ÿ][a-zà-ÿ]+)+)\s+(?:is(?: our)? coordinator|will coordinate|will be coordinating|is coordinating|coordinates)/i);
    const coordMatch3 = message.match(/[:：]\s*([A-ZÀ-ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-ÿ][a-zà-ÿ]+)+)/);
    const coordMatch4 = message.match(/(?:coordinator|lead|contact)\s+([A-ZÀ-ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-ÿ][a-zà-ÿ]+)+)/i);

    const stripped = message
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
      .replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}/g, '')
      .replace(/(?:someone else|otra persona|outra pessoa|coordinator|coordinating|coordinate|coordinates|her name is|his name is|their name is|name is|it is|it's|will be|will coordinate|is|our|the)/gi, '')
      .replace(/[,;:\-.]/g, ' ')
      .trim();

    const candidateMatch = stripped.match(/([A-ZÀ-ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-ÿ][a-zà-ÿ]+)+)/);

    const foundName =
      (coordMatch1 && coordMatch1[1]) ||
      (coordMatch2 && coordMatch2[1]) ||
      (coordMatch3 && coordMatch3[1]) ||
      (coordMatch4 && coordMatch4[1]) ||
      (candidateMatch && candidateMatch[1]);

    if (foundName) {
      const cleanName = foundName.trim();
      if (!current.fullName || cleanName.toLowerCase() !== current.fullName.toLowerCase()) {
        extracted.coordinatorName = cleanName;
        extracted.coordinatorRole = 'someone_else';
        highlights.push('coordinatorName', 'coordinatorRole');
      }
    }

    if (emailMatch) {
      const foundEmail = emailMatch[0];
      if (!current.email || foundEmail.toLowerCase() !== current.email.toLowerCase()) {
        extracted.coordinatorEmail = foundEmail;
        highlights.push('coordinatorEmail');
      }
    }

    if (phoneMatch) {
      const foundPhone = phoneMatch[0].trim();
      if (!current.phone || foundPhone !== current.phone) {
        extracted.coordinatorPhone = foundPhone;
        highlights.push('coordinatorPhone');
      }
    }
  }

  // Privacy Consent detection (multilingual)
  if (
    lower.includes('consent') ||
    lower.includes('i agree') ||
    lower.includes('agree to privacy') ||
    lower.includes('yes, i agree') ||
    lower.includes('yes, i consent') ||
    lower.includes('affirm') ||
    lower.includes('accept terms') ||
    lower.includes('doy mi consentimiento') ||
    lower.includes('acepto') ||
    lower.includes('eu concordo') ||
    lower.includes('aceito') ||
    lower.includes("j'accepte") ||
    lower.includes('j’accepte') ||
    lower.includes('je consens') ||
    lower.includes('동의합니다') ||
    lower.includes('동의') ||
    lower.includes('我同意') ||
    lower.includes('同意') ||
    lower.includes('pinahihintulutan') ||
    lower.includes('stimme zu') ||
    lower.includes('أوافق') ||
    lower.includes('ninakubali')
  ) {
    extracted.privacyConsent = true;
    highlights.push('privacyConsent');
  }

  // Denominations
  const normDenom = normalizeDenomination(message);
  if (normDenom) {
    extracted.denomination = normDenom;
    highlights.push('denomination');
  }

  // Website pattern
  const webMatch = message.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/i);
  if (webMatch && !current.website) {
    extracted.website = webMatch[1].startsWith('http') ? webMatch[1] : `https://${webMatch[1]}`;
    highlights.push('website');
  }

  // Flexible Address & Church Name Parser
  const flexAddr = parseFlexibleAddressAndChurch(message, { ...current, ...extracted });
  Object.assign(extracted, flexAddr.extracted);
  highlights.push(...flexAddr.highlights);

  // Registrant Full Name pattern
  const explicitNameMatch =
    message.match(/(?:i am|i'm|name is|this is|soy(?:\s+el|\s+la)?|sou(?:\s+o|\s+a)?|je suis(?:\s+le|\s+la)?|ako si|ich bin|mimi ni|pastor|pasteur|mchungaji)\s+((?:Pastor|Pasteur|Mchungaji)?\s*[A-ZÀ-ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-ÿ][a-zà-ÿ]+)+)/i) ||
    message.match(/([가-힣]{2,4}\s*목사|[王李张刘陈杨黄赵周吴][^\s,，]{1,4})/);
  const standaloneNameMatch =
    message.match(/^(?:Pastor|Pasteur|Mchungaji)?\s*([A-ZÀ-ÿ][a-zà-ÿ]+\s+[A-ZÀ-ÿ][a-zà-ÿ]+)(?:,|\.|$)/);

  const chosenNameMatch =
    explicitNameMatch || (!extracted.churchName && !extracted.address ? standaloneNameMatch : null);

  if (
    chosenNameMatch &&
    !current.fullName &&
    (!extracted.coordinatorName || chosenNameMatch[1].trim() !== extracted.coordinatorName)
  ) {
    const rawName = chosenNameMatch[1].trim();
    extracted.fullName =
      message.toLowerCase().includes('pastor') && !rawName.toLowerCase().startsWith('pastor')
        ? `Pastor ${rawName}`
        : rawName;
    highlights.push('fullName');
  }

  // Post-process & normalize
  const finalExtracted = postProcessExtractedFields(extracted, current);
  const finalHighlights = Array.from(new Set([...highlights, ...Object.keys(finalExtracted)]));

  const combined = { ...current, ...finalExtracted };

  let step: Parameters<typeof getLocalizedNextStep>[0] = 'ready';
  if (!combined.fullName || !combined.email || !combined.phone) {
    step = 'contact';
  } else if (!combined.churchName && !combined.address) {
    step = 'churchAndAddress';
  } else if (!combined.churchName) {
    step = 'churchOnly';
  } else if (!combined.address) {
    step = 'addressOnly';
  } else if (!combined.city || !combined.state) {
    step = 'cityState';
  } else if (!combined.denomination) {
    step = 'denomination';
  } else if (!combined.arrivalTimeHour) {
    step = 'arrivalTime';
  } else if (!combined.coordinatorRole) {
    step = 'coordinatorRole';
  } else if (combined.coordinatorRole === 'someone_else' && (!combined.coordinatorName || !combined.coordinatorEmail)) {
    step = 'coordinatorDetails';
  } else if (!combined.mapVisibility) {
    step = 'mapVisibility';
  } else if (!combined.privacyConsent) {
    step = 'privacyConsent';
  } else {
    step = 'ready';
  }

  const { nextQ, quickReplies } = getLocalizedNextStep(step, lang, combined);
  const isReady = computeIsReady(combined);

  return {
    extractedFields: finalExtracted,
    aiResponse: nextQ,
    suggestedQuickReplies: quickReplies,
    fieldHighlights: finalHighlights,
    isReadyForReview: isReady,
  };
}

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Baptize The World full-stack server running on http://0.0.0.0:${port}`);
  });
}

startServer();
