(() => {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) {
    return;
  }

  const menuLabel = navToggle.querySelector('.sr-only');
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  const setMenuOpen = (isOpen) => {
    navLinks.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));

    if (menuLabel) {
      menuLabel.textContent = isOpen ? '메뉴 닫기' : '메뉴 열기';
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const getScrollBehavior = () => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  );

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetSelector = link.getAttribute('href');
      const target = targetSelector ? document.querySelector(targetSelector) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: getScrollBehavior() });
      closeMenu();
    });
  });
})();
