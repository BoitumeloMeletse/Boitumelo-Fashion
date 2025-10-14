document.addEventListener("DOMContentLoaded", () => {
    const RAWG_API_KEY = "deb4e828c11e4d268a28b65f342e6073";
    const gameList = document.getElementById("game-list");
    const searchInput = document.getElementById("search");
    const platformFilter = document.getElementById("platformFilter");
    const themeToggle = document.getElementById("theme-toggle"); // Add dark mode toggle

    // Load saved theme from localStorage
    const currentTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark", currentTheme === "dark");
    themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";

    // Toggle dark/light mode
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
    });

    let games = [];

    // Fetch RAWG games
    async function fetchGames() {
        try {
            const res = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=20`);
            const data = await res.json();
            games = data.results.map(game => ({
                id: game.id,
                name: game.name,
                image: game.background_image,
                rating: Math.round(game.rating),
                release: game.released,
                platforms: game.platforms.map(p => p.platform.name).join(", "),
                category: "Game",
                price: Math.floor(Math.random() * 1500) + 300,
                description: game.description || "No description available"
            }));
            renderGames(games);
            saveToLocalStorage(games);
        } catch(err) {
            console.error("RAWG API error:", err);
        }
    }

    // Render games
    function renderGames(list) {
        gameList.innerHTML = "";
        list.forEach(game => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${game.image}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>⭐ ${game.rating} | Released: ${game.release}</p>
                <p>Platforms: ${game.platforms}</p>
                <p>R${game.price.toLocaleString()}</p>
                <button class="wishlist-btn" data-id="${game.id}">❤️ Add to Wishlist</button>
            `;
            card.addEventListener("click", () => addRecentItem(game));
            gameList.appendChild(card);
        });
    }

    // Save games to localStorage
    function saveToLocalStorage(data) {
        localStorage.setItem("storeGames", JSON.stringify(data));
    }

    // Filter/Search Events
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = games.filter(g => g.name.toLowerCase().includes(query));
        renderGames(filtered);
    });

    platformFilter.addEventListener("change", () => {
        const platform = platformFilter.value;
        const filtered = platform === "all" ? games : games.filter(g => g.platforms.includes(platform));
        renderGames(filtered);
    });

    // Load map after page
    const mapScript = document.createElement("script");
    mapScript.src = "js/map.js";
    document.body.appendChild(mapScript);

    fetchGames();
});
