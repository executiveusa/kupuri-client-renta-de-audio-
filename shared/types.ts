// shared/types.ts

export type Language = 'es' | 'en';

export type EventType = 'fiesta' | 'concierto' | 'corporativo' | 'otro';

export interface EventFormData {
  name: string;
  email: string;
  eventType: EventType;
  needs: string;
  guestCount?: number;
  location?: string;
  date?: string;
  phone?: string;
}

export interface Service {
  id: string;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  icon?: string;
}

export interface PricingTier {
  id: 'social' | 'escenico' | 'corporativo';
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  features: {
    es: string[];
    en: string[];
  };
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  leadTime: {
    min: number;
    max: number;
    unit: 'days' | 'weeks';
  };
}

export interface ProposalResponse {
  id: string;
  clientName: string;
  email: string;
  eventType: EventType;
  tiers: {
    social: TierProposal;
    escenico: TierProposal;
    corporativo: TierProposal;
  };
  nextSteps: string[];
  timestamp: string;
}

export interface TierProposal {
  name: string;
  description: string;
  specs: string[];
  priceRange: string;
  leadTime: string;
  deliverables?: string[];
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language: Language;
}

export interface ClientMemory {
  email: string;
  clientName?: string;
  eventType?: EventType;
  firstContact: string;
  lastContact: string;
  conversations: ConversationMessage[];
  proposal?: ProposalResponse;
  status: 'new' | 'qualified' | 'proposed' | 'booked' | 'completed';
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface WebhookPayload {
  type: 'form_submission' | 'whatsapp_message' | 'telegram_message';
  source: 'form' | 'whatsapp' | 'telegram';
  payload: Record<string, unknown>;
  timestamp: string;
}

export const DOS2A_SERVICES = {
  audio: {
    id: 'audio',
    nameEs: 'Audio Profesional',
    nameEn: 'Professional Audio',
    descriptionEs: 'Sistemas de sonido de alta calidad para cualquier escala de evento',
    descriptionEn: 'High-quality sound systems for any event scale',
  },
  lighting: {
    id: 'lighting',
    nameEs: 'Iluminación Escénica',
    nameEn: 'Stage Lighting',
    descriptionEs: 'Diseño de iluminación que transforma espacios',
    descriptionEn: 'Lighting design that transforms spaces',
  },
  production: {
    id: 'production',
    nameEs: 'Producción Audiovisual',
    nameEn: 'Audiovisual Production',
    descriptionEs: 'Camaras, proyección, streaming profesional',
    descriptionEn: 'Professional cameras, projection, streaming',
  },
  operations: {
    id: 'operations',
    nameEs: 'Operación Técnica',
    nameEn: 'Technical Operations',
    descriptionEs: 'Coordinación en vivo durante tu evento',
    descriptionEn: 'Live coordination during your event',
  },
} as const;

export const PRICING_TIERS: Record<string, PricingTier> = {
  social: {
    id: 'social',
    nameEs: 'Social',
    nameEn: 'Social',
    descriptionEs: 'Bodas, cumpleaños, fiestas privadas',
    descriptionEn: 'Weddings, birthdays, private parties',
    features: {
      es: [
        'Hasta 300 personas',
        'Sistema de audio 4-6kW',
        'Iluminación básica + effectos',
        'Soporte técnico en vivo',
      ],
      en: [
        'Up to 300 people',
        '4-6kW audio system',
        'Basic lighting + effects',
        'Live technical support',
      ],
    },
    priceRange: { min: 800, max: 2000, currency: 'USD' },
    leadTime: { min: 2, max: 3, unit: 'weeks' },
  },
  escenico: {
    id: 'escenico',
    nameEs: 'Escénico',
    nameEn: 'Stage',
    descriptionEs: 'Conciertos, shows, eventos con production value',
    descriptionEn: 'Concerts, shows, high-production events',
    features: {
      es: [
        '300+ personas',
        'Sistema de audio 15-30kW',
        'Iluminación profesional con seguimiento',
        'Proyección y visuales',
        'Operador dedicado',
      ],
      en: [
        '300+ people',
        '15-30kW audio system',
        'Professional automated lighting',
        'Projection and visuals',
        'Dedicated operator',
      ],
    },
    priceRange: { min: 3000, max: 8000, currency: 'USD' },
    leadTime: { min: 4, max: 6, unit: 'weeks' },
  },
  corporativo: {
    id: 'corporativo',
    nameEs: 'Corporativo',
    nameEn: 'Corporate',
    descriptionEs: 'Conferencias, activaciones, lanzamientos',
    descriptionEn: 'Conferences, activations, launches',
    features: {
      es: [
        'Hasta 1000 personas',
        'Audio profesional con claridad de voz',
        'Iluminación de branding',
        'Streaming profesional',
        'Control desde punto móvil',
      ],
      en: [
        'Up to 1000 people',
        'Professional audio with clarity',
        'Branded lighting',
        'Professional streaming',
        'Remote control capability',
      ],
    },
    priceRange: { min: 2000, max: 5000, currency: 'USD' },
    leadTime: { min: 2, max: 4, unit: 'weeks' },
  },
};
