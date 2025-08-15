// scripts/scripts.js
// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });
}
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const THEME_KEY = 'demo-theme';
function applyTheme(t) {
  if (t === 'dark') {
    root.style.setProperty('--bg', '#0f172a');
    root.style.setProperty('--ink', '#e5e7eb');
  } else {
    root.style.setProperty('--bg', '#ffffff');
    root.style.setProperty('--ink', '#222222');
  }
}
const saved = localStorage.getItem(THEME_KEY);
if (saved) applyTheme(saved);
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = (localStorage.getItem(THEME_KEY) === 'dark') ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
  });
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Simple newsletter interactivity
const newsForm = document.getElementById('newsletterForm');
if (newsForm) {
  newsForm.addEventListener('submit', () => {
    document.getElementById('newsMsg').textContent = 'Thanks! Please check your inbox to confirm.';
  });
}

// Sortable table
const table = document.getElementById('recordsTable');
if (table) {
  table.querySelectorAll('th').forEach(th => {
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const idx = Array.from(th.parentNode.children).indexOf(th);
      const ascending = !th.classList.contains('sorted-asc');
      table.querySelectorAll('th').forEach(h => h.classList.remove('sorted-asc','sorted-desc'));
      th.classList.add(ascending ? 'sorted-asc' : 'sorted-desc');
      rows.sort((a, b) => {
        const A = a.children[idx].textContent.trim();
        const B = b.children[idx].textContent.trim();
        const numA = parseFloat(A), numB = parseFloat(B);
        if (!isNaN(numA) && !isNaN(numB)) return ascending ? numA - numB : numB - numA;
        return ascending ? A.localeCompare(B) : B.localeCompare(A);
      });
      rows.forEach(r => tbody.appendChild(r));
    });
  });
}

const contactForm = document.querySelector('form[action*="form-viewer"]');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const el = document.getElementById('formStatus');
    if (el) el.textContent = 'Submitting... (The form opens the viewer in a new tab)';
    contactForm.setAttribute('target', '_blank');
  });
}
