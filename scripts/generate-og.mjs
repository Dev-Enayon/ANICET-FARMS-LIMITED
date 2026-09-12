// Generates the default social-share (Open Graph) image as a real PNG
// (1200x630) with only Node built-ins — no image dependencies.
//
// The artwork combines the ANICET FARMS field-parcels motif (parchment canvas,
// dark sable bar with a fired-clay accent band) with the official brand logo
// (public/img/logo.png, a transparent cutout of public/img/logo.jpg).
//
// Requires ImageMagick's `convert` on PATH to composite the logo onto the
// generated card.
import { execFileSync } from 'node:child_process';
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;

// ------------- PNG encoding helpers (RGB, 8-bit) -------------
const CRC_TABLE = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  CRC_TABLE[n] = c;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

// ------------- Canvas -------------
const RGB = Buffer.alloc(W * H * 3);
function set(x, y, r, g, b) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 3;
  RGB[i] = r;
  RGB[i + 1] = g;
  RGB[i + 2] = b;
}
function rect(x0, y0, x1, y1, color) {
  for (let y = Math.ceil(y0); y < Math.ceil(y1); y++)
    for (let x = Math.ceil(x0); x < Math.ceil(x1); x++) set(x, y, ...color);
}

const parchment = [0xf4, 0xf0, 0xe6];
const sable = [0x24, 0x21, 0x1b];
const clay = [0xc0, 0x55, 0x2c];

// Base parchment field.
rect(0, 0, W, H, parchment);

// Bottom sable bar.
rect(0, 512, W, H, sable);

// Fired-clay accent band along the top of the sable bar.
rect(0, 500, W, 512, clay);

// Thin parchment contour lines in the bottom bar.
for (const y of [536, 556, 576, 596, 614]) {
  for (let x = 60; x < W - 60; x += 4) rect(x, y, x + 2, y + 1, parchment);
}

// ---------------------- Encode PNG ----------------------
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type: truecolour RGB
ihdr[10] = 0; // compression
ihdr[11] = 0; // filter
ihdr[12] = 0; // interlace

const raw = Buffer.alloc(H * (1 + W * 3));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 3)] = 0; // filter: none
  RGB.copy(raw, y * (1 + W * 3) + 1, y * W * 3, (y + 1) * W * 3);
}

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw)),
  chunk('IEND', Buffer.alloc(0)),
]);

// ------------- Composite the official logo over the card -------------
const card = resolve(dirname(fileURLToPath(import.meta.url)), '..', '.og-card.png');
const out = resolve(dirname(fileURLToPath(import.meta.url)), '../public/og-default.png');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(card, png);

const logo = resolve(dirname(fileURLToPath(import.meta.url)), '../public/img/logo.png');
// Emblem is centred in the parchment area above the sable bar (y < 500).
// Only the logo is resized (parenthesised subimage); the card stays 1200x630.
execFileSync('convert', [
  card,
  '(',
  logo,
  '-resize',
  '360x',
  ')',
  '-gravity',
  'north',
  '-geometry',
  '+0+100',
  '-composite',
  out,
]);
console.log(`Wrote ${out} (composited via ImageMagick convert)`);