Groepwerk

# World Explorer Dashboard – Startercode
Starterproject voor het groepswerk **World Explorer Dashboard**.

## Stack
- Vite (root: `src`)
- Vanilla JavaScript (ES modules)
- Bootstrap 5
- Leaflet.js + OpenStreetMap
- SCSS

## Scripts
```bash
npm install
npm run dev # development
npm run build # productiebuild
npm run preview # build lokaal bekijken
De entrypoint is src/index.html met:
<script type="module" src="./js/main.js"></script>

Alle logica zit in src/js.

Structuur
src/
 index.html
 scss/
 styles.scss
 js/
 main.js
 components/
 services/
 utils/
 data/

Volg de TODO’s in de JS-bestanden. Pas de mappenstructuur niet aan. 
Documenteer AI-gebruik in AI_USAGE.md. Gebruik feature branches en pull requests.