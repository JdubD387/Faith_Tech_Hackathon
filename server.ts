import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

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

// API endpoint to process conversational registration messages
app.post('/api/assistant', async (req, res) => {
  try {
    const { message, formState, chatHistory = [], visibleFields = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      // Return heuristic response if API key is not yet configured
      return res.json(getHeuristicResponse(message, formState));
    }

    const systemInstruction = `
You are Baptize The World AI, an empathetic, conversational, and highly capable registration assistant for an online church event.
Your role is to guide church leaders, coordinators, and volunteers through registering their church for the upcoming community gathering.

The user might not be technical. They should not need to understand form mechanics.
You inspect the current form state, recognize what has been filled, extract missing values naturally from what they say, and guide them step-by-step.

### KEY PRINCIPLES:
1. SMART EXTRACTION:
   - If user provides combined information (e.g. "Pastor Mark Davis, pastor@gracechurch.org, 559-555-1234"), extract all 3 fields at once.
   - If user gives a full address like "106 E. Shields Ave., Fresno, CA 93704", parse it into address ("106 E. Shields Ave."), city ("Fresno"), state ("CA"), zipCode ("93704").
   - If user mentions country (e.g. "USA", "United States", "Canada"), set country to "United States" or standard name. Default country is "United States" if a US state/zip is provided.
   - If user mentions an arrival time like "9:30 AM", "around 10 in the morning", parse into:
     - arrivalTimeHour: "9" (or "10")
     - arrivalTimeMinute: "30" (or "00")
     - arrivalTimeAmPm: "AM" (or "PM")
   - Website is optional. If the user mentions they don't have one or says "skip", leave website empty and acknowledge it gracefully.

2. CRITICAL SAFEGUARD - ZERO AUTO-DECISION ON SENSITIVE CHOICES:
   You MUST NEVER automatically decide, assume, or check off the following without explicit user response:
   - coordinatorRole ("self" vs "someone_else"): Ask who is coordinating!
   - mapVisibility ("public" vs "hidden"): Ask: "Would you like your church location visible on the public map and attendee directory, or kept private/hidden?"
   - privacyConsent: Data processing consent. You MUST ask the user: "Do you consent to GraceGather securely storing and processing your church registration data in accordance with our Privacy Policy?"
   - CRITICAL REQUIREMENT ON COMMITMENTS: The Participation Commitments (Host Orientation, Volunteer Welcomers, Code of Conduct) will be asked for at a later time closer to the gathering. Do NOT ask for participation commitments now — Privacy Consent is the ONLY consent the AI should ask for at this stage!
   - smsUpdates: Optional text message alerts.
   - finalConfirmation: Only confirmed when validating the form.

3. DYNAMIC FORM ADAPTATION & COORDINATOR EXTRACTION (CRITICAL):
   - If the user specifies or names another person as coordinator (e.g. "Someone else: Sarah Miller", "Sarah Miller is coordinating", "Sarah Miller will be the coordinator", "Sarah Miller, sarah@church.org, 559-555-8822", or simply replies with a person's name like "Sarah Miller" after being asked who will coordinate):
     * You MUST set coordinatorRole: "someone_else"
     * You MUST set coordinatorName: the person's exact full name (e.g. "Sarah Miller")
     * You MUST set coordinatorEmail: their email address if provided
     * You MUST set coordinatorPhone: their phone number if provided
   - If the user says they will coordinate themselves (e.g. "I am the coordinator", "myself", "I will coordinate"):
     * Set coordinatorRole: "self"

4. GROUPING & PACING:
   - Ask related questions together (e.g., registrant name & contact; or church name and full address; or arrival time and coordinator role).
   - Do NOT re-ask questions that are already answered in formState.
   - Keep answers warm, friendly, concise, and reassuring.

5. FINAL REVIEW:
   - When all required fields are complete, present a concise bulleted summary of their details (Church, Address, Coordinator, Time, Map Visibility, Commitments) and ask them if everything looks accurate to confirm and submit.

Current formState:
${JSON.stringify(formState, null, 2)}

Active visible fields:
${JSON.stringify(visibleFields)}

Return JSON strictly adhering to schema:
{
  "extractedFields": Record<string, any> (only fields changed/extracted from this message),
  "aiResponse": string (warm conversational message, acknowledging input and asking the next question or summarizing),
  "suggestedQuickReplies": string[] (2-4 brief clickable response options for the user, especially when asking multiple-choice or confirmation questions),
  "fieldHighlights": string[] (list of field keys that were newly filled or updated),
  "isReadyForReview": boolean (true if all required fields are complete and ready for final confirmation)
}
`;

    // Race Gemini API call against a 4.5s timeout for instant responsiveness
    const geminiCall = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Conversation so far:\n${chatHistory.map((m: any) => `${m.role}: ${m.content}`).join('\n')}\n\nUser's latest message:\n"${message}"`,
            },
          ],
        },
      ],
      config: {
        systemInstruction,
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
                coordinatorName: { type: Type.STRING, description: "Full name of the event coordinator when someone else is coordinating" },
                coordinatorEmail: { type: Type.STRING, description: "Email of the designated event coordinator" },
                coordinatorPhone: { type: Type.STRING, description: "Phone number of the designated event coordinator" },
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
              description: 'Conversational response to display to the user',
            },
            suggestedQuickReplies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 4 quick action pills for user convenience',
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
          },
          required: ['extractedFields', 'aiResponse', 'suggestedQuickReplies', 'fieldHighlights', 'isReadyForReview'],
        },
      },
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gemini timeout fallback')), 4500)
    );

    const response: any = await Promise.race([geminiCall, timeoutPromise]);
    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error) {
    console.error('Gemini assistant processing notice (using responsive fallback):', error);
    // Fallback gracefully and quickly
    const fallback = getHeuristicResponse(req.body.message, req.body.formState);
    return res.json(fallback);
  }
});

// Heuristic fallback for resilience or immediate local parsing
function getHeuristicResponse(message: string, current: any = {}) {
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
  const phoneMatch = message.match(/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch && !current.phone) {
    extracted.phone = phoneMatch[0];
    highlights.push('phone');
  }

  // Time pattern e.g. 9:30 AM or 10am
  const timeMatch = message.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)/i);
  if (timeMatch) {
    extracted.arrivalTimeHour = timeMatch[1];
    extracted.arrivalTimeMinute = timeMatch[2] ? (['00', '15', '30', '45'].includes(timeMatch[2]) ? timeMatch[2] : '30') : '00';
    extracted.arrivalTimeAmPm = timeMatch[3].toUpperCase();
    highlights.push('arrivalTimeHour', 'arrivalTimeMinute', 'arrivalTimeAmPm');
  }

  // Map visibility
  if (lower.includes('public map') || lower.includes('publicly') || lower.includes('show on map') || lower.includes('list on map')) {
    extracted.mapVisibility = 'public';
    highlights.push('mapVisibility');
  } else if (lower.includes('hidden') || lower.includes('private') || lower.includes('unlisted') || lower.includes('hide location')) {
    extracted.mapVisibility = 'hidden';
    highlights.push('mapVisibility');
  }

  // Coordinator role & details detection
  const isSelf = lower.includes('i am the coordinator') ||
                 lower.includes("i'm the coordinator") ||
                 lower.includes('myself') ||
                 lower.includes('i will coordinate') ||
                 lower.includes('i coordinate') ||
                 lower.includes('i am coordinating') ||
                 lower.includes('i will be coordinating');

  const isDelegate = !isSelf && (
                     lower.includes('someone else') ||
                     lower.includes('another person') ||
                     lower.includes('different coordinator') ||
                     lower.includes('delegate') ||
                     lower.includes('coordinating') ||
                     lower.includes('coordinator') ||
                     lower.includes('coordinate') ||
                     lower.includes('coordinates') ||
                     lower.includes('organizer') ||
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
    // 1. Explicit keyword match e.g. "coordinator is Sarah Miller", "delegating to Sarah Miller", "Sarah Miller will coordinate"
    const coordMatch1 = message.match(/(?:coordinator(?:'s)?(?:\s+name)?(?:\s+is)?|coordinating|coordinate|delegating to|contact is)\s*(?::|-)?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i);
    const coordMatch2 = message.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\s+(?:is(?: our)? coordinator|will coordinate|will be coordinating|is coordinating|coordinates)/i);
    const coordMatch3 = message.match(/:\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/);
    const coordMatch4 = message.match(/(?:coordinator|lead|contact)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i);

    // 2. Strip emails, phones, and common filler words to see if a candidate name is present
    const stripped = message
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
      .replace(/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '')
      .replace(/(?:someone else|coordinator|coordinating|coordinate|coordinates|her name is|his name is|their name is|name is|it is|it's|will be|will coordinate|is|our|the)/gi, '')
      .replace(/[,;:\-\.]/g, ' ')
      .trim();

    const candidateMatch = stripped.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/);

    const foundName = (coordMatch1 && coordMatch1[1]) ||
                      (coordMatch2 && coordMatch2[1]) ||
                      (coordMatch3 && coordMatch3[1]) ||
                      (coordMatch4 && coordMatch4[1]) ||
                      (candidateMatch && candidateMatch[1]);

    if (foundName) {
      const cleanName = foundName.trim();
      // Ensure it's not the registrant's name if registrant is already set
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
      const foundPhone = phoneMatch[0];
      if (!current.phone || foundPhone !== current.phone) {
        extracted.coordinatorPhone = foundPhone;
        highlights.push('coordinatorPhone');
      }
    }
  }

  // Privacy Consent detection
  if (
    lower.includes('consent') ||
    lower.includes('i agree') ||
    lower.includes('agree to privacy') ||
    lower.includes('yes, i agree') ||
    lower.includes('yes, i consent') ||
    lower.includes('affirm') ||
    lower.includes('accept terms') ||
    lower.includes('agree to all') ||
    lower.includes('commit to all')
  ) {
    extracted.privacyConsent = true;
    highlights.push('privacyConsent');
  }

  // Denominations
  const denoms = ['baptist', 'presbyterian', 'methodist', 'pentecostal', 'lutheran', 'catholic', 'anglican', 'non-denominational'];
  for (const d of denoms) {
    if (lower.includes(d)) {
      extracted.denomination = d === 'non-denominational' ? 'Non-denominational' : d.charAt(0).toUpperCase() + d.slice(1);
      highlights.push('denomination');
      break;
    }
  }

  // Church Name pattern (e.g. "Our church is Grace Fellowship Church at...", "Grace Community Church", "Calvary Chapel")
  const churchMatch = message.match(/(?:church is|church name is|registering|at)\s+([A-Z][A-Za-z0-9\s&'-]+?(?:Church|Fellowship|Chapel|Ministries|Assembly|Center|Parish))/i) ||
                      message.match(/([A-Z][A-Za-z0-9\s&'-]+?\s+(?:Church|Fellowship|Chapel|Ministries|Assembly))/);
  if (churchMatch && !current.churchName) {
    extracted.churchName = churchMatch[1].trim();
    highlights.push('churchName');
  }

  // Registrant Full Name pattern (e.g. "Pastor David Miller", "Hi, I am David Miller", "I am Sarah Miller")
  const nameMatch = message.match(/(?:i am|i'm|name is|this is|pastor)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i) ||
                    message.match(/^(?:Pastor\s+)?([A-Z][a-z]+\s+[A-Z][a-z]+)(?:,|\.|$)/);
  if (nameMatch && !current.fullName && (!extracted.coordinatorName || nameMatch[1].trim() !== extracted.coordinatorName)) {
    const rawName = nameMatch[1].trim();
    extracted.fullName = message.toLowerCase().includes('pastor') && !rawName.toLowerCase().startsWith('pastor')
      ? `Pastor ${rawName}`
      : rawName;
    highlights.push('fullName');
  }

  // Website pattern (e.g. https://www.grace.org or www.church.com)
  const webMatch = message.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/i);
  if (webMatch && !current.website) {
    extracted.website = webMatch[1].startsWith('http') ? webMatch[1] : `https://${webMatch[1]}`;
    highlights.push('website');
  }

  // Address parsing (e.g. 106 E. Shields Ave., Fresno, CA 93704)
  const addressMatch = message.match(/(\d+\s+[^,]+),\s*([^,]+),\s*([A-Za-z]{2})\s*(\d{5})/);
  if (addressMatch) {
    extracted.address = addressMatch[1].trim();
    extracted.city = addressMatch[2].trim();
    extracted.state = addressMatch[3].toUpperCase();
    extracted.zipCode = addressMatch[4].trim();
    extracted.country = 'United States';
    highlights.push('address', 'city', 'state', 'zipCode', 'country');
  }

  // Next prompt logic
  let nextQ = "Thank you! I've updated the form.";
  let quickReplies: string[] = [];

  const combined = { ...current, ...extracted };

  if (!combined.fullName || !combined.email || !combined.phone) {
    nextQ = "Let's make sure we have your contact details. What is your full name, email, and best mobile phone number?";
    quickReplies = ['Pastor John Doe, john@grace.org, (559) 555-0199', 'I am the primary contact'];
  } else if (!combined.churchName || !combined.address || !combined.city) {
    nextQ = `Great to meet you, ${combined.fullName.split(' ')[0] || ''}! What is the name of your church, and its full street address?`;
    quickReplies = ['Grace Community Church, 106 E. Shields Ave., Fresno, CA 93704', 'Calvary Chapel, 1200 Church St, Austin, TX 78701'];
  } else if (!combined.denomination) {
    nextQ = 'What denomination or church affiliation best describes your congregation?';
    quickReplies = ['Non-denominational', 'Baptist', 'Methodist', 'Presbyterian', 'Other Christian'];
  } else if (!combined.arrivalTimeHour) {
    nextQ = 'What time should attendees arrive for the gathering? (For example: 9:30 AM or 10:00 AM)';
    quickReplies = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'];
  } else if (!combined.coordinatorRole) {
    nextQ = 'Will you personally be serving as the event coordinator for your church, or will someone else be coordinating?';
    quickReplies = ['I am the coordinator', 'Someone else'];
  } else if (combined.coordinatorRole === 'someone_else' && (!combined.coordinatorName || !combined.coordinatorEmail)) {
    nextQ = "Please provide the coordinator's full name, email, and phone number so we can send them event logistics.";
    quickReplies = ['Sarah Miller, sarah@church.org, 559-555-8822'];
  } else if (!combined.mapVisibility) {
    nextQ = 'Would you like your church location to appear on the public map and event directory, or would you like it kept hidden/private?';
    quickReplies = ['Public map listing', 'Keep location hidden'];
  } else if (!combined.privacyConsent) {
    nextQ = 'Lastly, do you consent to GraceGather securely storing and processing your church registration data in accordance with our Privacy Policy? (Participation commitments will be confirmed at a later time during host orientation).';
    quickReplies = ['Yes, I consent to privacy policy', 'Privacy details'];
  } else {
    nextQ = 'All required information has been gathered! I am opening the complete registration form now so you can validate and review each field before official submission.';
    quickReplies = ['Validate Form Now', 'Submit Registration'];
  }

  const isReady = Boolean(
    combined.fullName &&
    combined.email &&
    combined.phone &&
    combined.churchName &&
    combined.address &&
    combined.city &&
    combined.state &&
    combined.zipCode &&
    combined.denomination &&
    combined.arrivalTimeHour &&
    combined.coordinatorRole &&
    (combined.coordinatorRole !== 'someone_else' || (combined.coordinatorName && combined.coordinatorEmail)) &&
    combined.mapVisibility &&
    combined.privacyConsent
  );

  return {
    extractedFields: extracted,
    aiResponse: nextQ,
    suggestedQuickReplies: quickReplies,
    fieldHighlights: highlights,
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
    console.log(`GraceGather full-stack server running on http://0.0.0.0:${port}`);
  });
}

startServer();
