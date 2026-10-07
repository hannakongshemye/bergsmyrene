/**
 * Henter utvalgte bilder fra _source/images, skalerer dem ned til web-vennlig
 * størrelse og legger dem i src/assets/ med beskrivende filnavn.
 * Kjøres manuelt: node scripts/prepare-images.mjs
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("_source/images");
const OUT = path.resolve("src/assets");
const MAX = 2600;

/** nytt navn -> kildefil */
const picks = {
  "hero-dalen": "Foto_Troels_Rosenkranz__13_.jpg",
  "teamet": "Foto_portrett_Scott_Gilmour__3_.jpg",
  "gulrot-kasser": "Foto_Scott_Gilmour__78_.jpg",
  "bonnehosting": "Foto_Scott_Gilmour__107_.jpg",
  "kveld-i-akeren": "Foto_Scott_Gilmour__44_.jpg",
  "traktor-vei": "Foto_Scott_Gilmour__25_.jpg",
  "kjerre-lave": "Foto_Scott_Gilmour__23_.jpg",
  "jord-i-handa": "Foto_Scott_Gilmour__39_.jpg",
  "purre": "Foto_Scott_Gilmour__20_.jpg",
  "ku": "Foto_Scott_Gilmour__91_.jpg",
  "kasser": "Foto_Scott_Gilmour__31_.jpg",
  "vinke": "Foto_Scott_Gilmour__19_.jpg",
  "purrefelt": "Foto_Scott_Gilmour__7_.jpg",
  "gulrot-opptak": "Foto_Scott_Gilmour__75_.jpg",
  "drivhus-kompost": "FD7_3701.jpeg",
  "drivhus-salat": "FD7_7421.jpeg",
  "aker-duk": "Foto_Jule_Mehrhoff__90_.jpg",
  "traktor-stov": "Foto_Jule_Mehrhoff__112_.jpg",
  "traktor-folk": "Foto_Jule_Mehrhoff__116_.jpg",
  "hest": "Foto_Jule_Mehrhoff__117_.jpg",
  "sprang": "Foto_Jule_Mehrhoff__29_.jpg",
  "portrett-skjerf": "Foto_Jule_Mehrhoff__37_.jpg",
  "ror-ved-lave": "Foto_Jule_Mehrhoff__55_.jpg",
  "spade": "Foto_Jule_Mehrhoff__76_.jpg",
  "hest-og-rytter": "Foto_Jule_Mehrhoff__77_.jpg",
  "hakke": "Foto_Jule_Mehrhoff__129_.jpg",
  "solsikke": "Fairphone_24_082.jpg",
  "drone-tunet": "Drone_foto_Oelle.jpeg",
  "hone": "IMG_4432.jpg",
  "hesje": "455024961_1872158246594099_8595291357555704802_n.jpg",
  "hentested-1": "IMG-20241216-WA0001.jpg",
  "hentested-2": "IMG-20241216-WA0004.jpg",
  "hentested-3": "IMG-20241216-WA0010.jpg",
};

fs.mkdirSync(OUT, { recursive: true });

let ok = 0;
for (const [name, file] of Object.entries(picks)) {
  const from = path.join(SRC, file);
  if (!fs.existsSync(from)) {
    console.error(`mangler: ${file}`);
    continue;
  }
  try {
    const img = sharp(from).rotate();
    const meta = await img.metadata();
    const long = Math.max(meta.width ?? 0, meta.height ?? 0);
    const pipeline = long > MAX ? img.resize({ width: meta.width > meta.height ? MAX : undefined, height: meta.height >= meta.width ? MAX : undefined }) : img;
    await pipeline.jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, `${name}.jpg`));
    ok++;
  } catch (e) {
    console.error(`feilet: ${file} (${e.message})`);
  }
}
console.log(`${ok} bilder klargjort i src/assets/`);
