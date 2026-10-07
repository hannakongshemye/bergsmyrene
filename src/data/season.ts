import raw from "./season.json";
import type { Lang } from "@i18n/ui";

export type Phase = {
  key: string;
  months: number[];
  title: string;
  lead: string;
  intensity: number;
};

export type Crop = {
  name: string;
  group: "blad" | "urter" | "drivhus" | "rot" | "annet" | string;
  months: number[];
};

/** Engelske overlegg. Nøkkelen er den norske teksten, slik at JSON-en forblir
 *  kilden og oversettelsen bare er et lag over. */
const enPhases: Record<string, { title: string; lead: string }> = {
  hvile: {
    title: "Store and rest",
    lead: "The soil rests under the snow. We live off the store, look after the animals, build compost and plan the coming season.",
  },
  oppal: {
    title: "Sowing and planting",
    lead: "The seedlings stand close together in the greenhouse. Compost goes out, beds are made ready, and everything that will grow goes into the ground.",
  },
  hoysesong: {
    title: "High season",
    lead: "Now we have nearly everything you could wish for in vegetables, plus a few you did not know you wanted.",
  },
  lagring: {
    title: "Harvest and storage",
    lead: "Roots come up and go into store. The compost windrows are built. The last of the field comes in before the frost takes hold.",
  },
};

const enCrops: Record<string, string> = {
  "Salat og bladgrønt": "Lettuce and leafy greens",
  "Spinat og mangold": "Spinach and chard",
  "Grønnkål": "Kale",
  Urter: "Herbs",
  Tomat: "Tomatoes",
  Agurk: "Cucumber",
  "Chili og paprika": "Chilli and peppers",
  Gulrot: "Carrots",
  "Rødbet": "Beetroot",
  "Knutekål og reddik": "Kohlrabi and radish",
  Potet: "Potatoes",
  "Løk og hvitløk": "Onion and garlic",
  "Squash og gresskar": "Courgette and squash",
  "Bær": "Berries",
  "Ville vekster": "Wild greens",
  "Mel fra Alm Østre": "Flour from Alm Østre",
};

export const monthNames: Record<Lang, string[]> = {
  no: [
    "januar", "februar", "mars", "april", "mai", "juni",
    "juli", "august", "september", "oktober", "november", "desember",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

export const monthShort: Record<Lang, string[]> = {
  no: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export const groupLabels: Record<Lang, Record<string, string>> = {
  no: { blad: "Bladgrønnsaker", urter: "Urter", drivhus: "Drivhusvekster", rot: "Rotgrønnsaker", annet: "Annet" },
  en: { blad: "Leafy greens", urter: "Herbs", drivhus: "Greenhouse", rot: "Roots", annet: "Other" },
};

export function getPhases(lang: Lang): Phase[] {
  return (raw.phases as Phase[]).map((p) =>
    lang === "en" && enPhases[p.key]
      ? { ...p, title: enPhases[p.key]!.title, lead: enPhases[p.key]!.lead }
      : p,
  );
}

export function getCrops(lang: Lang): Crop[] {
  return (raw.crops as Crop[]).map((c) =>
    lang === "en" && enCrops[c.name] ? { ...c, name: enCrops[c.name]! } : c,
  );
}

/** Finner fasen en gitt måned (1-12) hører til. */
export function phaseForMonth(month: number, lang: Lang): Phase {
  const phases = getPhases(lang);
  return phases.find((p) => p.months.includes(month)) ?? phases[0]!;
}

export const highSeason = raw.highSeason;
export const cropsAreIndicative = raw.cropsAreIndicative;
