/* ==============================
   SOHAM ROY — Portfolio Scripts
   ============================== */

(function () {
  'use strict';

  // ─── Theme Toggle ───
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const STORAGE_KEY = 'sr-theme';

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Load saved theme or prefer system
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ─── Nav scroll effect ───
  const nav = document.getElementById('nav');

  const scrollHint = document.querySelector('.scroll-hint');

  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    if (scrollHint) {
      scrollHint.style.opacity = window.scrollY > 80 ? '0' : '';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── Smooth nav link active state ───
  const sections = document.querySelectorAll('.section, .intro');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--accent)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ─── Reveal on scroll (Intersection Observer) ───
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
