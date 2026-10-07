# Bergsmyrene, ny nettside

Utkast. Astro 5-generasjon (Astro 7), statisk, tospråklig norsk/engelsk, innhold i JSON
med Sveltia CMS på `/admin/`. Erstatter Mystore-siden som presentasjonsside, mens selve
nettbutikken blir liggende på Mystore og lenkes til.

## Hva som er gjort

- Krysset dagens bergsmyrene.no (21 sider) og hentet ut all tekst og 63 bilder.
- Bygget nytt nettsted med 12 sider på norsk og 12 på engelsk.
- All brødtekst er transkribert **ordrett** fra dagens side. Ingen fakta er diktet opp.
- 301-redirect fra alle gamle Mystore-URL-er til de nye sidene (`astro.config.mjs`).
- Ingen forespørsler til Mystore, Klarna eller andre tredjeparter fra den nye siden.
- Fonter selvhostes av Astro ved bygg, ingen kall til Google Fonts.
- Samtykkeport for informasjonskapsler, Consent Mode, GA4 laster ikke før samtykke.

## Må avklares med Severin

Punktene under er motstridende eller mangler på dagens side. De er markert i koden med
`_note`, og noen vises som synlig merkelapp på siden.

1. **Bestillingsfristen.** «Slik fungerer det» sier **mandag 23:59**, «Åpningstider» sier
   **tirsdag 23:59**. Siden bruker mandag nå. `src/data/hentesteder.json` → `bestilling.frist`.
2. **Høstedager.** Samme sted: «vi høster varene på tirsdag og onsdag» mot «dette gjør vi på
   onsdag». Siden bruker tirsdag og onsdag.
3. **Nettbutikkens sesong.** Dagens side sier samtidig «åpner ikke igjen før juni», «stengt for
   juli, åpner i august» og «stengt for i år» (i sidetittelen). Beskjeden øverst er satt
   nøytralt til «åpner igjen til sommeren», og kan endres i CMS-et under Innstillinger.
4. **Nettbutikkens adresse.** Når Mystore-butikken flyttes av bergsmyrene.no, trenger den en
   egen adresse, for eksempel `butikk.bergsmyrene.no`. Alle «Nettbutikk»-knapper peker på
   `shopUrl` i `src/data/site.json`, så det er ett felt å endre.
5. **E-postadresse i salgsbetingelsene.** Punkt 2 oppgir `bergsmyrene@gmail.com`, mens
   bunnteksten oppgir `kontakt@bergsmyrene.no`. Teksten er beholdt ordrett. Hvilken gjelder?
6. **Telefonfeltet i salgsbetingelsene** inneholdt en e-postadresse der telefonnummeret skulle
   stått. Det er rettet til +47 400 73 434. Si fra hvis det er feil.
7. **Bekkelund gård og keramikk** mangler adresse og hentetid på dagens side. Hentestedet vises
   med veibeskrivelsen og en merkelapp «Avklares med gården».
8. **Drammen.** Teksten nevner hentepunkter i Drammen, men ingen Drammen-hentested er listet.
   Finnes det ett?
9. **Kolonialen** er «åpen i sommerhalvåret». Hvilke måneder konkret?
10. **Bakeriet** baker torsdag, fredag og lørdag, «varierer med årstid». Er det klokkeslett?
11. **Selvplukk i blomsterhagen**: sesong og åpningstid.
12. **Sesongtabellen** på `/sesongen` er veiledende og merket som utkast i grensesnittet.
    Severin bør gå gjennom den i CMS-et. Hjulet over tabellen bygger derimot bare på gårdens
    egne formuleringer (høysesong juli til september).
13. **Fotokreditering.** Navnene er lest ut av filnavnene: Scott Gilmour, Jule Mehrhoff,
    Troels Rosenkranz, Oelle og Inger Stalsberg. Flere bilder har vannmerket «Finn Dale
    Iversen». Stemmer krediteringen, og er bruken avklart?
14. **Logo.** Dagens logo finnes bare som PNG (`Header06.02.243.png`). Et vektorformat ville
    gitt en skarpere merkevare. Nå brukes en ren ordmerke-løsning i Fraunces.

## Tekniske ting som gjenstår

- [ ] Opprette GitHub-repo og koble til Vercel (`main` bygger, `dev` er arbeidsgren).
- [ ] Formspree-skjema for nyhetsbrev og kontaktskjema. Feltene `newsletterAction` og
      `contactFormAction` i `src/data/site.json` er tomme, og skjemaene faller da tilbake til
      `mailto:`.
- [ ] GA4-måle-ID som miljøvariabelen `PUBLIC_GA_ID` i Vercel. Uten den lastes ingen analyse.
- [ ] Sveltia CMS trenger en OAuth-mellomtjeneste. `base_url` i `public/admin/config.yml` peker
      på en Cloudflare Worker som må settes opp, eller byttes mot den som brukes for
      Romeriksmat.
- [ ] Peke bergsmyrene.no mot Vercel når innholdet er godkjent.
- [ ] Nyhetsbrevet: hvilken tjeneste brukes i dag? Mystore har sin egen påmelding.

## Innhold som ikke er tatt med

- Bloggen. Alle tre innlegg på dagens side er Lorem ipsum-fyll uten reelt innhold.
  `/blog/*` redirigerer til `/garden`.
- Produkt- og kategorisider. Butikken var tom da siden ble krysset, så det fantes ingen
  produktdata å hente. `/categories/*` redirigerer til `/sesongen`.

## Filer å kjenne til

| Fil | Hva den styrer |
|-----|----------------|
| `src/data/site.json` | Kontaktinfo, lenker, beskjeden øverst på siden |
| `src/data/apningstider.json` | Åpningstider for butikk, kolonial, bakeri, nettbutikk |
| `src/data/hentesteder.json` | Hentesteder og bestillingsfristen |
| `src/data/season.json` | Gårdsåret og sesongtabellen |
| `src/data/garden.json` | Folk, samarbeidsgårder, restauranter og butikker |
| `src/data/vilkar.json` | Salgsbetingelser og frakt og retur, ordrett |
| `scripts/prepare-images.mjs` | Henter og skalerer bilder fra `_source/` |
| `scripts/make-og.mjs` | Lager delingsbildet |

`_source/` er rådumpen fra den gamle siden og er utelatt fra Git.
