import { restaurant as r } from '../data/restaurant';
import { featuredDishes, barHighlights, menuCopy } from '../data/menu';
import { image } from '../components/media';
import { header, footer, mobileActions } from '../components/chrome';
import { reservationButton } from '../components/reservation';

function hero(): string {
  return `<section class="hero" aria-labelledby="hero-title">
    ${image({ src: '/images/hero.webp', alt: 'Peixe grelhado com legumes em prato de cerâmica sobre mesa de madeira', width: 1920, height: 1081, className: 'hero__image', eager: true })}
    <div class="hero__shade" aria-hidden="true"></div>
    <div class="editorial-container hero__inner">
      <div class="hero__content">
        <p class="eyebrow hero__eyebrow" data-reveal="fade" data-delay="80">${r.hero.eyebrow}</p>
        <h1 class="display hero__title" id="hero-title" data-reveal="line" data-delay="180"><span class="hero__title-line"><span class="reveal__content">${r.hero.headingLines[0]}</span></span><span class="hero__title-line"><span class="reveal__content"><em>${r.hero.headingLines[1]}</em></span></span><span class="hero__title-line"><span class="reveal__content">${r.hero.headingLines[2]}</span></span></h1>
        <p class="hero__description" data-reveal="fade" data-delay="380">${r.hero.description}</p>
        <div class="hero__actions" data-reveal="fade" data-delay="480">${reservationButton(r.hero.primaryAction)}<a class="button button--outline" href="/cardapio/">${r.hero.secondaryAction}</a></div>
      </div>
      <div class="hero__meta" data-reveal="fade" data-delay="550">${r.hero.details.map((detail) => `<div class="hero__meta-item"><span class="hero__meta-label">${detail.label}</span><span class="hero__meta-value">${detail.value}</span></div>`).join('')}</div>
    </div>
  </section>`;
}

function service(): string {
  const s = r.service;
  return `<section class="service-strip" aria-label="Informações de serviço"><dl class="editorial-container service-strip__grid" data-reveal="stagger"><div><dt>${r.visit.hours[0].days}</dt><dd><a href="#visite">${r.visit.hours[0].hours}</a></dd></div><div><dt>${s.locationLabel}</dt><dd><a href="#visite">${s.location}</a></dd></div><div><dt>${s.cuisineLabel}</dt><dd>${s.cuisine}</dd></div><div><dt>${s.reservationLabel}</dt><dd>${reservationButton(s.reservationAction, 'service-strip__reserve')}</dd></div></dl></section>`;
}

function dishes(): string {
  return `<section class="section section--light highlights" id="cardapio" aria-labelledby="dishes-title"><div class="editorial-container section-shell">
    <div class="highlights__heading"><div><p class="eyebrow">${r.highlights.label}</p><h2 class="display" id="dishes-title" data-reveal="line"><span class="reveal__content">${r.highlights.heading}</span></h2></div><p>${r.highlights.copy}</p></div>
    <ul class="dish-list" aria-label="Pratos em destaque">${featuredDishes.map((dish, index) => `<li class="dish-feature" data-reveal="product" data-delay="${index % 2 * 90}"><figure>${image({ src: dish.image!, alt: dish.alt!, width: 1200, height: 800, srcset: `${dish.image!.replace('.webp', '-600.webp')} 600w, ${dish.image} 1200w`, sizes: '(max-width: 767px) calc(100vw - 40px), (max-width: 1024px) 44vw, 640px' })}</figure><div class="dish-feature__heading"><p class="dish-feature__meta">${dish.category}</p><h3>${dish.name}</h3><span class="dish-feature__price">R$ ${dish.price}</span></div><p>${dish.description}</p></li>`).join('')}</ul>
    <div class="highlights__actions"><a class="button button--outline" href="/cardapio/">${r.highlights.action}</a><p>${menuCopy.disclaimer}</p></div>
  </div></section>`;
}

function bar(): string {
  return `<section class="bar-section" aria-labelledby="bar-title"><div class="editorial-container section-shell bar-section__grid"><figure class="bar-section__image" data-reveal="image">${image({ src: r.bar.image, alt: r.bar.imageAlt, width: 1600, height: 1001 })}</figure><div class="bar-section__content"><p class="eyebrow">${r.bar.label}</p><h2 id="bar-title">${r.bar.heading}</h2><p>${r.bar.copy}</p><ul class="bar-list">${barHighlights.map((drink) => `<li class="bar-list__item"><div><h3>${drink.name}</h3><span>R$ ${drink.price}</span></div><p>${drink.description}</p></li>`).join('')}</ul><a class="button button--outline" href="/cardapio/#bar">${r.bar.action}</a></div></div></section>`;
}

function kitchen(): string {
  return `<section class="section section--dark kitchen-section" id="restaurante" aria-labelledby="kitchen-title"><div class="editorial-container section-shell kitchen-section__grid"><figure class="kitchen-section__image" data-reveal="image">${image({ src: r.story.image, alt: r.story.imageAlt, width: 1600, height: 1001 })}</figure><div class="kitchen-section__content"><p class="eyebrow">${r.story.eyebrow}</p><h2 id="kitchen-title">${r.kitchen.heading}</h2>${r.kitchen.paragraphs.map((copy) => `<p>${copy}</p>`).join('')}<div class="kitchen-section__chef">${image({ src: r.chef.image, alt: 'Chef em sua bancada de trabalho na cozinha', width: 1000, height: 1333 })}<div><h3>${r.chef.name}</h3><p>${r.chef.role}</p></div></div></div></div></section>`;
}

function gallery(): string {
  return `<section class="section section--dark gallery" id="ambiente" aria-labelledby="gallery-title"><div class="editorial-container section-shell"><div class="section__header gallery__header"><p class="eyebrow">${r.gallery.eyebrow}</p><h2 id="gallery-title">${r.gallery.heading}</h2><p class="section__copy">${r.gallery.copy}</p></div><div class="gallery-grid" data-reveal="fade">${r.gallery.images.slice(0, 3).map((item, index) => `<figure class="image-frame gallery__item gallery__item--${index + 1}">${image({ src: item.src, alt: item.alt, width: item.width, height: item.height })}<figcaption class="gallery__caption">${item.caption}</figcaption></figure>`).join('')}</div></div></section>`;
}

function visit(): string {
  return `<section class="section section--light visit" id="visite" aria-labelledby="visit-title"><div class="editorial-container section-shell visit__grid"><div class="section__header visit__intro"><p class="eyebrow">${r.visit.eyebrow}</p><h2 id="visit-title" data-reveal="line"><span class="reveal__content">${r.visit.heading}</span></h2></div><div class="visit__details">
    <div class="visit__block"><h3>${r.visit.labels.address}</h3><address>${r.visit.address.join('<br>')}</address><a class="text-link visit__map-link" href="${r.visit.mapUrl}" target="_blank" rel="noopener noreferrer">${r.visit.mapLabel}</a></div>
    <div class="visit__block"><h3>${r.visit.labels.hours}</h3><dl class="visit__hours">${r.visit.hours.map((entry) => `<div><dt>${entry.days}</dt><dd>${entry.hours}</dd></div>`).join('')}</dl></div>
    <div class="visit__block visit__contact"><h3>${r.visit.labels.contact}</h3><a href="mailto:${r.visit.email}">${r.visit.email}</a><a href="tel:${r.visit.phoneHref}">${r.visit.phoneDisplay}</a></div>
    <div class="visit__block"><h3>Reservas</h3><p>${r.reservation.copy}</p>${reservationButton(r.reservation.button)}</div>
  </div></div></section>`;
}

function reservation(): string {
  return `<section class="section section--dark reservation" id="reservas" aria-labelledby="reservation-title"><div class="editorial-container section-shell reservation__inner"><p class="eyebrow">${r.reservation.eyebrow}</p><h2 id="reservation-title" data-reveal="line"><span class="reveal__content">${r.reservation.heading}</span></h2><p>${r.service.location}<br>${r.service.hoursSummary}</p>${reservationButton(r.reservation.button)}</div></section>`;
}

export function home(): string {
  return `${header()}<main id="conteudo">${hero()}${service()}${dishes()}${bar()}${kitchen()}${gallery()}${visit()}${reservation()}</main>${footer()}${mobileActions()}`;
}
