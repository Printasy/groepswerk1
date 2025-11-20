import { clearElement, createElement } from "../utils/dom.js";

/**
 * Render de lijst van landen in #country_list.
 *
 * @param {Object} config
 * @param {Array} config.countries
 * @param {Array} config.favorites
 * @param {Function} config.onCountryClick (country) => void
 * @param {Function} config.onFavoriteToggle (country) => void
 */
export function renderCountryList({ countries, favorites, onCountryClick, onFavoriteToggle }) {
    const container = document.querySelector("#country_list");
    if (!container) return;

    clearElement(container);
    //S
    // Geen landen gevonden
    if (!countries || countries.length === 0) {
        const empty = createElement(
            "div",
            "col-12 alert alert-light border text-center mb-0",
            "Geen landen gevonden voor deze filter."
        );
        container.appendChild(empty);
        return;
    }

    // Render alle landen
    countries.forEach((country) => {
        const isFavorite = favorites.some(f => f.cca3 === country.cca3);

        const col = createElement("div", "col");
        const card = createElement("div", "card h-100 shadow-sm border-0");
        const body = createElement("div", "card-body d-flex flex-column");

        // --- vlag (flag) ---
        const flag = createElement("img", "img-fluid rounded mb-3");
        flag.src = country.flags?.png || "";
        flag.alt = `${country.name.common} flag`;

        // --- naam ---
        const title = createElement("h5", "card-title fw-bold", country.name.common);

        // --- regio ---
        const region = createElement("p", "text-muted mb-1", `Regio: ${country.region}`);

        // --- populatie ---
        const population = createElement(
            "p",
            "text-muted",
            `Bevolking: ${country.population.toLocaleString()}`
        );

        // --- Details-knop ---
        const detailsBtn = createElement(
            "button",
            "btn btn-primary btn-sm mt-auto",
            "Details"
        );
        detailsBtn.onclick = () => onCountryClick(country);

        // --- Favoriet-knop ---
        const favBtn = createElement(
            "button",
            "btn btn-outline-danger btn-sm mt-2"
        );
        favBtn.innerHTML = isFavorite ? "❤️ Favoriet" : "🤍 Voeg toe aan favorieten";

        favBtn.onclick = () => onFavoriteToggle(country);

        // toevoegen aan body
        body.appendChild(flag);
        body.appendChild(title);
        body.appendChild(region);
        body.appendChild(population);
        body.appendChild(detailsBtn);
        body.appendChild(favBtn);

        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}
