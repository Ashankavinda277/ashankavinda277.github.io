import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ashankavinda.me',
  integrations: [
    react(),
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});