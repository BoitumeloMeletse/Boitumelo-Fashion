document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const burger = document.querySelector(".burger")
  const navLinks = document.querySelector(".nav-links-container")

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active")
    burger.classList.toggle("toggle")
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = navLinks.contains(event.target)
    const isClickOnBurger = burger.contains(event.target)

    if (navLinks.classList.contains("nav-active") && !isClickInsideNav && !isClickOnBurger) {
      navLinks.classList.remove("nav-active")
      burger.classList.remove("toggle")
    }
  })

  // Add subtle animation to the background shapes
  const shapes = document.querySelectorAll(".shape")

  function animateShapes() {
    shapes.forEach((shape, index) => {
      const xPos = Math.sin(Date.now() * 0.001 + index) * 20
      const yPos = Math.cos(Date.now() * 0.001 + index) * 20

      shape.style.transform = `translate(${xPos}px, ${yPos}px)`
    })

    requestAnimationFrame(animateShapes)
  }

  animateShapes()

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const username = localStorage.getItem("username")

  // Update navigation based on login status
  const loginLink = document.querySelector('a[href="login.html"]')

  if (isLoggedIn && loginLink) {
    // Replace login link with account/logout options
    loginLink.textContent = username || "Account"
    loginLink.href = "#"

    // Create dropdown for account options
    const dropdown = document.createElement("div")
    dropdown.className = "account-dropdown"
    dropdown.innerHTML = `
      <a href="account.html">My Account</a>
      <a href="orders.html">My Orders</a>
      <a href="#" id="logout-btn">Logout</a>
    `

    // Position the dropdown
    loginLink.style.position = "relative"
    loginLink.appendChild(dropdown)

    // Toggle dropdown on click
    loginLink.addEventListener("click", (e) => {
      e.preventDefault()
      dropdown.classList.toggle("show-dropdown")
    })

    // Logout functionality
    document.getElementById("logout-btn").addEventListener("click", (e) => {
      e.preventDefault()
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("username")
      localStorage.removeItem("loginMethod")
      window.location.reload()
    })
  }

  // Add parallax effect to hero image
  const heroImage = document.querySelector(".hero-image img")

  if (heroImage) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`
    })
  }

  // Add intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("fade-out")
    observer.observe(section)
  })
})
