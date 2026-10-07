/**
 * Lager delingsbildet (Open Graph) fra heltebildet.
 * node scripts/make-og.mjs
 */
import sharp from "sharp";
import fs from "node:fs";

const W = 1200, H = 630;
fs.mkdirSync("public/og", { recursive: true });

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#161a12" stop-opacity="0.30"/>
      <stop offset="52%" stop-color="#161a12" stop-opacity="0.52"/>
      <stop offset="100%" stop-color="#161a12" stop-opacity="0.88"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="72" y="470" font-family="Georgia, 'Iowan Old Style', serif" font-size="92"
        fill="#f0f1e9" letter-spacing="-2">Bergsmyrene</text>
  <text x="76" y="528" font-family="Helvetica, Arial, sans-serif" font-size="25"
        fill="#f0f1e9" fill-opacity="0.82" letter-spacing="5">BIODYNAMISK GÅRD I HURUM</text>
  <rect x="76" y="558" width="86" height="4" fill="#a8402a"/>
</svg>`);

await sharp("src/assets/hero-dalen.jpg")
  .resize(W, H, { fit: "cover", position: "centre" })
  .composite([{ input: overlay }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("public/og/bergsmyrene-og.jpg");

// Apple touch icon
const icon = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#161a12"/>
  <circle cx="32" cy="32" r="18" fill="none" stroke="#f0f1e9" stroke-width="7" opacity="0.38"/>
  <path d="M32 14 A18 18 0 0 1 47.6 23 L41.4 26.5 A11 11 0 0 0 32 21 Z" fill="#a8402a"/>
</svg>`);
fs.mkdirSync("public/brand", { recursive: true });
await sharp(icon).png().toFile("public/brand/apple-touch-icon.png");

console.log("og-bilde og ikon laget");
