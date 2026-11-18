// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Projects Data & Filtering
const projects = [
  {
    title: 'Responsive Portfolio Layout',
    category: 'html-css',
    description: 'A semantic HTML5 and CSS Grid personal showcase with responsive breakpoints.'
  },
  {
    title: 'Interactive Task Tracker',
    category: 'javascript',
    description: 'Dynamic DOM manipulation tool allowing users to add, filter, and complete daily tasks.'
  },
  {
    title: 'Accessible Landing Page',
    category: 'html-css',
    description: 'High-contrast UI component library built with ARIA labels and clean typography.'
  }
];

const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderProjects(filter = 'all') {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = '';

  const filtered = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  filtered.forEach(project => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p class="role">${project.category.toUpperCase()}</p>
      <p>${project.description}</p>
    `;
    projectsGrid.appendChild(card);
  });
}

if (projectsGrid) {
  renderProjects();
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });
}

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill out all fields before submitting.';
      formStatus.style.color = '#ef4444';
      return;
    }

    formStatus.textContent = `Thank you, ${name}! Your message has been sent.`;
    formStatus.style.color = '#10b981';
    contactForm.reset();
  });
}