import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel(),
  integrations: [
    react(),
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
