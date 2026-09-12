// Post-build sanity check: walks the `dist` output and verifies every
// internal link / asset reference resolves to a real file.
import { readdirSync, statSync, existsSync, readFileSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';

const dist = resolve('dist');

// astro.config.mjs is ESM (imports 'astro/config'), so dynamic import resolves
// the config through full Node resolution instead of a fragile JSON.parse.
const { default: config } = await import('../astro.config.mjs');
const base = String(config.site ?? '').replace(/\/$/, '');

const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
}
walk(dist);

const htmlFiles = files.filter((f) => f.endsWith('.html'));
const problems = [];
const seen = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const refs = [
    ...html.matchAll(/(?:href|src)="([^"]+)"/g),
    ...html.matchAll(/srcset="([^"]+)"/g),
  ];
  for (const m of refs) {
    let value = m[1];
    if (m[0].startsWith('srcset')) {
      for (const part of value.split(',')) {
        const candidate = part.trim().split(/\s+/)[0];
        check(candidate, file);
      }
      continue;
    }
    check(value, file);
  }
}

function check(raw, file) {
  if (!raw || raw.startsWith('#') || raw.startsWith('data:') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
  if (/^https?:\/\//.test(raw)) {
    if (!raw.startsWith(base)) return; // external — skip
    raw = raw.slice(base.length);
  }
  const clean = raw.split(/[?#]/)[0];
  if (!clean) return;

  // The 404 page's canonical is /404/ but the emitted file is 404.html.
  if (clean === '/404/' || clean === '/404') {
    if (existsSync(resolve(dist, '404.html'))) return;
    const key = `${file} -> ${clean}`;
    if (!seen.has(key)) {
      seen.set(key, true);
      problems.push(key);
    }
    return;
  }

  let target = resolve(dist, `.${clean}`);
  if (!extname(target)) target = join(target, 'index.html');
  if (!existsSync(target)) {
    const key = `${file} -> ${clean}`;
    if (!seen.has(key)) {
      seen.set(key, true);
      problems.push(key);
    }
  }
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} broken reference(s):`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log(`✓ ${htmlFiles.length} HTML files checked — all internal references resolve.`);