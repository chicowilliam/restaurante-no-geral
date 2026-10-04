import { restaurant } from './restaurant';

export const site = {
  title: `${restaurant.name} | Cozinha de estação em São Paulo`,
  description: 'Restaurante de cozinha de estação em Pinheiros, São Paulo. Ingredientes do momento, pratos na brasa e uma mesa para compartilhar. Consulte o menu e reserve.',
  locale: 'pt_BR',
  socialImage: '/images/hero.webp',
  socialImageAlt: 'Prato de peixe grelhado com legumes à mesa no Lume',
  socialImageWidth: 1920,
  socialImageHeight: 1081,
} as const;
