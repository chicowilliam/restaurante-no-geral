import { restaurant as r } from '../data/restaurant';

export const reservationHref = `mailto:${r.visit.email}?subject=${encodeURIComponent(r.reservation.emailSubject)}`;
type Page = 'home' | 'menu';

function destination(href: string, page: Page): string {
  return page === 'menu' && href.startsWith('#') ? `/${href}` : href;
}

export function header(page: Page = 'home'): string {
  return `<header class="site-header${page === 'menu' ? ' site-header--menu' : ''}" id="topo">
    <div class="editorial-container site-header__inner">
      <a class="site-header__brand" href="${page === 'home' ? '#topo' : '/'}" aria-label="${r.name}, início">${r.name}</a>
      <button class="site-header__toggle" type="button" aria-label="Abrir menu" aria-controls="main-navigation" aria-expanded="false"><span></span><span></span></button>
      <nav class="site-header__nav" id="main-navigation" aria-label="Navegação principal">
        ${r.navigation.map((item) => `<a href="${destination(item.href, page)}"${page === 'menu' && item.href === '/cardapio/' ? ' aria-current="page"' : ''}>${item.label}</a>`).join('')}
        <a class="site-header__mobile-reserve button button--primary" href="${reservationHref}">Reservar mesa</a>
      </nav>
      <a class="button button--primary site-header__cta" href="${reservationHref}">Reservar mesa</a>
    </div>
  </header>`;
}

export function footer(page: Page = 'home'): string {
  return `<footer class="site-footer"><div class="editorial-container site-footer__inner">
    <div><a class="site-footer__brand" href="${page === 'home' ? '#topo' : '/'}" aria-label="${r.name}, início">${r.name}</a><p>${r.descriptor}</p><p>${r.footer.demoNote}</p></div>
    <div class="site-footer__contact"><address>${r.visit.address.join('<br>')}</address><a href="mailto:${r.visit.email}">${r.visit.email}</a></div>
    <nav aria-label="Navegação do rodapé">${r.navigation.map((item) => `<a href="${destination(item.href, page)}">${item.label}</a>`).join('')}<a href="${reservationHref}">Reservar mesa</a></nav>
    <div class="site-footer__bottom"><small>© ${new Date().getFullYear()} ${r.footer.copyright}</small><a href="#topo">${r.footer.backToTop}</a></div>
  </div></footer>`;
}

export function mobileActions(page: Page = 'home'): string {
  return `<nav class="mobile-actions" aria-label="Ações rápidas"><a class="button button--outline" href="${page === 'menu' ? '#categorias' : '/cardapio/'}">Ver cardápio</a><a class="button button--primary" href="${reservationHref}">Reservar mesa</a></nav>`;
}
