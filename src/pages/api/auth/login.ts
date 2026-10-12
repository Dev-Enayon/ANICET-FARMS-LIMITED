import type { APIRoute } from 'astro';
import { setAdminCookie, verifyPassword, jsonResponse } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  let body: { password?: unknown };
  try {
    body = (await request.json()) as { password?: unknown };
  } catch {
    return jsonResponse(400, { ok: false, message: 'Invalid JSON body.' });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  if (!password || !verifyPassword(password)) {
    return jsonResponse(401, { ok: false, message: 'Incorrect password.' });
  }

  setAdminCookie(cookies);
  return jsonResponse(200, { ok: true });
};