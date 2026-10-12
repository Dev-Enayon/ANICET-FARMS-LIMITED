// ---------------------------------------------------------------------------
// Admin authentication — single shared password, HMAC-signed session cookie.
//
// Runtime reads of process.env are used (not import.meta.env) so the admin
// password/secret can be set on the server without baking them into the build.
// In production you MUST set ADMIN_PASSWORD and ADMIN_AUTH_SECRET. The fallback
// values below are dev-only conveniences so `astro dev` works out of the box.
// ---------------------------------------------------------------------------

import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';

export const AUTH_COOKIE = 'anise_admin';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const DEV_PASSWORD = 'anicet-admin';
const DEV_SECRET = 'anicet-dev-session-secret-change-me';

function loadPassword(): string {
  return process.env.ADMIN_PASSWORD || DEV_PASSWORD;
}

function loadSecret(): string {
  return process.env.ADMIN_AUTH_SECRET || DEV_SECRET;
}

/** True when the fallback dev credentials are in use (for an admin hint). */
export function isUsingDevCredentials(): boolean {
  return !process.env.ADMIN_PASSWORD || !process.env.ADMIN_AUTH_SECRET;
}

function sign(payload: string): string {
  return createHmac('sha256', loadSecret()).update(payload).digest('base64url');
}

export function createSessionToken(): string {
  // Keep the signed payload slim — a single expiry + version, no user data.
  const payload = Buffer.from(
    JSON.stringify({ v: 1, exp: Date.now() + SESSION_TTL_MS }),
  ).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const received = Buffer.from(signature);
  if (received.length !== expected.length) return false;
  if (!timingSafeEqual(received, Buffer.from(expected))) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      exp?: number;
      v?: number;
    };
    return data.v === 1 && typeof data.exp === 'number' && data.exp > Date.now();
  } catch {
    return false;
  }
}

function secureEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Constant-time password check against the configured admin password. */
export function verifyPassword(password: string): boolean {
  return secureEqual(password, loadPassword());
}

function cookieValue(cookies: AstroCookies): string | undefined {
  return cookies.get(AUTH_COOKIE)?.value;
}

/** TRUE when the request carries a valid admin session. */
export function isAuthenticated(context: { cookies: AstroCookies }): boolean {
  return verifySessionToken(cookieValue(context.cookies));
}

export function setAdminCookie(cookies: AstroCookies): void {
  cookies.set(AUTH_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
    secure: process.env.COOKIE_SECURE === 'true' || loadSecret() !== DEV_SECRET,
  });
}

export function clearAdminCookie(cookies: AstroCookies): void {
  cookies.delete(AUTH_COOKIE, { path: '/' });
}

export function readAdminCookie(request: Request): string | undefined {
  const header = request.headers.get('cookie');
  if (!header) return undefined;
  const match = header
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${AUTH_COOKIE}=`));
  return match ? match.slice(AUTH_COOKIE.length + 1) : undefined;
}

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };

export function jsonResponse(
  status: number,
  body: Record<string, unknown> | unknown[],
): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}