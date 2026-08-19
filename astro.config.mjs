import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://ashankavinda.dev',
  adapter: vercel(),
  integrations: [
    react(),
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
