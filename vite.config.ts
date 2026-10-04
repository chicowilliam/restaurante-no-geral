import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { home } from './src/sections/home';
import { cardapio } from './src/sections/cardapio';
import { restaurant } from './src/data/restaurant';
import { site } from './src/data/site';

function siteUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL deve ser a origem HTTPS pública, sem caminho, consulta ou fragmento.');
  }
  return `${url.origin}/`;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character] ?? character);
}

function metadata(baseUrl: string | undefined, page: 'home' | 'menu'): string {
  const title = page === 'menu' ? `Cardápio | ${restaurant.name} · Cozinha de estação` : site.title;
  const description = page === 'menu'
    ? 'Consulte o cardápio do Lume: entradas, pratos da estação, sobremesas, coquetéis, vinhos e bebidas sem álcool, com descrições e valores.'
    : site.description;
  const canonicalUrl = baseUrl && new URL(page === 'menu' ? 'cardapio/' : '', baseUrl).href;
  const imageUrl = baseUrl && new URL(site.socialImage.slice(1), baseUrl).href;
  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    description: site.description,
    servesCuisine: restaurant.descriptor,
    ...(baseUrl ? { url: baseUrl, image: imageUrl, hasMenu: new URL('cardapio/', baseUrl).href } : {}),
  };
  const schema = JSON.stringify(restaurantSchema).replace(/[<>&]/g, (character) => ({
    '<': '\\u003c', '>': '\\u003e', '&': '\\u0026',
  })[character] ?? character);

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    canonicalUrl ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />` : '<meta name="robots" content="noindex, follow" />',
    '<meta property="og:type" content="website" />',
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:site_name" content="${escapeHtml(restaurant.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    ...(baseUrl && imageUrl ? [
      `<meta property="og:url" content="${escapeHtml(canonicalUrl!)}" />`,
      `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
      `<meta property="og:image:alt" content="${escapeHtml(site.socialImageAlt)}" />`,
      `<meta property="og:image:width" content="${site.socialImageWidth}" />`,
      `<meta property="og:image:height" content="${site.socialImageHeight}" />`,
    ] : []),
    `<meta name="twitter:card" content="${imageUrl ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    ...(imageUrl ? [`<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`] : []),
    `<script type="application/ld+json">${schema}</script>`,
  ].join('\n    ');
}

function staticPages(baseUrl: string | undefined): Plugin {
  return {
    name: 'static-pages-and-indexing',
    transformIndexHtml(html) {
      const page = html.includes('<!-- MENU_CONTENT -->') ? 'menu' : 'home';
      return html.replace('<!-- SITE_META -->', metadata(baseUrl, page))
        .replace(page === 'menu' ? '<!-- MENU_CONTENT -->' : '<!-- HOME_CONTENT -->', page === 'menu' ? cardapio() : home());
    },
    generateBundle() {
      if (!baseUrl) return;
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(baseUrl)}</loc></url><url><loc>${escapeHtml(new URL('cardapio/', baseUrl).href)}</loc></url></urlset>\n`,
      });
    },
    writeBundle(options) {
      if (!baseUrl) return;
      writeFileSync(resolve(options.dir ?? 'dist', 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}sitemap.xml\n`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const baseUrl = siteUrl(loadEnv(mode, process.cwd(), 'SITE_').SITE_URL);
  return {
    plugins: [tailwindcss(), staticPages(baseUrl)],
    build: {
      rollupOptions: {
        input: { home: resolve(process.cwd(), 'index.html'), menu: resolve(process.cwd(), 'cardapio/index.html') },
      },
    },
  };
});
