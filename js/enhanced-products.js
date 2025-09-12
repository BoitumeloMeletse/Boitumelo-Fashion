// Enhanced Products JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Load products from JSON
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      // Store products in global variable
      window.storeProducts = data.products

      // Initialize the page
      initializePage(data)
    })
    .catch((error) => {
      console.error("Error loading products:", error)
      document.querySelector(".main-content").innerHTML = `
        <div class="glass-card error-card">
          <h2>Oops! Something went wrong</h2>
          <p>We couldn't load the products. Please try again later.</p>
        </div>
      `
    })

  // Initialize shopping cart from localStorage
  initializeCart()
})

// Initialize the page with product data
function initializePage(data) {
  const products = data.products
  const categories = data.categories
  const featured = data.featured

  // Render women's products
  renderProductSection(
    "women",
    "For Her",
    products.filter((p) => p.category === "women"),
  )

  // Render men's products
  renderProductSection(
    "men",
    "For Him",
    products.filter((p) => p.category === "men"),
  )

  // Add filter functionality
  setupFilters(categories)

  // Add event listeners for cart functionality
  setupCartListeners()
}

// Render a product section
function renderProductSection(categoryId, title, products) {
  // Create section header
  const sectionHeader = document.createElement("div")
  sectionHeader.className = "glass-card section-header"
  sectionHeader.innerHTML = `
    <h1>For <span class="colored-word">${title.split(" ")[1]}</span></h1>
    <div class="divider"></div>
  `

  // Create product grid
  const productGrid = document.createElement("div")
  productGrid.className = `product-grid ${categoryId}-products`

  // Add products to grid
  products.forEach((product) => {
    const productCard = createProductCard(product)
    productGrid.appendChild(productCard)
  })

  // Add to products section
  const productsSection = document.querySelector(".products-section")
  productsSection.appendChild(sectionHeader)
  productsSection.appendChild(productGrid)
}

// Create a product card
function createProductCard(product) {
  const productCard = document.createElement("div")
  productCard.className = "glass-card product-card"
  productCard.setAttribute("data-id", product.id)
  productCard.setAttribute("data-category", product.category)
  productCard.setAttribute("data-subcategory", product.subcategory)

  productCard.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}">
      ${product.isNew ? '<span class="badge new-badge">New</span>' : ""}
      ${product.discount ? '<span class="badge discount-badge">' + product.discount + "</span>" : ""}
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <div class="price-container">
        <p class="price">R${product.price}</p>
        ${product.originalPrice ? '<p class="original-price">R' + product.originalPrice + "</p>" : ""}
      </div>
      <div class="rating">
        ${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}
        <span class="review-count">(${product.reviews})</span>
      </div>
      <div class="add-to-cart" onclick="addToCart('${product.id}')">
        <i class="fas fa-shopping-cart"></i> Add to Cart
      </div>
    </div>
  `

  // Add click event to show product details
  productCard.addEventListener("click", (e) => {
    if (!e.target.closest(".add-to-cart")) {
      showProductDetails(product)
    }
  })

  return productCard
}

// Show product details in a modal
function showProductDetails(product) {
  // Create modal container
  const modal = document.createElement("div")
  modal.className = "product-modal"

  // Create modal content
  modal.innerHTML = `
    <div class="glass-card modal-content">
      <span class="close-modal">&times;</span>
      <div class="modal-grid">
        <div class="modal-images">
          <img src="${product.image}" alt="${product.name}" class="main-image">
          <div class="thumbnail-container">
            ${product.images.map((img) => `<img src="${img}" alt="${product.name}" class="thumbnail">`).join("")}
          </div>
        </div>
        <div class="modal-info">
          <h2>${product.name}</h2>
          <div class="price-container">
            <p class="price">R${product.price}</p>
            ${product.originalPrice ? '<p class="original-price">R' + product.originalPrice + "</p>" : ""}
            ${product.discount ? '<span class="discount-tag">' + product.discount + "</span>" : ""}
          </div>
          <div class="rating">
            ${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}
            <span class="review-count">(${product.reviews} reviews)</span>
          </div>
          <p class="description">${product.description}</p>
          
          <div class="product-options">
            <div class="size-options">
              <h4>Select Size</h4>
              <div class="size-buttons">
                ${product.sizes.map((size) => `<button class="size-btn">${size}</button>`).join("")}
              </div>
            </div>
            
            <div class="color-options">
              <h4>Select Color</h4>
              <div class="color-buttons">
                ${product.colors.map((color) => `<button class="color-btn" data-color="${color}">${color}</button>`).join("")}
              </div>
            </div>
          </div>
          
          <div class="product-meta">
            <p><strong>Material:</strong> ${product.material}</p>
            <p><strong>Care:</strong> ${product.care}</p>
          </div>
          
          <div class="action-buttons">
            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
            <button class="wishlist-btn">
              <i class="far fa-heart"></i> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  `

  // Add modal to body
  document.body.appendChild(modal)

  // Show modal with animation
  setTimeout(() => {
    modal.classList.add("show")
  }, 10)

  // Close modal when clicking on close button or outside the modal
  const closeBtn = modal.querySelector(".close-modal")
  closeBtn.addEventListener("click", () => {
    closeModal(modal)
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal)
    }
  })

  // Thumbnail image functionality
  const thumbnails = modal.querySelectorAll(".thumbnail")
  const mainImage = modal.querySelector(".main-image")

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.src
      thumbnails.forEach((t) => t.classList.remove("active"))
      thumb.classList.add("active")
    })
  })

  // Size selection
  const sizeButtons = modal.querySelectorAll(".size-btn")
  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => b.classList.remove("selected"))
      btn.classList.add("selected")
    })
  })

  // Color selection
  const colorButtons = modal.querySelectorAll(".color-btn")
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorButtons.forEach((b) => b.classList.remove("selected"))
      btn.classList.add("selected")
    })
  })
}

// Close modal with animation
function closeModal(modal) {
  modal.classList.remove("show")
  setTimeout(() => {
    document.body.removeChild(modal)
  }, 300)
}

// Setup filters for products
function setupFilters(categories) {
  // Create filter container
  const filterContainer = document.createElement("div")
  filterContainer.className = "glass-card filter-container"

  // Create filter content
  let filterHTML = '<h3>Filter Products</h3><div class="filter-options">'

  // Category filters
  filterHTML += '<div class="filter-group"><h4>Categories</h4>'
  categories.forEach((category) => {
    filterHTML += `
      <div class="filter-item">
        <input type="checkbox" id="cat-${category.id}" data-filter="category" data-value="${category.id}">
        <label for="cat-${category.id}">${category.name}</label>
      </div>
    `

    // Subcategory filters
    category.subcategories.forEach((subcat) => {
      filterHTML += `
        <div class="filter-item subcategory">
          <input type="checkbox" id="subcat-${subcat.id}" data-filter="subcategory" data-value="${subcat.id}">
          <label for="subcat-${subcat.id}">${subcat.name}</label>
        </div>
      `
    })
  })
  filterHTML += "</div>"

  // Price range filter
  filterHTML += `
    <div class="filter-group">
      <h4>Price Range</h4>
      <div class="price-slider">
        <input type="range" min="0" max="3000" value="3000" class="slider" id="price-range">
        <div class="price-range-values">
          <span>R0</span>
          <span id="price-value">R3000+</span>
        </div>
      </div>
    </div>
  `

  // Sort options
  filterHTML += `
    <div class="filter-group">
      <h4>Sort By</h4>
      <select id="sort-options" class="sort-select">
        <option value="featured">Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Customer Rating</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  `

  filterHTML += "</div>"

  // Add clear filters button
  filterHTML += '<button id="clear-filters" class="clear-filters-btn">Clear Filters</button>'

  // Set filter HTML
  filterContainer.innerHTML = filterHTML

  // Add filter container to page
  const mainContent = document.querySelector(".main-content")
  mainContent.insertBefore(filterContainer, document.querySelector(".products-section"))

  // Add event listeners for filters
  setupFilterListeners()
}

// Setup filter event listeners
function setupFilterListeners() {
  // Checkbox filters
  const filterCheckboxes = document.querySelectorAll('.filter-item input[type="checkbox"]')
  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFilters)
  })

  // Price range filter
  const priceRange = document.getElementById("price-range")
  const priceValue = document.getElementById("price-value")

  priceRange.addEventListener("input", () => {
    const value = priceRange.value
    priceValue.textContent = value >= 3000 ? "R3000+" : `R${value}`
  })

  priceRange.addEventListener("change", applyFilters)

  // Sort options
  const sortSelect = document.getElementById("sort-options")
  sortSelect.addEventListener("change", applyFilters)

  // Clear filters
  const clearFiltersBtn = document.getElementById("clear-filters")
  clearFiltersBtn.addEventListener("click", clearFilters)
}

// Apply filters to products
function applyFilters() {
  const products = window.storeProducts

  // Get selected category filters
  const selectedCategories = Array.from(document.querySelectorAll('input[data-filter="category"]:checked')).map(
    (input) => input.dataset.value,
  )

  // Get selected subcategory filters
  const selectedSubcategories = Array.from(document.querySelectorAll('input[data-filter="subcategory"]:checked')).map(
    (input) => input.dataset.value,
  )

  // Get price range
  const maxPrice = document.getElementById("price-range").value

  // Get sort option
  const sortOption = document.getElementById("sort-options").value

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.subcategory)) {
      return false
    }

    // Price filter
    if (product.price > maxPrice) {
      return false
    }

    return true
  })

  // Sort products
  switch (sortOption) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    case "newest":
      filteredProducts.sort((a, b) => b.isNew - a.isNew)
      break
    default:
      // Featured - no specific sort
      break
  }

  // Update product display
  updateProductDisplay(filteredProducts)
}

// Update product display based on filters
function updateProductDisplay(filteredProducts) {
  // Clear existing product grids
  const productGrids = document.querySelectorAll(".product-grid")
  productGrids.forEach((grid) => {
    grid.innerHTML = ""
  })

  // Group products by category
  const womenProducts = filteredProducts.filter((p) => p.category === "women")
  const menProducts = filteredProducts.filter((p) => p.category === "men")

  // Add women's products
  const womenGrid = document.querySelector(".women-products")
  if (womenGrid) {
    if (womenProducts.length > 0) {
      womenProducts.forEach((product) => {
        womenGrid.appendChild(createProductCard(product))
      })
    } else {
      womenGrid.innerHTML = '<div class="no-products">No products found matching your filters.</div>'
    }
  }

  // Add men's products
  const menGrid = document.querySelector(".men-products")
  if (menGrid) {
    if (menProducts.length > 0) {
      menProducts.forEach((product) => {
        menGrid.appendChild(createProductCard(product))
      })
    } else {
      menGrid.innerHTML = '<div class="no-products">No products found matching your filters.</div>'
    }
  }
}

// Clear all filters
function clearFilters() {
  // Uncheck all checkboxes
  const filterCheckboxes = document.querySelectorAll('.filter-item input[type="checkbox"]')
  filterCheckboxes.forEach((checkbox) => {
    checkbox.checked = false
  })

  // Reset price range
  const priceRange = document.getElementById("price-range")
  const priceValue = document.getElementById("price-value")
  priceRange.value = 3000
  priceValue.textContent = "R3000+"

  // Reset sort option
  const sortSelect = document.getElementById("sort-options")
  sortSelect.value = "featured"

  // Apply filters (which will now show all products)
  applyFilters()
}

// Initialize shopping cart
function initializeCart() {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Update cart display
  updateCartDisplay(cart)
}

// Add product to cart
function addToCart(productId) {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Find product in cart
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    // Increase quantity if already in cart
    existingItem.quantity += 1
  } else {
    // Add new item to cart
    const product = window.storeProducts.find((p) => p.id === productId)
    if (product) {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart display
  updateCartDisplay(cart)

  // Show added to cart notification
  showNotification("Product added to cart!")
}

// Update cart display
function updateCartDisplay(cart) {
  const cartList = document.getElementById("ul_pr")
  if (!cartList) return

  // Clear cart list
  cartList.innerHTML = ""

  if (cart.length === 0) {
    cartList.innerHTML = '<li class="empty-cart">Your cart is empty</li>'
    return
  }

  // Add items to cart list
  let total = 0

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    total += itemTotal

    const li = document.createElement("li")
    li.innerHTML = `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <div class="cart-item-price">R${item.price} × ${item.quantity}</div>
        </div>
        <div class="cart-item-actions">
          <button class="quantity-btn minus" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn plus" data-id="${item.id}">+</button>
          <button class="remove-btn" data-id="${item.id}">×</button>
        </div>
      </div>
    `

    cartList.appendChild(li)
  })

  // Add total to cart
  const totalLi = document.createElement("li")
  totalLi.className = "cart-total"
  totalLi.innerHTML = `
    <div class="total-label">Total:</div>
    <div class="total-amount">R${total.toFixed(2)}</div>
  `

  cartList.appendChild(totalLi)

  // Add checkout button
  const checkoutLi = document.createElement("li")
  checkoutLi.className = "checkout-button-container"
  checkoutLi.innerHTML = `
    <button class="checkout-btn">Proceed to Checkout</button>
  `

  cartList.appendChild(checkoutLi)
}

// Setup cart event listeners
function setupCartListeners() {
  const cartList = document.getElementById("ul_pr")
  if (!cartList) return

  // Event delegation for cart actions
  cartList.addEventListener("click", (e) => {
    const target = e.target

    // Handle quantity decrease
    if (target.classList.contains("minus")) {
      const productId = target.dataset.id
      updateCartItemQuantity(productId, -1)
    }

    // Handle quantity increase
    if (target.classList.contains("plus")) {
      const productId = target.dataset.id
      updateCartItemQuantity(productId, 1)
    }

    // Handle item removal
    if (target.classList.contains("remove-btn")) {
      const productId = target.dataset.id
      removeCartItem(productId)
    }
  })

  // Clear cart button
  const clearCartBtn = document.querySelector(".btn-clear-list")
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart)
  }
}

// Update cart item quantity
function updateCartItemQuantity(productId, change) {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Find product in cart
  const itemIndex = cart.findIndex((item) => item.id === productId)

  if (itemIndex !== -1) {
    // Update quantity
    cart[itemIndex].quantity += change

    // Remove item if quantity is 0 or less
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1)
    }

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Update cart display
    updateCartDisplay(cart)
  }
}

// Remove item from cart
function removeCartItem(productId) {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || []

  // Remove item from cart
  cart = cart.filter((item) => item.id !== productId)

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart display
  updateCartDisplay(cart)

  // Show notification
  showNotification("Product removed from cart")
}

// Clear cart
function clearCart() {
  // Clear cart in localStorage
  localStorage.setItem("cart", JSON.stringify([]))

  // Update cart display
  updateCartDisplay([])

  // Show notification
  showNotification("Cart cleared")
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message

  // Add to body
  document.body.appendChild(notification)

  // Show notification with animation
  setTimeout(() => {
    notification.classList.add("show")
  }, 10)

  // Hide and remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}
