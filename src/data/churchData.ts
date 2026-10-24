export const DENOMINATIONS = [
  'Non-denominational / Independent',
  'Baptist',
  'Methodist / Wesleyan',
  'Presbyterian / Reformed',
  'Pentecostal / Charismatic',
  'Lutheran',
  'Anglican / Episcopal',
  'Evangelical Free',
  'Assemblies of God',
  'Calvary Chapel',
  'Catholic',
  'Other Christian Tradition',
];

export const COUNTRIES = [
  'United States',
  'Canada',
  'Mexico',
  'Brazil',
  'Colombia',
  'Argentina',
  'United Kingdom',
  'France',
  'Germany',
  'Spain',
  'South Korea',
  'Philippines',
  'China',
  'India',
  'Nigeria',
  'Kenya',
  'South Africa',
  'Australia',
  'New Zealand',
  'Egypt',
  'Other',
];

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  phone: '',
  churchName: '',
  country: 'United States',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  website: '',
  denomination: '',
  arrivalTimeHour: '',
  arrivalTimeMinute: '00',
  arrivalTimeAmPm: '' as const,
  coordinatorRole: '' as const,
  coordinatorName: '',
  coordinatorEmail: '',
  coordinatorPhone: '',
  mapVisibility: '' as const,
  commitmentOrientation: false,
  commitmentVolunteers: false,
  commitmentCodeOfConduct: false,
  privacyConsent: false,
  smsUpdates: false,
  finalConfirmation: false,
};

export interface DemoSample {
  title: string;
  description: string;
  message: string;
}

export const DEMO_SAMPLES: DemoSample[] = [
  {
    title: 'Full Address in Fresno',
    description: 'Pastes complete address in one sentence as in prompt example',
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
    description: 'Selects someone else as coordinator to trigger dynamic fields',
    message: 'Someone else will be coordinating for our church: Sarah Miller, sarah@gracefellowship.org, 559-555-8821.',
  },
];
