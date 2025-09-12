document.addEventListener("DOMContentLoaded", () => {
  // Login form submission
  const loginForm = document.getElementById("login-form")

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    // Simple validation
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter both username and password")
      return
    }

    // You would typically send this data to a server for authentication
    // For this example, we'll just redirect to index.html

    // Add a loading effect
    const loginBtn = document.querySelector(".login-btn")
    loginBtn.innerHTML = "Signing in..."
    loginBtn.disabled = true

    // Simulate server request with timeout
    setTimeout(() => {
      // Store login state in localStorage (for demo purposes)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("username", username)

      // Redirect to index.html
      window.location.href = "index.html"
    }, 1500)
  })

  // Social login buttons
  const socialButtons = document.querySelectorAll(".social-btn")

  socialButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // For demo purposes, we'll just redirect to index.html
      localStorage.setItem("isLoggedIn", "true")

      // Determine which social platform was clicked
      if (this.classList.contains("google")) {
        localStorage.setItem("loginMethod", "google")
      } else if (this.classList.contains("facebook")) {
        localStorage.setItem("loginMethod", "facebook")
      } else if (this.classList.contains("apple")) {
        localStorage.setItem("loginMethod", "apple")
      }

      // Redirect to index.html
      window.location.href = "index.html"
    })
  })

  // Add subtle animation to the background shapes
  const shapes = document.querySelectorAll(".shape")

  function animateShapes() {
    shapes.forEach((shape, index) => {
      const xPos = Math.sin(Date.now() * 0.001 + index) * 50
      const yPos = Math.cos(Date.now() * 0.001 + index) * 20

      shape.style.transform = `translate(${xPos}px, ${yPos}px)`
    })

    requestAnimationFrame(animateShapes)
  }

  animateShapes()
})

// Update navigation for mobile
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger")
  const navLinks = document.querySelector(".nav-links-container")

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active")
    burger.classList.toggle("toggle")
  })
})
