(() => {
  'use strict';

  const STORAGE_KEY = 'portfolio-theme';
  const themeToggle = document.querySelector('.theme-toggle');

  if (!themeToggle) {
    return;
  }

  const themeIcon = themeToggle.querySelector('[aria-hidden="true"]');

  const getInitialTheme = () => {
    try {
      const savedTheme = window.localStorage.getItem(STORAGE_KEY);

      return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
    } catch {
      return 'light';
    }
  };

  const renderTheme = (theme) => {
    const isDark = theme === 'dark';

    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');

    if (themeIcon) {
      themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
  };

  let theme = getInitialTheme();

  const setTheme = (nextTheme) => {
    theme = nextTheme;
    renderTheme(theme);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Theme still works for the current page when storage is unavailable.
    }
  };

  renderTheme(theme);

  themeToggle.addEventListener('click', () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  });
})();
