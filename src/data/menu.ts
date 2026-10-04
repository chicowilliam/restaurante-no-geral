export const menu = {
  season: {
    eyebrow: 'O que nos move',
    heading: 'A estação no prato.',
    copy: 'Nosso menu acompanha o ritmo dos ingredientes. Escolhemos o que está no melhor momento e deixamos que sabor, textura e origem conduzam cada prato.',
    link: 'Conheça o menu da estação',
    edition: 'Ingredientes no seu tempo',
    image: '/images/seasonal.webp',
    imageAlt: 'Prato de abóbora assada com ervas e sementes em cerâmica artesanal',
    imageCaption: 'Abóbora assada, ervas frescas e o melhor da estação',
  },
  eyebrow: 'Seleção da casa',
  heading: 'Do primeiro encontro ao último sabor.',
  intro: 'Pratos guiados pelo ingrediente, pela estação e pelo fogo. Escolha o caminho da sua mesa.',
  featured: {
    image: '/images/plate.webp',
    alt: 'Peixe grelhado com tomates e ervas em prato de cerâmica',
    caption: 'Peixe do dia na brasa · o frescor encontra o fogo',
  },
  categories: [
    {
      name: 'Para começar',
      dishes: [
        { name: 'Pão da casa', description: 'Manteiga de ervas e sal de brasa', price: '26' },
        { name: 'Tomates da estação', description: 'Coalhada fresca, manjericão e azeite verde', price: '48' },
        { name: 'Cogumelos tostados', description: 'Creme de castanhas e pão crocante', price: '54' },
      ],
    },
    {
      name: 'Da cozinha',
      dishes: [
        { name: 'Peixe do dia na brasa', description: 'Caldo de legumes tostados, folhas e limão', price: '96' },
        { name: 'Arroz cremoso de cogumelos', description: 'Queijo curado, alho assado e salsinha', price: '82' },
        { name: 'Frango caipira assado', description: 'Purê de milho, conserva da casa e jus', price: '89' },
        { name: 'Abóbora na brasa', description: 'Grãos, iogurte de ervas e sementes tostadas', price: '72' },
      ],
    },
    {
      name: 'Para terminar',
      dishes: [
        { name: 'Figo, mel e coalhada', description: 'Fruta fresca, crocante de nozes', price: '38' },
        { name: 'Chocolate e café', description: 'Creme de chocolate, café coado e sal', price: '42' },
        { name: 'Sorvete da estação', description: 'Duas bolas, compota de fruta da casa', price: '32' },
      ],
    },
  ],
  footnote: 'A seleção pode mudar conforme a disponibilidade dos ingredientes. Valores em reais.',
  action: 'Reservar para provar',
} as const;
