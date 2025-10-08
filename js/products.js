// Shopping List functionality
var ul = document.getElementById("ul_pr");

function add(id) {
  var li_new = document.createElement("li");
  var li_inp = document.createTextNode(id);
  li_new.appendChild(li_inp);
  ul.appendChild(li_new);
  ul.appendChild(document.createElement("br"));
}

window.emptyList = function () {
  var ul = document.querySelector('#ul_pr');
  var listLength = ul.children.length;

  for (let i = 0; i < listLength; i++) {
    ul.removeChild(ul.children[0]);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product-info");

  products.forEach(info => {
    const product = info.getAttribute("data-product");

    // Create rating block
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");
    ratingDiv.setAttribute("data-product", product);

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.classList.add("star");
      star.setAttribute("data-value", i);
      star.innerHTML = "&#9733;";
      ratingDiv.appendChild(star);
    }

    // Analytics (average + review count)
    const analyticsDiv = document.createElement("div");
    analyticsDiv.classList.add("analytics");
    analyticsDiv.textContent = "Average Rating: 0 ★ (0 reviews)";

    // Review form
    const reviewForm = document.createElement("div");
    reviewForm.classList.add("review-form");
    reviewForm.innerHTML = `
      <textarea placeholder="Write a review..." rows="2"></textarea>
      <button class="submit-review">Submit</button>
    `;

    // Reviews container
    const reviewsDiv = document.createElement("div");
    reviewsDiv.classList.add("reviews");

    // Append everything
    info.appendChild(ratingDiv);
    info.appendChild(analyticsDiv);
    info.appendChild(reviewForm);
    info.appendChild(reviewsDiv);

    // Init functions
    initRating(ratingDiv, analyticsDiv, product);
    initReviews(reviewForm, reviewsDiv, product);
    updateAnalytics(product, analyticsDiv);
  });

  // Optional: Show Top Rated Section
  showTopRated(products);
});

// ⭐ Ratings
function initRating(ratingDiv, analyticsDiv, product) {
  const stars = ratingDiv.querySelectorAll(".star");

  let savedRatings = JSON.parse(localStorage.getItem(`ratings_${product}`)) || [];

  updateStars(stars, average(savedRatings));
  updateAnalytics(product, analyticsDiv);

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const value = Number(star.getAttribute("data-value"));
      savedRatings.push(value);
      localStorage.setItem(`ratings_${product}`, JSON.stringify(savedRatings));
      updateStars(stars, average(savedRatings));
      updateAnalytics(product, analyticsDiv);
    });
  });
}

function updateStars(stars, avg) {
  const rounded = Math.round(avg);
  stars.forEach(star => {
    star.classList.toggle("active", Number(star.getAttribute("data-value")) <= rounded);
  });
}

// 📝 Reviews
function initReviews(reviewForm, reviewsDiv, product) {
  const textarea = reviewForm.querySelector("textarea");
  const button = reviewForm.querySelector(".submit-review");
  let savedReviews = JSON.parse(localStorage.getItem(`reviews_${product}`)) || [];

  savedReviews.forEach(r => {
    const p = document.createElement("p");
    p.textContent = r;
    reviewsDiv.appendChild(p);
  });

  button.addEventListener("click", () => {
    if (textarea.value.trim() !== "") {
      const text = textarea.value.trim();
      savedReviews.push(text);
      localStorage.setItem(`reviews_${product}`, JSON.stringify(savedReviews));
      const p = document.createElement("p");
      p.textContent = text;
      reviewsDiv.appendChild(p);
      textarea.value = "";
    }
  });
}

// 📊 Analytics (Average + Review Count)
function updateAnalytics(product, analyticsDiv) {
  let savedRatings = JSON.parse(localStorage.getItem(`ratings_${product}`)) || [];
  let savedReviews = JSON.parse(localStorage.getItem(`reviews_${product}`)) || [];
  const avg = average(savedRatings);
  analyticsDiv.textContent = `Average Rating: ${avg.toFixed(1)} ★ (${savedReviews.length} reviews)`;
}

function average(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// 🏆 Top Rated Section
function showTopRated(products) {
  const topSection = document.createElement("section");
  topSection.classList.add("top-rated");
  topSection.innerHTML = "<h2>🏆 Top Rated Products</h2>";

  let ratedProducts = [];

  products.forEach(p => {
    const productName = p.getAttribute("data-product");
    const ratings = JSON.parse(localStorage.getItem(`ratings_${productName}`)) || [];
    const avg = average(ratings);
    if (avg > 0) ratedProducts.push({ name: productName, avg });
  });

  ratedProducts.sort((a, b) => b.avg - a.avg);
  ratedProducts.slice(0, 3).forEach(prod => {
    const div = document.createElement("div");
    div.textContent = `${prod.name} — ${prod.avg.toFixed(1)} ★`;
    topSection.appendChild(div);
  });

  if (ratedProducts.length > 0) {
    document.body.appendChild(topSection);
  }
}


// Fashion Quotes API Integration
const quoteText = document.getElementById('fashion-quote');
const quoteAuthor = document.getElementById('quote-author');
const refreshBtn = document.getElementById('refresh-quote');

async function fetchFashionQuote() {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=fashion', {
      headers: {
        'X-Api-Key': 'pub_aaf28fe170654f08b47d2e1fec4d8449'
      }
    });

    if (!response.ok) throw new Error('Could not fetch quote');

    const data = await response.json();
    const quote = data[0];

    quoteText.textContent = `"${quote.quote}"`;
    quoteAuthor.textContent = `– ${quote.author}`;
  } catch (error) {
    quoteText.textContent = 'Sorry! Could not load a quote.';
    quoteAuthor.textContent = '';
    console.error(error);
  }
}

// Load initial quote on page load
fetchFashionQuote();

// Refresh quote on button click
refreshBtn.addEventListener('click', fetchFashionQuote);