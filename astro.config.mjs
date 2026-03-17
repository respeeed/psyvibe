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
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [
      {
        name: 'keystatic',
        resolveId(id) {
          if (id === 'virtual:keystatic-config') {
            return this.resolve('./keystatic.config', './a');
          }
          return null;
        },
      },
    ],
    resolve: {
      // Fix CJS/ESM interop issue in Keystatic editor deps:
      // some packages import `lodash/debounce` as default, but lodash is CJS.
      // Using lodash-es provides a proper ESM default export.
      alias: {
        'lodash/debounce': 'lodash-es/debounce',
      },
    },
    optimizeDeps: {
      // Ensure CJS interop for editor deps in dev
      entries: ['keystatic.config.*', '.astro/keystatic-imports.js'],
      include: ['lodash/debounce'],
      needsInterop: ['lodash'],
    },
  },
  integrations: [
    tailwind(),
    react(),
    markdoc(),
    keystatic(),
  ],
});
