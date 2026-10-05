import { header, footer, mobileActions } from '../components/chrome';
import { reservationButton } from '../components/reservation';
import { siteAtmosphere } from '../components/site-atmosphere';
import { menuIllustration } from '../components/menu-illustrations';
import { restaurant } from '../data/restaurant';
import { menuCategories, menuCopy, type MenuCategory, type MenuItem } from '../data/menu';

function menuItem(item: MenuItem): string {
  const price = item.price.toLocaleString('pt-BR', { minimumFractionDigits: Number.isInteger(item.price) ? 0 : 2, maximumFractionDigits: 2 });
  return `<li class="menu-item">
    <div class="menu-item__row"><h4 class="menu-item__name">${item.name}</h4><span class="menu-item__price">${price}</span></div>
    <p class="menu-item__description">${item.description}${item.tags?.length ? `<span class="menu-item__tags"> · ${item.tags.join(', ')}</span>` : ''}</p>
  </li>`;
}

function menuCategory(category: MenuCategory): string {
  return `<section class="menu-category" aria-labelledby="${category.id}">
    <h3 class="menu-category__heading" id="${category.id}">${category.label}</h3>
    ${category.description ? `<p class="menu-category__description">${category.description}</p>` : ''}
    <ul class="menu-category__items">${category.items.map(menuItem).join('')}</ul>
  </section>`;
}

function menuGroup(type: MenuCategory['type']): string {
  const group = menuCopy.groups.find((entry) => entry.id === type)!;
  const illustration = type === 'comidas' ? 'herb' : type === 'bar' ? 'glass' : type === 'vinhos' ? 'bottle' : undefined;
  return `<section class="menu-group" id="${type}" aria-labelledby="${type}-heading">
    <header class="menu-group__header"><h2 id="${type}-heading">${group.label}</h2>${illustration ? menuIllustration(illustration) : ''}</header>
    ${menuCategories.filter((category) => category.type === type).map((category) => `${category.id === 'sobremesas' ? `<div class="menu-sheet__interlude" aria-hidden="true">${menuIllustration('plate')}</div>` : ''}${menuCategory(category)}`).join('')}
  </section>`;
}

export function cardapio(): string {
  return `<div class="site-shell site-shell--menu" id="topo">${siteAtmosphere()}${header('menu')}
    <main id="conteudo" class="menu-page">
      <article class="menu-sheet" aria-labelledby="menu-heading">
        <header class="menu-sheet__masthead">
          <p class="menu-sheet__place">${restaurant.descriptor}<span>${restaurant.service.location}</span></p>
          <h1 id="menu-heading"><span class="menu-sheet__brand">${restaurant.name}</span><span class="menu-sheet__subtitle">${menuCopy.subtitle}</span></h1>
          <p class="menu-sheet__edition">${menuCopy.heading}<span>${menuCopy.pricesNote}</span></p>
        </header>
        <div class="menu-sheet__columns">
          <div class="menu-sheet__column">${menuGroup('comidas')}</div>
          <div class="menu-sheet__column">${menuGroup('bar')}${menuGroup('vinhos')}${menuGroup('sem-alcool')}</div>
        </div>
        <footer class="menu-sheet__notes">
          <div><p>${menuCopy.availabilityNote} ${menuCopy.allergyNote}</p><p class="menu-sheet__disclaimer">${menuCopy.disclaimer}</p></div>
          <dl class="menu-sheet__hours">${restaurant.visit.hours.map((entry) => `<div><dt>${entry.days}</dt><dd>${entry.hours}</dd></div>`).join('')}</dl>
          <div class="menu-sheet__reservation">${reservationButton(menuCopy.reservation.action)}</div>
        </footer>
      </article>
    </main>
    ${footer('menu')}${mobileActions('menu')}</div>`;
}
