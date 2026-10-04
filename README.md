# Lume — site de restaurante

Fundação de uma página editorial para um restaurante fictício. O projeto usa Vite, HTML semântico, TypeScript e Tailwind CSS, sem framework de interface.

## Desenvolvimento

```bash
npm ci
npm run dev
```

`npm run build` executa a verificação de tipos e gera a versão de produção em `dist/`. `npm run preview` serve essa versão localmente.

Conteúdo, horários, contato e links de navegação ficam em `src/data/restaurant.ts`; pratos e preços ficam em `src/data/menu.ts`. Tokens visuais ficam em `src/styles/tokens.css`. As imagens estão em `public/images/`.

Os dados de identidade e contato são ilustrativos. Substitua o endereço de email `.example`, telefone, endereço, domínio canônico e informações operacionais antes de publicar ou receber reservas reais.

## Deploy na Vercel

O projeto está configurado para Vercel em `vercel.json`:

```bash
npm ci
npm run build
```

A saída de produção fica em `dist/`. Depois de definir o domínio público, configure `SITE_URL` na Vercel com a origem HTTPS final da Home. Essa variável ativa canonical, Open Graph absoluto, sitemap e robots com a URL correta.
