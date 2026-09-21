// Shop counters + cart total placeholder.
//
// This site is enquiry-first (no e-commerce): there is no live cart or
// wishlist backend yet, so counts default to 0 and the total to a zeroed
// amount. Wire these values to real state when commerce logic lands (the
// badge anchors are data-badge="wishlist" / data-badge="cart").

export const wishlistCount = 0;
export const cartCount = 0;

export const currency = '₦';

export function formatCartTotal(majorUnits: number): string {
  return `${currency}${majorUnits.toFixed(2)}`;
}

export const cartTotal = formatCartTotal(0);