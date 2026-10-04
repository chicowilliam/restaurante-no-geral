export function initMotion(): void {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;

  const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  if (!targets.length) return;

  const reveal = (element: HTMLElement, immediate = false) => {
    if (immediate) element.classList.add('reveal-instant');
    element.classList.add('is-visible');
    observer.unobserve(element);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) reveal(entry.target as HTMLElement);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  // Only arm offscreen content; restored scroll positions must remain readable.
  targets.forEach((element) => {
    const delay = Number(element.dataset.delay ?? 0);
    element.style.setProperty('--reveal-delay', `${Number.isFinite(delay) ? Math.min(600, Math.max(0, delay)) : 0}ms`);
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0 && !element.closest('.hero')) {
      reveal(element, true);
    } else {
      element.classList.add('reveal-pending');
      observer.observe(element);
    }
  });

  const revealDestination = () => {
    const destination = document.getElementById(location.hash.slice(1));
    if (!destination) return;
    targets.forEach((element) => {
      if (destination.contains(element) || element.contains(destination)) reveal(element, true);
    });
  };

  const revealFocus = (event: FocusEvent) => {
    if (!(event.target instanceof Node)) return;
    targets.forEach((element) => {
      if (element.contains(event.target as Node)) reveal(element, true);
    });
  };

  const stopMotion = () => {
    if (!preference.matches) return;
    observer.disconnect();
    targets.forEach((element) => reveal(element, true));
    document.documentElement.classList.remove('motion-ready');
    document.removeEventListener('focusin', revealFocus);
    window.removeEventListener('hashchange', revealDestination);
    preference.removeEventListener('change', stopMotion);
  };

  document.addEventListener('focusin', revealFocus);
  window.addEventListener('hashchange', revealDestination);
  preference.addEventListener('change', stopMotion);
  revealDestination();
  // Establish the starting styles once, before enabling entrance transitions.
  void document.documentElement.offsetHeight;
  document.documentElement.classList.add('motion-ready');
}
