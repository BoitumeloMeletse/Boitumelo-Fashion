// recent.js
function addRecentItem(item) {
    let recent = JSON.parse(localStorage.getItem("recent")) || [];
    recent = recent.filter(r => r.id !== item.id);
    recent.unshift(item);
    if (recent.length > 5) recent.pop();
    localStorage.setItem("recent", JSON.stringify(recent));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("recent-items");
    if (!container) return;
  
    const recent = JSON.parse(localStorage.getItem("recent")) || [];
    container.innerHTML = recent.map(r => `
      <div class="recent-card">
        <img src="${r.image}" alt="${r.name}">
        <p>${r.name}</p>
      </div>
    `).join("");
  });
  