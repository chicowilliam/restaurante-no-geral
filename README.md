# Lume — site de restaurante

Website de restaurante com Home e cardápio completo em `/cardapio/`. O projeto usa Vite, HTML semântico, TypeScript e Tailwind CSS, sem framework de interface.

## Desenvolvimento

```bash
npm ci
npm run dev
```

`npm run build` executa a verificação de tipos e gera a versão de produção em `dist/`. `npm run preview` serve essa versão localmente.

Conteúdo, horários, contato e links de navegação ficam em `src/data/restaurant.ts`; pratos e preços ficam em `src/data/menu.ts`. Tokens visuais ficam em `src/styles/tokens.css`. As imagens estão em `public/images/`.

As duas páginas são geradas como HTML estático pelo Vite (MPA), com Header, Footer e ações mobile compartilhados em `src/components/chrome.ts`. O cardápio é demonstrativo e deve ser confirmado antes de uso comercial. As fotografias de tomates e figos são imagens ilustrativas geradas para a demonstração.

Os dados de identidade e contato são ilustrativos. Substitua o endereço de email `.example`, telefone, endereço, domínio canônico e informações operacionais antes de publicar ou receber reservas reais.

## Deploy na Vercel

O projeto está configurado para Vercel em `vercel.json`:

```bash
npm ci
npm run build
```

A saída de produção fica em `dist/`. Depois de definir o domínio público, configure `SITE_URL` na Vercel com a origem HTTPS final da Home. Essa variável ativa canonical, Open Graph absoluto, sitemap e robots com a URL correta.
