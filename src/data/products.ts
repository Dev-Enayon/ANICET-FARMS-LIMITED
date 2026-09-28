// ---------------------------------------------------------------------------
// Product catalogue.
//
// CRITICAL RULE: Do not invent products, prices, certifications, origins or
// destinations. The enquiry-first CTA reflects a corporate/B2B stance (no
// e-commerce here). `productCategories` is the single source of truth; the
// flattened `products` list is derived from it so Search and pages share one
// database.
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

export const productCategories: ProductCategory[] = [
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
    products: [
      {
        id: 'bitter-leaf',
        name: 'Bitter Leaf',
        category: 'Vegetables',
        description:
          'A traditional green leaf vegetable, prepared for quality presentation and dependable supply.',
        availability: 'request-information',
        image: '/img/products/vegetables/bitter-leaf.png',
        imageAlt: 'Photograph of Bitter Leaf',
        imageWidth: 1583,
        imageHeight: 994,
      },
      {
        id: 'ugwu',
        name: 'Ugwu (Fluted Pumpkin Leaf)',
        category: 'Vegetables',
        description:
          'Fluted pumpkin leaf, a widely used green vegetable, handled with care for quality-conscious customers and markets.',
        availability: 'request-information',
        image: '/img/products/vegetables/ugu.png',
        imageAlt: 'Photograph of Ugwu (Fluted Pumpkin Leaf)',
        imageWidth: 1672,
        imageHeight: 941,
      },
      {
        id: 'water-leaf',
        name: 'Water Leaf',
        category: 'Vegetables',
        description:
          'A tender leafy vegetable, prepared with attention to freshness, handling and market presentation.',
        availability: 'request-information',
        image: '/img/products/vegetables/water-leaf.png',
        imageAlt: 'Photograph of Water Leaf',
        imageWidth: 940,
        imageHeight: 1674,
      },
    ],
  },
  {
    id: 'meat',
    name: 'Meat',
    summary:
      'Meat products presented with emphasis on careful sourcing, handling and dependable supply.',
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
    products: [],
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
    products: [],
  },
  {
    id: 'other-goods',
    name: 'Fabrics & Other Export Goods',
    summary:
      'Exploring suitable fabrics and other export-oriented goods for broader commercial and export opportunities.',
    products: [],
  },
];

// Flattened list — shared by the header search index and catalogue rendering.
export const products: Product[] = productCategories.flatMap((category) => category.products);

/** The category shown as the homepage featured collection (real products today). */
export const featuredCategory = productCategories.find((category) => category.id === 'vegetables');

export const productEnquiryLabel = 'Request information';

export const catalogueNote =
  'Product and service information is published as operations are formalised and verified.';