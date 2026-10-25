import { DENOMINATIONS } from '../data/churchData';

export const STATE_NAME_AND_TYPO_MAP: Record<string, string> = {
  // US States + common typos & abbreviations
  alabama: 'AL', alabma: 'AL', ala: 'AL',
  alaska: 'AK', alska: 'AK',
  arizona: 'AZ', arizna: 'AZ', ariz: 'AZ', arozona: 'AZ',
  arkansas: 'AR', arknsas: 'AR', ark: 'AR',
  california: 'CA', californa: 'CA', califronia: 'CA', cali: 'CA', calif: 'CA', caifornia: 'CA', calfornia: 'CA', cal: 'CA',
  colorado: 'CO', colordo: 'CO', colo: 'CO', colorada: 'CO',
  connecticut: 'CT', conneticut: 'CT', connecticuit: 'CT', conn: 'CT',
  delaware: 'DE', delware: 'DE', del: 'DE',
  florida: 'FL', florda: 'FL', fla: 'FL', flordia: 'FL', florid: 'FL',
  georgia: 'GA', georga: 'GA', gergia: 'GA',
  hawaii: 'HI', hawai: 'HI',
  idaho: 'ID', idho: 'ID',
  illinois: 'IL', illnois: 'IL', ilinois: 'IL', ill: 'IL', illinios: 'IL',
  indiana: 'IN', indina: 'IN', ind: 'IN',
  iowa: 'IA',
  kansas: 'KS', kanss: 'KS', kan: 'KS',
  kentucky: 'KY', kentcky: 'KY', ken: 'KY', kentucy: 'KY',
  louisiana: 'LA', lousiana: 'LA', louisana: 'LA',
  maine: 'ME',
  maryland: 'MD', marylnd: 'MD', marland: 'MD',
  massachusetts: 'MA', massachusets: 'MA', massachusettes: 'MA', mass: 'MA',
  michigan: 'MI', michgan: 'MI', mich: 'MI', michigin: 'MI',
  minnesota: 'MN', minesota: 'MN', minn: 'MN', minnisota: 'MN',
  mississippi: 'MS', missisippi: 'MS', misissippi: 'MS', miss: 'MS',
  missouri: 'MO', misouri: 'MO', missori: 'MO',
  montana: 'MT', montna: 'MT', mont: 'MT',
  nebraska: 'NE', nebrska: 'NE', neb: 'NE',
  nevada: 'NV', nevda: 'NV', nev: 'NV',
  'new hampshire': 'NH', 'new hampsire': 'NH', 'n hampshire': 'NH',
  'new jersey': 'NJ', 'new jersy': 'NJ', 'n jersey': 'NJ',
  'new mexico': 'NM', 'new mexco': 'NM', 'n mexico': 'NM',
  'new york': 'NY', newyork: 'NY', 'n york': 'NY',
  'north carolina': 'NC', 'n carolina': 'NC', 'n. carolina': 'NC', 'north carlina': 'NC',
  'north dakota': 'ND', 'n dakota': 'ND', 'n. dakota': 'ND',
  ohio: 'OH', oho: 'OH',
  oklahoma: 'OK', oklahma: 'OK', okla: 'OK',
  oregon: 'OR', oregan: 'OR', oreg: 'OR', orgon: 'OR',
  pennsylvania: 'PA', pensylvania: 'PA', pennsylvana: 'PA', penn: 'PA', penna: 'PA',
  'rhode island': 'RI', 'rode island': 'RI',
  'south carolina': 'SC', 's carolina': 'SC', 's. carolina': 'SC', 'south carlina': 'SC',
  'south dakota': 'SD', 's dakota': 'SD', 's. dakota': 'SD',
  tennessee: 'TN', tenessee: 'TN', tennesse: 'TN', tenn: 'TN',
  texas: 'TX', texs: 'TX', tex: 'TX', tejas: 'TX', txas: 'TX',
  utah: 'UT', utha: 'UT',
  vermont: 'VT', vermnt: 'VT',
  virginia: 'VA', virgina: 'VA', virg: 'VA',
  washington: 'WA', washinton: 'WA', washingtn: 'WA', wash: 'WA',
  'west virginia': 'WV', 'w virginia': 'WV', 'w. virginia': 'WV',
  wisconsin: 'WI', wisconsn: 'WI', wisc: 'WI', wisconson: 'WI',
  wyoming: 'WY', wyomng: 'WY', wyo: 'WY',
  'district of columbia': 'DC', 'washington dc': 'DC', 'washington d.c.': 'DC',
  // Canadian Provinces
  ontario: 'ON', quebec: 'QC', 'british columbia': 'BC', alberta: 'AB',
  manitoba: 'MB', saskatchewan: 'SK', 'nova scotia': 'NS', 'new brunswick': 'NB',
};

export const VALID_STATE_CODES = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
  'ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE',
]);

// Map 3-digit US ZIP code prefix to 2-letter State code
export function inferStateFromZip(zip: string): string | null {
  const clean = zip.replace(/\D/g, '');
  if (clean.length < 3) return null;
  const prefix = parseInt(clean.slice(0, 3), 10);

  if (prefix >= 900 && prefix <= 961) return 'CA';
  if ((prefix >= 750 && prefix <= 799) || prefix === 885) return 'TX';
  if (prefix >= 100 && prefix <= 149) return 'NY';
  if (prefix >= 320 && prefix <= 349) return 'FL';
  if (prefix >= 600 && prefix <= 629) return 'IL';
  if (prefix >= 150 && prefix <= 196) return 'PA';
  if (prefix >= 430 && prefix <= 459) return 'OH';
  if ((prefix >= 300 && prefix <= 319) || prefix === 398) return 'GA';
  if (prefix >= 270 && prefix <= 289) return 'NC';
  if (prefix >= 480 && prefix <= 499) return 'MI';
  if (prefix >= 70 && prefix <= 89) return 'NJ';
  if (prefix === 201 || (prefix >= 220 && prefix <= 246)) return 'VA';
  if (prefix >= 980 && prefix <= 994) return 'WA';
  if (prefix >= 850 && prefix <= 865) return 'AZ';
  if (prefix >= 10 && prefix <= 27) return 'MA';
  if (prefix >= 370 && prefix <= 385) return 'TN';
  if (prefix >= 460 && prefix <= 479) return 'IN';
  if (prefix >= 630 && prefix <= 658) return 'MO';
  if (prefix >= 206 && prefix <= 219) return 'MD';
  if (prefix >= 530 && prefix <= 549) return 'WI';
  if (prefix >= 800 && prefix <= 816) return 'CO';
  if (prefix >= 550 && prefix <= 567) return 'MN';
  if (prefix >= 290 && prefix <= 299) return 'SC';
  if (prefix >= 350 && prefix <= 369) return 'AL';
  if (prefix >= 700 && prefix <= 714) return 'LA';
  if (prefix >= 400 && prefix <= 427) return 'KY';
  if (prefix >= 970 && prefix <= 979) return 'OR';
  if (prefix >= 730 && prefix <= 749) return 'OK';
  if (prefix >= 60 && prefix <= 69) return 'CT';
  if (prefix >= 840 && prefix <= 847) return 'UT';
  if (prefix >= 500 && prefix <= 528) return 'IA';
  if (prefix >= 889 && prefix <= 898) return 'NV';
  if (prefix >= 716 && prefix <= 729) return 'AR';
  if (prefix >= 386 && prefix <= 397) return 'MS';
  if (prefix >= 660 && prefix <= 679) return 'KS';
  if (prefix >= 870 && prefix <= 884) return 'NM';
  if (prefix >= 680 && prefix <= 693) return 'NE';
  if (prefix >= 247 && prefix <= 268) return 'WV';
  if (prefix >= 832 && prefix <= 838) return 'ID';
  if (prefix >= 967 && prefix <= 968) return 'HI';
  if (prefix >= 30 && prefix <= 38) return 'NH';
  if (prefix >= 39 && prefix <= 49) return 'ME';
  if (prefix >= 28 && prefix <= 29) return 'RI';
  if (prefix >= 590 && prefix <= 599) return 'MT';
  if (prefix >= 197 && prefix <= 199) return 'DE';
  if (prefix >= 570 && prefix <= 577) return 'SD';
  if (prefix >= 580 && prefix <= 588) return 'ND';
  if (prefix >= 995 && prefix <= 999) return 'AK';
  if (prefix >= 50 && prefix <= 59) return 'VT';
  if (prefix >= 820 && prefix <= 831) return 'WY';
  if (prefix === 200 || (prefix >= 202 && prefix <= 205)) return 'DC';

  return null;
}

const STREET_SUFFIX_NORMALIZER: Record<string, string> = {
  st: 'St.', str: 'St.', strt: 'St.', street: 'St.', steet: 'St.', sreet: 'St.',
  ave: 'Ave.', av: 'Ave.', avn: 'Ave.', avnue: 'Ave.', avenu: 'Ave.', avenue: 'Ave.', avene: 'Ave.',
  blvd: 'Blvd.', boulv: 'Blvd.', boulvard: 'Blvd.', boulevard: 'Blvd.', blv: 'Blvd.',
  rd: 'Rd.', rod: 'Rd.', road: 'Rd.', raod: 'Rd.',
  dr: 'Dr.', drv: 'Dr.', drive: 'Dr.', drve: 'Dr.',
  ln: 'Ln.', lane: 'Ln.', lne: 'Ln.',
  ct: 'Ct.', crt: 'Ct.', court: 'Ct.',
  pl: 'Pl.', plc: 'Pl.', place: 'Pl.',
  pkwy: 'Pkwy.', parkway: 'Pkwy.', prkwy: 'Pkwy.', pky: 'Pkwy.',
  hwy: 'Hwy.', hw: 'Hwy.', highway: 'Hwy.', higway: 'Hwy.',
  way: 'Way', wy: 'Way',
  cir: 'Cir.', circle: 'Cir.', crcl: 'Cir.',
  trl: 'Trl.', trail: 'Trl.',
  ter: 'Ter.', terr: 'Ter.', terrace: 'Ter.',
  sq: 'Sq.', square: 'Sq.',
  loop: 'Loop', lp: 'Loop',
};

function toTitleCase(str: string): string {
  return str
    .trim()
    .split(/\s+/)
    .map((word) => {
      const clean = word.replace(/\./g, '').toLowerCase();
      if (['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].includes(clean)) {
        return clean.toUpperCase() + (word.endsWith('.') ? '.' : '');
      }
      if (STREET_SUFFIX_NORMALIZER[clean]) {
        return STREET_SUFFIX_NORMALIZER[clean];
      }
      if (/^#\w+$/i.test(word) || /^po$/i.test(clean)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function detectLanguageFromText(text: string): string | null {
  if (!text) return null;
  if (/[\uAC00-\uD7AF]/.test(text)) return 'ko';
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';

  const lower = text.toLowerCase();
  if (/\b(hola|iglesia|nuestra|somos|coordinador|gracias|llegaremos|correo|teléfono|telefono|dirección|direccion|administrador)\b/.test(lower)) {
    return 'es';
  }
  if (/\b(olá|ola|igreja|nossa|coordenador|obrigado|chegaremos|endereço|endereco|oculto|não-denominacional|inscrever)\b/.test(lower)) {
    return 'pt';
  }
  if (/\b(bonjour|église|eglise|notre|coordinateur|merci|arriverons|adresse|quelqu'un|inscrire)\b/.test(lower)) {
    return 'fr';
  }
  if (/\b(kumusta|simbahan|aming|kami|magko-coordinate|darating|ibang|tulungan|irehistro|ako\s+ang|pangalan|pampublikong|nakatago|pinahihintulutan|sumasang-ayon)\b/.test(lower)) {
    return 'tl';
  }
  if (/\b(hallo|gemeinde|kirche|unsere|koordinator|ankommen|adresse|jemand|gemeindeleiter|registrieren|koordiniere|öffentlicher|verborgen|datenschutzerklärung|stimme)\b/.test(lower)) {
    return 'de';
  }
  if (/\b(habari|kanisa|letu|mchungaji|mratibu|tutawasili|anwani|nisaidie|msimamizi|kusajili|nitaratibu|mwingine|ramani|umma|ficha|ninakubali)\b/.test(lower)) {
    return 'sw';
  }
  return null;
}

export function normalizeDenomination(text: string): string | null {
  const lower = text.toLowerCase();
  if (
    lower.includes('non-denom') ||
    lower.includes('nondenom') ||
    lower.includes('non denom') ||
    lower.includes('no denominacional') ||
    lower.includes('não-denominacional') ||
    lower.includes('nao denominacional') ||
    lower.includes('non-dénominationnel') ||
    lower.includes('überkonfessionell') ||
    lower.includes('초교파') ||
    lower.includes('跨宗派') ||
    lower.includes('غير طائفي') ||
    lower.includes('isiyo ya kidhehebu') ||
    lower.includes('walang denominasyon') ||
    lower.includes('independent') ||
    lower.includes('independiente') ||
    lower.includes('bible church')
  ) {
    return 'Non-denominational / Independent';
  }
  if (
    lower.includes('baptist') ||
    lower.includes('baptst') ||
    lower.includes('bautista') ||
    lower.includes('batista') ||
    lower.includes('baptisten') ||
    lower.includes('معمدان') ||
    lower.includes('wabaptisti') ||
    lower.includes('침례') ||
    lower.includes('浸信')
  ) {
    return 'Baptist';
  }
  if (
    lower.includes('methodist') ||
    lower.includes('metodista') ||
    lower.includes('méthodiste') ||
    lower.includes('methodistisch') ||
    lower.includes('ميثود') ||
    lower.includes('wamethodisti') ||
    lower.includes('wesleyan') ||
    lower.includes('감리') ||
    lower.includes('卫理')
  ) {
    return 'Methodist / Wesleyan';
  }
  if (
    lower.includes('presbyterian') ||
    lower.includes('presbiteriana') ||
    lower.includes('presbytérien') ||
    lower.includes('presbyterianisch') ||
    lower.includes('مشيخ') ||
    lower.includes('wapresbiteri') ||
    lower.includes('reformed') ||
    lower.includes('장로') ||
    lower.includes('长老')
  ) {
    return 'Presbyterian / Reformed';
  }
  if (
    lower.includes('pentecostal') ||
    lower.includes('pentecostés') ||
    lower.includes('pentecôtiste') ||
    lower.includes('pfingst') ||
    lower.includes('خمسين') ||
    lower.includes('wapentekoste') ||
    lower.includes('pentekoste') ||
    lower.includes('charismatic') ||
    lower.includes('carismática') ||
    lower.includes('foursquare') ||
    lower.includes('cuadrangular') ||
    lower.includes('church of god') ||
    lower.includes('순복음') ||
    lower.includes('오순절') ||
    lower.includes('五旬节')
  ) {
    return 'Pentecostal / Charismatic';
  }
  if (lower.includes('assembl') || lower.includes('asamblea') || lower.includes('assembleia') || lower.includes('하나님의 성회') || lower.includes('神召会')) {
    return 'Assemblies of God';
  }
  if (lower.includes('calvary chapel')) return 'Calvary Chapel';
  if (lower.includes('evangelical free') || lower.includes('efca') || lower.includes('evangélica') || lower.includes('evangelisch')) {
    return 'Evangelical Free';
  }
  if (lower.includes('lutheran') || lower.includes('luterana') || lower.includes('luthérien') || lower.includes('lutherisch') || lower.includes('لوثر') || lower.includes('walutheri') || lower.includes('루터') || lower.includes('路德')) {
    return 'Lutheran';
  }
  if (lower.includes('anglican') || lower.includes('episcopal') || lower.includes('anglikanisch') || lower.includes('أنجليكان') || lower.includes('waanglikana') || lower.includes('성공회') || lower.includes('圣公会')) {
    return 'Anglican / Episcopal';
  }
  if (lower.includes('catholic') || lower.includes('católica') || lower.includes('catholique') || lower.includes('katholisch') || lower.includes('كاثوليك') || lower.includes('wakatoliki') || lower.includes('katoliko') || lower.includes('가톨릭') || lower.includes('天主教')) {
    return 'Catholic';
  }
  if (lower.includes('other christian') || lower.includes('otra') || lower.includes('outra')) {
    return 'Other Christian Tradition';
  }

  // Exact match check
  for (const d of DENOMINATIONS) {
    if (lower.includes(d.toLowerCase())) return d;
  }
  return null;
}

/**
 * Ultra-flexible, typo-tolerant church & address parser.
 * Handles missing commas, lowercase, state typos, strange separators, out-of-order fields,
 * and partial multi-turn inputs across multiple languages.
 */
export function parseFlexibleAddressAndChurch(
  rawMessage: string,
  current: Record<string, any> = {}
): { extracted: Record<string, any>; highlights: string[] } {
  const extracted: Record<string, any> = {};
  const highlights: string[] = [];

  if (!rawMessage || typeof rawMessage !== 'string') {
    return { extracted, highlights };
  }

  // Strip out email, phone, website, and explicit time expressions so they don't interfere with numbers
  let working = rawMessage
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, ' ')
    .replace(/(https?:\/\/[^\s]+|www\.[^\s]+)/gi, ' ')
    .replace(/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/g, ' ')
    .replace(/\b\d{1,2}:\d{2}\s*(?:am|pm)?\b/gi, ' ')
    .replace(/\b\d{1,2}\s*(?:am|pm)\b/gi, ' ');

  // Strip denomination sentences like "We are Non-denominational" or "Somos No denominacional" or Arabic "نحن غير طائفيين (Non-denominational)" so they don't pollute city/state
  working = working
    .replace(/(?:\b(?:we are|somos|nous sommes|wir sind|kami ay|sisi ni|denomination is|affiliation is)|نحن)\s+[^.]+?(?:\.|$)/gi, ' ')
    .replace(/\((?:non-denominational|baptist|methodist|presbyterian|pentecostal|lutheran|catholic|anglican)\)/gi, ' ');

  // 1. Church Name extraction (case-insensitive & typo-tolerant + multilingual church keywords)
  const churchKeywords =
    '(?:church|chruch|chuch|fellowship|felloship|chapel|chaple|ministries|ministry|minstries|assembly|cathedral|parish|tabernacle|temple|center|centre|iglesia|igreja|église|eglise|gemeinde|kirche|simbahan|kanisa)';

  // Pattern A: Explicit intro + church name before "at", "en", "em", "au", ",", "-", or street number
  const churchBeforeAddr = working.match(
    new RegExp(
      `(?:our church is|church name is|nuestra iglesia es|nossa igreja é|notre église est|ang aming simbahan ay|kanisa letu ni|unsere gemeinde ist(?:\\s+die)?|unsere kirche ist(?:\\s+die)?|كنيستنا هي|we are from|we are|registering|from)?\\s*([a-zA-ZÀ-ÿ0-9\\s&'.-]+?\\b${churchKeywords}(?:\\s+[a-zA-ZÀ-ÿ0-9&'.-]+){0,3})\\b(?:\\s+(?:at|in|en|em|au|sa|katika|في|located at|located in|on|address is|is at)|[,\\-/،]|\\s+(?=\\d+\\s+[a-zA-Z]))`,
      'i'
    )
  );
  // Pattern B: "our church is [Name] at [number]..." even without "Church" keyword in the name
  const churchBeforeAtNum = working.match(
    /(?:our church is|church name is|church is|nuestra iglesia es|nossa igreja é|notre église est|ang aming simbahan ay|kanisa letu ni|unsere gemeinde ist(?:\s+die)?|unsere kirche ist(?:\s+die)?|كنيستنا هي|registering)\s+([a-zA-ZÀ-ÿ0-9\s&'.-]{2,40}?)\s+(?:at|en|em|au|sa|katika|in|في|located at|on|,|-|،)\s*(?=\d+\s+[a-zA-Z]|p\.?o\.?\s*box)/i
  );
  // Pattern C: Standalone church name anywhere in text
  const churchStandalone = working.match(
    new RegExp(
      `(?:our church is|church name is|nuestra iglesia es|nossa igreja é|notre église est|ang aming simbahan ay|kanisa letu ni|unsere gemeinde ist(?:\\s+die)?|كنيستنا هي|we are|registering)?\\s*\\b([a-zA-ZÀ-ÿ0-9&'.-]+(?:\\s+[a-zA-ZÀ-ÿ0-9&'.-]+){0,4}\\s+${churchKeywords}|${churchKeywords}\\s+[a-zA-ZÀ-ÿ0-9&'.-]+(?:\\s+[a-zA-ZÀ-ÿ0-9&'.-]+){0,3})\\b`,
      'i'
    )
  );

  const matchedChurch =
    (churchBeforeAddr && churchBeforeAddr[1]) ||
    (churchBeforeAtNum && churchBeforeAtNum[1]) ||
    (!current.churchName && churchStandalone && churchStandalone[1]);

  if (matchedChurch) {
    const cleanedChurch = matchedChurch
      .replace(/^[\s.,;:\-،]+/, '')
      .replace(/^(?:our church is|church name is|church is|nuestra iglesia es|nossa igreja é|notre église est|ang aming simbahan ay|kanisa letu ni|unsere gemeinde ist(?:\s+die)?|unsere kirche ist(?:\s+die)?|we are from|we are|registering|from|the|la|el|die)\s+/i, '')
      .replace(/^[\s.,;:\-،]+/, '')
      .trim();

    if (cleanedChurch.length >= 3 && !/^(?:public|hidden|someone|pastor|agree|consent)/i.test(cleanedChurch)) {
      if (!current.churchName) {
        extracted.churchName = toTitleCase(
          cleanedChurch
            .replace(/\bchruch\b|\bchuch\b/gi, 'Church')
            .replace(/\bfelloship\b/gi, 'Fellowship')
            .replace(/\bchaple\b/gi, 'Chapel')
            .replace(/\bminstries\b/gi, 'Ministries')
        );
        highlights.push('churchName');
      }
      // Remove the matched church phrase from `working` so we can cleanly parse the address
      working = working.replace(matchedChurch, ' ');
    }
  }

  // Clean leading conversational filler from `working`
  working = working
    .replace(/\b(?:our address is|the address is|address is|located at|we are at|we're at|it is at|it's at|at|en|em|au|sa|katika)\b/gi, ' ')
    .replace(/[\uAC00-\uD7AF\u4E00-\u9FFF\u0600-\u06FF]+/g, ' ')
    .trim();

  // Check for international country mentions
  const countryMap: Array<[RegExp, string]> = [
    [/\b(?:canada|canadá)\b/i, 'Canada'],
    [/\b(?:mexico|méxico)\b/i, 'Mexico'],
    [/\b(?:brazil|brasil)\b/i, 'Brazil'],
    [/\b(?:colombia)\b/i, 'Colombia'],
    [/\b(?:argentina)\b/i, 'Argentina'],
    [/\b(?:united kingdom|uk|england|reino unido)\b/i, 'United Kingdom'],
    [/\b(?:france|francia)\b/i, 'France'],
    [/\b(?:germany|deutschland|alemania)\b/i, 'Germany'],
    [/\b(?:spain|españa|espana)\b/i, 'Spain'],
    [/\b(?:south korea|korea|corea|한국|대한민국)\b/i, 'South Korea'],
    [/\b(?:philippines|pilipinas|filipinas)\b/i, 'Philippines'],
    [/\b(?:china|中国)\b/i, 'China'],
    [/\b(?:india)\b/i, 'India'],
    [/\b(?:nigeria)\b/i, 'Nigeria'],
    [/\b(?:kenya)\b/i, 'Kenya'],
    [/\b(?:south africa|sudáfrica)\b/i, 'South Africa'],
    [/\b(?:australia)\b/i, 'Australia'],
    [/\b(?:new zealand|nueva zelanda)\b/i, 'New Zealand'],
    [/\b(?:egypt|egipto|مصر)\b/i, 'Egypt'],
    [/\b(?:united states|usa|u\.s\.a\.|u\.s\.|estados unidos)\b/i, 'United States'],
  ];

  for (const [regex, countryName] of countryMap) {
    if (regex.test(working)) {
      extracted.country = countryName;
      highlights.push('country');
      working = working.replace(new RegExp(regex.source, 'gi'), ' ');
      break;
    }
  }

  // 2. Look for ZIP / Postal Code
  // Canadian Postal Code (e.g. M5V 2T6)
  let foundZip = '';
  const canadianZipMatch = working.match(/\b([A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d)\b/);
  if (canadianZipMatch) {
    foundZip = canadianZipMatch[1].toUpperCase();
    working = working.replace(canadianZipMatch[0], ' ');
    if (!extracted.country && !current.country) {
      extracted.country = 'Canada';
      highlights.push('country');
    }
  } else {
    // Find all 5-digit numbers (or 5+4)
    const zipMatches = [...working.matchAll(/\b(\d{5}(?:-\d{4})?)\b/g)];
    if (zipMatches.length > 0) {
      // If there are multiple numbers or if the 5-digit number is near the end (not the only number at the very start followed by a street name)
      const lastMatch = zipMatches[zipMatches.length - 1];
      const idx = lastMatch.index || 0;
      const afterText = working.slice(idx + lastMatch[0].length).trim();
      const beforeText = working.slice(0, idx).trim();

      if (beforeText.length > 0 || (afterText === '' && current.address)) {
        foundZip = lastMatch[1];
        working = working.slice(0, idx) + ' ' + working.slice(idx + lastMatch[0].length);
      }
    }
  }

  if (foundZip) {
    extracted.zipCode = foundZip;
    highlights.push('zipCode');
  }

  // 3. Look for State / Province (Full name, typo, or 2-letter code)
  let foundState = '';
  const normalizedWorking = working.replace(/[.,;()/]+/g, ' ').replace(/\s+/g, ' ').trim();

  // Check multi-word and single-word state names/typos first (longest keys first)
  const sortedStateKeys = Object.keys(STATE_NAME_AND_TYPO_MAP).sort((a, b) => b.length - a.length);
  for (const key of sortedStateKeys) {
    const regex = new RegExp(`(?:^|\\s|,|-|/)(${key})(?=\\s*$|\\s*,|\\s*-|\\s*/)`, 'i');
    const m = normalizedWorking.match(regex);
    if (m) {
      foundState = STATE_NAME_AND_TYPO_MAP[key];
      // Remove matched state from the end of `working`
      const lastIdx = working.toLowerCase().lastIndexOf(m[1].toLowerCase());
      if (lastIdx !== -1) {
        working = working.slice(0, lastIdx) + ' ' + working.slice(lastIdx + m[1].length);
      }
      break;
    }
  }

  // If no spelled-out state matched, check for 2-letter state code at the end of the remaining string
  if (!foundState) {
    const cleanedEnd = working.replace(/[\s,.\-/;()]+$/g, '').trim();
    const tokens = cleanedEnd.split(/[\s,/-]+/);
    if (tokens.length >= 1) {
      const lastToken = tokens[tokens.length - 1].replace(/[^a-zA-Z]/g, '').toUpperCase();
      if (VALID_STATE_CODES.has(lastToken)) {
        // Make sure it's not a directional after a street number with nothing else (unless address is already filled)
        if (tokens.length >= 2 || current.address) {
          foundState = lastToken;
          working = cleanedEnd.replace(new RegExp(`\\b${tokens[tokens.length - 1]}\\s*$`, 'i'), '').trim();
        }
      }
    }
  }

  // If still no state, but we have a US 5-digit ZIP code, infer the state from the ZIP!
  if (!foundState && foundZip) {
    const inferred = inferStateFromZip(foundZip);
    if (inferred) {
      foundState = inferred;
    }
  }

  if (foundState) {
    extracted.state = foundState;
    highlights.push('state');
    if (!extracted.country && !current.country) {
      extracted.country = 'United States';
      highlights.push('country');
    }
  }

  // 4. Now parse Street Address and City from the remaining `working` text
  // Clean trailing punctuation/separators
  let remainder = working
    .replace(/^[\s,.\-/;:]+|[\s,.\-/;:]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Look for street start: either a street number (e.g. "106 E Shields...") or "PO Box 123"
  const streetStartMatch =
    remainder.match(/^(.*?)\b(p\.?\s*o\.?\s*box\s+\d+.*)$/i) ||
    remainder.match(/^(.*?)\b(\d+\s+[a-zA-Z0-9.,;\s#'/-]+)$/);

  if (streetStartMatch) {
    let prefixBeforeStreet = (streetStartMatch[1] || '')
      .replace(/^(?:our church is|church name is|church is|we are from|we are|registering|from|the)\s+/i, '')
      .replace(/\s+(?:at|in|located at|located in|on|address is|is at|[,/\-;:])\s*$/i, '')
      .replace(/^[\s,.\-/;:]+|[\s,.\-/;:]+$/g, '')
      .trim();

    // Check if prefixBeforeStreet actually contains "in [City], [State]" (e.g. "In Fresno, CA at 106 E Shields Ave")
    const inCityPrefix = prefixBeforeStreet.match(/^(?:in|located in|city of)\s+([a-zA-Z\s'.-]+)$/i);
    if (inCityPrefix && !current.city && !extracted.city) {
      const cityWords = inCityPrefix[1].trim().split(/[\s,]+/);
      const lastWord = cityWords[cityWords.length - 1].toUpperCase();
      if (VALID_STATE_CODES.has(lastWord) && cityWords.length >= 2) {
        extracted.state = lastWord;
        extracted.city = toTitleCase(cityWords.slice(0, -1).join(' '));
        highlights.push('city', 'state');
      } else {
        extracted.city = toTitleCase(inCityPrefix[1].trim());
        highlights.push('city');
      }
      prefixBeforeStreet = '';
    }

    if (
      prefixBeforeStreet.length >= 2 &&
      prefixBeforeStreet.split(/\s+/).length <= 6 &&
      !current.churchName &&
      !extracted.churchName &&
      !/\b(?:pastor|my name|email|phone|arrive|morning|someone|coordinator|public|hidden|consent|agree)\b/i.test(prefixBeforeStreet)
    ) {
      extracted.churchName = toTitleCase(
        prefixBeforeStreet
          .replace(/\bchruch\b|\bchuch\b/gi, 'Church')
          .replace(/\bfelloship\b/gi, 'Fellowship')
          .replace(/\bchaple\b/gi, 'Chapel')
          .replace(/\bminstries\b/gi, 'Ministries')
      );
      highlights.push('churchName');
    }

    const addrCandidate = streetStartMatch[2].trim();

    // Check if there are explicit delimiters (comma, " - ", "/", ";", " in ")
    const delimiterParts = addrCandidate
      .split(/\s*(?:,|\/|;|\s-\s|\sin\s)\s*/i)
      .map((s) => s.trim())
      .filter(Boolean);

    const lastPart = delimiterParts[delimiterParts.length - 1] || '';
    const isLastPartUnit = /^(?:ste|suite|apt|apartment|unit|bldg|building|fl|floor|rm|room|#)\b/i.test(lastPart) || /\d/.test(lastPart);

    if (delimiterParts.length >= 2 && !isLastPartUnit) {
      // First part(s) are street address, last part is city
      const rawCity = lastPart
        .replace(/\b(?:city|town)\b/gi, '')
        .trim();
      const rawStreet = delimiterParts.slice(0, delimiterParts.length - 1).join(', ').trim();

      if (rawStreet) {
        extracted.address = toTitleCase(rawStreet);
        highlights.push('address');
      }
      if (rawCity && /^[a-zA-Z\s'.-]+$/.test(rawCity)) {
        extracted.city = toTitleCase(rawCity);
        highlights.push('city');
      }
    } else {
      // No comma or delimiter separating city! E.g. "106 e shileds avnue fresno" or "1200 church st austin" or "106 e shields ave"
      const suffixKeys = Object.keys(STREET_SUFFIX_NORMALIZER)
        .sort((a, b) => b.length - a.length)
        .join('|');
      // Match: [street number + street name + street suffix + optional 1-2 char directional + optional unit/apt] + [optional city words]
      const suffixSplitRegex = new RegExp(
        `^(\\d+\\s+(?:[a-zA-Z0-9.'-]+\\s+){1,5}?\\b(?:${suffixKeys})\\b\\.?\\s*(?:\\b(?:n|s|e|w|ne|nw|se|sw)\\b\\.?\\s*)?(?:(?:ste|suite|apt|unit|bldg|#)\\s*[a-zA-Z0-9-]+\\s*)?)(.*)$`,
        'i'
      );

      const suffixMatch = addrCandidate.match(suffixSplitRegex);
      if (suffixMatch) {
        const rawStreet = suffixMatch[1].trim();
        const rawCity = suffixMatch[2].replace(/^[\s,.\-/]+|[\s,.\-/]+$/g, '').trim();

        extracted.address = toTitleCase(rawStreet);
        highlights.push('address');

        if (rawCity && /^[a-zA-Z\s'.-]+$/.test(rawCity) && rawCity.length >= 2) {
          extracted.city = toTitleCase(rawCity);
          highlights.push('city');
        }
      } else {
        // What if there is NO street suffix at all? E.g., "106 E Shields Fresno" (when state or zip was found)
        const words = addrCandidate.split(/\s+/);
        if ((foundState || foundZip) && words.length >= 4) {
          const secondLast = words[words.length - 2].toLowerCase().replace(/\./g, '');
          const twoWordCityPrefixes = ['san', 'los', 'new', 'st', 'saint', 'fort', 'ft', 'mount', 'mt', 'las', 'el', 'santa', 'palm', 'grand', 'salt', 'kansas', 'oklahoma', 'virginia', 'colorado', 'baton', 'des', 'little', 'sioux', 'cedar', 'bowling', 'corpus', 'west', 'east', 'north', 'south'];
          const cityWordCount = twoWordCityPrefixes.includes(secondLast) && words.length >= 5 ? 2 : 1;

          const rawStreet = words.slice(0, words.length - cityWordCount).join(' ');
          const rawCity = words.slice(words.length - cityWordCount).join(' ');

          extracted.address = toTitleCase(rawStreet);
          highlights.push('address');
          if (/^[a-zA-Z\s'.-]+$/.test(rawCity)) {
            extracted.city = toTitleCase(rawCity);
            highlights.push('city');
          }
        } else {
          // Just a street address by itself (e.g. "106 E Shields")
          extracted.address = toTitleCase(addrCandidate);
          highlights.push('address');
        }
      }
    }
  } else if (remainder && (foundState || foundZip || current.address) && !current.city) {
    // No street number in this message, e.g. user replied "Fresno, CA 93704" or "Fresno California" or just "Fresno" after giving street address
    const cityClean = remainder
      .replace(/^(?:in|city is|city of|it is in|we are in)\s+/i, '')
      .replace(/[^a-zA-Z\s'.-]/g, '')
      .trim();

    if (
      cityClean.length >= 2 &&
      cityClean.split(/\s+/).length <= 4 &&
      !/\b(?:pastor|coordinator|someone|public|hidden|agree|consent|morning|afternoon|baptist|methodist|catholic|lutheran)\b/i.test(cityClean)
    ) {
      extracted.city = toTitleCase(cityClean);
      highlights.push('city');
    }
  }

  return { extracted, highlights };
}
