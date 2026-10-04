export type MenuItem = {
  name: string;
  description: string;
  price: number;
  featured?: boolean;
  image?: string;
  alt?: string;
  tags?: string[];
};

export type MenuCategory = {
  id: string;
  label: string;
  description: string;
  type: 'comidas' | 'bar' | 'vinhos' | 'sem-alcool';
  items: MenuItem[];
};

export const menuCopy = {
  eyebrow: 'À mesa no Lume',
  heading: 'Cardápio',
  intro: 'Da primeira entrada ao último gole: ingredientes de estação, fogo e tempo à mesa.',
  disclaimer: 'Cardápio demonstrativo. Pratos, bebidas e valores ilustrativos, sujeitos à disponibilidade dos ingredientes.',
  navigationLabel: 'Categorias do cardápio',
  reservation: { heading: 'Sua próxima mesa.', copy: 'Escolha o dia e venha provar a estação.', action: 'Reservar mesa' },
  groups: [
    { id: 'comidas', label: 'Comidas', eyebrow: 'Nossa cozinha', description: 'Para começar, compartilhar e terminar.' },
    { id: 'bar', label: 'Bar', eyebrow: 'Do balcão', description: 'Um brinde antes, durante ou depois.' },
    { id: 'vinhos', label: 'Vinhos', eyebrow: 'A carta', description: 'Uma seleção para acompanhar sua mesa.' },
    { id: 'sem-alcool', label: 'Sem álcool', eyebrow: 'Outro ritmo', description: 'Frescor e pequenas pausas.' },
  ] satisfies { id: MenuCategory['type']; label: string; eyebrow: string; description: string }[],
  photos: [
    { after: 'comidas', src: '/images/seasonal.webp', alt: 'Abóbora na brasa com iogurte, sementes e ervas', caption: 'A estação encontra a brasa.', width: 1200, height: 800 },
    { after: 'bar', src: '/images/bar.webp', alt: 'Bar do Lume com bancos, copos e garrafas sobre o balcão', caption: 'Entre um prato e outro, um brinde.', width: 1600, height: 1001 },
  ],
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'entradas', label: 'Para começar', description: 'Pequenos pratos para abrir a mesa.', type: 'comidas',
    items: [
      { name: 'Pão da casa', description: 'Manteiga de ervas e sal de brasa', price: 26 },
      { name: 'Tomates da estação', description: 'Coalhada fresca, manjericão e azeite verde', price: 48, featured: true, image: '/images/tomates-coalhada.webp', alt: 'Tomates frescos servidos com coalhada, manjericão e azeite verde', tags: ['Vegetariano'] },
      { name: 'Cogumelos tostados', description: 'Creme de castanhas e pão crocante', price: 54, tags: ['Vegetariano'] },
      { name: 'Croquete de costela', description: 'Carne desfiada, aioli de limão e pimenta da casa', price: 42 },
      { name: 'Crudo do dia', description: 'Peixe fresco, cítricos, pepino e ervas', price: 62 },
      { name: 'Folhas e queijo de cabra', description: 'Pera fresca, nozes e vinagrete de mel', price: 46, tags: ['Vegetariano'] },
    ],
  },
  {
    id: 'principais', label: 'Da cozinha', description: 'A brasa encontra o melhor do dia.', type: 'comidas',
    items: [
      { name: 'Peixe do dia na brasa', description: 'Caldo de legumes tostados, folhas e limão', price: 96, featured: true, image: '/images/plate.webp', alt: 'Peixe grelhado com tomates assados e ervas em prato de cerâmica' },
      { name: 'Arroz cremoso de cogumelos', description: 'Queijo curado, alho assado e salsinha', price: 82, tags: ['Vegetariano'] },
      { name: 'Frango caipira assado', description: 'Purê de milho, conserva da casa e jus', price: 89 },
      { name: 'Abóbora na brasa', description: 'Grãos, iogurte de ervas e sementes tostadas', price: 72, featured: true, image: '/images/seasonal.webp', alt: 'Abóbora assada com iogurte, grãos, sementes e ervas em prato de cerâmica', tags: ['Vegetariano'] },
      { name: 'Costela de cocção lenta', description: 'Purê de mandioca, cebola tostada e molho do assado', price: 108 },
      { name: 'Nhoque de batata', description: 'Tomates assados, manteiga de sálvia e queijo curado', price: 78, tags: ['Vegetariano'] },
      { name: 'Bife de chorizo', description: 'Batatas rústicas, folhas e chimichurri da casa', price: 118 },
    ],
  },
  {
    id: 'sobremesas', label: 'Para terminar', description: 'Um pouco de doce, sem pressa.', type: 'comidas',
    items: [
      { name: 'Figo, mel e coalhada', description: 'Fruta fresca, crocante de nozes', price: 38, featured: true, image: '/images/figos-coalhada.webp', alt: 'Figos frescos com coalhada, mel e crocante de nozes em prato de cerâmica' },
      { name: 'Chocolate e café', description: 'Creme de chocolate, café coado e sal', price: 42 },
      { name: 'Sorvete da estação', description: 'Duas bolas, compota de fruta da casa', price: 32 },
      { name: 'Pudim de baunilha', description: 'Caramelo e creme fresco', price: 34 },
      { name: 'Pera assada', description: 'Especiarias, sorvete de nata e farofa de amêndoas', price: 36 },
    ],
  },
  {
    id: 'coqueteis', label: 'Coquetéis', description: 'Clássicos e misturas da casa.', type: 'bar',
    items: [
      { name: 'Gim da estação', description: 'Gim, tônica, cítricos e ervas frescas', price: 38, featured: true },
      { name: 'Caju e brasa', description: 'Cachaça, caju, limão e toque de rapadura', price: 36, featured: true },
      { name: 'Negroni da casa', description: 'Gim, vermute rosso e bitter', price: 42, featured: true },
      { name: 'Caipirinha', description: 'Cachaça, limão fresco e açúcar', price: 32 },
      { name: 'Martíni seco', description: 'Gim, vermute seco e azeitona', price: 40 },
      { name: 'Spritz cítrico', description: 'Aperitivo, espumante, soda e laranja', price: 36 },
    ],
  },
  {
    id: 'cervejas', label: 'Cervejas', description: 'Servidas bem geladas.', type: 'bar',
    items: [
      { name: 'Pilsen artesanal', description: 'Leve e refrescante · 350 ml', price: 22 },
      { name: 'IPA artesanal', description: 'Notas cítricas e amargor presente · 350 ml', price: 26 },
      { name: 'Lager sem álcool', description: 'Malte leve e final fresco · 350 ml', price: 20 },
    ],
  },
  {
    id: 'carta-de-vinhos', label: 'Nossa seleção', description: 'Taças para acompanhar a refeição.', type: 'vinhos',
    items: [
      { name: 'Espumante brut', description: 'Brasil · fresco e delicado · taça 150 ml', price: 34 },
      { name: 'Branco da casa', description: 'Portugal · cítrico e mineral · taça 150 ml', price: 32 },
      { name: 'Rosé da casa', description: 'Brasil · frutas vermelhas e frescor · taça 150 ml', price: 32 },
      { name: 'Tinto da casa', description: 'Argentina · fruta madura e taninos macios · taça 150 ml', price: 36 },
    ],
  },
  {
    id: 'bebidas-sem-alcool', label: 'Frescos e quentes', description: 'Do primeiro refresco ao café.', type: 'sem-alcool',
    items: [
      { name: 'Água mineral', description: 'Com ou sem gás · 300 ml', price: 8 },
      { name: 'Limonada de ervas', description: 'Limão, hortelã e alecrim · 300 ml', price: 18 },
      { name: 'Suco da estação', description: 'Fruta fresca do dia · 300 ml', price: 16 },
      { name: 'Café coado', description: 'Grãos brasileiros, preparo na hora', price: 10 },
      { name: 'Infusão da casa', description: 'Ervas frescas e especiarias', price: 12 },
    ],
  },
];

export const featuredDishes = menuCategories
  .filter((category) => category.type === 'comidas')
  .flatMap((category) => category.items.filter((item) => item.featured).map((item) => ({ ...item, category: category.label })));

export const barHighlights = menuCategories
  .filter((category) => category.type === 'bar')
  .flatMap((category) => category.items.filter((item) => item.featured));
