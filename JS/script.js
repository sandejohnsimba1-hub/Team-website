/* =====================================================
   Team website JavaScript (CSC 216, Lab 2)
   ===================================================== */

// 1. Dynamic year in footer and mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
      siteNav.classList.toggle("open");
    });
  }

  // 2. Dark mode toggle with localStorage persistence
  const themeToggle = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", "true");
      themeToggle.textContent = "Light mode";
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      themeToggle.setAttribute("aria-pressed", isDark);
      themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // 3. Dynamic projects rendering and filtering
  const projects = [
    { title: "Personal Portfolio", category: "html", description: "A responsive personal portfolio built with semantic HTML5 markup.", link: "#" },
    { title: "Flexbox Layout Lab", category: "css", description: "A multi-column card layout built using CSS Flexbox properties.", link: "#" },
    { title: "Interactive Calculator", category: "js", description: "A fully functional browser calculator built using vanilla JavaScript DOM manipulation.", link: "#" }
    { title: "Git Version Control Workflow", category: "git", description: "A documented branching and merging workflow for collaborative development.", link: "#" } 
  ];

  const projectList = document.getElementById("project-list");
  const projectCount = document.getElementById("project-count");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function renderProjects(filter) {
    if (!projectList) return;
    const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);
    projectList.innerHTML = filtered.map(p => `
      <article class="card">
        <span class="tag">${p.category.toUpperCase()}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <a class="button" href="${p.link}">View project</a>
      </article>
    `).join("");
    if (projectCount) {
      projectCount.textContent = `Showing ${filtered.length} of ${projects.length} projects`;
    }
  }

  if (projectList) {
    renderProjects("all");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        renderProjects(btn.dataset.filter);
      });
    });
  }

  // 4. Contact form validation and live character count
  const contactForm = document.getElementById("contact-form");
  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("char-count");
  const formStatus = document.getElementById("form-status");

  if (messageInput && charCount) {
    messageInput.addEventListener("input", () => {
      charCount.textContent = messageInput.value.length;
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");

      // Simple validation checks
      [nameInput, emailInput, messageInput].forEach(input => {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (!input.value.trim()) {
          isValid = false;
          input.setAttribute("aria-invalid", "true");
          if (errorEl) errorEl.textContent = "This field is required.";
        } else {
          input.setAttribute("aria-invalid", "false");
          if (errorEl) errorEl.textContent = "";
        }
      });

      if (messageInput && messageInput.value.trim().length < 20) {
        isValid = false;
        messageInput.setAttribute("aria-invalid", "true");
        const msgError = document.getElementById("message-error");
        if (msgError) msgError.textContent = "Message must be at least 20 characters.";
      }

      if (isValid) {
        if (formStatus) formStatus.textContent = "Thank you! Your message has been sent successfully.";
        contactForm.reset();
        if (charCount) charCount.textContent = "0";
      } else {
        if (formStatus) formStatus.textContent = "";
      }
    });
  }
});