/* ==============================
   SOHAM ROY — Portfolio Scripts
   ============================== */

(function () {
  'use strict';

  // ─── Theme Toggle ───
  // The saved theme is applied by an inline script in <head> before first paint.
  // Without a saved choice, the CSS follows the system preference.
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const STORAGE_KEY = 'sr-theme';
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // Storage unavailable (private mode, blocked): the choice lasts for this visit only.
    }
  });
})();
