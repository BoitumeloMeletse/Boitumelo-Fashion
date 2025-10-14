// reviews.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("review-form");
    const reviewsContainer = document.getElementById("reviews-container");
  
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  
    function renderReviews() {
      reviewsContainer.innerHTML = "";
      reviews.forEach(r => {
        const div = document.createElement("div");
        div.classList.add("review");
        div.innerHTML = `
          <strong>${r.name}</strong> - ⭐ ${r.rating}
          <p>${r.comment}</p>
        `;
        reviewsContainer.appendChild(div);
      });
    }
  
    renderReviews();
  
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const rating = form.rating.value;
        const comment = form.comment.value.trim();
  
        if (!name || !rating || !comment) {
          alert("Please fill in all fields.");
          return;
        }
  
        const newReview = { name, rating, comment };
        reviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(reviews));
  
        form.reset();
        renderReviews();
      });
    }
  });
  