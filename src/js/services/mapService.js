import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map;
let marker;

export function initMap() {
    const mapContainer = document.querySelector("#country_map");
    if (!mapContainer) return;

    map = L.map(mapContainer).setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);
}

export function focusCountry(lat, lng, name) {
    if (!map) return;
    if (typeof lat !== "number" || typeof lng !== "number") return;

    map.setView([lat, lng], 5);

    if (marker) {
        marker.remove();
    }

    marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(name).openPopup();
}




export function refreshMap() {
    if (map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 200);
    }
}
