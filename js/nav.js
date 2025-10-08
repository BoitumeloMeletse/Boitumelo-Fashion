const navSlide = () => {
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-links li")

  burger.addEventListener("click", () => {
    //toggle nav
    nav.classList.toggle("nav-active")

    // animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.6}s`
      }
    })
    //burger animation
    burger.classList.toggle("toggle")
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = nav.contains(event.target)
    const isClickOnBurger = burger.contains(event.target)

    if (nav.classList.contains("nav-active") && !isClickInsideNav && !isClickOnBurger) {
      nav.classList.remove("nav-active")
      burger.classList.remove("toggle")

      navLinks.forEach((link) => {
        link.style.animation = ""
      })
    }
  })
}

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


navSlide()
