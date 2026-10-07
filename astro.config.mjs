// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * Gamle Mystore-URL-er -> nye sider. Alt som hadde reelt innhold skal 301-es,
 * slik at innkommende lenker og søketreff ikke dør.
 */
const legacyRedirects = {
  "/pages/om-oss": "/garden",
  "/pages/slik-fungerer-det": "/bestill",
  "/pages/pningstider": "/apningstider",
  "/pages/galleri": "/galleri",
  "/pages/business-customer": "/proff",
  "/pages/shipping": "/frakt-og-retur",
  "/pages/payment": "/frakt-og-retur",
  "/pages/conditions": "/salgsbetingelser",
  "/pages/privacy": "/personvern",
  "/manufacturers/alm-ostre": "/garden#samarbeid",
  "/manufacturers/rosnes-gard": "/garden#samarbeid",
  "/manufacturers/sore-hosar": "/garden#samarbeid",
  "/categories/mel": "/sesongen",
  "/categories/rotgronnsaker": "/sesongen",
  "/categories/bladgronnsaker": "/sesongen",
  "/categories/drivhusvekster": "/sesongen",
  "/categories/urter": "/sesongen",
  "/categories/andre-gronnsaker": "/sesongen",
  "/blog/hvor-kommer-det-fra": "/garden",
  "/blog/hvorfor-bruker-vi-det": "/garden",
  "/blog/lorem-ipsum": "/garden",
};

export default defineConfig({
  site: "https://www.bergsmyrene.no",
  output: "static",
  trailingSlash: "ignore",
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  i18n: {
    defaultLocale: "no",
    locales: ["no", "en"],
    routing: { prefixDefaultLocale: false },
  },
  redirects: legacyRedirects,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "no",
        locales: { no: "nb-NO", en: "en" },
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--font-display",
      weights: ["300 700"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      display: "swap",
      fallbacks: ["Iowan Old Style", "Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Public Sans",
      cssVariable: "--font-sans",
      weights: ["300 700"],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      display: "swap",
      fallbacks: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
    },
  ],
});
