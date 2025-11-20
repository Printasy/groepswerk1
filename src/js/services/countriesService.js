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


export async function fetchAllCountries() {
    try {
        const url = "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,latlng,languages,currencies,cca3";
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Fout bij het ophalen van landen.");
        }

        const countries = await response.json();
        return countries;
    } catch (error) {
        console.error("Fetch fout:", error);
        return [];
    }
}


export function renderCountryList({ countries, favorites, onCountryClick, onFavoriteToggle }) {
    const container = document.querySelector("#country_list");
    if (!container) return;

    clearElement(container);

    if (!countries || countries.length === 0) {
        const empty = createElement(
            "div",
            "col-12 alert alert-light border text-center mb-0",
            "Geen landen gevonden voor deze filter."
        );
        container.appendChild(empty);
        return;
    }

    countries.forEach((country) => {
        const isFavorite = favorites.some((fav) => fav.cca3 === country.cca3);

        const col = createElement("div", "col");
        const card = createElement("div", "card h-100 shadow-sm border-0");
        const body = createElement("div", "card-body d-flex flex-column");

        // --- العلم ---
        const flag = createElement("img", "img-fluid rounded mb-3");
        flag.src = country.flags?.png || "";
        flag.alt = `${country.name.common} flag`;

        // --- الاسم ---
        const title = createElement("h5", "card-title fw-bold", country.name.common);

        // --- المنطقة ---
        const region = createElement("p", "text-muted mb-1", `Regio: ${country.region}`);

        // --- السكان ---
        const population = createElement(
            "p",
            "text-muted",
            `Bevolking: ${country.population.toLocaleString()}`
        );

        // --- زر التفاصيل ---
        const detailsBtn = createElement(
            "button",
            "btn btn-primary btn-sm mt-auto",
            "Details"
        );
        detailsBtn.onclick = () => onCountryClick(country);

        // --- زر المفضلة ---
        const favBtn = createElement(
            "button",
            "btn btn-outline-danger btn-sm mt-2"
        );
        favBtn.innerHTML = isFavorite ? "❤️ Favoriet" : "🤍 Voeg toe aan favorieten";

        favBtn.onclick = () => onFavoriteToggle(country);

        // تجميع العناصر
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
