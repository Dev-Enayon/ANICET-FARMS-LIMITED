// Shared domain types for the ANICET FARMS LIMITED content layer.
// Kept deliberately separate so the data files stay free of UI concerns.

export type VerificationStatus = 'confirmed' | 'unconfirmed';

export interface Value {
  title: string;
  description: string;
}

export interface Capability {
  title: string;
  description: string;
  slug: string;
  image?: string;
  status: VerificationStatus;
}

export interface ValueChainStage {
  id: string;
  label: string;
  description?: string;
  status: VerificationStatus;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  packaging?: string;
  unit?: string;
  availability?: 'in-stock' | 'request-information' | 'unconfirmed';
  image?: string;
  /**
   * Retail unit price in USD major units (e.g. `3.5` renders as `$3.50`).
   * Used only by retail-format shelves (e.g. the desktop vegetable section).
   * The corporate/enquiry-first catalogue deliberately stores no prices; this
   * field stays optional so verified data can be added without restructuring.
   */
  price?: number;
}

export interface LeadershipMember {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
}

export interface Location {
  name: string;
  addressLines: string[];
  phone?: string;
  email?: string;
  hours?: string;
  mapUrl?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}