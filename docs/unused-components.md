# Nepoužívané komponenty (#9)

Metoda: `npx knip` (po `npm install`, výsledek se při druhém spuštění nezměnil)
a ruční kontrola pomocí `git grep -n -i "<název>" -- src`.

| Soubor | Důkaz | Závěr |
|---|---|---|
| src/components/campaignDetail.jsx | název jen ve vlastním souboru | nepoužívaný |
| src/components/columnGraph.jsx | název jen ve vlastním souboru | nepoužívaný |
| src/components/combo.jsx | název jen ve vlastním souboru | nepoužívaný |
| src/components/CopyFirmNamesButton.jsx | importy jen zakomentované (statsByYears) | nepoužívaný |
| src/components/filter - kopie.jsx | nikdo neimportuje (knip) | nepoužívaný |
| src/components/google/gauth.jsx | nikdo neimportuje (knip) | nepoužívaný |
| src/components/google/googleAuthProvider.jsx | import v App.jsx zakomentován | nepoužívaný |
| src/components/RingChart.jsx | import v chartComponent.jsx zakomentován | nepoužívaný |
| src/components/searchContact.jsx | import ve firmList.jsx zakomentován | nepoužívaný |
| src/components/statsByYears - kopie.jsx | nikdo neimportuje (knip) | nepoužívaný |

## Poznámky
- Dynamické importy (`React.lazy`, `import()`) v `src` nejsou, ověřeno `git grep`.
- `ContactListErrorBoundary` v `contactList.jsx` je nepoužitý export
  (soubor samotný se používá).
- Podle knip jsou nepoužívané i závislosti `@react-oauth/google`, `gapi-script`,
  `@rjsf/core`, `@rjsf/validator-ajv8`, `clsx`, `micromatch`, `react-responsive`
  a testing-library balíčky. Návrh k posouzení, nemazat bez dohody.
- `autoprefixer` v `postcss.config.js` je neresolvovaný import (samostatný problém).
- Na řádku 3 souboru `googleAuthProvider.jsx` je import ze `'./googleAuthProvider'`
  (k ověření, zda nejde o překlep).