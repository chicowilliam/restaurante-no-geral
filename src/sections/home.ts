import { restaurant } from '../data/restaurant';
import { menu } from '../data/menu';
import { image } from '../components/media';

const r = restaurant;

function header(): string {
  return `<header class="site-header" id="topo">
    <div class="editorial-container site-header__inner">
      <a class="site-header__brand" href="#topo" aria-label="${r.name}, início">${r.name}</a>
      <button class="site-header__toggle" type="button" aria-label="Abrir menu" aria-controls="main-navigation" aria-expanded="false"><span></span><span></span></button>
      <nav class="site-header__nav" id="main-navigation" aria-label="Navegação principal">
        ${r.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
        <a class="site-header__mobile-reserve" href="#reservas">Reservar mesa</a>
      </nav>
      <a class="button button--header site-header__cta" href="#reservas">Reservar mesa</a>
    </div>
  </header>`;
}

function hero(): string {
  return `<section class="hero" aria-labelledby="hero-title">
    ${image({ src: '/images/hero.webp', alt: 'Peixe grelhado com legumes em prato de cerâmica sobre mesa de madeira', width: 1920, height: 1081, className: 'hero__image', eager: true })}
    <div class="hero__shade" aria-hidden="true"></div>
    <div class="editorial-container hero__inner">
      <div class="hero__content">
        <p class="eyebrow hero__eyebrow">${r.hero.eyebrow}</p>
        <h1 class="display hero__title" id="hero-title"><span class="hero__title-line">${r.hero.headingLines[0]}</span><span class="hero__title-line"><em>${r.hero.headingLines[1]}</em></span><span class="hero__title-line">${r.hero.headingLines[2]}</span></h1>
        <p class="hero__description">${r.hero.description}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="#reservas">${r.hero.primaryAction}</a>
          <a class="button button--text" href="#cardapio">${r.hero.secondaryAction}</a>
        </div>
      </div>
      <div class="hero__meta">${r.hero.details.map((detail) => `<div class="hero__meta-item"><span class="hero__meta-label">${detail.label}</span><span class="hero__meta-value">${detail.value}</span></div>`).join('')}<a class="hero__scroll" href="#cardapio" aria-label="Descobrir o cardápio">Descubra <span aria-hidden="true">↓</span></a></div>
    </div>
  </section>`;
}

function season(): string {
  return `<section class="section section--light season" id="cardapio" aria-labelledby="season-title">
    <div class="editorial-container section-shell season__grid">
      <div class="section__header">
        <p class="eyebrow">${menu.season.eyebrow}</p>
        <p class="season__edition">${menu.season.edition}</p>
        <h2 class="display" id="season-title">${menu.season.heading}</h2>
      </div>
      <div class="section__copy">
        <p>${menu.season.copy}</p>
        <a class="text-link" href="#pratos">${menu.season.link}</a>
      </div>
      <figure class="image-frame season__image">${image({ src: menu.season.image, alt: menu.season.imageAlt, width: 1200, height: 800 })}<figcaption class="season__caption">${menu.season.imageCaption}</figcaption></figure>
    </div>
  </section>`;
}

function dishes(): string {
  return `<section class="section section--light dishes" id="pratos" aria-labelledby="dishes-title">
    <div class="editorial-container section-shell dishes__grid">
      <div class="dishes__intro">
        <p class="eyebrow">${menu.eyebrow}</p>
        <h2 class="display" id="dishes-title">${menu.heading}</h2>
        <p>${menu.intro}</p>
      </div>
      <div class="dishes__menu">
        <div class="dish-list">${menu.categories.map((category) => `<div class="dish-list__group"><h3 class="dish-list__category">${category.name}</h3><ul>${category.dishes.map((dish) => `<li class="dish-list__item"><div><h4>${dish.name}</h4><p>${dish.description}</p></div><span class="dish-list__price" aria-label="${dish.price} reais">${dish.price}</span></li>`).join('')}</ul></div>`).join('')}</div>
        <div class="dishes__footer"><p class="dishes__note">${menu.footnote}</p><a class="text-link" href="#reservas">${menu.action}</a></div>
      </div>
      <figure class="dishes__media image-frame">${image({ src: menu.featured.image, alt: menu.featured.alt, width: 1200, height: 800 })}<figcaption class="dishes__caption">${menu.featured.caption}</figcaption></figure>
    </div>
  </section>`;
}

function story(): string {
  return `<section class="section section--dark story" id="restaurante" aria-labelledby="story-title">
    <div class="editorial-container section-shell story__grid">
      <figure class="image-frame story__image">${image({ src: r.story.image, alt: r.story.imageAlt, width: 1600, height: 1001 })}<figcaption class="story__caption">${r.story.imageCaption}</figcaption></figure>
      <div class="story__content"><div class="section__header"><p class="eyebrow">${r.story.eyebrow}</p><h2 class="display" id="story-title">${r.story.heading}</h2></div><div class="section__copy"><p>${r.story.copy}</p><p>${r.story.technique}</p></div></div>
    </div>
  </section>`;
}

function history(): string {
  return `<section class="section section--light history" aria-labelledby="history-title">
    <div class="editorial-container section-shell history__grid">
      <div class="section__header history__header"><p class="eyebrow">${r.history.eyebrow}</p><h2 class="display" id="history-title">${r.history.heading}</h2></div>
      <div class="section__copy history__copy"><p>${r.history.copy}</p><p>${r.history.detail}</p></div>
      <blockquote class="history__quote"><p>${r.history.quote}</p><footer>${r.history.quoteAttribution}</footer></blockquote>
    </div>
  </section>`;
}

function chef(): string {
  return `<section class="section section--light chef" aria-labelledby="chef-title">
    <div class="editorial-container section-shell chef__grid">
      <div class="section__header chef__content"><p class="eyebrow">${r.chef.eyebrow}</p><h2 class="display" id="chef-title">${r.chef.heading}</h2><p class="section__copy">${r.chef.copy}</p></div>
      <figure class="image-frame chef__image">${image({ src: r.chef.image, alt: r.chef.imageAlt, width: 1000, height: 1333 })}<figcaption class="chef__caption"><span>${r.chef.name}</span><span>${r.chef.role}</span></figcaption></figure>
    </div>
  </section>`;
}

function producers(): string {
  return `<section class="section section--light producers" aria-labelledby="producers-title">
    <div class="editorial-container section-shell producers__grid">
      <figure class="image-frame producers__image">${image({ src: r.producers.image, alt: r.producers.imageAlt, width: 1200, height: 800 })}<figcaption class="producers__caption">${r.producers.imageCaption}</figcaption></figure>
      <div class="section__header producers__content"><p class="eyebrow">${r.producers.eyebrow}</p><h2 class="display" id="producers-title">${r.producers.heading}</h2><div class="section__copy"><p>${r.producers.copy}</p><p>${r.producers.detail}</p></div><p class="producers__sources-label">${r.producers.sourcesLabel}</p><dl class="producers__sources">${r.producers.sources.map((source) => `<div class="producers__source"><dt>${source.category}</dt><dd>${source.origin}</dd></div>`).join('')}</dl></div>
    </div>
  </section>`;
}

function gallery(): string {
  return `<section class="section section--dark gallery" id="ambiente" aria-labelledby="gallery-title">
    <div class="editorial-container section-shell">
      <div class="section__header gallery__header"><p class="eyebrow">${r.gallery.eyebrow}</p><h2 class="display" id="gallery-title">${r.gallery.heading}</h2><p class="section__copy">${r.gallery.copy}</p></div>
      <div class="gallery-grid">${r.gallery.images.map((item, index) => `<figure class="image-frame gallery__item gallery__item--${index + 1}">${image({ src: item.src, alt: item.alt, width: item.width, height: item.height })}<figcaption class="gallery__caption">${item.caption}</figcaption></figure>`).join('')}</div>
    </div>
  </section>`;
}

function quote(): string {
  return `<section class="section section--light quote" aria-label="Nossa maneira de receber"><div class="editorial-container section-shell"><blockquote><p>${r.quote.text}</p><footer>${r.quote.attribution}</footer></blockquote></div></section>`;
}

function visit(): string {
  return `<section class="section section--light visit" id="visite" aria-labelledby="visit-title">
    <div class="editorial-container section-shell visit__grid">
      <div class="section__header visit__intro"><p class="eyebrow">${r.visit.eyebrow}</p><h2 class="display" id="visit-title">${r.visit.heading}</h2></div>
      <div class="visit__details"><div class="visit__block"><h3>${r.visit.labels.address}</h3><address>${r.visit.address.join('<br>')}</address><a class="text-link visit__map-link" href="${r.visit.mapUrl}" target="_blank" rel="noopener noreferrer">${r.visit.mapLabel}</a></div><div class="visit__block"><h3>${r.visit.labels.hours}</h3><dl class="visit__hours">${r.visit.hours.map((entry) => `<div><dt>${entry.days}</dt><dd>${entry.hours}</dd></div>`).join('')}</dl></div><div class="visit__block visit__contact"><h3>${r.visit.labels.contact}</h3><a href="mailto:${r.visit.email}">${r.visit.email}</a><a href="tel:${r.visit.phoneHref}">${r.visit.phoneDisplay}</a></div></div>
    </div>
  </section>`;
}

function reservation(): string {
  return `<section class="section section--dark reservation" id="reservas" aria-labelledby="reservation-title"><div class="editorial-container section-shell reservation__inner"><p class="eyebrow">${r.reservation.eyebrow}</p><h2 class="display" id="reservation-title">${r.reservation.heading}</h2><p>${r.reservation.copy}</p><a class="button button--primary" href="mailto:${r.visit.email}?subject=${encodeURIComponent(r.reservation.emailSubject)}">${r.reservation.button}</a></div></section>`;
}

function footer(): string {
  return `<footer class="site-footer"><div class="editorial-container site-footer__inner"><div><a class="site-footer__brand" href="#topo" aria-label="${r.name}, voltar ao início">${r.name}</a><p>${r.footer.tagline}</p></div><div class="site-footer__contact"><address>${r.visit.address.join('<br>')}</address><a href="mailto:${r.visit.email}">${r.visit.email}</a></div><nav aria-label="Navegação do rodapé">${r.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}</nav><div class="site-footer__bottom"><small>© ${new Date().getFullYear()} ${r.footer.copyright}</small><a href="#topo">${r.footer.backToTop} <span aria-hidden="true">↑</span></a></div></div></footer>`;
}

export function home(): string {
  return `${header()}<main id="conteudo">${hero()}${season()}${dishes()}${story()}${history()}${chef()}${producers()}${gallery()}${quote()}${visit()}${reservation()}</main>${footer()}`;
}
