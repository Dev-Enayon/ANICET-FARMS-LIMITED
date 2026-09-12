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