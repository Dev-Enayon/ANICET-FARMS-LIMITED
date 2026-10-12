import type { APIRoute } from 'astro';
import { isAuthenticated, jsonResponse } from '../../lib/auth';
import { CatalogError, getCatalog, createProduct } from '../../lib/catalog';

export const prerender = false;

/** List the catalogue for the admin dashboard (auth required). */
export const GET: APIRoute = async ({ cookies }) => {
  if (!isAuthenticated({ cookies })) {
    return jsonResponse(401, { ok: false, message: 'Sign in required.' });
  }
  try {
    return jsonResponse(200, { ok: true, catalog: getCatalog() });
  } catch (error) {
    if (error instanceof CatalogError) return jsonResponse(error.status, { ok: false, message: error.message });
    throw error;
  }
};

/** Create a product (auth required). */
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated({ cookies })) {
    return jsonResponse(401, { ok: false, message: 'Sign in required.' });
  }
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse(400, { ok: false, message: 'Invalid JSON body.' });
  }
  try {
    const product = createProduct(body);
    return jsonResponse(201, { ok: true, product });
  } catch (error) {
    if (error instanceof CatalogError) {
      return jsonResponse(error.status, { ok: false, message: error.message, details: error.details ?? null });
    }
    throw error;
  }
};