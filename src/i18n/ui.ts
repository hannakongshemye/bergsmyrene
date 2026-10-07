/**
 * Base-sti. Tom i produksjon, "/bergsmyrene" n\u00e5r siden bygges for GitHub Pages.
 * Astro setter selv basen p\u00e5 bygde ressurser, men ikke p\u00e5 lenker vi skriver selv.
 */
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

/** Fjerner base-stien fra en URL-sti, slik at resten av koden slipper \u00e5 vite om den. */
export function withoutBase(pathname: string): string {
  if (!BASE) return pathname;
  if (pathname === BASE) return "/";
  return pathname.startsWith(BASE + "/") ? pathname.slice(BASE.length) : pathname;
}

/** Sti til en fil i public/, med base-stien foran. */
export function asset(path: string): string {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export const languages = { no: "Norsk", en: "English" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "no";

/** Henter språk ut av URL-en. Alt under /en/ er engelsk, resten norsk. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = withoutBase(url.pathname).split("/");
  return first === "en" ? "en" : "no";
}

/** Gjør en norsk sti om til riktig sti for valgt språk. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const localized = lang === "no" ? clean : clean === "/" ? "/en" : `/en${clean}`;
  return BASE ? `${BASE}${localized}` : localized;
}

/** Fjerner /en-prefikset, slik at språkveksleren finner søsterside. */
export function stripLocale(pathname: string): string {
  const p = withoutBase(pathname);
  if (p === "/en" || p === "/en/") return "/";
  return p.startsWith("/en/") ? p.slice(3) : p;
}

/** Bygger en href-hjelper bundet til ett språk: const L = href(lang) */
export function href(lang: Lang) {
  return (path: string) => localizePath(path, lang);
}

export const ui = {
  no: {
    "nav.garden": "Gården",
    "nav.season": "Sesongen",
    "nav.visit": "Besøk oss",
    "nav.order": "Bestill",
    "nav.pro": "Proff",
    "nav.gallery": "Galleri",
    "nav.contact": "Kontakt",
    "nav.shop": "Nettbutikk",
    "nav.menu": "Meny",
    "nav.close": "Lukk",
    "nav.open": "Åpne meny",
    "nav.main": "Hovedmeny",
    "skip": "Hopp til innhold",
    "lang.label": "Språk",
    "lang.switch": "In English",
    "footer.address": "Adresse",
    "footer.contact": "Kontakt",
    "footer.explore": "Utforsk",
    "footer.legal": "Vilkår",
    "footer.follow": "Følg oss",
    "footer.newsletter": "Nyhetsbrev",
    "footer.newsletterText":
      "Vil du vite når ting kommer i sesong? Meld deg på nyhetsbrevet.",
    "footer.newsletterCta": "Meld deg på",
    "footer.orgnr": "Org.nr.",
    "footer.cookies": "Informasjonskapsler",
    "footer.rights": "Alle rettigheter forbeholdt.",
    "footer.built": "Siden drives på fornybar strøm.",
    "privacy.title": "Personvern",
    "terms.title": "Salgsbetingelser",
    "shipping.title": "Frakt og retur",
    "readmore": "Les mer",
    "openInNew": "Åpnes i ny fane",
  },
  en: {
    "nav.garden": "The farm",
    "nav.season": "In season",
    "nav.visit": "Visit us",
    "nav.order": "Order",
    "nav.pro": "Trade",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.shop": "Farm shop online",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "nav.open": "Open menu",
    "nav.main": "Main menu",
    "skip": "Skip to content",
    "lang.label": "Language",
    "lang.switch": "På norsk",
    "footer.address": "Address",
    "footer.contact": "Contact",
    "footer.explore": "Explore",
    "footer.legal": "Terms",
    "footer.follow": "Follow us",
    "footer.newsletter": "Newsletter",
    "footer.newsletterText":
      "Want to know when things come into season? Sign up for the newsletter.",
    "footer.newsletterCta": "Sign up",
    "footer.orgnr": "Org. no.",
    "footer.cookies": "Cookie settings",
    "footer.rights": "All rights reserved.",
    "footer.built": "This site runs on renewable power.",
    "privacy.title": "Privacy",
    "terms.title": "Terms of sale",
    "shipping.title": "Delivery and returns",
    "readmore": "Read more",
    "openInNew": "Opens in a new tab",
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)["no"]): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui.no[key];
  };
}
