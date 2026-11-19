/* =====================================================
   Code Crafters — CSC 216 Lab 2 Script
   ===================================================== */

/* ---------- 1. Shared: runs on every page ---------- */
const yearEl = document.querySelector('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const themeToggle = document.querySelector('.theme-toggle');
const THEME_KEY = 'team-theme';

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  }
}

const savedTheme = localStorage.getItem(THEME_KEY);
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });
}

/* ---------- 2. Projects page ---------- */
const projects = [
  { title: 'Personal landing page', category: 'html', description: 'A single semantic HTML page with headings, lists and links.' },
  { title: 'Responsive card grid', category: 'css', description: 'A layout that goes from one column on phones to three on laptops.' },
  { title: 'Tip calculator', category: 'js', description: 'Reads two inputs and updates the total as you type.' },
  { title: 'Accessible contact form', category: 'html', description: 'Labelled fields, helpful errors and keyboard-friendly controls.' },
  { title: 'Dark mode toggle', category: 'js', description: 'Switches the colour theme and remembers the choice.' },
  { title: 'Flexbox navigation bar', category: 'css', description: 'A header that collapses into a menu button on small screens.' },
  { title: 'Git & GitHub Pages workflow', category: 'git', description: 'Version-controlled repository deployed live with clean commit history.' },
  { title: 'Interactive grade tracker', category: 'js', description: 'Computes weighted semester averages dynamically in the browser.' }
];

const categoryNames = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
  git: 'Git'
};

const projectList = document.querySelector('#project-list');
const projectCount = document.querySelector('#project-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('#project-search');

let currentFilter = 'all';
let currentQuery = '';

function renderProjects() {
  const visible = projects.filter((project) => {
    const matchesCategory = currentFilter === 'all' || project.category === currentFilter;
    const matchesSearch = project.title.toLowerCase().includes(currentQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  projectList.replaceChildren();

  if (visible.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'No projects match your search and filter.';
    projectList.append(emptyMsg);
  } else {
    visible.forEach((project) => {
      const card = document.createElement('article');
      card.className = 'card';

      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = categoryNames[project.category];

      const heading = document.createElement('h3');
      heading.textContent = project.title;

      const text = document.createElement('p');
      text.textContent = project.description;

      card.append(tag, heading, text);
      projectList.append(card);
    });
  }

  projectCount.textContent = `Showing ${visible.length} of ${projects.length} projects`;
}

if (projectList) {
  renderProjects();

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      currentFilter = button.dataset.filter;
      renderProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentQuery = searchInput.value.trim();
      renderProjects();
    });
  }
}

/* ---------- 3. Contact page ---------- */
const form = document.querySelector('#contact-form');
const DRAFT_KEY = 'contact-message-draft';

if (form) {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');
  const charCount = document.querySelector('#char-count');
  const statusEl = document.querySelector('#form-status');

  const savedDraft = localStorage.getItem(DRAFT_KEY);
  if (savedDraft) {
    messageInput.value = savedDraft;
    charCount.textContent = savedDraft.length;
  }

  messageInput.addEventListener('input', () => {
    charCount.textContent = messageInput.value.length;
    localStorage.setItem(DRAFT_KEY, messageInput.value);
  });

  function showError(input, message) {
    const errorEl = document.querySelector(`#${input.id}-error`);
    errorEl.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Please enter your name.');
      isValid = false;
    } else {
      showError(nameInput, '');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, 'Enter an email address like name@example.com.');
      isValid = false;
    } else {
      showError(emailInput, '');
    }

    if (messageInput.value.trim().length < 20) {
      showError(messageInput, 'Your message needs at least 20 characters.');
      isValid = false;
    } else {
      showError(messageInput, '');
    }

    return isValid;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    statusEl.textContent = '';

    if (!validateForm()) {
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    const firstName = nameInput.value.trim().split(' ')[0];
    statusEl.textContent = `Thanks, ${firstName}! Your message is ready.`;
    localStorage.removeItem(DRAFT_KEY);
    form.reset();
    charCount.textContent = '0';
  });
}