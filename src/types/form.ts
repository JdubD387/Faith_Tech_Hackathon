export interface FormState {
  // Registrant Contact Info
  fullName: string;
  email: string;
  phone: string;

  // Church Details
  churchName: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  website: string;
  denomination: string;

  // Event Logistics
  arrivalTimeHour: string;
  arrivalTimeMinute: string;
  arrivalTimeAmPm: 'AM' | 'PM' | '';

  // Coordinator Details
  coordinatorRole: 'self' | 'someone_else' | '';
  coordinatorName: string;
  coordinatorEmail: string;
  coordinatorPhone: string;

  // Map Visibility
  mapVisibility: 'public' | 'hidden' | '';

  // Commitments & Consent
  commitmentOrientation: boolean;
  commitmentVolunteers: boolean;
  commitmentCodeOfConduct: boolean;
  privacyConsent: boolean;

  // Communication Preferences
  smsUpdates: boolean;

  // Final Confirmation
  finalConfirmation: boolean;
}

export type FieldKey = keyof FormState;

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user' | 'system';
  content: string;
  timestamp: Date;
  updatedFields?: FieldKey[];
  quickReplies?: string[];
  formatHint?: string;
}

export interface AssistantApiResponse {
  extractedFields: Partial<FormState>;
  aiResponse: string;
  suggestedQuickReplies: string[];
  fieldHighlights: FieldKey[];
  isReadyForReview: boolean;
  formatHint?: string;
}
