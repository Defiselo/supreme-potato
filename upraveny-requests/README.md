# Rozdělený requests.php (úkol 5)

Původní `requests.php` (528 řádků v jednom řetězu if/else) je rozdělený:

- `requests.php` – vstupní bod, sestaví objekty a předá požadavek routeru
- `api/Router.php` – vybírá trasu (vyhrává první shoda, stejně jako dřív else if)
- `api/Responder.php` – výstup JSON, CSV export, stažení přílohy
- `api/routes/*.php` – trasy podle oblastí (uživatel, kampaně, události, kontakty, firmy, statistiky, ostatní)

URL ani formát odpovědí se nemění, frontend není potřeba nějak upravit.

## Nasazení

Zkopírujte `requests.php` a složku `api/` do složky `v3/`.
