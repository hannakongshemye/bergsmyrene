import raw from "./site.json";

export type SiteInfo = typeof raw;
export const site: SiteInfo = raw;

/** Pen postadresse på én linje. */
export const addressLine = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

/** Google Maps-søk på adressen. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name} ${addressLine}`,
)}`;
