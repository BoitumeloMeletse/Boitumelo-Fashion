// wishlist.js
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("wishlist-btn")) {
    const id = e.target.dataset.id;
    if (!wishlist.includes(id)) {
      wishlist.push(id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to wishlist!");
    } else {
      alert("Already in wishlist!");
    }
  }
});
