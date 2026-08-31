// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://autoladen-altes-land.vercel.app',
  integrations: [sitemap()],
  output: 'server',
  adapter: vercel(),
});
