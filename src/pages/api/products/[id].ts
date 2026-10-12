import type { APIRoute } from 'astro';
import { isAuthenticated, jsonResponse } from '../../../lib/auth';
import { CatalogError, updateProduct, deleteProduct } from '../../../lib/catalog';

export const prerender = false;

export const PUT: APIRoute = async ({ request, cookies, params }) => {
  if (!isAuthenticated({ cookies })) {
    return jsonResponse(401, { ok: false, message: 'Sign in required.' });
  }
  const id = params.id;
  if (!id) return jsonResponse(400, { ok: false, message: 'Missing product id.' });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse(400, { ok: false, message: 'Invalid JSON body.' });
  }

  try {
    const product = updateProduct(id, body);
    return jsonResponse(200, { ok: true, product });
  } catch (error) {
    if (error instanceof CatalogError) {
      return jsonResponse(error.status, { ok: false, message: error.message, details: error.details ?? null });
    }
    throw error;
  }
};

export const DELETE: APIRoute = async ({ cookies, params }) => {
  if (!isAuthenticated({ cookies })) {
    return jsonResponse(401, { ok: false, message: 'Sign in required.' });
  }
  const id = params.id;
  if (!id) return jsonResponse(400, { ok: false, message: 'Missing product id.' });

  try {
    deleteProduct(id);
    return jsonResponse(200, { ok: true, id });
  } catch (error) {
    if (error instanceof CatalogError) {
      return jsonResponse(error.status, { ok: false, message: error.message });
    }
    throw error;
  }
};