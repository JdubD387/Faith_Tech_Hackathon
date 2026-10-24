export type LanguageCode = 'en' | 'es' | 'pt' | 'fr' | 'ko' | 'zh' | 'tl' | 'de' | 'ar' | 'sw';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  speechLang: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🌐', speechLang: 'en-US', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechLang: 'es-ES', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', speechLang: 'pt-BR', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', speechLang: 'fr-FR', dir: 'ltr' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', speechLang: 'ko-KR', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', speechLang: 'zh-CN', dir: 'ltr' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭', speechLang: 'tl-PH', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechLang: 'de-DE', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🌍', speechLang: 'ar-SA', dir: 'rtl' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', speechLang: 'sw-KE', dir: 'ltr' },
];

export interface TranslationDictionary {
  // Header & Navigation
  badgeAiAssisted: string;
  eventSubtitle: string;
  navChatAssistant: string;
  navValidateForm: string;
  howItWorksTitle: string;
  howItWorksStep1: string;
  howItWorksStep2: string;
  howItWorksStep3: string;
  closeBtn: string;
  languageLabel: string;

  // Chat View Banner & Assistant
  conversationalModeTitle: string;
  conversationalModeDesc: string;
  inspectFormBtn: string;
  assistantTitle: string;
  assistantBadge: string;
  assistantSubtitle: string;
  examplesBtn: string;
  resetConfirm: string;
  progressLabel: string;
  progressStatus: (done: number, total: number, pct: number) => string;
  capturedLabel: string;
  coordinatorSelfShort: string;
  coordinatorOtherShort: string;
  mapPublicShort: string;
  mapHiddenShort: string;
  tryScenarioTitle: string;
  fieldsSyncedLabel: string;
  analyzingStatus: string;
  inputPlaceholder: string;
  sendBtn: string;
  footerAutoExtractNote: string;
  footerConsentNote: string;
  welcomeMessage: string;
  welcomeQuickReplies: string[];
  resetWelcomeMessage: string;
  demoSamples: { title: string; description: string; message: string }[];

  // Validation View & Registration Form
  validationBannerTitle: string;
  validationBannerReady: string;
  validationBannerFields: (done: number, total: number) => string;
  validationBannerDesc: string;
  returnToChatBtn: string;
  wantToEditWithAi: string;
  askChatAssistantBtn: string;
  aiUpdatedBadge: string;
  formHeaderBadge: string;
  formHeaderTitle: string;
  formHeaderSubtitle: string;
  requiredNote: string;

  // Form Sections & Fields
  sec1Title: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;

  sec2Title: string;
  churchNameLabel: string;
  churchNamePlaceholder: string;
  countryLabel: string;
  denominationLabel: string;
  denominationPlaceholder: string;
  addressLabel: string;
  addressPlaceholder: string;
  cityLabel: string;
  cityPlaceholder: string;
  stateLabel: string;
  statePlaceholder: string;
  zipLabel: string;
  zipPlaceholder: string;
  websiteLabel: string;
  optionalTag: string;

  sec3Title: string;
  arrivalTimeLabel: string;
  hourPlaceholder: string;
  arrivalTimeHint: string;
  coordinatorLabel: string;
  coordSelfTitle: string;
  coordSelfDesc: string;
  coordOtherTitle: string;
  coordOtherDesc: string;
  coordDetailsHeader: string;
  coordNameLabel: string;
  coordEmailLabel: string;
  coordPhoneLabel: string;

  sec4Title: string;
  sec4Subtitle: string;
  mapPublicTitle: string;
  mapPublicDesc: string;
  mapHiddenTitle: string;
  mapHiddenDesc: string;

  sec5Title: string;
  requiresExplicitApproval: string;
  dataProcessingConsentTitle: string;
  dataProcessingConsentBody: string;
  commitmentsDeferredTitle: string;
  commitmentsDeferredBadge: string;
  commitmentsDeferredDesc: string;
  commitmentItem1: string;
  commitmentItem2: string;
  commitmentItem3: string;

  sec6Title: string;
  smsAlertsTitle: string;
  smsAlertsDesc: string;

  finalConfirmTitle: string;
  finalConfirmDesc: string;
  submitBtnReady: string;
  submitBtnIncomplete: string;

  // Review Modal & Success Screen
  reviewModalTitle: string;
  reviewModalSubtitle: string;
  editMoreBtn: string;
  confirmRegisterBtn: string;
  successTitle: string;
  successSubtitle: (name: string, church: string) => string;
  confirmationRefLabel: string;
  registeredLocationHeader: string;
  eventLogisticsHeader: string;
  whatHappensNextTitle: string;
  nextStep1: (email: string) => string;
  nextStep2: string;
  nextStep3SmsOn: string;
  nextStep3SmsOff: string;
  registerAnotherBtn: string;
  printReceiptBtn: string;
  downloadPdfBtn: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    badgeAiAssisted: 'AI-Assisted Registration',
    eventSubtitle: 'Global Church Unity & Baptism Gathering',
    navChatAssistant: 'Chat Assistant',
    navValidateForm: 'Validate Form',
    howItWorksTitle: 'Chat-First Multilingual Registration & Form Validation',
    howItWorksStep1: '1. Chat in Any Language: Speak or type naturally in your preferred language.',
    howItWorksStep2: '2. Automated Field Mapping: The assistant extracts and formats addresses, times, and contacts automatically.',
    howItWorksStep3: '3. Form Validation Screen: Once all details are gathered, validate and submit the official registration form.',
    closeBtn: 'Close',
    languageLabel: 'Language',

    conversationalModeTitle: 'Conversational Registration Mode',
    conversationalModeDesc: 'Talk freely with the assistant below in any language. The form will appear for validation once all fields are gathered.',
    inspectFormBtn: 'Inspect Form',
    assistantTitle: 'Baptize The World Assistant',
    assistantBadge: 'Multilingual AI',
    assistantSubtitle: 'Chat naturally in your language — I will fill out the registration form for you',
    examplesBtn: 'Examples',
    resetConfirm: 'Are you sure you want to reset all form fields and conversation?',
    progressLabel: 'Registration Progress',
    progressStatus: (done, total, pct) => `${done} of ${total} required details (${pct}%)`,
    capturedLabel: 'Captured:',
    coordinatorSelfShort: 'Self',
    coordinatorOtherShort: 'Designated',
    mapPublicShort: 'Public',
    mapHiddenShort: 'Hidden',
    tryScenarioTitle: 'Try a Quick Scenario (Simulate natural user response):',
    fieldsSyncedLabel: 'Form fields synced:',
    analyzingStatus: 'Analyzing and updating form...',
    inputPlaceholder: "Type in your language (e.g. '106 E. Shields Ave., Fresno, CA 93704')...",
    sendBtn: 'Send',
    footerAutoExtractNote: 'AI automatically extracts international addresses, times & names.',
    footerConsentNote: 'Sensitive consents require explicit user confirmation.',
    welcomeMessage:
      "Welcome to Baptize The World! I am your multilingual registration assistant. You can chat with me in any language, and once all your details are collected, I'll present the registration form for you to validate and submit.\n\nTo get started, what is your full name, email address, and mobile phone number?",
    welcomeQuickReplies: [
      'Pastor David Miller, david@gracefellowship.org, (559) 555-0192',
      'I am the church administrator',
      'Hola, quiero registrar nuestra iglesia',
    ],
    resetWelcomeMessage:
      "Form reset! Let's start fresh. Who is the primary contact person registering this church?",
    demoSamples: [
      {
        title: 'Full Address in Fresno',
        description: 'Pastes complete address in one sentence',
        message: 'Our church is Grace Fellowship Church at 106 E. Shields Ave., Fresno, CA 93704. We are Non-denominational.',
      },
      {
        title: 'Pastor Contact Info',
        description: 'Provides multiple contact fields at once',
        message: 'Hi, I am Pastor David Miller. My email is david@gracefellowship.org and my mobile number is (559) 555-0192.',
      },
      {
        title: 'Arrival Time Natural Format',
        description: 'Mentions morning arrival time naturally',
        message: 'We will be arriving at 9:30 AM with our ministry team.',
      },
      {
        title: 'Delegate to Someone Else',
        description: 'Selects someone else as coordinator',
        message: 'Someone else will be coordinating for our church: Sarah Miller, sarah@gracefellowship.org, 559-555-8821.',
      },
    ],

    validationBannerTitle: 'Form Validation & Final Verification',
    validationBannerReady: 'All Fields Gathered',
    validationBannerFields: (done, total) => `${done}/${total} Fields`,
    validationBannerDesc:
      'Here is your completed registration form. Please review your answers, adjust any field directly if desired, confirm your participation, and submit.',
    returnToChatBtn: 'Return to Chat Assistant',
    wantToEditWithAi: 'Want to edit anything with conversational guidance?',
    askChatAssistantBtn: 'Ask the Chat Assistant',
    aiUpdatedBadge: 'AI updated',
    formHeaderBadge: 'Baptize The World Registration',
    formHeaderTitle: 'Event Registration Details',
    formHeaderSubtitle: 'Fields automatically update as you chat with the assistant, or you can edit any field directly below.',
    requiredNote: 'Required fields marked with',

    sec1Title: 'Registrant & Contact Information',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'e.g. Pastor David Miller',
    emailLabel: 'Email Address',
    emailPlaceholder: 'name@church.org',
    phoneLabel: 'Mobile Phone Number',
    phonePlaceholder: '+1 (559) 555-0192',

    sec2Title: 'Church & Location Details',
    churchNameLabel: 'Church Name',
    churchNamePlaceholder: 'e.g. Grace Fellowship Church',
    countryLabel: 'Country',
    denominationLabel: 'Denomination',
    denominationPlaceholder: 'Select Denomination / Tradition...',
    addressLabel: 'Street Address',
    addressPlaceholder: 'e.g. 106 E. Shields Ave.',
    cityLabel: 'City',
    cityPlaceholder: 'Fresno',
    stateLabel: 'State / Province / Region',
    statePlaceholder: 'CA',
    zipLabel: 'Postal / ZIP Code',
    zipPlaceholder: '93704',
    websiteLabel: 'Church Website',
    optionalTag: '(Optional)',

    sec3Title: 'Event Arrival Time & Coordinator Role',
    arrivalTimeLabel: 'Event Arrival Time',
    hourPlaceholder: 'Hour',
    arrivalTimeHint: 'Natural conversation: "We\'ll arrive at 9:30 AM"',
    coordinatorLabel: 'Event Coordinator',
    coordSelfTitle: 'I will coordinate',
    coordSelfDesc: 'I am the main coordinator',
    coordOtherTitle: 'Someone else',
    coordOtherDesc: 'Assign a team member',
    coordDetailsHeader: 'Additional Coordinator Details Required',
    coordNameLabel: 'Coordinator Name',
    coordEmailLabel: 'Coordinator Email',
    coordPhoneLabel: 'Coordinator Phone',

    sec4Title: 'Map Visibility Choice',
    sec4Subtitle: 'Please choose how your church location should be displayed. The AI assistant will never make this decision for you.',
    mapPublicTitle: 'Public Map Listing',
    mapPublicDesc: 'Display your church pin on the public gathering map, attendee directory, and global prayer network.',
    mapHiddenTitle: 'Hidden / Unlisted',
    mapHiddenDesc: 'Keep your address private from the public map. Only registered hosts and verified staff will see details.',

    sec5Title: 'Privacy & Data-Use Consent',
    requiresExplicitApproval: 'Requires your explicit approval',
    dataProcessingConsentTitle: 'Data Processing Consent',
    dataProcessingConsentBody:
      'I consent to Baptize The World securely storing and processing our church registration details for event logistics, attendee check-in, and communications in accordance with the event Privacy Policy.',
    commitmentsDeferredTitle: 'Participation Commitments',
    commitmentsDeferredBadge: 'To be confirmed at a later time',
    commitmentsDeferredDesc:
      'Host orientation attendance, welcoming volunteers, and event conduct commitments will be asked for and confirmed at a later time closer to the gathering date.',
    commitmentItem1: 'Host Orientation (Later)',
    commitmentItem2: 'Volunteer Greeters (Later)',
    commitmentItem3: 'Code of Conduct (Later)',

    sec6Title: 'Communication Preferences',
    smsAlertsTitle: 'Optional Text-Message Alerts:',
    smsAlertsDesc: 'Receive real-time day-of event updates, directions, and check-in announcements via SMS on mobile phone.',

    finalConfirmTitle: 'Final Participation Confirmation',
    finalConfirmDesc: "I solemnly confirm our church's official registration and intent to participate in the Baptize The World Gathering.",
    submitBtnReady: 'Complete & Submit Church Registration',
    submitBtnIncomplete: 'Complete Required Fields to Submit',

    reviewModalTitle: 'Review Registration Summary',
    reviewModalSubtitle: 'Please verify all church details and choices before final submission.',
    editMoreBtn: 'Edit More',
    confirmRegisterBtn: 'Confirm & Officially Register',
    successTitle: 'Church Registration Confirmed!',
    successSubtitle: (name, church) =>
      `Thank you, ${name}. ${church} is officially registered for the Baptize The World Gathering.`,
    confirmationRefLabel: 'Confirmation Reference:',
    registeredLocationHeader: 'Registered Gathering Location',
    eventLogisticsHeader: 'Event Logistics',
    whatHappensNextTitle: 'What Happens Next:',
    nextStep1: (email) =>
      `A confirmation packet has been dispatched to ${email} with printable signage and welcoming guidelines.`,
    nextStep2: 'Your team coordinator will receive calendar invitations for the 30-minute host orientation briefing.',
    nextStep3SmsOn: 'SMS alerts are active for day-of dispatch and announcements.',
    nextStep3SmsOff: 'SMS alerts were not requested (you can opt in later if desired).',
    registerAnotherBtn: 'Register Another Church',
    printReceiptBtn: 'Print Receipt',
    downloadPdfBtn: 'Download PDF Summary',
  },

  es: {
    badgeAiAssisted: 'Registro Asistido por IA',
    eventSubtitle: 'Encuentro Mundial de Unidad y Bautismo de Iglesias',
    navChatAssistant: 'Asistente de Chat',
    navValidateForm: 'Validar Formulario',
    howItWorksTitle: 'Registro Multilingüe por Chat y Validación de Formulario',
    howItWorksStep1: '1. Chatea en tu Idioma: Habla o escribe con naturalidad los datos de tu iglesia.',
    howItWorksStep2: '2. Llenado Automático: El asistente extrae direcciones, horarios y contactos automáticamente.',
    howItWorksStep3: '3. Validación Final: Al completar los datos, aparece el formulario para tu revisión y envío.',
    closeBtn: 'Cerrar',
    languageLabel: 'Idioma',

    conversationalModeTitle: 'Modo de Registro Conversacional',
    conversationalModeDesc: 'Habla libremente con el asistente abajo. El formulario aparecerá para tu validación una vez reunidos todos los datos.',
    inspectFormBtn: 'Ver Formulario',
    assistantTitle: 'Asistente de Baptize The World',
    assistantBadge: 'IA Multilingüe',
    assistantSubtitle: 'Habla con naturalidad — completaré el formulario de registro por ti',
    examplesBtn: 'Ejemplos',
    resetConfirm: '¿Estás seguro de que deseas reiniciar todos los campos y la conversación?',
    progressLabel: 'Progreso del Registro',
    progressStatus: (done, total, pct) => `${done} de ${total} datos requeridos (${pct}%)`,
    capturedLabel: 'Capturado:',
    coordinatorSelfShort: 'Yo mismo',
    coordinatorOtherShort: 'Designado',
    mapPublicShort: 'Público',
    mapHiddenShort: 'Oculto',
    tryScenarioTitle: 'Prueba un Ejemplo Rápido (Simular respuesta natural):',
    fieldsSyncedLabel: 'Campos actualizados:',
    analyzingStatus: 'Analizando y actualizando el formulario...',
    inputPlaceholder: "Escribe aquí (ej. 'Iglesia Gracia, 106 E. Shields Ave., Fresno, CA 93704')...",
    sendBtn: 'Enviar',
    footerAutoExtractNote: 'La IA extrae automáticamente direcciones, horarios y nombres.',
    footerConsentNote: 'Los consentimientos requieren tu confirmación explícita.',
    welcomeMessage:
      '¡Bienvenido a Baptize The World! Soy tu asistente de registro multilingüe. Conversa conmigo con naturalidad y, una vez recopilados todos los datos, te mostraré el formulario completo para que lo valides y envíes.\n\nPara comenzar, ¿cuál es tu nombre completo, correo electrónico y número de teléfono móvil?',
    welcomeQuickReplies: [
      'Pastor Carlos Mendoza, carlos@iglesiagracia.org, (559) 555-0192',
      'Soy el administrador de la iglesia',
      'Ayúdame a registrar nuestra iglesia',
    ],
    resetWelcomeMessage:
      '¡Formulario reiniciado! Comencemos de nuevo. ¿Quién es la persona de contacto principal que registra esta iglesia?',
    demoSamples: [
      {
        title: 'Dirección Completa',
        description: 'Ingresa nombre de iglesia, dirección y denominación',
        message: 'Nuestra iglesia es Iglesia Gracia en 106 E. Shields Ave., Fresno, CA 93704. Somos No denominacional.',
      },
      {
        title: 'Datos de Contacto del Pastor',
        description: 'Proporciona nombre, correo y teléfono a la vez',
        message: 'Hola, soy el Pastor Carlos Mendoza. Mi correo es carlos@iglesiagracia.org y mi celular es (559) 555-0192.',
      },
      {
        title: 'Hora de Llegada',
        description: 'Indica la hora de llegada del equipo',
        message: 'Llegaremos a las 9:30 AM con nuestro equipo ministerial.',
      },
      {
        title: 'Designar a Otra Persona',
        description: 'Asigna a otro miembro como coordinador',
        message: 'Otra persona coordinará por nuestra iglesia: Elena Morales, elena@iglesiagracia.org, 559-555-8821.',
      },
    ],

    validationBannerTitle: 'Validación del Formulario y Verificación Final',
    validationBannerReady: 'Todos los Campos Completos',
    validationBannerFields: (done, total) => `${done}/${total} Campos`,
    validationBannerDesc:
      'Aquí está tu formulario de registro completado. Revisa tus respuestas, edita cualquier campo si lo deseas, confirma tu participación y envíalo.',
    returnToChatBtn: 'Volver al Chat',
    wantToEditWithAi: '¿Deseas editar algo conversando con el asistente?',
    askChatAssistantBtn: 'Preguntar al Asistente',
    aiUpdatedBadge: 'Actualizado por IA',
    formHeaderBadge: 'Registro Baptize The World',
    formHeaderTitle: 'Detalles de Registro del Evento',
    formHeaderSubtitle: 'Los campos se actualizan mientras hablas con el asistente, o puedes editarlos directamente abajo.',
    requiredNote: 'Campos obligatorios marcados con',

    sec1Title: 'Información del Registrante y Contacto',
    fullNameLabel: 'Nombre Completo',
    fullNamePlaceholder: 'ej. Pastor Carlos Mendoza',
    emailLabel: 'Correo Electrónico',
    emailPlaceholder: 'nombre@iglesia.org',
    phoneLabel: 'Teléfono Móvil',
    phonePlaceholder: '+1 (559) 555-0192',

    sec2Title: 'Detalles y Ubicación de la Iglesia',
    churchNameLabel: 'Nombre de la Iglesia',
    churchNamePlaceholder: 'ej. Iglesia Comunidad de Gracia',
    countryLabel: 'País',
    denominationLabel: 'Denominación',
    denominationPlaceholder: 'Seleccionar Denominación / Tradición...',
    addressLabel: 'Dirección (Calle y Número)',
    addressPlaceholder: 'ej. 106 E. Shields Ave.',
    cityLabel: 'Ciudad',
    cityPlaceholder: 'Fresno',
    stateLabel: 'Estado / Provincia / Región',
    statePlaceholder: 'CA',
    zipLabel: 'Código Postal / ZIP',
    zipPlaceholder: '93704',
    websiteLabel: 'Sitio Web de la Iglesia',
    optionalTag: '(Opcional)',

    sec3Title: 'Hora de Llegada y Rol de Coordinador',
    arrivalTimeLabel: 'Hora de Llegada al Evento',
    hourPlaceholder: 'Hora',
    arrivalTimeHint: 'Conversación natural: "Llegaremos a las 9:30 AM"',
    coordinatorLabel: 'Coordinador del Evento',
    coordSelfTitle: 'Yo coordinaré',
    coordSelfDesc: 'Soy el coordinador principal',
    coordOtherTitle: 'Otra persona',
    coordOtherDesc: 'Asignar a un miembro del equipo',
    coordDetailsHeader: 'Datos Requeridos del Coordinador Designado',
    coordNameLabel: 'Nombre del Coordinador',
    coordEmailLabel: 'Correo del Coordinador',
    coordPhoneLabel: 'Teléfono del Coordinador',

    sec4Title: 'Visibilidad en el Mapa',
    sec4Subtitle: 'Elige cómo deseas mostrar la ubicación de tu iglesia. La IA nunca tomará esta decisión por ti.',
    mapPublicTitle: 'Listado en Mapa Público',
    mapPublicDesc: 'Mostrar el pin de tu iglesia en el mapa público del evento y directorio de asistentes.',
    mapHiddenTitle: 'Oculto / Privado',
    mapHiddenDesc: 'Mantener la dirección privada fuera del mapa público. Solo el personal verificado verá los detalles.',

    sec5Title: 'Consentimiento de Privacidad y Uso de Datos',
    requiresExplicitApproval: 'Requiere tu aprobación explícita',
    dataProcessingConsentTitle: 'Consentimiento de Procesamiento de Datos',
    dataProcessingConsentBody:
      'Doy mi consentimiento para que Baptize The World almacene y procese de forma segura los datos de registro de nuestra iglesia para la logística del evento y comunicaciones conforme a la Política de Privacidad.',
    commitmentsDeferredTitle: 'Compromisos de Participación',
    commitmentsDeferredBadge: 'Se confirmarán más adelante',
    commitmentsDeferredDesc:
      'La asistencia a la orientación de anfitriones, voluntarios de bienvenida y código de conducta se solicitarán y confirmarán más adelante cerca de la fecha del evento.',
    commitmentItem1: 'Orientación de Anfitriones (Más adelante)',
    commitmentItem2: 'Voluntarios de Bienvenida (Más adelante)',
    commitmentItem3: 'Código de Conducta (Más adelante)',

    sec6Title: 'Preferencias de Comunicación',
    smsAlertsTitle: 'Alertas por Mensaje de Texto (SMS):',
    smsAlertsDesc: 'Recibir actualizaciones en tiempo real el día del evento y avisos de registro por SMS.',

    finalConfirmTitle: 'Confirmación Final de Participación',
    finalConfirmDesc: 'Confirmo oficialmente el registro de nuestra iglesia y nuestra intención de participar en el encuentro Baptize The World.',
    submitBtnReady: 'Completar y Enviar Registro de la Iglesia',
    submitBtnIncomplete: 'Completa los Campos Obligatorios para Enviar',

    reviewModalTitle: 'Revisar Resumen de Registro',
    reviewModalSubtitle: 'Por favor verifica todos los detalles de la iglesia antes del envío final.',
    editMoreBtn: 'Editar Más',
    confirmRegisterBtn: 'Confirmar y Registrar Oficialmente',
    successTitle: '¡Registro de Iglesia Confirmado!',
    successSubtitle: (name, church) =>
      `Gracias, ${name}. ${church} está oficialmente registrada para el encuentro de Baptize The World.`,
    confirmationRefLabel: 'Referencia de Confirmación:',
    registeredLocationHeader: 'Ubicación Registrada',
    eventLogisticsHeader: 'Logística del Evento',
    whatHappensNextTitle: 'Próximos Pasos:',
    nextStep1: (email) =>
      `Se ha enviado un paquete de confirmación a ${email} con material imprimible y guías de bienvenida.`,
    nextStep2: 'El coordinador de tu equipo recibirá invitaciones de calendario para la reunión de orientación de 30 minutos.',
    nextStep3SmsOn: 'Las alertas por SMS están activas para avisos del día del evento.',
    nextStep3SmsOff: 'No se solicitaron alertas por SMS (puedes activarlas más adelante).',
    registerAnotherBtn: 'Registrar Otra Iglesia',
    printReceiptBtn: 'Imprimir Recibo',
    downloadPdfBtn: 'Descargar Resumen PDF',
  },

  pt: {
    badgeAiAssisted: 'Inscrição Assistida por IA',
    eventSubtitle: 'Encontro Mundial de Unidade e Batismo de Igrejas',
    navChatAssistant: 'Assistente de Chat',
    navValidateForm: 'Validar Formulário',
    howItWorksTitle: 'Inscrição Multilíngue por Chat e Validação',
    howItWorksStep1: '1. Converse no seu Idioma: Fale ou digite naturalmente os dados da sua igreja.',
    howItWorksStep2: '2. Preenchimento Automático: O assistente extrai endereços, horários e contatos automaticamente.',
    howItWorksStep3: '3. Validação Final: Ao concluir os dados, o formulário completo aparece para revisão e envio.',
    closeBtn: 'Fechar',
    languageLabel: 'Idioma',

    conversationalModeTitle: 'Modo de Inscrição Conversacional',
    conversationalModeDesc: 'Converse livremente com o assistente abaixo. O formulário aparecerá para validação assim que todos os campos forem coletados.',
    inspectFormBtn: 'Ver Formulário',
    assistantTitle: 'Assistente Baptize The World',
    assistantBadge: 'IA Multilíngue',
    assistantSubtitle: 'Converse naturalmente — vou preencher o formulário para você',
    examplesBtn: 'Exemplos',
    resetConfirm: 'Tem certeza de que deseja redefinir todos os campos e a conversa?',
    progressLabel: 'Progresso da Inscrição',
    progressStatus: (done, total, pct) => `${done} de ${total} dados obrigatórios (${pct}%)`,
    capturedLabel: 'Capturado:',
    coordinatorSelfShort: 'Eu mesmo',
    coordinatorOtherShort: 'Designado',
    mapPublicShort: 'Público',
    mapHiddenShort: 'Oculto',
    tryScenarioTitle: 'Experimente um Cenário Rápido:',
    fieldsSyncedLabel: 'Campos sincronizados:',
    analyzingStatus: 'Analisando e atualizando o formulário...',
    inputPlaceholder: "Digite aqui (ex. 'Igreja da Graça, 106 E. Shields Ave., Fresno, CA 93704')...",
    sendBtn: 'Enviar',
    footerAutoExtractNote: 'A IA extrai automaticamente endereços, horários e nomes.',
    footerConsentNote: 'Consentimentos exigem confirmação explícita do usuário.',
    welcomeMessage:
      'Bem-vindo ao Baptize The World! Sou seu assistente de inscrição multilíngue. Converse comigo naturalmente e, assim que todos os detalhes forem coletados, apresentarei o formulário para você validar e enviar.\n\nPara começar, qual é o seu nome completo, e-mail e número de celular?',
    welcomeQuickReplies: [
      'Pastor Lucas Silva, lucas@igrejagraca.org, (559) 555-0192',
      'Sou o administrador da igreja',
      'Ajude-me a inscrever nossa igreja',
    ],
    resetWelcomeMessage:
      'Formulário redefinido! Vamos começar de novo. Quem é o contato principal que está inscrevendo esta igreja?',
    demoSamples: [
      {
        title: 'Endereço Completo',
        description: 'Informa nome da igreja, endereço e denominação',
        message: 'Nossa igreja é Grace Fellowship Church em 106 E. Shields Ave., Fresno, CA 93704. Somos Não-denominacional.',
      },
      {
        title: 'Contato do Pastor',
        description: 'Informa nome, e-mail e telefone de uma só vez',
        message: 'Olá, sou o Pastor Lucas Silva. Meu e-mail é lucas@igrejagraca.org e meu celular é (559) 555-0192.',
      },
      {
        title: 'Horário de Chegada',
        description: 'Informa horário de chegada da equipe',
        message: 'Chegaremos às 9:30 AM com nossa equipe de ministério.',
      },
      {
        title: 'Delegar a Outra Pessoa',
        description: 'Designa outro coordenador',
        message: 'Outra pessoa vai coordenar pela nossa igreja: Ana Costa, ana@igrejagraca.org, 559-555-8821.',
      },
    ],

    validationBannerTitle: 'Validação do Formulário e Verificação Final',
    validationBannerReady: 'Todos os Campos Coletados',
    validationBannerFields: (done, total) => `${done}/${total} Campos`,
    validationBannerDesc:
      'Aqui está o seu formulário preenchido. Revise suas respostas, ajuste qualquer campo se desejar, confirme sua participação e envie.',
    returnToChatBtn: 'Voltar ao Chat',
    wantToEditWithAi: 'Quer editar algo conversando com o assistente?',
    askChatAssistantBtn: 'Perguntar ao Assistente',
    aiUpdatedBadge: 'Atualizado por IA',
    formHeaderBadge: 'Inscrição Baptize The World',
    formHeaderTitle: 'Detalhes da Inscrição no Evento',
    formHeaderSubtitle: 'Os campos são atualizados enquanto você conversa com o assistente, ou você pode editá-los abaixo.',
    requiredNote: 'Campos obrigatórios marcados com',

    sec1Title: 'Informações do Inscrito e Contato',
    fullNameLabel: 'Nome Completo',
    fullNamePlaceholder: 'ex. Pastor Lucas Silva',
    emailLabel: 'Endereço de E-mail',
    emailPlaceholder: 'nome@igreja.org',
    phoneLabel: 'Telefone Celular',
    phonePlaceholder: '+1 (559) 555-0192',

    sec2Title: 'Detalhes e Localização da Igreja',
    churchNameLabel: 'Nome da Igreja',
    churchNamePlaceholder: 'ex. Igreja Comunidade da Graça',
    countryLabel: 'País',
    denominationLabel: 'Denominação',
    denominationPlaceholder: 'Selecionar Denominação / Tradição...',
    addressLabel: 'Endereço (Rua e Número)',
    addressPlaceholder: 'ex. 106 E. Shields Ave.',
    cityLabel: 'Cidade',
    cityPlaceholder: 'Fresno',
    stateLabel: 'Estado / Província / Região',
    statePlaceholder: 'CA',
    zipLabel: 'CEP / Código Postal',
    zipPlaceholder: '93704',
    websiteLabel: 'Site da Igreja',
    optionalTag: '(Opcional)',

    sec3Title: 'Horário de Chegada e Coordenador',
    arrivalTimeLabel: 'Horário de Chegada ao Evento',
    hourPlaceholder: 'Hora',
    arrivalTimeHint: 'Conversa natural: "Chegaremos às 9:30 AM"',
    coordinatorLabel: 'Coordenador do Evento',
    coordSelfTitle: 'Eu vou coordenar',
    coordSelfDesc: 'Sou o coordenador principal',
    coordOtherTitle: 'Outra pessoa',
    coordOtherDesc: 'Designar membro da equipe',
    coordDetailsHeader: 'Dados do Coordenador Designado',
    coordNameLabel: 'Nome do Coordenador',
    coordEmailLabel: 'E-mail do Coordenador',
    coordPhoneLabel: 'Telefone do Coordenador',

    sec4Title: 'Visibilidade no Mapa',
    sec4Subtitle: 'Escolha como a localização da sua igreja deve ser exibida. A IA nunca tomará essa decisão por você.',
    mapPublicTitle: 'Listagem no Mapa Público',
    mapPublicDesc: 'Exibir o pino da sua igreja no mapa público do encontro e diretório de participantes.',
    mapHiddenTitle: 'Oculto / Privado',
    mapHiddenDesc: 'Manter o endereço privado fora do mapa público. Apenas a equipe verificada verá os detalhes.',

    sec5Title: 'Consentimento de Privacidade e Uso de Dados',
    requiresExplicitApproval: 'Requer sua aprovação explícita',
    dataProcessingConsentTitle: 'Consentimento de Processamento de Dados',
    dataProcessingConsentBody:
      'Concordo que o Baptize The World armazene e processe com segurança os dados de inscrição da nossa igreja para logística do evento e comunicações de acordo com a Política de Privacidade.',
    commitmentsDeferredTitle: 'Compromissos de Participação',
    commitmentsDeferredBadge: 'A confirmar posteriormente',
    commitmentsDeferredDesc:
      'A participação na orientação de anfitriões, voluntários de recepção e código de conduta serão solicitados e confirmados posteriormente mais perto da data do evento.',
    commitmentItem1: 'Orientação de Anfitriões (Depois)',
    commitmentItem2: 'Voluntários de Recepção (Depois)',
    commitmentItem3: 'Código de Conduta (Depois)',

    sec6Title: 'Preferências de Comunicação',
    smsAlertsTitle: 'Alertas Opcionais por SMS:',
    smsAlertsDesc: 'Receber atualizações em tempo real no dia do evento e avisos de check-in por SMS.',

    finalConfirmTitle: 'Confirmação Final de Participação',
    finalConfirmDesc: 'Confirmo oficialmente a inscrição da nossa igreja e a intenção de participar do encontro Baptize The World.',
    submitBtnReady: 'Concluir e Enviar Inscrição da Igreja',
    submitBtnIncomplete: 'Preencha os Campos Obrigatórios para Enviar',

    reviewModalTitle: 'Revisar Resumo da Inscrição',
    reviewModalSubtitle: 'Verifique todos os detalhes da igreja antes do envio final.',
    editMoreBtn: 'Editar Mais',
    confirmRegisterBtn: 'Confirmar e Inscrever Oficialmente',
    successTitle: 'Inscrição da Igreja Confirmada!',
    successSubtitle: (name, church) =>
      `Obrigado, ${name}. ${church} está oficialmente inscrita no encontro Baptize The World.`,
    confirmationRefLabel: 'Referência de Confirmação:',
    registeredLocationHeader: 'Localização Registrada',
    eventLogisticsHeader: 'Logística do Evento',
    whatHappensNextTitle: 'Próximos Passos:',
    nextStep1: (email) =>
      `Um pacote de confirmação foi enviado para ${email} com materiais para impressão e diretrizes.`,
    nextStep2: 'O coordenador da sua equipe receberá convites de calendário para a orientação de 30 minutos.',
    nextStep3SmsOn: 'Os alertas por SMS estão ativos para atualizações no dia do evento.',
    nextStep3SmsOff: 'Alertas por SMS não foram solicitados (você pode ativar depois).',
    registerAnotherBtn: 'Inscrever Outra Igreja',
    printReceiptBtn: 'Imprimir Comprovante',
    downloadPdfBtn: 'Baixar Resumo em PDF',
  },

  fr: {
    badgeAiAssisted: 'Inscription Assistée par IA',
    eventSubtitle: 'Rassemblement Mondial d’Unité et de Baptême des Églises',
    navChatAssistant: 'Assistant Chat',
    navValidateForm: 'Valider le Formulaire',
    howItWorksTitle: 'Inscription Multilingue par Chat et Validation',
    howItWorksStep1: '1. Discutez dans votre Langue : Parlez ou écrivez naturellement.',
    howItWorksStep2: '2. Extraction Automatique : L’assistant extrait les adresses, horaires et contacts automatiquement.',
    howItWorksStep3: '3. Validation du Formulaire : Une fois terminé, vérifiez et soumettez le formulaire officiel.',
    closeBtn: 'Fermer',
    languageLabel: 'Langue',

    conversationalModeTitle: 'Mode d’Inscription Conversationnel',
    conversationalModeDesc: 'Discutez librement avec l’assistant ci-dessous. Le formulaire complet s’affichera pour validation une fois tous les champs recueillis.',
    inspectFormBtn: 'Voir le Formulaire',
    assistantTitle: 'Assistant Baptize The World',
    assistantBadge: 'IA Multilingue',
    assistantSubtitle: 'Parlez naturellement — je remplirai le formulaire pour vous',
    examplesBtn: 'Exemples',
    resetConfirm: 'Êtes-vous sûr de vouloir réinitialiser le formulaire et la conversation ?',
    progressLabel: 'Progression de l’Inscription',
    progressStatus: (done, total, pct) => `${done} sur ${total} détails requis (${pct}%)`,
    capturedLabel: 'Enregistré :',
    coordinatorSelfShort: 'Moi-même',
    coordinatorOtherShort: 'Désigné',
    mapPublicShort: 'Public',
    mapHiddenShort: 'Masqué',
    tryScenarioTitle: 'Essayez un Exemple Rapide :',
    fieldsSyncedLabel: 'Champs synchronisés :',
    analyzingStatus: 'Analyse et mise à jour du formulaire...',
    inputPlaceholder: "Écrivez ici (ex. 'Église Grâce, 106 E. Shields Ave., Fresno, CA 93704')...",
    sendBtn: 'Envoyer',
    footerAutoExtractNote: 'L’IA extrait automatiquement les adresses, horaires et noms.',
    footerConsentNote: 'Les consentements nécessitent une confirmation explicite.',
    welcomeMessage:
      'Bienvenue sur Baptize The World ! Je suis votre assistant d’inscription multilingue. Discutez avec moi naturellement et, une fois toutes vos informations recueillies, je vous présenterai le formulaire pour validation.\n\nPour commencer, quels sont vos nom complet, adresse e-mail et numéro de téléphone mobile ?',
    welcomeQuickReplies: [
      'Pasteur Marc Dupont, marc@eglisegrace.org, (559) 555-0192',
      'Je suis l’administrateur de l’église',
      'Aidez-moi à inscrire notre église',
    ],
    resetWelcomeMessage:
      'Formulaire réinitialisé ! Qui est la personne de contact principale qui inscrit cette église ?',
    demoSamples: [
      {
        title: 'Adresse Complète',
        description: 'Fournit le nom de l’église, l’adresse et la dénomination',
        message: 'Notre église est Grace Fellowship Church au 106 E. Shields Ave., Fresno, CA 93704. Nous sommes Non-dénominationnel.',
      },
      {
        title: 'Coordonnées du Pasteur',
        description: 'Fournit plusieurs champs de contact à la fois',
        message: 'Bonjour, je suis le Pasteur Marc Dupont. Mon e-mail est marc@eglisegrace.org et mon téléphone est (559) 555-0192.',
      },
      {
        title: 'Heure d’Arrivée',
        description: 'Mentionne l’heure d’arrivée du matin',
        message: 'Nous arriverons à 9:30 AM avec notre équipe.',
      },
      {
        title: 'Déléguer à Quelqu’un d’Autre',
        description: 'Désigne un autre membre comme coordinateur',
        message: 'Quelqu’un d’autre coordonnera pour notre église : Claire Martin, claire@eglisegrace.org, 559-555-8821.',
      },
    ],

    validationBannerTitle: 'Validation du Formulaire et Vérification Finale',
    validationBannerReady: 'Tous les Champs Recueillis',
    validationBannerFields: (done, total) => `${done}/${total} Champs`,
    validationBannerDesc:
      'Voici votre formulaire d’inscription complété. Veuillez vérifier vos réponses, modifier tout champ si nécessaire, confirmer votre participation et soumettre.',
    returnToChatBtn: 'Retourner au Chat',
    wantToEditWithAi: 'Vous souhaitez modifier quelque chose avec l’aide de l’assistant ?',
    askChatAssistantBtn: 'Demander à l’Assistant',
    aiUpdatedBadge: 'Mis à jour par IA',
    formHeaderBadge: 'Inscription Baptize The World',
    formHeaderTitle: 'Détails d’Inscription à l’Événement',
    formHeaderSubtitle: 'Les champs se mettent à jour automatiquement pendant la discussion, ou vous pouvez les modifier ci-dessous.',
    requiredNote: 'Champs obligatoires marqués d’un',

    sec1Title: 'Informations du Déclarant et Contact',
    fullNameLabel: 'Nom Complet',
    fullNamePlaceholder: 'ex. Pasteur Marc Dupont',
    emailLabel: 'Adresse E-mail',
    emailPlaceholder: 'nom@eglise.org',
    phoneLabel: 'Téléphone Mobile',
    phonePlaceholder: '+1 (559) 555-0192',

    sec2Title: 'Détails et Adresse de l’Église',
    churchNameLabel: 'Nom de l’Église',
    churchNamePlaceholder: 'ex. Église Communauté de Grâce',
    countryLabel: 'Pays',
    denominationLabel: 'Dénomination',
    denominationPlaceholder: 'Sélectionner une Dénomination...',
    addressLabel: 'Adresse Postale',
    addressPlaceholder: 'ex. 106 E. Shields Ave.',
    cityLabel: 'Ville',
    cityPlaceholder: 'Fresno',
    stateLabel: 'État / Province / Région',
    statePlaceholder: 'CA',
    zipLabel: 'Code Postal / ZIP',
    zipPlaceholder: '93704',
    websiteLabel: 'Site Web de l’Église',
    optionalTag: '(Optionnel)',

    sec3Title: 'Heure d’Arrivée et Rôle de Coordinateur',
    arrivalTimeLabel: 'Heure d’Arrivée à l’Événement',
    hourPlaceholder: 'Heure',
    arrivalTimeHint: 'Conversation naturelle : « Nous arriverons à 9:30 AM »',
    coordinatorLabel: 'Coordinateur de l’Événement',
    coordSelfTitle: 'Je coordonnerai',
    coordSelfDesc: 'Je suis le coordinateur principal',
    coordOtherTitle: 'Quelqu’un d’autre',
    coordOtherDesc: 'Désigner un membre de l’équipe',
    coordDetailsHeader: 'Coordonnées du Coordinateur Désigné',
    coordNameLabel: 'Nom du Coordinateur',
    coordEmailLabel: 'E-mail du Coordinateur',
    coordPhoneLabel: 'Téléphone du Coordinateur',

    sec4Title: 'Visibilité sur la Carte',
    sec4Subtitle: 'Choisissez comment afficher l’emplacement de votre église. L’IA ne prendra jamais cette décision à votre place.',
    mapPublicTitle: 'Affichage sur la Carte Publique',
    mapPublicDesc: 'Afficher votre église sur la carte publique du rassemblement et l’annuaire.',
    mapHiddenTitle: 'Masqué / Non répertorié',
    mapHiddenDesc: 'Garder votre adresse privée hors de la carte publique.',

    sec5Title: 'Consentement de Confidentialité et Données',
    requiresExplicitApproval: 'Nécessite votre approbation explicite',
    dataProcessingConsentTitle: 'Consentement au Traitement des Données',
    dataProcessingConsentBody:
      'Je consens à ce que Baptize The World stocke et traite en toute sécurité les données d’inscription de notre église conformément à la Politique de Confidentialité.',
    commitmentsDeferredTitle: 'Engagements de Participation',
    commitmentsDeferredBadge: 'À confirmer ultérieurement',
    commitmentsDeferredDesc:
      'La présence à l’orientation des hôtes, les bénévoles d’accueil et le code de conduite seront confirmés ultérieurement à l’approche de l’événement.',
    commitmentItem1: 'Orientation des Hôtes (Plus tard)',
    commitmentItem2: 'Bénévoles d’Accueil (Plus tard)',
    commitmentItem3: 'Code de Conduite (Plus tard)',

    sec6Title: 'Préférences de Communication',
    smsAlertsTitle: 'Alertes SMS Optionnelles :',
    smsAlertsDesc: 'Recevoir des mises à jour en temps réel le jour de l’événement par SMS.',

    finalConfirmTitle: 'Confirmation Finale de Participation',
    finalConfirmDesc: 'Je confirme solennellement l’inscription officielle de notre église au rassemblement Baptize The World.',
    submitBtnReady: 'Terminer et Soumettre l’Inscription',
    submitBtnIncomplete: 'Complétez les Champs Requis pour Soumettre',

    reviewModalTitle: 'Vérifier le Résumé de l’Inscription',
    reviewModalSubtitle: 'Veuillez vérifier tous les détails avant la soumission finale.',
    editMoreBtn: 'Modifier',
    confirmRegisterBtn: 'Confirmer et Inscrire Officiellement',
    successTitle: 'Inscription de l’Église Confirmée !',
    successSubtitle: (name, church) =>
      `Merci, ${name}. ${church} est officiellement inscrite au rassemblement Baptize The World.`,
    confirmationRefLabel: 'Référence de Confirmation :',
    registeredLocationHeader: 'Lieu Enregistré',
    eventLogisticsHeader: 'Logistique de l’Événement',
    whatHappensNextTitle: 'Prochaines Étapes :',
    nextStep1: (email) =>
      `Un dossier de confirmation a été envoyé à ${email} avec les guides d’accueil.`,
    nextStep2: 'Votre coordinateur recevra une invitation pour la réunion d’orientation de 30 minutes.',
    nextStep3SmsOn: 'Les alertes SMS sont activées pour le jour de l’événement.',
    nextStep3SmsOff: 'Les alertes SMS n’ont pas été demandées.',
    registerAnotherBtn: 'Inscrire une Autre Église',
    printReceiptBtn: 'Imprimer le Reçu',
    downloadPdfBtn: 'Télécharger le PDF',
  },

  ko: {
    badgeAiAssisted: 'AI 기반 교회 등록',
    eventSubtitle: '글로벌 교회 연합 및 세례 대회',
    navChatAssistant: '채팅 도우미',
    navValidateForm: '양식 검토 및 확인',
    howItWorksTitle: '다국어 대화형 등록 및 양식 검증 안내',
    howItWorksStep1: '1. 자유로운 다국어 대화: 한국어나 편하신 언어로 자연스럽게 말씀해 주세요.',
    howItWorksStep2: '2. 자동 양식 입력: AI가 교회 이름, 주소, 도착 시간, 연락처를 자동으로 추출합니다.',
    howItWorksStep3: '3. 최종 양식 확인: 모든 정보가 수집되면 실제 등록 양식을 검토하고 제출합니다.',
    closeBtn: '닫기',
    languageLabel: '언어',

    conversationalModeTitle: '대화형 등록 모드',
    conversationalModeDesc: '아래 채팅창에서 편하게 대화해 주세요. 모든 필수 항목이 입력되면 검증을 위해 전체 등록 양식이 표시됩니다.',
    inspectFormBtn: '양식 보기',
    assistantTitle: 'Baptize The World 등록 도우미',
    assistantBadge: '다국어 AI',
    assistantSubtitle: '편하게 말씀해 주시면 등록 양식을 자동으로 작성해 드립니다',
    examplesBtn: '예시 보기',
    resetConfirm: '모든 양식 항목과 대화 내용을 초기화하시겠습니까?',
    progressLabel: '등록 진행률',
    progressStatus: (done, total, pct) => `필수 항목 ${total}개 중 ${done}개 완료 (${pct}%)`,
    capturedLabel: '입력됨:',
    coordinatorSelfShort: '본인',
    coordinatorOtherShort: '지정됨',
    mapPublicShort: '공개',
    mapHiddenShort: '비공개',
    tryScenarioTitle: '빠른 예시 선택 (클릭하여 대화 시뮬레이션):',
    fieldsSyncedLabel: '반영된 항목:',
    analyzingStatus: '내용을 분석하여 양식을 업데이트하는 중...',
    inputPlaceholder: "메시지를 입력하세요 (예: '은혜장로교회, 106 E. Shields Ave., Fresno, CA 93704')...",
    sendBtn: '전송',
    footerAutoExtractNote: 'AI가 주소, 시간, 이름을 자동으로 인식하여 양식에 입력합니다.',
    footerConsentNote: '개인정보 동의 및 민감한 선택은 본인의 직접 확인이 필요합니다.',
    welcomeMessage:
      'Baptize The World에 오신 것을 환영합니다! 저는 다국어 교회 등록 AI 도우미입니다. 한국어로 편하게 대화해 주시면 모든 정보를 수집한 후 최종 확인을 위해 등록 양식을 보여드립니다.\n\n먼저 등록하시는 분의 성함, 이메일 주소, 휴대폰 번호를 알려주시겠어요?',
    welcomeQuickReplies: [
      '김다윗 목사, david@gracechurch.org, (559) 555-0192',
      '저는 교회 행정 담당자입니다',
      '우리 교회 등록을 도와주세요',
    ],
    resetWelcomeMessage:
      '양식이 초기화되었습니다! 처음부터 다시 시작할게요. 교회를 등록하시는 담당자분의 성함과 연락처가 어떻게 되시나요?',
    demoSamples: [
      {
        title: '교회 이름 및 전체 주소 입력',
        description: '교회 이름, 주소, 교단을 한 문장으로 입력',
        message: '우리 교회는 Grace Fellowship Church이고 주소는 106 E. Shields Ave., Fresno, CA 93704입니다. 교단은 초교파(Non-denominational)입니다.',
      },
      {
        title: '담임목사 연락처 입력',
        description: '이름, 이메일, 전화번호 동시 입력',
        message: '안녕하세요, 김다윗 목사입니다. 이메일은 david@gracefellowship.org이고 전화번호는 (559) 555-0192입니다.',
      },
      {
        title: '행사 도착 시간 입력',
        description: '오전 도착 시간 자연스럽게 입력',
        message: '우리 사역팀은 오전 9:30 AM에 도착할 예정입니다.',
      },
      {
        title: '다른 코디네이터 지정',
        description: '팀원을 행사 코디네이터로 지정',
        message: '다른 분이 코디네이터를 맡습니다: Sarah Miller, sarah@gracefellowship.org, 559-555-8821.',
      },
    ],

    validationBannerTitle: '양식 검토 및 최종 확인',
    validationBannerReady: '모든 항목 수집 완료',
    validationBannerFields: (done, total) => `${done}/${total} 항목 완료`,
    validationBannerDesc:
      '작성된 교회 등록 양식입니다. 내용을 확인하시고 수정이 필요하면 직접 변경하신 후 최종 확인을 체크하여 제출해 주세요.',
    returnToChatBtn: '채팅 도우미로 돌아가기',
    wantToEditWithAi: 'AI 도우미와 대화하며 수정하고 싶으신가요?',
    askChatAssistantBtn: '채팅 도우미에게 요청하기',
    aiUpdatedBadge: 'AI 자동 입력됨',
    formHeaderBadge: 'Baptize The World 교회 등록',
    formHeaderTitle: '행사 등록 상세 정보',
    formHeaderSubtitle: '채팅 도우미와 대화하면 항목이 자동 업데이트되며, 아래에서 직접 수정하실 수도 있습니다.',
    requiredNote: '필수 입력 항목 표시:',

    sec1Title: '등록자 및 연락처 정보',
    fullNameLabel: '성함',
    fullNamePlaceholder: '예: 김다윗 목사',
    emailLabel: '이메일 주소',
    emailPlaceholder: 'name@church.org',
    phoneLabel: '휴대폰 번호',
    phonePlaceholder: '+1 (559) 555-0192',

    sec2Title: '교회 및 위치 정보',
    churchNameLabel: '교회 이름',
    churchNamePlaceholder: '예: 은혜펠로우십교회',
    countryLabel: '국가',
    denominationLabel: '교단',
    denominationPlaceholder: '교단 / 전통 선택...',
    addressLabel: '상세 도로명 주소',
    addressPlaceholder: '예: 106 E. Shields Ave.',
    cityLabel: '도시 (City)',
    cityPlaceholder: 'Fresno',
    stateLabel: '주 / 도 / 지역 (State)',
    statePlaceholder: 'CA',
    zipLabel: '우편번호 (ZIP)',
    zipPlaceholder: '93704',
    websiteLabel: '교회 웹사이트',
    optionalTag: '(선택사항)',

    sec3Title: '도착 시간 및 코디네이터 역할',
    arrivalTimeLabel: '행사장 도착 예정 시간',
    hourPlaceholder: '시',
    arrivalTimeHint: '대화 예시: "오전 9시 30분에 도착합니다"',
    coordinatorLabel: '행사 코디네이터',
    coordSelfTitle: '본인이 직접 담당',
    coordSelfDesc: '제가 메인 코디네이터입니다',
    coordOtherTitle: '다른 담당자 지정',
    coordOtherDesc: '사역팀원에게 위임',
    coordDetailsHeader: '지정 코디네이터 상세 연락처 (필수)',
    coordNameLabel: '코디네이터 성함',
    coordEmailLabel: '코디네이터 이메일',
    coordPhoneLabel: '코디네이터 전화번호',

    sec4Title: '지도 공개 여부 선택',
    sec4Subtitle: '교회 위치를 지도에 어떻게 표시할지 선택해 주세요. AI는 이 항목을 임의로 결정하지 않습니다.',
    mapPublicTitle: '공개 지도에 표시',
    mapPublicDesc: '행사 공식 공개 지도 및 참가 교회 디렉토리에 교회 위치를 표시합니다.',
    mapHiddenTitle: '비공개 / 숨김',
    mapHiddenDesc: '공개 지도에서 주소를 숨기고 승인된 운영진에게만 공유합니다.',

    sec5Title: '개인정보 처리 및 데이터 사용 동의',
    requiresExplicitApproval: '직접 동의가 필요합니다',
    dataProcessingConsentTitle: '데이터 처리 동의',
    dataProcessingConsentBody:
      '개인정보 처리방침에 따라 행사 운영, 참가자 체크인 및 안내 연락을 위해 Baptize The World가 우리 교회의 등록 정보를 안전하게 저장하고 처리하는 것에 동의합니다.',
    commitmentsDeferredTitle: '참여 서약 항목',
    commitmentsDeferredBadge: '추후 확인 예정',
    commitmentsDeferredDesc:
      '호스트 오리엔테이션 참석, 환영 봉사자 배치, 행동 강령 서약은 행사 날짜가 가까워질 때 추후 안내 및 확인될 예정입니다.',
    commitmentItem1: '호스트 오리엔테이션 (추후)',
    commitmentItem2: '환영 봉사자 안내 (추후)',
    commitmentItem3: '행동 강령 확인 (추후)',

    sec6Title: '알림 수신 설정',
    smsAlertsTitle: '문자 메시지(SMS) 알림 수신 (선택):',
    smsAlertsDesc: '행사 당일 실시간 안내 및 체크인 공지를 휴대폰 문자로 받습니다.',

    finalConfirmTitle: '최종 참여 확인',
    finalConfirmDesc: '우리 교회가 Baptize The World 연합 모임에 공식적으로 등록하고 참여함을 확인합니다.',
    submitBtnReady: '교회 등록 완료 및 제출하기',
    submitBtnIncomplete: '필수 항목을 모두 입력해 주세요',

    reviewModalTitle: '등록 정보 최종 요약 확인',
    reviewModalSubtitle: '제출하기 전에 모든 교회 정보와 선택 사항을 확인해 주세요.',
    editMoreBtn: '추가 수정하기',
    confirmRegisterBtn: '최종 확인 및 공식 등록',
    successTitle: '교회 등록이 완료되었습니다!',
    successSubtitle: (name, church) =>
      `${name}님, 감사합니다. ${church}의 Baptize The World 공식 등록이 완료되었습니다.`,
    confirmationRefLabel: '등록 확인 번호:',
    registeredLocationHeader: '등록된 교회 위치',
    eventLogisticsHeader: '행사 일정 및 담당자',
    whatHappensNextTitle: '향후 진행 안내:',
    nextStep1: (email) =>
      `${email} 주소로 환영 가이드라인과 안내 패킷이 발송되었습니다.`,
    nextStep2: '담당 코디네이터에게 30분 호스트 오리엔테이션 일정 초대장이 발송됩니다.',
    nextStep3SmsOn: '행사 당일 문자(SMS) 알림이 활성화되었습니다.',
    nextStep3SmsOff: '문자 알림을 신청하지 않으셨습니다 (추후 변경 가능).',
    registerAnotherBtn: '다른 교회 추가 등록하기',
    printReceiptBtn: '확인증 인쇄',
    downloadPdfBtn: 'PDF 요약 다운로드',
  },

  zh: {
    badgeAiAssisted: 'AI 智能辅助注册',
    eventSubtitle: '全球教会合一与洗礼盛会',
    navChatAssistant: '智能对话助手',
    navValidateForm: '核对注册表单',
    howItWorksTitle: '多语言对话式注册与表单核对流程',
    howItWorksStep1: '1. 多语言自然对话：您可以用中文或任何语言直接输入教会信息。',
    howItWorksStep2: '2. 自动提取字段：助手会自动提取并规范化地址、到达时间和联系方式。',
    howItWorksStep3: '3. 表单核对与提交：信息收集完毕后，将为您展示完整表单以供核对和正式提交。',
    closeBtn: '关闭',
    languageLabel: '语言',

    conversationalModeTitle: '对话式注册模式',
    conversationalModeDesc: '请在下方与助手自由交谈。收集完所有必填信息后，将自动显示完整表单供您核对。',
    inspectFormBtn: '查看表单',
    assistantTitle: 'Baptize The World 注册助手',
    assistantBadge: '多语言 AI',
    assistantSubtitle: '请自然交谈——我将为您自动填写注册表单',
    examplesBtn: '示例',
    resetConfirm: '您确定要重置所有表单字段和对话记录吗？',
    progressLabel: '注册进度',
    progressStatus: (done, total, pct) => `已完成 ${done} / ${total} 项必填信息 (${pct}%)`,
    capturedLabel: '已记录：',
    coordinatorSelfShort: '本人',
    coordinatorOtherShort: '指定他人',
    mapPublicShort: '公开',
    mapHiddenShort: '隐藏',
    tryScenarioTitle: '尝试快速示例（模拟用户输入）：',
    fieldsSyncedLabel: '已同步字段：',
    analyzingStatus: '正在分析并更新表单...',
    inputPlaceholder: "请用您的语言输入（例如：'恩典教会, 106 E. Shields Ave., Fresno, CA 93704'）...",
    sendBtn: '发送',
    footerAutoExtractNote: 'AI 会自动识别并提取地址、时间和姓名。',
    footerConsentNote: '隐私同意与敏感选项需由您本人明确确认。',
    welcomeMessage:
      '欢迎来到 Baptize The World！我是您的多语言注册助手。您可以用中文或任何语言与我交谈，信息收集完成后，我将展示完整表单供您核对并提交。\n\n首先，请问您的全名、电子邮箱和手机号码是什么？',
    welcomeQuickReplies: [
      '王大卫牧师, david@gracefellowship.org, (559) 555-0192',
      '我是教会行政同工',
      '请帮我注册我们的教会',
    ],
    resetWelcomeMessage:
      '表单已重置！让我们重新开始。请问注册本教会的主要联系人姓名和联系方式是什么？',
    demoSamples: [
      {
        title: '完整教会地址信息',
        description: '一句话提供教会名称、地址和宗派',
        message: '我们的教会是 Grace Fellowship Church，地址是 106 E. Shields Ave., Fresno, CA 93704。我们是跨宗派教会 (Non-denominational)。',
      },
      {
        title: '牧师联系方式',
        description: '同时提供姓名、邮箱和电话',
        message: '你好，我是 Pastor David Miller。我的邮箱是 david@gracefellowship.org，手机号是 (559) 555-0192。',
      },
      {
        title: '活动到达时间',
        description: '自然描述早上到达时间',
        message: '我们的服事团队将于早上 9:30 AM 到达。',
      },
      {
        title: '指定其他协调员',
        description: '委派另一位同工担任协调员',
        message: '将由另一位同工负责协调：Sarah Miller, sarah@gracefellowship.org, 559-555-8821。',
      },
    ],

    validationBannerTitle: '表单核对与最终确认',
    validationBannerReady: '所有字段已收集',
    validationBannerFields: (done, total) => `${done}/${total} 项已完成`,
    validationBannerDesc:
      '这是为您填写好的注册表单。请核对您的信息，如有需要可直接修改任何字段，勾选最终确认后提交。',
    returnToChatBtn: '返回对话助手',
    wantToEditWithAi: '想通过对话让助手帮您修改吗？',
    askChatAssistantBtn: '使用对话助手',
    aiUpdatedBadge: 'AI 已更新',
    formHeaderBadge: 'Baptize The World 教会注册',
    formHeaderTitle: '活动注册详情',
    formHeaderSubtitle: '当您与助手交谈时字段会自动更新，您也可以直接在下方手动编辑。',
    requiredNote: '必填项标有',

    sec1Title: '注册人及联系信息',
    fullNameLabel: '全名',
    fullNamePlaceholder: '例如：王大卫牧师',
    emailLabel: '电子邮箱',
    emailPlaceholder: 'name@church.org',
    phoneLabel: '手机号码',
    phonePlaceholder: '+1 (559) 555-0192',

    sec2Title: '教会及地址详情',
    churchNameLabel: '教会名称',
    churchNamePlaceholder: '例如：恩典团契教会',
    countryLabel: '国家 / 地区',
    denominationLabel: '宗派 / 传统',
    denominationPlaceholder: '选择宗派 / 传统...',
    addressLabel: '街道地址',
    addressPlaceholder: '例如：106 E. Shields Ave.',
    cityLabel: '城市',
    cityPlaceholder: 'Fresno',
    stateLabel: '州 / 省 / 地区',
    statePlaceholder: 'CA',
    zipLabel: '邮政编码 / ZIP',
    zipPlaceholder: '93704',
    websiteLabel: '教会网站',
    optionalTag: '（选填）',

    sec3Title: '预计到达时间与协调员角色',
    arrivalTimeLabel: '活动预计到达时间',
    hourPlaceholder: '小时',
    arrivalTimeHint: '自然对话示例：“我们早上 9:30 到达”',
    coordinatorLabel: '活动协调员',
    coordSelfTitle: '我本人负责协调',
    coordSelfDesc: '我是主要协调人',
    coordOtherTitle: '指定其他人',
    coordOtherDesc: '指派另一位团队成员',
    coordDetailsHeader: '指定协调员详细信息（必填）',
    coordNameLabel: '协调员姓名',
    coordEmailLabel: '协调员邮箱',
    coordPhoneLabel: '协调员电话',

    sec4Title: '地图显示设置',
    sec4Subtitle: '请选择如何在地图上显示贵教会的位置。AI 绝不会替您做此决定。',
    mapPublicTitle: '在公开地图上显示',
    mapPublicDesc: '在公开聚会地图、参会名录和全球代祷网络上显示教会位置。',
    mapHiddenTitle: '隐藏 / 不公开',
    mapHiddenDesc: '不在公开地图上显示地址，仅授权工作人员可见。',

    sec5Title: '隐私与数据使用同意',
    requiresExplicitApproval: '需您本人明确同意',
    dataProcessingConsentTitle: '数据处理同意',
    dataProcessingConsentBody:
      '我同意 Baptize The World 根据隐私政策安全地存储和处理我们教会的注册信息，用于活动安排、签到和通知。',
    commitmentsDeferredTitle: '参与承诺事项',
    commitmentsDeferredBadge: '稍后确认',
    commitmentsDeferredDesc:
      '主办方培训出席、接待志愿者安排及行为准则承诺将在临近聚会日期时另行确认。',
    commitmentItem1: '主办方培训（稍后）',
    commitmentItem2: '接待志愿者（稍后）',
    commitmentItem3: '行为准则（稍后）',

    sec6Title: '通知偏好设置',
    smsAlertsTitle: '接收短信 (SMS) 通知（选填）：',
    smsAlertsDesc: '在活动当天通过手机短信接收实时更新和签到通知。',

    finalConfirmTitle: '最终参与确认',
    finalConfirmDesc: '我郑重确认我们教会正式注册并计划参加 Baptize The World 盛会。',
    submitBtnReady: '完成并提交教会注册',
    submitBtnIncomplete: '请先完成所有必填字段',

    reviewModalTitle: '核对注册摘要',
    reviewModalSubtitle: '请在最终提交前核实所有教会信息和选项。',
    editMoreBtn: '继续修改',
    confirmRegisterBtn: '确认并正式注册',
    successTitle: '教会注册已确认！',
    successSubtitle: (name, church) =>
      `谢谢您，${name}。${church} 已正式注册参加 Baptize The World 盛会。`,
    confirmationRefLabel: '确认编号：',
    registeredLocationHeader: '已注册聚会地点',
    eventLogisticsHeader: '活动安排详情',
    whatHappensNextTitle: '接下来会发生什么：',
    nextStep1: (email) =>
      `确认资料包已发送至 ${email}，内含可打印标识和接待指南。`,
    nextStep2: '您的团队协调员将收到 30 分钟主办方简报会的日历邀请。',
    nextStep3SmsOn: '活动当天短信通知已开启。',
    nextStep3SmsOff: '未开启短信通知（您可稍后随时开启）。',
    registerAnotherBtn: '注册另一家教会',
    printReceiptBtn: '打印回执',
    downloadPdfBtn: '下载 PDF 摘要',
  },

  tl: {
    badgeAiAssisted: 'Rehistro na may Tulong ng AI',
    eventSubtitle: 'Pandaigdigang Pagtitipon ng Pagkakaisa at Bautismo ng mga Simbahan',
    navChatAssistant: 'Chat Assistant',
    navValidateForm: 'Suriin ang Form',
    howItWorksTitle: 'Multilingguwal na Pagpaparehistro sa Chat at Pagpapatunay',
    howItWorksStep1: '1. Makipag-chat sa Iyong Wika: Magsalita o mag-type nang natural sa Tagalog o English.',
    howItWorksStep2: '2. Awtomatikong Pagpupuno: Awtomatikong kinukuha ng AI ang address, oras, at contact info.',
    howItWorksStep3: '3. Pagpapatunay ng Form: Kapag kumpleto na, lalabas ang form para masuri at maipasa.',
    closeBtn: 'Isara',
    languageLabel: 'Wika',

    conversationalModeTitle: 'Conversational na Mode ng Pagpaparehistro',
    conversationalModeDesc: 'Makipag-usap nang malaya sa assistant sa ibaba. Lalabas ang form kapag nakuha na ang lahat ng detalye.',
    inspectFormBtn: 'Tingnan ang Form',
    assistantTitle: 'Baptize The World Assistant',
    assistantBadge: 'Multilingual AI',
    assistantSubtitle: 'Makipag-usap nang natural — ako ang magpupuno ng form para sa iyo',
    examplesBtn: 'Mga Halimbawa',
    resetConfirm: 'Sigurado ka bang gusto mong i-reset ang lahat ng field at usapan?',
    progressLabel: 'Progreso ng Pagpaparehistro',
    progressStatus: (done, total, pct) => `${done} sa ${total} kinakailangang detalye (${pct}%)`,
    capturedLabel: 'Nakuha:',
    coordinatorSelfShort: 'Ako mismo',
    coordinatorOtherShort: 'Itinalaga',
    mapPublicShort: 'Pampubliko',
    mapHiddenShort: 'Nakatago',
    tryScenarioTitle: 'Subukan ang Mabilis na Halimbawa:',
    fieldsSyncedLabel: 'Mga na-update na field:',
    analyzingStatus: 'Sinusuri at ina-update ang form...',
    inputPlaceholder: "Mag-type dito (hal. 'Grace Church, 106 E. Shields Ave., Fresno, CA 93704')...",
    sendBtn: 'Ipadala',
    footerAutoExtractNote: 'Awtomatikong kinukuha ng AI ang mga address, oras at pangalan.',
    footerConsentNote: 'Ang mga pahintulot ay nangangailangan ng iyong kumpirmasyon.',
    welcomeMessage:
      'Maligayang pagdating sa Baptize The World! Ako ang iyong multilingual registration assistant. Maaari kang makipag-chat sa akin sa Tagalog o English, at kapag kumpleto na ang iyong mga detalye, ipapakita ko ang form para masuri at maipasa mo.\n\nPara magsimula, ano ang iyong buong pangalan, email address, at mobile phone number?',
    welcomeQuickReplies: [
      'Pastor David Santos, david@gracechurch.org, (559) 555-0192',
      'Ako ang church administrator',
      'Tulungan mo akong irehistro ang aming simbahan',
    ],
    resetWelcomeMessage:
      'Na-reset na ang form! Magsimula tayong muli. Sino ang pangunahing contact person na nagrerehistro ng simbahang ito?',
    demoSamples: [
      {
        title: 'Kumpletong Address',
        description: 'Nagbibigay ng pangalan ng simbahan, address at denominasyon',
        message: 'Ang aming simbahan ay Grace Fellowship Church sa 106 E. Shields Ave., Fresno, CA 93704. Kami ay Non-denominational.',
      },
      {
        title: 'Contact Info ng Pastor',
        description: 'Nagbibigay ng pangalan, email at telepono nang sabay',
        message: 'Kumusta, ako si Pastor David Santos. Ang email ko ay david@gracefellowship.org at ang mobile ko ay (559) 555-0192.',
      },
      {
        title: 'Oras ng Pagdating',
        description: 'Binabanggit ang oras ng pagdating sa umaga',
        message: 'Darating kami nang 9:30 AM kasama ang aming ministry team.',
      },
      {
        title: 'Magtalaga ng Ibang Coordinator',
        description: 'Pipili ng ibang tao bilang coordinator',
        message: 'Ibang tao ang magko-coordinate para sa aming simbahan: Sarah Santos, sarah@gracefellowship.org, 559-555-8821.',
      },
    ],

    validationBannerTitle: 'Pagpapatunay ng Form at Huling Pagsusuri',
    validationBannerReady: 'Kumpleto na ang Lahat ng Field',
    validationBannerFields: (done, total) => `${done}/${total} Field`,
    validationBannerDesc:
      'Narito ang iyong nakumpletong registration form. Pakisuri ang iyong mga sagot, baguhin kung kinakailangan, kumpirmahin ang iyong partisipasyon, at ipasa.',
    returnToChatBtn: 'Bumalik sa Chat Assistant',
    wantToEditWithAi: 'Gusto mo bang mag-edit gamit ang chat assistant?',
    askChatAssistantBtn: 'Tanungin ang Chat Assistant',
    aiUpdatedBadge: 'Na-update ng AI',
    formHeaderBadge: 'Baptize The World Registration',
    formHeaderTitle: 'Mga Detalye ng Pagpaparehistro',
    formHeaderSubtitle: 'Awtomatikong nag-a-update ang mga field habang nakikipag-chat ka, o maaari mo itong i-edit sa ibaba.',
    requiredNote: 'Ang mga kinakailangang field ay may markang',

    sec1Title: 'Impormasyon ng Nagpaparehistro at Contact',
    fullNameLabel: 'Buong Pangalan',
    fullNamePlaceholder: 'hal. Pastor David Santos',
    emailLabel: 'Email Address',
    emailPlaceholder: 'pangalan@church.org',
    phoneLabel: 'Mobile Phone Number',
    phonePlaceholder: '+1 (559) 555-0192',

    sec2Title: 'Mga Detalye at Lokasyon ng Simbahan',
    churchNameLabel: 'Pangalan ng Simbahan',
    churchNamePlaceholder: 'hal. Grace Fellowship Church',
    countryLabel: 'Bansa',
    denominationLabel: 'Denominasyon',
    denominationPlaceholder: 'Pumili ng Denominasyon...',
    addressLabel: 'Street Address',
    addressPlaceholder: 'hal. 106 E. Shields Ave.',
    cityLabel: 'Lungsod (City)',
    cityPlaceholder: 'Fresno',
    stateLabel: 'Estado / Probinsya / Rehiyon',
    statePlaceholder: 'CA',
    zipLabel: 'Postal / ZIP Code',
    zipPlaceholder: '93704',
    websiteLabel: 'Website ng Simbahan',
    optionalTag: '(Opsyonal)',

    sec3Title: 'Oras ng Pagdating at Coordinator',
    arrivalTimeLabel: 'Oras ng Pagdating sa Event',
    hourPlaceholder: 'Oras',
    arrivalTimeHint: 'Natural na usapan: "Darating kami nang 9:30 AM"',
    coordinatorLabel: 'Event Coordinator',
    coordSelfTitle: 'Ako ang magko-coordinate',
    coordSelfDesc: 'Ako ang pangunahing coordinator',
    coordOtherTitle: 'Ibang tao',
    coordOtherDesc: 'Magtalaga ng miyembro ng team',
    coordDetailsHeader: 'Karagdagang Detalye ng Coordinator',
    coordNameLabel: 'Pangalan ng Coordinator',
    coordEmailLabel: 'Email ng Coordinator',
    coordPhoneLabel: 'Telepono ng Coordinator',

    sec4Title: 'Pagpili ng Visibility sa Mapa',
    sec4Subtitle: 'Piliin kung paano ipapakita ang lokasyon ng iyong simbahan. Hindi kailanman magdedesisyon ang AI para sa iyo.',
    mapPublicTitle: 'Ilagay sa Pampublikong Mapa',
    mapPublicDesc: 'Ipakita ang pin ng iyong simbahan sa pampublikong mapa at direktoryo.',
    mapHiddenTitle: 'Nakatago / Pribado',
    mapHiddenDesc: 'Panatilihing pribado ang iyong address mula sa pampublikong mapa.',

    sec5Title: 'Pahintulot sa Privacy at Paggamit ng Data',
    requiresExplicitApproval: 'Nangangailangan ng iyong pag-apruba',
    dataProcessingConsentTitle: 'Pahintulot sa Pagproseso ng Data',
    dataProcessingConsentBody:
      'Pinahihintulutan ko ang Baptize The World na ligtas na i-store at iproseso ang mga detalye ng pagpaparehistro ng aming simbahan alinsunod sa Privacy Policy.',
    commitmentsDeferredTitle: 'Mga Pangako sa Partisipasyon',
    commitmentsDeferredBadge: 'Kukumpirmahin sa susunod na pagkakataon',
    commitmentsDeferredDesc:
      'Ang host orientation, volunteer greeters, at code of conduct ay hihingin at kukumpirmahin sa susunod na pagkakataon bago ang event.',
    commitmentItem1: 'Host Orientation (Sa susunod)',
    commitmentItem2: 'Volunteer Greeters (Sa susunod)',
    commitmentItem3: 'Code of Conduct (Sa susunod)',

    sec6Title: 'Mga Kagustuhan sa Komunikasyon',
    smsAlertsTitle: 'Opsyonal na SMS Text Alerts:',
    smsAlertsDesc: 'Makatanggap ng real-time updates sa araw ng event sa pamamagitan ng SMS.',

    finalConfirmTitle: 'Huling Kumpirmasyon ng Partisipasyon',
    finalConfirmDesc: 'Opisyal kong kinukumpirma ang pagpaparehistro at intensyon ng aming simbahan na makilahok sa Baptize The World Gathering.',
    submitBtnReady: 'Kumpletuhin at Ipasa ang Pagpaparehistro',
    submitBtnIncomplete: 'Kumpletuhin ang Mga Kinakailangang Field',

    reviewModalTitle: 'Suriin ang Buod ng Pagpaparehistro',
    reviewModalSubtitle: 'Pakisuri ang lahat ng detalye bago ang huling pagpasa.',
    editMoreBtn: 'Mag-edit Pa',
    confirmRegisterBtn: 'Kumpirmahin at Opisyal na Magrehistro',
    successTitle: 'Kumpirmado na ang Pagpaparehistro ng Simbahan!',
    successSubtitle: (name, church) =>
      `Salamat, ${name}. Ang ${church} ay opisyal nang nakarehistro para sa Baptize The World Gathering.`,
    confirmationRefLabel: 'Confirmation Reference:',
    registeredLocationHeader: 'Nakarehistrong Lokasyon',
    eventLogisticsHeader: 'Impormasyon sa Event',
    whatHappensNextTitle: 'Ano ang Susunod na Mangyayari:',
    nextStep1: (email) =>
      `Nagpadala na ng confirmation packet sa ${email} kasama ang mga gabay sa pagtanggap.`,
    nextStep2: 'Makatatanggap ang iyong coordinator ng calendar invite para sa 30-minutong orientation.',
    nextStep3SmsOn: 'Aktibo na ang SMS alerts para sa araw ng event.',
    nextStep3SmsOff: 'Hindi humiling ng SMS alerts.',
    registerAnotherBtn: 'Magrehistro ng Ibang Simbahan',
    printReceiptBtn: 'I-print ang Resibo',
    downloadPdfBtn: 'I-download ang PDF',
  },

  de: {
    badgeAiAssisted: 'KI-gestützte Registrierung',
    eventSubtitle: 'Weltweites Kircheneinheits- & Tauftreffen',
    navChatAssistant: 'Chat-Assistent',
    navValidateForm: 'Formular prüfen',
    howItWorksTitle: 'Mehrsprachige Chat-Registrierung & Formularprüfung',
    howItWorksStep1: '1. In Ihrer Sprache chatten: Schreiben oder sprechen Sie ganz natürlich.',
    howItWorksStep2: '2. Automatische Erfassung: Der Assistent erkennt Adressen, Uhrzeiten und Kontakte automatisch.',
    howItWorksStep3: '3. Formular bestätigen: Sobald alle Angaben vorliegen, prüfen und senden Sie das Formular ab.',
    closeBtn: 'Schließen',
    languageLabel: 'Sprache',

    conversationalModeTitle: 'Dialogorientierter Registrierungsmodus',
    conversationalModeDesc: 'Chatten Sie unten frei mit dem Assistenten. Das Formular erscheint zur Überprüfung, sobald alle Felder erfasst sind.',
    inspectFormBtn: 'Formular ansehen',
    assistantTitle: 'Baptize The World Assistent',
    assistantBadge: 'Mehrsprachige KI',
    assistantSubtitle: 'Schreiben Sie ganz natürlich — ich fülle das Formular für Sie aus',
    examplesBtn: 'Beispiele',
    resetConfirm: 'Möchten Sie wirklich alle Formularfelder und den Chatverlauf zurücksetzen?',
    progressLabel: 'Registrierungsfortschritt',
    progressStatus: (done, total, pct) => `${done} von ${total} Pflichtangaben (${pct}%)`,
    capturedLabel: 'Erfasst:',
    coordinatorSelfShort: 'Selbst',
    coordinatorOtherShort: 'Beauftragt',
    mapPublicShort: 'Öffentlich',
    mapHiddenShort: 'Verborgen',
    tryScenarioTitle: 'Schnelles Beispiel ausprobieren:',
    fieldsSyncedLabel: 'Aktualisierte Felder:',
    analyzingStatus: 'Analysiere und aktualisiere Formular...',
    inputPlaceholder: "Hier eingeben (z. B. 'Gnadenkirche, 106 E. Shields Ave., Fresno, CA 93704')...",
    sendBtn: 'Senden',
    footerAutoExtractNote: 'KI erkennt automatisch Adressen, Zeiten und Namen.',
    footerConsentNote: 'Einwilligungen erfordern Ihre ausdrückliche Bestätigung.',
    welcomeMessage:
      'Willkommen bei Baptize The World! Ich bin Ihr mehrsprachiger Registrierungsassistent. Chatten Sie einfach mit mir, und sobald alle Daten vorliegen, zeige ich Ihnen das Formular zur Prüfung.\n\nWie lauten Ihr vollständiger Name, Ihre E-Mail-Adresse und Ihre Mobilnummer?',
    welcomeQuickReplies: [
      'Pastor Thomas Müller, thomas@gnadenkirche.org, (559) 555-0192',
      'Ich bin der Gemeindeleiter',
      'Hilf mir, unsere Gemeinde zu registrieren',
    ],
    resetWelcomeMessage:
      'Formular zurückgesetzt! Wer ist der Hauptansprechpartner für die Registrierung dieser Gemeinde?',
    demoSamples: [
      {
        title: 'Vollständige Adresse',
        description: 'Gibt Gemeindename, Adresse und Konfession in einem Satz an',
        message: 'Unsere Gemeinde ist die Grace Fellowship Church in 106 E. Shields Ave., Fresno, CA 93704. Wir sind überkonfessionell (Non-denominational).',
      },
      {
        title: 'Kontaktdaten des Pastors',
        description: 'Gibt Name, E-Mail und Telefonnummer gleichzeitig an',
        message: 'Hallo, ich bin Pastor Thomas Müller. Meine E-Mail ist thomas@gnadenkirche.org und meine Nummer ist (559) 555-0192.',
      },
      {
        title: 'Ankunftszeit',
        description: 'Nennt die Ankunftszeit am Morgen',
        message: 'Wir kommen um 9:30 AM mit unserem Team an.',
      },
      {
        title: 'Andere Person beauftragen',
        description: 'Wählt eine andere Person als Koordinator',
        message: 'Jemand anderes koordiniert für unsere Gemeinde: Sarah Müller, sarah@gnadenkirche.org, 559-555-8821.',
      },
    ],

    validationBannerTitle: 'Formularprüfung & Endgültige Bestätigung',
    validationBannerReady: 'Alle Angaben erfasst',
    validationBannerFields: (done, total) => `${done}/${total} Felder`,
    validationBannerDesc:
      'Hier ist Ihr ausgefülltes Registrierungsformular. Bitte prüfen Sie Ihre Angaben, bestätigen Sie Ihre Teilnahme und senden Sie es ab.',
    returnToChatBtn: 'Zurück zum Chat',
    wantToEditWithAi: 'Möchten Sie etwas mithilfe des Chat-Assistenten ändern?',
    askChatAssistantBtn: 'Chat-Assistent fragen',
    aiUpdatedBadge: 'KI-aktualisiert',
    formHeaderBadge: 'Baptize The World Registrierung',
    formHeaderTitle: 'Details zur Event-Registrierung',
    formHeaderSubtitle: 'Felder werden während des Chats automatisch aktualisiert oder können direkt unten bearbeitet werden.',
    requiredNote: 'Pflichtfelder sind markiert mit',

    sec1Title: 'Anmelder & Kontaktinformationen',
    fullNameLabel: 'Vollständiger Name',
    fullNamePlaceholder: 'z. B. Pastor Thomas Müller',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'name@gemeinde.org',
    phoneLabel: 'Mobiltelefonnummer',
    phonePlaceholder: '+1 (559) 555-0192',

    sec2Title: 'Gemeinde- & Standortdetails',
    churchNameLabel: 'Name der Gemeinde / Kirche',
    churchNamePlaceholder: 'z. B. Grace Fellowship Church',
    countryLabel: 'Land',
    denominationLabel: 'Konfession',
    denominationPlaceholder: 'Konfession / Tradition wählen...',
    addressLabel: 'Straßenadresse',
    addressPlaceholder: 'z. B. 106 E. Shields Ave.',
    cityLabel: 'Stadt',
    cityPlaceholder: 'Fresno',
    stateLabel: 'Bundesland / Kanton / Region',
    statePlaceholder: 'CA',
    zipLabel: 'Postleitzahl / ZIP',
    zipPlaceholder: '93704',
    websiteLabel: 'Website der Gemeinde',
    optionalTag: '(Optional)',

    sec3Title: 'Ankunftszeit & Koordinatorenrolle',
    arrivalTimeLabel: 'Ankunftszeit beim Event',
    hourPlaceholder: 'Stunde',
    arrivalTimeHint: 'Natürliche Eingabe: „Wir kommen um 9:30 AM an“',
    coordinatorLabel: 'Event-Koordinator',
    coordSelfTitle: 'Ich koordiniere selbst',
    coordSelfDesc: 'Ich bin der Hauptkoordinator',
    coordOtherTitle: 'Andere Person',
    coordOtherDesc: 'Teammitglied zuweisen',
    coordDetailsHeader: 'Angaben zum beauftragten Koordinator',
    coordNameLabel: 'Name des Koordinators',
    coordEmailLabel: 'E-Mail des Koordinators',
    coordPhoneLabel: 'Telefon des Koordinators',

    sec4Title: 'Kartensichtbarkeit',
    sec4Subtitle: 'Bitte wählen Sie, wie Ihr Standort angezeigt werden soll. Die KI trifft diese Entscheidung niemals für Sie.',
    mapPublicTitle: 'Öffentlicher Karteneintrag',
    mapPublicDesc: 'Gemeinde auf der öffentlichen Karte und im Teilnehmerverzeichnis anzeigen.',
    mapHiddenTitle: 'Verborgen / Privat',
    mapHiddenDesc: 'Adresse nicht auf der öffentlichen Karte anzeigen.',

    sec5Title: 'Datenschutz- & Datennutzungseinwilligung',
    requiresExplicitApproval: 'Erfordert Ihre ausdrückliche Zustimmung',
    dataProcessingConsentTitle: 'Einwilligung zur Datenverarbeitung',
    dataProcessingConsentBody:
      'Ich stimme zu, dass Baptize The World unsere Registrierungsdaten gemäß der Datenschutzerklärung für die Veranstaltungslogistik speichert und verarbeitet.',
    commitmentsDeferredTitle: 'Teilnahmeverpflichtungen',
    commitmentsDeferredBadge: 'Später zu bestätigen',
    commitmentsDeferredDesc:
      'Orientierungstreffen, Begrüßungsteam und Verhaltenskodex werden zu einem späteren Zeitpunkt vor der Veranstaltung abgefragt.',
    commitmentItem1: 'Host-Orientierung (Später)',
    commitmentItem2: 'Willkommensteam (Später)',
    commitmentItem3: 'Verhaltenskodex (Später)',

    sec6Title: 'Kommunikationseinstellungen',
    smsAlertsTitle: 'Optionale SMS-Benachrichtigungen:',
    smsAlertsDesc: 'Echtzeit-Updates am Veranstaltungstag per SMS erhalten.',

    finalConfirmTitle: 'Endgültige Teilnahmebestätigung',
    finalConfirmDesc: 'Ich bestätige hiermit offiziell die Registrierung und Teilnahme unserer Gemeinde am Baptize The World Treffen.',
    submitBtnReady: 'Registrierung abschließen & absenden',
    submitBtnIncomplete: 'Bitte alle Pflichtfelder ausfüllen',

    reviewModalTitle: 'Registrierungsübersicht prüfen',
    reviewModalSubtitle: 'Bitte überprüfen Sie alle Angaben vor dem endgültigen Absenden.',
    editMoreBtn: 'Weiter bearbeiten',
    confirmRegisterBtn: 'Bestätigen & offiziell registrieren',
    successTitle: 'Gemeinderegistrierung bestätigt!',
    successSubtitle: (name, church) =>
      `Vielen Dank, ${name}. ${church} ist offiziell für Baptize The World registriert.`,
    confirmationRefLabel: 'Bestätigungsreferenz:',
    registeredLocationHeader: 'Registrierter Standort',
    eventLogisticsHeader: 'Veranstaltungslogistik',
    whatHappensNextTitle: 'Die nächsten Schritte:',
    nextStep1: (email) =>
      `Ein Bestätigungspaket wurde an ${email} gesendet.`,
    nextStep2: 'Ihr Koordinator erhält eine Kalendereinladung für die 30-minütige Einführung.',
    nextStep3SmsOn: 'SMS-Benachrichtigungen sind aktiviert.',
    nextStep3SmsOff: 'Keine SMS-Benachrichtigungen angefordert.',
    registerAnotherBtn: 'Weitere Gemeinde registrieren',
    printReceiptBtn: 'Beleg drucken',
    downloadPdfBtn: 'PDF-Zusammenfassung herunterladen',
  },

  ar: {
    badgeAiAssisted: 'التسجيل بمساعدة الذكاء الاصطناعي',
    eventSubtitle: 'التجمع العالمي لوحدة الكنائس والمعمودية',
    navChatAssistant: 'مساعد المحادثة',
    navValidateForm: 'مراجعة النموذج',
    howItWorksTitle: 'التسجيل متعدد اللغات عبر المحادثة ومراجعة النموذج',
    howItWorksStep1: '1. تحدث بلغتك: اكتب أو تحدث بشكل طبيعي باللغة العربية أو أي لغة أخرى.',
    howItWorksStep2: '2. تعبئة تلقائية: يقوم المساعد باستخراج العناوين والأوقات وجهات الاتصال تلقائياً.',
    howItWorksStep3: '3. شاشة التحقق: بمجرد اكتمال البيانات، يظهر النموذج الكامل للمراجعة والإرسال.',
    closeBtn: 'إغلاق',
    languageLabel: 'اللغة',

    conversationalModeTitle: 'وضع التسجيل الحواري',
    conversationalModeDesc: 'تحدث بحرية مع المساعد أدناه. سيظهر النموذج الكامل للمراجعة بمجرد جمع كافة الحقول المطلوبة.',
    inspectFormBtn: 'عرض النموذج',
    assistantTitle: 'مساعد Baptize The World',
    assistantBadge: 'ذكاء اصطناعي متعدد اللغات',
    assistantSubtitle: 'تحدث بشكل طبيعي — سأقوم بتعبئة نموذج التسجيل نيابة عنك',
    examplesBtn: 'أمثلة',
    resetConfirm: 'هل أنت متأكد أنك تريد إعادة تعيين كافة الحقول والمحادثة؟',
    progressLabel: 'تقدم التسجيل',
    progressStatus: (done, total, pct) => `${done} من ${total} بيانات مطلوبة (${pct}%)`,
    capturedLabel: 'تم حفظ:',
    coordinatorSelfShort: 'أنا شخصياً',
    coordinatorOtherShort: 'شخص مفوض',
    mapPublicShort: 'عام',
    mapHiddenShort: 'مخفي',
    tryScenarioTitle: 'جرب مثالاً سريعاً:',
    fieldsSyncedLabel: 'الحقول المحدثة:',
    analyzingStatus: 'جارٍ تحليل وتحديث النموذج...',
    inputPlaceholder: "اكتب هنا (مثال: 'كنيسة النعمة، 106 E. Shields Ave., Fresno, CA 93704')...",
    sendBtn: 'إرسال',
    footerAutoExtractNote: 'يستخرج الذكاء الاصطناعي العناوين والأوقات والأسماء تلقائياً.',
    footerConsentNote: 'تتطلب الموافقات الحساسة تأكيداً صريحاً من المستخدم.',
    welcomeMessage:
      'مرحباً بك في Baptize The World! أنا مساعد التسجيل متعدد اللغات. يمكنك التحدث معي باللغة العربية، وبمجرد جمع كافة التفاصيل سأعرض عليك النموذج لمراجعته وإرساله.\n\nللبدء، ما هو اسمك الكامل وبريدك الإلكتروني ورقم هاتفك المحمول؟',
    welcomeQuickReplies: [
      'القس داود ميلر، david@gracefellowship.org، (559) 555-0192',
      'أنا إداري الكنيسة',
      'ساعدني في تسجيل كنيستنا',
    ],
    resetWelcomeMessage:
      'تمت إعادة تعيين النموذج! من هو الشخص الرئيسي المسؤول عن تسجيل هذه الكنيسة؟',
    demoSamples: [
      {
        title: 'العنوان الكامل للكنيسة',
        description: 'إدخال اسم الكنيسة والعنوان والطائفة في جملة واحدة',
        message: 'كنيستنا هي Grace Fellowship Church في 106 E. Shields Ave., Fresno, CA 93704. نحن غير طائفيين (Non-denominational).',
      },
      {
        title: 'بيانات الاتصال بالقس',
        description: 'تقديم الاسم والبريد والهاتف معاً',
        message: 'مرحباً، أنا القس داود ميلر. بريدي هو david@gracefellowship.org وهاتفي (559) 555-0192.',
      },
      {
        title: 'وقت الوصول',
        description: 'تحديد وقت الوصول صباحاً',
        message: 'سنصل الساعة 9:30 AM مع فريق الخدمة.',
      },
      {
        title: 'تفويض شخص آخر كمنسق',
        description: 'تعيين عضو آخر في الفريق كمنسق',
        message: 'شخص آخر سيقوم بالتنسيق لكنيستنا: Sarah Miller, sarah@gracefellowship.org, 559-555-8821.',
      },
    ],

    validationBannerTitle: 'مراجعة النموذج والتأكيد النهائي',
    validationBannerReady: 'اكتملت جميع الحقول',
    validationBannerFields: (done, total) => `${done}/${total} حقول`,
    validationBannerDesc:
      'هذا هو نموذج التسجيل المكتمل الخاص بك. يرجى مراجعة إجاباتك وتأكيد مشاركتك ثم الإرسال.',
    returnToChatBtn: 'العودة إلى المحادثة',
    wantToEditWithAi: 'هل ترغب في تعديل أي شيء عبر المحادثة؟',
    askChatAssistantBtn: 'اسأل مساعد المحادثة',
    aiUpdatedBadge: 'تم التحديث بالذكاء الاصطناعي',
    formHeaderBadge: 'تسجيل Baptize The World',
    formHeaderTitle: 'تفاصيل التسجيل في الحدث',
    formHeaderSubtitle: 'تتحدث الحقول تلقائياً أثناء المحادثة، أو يمكنك تعديل أي حقل مباشرة أدناه.',
    requiredNote: 'الحقول المطلوبة مشار إليها بـ',

    sec1Title: 'معلومات المسجل وبيانات الاتصال',
    fullNameLabel: 'الاسم الكامل',
    fullNamePlaceholder: 'مثال: القس داود ميلر',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'name@church.org',
    phoneLabel: 'رقم الهاتف المحمول',
    phonePlaceholder: '+1 (559) 555-0192',

    sec2Title: 'تفاصيل وموقع الكنيسة',
    churchNameLabel: 'اسم الكنيسة',
    churchNamePlaceholder: 'مثال: كنيسة زمالة النعمة',
    countryLabel: 'الدولة',
    denominationLabel: 'الطائفة / التقليد الكنسي',
    denominationPlaceholder: 'اختر الطائفة...',
    addressLabel: 'عنوان الشارع',
    addressPlaceholder: 'مثال: 106 E. Shields Ave.',
    cityLabel: 'المدينة',
    cityPlaceholder: 'Fresno',
    stateLabel: 'الولاية / المقاطعة / المنطقة',
    statePlaceholder: 'CA',
    zipLabel: 'الرمز البريدي / ZIP',
    zipPlaceholder: '93704',
    websiteLabel: 'الموقع الإلكتروني للكنيسة',
    optionalTag: '(اختياري)',

    sec3Title: 'وقت الوصول ودور المنسق',
    arrivalTimeLabel: 'وقت الوصول للحدث',
    hourPlaceholder: 'الساعة',
    arrivalTimeHint: 'محادثة طبيعية: "سنصل الساعة 9:30 صباحاً"',
    coordinatorLabel: 'منسق الحدث',
    coordSelfTitle: 'أنا سأقوم بالتنسيق',
    coordSelfDesc: 'أنا المنسق الرئيسي',
    coordOtherTitle: 'شخص آخر',
    coordOtherDesc: 'تعيين عضو من الفريق',
    coordDetailsHeader: 'بيانات المنسق المفوض مطلوبة',
    coordNameLabel: 'اسم المنسق',
    coordEmailLabel: 'بريد المنسق الإلكتروني',
    coordPhoneLabel: 'هاتف المنسق',

    sec4Title: 'خيار الظهور على الخريطة',
    sec4Subtitle: 'يرجى اختيار كيفية عرض موقع كنيستك. لن يتخذ المساعد الذكي هذا القرار نيابة عنك أبداً.',
    mapPublicTitle: 'إدراج في الخريطة العامة',
    mapPublicDesc: 'عرض موقع كنيستك على الخريطة العامة ودليل المشاركين.',
    mapHiddenTitle: 'مخفي / خاص',
    mapHiddenDesc: 'إبقاء عنوانك خاصاً وغير معروض على الخريطة العامة.',

    sec5Title: 'الموافقة على الخصوصية واستخدام البيانات',
    requiresExplicitApproval: 'يتطلب موافقتك الصريحة',
    dataProcessingConsentTitle: 'الموافقة على معالجة البيانات',
    dataProcessingConsentBody:
      'أوافق على قيام Baptize The World بتخزين ومعالجة بيانات تسجيل كنيستنا بأمان لأغراض تنظيم الحدث والتواصل وفقاً لسياسة الخصوصية.',
    commitmentsDeferredTitle: 'التزامات المشاركة',
    commitmentsDeferredBadge: 'سيتم تأكيدها لاحقاً',
    commitmentsDeferredDesc:
      'سيتم طلب وتأكيد حضور اللقاء التعريفي والمتطوعين ومدونة السلوك في وقت لاحق مع اقتراب موعد الحدث.',
    commitmentItem1: 'اللقاء التعريفي (لاحقاً)',
    commitmentItem2: 'فريق الترحيب (لاحقاً)',
    commitmentItem3: 'مدونة السلوك (لاحقاً)',

    sec6Title: 'تفضيلات التواصل',
    smsAlertsTitle: 'تنبيهات الرسائل النصية (SMS) الاختيارية:',
    smsAlertsDesc: 'تلقي تحديثات فورية يوم الحدث عبر الرسائل النصية.',

    finalConfirmTitle: 'التأكيد النهائي للمشاركة',
    finalConfirmDesc: 'أؤكد رسمياً تسجيل كنيستنا ونيتنا المشاركة في تجمع Baptize The World.',
    submitBtnReady: 'إكمال وإرسال تسجيل الكنيسة',
    submitBtnIncomplete: 'يرجى إكمال الحقول المطلوبة للإرسال',

    reviewModalTitle: 'مراجعة ملخص التسجيل',
    reviewModalSubtitle: 'يرجى التحقق من جميع تفاصيل الكنيسة قبل الإرسال النهائي.',
    editMoreBtn: 'تعديل المزيد',
    confirmRegisterBtn: 'تأكيد والتسجيل رسمياً',
    successTitle: 'تم تأكيد تسجيل الكنيسة!',
    successSubtitle: (name, church) =>
      `شكراً لك، ${name}. تم تسجيل ${church} رسمياً في تجمع Baptize The World.`,
    confirmationRefLabel: 'رقم مرجع التأكيد:',
    registeredLocationHeader: 'الموقع المسجل',
    eventLogisticsHeader: 'ترتيبات الحدث',
    whatHappensNextTitle: 'الخطوات التالية:',
    nextStep1: (email) =>
      `تم إرسال حزمة التأكيد إلى ${email}.`,
    nextStep2: 'سيتلقى منسق فريقك دعوة لحضور اللقاء التعريفي لمدة 30 دقيقة.',
    nextStep3SmsOn: 'تنبيهات الرسائل النصية مفعلة ليوم الحدث.',
    nextStep3SmsOff: 'لم يتم طلب تنبيهات الرسائل النصية.',
    registerAnotherBtn: 'تسجيل كنيسة أخرى',
    printReceiptBtn: 'طباعة الإيصال',
    downloadPdfBtn: 'تحميل ملخص PDF',
  },

  sw: {
    badgeAiAssisted: 'Usajili Unaosaidiwa na AI',
    eventSubtitle: 'Mkutano wa Kimataifa wa Umoja wa Makanisa na Ubatizo',
    navChatAssistant: 'Msaidizi wa Gumzo',
    navValidateForm: 'Thibitisha Fomu',
    howItWorksTitle: 'Usajili wa Lugha Nyingi kwa Gumzo na Uthibitishaji',
    howItWorksStep1: '1. Zungumza kwa Lugha Yako: Andika au ongea kwa Kiswahili au Kiingereza.',
    howItWorksStep2: '2. Ujazaji wa Kiotomatiki: AI inachukua anwani, muda na mawasiliano kiotomatiki.',
    howItWorksStep3: '3. Thibitisha Fomu: Maelezo yakikamilika, hakiki na uwasilishe fomu rasmi.',
    closeBtn: 'Funga',
    languageLabel: 'Lugha',

    conversationalModeTitle: 'Hali ya Usajili wa Mazungumzo',
    conversationalModeDesc: 'Zungumza kwa uhuru na msaidizi hapa chini. Fomu itaonekana ili uihakiki baada ya taarifa zote kukusanywa.',
    inspectFormBtn: 'Angalia Fomu',
    assistantTitle: 'Msaidizi wa Baptize The World',
    assistantBadge: 'AI ya Lugha Nyingi',
    assistantSubtitle: 'Zungumza kawaida — nitakujazia fomu ya usajili',
    examplesBtn: 'Mifano',
    resetConfirm: 'Je, una uhakika unataka kufuta taarifa zote na kuanza upya?',
    progressLabel: 'Maendeleo ya Usajili',
    progressStatus: (done, total, pct) => `Taarifa ${done} kati ya ${total} zinazohitajika (${pct}%)`,
    capturedLabel: 'Imechukuliwa:',
    coordinatorSelfShort: 'Mimi mwenyewe',
    coordinatorOtherShort: 'Aliyeteuliwa',
    mapPublicShort: 'Wazi kwa Umma',
    mapHiddenShort: 'Imefichwa',
    tryScenarioTitle: 'Jaribu Mfano wa Haraka:',
    fieldsSyncedLabel: 'Sehemu zilizosasishwa:',
    analyzingStatus: 'Inachambua na kusasisha fomu...',
    inputPlaceholder: "Andika hapa (mf. 'Grace Church, 106 E. Shields Ave., Fresno, CA 93704')...",
    sendBtn: 'Tuma',
    footerAutoExtractNote: 'AI inatambua anwani, muda na majina kiotomatiki.',
    footerConsentNote: 'Idhini za faragha zinahitaji uthibitisho wako wa moja kwa moja.',
    welcomeMessage:
      'Karibu Baptize The World! Mimi ni msaidizi wako wa usajili wa lugha nyingi. Unaweza kuzungumza nami kwa Kiswahili au lugha yoyote, na taarifa zako zikikamilika nitakuonyesha fomu ili uihakiki na kuiwasilisha.\n\nKuanza, jina lako kamili, barua pepe na nambari yako ya simu ni nini?',
    welcomeQuickReplies: [
      'Mchungaji David Miller, david@gracefellowship.org, (559) 555-0192',
      'Mimi ni msimamizi wa kanisa',
      'Nisaidie kusajili kanisa letu',
    ],
    resetWelcomeMessage:
      'Fomu imewekwa upya! Nani mhusika mkuu anayesajili kanisa hili?',
    demoSamples: [
      {
        title: 'Anwani Kamili ya Kanisa',
        description: 'Inatoa jina la kanisa, anwani na dhehebu',
        message: 'Kanisa letu ni Grace Fellowship Church katika 106 E. Shields Ave., Fresno, CA 93704. Sisi ni Non-denominational.',
      },
      {
        title: 'Mawasiliano ya Mchungaji',
        description: 'Inatoa jina, barua pepe na simu kwa pamoja',
        message: 'Habari, mimi ni Mchungaji David Miller. Barua pepe yangu ni david@gracefellowship.org na simu ni (559) 555-0192.',
      },
      {
        title: 'Muda wa Kuwasili',
        description: 'Inataja muda wa kuwasili asubuhi',
        message: 'Tutawasili saa 9:30 AM pamoja na timu yetu ya huduma.',
      },
      {
        title: 'Mteue Mratibu Mwingine',
        description: 'Inachagua mtu mwingine kuwa mratibu',
        message: 'Mtu mwingine ataratibu kwa ajili ya kanisa letu: Sarah Miller, sarah@gracefellowship.org, 559-555-8821.',
      },
    ],

    validationBannerTitle: 'Uthibitishaji wa Fomu na Uhakiki wa Mwisho',
    validationBannerReady: 'Taarifa Zote Zimekusanywa',
    validationBannerFields: (done, total) => `Sehemu ${done}/${total}`,
    validationBannerDesc:
      'Hii hapa fomu yako ya usajili iliyokamilika. Tafadhali pitia majibu yako, thibitisha ushiriki wako, na uwasilishe.',
    returnToChatBtn: 'Rudi kwenye Gumzo',
    wantToEditWithAi: 'Ungependa kuhariri chochote kwa msaada wa gumzo?',
    askChatAssistantBtn: 'Uliza Msaidizi wa Gumzo',
    aiUpdatedBadge: 'Imesasishwa na AI',
    formHeaderBadge: 'Usajili wa Baptize The World',
    formHeaderTitle: 'Maelezo ya Usajili wa Tukio',
    formHeaderSubtitle: 'Sehemu zinasasishwa unapozungumza na msaidizi, au unaweza kuzihariri moja kwa moja hapa chini.',
    requiredNote: 'Sehemu za lazima zina alama ya',

    sec1Title: 'Taarifa za Msajili na Mawasiliano',
    fullNameLabel: 'Jina Kamili',
    fullNamePlaceholder: 'mf. Mchungaji David Miller',
    emailLabel: 'Barua Pepe',
    emailPlaceholder: 'jina@church.org',
    phoneLabel: 'Nambari ya Simu ya Mkononi',
    phonePlaceholder: '+1 (559) 555-0192',

    sec2Title: 'Maelezo na Mahali pa Kanisa',
    churchNameLabel: 'Jina la Kanisa',
    churchNamePlaceholder: 'mf. Grace Fellowship Church',
    countryLabel: 'Nchi',
    denominationLabel: 'Dhehebu',
    denominationPlaceholder: 'Chagua Dhehebu...',
    addressLabel: 'Anwani ya Mtaa',
    addressPlaceholder: 'mf. 106 E. Shields Ave.',
    cityLabel: 'Mji / Jiji',
    cityPlaceholder: 'Fresno',
    stateLabel: 'Jimbo / Mkoa',
    statePlaceholder: 'CA',
    zipLabel: 'Msimbo wa Posta / ZIP',
    zipPlaceholder: '93704',
    websiteLabel: 'Tovuti ya Kanisa',
    optionalTag: '(Si lazima)',

    sec3Title: 'Muda wa Kuwasili na Jukumu la Mratibu',
    arrivalTimeLabel: 'Muda wa Kuwasili kwenye Tukio',
    hourPlaceholder: 'Saa',
    arrivalTimeHint: 'Mazungumzo ya kawaida: "Tutawasili saa 9:30 AM"',
    coordinatorLabel: 'Mratibu wa Tukio',
    coordSelfTitle: 'Nitaratibu mwenyewe',
    coordSelfDesc: 'Mimi ndiye mratibu mkuu',
    coordOtherTitle: 'Mtu mwingine',
    coordOtherDesc: 'Teua mwanatimu mwingine',
    coordDetailsHeader: 'Maelezo ya Mratibu Aliyeteuliwa',
    coordNameLabel: 'Jina la Mratibu',
    coordEmailLabel: 'Barua Pepe ya Mratibu',
    coordPhoneLabel: 'Simu ya Mratibu',

    sec4Title: 'Chaguo la Kuonekana kwenye Ramani',
    sec4Subtitle: 'Tafadhali chagua jinsi eneo la kanisa lako litakavyoonyeshwa. AI haitafanya uamuzi huu kwa niaba yako.',
    mapPublicTitle: 'Onyesha kwenye Ramani ya Umma',
    mapPublicDesc: 'Onyesha kanisa lako kwenye ramani ya umma na orodha ya washiriki.',
    mapHiddenTitle: 'Ficha / Binafsi',
    mapHiddenDesc: 'Weka anwani yako faragha nje ya ramani ya umma.',

    sec5Title: 'Idhini ya Faragha na Matumizi ya Data',
    requiresExplicitApproval: 'Inahitaji idhini yako ya moja kwa moja',
    dataProcessingConsentTitle: 'Idhini ya Uchakataji wa Data',
    dataProcessingConsentBody:
      'Ninakubali Baptize The World kuhifadhi na kuchakata kwa usalama taarifa za usajili wa kanisa letu kwa mujibu wa Sera ya Faragha.',
    commitmentsDeferredTitle: 'Ahadi za Ushiriki',
    commitmentsDeferredBadge: 'zitathibitishwa baadaye',
    commitmentsDeferredDesc:
      'Mafunzo ya wenyeji, wakaribishaji wa kujitolea, na kanuni za maadili vitaombwa na kuthibitishwa baadaye karibu na tarehe ya tukio.',
    commitmentItem1: 'Mafunzo ya Wenyeji (Baadaye)',
    commitmentItem2: 'Wakaribishaji (Baadaye)',
    commitmentItem3: 'Kanuni za Maadili (Baadaye)',

    sec6Title: 'Mapendeleo ya Mawasiliano',
    smsAlertsTitle: 'Taarifa za Ujumbe Mfupi (SMS) (Si lazima):',
    smsAlertsDesc: 'Pokea taarifa za moja kwa moja siku ya tukio kupitia SMS.',

    finalConfirmTitle: 'Uthibitisho wa Mwisho wa Ushiriki',
    finalConfirmDesc: 'Ninathibitisha rasmi usajili wa kanisa letu na nia ya kushiriki katika mkutano wa Baptize The World.',
    submitBtnReady: 'Kamilisha na Wasilisha Usajili wa Kanisa',
    submitBtnIncomplete: 'Jaza Sehemu Zinazohitajika Ili Kuwasilisha',

    reviewModalTitle: 'Pitia Muhtasari wa Usajili',
    reviewModalSubtitle: 'Tafadhali hakiki maelezo yote ya kanisa kabla ya kuwasilisha.',
    editMoreBtn: 'Hariri Zaidi',
    confirmRegisterBtn: 'Thibitisha na Usajili Rasmi',
    successTitle: 'Usajili wa Kanisa Umethibitishwa!',
    successSubtitle: (name, church) =>
      `Asante, ${name}. ${church} imesajiliwa rasmi kwa ajili ya mkutano wa Baptize The World.`,
    confirmationRefLabel: 'Nambari ya Uthibitisho:',
    registeredLocationHeader: 'Mahali Paliposajiliwa',
    eventLogisticsHeader: 'Mpangilio wa Tukio',
    whatHappensNextTitle: 'Hatua Zinazofuata:',
    nextStep1: (email) =>
      `Kifurushi cha uthibitisho kimetumwa kwa ${email}.`,
    nextStep2: 'Mratibu wako atapokea mwaliko wa kalenda kwa kikao cha dakika 30.',
    nextStep3SmsOn: 'Taarifa za SMS zimewashwa kwa siku ya tukio.',
    nextStep3SmsOff: 'Taarifa za SMS hazikuombwa.',
    registerAnotherBtn: 'Sajili Kanisa Jingine',
    printReceiptBtn: 'Chapisha Risiti',
    downloadPdfBtn: 'Pakua Muhtasari wa PDF',
  },
};
