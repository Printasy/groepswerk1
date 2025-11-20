import { clearElement, createElement } from "../utils/dom.js";

export function renderStats(stats) {
    const panel = document.querySelector("#stats_panel");
    if (!panel) return;

    clearElement(panel);

    const { totalCountries, averagePopulation, favoritesPopulation } = stats;

    const cardsRow = createElement("div", "row gy-3 mb-3");

    const card1 = createStatCard("Aantal landen", totalCountries.toString());
    const card2 = createStatCard(
        "Gemiddelde populatie",
        averagePopulation.toLocaleString("nl-BE")
    );
    const card3 = createStatCard(
        "Totale populatie favorieten",
        favoritesPopulation.toLocaleString("nl-BE")
    );

    cardsRow.appendChild(card1);
    cardsRow.appendChild(card2);
    cardsRow.appendChild(card3);

    panel.appendChild(cardsRow);

    const barRow = createElement("div", "row bar-chart-row mt-4");

    const maxValue = Math.max(
        totalCountries || 1,
        averagePopulation || 1,
        favoritesPopulation || 1
    );

    const barContainer = createElement("div", "d-flex gap-3");

    const bar1 = createBar(
        "Landen",
        (totalCountries / maxValue) * 100
    );
    const bar2 = createBar(
        "Gem. Populatie",
        (averagePopulation / maxValue) * 100
    );
    const bar3 = createBar(
        "Favorieten Populatie",
        (favoritesPopulation / maxValue) * 100
    );

    barContainer.appendChild(bar1);
    barContainer.appendChild(bar2);
    barContainer.appendChild(bar3);

    barRow.appendChild(barContainer);
    panel.appendChild(barRow);
}

function createStatCard(label, valueText) {
    const col = createElement("div", "col-md-4");
    const card = createElement("div", "border rounded p-3 h-100");
    const labelEl = createElement("div", "small text-muted mb-1", label);
    const valueEl = createElement("div", "h5 mb-0", valueText);
    card.appendChild(labelEl);
    card.appendChild(valueEl);
    col.appendChild(card);
    return col;
}

function createBar(label, heightPercent) {
    const container = createElement(
        "div",
        "text-center",
        ""
    );

    const bar = createElement("div", "bg-primary rounded");
    bar.style.width = "60px";
    bar.style.height = heightPercent + "px";

    const lbl = createElement("div", "mt-2 small", label);

    container.appendChild(bar);
    container.appendChild(lbl);

    return container;
}
