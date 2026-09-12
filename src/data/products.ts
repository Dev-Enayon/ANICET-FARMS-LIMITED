// ---------------------------------------------------------------------------
// Product catalogue.
//
// CRITICAL RULE: Do not invent product names. `products` is intentionally
// empty. Populate only with verified products using the fields below.
// The enquiry-first CTA reflects a corporate/B2B stance (no e-commerce here).
// ---------------------------------------------------------------------------

import type { Product } from './types';

// TODO: Add verified products only (name, category, packaging, unit, etc.).
export const products: Product[] = [];

export const productEnquiryLabel = 'Request information';

export const catalogueNote =
  'Product and service information will be published here as operations are formalised and verified.';