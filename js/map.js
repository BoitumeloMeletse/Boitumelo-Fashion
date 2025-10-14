document.addEventListener("DOMContentLoaded", () => {
    const map = L.map("map").setView([-26.2041, 28.0473], 12); // Johannesburg coordinates
  
    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
  
    // Example store markers
    const stores = [
      { name: "PS5 Central", coords: [-26.2041, 28.0473] },
      { name: "Gamer's Hub", coords: [-26.2100, 28.0400] },
      { name: "Console World", coords: [-26.2150, 28.0500] },
    ];
  
    stores.forEach(store => {
      L.marker(store.coords)
        .addTo(map)
        .bindPopup(`<b>${store.name}</b>`)
        .openPopup();
    });
  });
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }
  ).addTo(map);
    