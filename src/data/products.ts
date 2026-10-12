// ---------------------------------------------------------------------------
// Product catalogue — category configuration (the fixed, editorial part).
//
// CRITICAL RULES:
//  - `categoryDefinitions` is the fixed catalogue structure (collections and
//    their card imagery). Admin can add/update/remove *products* inside these
//    collections via the /admin/ dashboard — the collections themselves are
//    curated here.
//  - Live product entries live in data/products.json and are read at request
//    time through src/lib/catalog.ts. Do NOT invent products, prices,
//    certifications, origins or destinations. The enquiry-first CTA reflects a
//    corporate/B2B stance (no e-commerce here).
//
// Image asset manifest (originals → served copies under public/img):
//   img/product-card/WhatsApp Image 2026-09-28 at 11.51.12.jpeg
//     → public/img/product-card/vegetables.jpg      (Vegetables category card)
//   img/product-card/WhatsApp Image 2026-09-28 at 11.51.13.jpeg
//     → public/img/product-card/farming.jpg         (Farming category card)
//   img/products/vegetable product/bitter lief.png → public/img/products/vegetables/bitter-leaf.png
//   img/products/vegetable product/ugu.png          → public/img/products/vegetables/ugu.png
//   img/products/vegetable product/water lief.png   → public/img/products/vegetables/water-leaf.png
// Category cards without an owner-supplied image use an honest placeholder
// (no fabricated imagery).
// ---------------------------------------------------------------------------

import type { Product } from './types';

export interface CardImage {
  src: string;
  /** Honest alt text describing exactly what this photograph shows. */
  alt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  summary: string;
  /** Large category card image (served copy). Omit when no honest image exists. */
  cardImage?: string;
  cardImageAlt?: string;
  /** Ordered images for the auto-sliding collection card. Provide two or more to
      enable the slide show; a single entry renders statically. Omit when no
      honest imagery exists (the card then shows its placeholder surface). */
  cardImages?: CardImage[];
  products: Product[];
}

export type CategoryDefinition = Omit<ProductCategory, 'products'>;

/** Fixed catalogue structure. Admin edits products, not collections. */
export const categoryDefinitions: CategoryDefinition[] = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    summary:
      'Quality agricultural produce sourced and presented for customers and markets seeking dependable fresh produce.',
    cardImage: '/img/product-card/vegetables.jpg',
    cardImageAlt: 'Fresh vegetable produce displayed for market presentation',
    cardImages: [
      {
        src: '/img/hero/hero-vegetables.jpeg',
        alt: 'Fresh green vegetables growing in an agricultural field',
      },
      {
        src: '/img/product-card/vegetables.jpg',
        alt: 'Fresh vegetable produce displayed for market presentation',
      },
      { src: '/img/products/vegetables/bitter-leaf.png', alt: 'Photograph of Bitter Leaf' },
      {
        src: '/img/products/vegetables/ugu.png',
        alt: 'Photograph of Ugwu (Fluted Pumpkin Leaf)',
      },
      { src: '/img/products/vegetables/water-leaf.png', alt: 'Photograph of Water Leaf' },
    ],
  },
  {
    id: 'meat',
    name: 'Meat',
    summary: 'Meat products presented with emphasis on careful sourcing, handling and dependable supply.',
    cardImage: '/img/hero/hero-meat-seafood.jpeg',
    cardImageAlt: 'Fresh meat, seafood, poultry and eggs',
    // Only one honest meat/sourcing photograph exists at this time, so this
    // card renders the single image statically (no slide show yet).
    cardImages: [
      {
        src: '/img/hero/hero-meat-seafood.jpeg',
        alt: 'Fresh meat, seafood, poultry and eggs',
      },
    ],
  },
  {
    id: 'farming',
    name: 'Farming & Agricultural Goods',
    summary:
      'Agricultural production and farming activities supporting the wider ANICET FARMS value chain.',
    cardImage: '/img/product-card/farming.jpg',
    cardImageAlt: 'Agricultural field landscape',
    cardImages: [
      { src: '/img/product-card/farming.jpg', alt: 'Agricultural field landscape' },
      { src: '/img/farming/farm-field1.jpeg', alt: 'Green agricultural field landscape' },
      {
        src: '/img/farming/farming-operation.jpg',
        alt: 'Agricultural machinery operating in a farm field',
      },
      { src: '/img/farming/harvesting.jpeg', alt: 'Harvested crops gathered from the farm' },
      { src: '/img/hero/hero-farm.jpeg', alt: 'Agricultural farmland landscape' },
    ],
  },
  {
    id: 'other-goods',
    name: 'Fabrics & Other Export Goods',
    summary:
      'Exploring suitable fabrics and other export-oriented goods for broader commercial and export opportunities.',
  },
];

export const productEnquiryLabel = 'Request information';

export const catalogueNote =
  'Product and service information is published as operations are formalised and verified.';