import { header, footer, mobileActions, reservationHref } from '../components/chrome';
import { image } from '../components/media';
import { menuCategories, menuCopy, type MenuCategory, type MenuItem } from '../data/menu';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function menuItem(item: MenuItem): string {
  return `<li class="menu-item">
    <div class="menu-item__row"><h4 class="menu-item__name">${item.name}</h4><span class="menu-item__price">${currency.format(item.price)}</span></div>
    <p class="menu-item__description">${item.description}</p>
    ${item.tags?.length ? `<p class="menu-item__tags">${item.tags.join(' · ')}</p>` : ''}
  </li>`;
}

function menuCategory(category: MenuCategory): string {
  return `<section class="menu-category" aria-labelledby="${category.id}">
    <h3 class="menu-category__heading" id="${category.id}">${category.label}</h3>
    <p class="menu-category__description">${category.description}</p>
    <ul class="menu-category__items">${category.items.map(menuItem).join('')}</ul>
  </section>`;
}

function menuPhoto(src: string, alt: string, caption: string, width: number, height: number): string {
  return `<figure class="menu-photo">${image({ src, alt, width, height, className: 'menu-photo__image' })}<figcaption class="menu-photo__caption">${caption}</figcaption></figure>`;
}

export function cardapio(): string {
  return `${header('menu')}
    <main id="conteudo" class="menu-page">
      <section class="menu-intro" aria-labelledby="menu-heading">
        <div class="menu-intro__inner">
          <p class="menu-intro__eyebrow eyebrow">${menuCopy.eyebrow}</p>
          <h1 class="menu-intro__heading" id="menu-heading">${menuCopy.heading}</h1>
          <p class="menu-intro__copy">${menuCopy.intro}</p>
          <p class="menu-intro__note">${menuCopy.disclaimer}</p>
        </div>
      </section>
      <nav class="menu-category-nav" id="categorias" aria-label="${menuCopy.navigationLabel}"><div class="menu-category-nav__inner">${menuCopy.groups.map((group) => `<a href="#${group.id}">${group.label}</a>`).join('')}</div></nav>
      <div class="menu-layout">
        ${menuCopy.groups.map((group) => `<section class="menu-group" id="${group.id}" aria-labelledby="${group.id}-heading">
          <header class="menu-group__header"><p class="menu-group__eyebrow eyebrow">${group.eyebrow}</p><h2 class="menu-group__title" id="${group.id}-heading">${group.label}</h2><p class="menu-group__description">${group.description}</p></header>
          <div class="menu-group__categories">${menuCategories.filter((category) => category.type === group.id).map(menuCategory).join('')}</div>
        </section>${menuCopy.photos.filter((photo) => photo.after === group.id).map((photo) => menuPhoto(photo.src, photo.alt, photo.caption, photo.width, photo.height)).join('')}`).join('')}
      </div>
      <section class="menu-reservation" aria-labelledby="menu-reservation-heading"><div class="menu-reservation__inner"><h2 id="menu-reservation-heading">${menuCopy.reservation.heading}</h2><p>${menuCopy.reservation.copy}</p><a class="button button--primary" href="${reservationHref}">${menuCopy.reservation.action}</a></div></section>
    </main>
    ${footer('menu')}${mobileActions('menu')}`;
}
