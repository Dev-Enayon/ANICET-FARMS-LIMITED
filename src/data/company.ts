// ---------------------------------------------------------------------------
// ANICET FARMS LIMITED — core company data.
//
// CRITICAL RULE: do not invent facts. Every field below that is not yet
// verified is left empty/null and marked with a TODO. Populated rendering
// happens only when the value exists; otherwise pages display an honest
// placeholder or hide the element.
// ---------------------------------------------------------------------------

import type { Value } from './types';

export interface CompanyCore {
  /** Legal registered name. Verified: supplied by the client brief. */
  legalName: string;
  /** Short operating name used in the wordmark. */
  operatingName: string;
  industry: string;
  /** Neutral positioning statement — to be replaced with the company's own statement. */
  shortStatement: string;

  // ---- Contact & registration ----
  // TODO: Populate from verified company documentation. Leave undefined
  // until confirmed — never display guessed values.
  registrationNumber?: string;
  established?: number;
  addressTitle?: string;
  addressLines?: string[];
  phone?: string;
  email?: string;
  businessHours?: string;
}

export const company: CompanyCore = {
  legalName: 'ANICET FARMS LIMITED',
  operatingName: 'ANICET FARMS',
  industry: 'Agriculture',
  shortStatement:
    'An agricultural enterprise focused on disciplined production, professional operations, and long-term value.',
};

// ---------------------------------------------------------------------------
// Mission / Vision — TODO: replace with ANICET FARMS LIMITED's verified copy.
// Values below are aspirational standards (definitions only), NOT claims of
// achievement. Refine wording with the company before launch.
// ---------------------------------------------------------------------------

export const mission: string | null = null; // TODO: verified mission statement
export const vision: string | null = null; // TODO: verified vision statement

// ---------------------------------------------------------------------------
// Contact channels — TODO: replace with ANICET FARMS LIMITED's confirmed
// contact details. Placeholder values communicate that the details are
// intentionally omitted until verified.
// ---------------------------------------------------------------------------

export interface ContactChannel {
  label: string;
  value: string;
  icon: string;
}

export const contactChannels: ContactChannel[] = [
  { label: 'Address', value: 'Awaiting company details', icon: '01' },
  { label: 'Phone', value: 'Awaiting company details', icon: '02' },
  { label: 'Email', value: 'Awaiting company details', icon: '03' },
  { label: 'Working Hours', value: 'Awaiting company details', icon: '04' },
];

export const values: Value[] = [
  {
    title: 'Quality',
    description: 'The standard to which every product and service is held.',
  },
  {
    title: 'Consistency',
    description: 'Dependable performance and outcomes, season after season.',
  },
  {
    title: 'Traceability',
    description: 'Clear visibility across every stage of our operations.',
  },
  {
    title: 'Responsible Growth',
    description: 'Development that considers people, communities, and the land.',
  },
];

// ---------------------------------------------------------------------------
// Business focus areas & About copy.
//
// Positioning language only: the exact verified offer is documented in
// products.ts / services.ts as it is confirmed. Nothing here makes a factual
// claim about specific produce, destinations, volumes, or history.
// ---------------------------------------------------------------------------

export interface BusinessArea {
  title: string;
  summary: string;
  /** Existing project image when it honestly represents the area. */
  image?: string;
  /** Accompanying alt text when an image is used. */
  alt?: string;
}

export const businessAreas: BusinessArea[] = [
  {
    title: 'Vegetables',
    summary: 'Fresh produce prepared with attention to quality, handling and market needs.',
    image: '/img/hero/hero-vegetables.jpeg',
    alt: 'Fresh green vegetables growing in an agricultural field',
  },
  {
    title: 'Meat',
    summary: 'Quality meat products sourced and handled with care, with an emphasis on reliability and responsible supply.',
    image: '/img/hero/hero-meat-seafood.jpeg',
    alt: 'Fresh meat, seafood, poultry and eggs',
  },
  {
    title: 'Farming',
    summary: 'Agricultural production and farming activities that support a dependable source of quality produce.',
    image: '/img/farming/farm-field1.jpeg',
    alt: 'Green agricultural field landscape',
  },
  {
    title: 'Fabrics & Textile Goods',
    summary: 'Seeking opportunities to connect quality fabrics and textile-related goods with wider commercial and export markets.',
  },
  {
    title: 'Other Exportable Goods',
    summary: 'Supporting the sourcing and movement of additional suitable goods that meet market and quality requirements.',
  },
];

export const about = {
  intro:
    'ANICET FARMS is an agricultural and export-focused company committed to connecting quality farm produce and carefully sourced goods with markets that value reliability, quality and consistency.',
  bridge:
    'We are building a dependable bridge between quality agricultural production and markets beyond borders.',
  /** Aspirational direction — presented as a vision statement, not an existing achievement. */
  visionDirection:
    'To build a trusted agricultural and export platform that connects quality goods with wider markets while contributing to stronger value chains and meaningful economic opportunities.',
  /** Aspirational direction — refined with the company once its official mission is confirmed. */
  missionDirection:
    'To provide reliable access to quality agricultural and export-oriented goods through responsible sourcing, careful attention to quality, and a commitment to building lasting relationships with customers, suppliers and partners.',
  /** Short homepage vision line — opportunity described as intent, never as measured impact. */
  visionSummary:
    'Our vision is to contribute to a stronger agricultural value chain where quality produce can move from local production and sourcing to wider markets — creating opportunities for farmers, suppliers, businesses and communities along the way.',
  qualityStatement:
    'Quality affects trust, repeat business and export relationships. It begins at the source and continues through handling, preparation and delivery.',
  relationshipsStatement:
    'Agricultural and export businesses depend on strong relationships between farmers, suppliers, customers, logistics partners, business partners, communities and the markets they serve.',
};