// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.autoladen-altesland.de',
  // SSR sitemap routes include newly published Sanity vehicles without a rebuild.
  output: 'server',
  adapter: vercel(),
});
