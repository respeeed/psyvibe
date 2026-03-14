// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://psy-vibe.ru',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    tailwind(),
    react(),
    markdoc(),
    keystatic(),
  ],
});
