document.addEventListener("DOMContentLoaded", () => {
  // Contact form submission
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Simple validation
    if (name.trim() === "" || email.trim() === "" || subject.trim() === "" || message.trim() === "") {
      alert("Please fill in all fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address")
      return
    }

    // You would typically send this data to a server
    // For this example, we'll just show a success message

    // Add a loading effect
    const submitBtn = document.querySelector(".submit-btn")
    const originalBtnText = submitBtn.innerHTML
    submitBtn.innerHTML = "Sending..."
    submitBtn.disabled = true

    // Simulate server request with timeout
    setTimeout(() => {
      // Create success message
      const successMessage = document.createElement("div")
      successMessage.className = "success-message"
      successMessage.textContent = "Your message has been sent successfully!"
      document.body.appendChild(successMessage)

      // Show success message
      setTimeout(() => {
        successMessage.classList.add("show")
      }, 10)

      // Hide success message after 3 seconds
      setTimeout(() => {
        successMessage.classList.remove("show")
        setTimeout(() => {
          document.body.removeChild(successMessage)
        }, 300)
      }, 3000)

      // Reset form
      contactForm.reset()
      submitBtn.innerHTML = originalBtnText
      submitBtn.disabled = false
    }, 1500)
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

  // Dark/Light Mode Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
    }
  });
