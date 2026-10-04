import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { home } from './src/sections/home';
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

function metadata(baseUrl: string | undefined): string {
  const imageUrl = baseUrl && new URL(site.socialImage.slice(1), baseUrl).href;
  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    description: site.description,
    servesCuisine: restaurant.descriptor,
    ...(baseUrl ? { url: baseUrl, image: imageUrl } : {}),
  };
  const schema = JSON.stringify(restaurantSchema).replace(/[<>&]/g, (character) => ({
    '<': '\\u003c', '>': '\\u003e', '&': '\\u0026',
  })[character] ?? character);

  return [
    `<title>${escapeHtml(site.title)}</title>`,
    `<meta name="description" content="${escapeHtml(site.description)}" />`,
    baseUrl ? `<link rel="canonical" href="${escapeHtml(baseUrl)}" />` : '<meta name="robots" content="noindex, follow" />',
    '<meta property="og:type" content="website" />',
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:site_name" content="${escapeHtml(restaurant.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(site.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(site.description)}" />`,
    ...(baseUrl && imageUrl ? [
      `<meta property="og:url" content="${escapeHtml(baseUrl)}" />`,
      `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
      `<meta property="og:image:alt" content="${escapeHtml(site.socialImageAlt)}" />`,
      `<meta property="og:image:width" content="${site.socialImageWidth}" />`,
      `<meta property="og:image:height" content="${site.socialImageHeight}" />`,
    ] : []),
    `<meta name="twitter:card" content="${imageUrl ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${escapeHtml(site.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(site.description)}" />`,
    ...(imageUrl ? [`<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`] : []),
    `<script type="application/ld+json">${schema}</script>`,
  ].join('\n    ');
}

function staticHome(baseUrl: string | undefined): Plugin {
  return {
    name: 'static-home-and-indexing',
    transformIndexHtml(html) {
      return html.replace('<!-- SITE_META -->', metadata(baseUrl)).replace('<!-- HOME_CONTENT -->', home());
    },
    generateBundle() {
      if (!baseUrl) return;
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(baseUrl)}</loc></url></urlset>\n`,
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
  return { plugins: [tailwindcss(), staticHome(baseUrl)] };
});
