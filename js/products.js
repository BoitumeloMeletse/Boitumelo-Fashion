document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("categoryFilter");
  
    const RAWG_API_KEY = "deb4e828c11e4d268a28b65f342e6073";
  
    // Local demo products
    const localProducts = [
        { id: 11, name: "PS5 Media Remote", price: 500, category: "Accessory", image: "https://gmedia.playstation.com/is/image/SIEPDC/media-remote-product-thumbnail-01-en-14sep21?$facebook$", rating: 4 },
        { id: 12, name: "PS VR2", price: 8000, category: "Accessory", image: "https://techvers.eu/wp-content/uploads/2023/07/psvr2.png", rating: 5 },
        { id: 13, name: "Gran Turismo 7", price: 800, category: "Game", image: "https://image.api.playstation.com/vulcan/ap/rnd/202202/2806/wpHT6JXmOA9iECLZKRPRvt0U.png", rating: 5 },
        { id: 14, name: "FIFA 25", price: 750, category: "Game", image: "https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2024-07/EA_FC25_Standard_KeyArt_16-9_3840x2160_Hypermotion.png.webp?itok=Bkb8mGBD", rating: 5 },
        { id: 15, name: "PS5 Stand", price: 400, category: "Accessory", image: "https://i5.walmartimages.com/seo/PS5-Stand-Cooling-Fan-ZRZLMVP-PS5-Cooling-Station-Dual-Controller-Charging-Station-PS5-Pro-Slim-Standard-Disc-Digital-Console-3-Levels-Adjustable-Fan_02683b7a-fe64-4f04-8f19-038f1af67860.8bdf942e9cbfab650fae497466726e00.png?odnHeight=264&odnWidth=264&odnBg=FFFFFF", rating: 4 },
        { id: 16, name: "Call of Duty: Modern Warfare II", price: 950, category: "Game", image: "https://www.allkeyshop.com/blog/wp-content/uploads/Call-of-Duty-Modern-Warfare-2-editions_featured.png", rating: 5 },
        { id: 17, name: "Demon's Souls", price: 800, category: "Game", image: "https://image.api.playstation.com/vulcan/img/rnd/202011/1717/GemRaOZaCMhGxQ9dRhnQQyT5.png", rating: 5 },
        { id: 18, name: "PS5 Controller Skin", price: 150, category: "Accessory", image: "https://media.takealot.com/covers_images/2bdbfc5e1d4e48c996168f0bb2cfbeea/s-pdpxl.file", rating: 4 },
        { id: 19, name: "NBA 2K25", price: 850, category: "Game", image: "https://image.api.playstation.com/vulcan/ap/rnd/202406/0623/cac0e47bd9ff01264779628b75d1f750b93bc4dcf6a56c10.jpg?w=440", rating: 5 },
        { id: 20, name: "Final Fantasy XVI", price: 1000, category: "Game", image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c78bc3fc-9f08-47ca-81ae-d89055c7ec49/diu6ddm-d40a9498-7b2c-472a-809f-be57e3eee4fe.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9jNzhiYzNmYy05ZjA4LTQ3Y2EtODFhZS1kODkwNTVjN2VjNDkvZGl1NmRkbS1kNDBhOTQ5OC03YjJjLTQ3MmEtODA5Zi1iZTU3ZTNlZWU0ZmUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.uXvj4gBFfcHTojvvUgLsUv7DXotMt0nLLifpNS6tl-s", rating: 5 },    
      { id: 101, name: "PS5 Console", price: 12000, category: "Console", image: "https://wallpapers.com/images/featured/ps5-console-png-ywbv2gv3gfw23o3w.jpg", rating: 5 },
      { id: 102, name: "DualSense Controller", price: 1200, category: "Accessory", image: "https://wallpapers.com/images/featured/ps5-console-png-ywbv2gv3gfw23o3w.jpg", rating: 4 },
      { id: 103, name: "PS5 Headset", price: 2000, category: "Accessory", image: "https://resource.logitechg.com/w_593,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/a50-gen-5/astro-a50-x-gen-5-sq-thumbnail.png?v=1", rating: 4 },
      { id: 104, name: "PS5 Charging Station", price: 600, category: "Accessory", image: "https://atlas-content-cdn.pixelsquid.com/assets_v2/246/2463181035450406157/jpeg-600/G03.jpg?modifiedAt=1", rating: 4 },
      { id: 105, name: "PlayStation Plus", price: 900, category: "Subscription", image: "https://image.api.playstation.com/vulcan/ap/rnd/202204/0810/803Pm8uJoZ2Cl9fJPvTaXHqG.png", rating: 4 },
      { id: 106, name: "PS5 Media Remote", price: 500, category: "Accessory", image: "https://cdn.example.com/ps5-remote.png", rating: 4 },
      { id: 107, name: "PS VR2", price: 8000, category: "Accessory", image: "https://cdn.example.com/psvr2.png", rating: 5 },
      { id: 108, name: "PS5 Stand", price: 400, category: "Accessory", image: "https://cdn.example.com/ps5-stand.png", rating: 4 },
      { id: 109, name: "PS5 Controller Skin", price: 150, category: "Accessory", image: "https://cdn.example.com/controller-skin.png", rating: 4 },
      { id: 110, name: "PS5 Game Bundle", price: 3500, category: "Game", image: "https://cdn.example.com/game-bundle.png", rating: 5 }
    ];
  
    // Function to render products
    function renderProducts(list) {
      productList.innerHTML = "";
      list.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>R${p.price.toLocaleString()}</p>
          <p class="rating">⭐ ${p.rating}</p>
          <button class="wishlist-btn" data-id="${p.id}">❤️ Add to Wishlist</button>
        `;
        card.addEventListener("click", () => addRecentItem(p));
        productList.appendChild(card);
      });
    }
  
    // Function to fetch RAWG games
    async function fetchRAWGGames() {
      try {
        const res = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=10`);
        const data = await res.json();
        const apiProducts = data.results.map(game => ({
          id: game.id,
          name: game.name,
          price: Math.floor(Math.random() * 1500) + 300, // random demo price
          category: "Game",
          image: game.background_image,
          rating: Math.round(game.rating)
        }));
        return apiProducts;
      } catch (err) {
        console.error("RAWG API error:", err);
        return [];
      }
    }
  
    // Load all products (API + Local)
    async function loadAllProducts() {
      const apiProducts = await fetchRAWGGames();
      const allProducts = [...localProducts, ...apiProducts];
      renderProducts(allProducts);
  
      // Filter/Search
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query));
        renderProducts(filtered);
      });
  
      categoryFilter.addEventListener("change", () => {
        const category = categoryFilter.value;
        const filtered = category === "all" ? allProducts : allProducts.filter(p => p.category === category);
        renderProducts(filtered);
      });
    }
  
    loadAllProducts();
  });
  