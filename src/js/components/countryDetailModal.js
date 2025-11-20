import * as bootstrap from "bootstrap";
import { clearElement, createElement } from "../utils/dom.js";
import { focusCountry } from "../services/mapService.js";
import { fetchRateToEuro } from "../services/statsService.js";

let modalInstance = null;
let currentCountry = null;
let onFavoriteToggleCallback = null;

export function initCountryModal(onFavoriteToggle) {
    const modalElement = document.querySelector("#country_modal");
    if (!modalElement) return;

    modalInstance = new bootstrap.Modal(modalElement);
    onFavoriteToggleCallback = onFavoriteToggle;

    const favBtn = document.querySelector("#favorite_toggle_btn");
    if (favBtn) {
        favBtn.addEventListener("click", () => {
            if (currentCountry && typeof onFavoriteToggleCallback === "function") {
                onFavoriteToggleCallback(currentCountry);
            }
        });
    }
}

export async function showCountryDetail(country, isFavorite) {
    if (!modalInstance || !country) return;

    currentCountry = country;

    const title = document.querySelector("#country_modal_label");
    const flagImg = document.querySelector("#country_flag");
    const detailsDl = document.querySelector("#country_details");
    const alertBox = document.querySelector("#country_modal_alert");
    const currencyInfo = document.querySelector("#currency_info");
    const favBtn = document.querySelector("#favorite_toggle_btn");

    title.textContent = country.name.common;

    flagImg.src = country.flags?.png || "";
    flagImg.alt = `${country.name.common} flag`;

    clearElement(detailsDl);
    clearElement(currencyInfo);

    detailsDl.appendChild(createElement("dt", "fw-bold", "Hoofdstad"));
    detailsDl.appendChild(createElement("dd", "", country.capital?.[0] || "Onbekend"));

    detailsDl.appendChild(createElement("dt", "fw-bold", "Regio"));
    detailsDl.appendChild(createElement("dd", "", country.region || "Onbekend"));

    detailsDl.appendChild(createElement("dt", "fw-bold", "Bevolking"));
    detailsDl.appendChild(createElement("dd", "", country.population?.toLocaleString() || "Onbekend"));

    const languages = country.languages ? Object.values(country.languages).join(", ") : "Onbekend";
    detailsDl.appendChild(createElement("dt", "fw-bold", "Talen"));
    detailsDl.appendChild(createElement("dd", "", languages));

    let currencyCode = "Onbekend";
    let currencyName = "Onbekend";

    if (country.currencies) {
        const entries = Object.entries(country.currencies);
        currencyCode = entries[0][0];
        currencyName = entries[0][1].name;
    }

    detailsDl.appendChild(createElement("dt", "fw-bold", "Valuta"));
    detailsDl.appendChild(createElement("dd", "", `${currencyName} (${currencyCode})`));

    if (country.latlng && country.latlng.length === 2) {
        const [lat, lng] = country.latlng;
        alertBox.classList.add("d-none");
        focusCountry(lat, lng, country.name.common);

    } else {
        alertBox.classList.remove("d-none");
        alertBox.textContent = "Geen locatiegegevens beschikbaar voor dit land.";
        focusCountry(null, null, null);
    }

    if (currencyCode !== "Onbekend") {
        try {
            const rate = await fetchRateToEuro(currencyCode);
            if (rate) {
                currencyInfo.appendChild(
                    createElement("p", "text-success", `1 ${currencyCode} = ${rate.toFixed(3)} EUR`)
                );
            } else {
                currencyInfo.appendChild(
                    createElement("p", "text-danger", "Wisselkoers niet beschikbaar.")
                );
            }
        } catch {
            currencyInfo.appendChild(
                createElement("p", "text-danger", "Er is een fout opgetreden bij het ophalen van de wisselkoers.")
            );
        }
    }

    if (isFavorite) {
        favBtn.textContent = "❤️ Verwijderen uit favorieten";
        favBtn.classList.remove("btn-outline-secondary");
        favBtn.classList.add("btn-danger");
    } else {
        favBtn.textContent = "🤍 Toevoegen aan favorieten";
        favBtn.classList.remove("btn-danger");
        favBtn.classList.add("btn-outline-secondary");
    }

    modalInstance.show();
}
