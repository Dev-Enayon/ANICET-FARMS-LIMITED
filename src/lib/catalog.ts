// ---------------------------------------------------------------------------
// Live product catalogue store.
//
// Products are edited through the /admin/ dashboard. The authoritative copy is
// a JSON file (data/products.json) committed to the repo; this module is the
// single reader/writer. Public pages that must reflect admin edits (home,
// /products/, header search) call the async accessors below at request time —
// only request-scoped reads see live data, in both `astro dev`, `astro preview`
// and a standalone `node ./dist/server/entry.mjs` deployment.
//
// The file is seeded from the verified starter catalogue if it is missing. All
// writes go through a temp-file + rename so a crash never leaves a torn file.
// ---------------------------------------------------------------------------

import { existsSync, renameSync } from 'node:fs';
import { mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import type { Product } from '../data/types';
import type { ProductCategory } from '../data/products';
import { categoryDefinitions, productEnquiryLabel } from '../data/products';

export { categoryDefinitions, productEnquiryLabel };

/** The collection surfaced as the homepage "Featured Collection". */
export const FEATURED_CATEGORY_ID = 'vegetables';

const STORE_PATH = resolve(process.cwd(), 'data', 'products.json');

/** Verified starter catalogue — used to seed the store on first run. */
const STORE_SEED: Product[] = [
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
];

/** Raised by store mutations; mapped to HTTP responses by the API routes. */
export class CatalogError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: { field: string; message: string }[],
  ) {
    super(message);
  }
}

function ensureStore(): void {
  if (existsSync(STORE_PATH)) return;
  try {
    mkdirSync(dirname(STORE_PATH), { recursive: true });
    writeFileSync(STORE_PATH, `${JSON.stringify(STORE_SEED, null, 2)}\n`, 'utf8');
  } catch {
    throw new CatalogError(500, 'Could not initialise the product store.');
  }
}

export function loadProducts(): Product[] {
  ensureStore();
  try {
    const parsed: unknown = JSON.parse(readFileSync(STORE_PATH, 'utf8'));
    if (!Array.isArray(parsed)) throw new Error('store is not an array');
    return parsed as Product[];
  } catch {
    // A corrupted store is a serious incident — fail loudly rather than
    // serving silently wrong data.
    throw new CatalogError(500, 'The product store could not be read.');
  }
}

function writeStore(products: Product[]): void {
  try {
    mkdirSync(dirname(STORE_PATH), { recursive: true });
    const tmp = `${STORE_PATH}.${process.pid}.tmp`;
    writeFileSync(tmp, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
    renameSync(tmp, STORE_PATH);
  } catch {
    throw new CatalogError(500, 'The product store could not be written.');
  }
}

/** Merges the fixed collection config with the live product list. */
export function getCatalog(): ProductCategory[] {
  const all = loadProducts();
  return categoryDefinitions.map((definition) => ({
    ...definition,
    products: all.filter((product) => product.category === definition.name),
  }));
}

export function getFlattenedProducts(): Product[] {
  return loadProducts();
}

export function getFeaturedCategory(): ProductCategory | undefined {
  return getCatalog().find((category) => category.id === FEATURED_CATEGORY_ID);
}

/** Last write time of the store, for the dashboard's "last updated" readout. */
export function getStoreUpdatedAt(): Date | null {
  if (!existsSync(STORE_PATH)) return null;
  try {
    return statSync(STORE_PATH).mtime;
  } catch {
    return null;
  }
}

export const availabilityOptions = ['in-stock', 'request-information', 'unconfirmed'] as const;
export type AvailabilityOption = (typeof availabilityOptions)[number];

export interface ProductInput {
  name: string;
  category: string;
  description: string;
  availability: AvailabilityOption;
  packaging?: string;
  unit?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const MAX_LENGTH = 80;

function isAvailability(value: unknown): value is AvailabilityOption {
  return availabilityOptions.some((option) => option === value);
}

function cleanString(value: unknown, max: number): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') throw new CatalogError(400, 'Expected a text value.');
  const cleaned = value.trim();
  if (cleaned.length > max) throw new CatalogError(400, `Text is too long (max ${max} characters).`);
  return cleaned || undefined;
}

function cleanImagePath(value: unknown): string | undefined {
  const cleaned = cleanString(value, 500);
  if (!cleaned) return undefined;
  const isLocal = cleaned.startsWith('/');
  const isRemote = /^https?:\/\//i.test(cleaned);
  if (!isLocal && !isRemote) {
    throw new CatalogError(400, 'Image must be a site path (e.g. /img/products/x.png) or an http(s) URL.');
  }
  if (cleaned.includes('..') || cleaned.includes('\\') || /[\s"']/.test(cleaned)) {
    throw new CatalogError(400, 'Image path contains invalid characters.');
  }
  if (isLocal) {
    const publicPath = join(process.cwd(), 'public', cleaned);
    if (!existsSync(publicPath)) {
      throw new CatalogError(400, `Image file not found under public/: ${cleaned}`);
    }
  }
  return cleaned;
}

function cleanDimension(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const number = Number(value);
  if (!Number.isFinite(number) || number < 1 || number > 10000) {
    throw new CatalogError(400, 'Dimensions must be numbers between 1 and 10000.');
  }
  return Math.round(number);
}

const CATEGORY_NAMES = categoryDefinitions.map((category) => category.name);

function cleanCategory(value: unknown): string {
  if (typeof value !== 'string' || !CATEGORY_NAMES.includes(value)) {
    throw new CatalogError(400, 'Unknown category.', [
      { field: 'category', message: `Pick one of: ${CATEGORY_NAMES.join(', ')}.` },
    ]);
  }
  return value;
}

/** Parses and validates admin-supplied product input (create + update share this). */
export function parseProductInput(raw: Record<string, unknown>): ProductInput {
  const name = cleanString(raw.name, 140);
  if (!name) {
    throw new CatalogError(400, 'A product name is required.', [
      { field: 'name', message: 'Required' },
    ]);
  }

  const description = cleanString(raw.description, 600);
  if (!description) {
    throw new CatalogError(400, 'A product description is required.', [
      { field: 'description', message: 'Required' },
    ]);
  }

  const availability = isAvailability(raw.availability)
    ? raw.availability
    : ('request-information' as const);

  return {
    name,
    category: cleanCategory(raw.category),
    description,
    availability,
    packaging: cleanString(raw.packaging, MAX_LENGTH),
    unit: cleanString(raw.unit, MAX_LENGTH),
    image: cleanImagePath(raw.image),
    imageAlt: cleanString(raw.imageAlt, 300),
    imageWidth: cleanDimension(raw.imageWidth),
    imageHeight: cleanDimension(raw.imageHeight),
  };
}

/** Slug from a product name (lowercased, hyphenated, ascii-only). */
export function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
  return slug || 'product';
}

function ensureUniqueId(products: Product[], candidate: string): string {
  const existing = new Set(products.map((product) => product.id));
  if (!existing.has(candidate)) return candidate;
  let suffix = 2;
  while (existing.has(`${candidate}-${suffix}`)) suffix += 1;
  return `${candidate}-${suffix}`;
}

export function createProduct(raw: Record<string, unknown>): Product {
  const input = parseProductInput(raw);
  const products = loadProducts();
  const id = ensureUniqueId(products, slugify(input.name));
  const product: Product = { ...input, id };
  writeStore([...products, product]);
  return product;
}

export function updateProduct(id: string, raw: Record<string, unknown>): Product {
  const input = parseProductInput(raw);
  const products = loadProducts();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) throw new CatalogError(404, 'Product not found.');
  const product: Product = { ...input, id };
  products[index] = product;
  writeStore(products);
  return product;
}

export function deleteProduct(id: string): void {
  const products = loadProducts();
  const next = products.filter((product) => product.id !== id);
  if (next.length === products.length) throw new CatalogError(404, 'Product not found.');
  writeStore(next);
}