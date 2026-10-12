import type { APIRoute } from 'astro';
import { clearAdminCookie, jsonResponse } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  clearAdminCookie(cookies);
  return jsonResponse(200, { ok: true });
};