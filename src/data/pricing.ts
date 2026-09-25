// Retail price display for the desktop vegetable section only.
//
// The underlying catalogue (`src/data/products.ts`) stores no prices — that is
// an enquiry-first corporate decision. This module is the presentation layer
// for products that DO carry the optional `price` field (USD major units).
// It deliberately does not touch `src/data/shop.ts` (₦ cart total placeholder).

export const vegetableCurrency = '$';

export function formatUsdPrice(majorUnits: number): string {
  return `${vegetableCurrency}${majorUnits.toFixed(2)}`;
}