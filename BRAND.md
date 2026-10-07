# Bergsmyrene, designgrunnlag

Alt er bygget av fire konstanter og `color-mix`. Legg ikke inn løse hex-verdier.

## Farger

| Rolle | Verdi | Hvorfor |
|-------|-------|---------|
| `--ink` | `#161a12` | Nær-svart med olivenstikk. Jord i skygge, ikke rent svart. |
| `--paper` | `#f0f1e9` | Kalkhvit med grønnstikk. Undersiden av et blad, ikke krem. |
| `--ember` | `#a8402a` | Falrød låvemaling. Eneste aksentfarge, brukes sparsomt. |
| `--leaf` | `#456b3c` | Klorofyll. Bare til sesongdiagrammet. |

Alt annet, flater, hårlinjer, dempet tekst og sesongskalaen, avledes med
`color-mix(in oklab, ...)` i `src/styles/tokens.css`.

Aksenten brukes til: hovedknapp ved hover, nåla og høstfasen i sesongshjulet, utkast-merkelapper,
fokusring. Ikke til dekor.

## Typografi

- **Fraunces** som display, vekt ~420, `SOFT 20`, `WONK 0 til 1`. En vrien gammeldags antikva
  med almanakk-følelse, ikke Playfair. Brukes i overskrifter, navn i lister og ordmerket.
- **Public Sans** som brødtekst og «møbler». Rolig humanistisk grotesk, ikke Inter.
- Etiketter er Public Sans, VERSALER, `letter-spacing: 0.14em`.
- To familier, ikke flere. Begge selvhostes av Astro ved bygg.

## Form

- Rektangulært og redaksjonelt. Radier 3 til 12 px, **ingen piller**.
- Hårfine linjer uttrykker rutenettet. Ingen slagskygger, ingen fargede venstrekanter.
- Ett glass-element: navigasjonen. Ellers solide, tonede flater.
- Papirkorn ligger som et fast lag over hele siden på 3,5 % opasitet.

## Bevegelse

- Ett signaturøyeblikk: **sesongshjulet** som tegner seg og nåla som svinger til dagens måned.
- Ellers bare én grunnbevegelse: innhold som toner opp ved scroll, 0,52 s, `ease-out`.
- Bilder zoomer 4 til 5 % ved hover. Det er alt.
- Alt respekterer `prefers-reduced-motion`.

## Bilder

Dokumentarisk, aldri oppstilt. Hender, jord, ekte lys, folk i arbeid. Fotografene er Scott
Gilmour, Jule Mehrhoff, Troels Rosenkranz og Oelle. Nye bilder bør ligge i samme spor.

## Språk

- Norsk er hovedspråket, engelsk ligger under `/en/`.
- **Ingen tankestrek.** Bruk komma eller punktum.
- Gårdens egne formuleringer har forrang. Teksten på siden er transkribert ordrett fra
  bergsmyrene.no, inkludert tonefallet.
