(() => {
  'use strict';

  const HEADER_SCROLL_THRESHOLD = 60;
  const TOP_BUTTON_THRESHOLD = 300;
  const REVEAL_THRESHOLD = 0.2;

  const header = document.querySelector('.site-header');
  const scrollTopButton = document.querySelector('#scroll-top');
  const revealElements = document.querySelectorAll('[data-reveal]');

  const updateScrollUi = () => {
    header?.classList.toggle('scrolled', window.scrollY >= HEADER_SCROLL_THRESHOLD);
    scrollTopButton?.classList.toggle('visible', window.scrollY >= TOP_BUTTON_THRESHOLD);
  };

  const getScrollBehavior = () => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  );

  window.addEventListener('scroll', updateScrollUi, { passive: true });
  updateScrollUi();

  scrollTopButton?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });
  });

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
    return;
  }

  revealElements.forEach((element) => element.classList.add('reveal-ready'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: REVEAL_THRESHOLD });

  revealElements.forEach((element) => revealObserver.observe(element));
})();
