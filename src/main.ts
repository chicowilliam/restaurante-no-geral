import './styles/main.css';
import './styles/typography.css';
import './styles/site-atmosphere.css';
import './styles/handoffs.css';
import './styles/buttons.css';
import './styles/motion.css';
import './styles/reservation.css';
import './styles/menu-sheet.css';
import 'lenis/dist/lenis.css';
import { initMotion } from './lib/motion';
import { initReservation } from './components/reservation';

initMotion();
initReservation();

const menuButton = document.querySelector<HTMLButtonElement>('.site-header__toggle');
const navigation = document.querySelector<HTMLElement>('.site-header__nav');

if (menuButton && navigation) {
  const closeMenu = (restoreFocus = false) => {
    const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('is-open');
    if (restoreFocus && wasOpen) menuButton.focus();
  };

  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
    navigation.classList.toggle('is-open', opening);
    if (opening) navigation.querySelector<HTMLAnchorElement>('a')?.focus();
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a, [data-reservation-open]')) closeMenu(!event.target.closest('[data-reservation-open]'));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu(true);
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });

  window.matchMedia('(min-width: 769px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
}
