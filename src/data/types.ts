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

export interface Statistic {
  id: string;
  label: string;
  value?: number | string;
  prefix?: string;
  suffix?: string;
  note?: string;
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

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO 8601
  published: boolean;
  category: string;
}