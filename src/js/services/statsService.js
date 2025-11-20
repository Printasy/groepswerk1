const EXCHANGE_API_BASE = "https://api.frankfurter.app/latest";

const SUPPORTED_CURRENCIES = [
    "EUR", "USD", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NOK", "DKK",
    "NZD", "HKD", "SGD", "ZAR", "PLN", "MXN", "BRL", "TRY", "HUF", "CZK", "AED",
    "SAR", "KWD", "BHD", "QAR", "INR"
];

export async function fetchRateToEuro(currencyCode) {
    if (currencyCode === "EUR") {
        return 1.0;
    }

    if (!SUPPORTED_CURRENCIES.includes(currencyCode)) {
        return "NOT_SUPPORTED";
    }

    try {
        const url = `${EXCHANGE_API_BASE}?from=${currencyCode}&to=EUR`;
        const response = await fetch(url);
        if (!response.ok) return "NOT_SUPPORTED";

        const data = await response.json();
        if (!data?.rates?.EUR) return "NOT_SUPPORTED";

        return data.rates.EUR;
    } catch {
        return "NOT_SUPPORTED";
    }
}

export function calculateStats(countries, favorites) {
    const totalCountries = countries.length;

    const averagePopulation =
        totalCountries === 0
            ? 0
            : Math.round(
                countries.reduce((sum, c) => sum + (c.population || 0), 0) /
                totalCountries
            );

    const favoritesPopulation = favorites.reduce(
        (sum, c) => sum + (c.population || 0),
        0
    );

    return {
        totalCountries,
        averagePopulation,
        favoritesPopulation
    };
}
