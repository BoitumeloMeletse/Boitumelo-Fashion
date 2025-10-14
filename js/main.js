// main.js
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const productGrid = document.getElementById("featured-products");
  const searchInput = document.getElementById("search");
  const filterSelect = document.getElementById("filter");

  // 🔹 Load theme from localStorage
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark", currentTheme === "dark");
  themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });

  // 🔹 Updated JSON product data with your image links
  const products = [
    { id: 1, name: "PS5 Console", price: 12000, category: "Console", image: "https://wallpapers.com/images/featured/ps5-console-png-ywbv2gv3gfw23o3w.jpg", rating: 5 },
    { id: 2, name: "DualSense Controller", price: 1200, category: "Accessory", image: "https://koodoo.co.za/cdn/shop/products/DualSense-Midnight-Black-front.png?v=1621240906&width=416", rating: 4 },
    { id: 3, name: "Spider-Man 2", price: 900, category: "Game", image: "https://gmedia.playstation.com/is/image/SIEPDC/spider-man-2-keyart-01-en-7june24?$facebook$", rating: 5 },
    { id: 4, name: "The Last of Us Part II", price: 850, category: "Game", image: "https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/315718bce7eed62e3cf3fb02d61b81ff1782d6b6cf850fa4.png", rating: 5 },
    { id: 5, name: "PS5 Headset", price: 2000, category: "Accessory", image: "https://resource.logitechg.com/w_593,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/a50-gen-5/astro-a50-x-gen-5-sq-thumbnail.png?v=1", rating: 4 },
    { id: 6, name: "God of War: Ragnarök", price: 950, category: "Game", image: "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-ragnarok-store-art-01-10sep21$ru?$800px--t$", rating: 5 },
    { id: 7, name: "PlayStation Plus Membership", price: 900, category: "Subscription", image: "https://image.api.playstation.com/vulcan/ap/rnd/202204/0810/803Pm8uJoZ2Cl9fJPvTaXHqG.png", rating: 4 },
    { id: 8, name: "PS5 Charging Station", price: 600, category: "Accessory", image: "https://atlas-content-cdn.pixelsquid.com/assets_v2/246/2463181035450406157/jpeg-600/G03.jpg?modifiedAt=1", rating: 4 }
  ];

  // 🔹 Render products dynamically
  function renderProducts(data) {
    if (!productGrid) return;
    productGrid.innerHTML = "";

    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="product-image">
        <h3>${item.name}</h3>
        <p>R${item.price.toLocaleString()}</p>
        <p class="rating">⭐ ${item.rating}</p>
        <button class="wishlist-btn" data-id="${item.id}">❤️ Add to Wishlist</button>
      `;
      card.addEventListener("click", () => addRecentItem(item));
      productGrid.appendChild(card);
    });
  }

  renderProducts(products);

  // 🔹 Search and filter
  if (searchInput && filterSelect) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(query));
      renderProducts(filtered);
    });

    filterSelect.addEventListener("change", () => {
      const category = filterSelect.value;
      const filtered = category === "All" ? products : products.filter(p => p.category === category);
      renderProducts(filtered);
    });
  }
});
