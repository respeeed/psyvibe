// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = __dirname;

function collectFilesRecursive(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectFilesRecursive(fullPath));
    else if (entry.isFile()) {
      // Передаём относительные пути, чтобы @astrojs/vercel резолвил их от workspace root.
      files.push(path.relative(projectRoot, fullPath).split(path.sep).join('/'));
    }
  }
  return files;
}

const keystaticContentFiles = collectFilesRecursive(path.join(projectRoot, 'src', 'content'));

// https://astro.build/config
export default defineConfig({
  site: 'https://psy-vibe.ru',
  output: 'server',
  adapter: vercel({
    // Keystatic reader читает YAML/MDOC с диска в runtime.
    // @astrojs/vercel копирует в функцию только перечисленные файлы, а не директории целиком.
    includeFiles: keystaticContentFiles,
  }),
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
      include: ['lodash/debounce', 'direction'],
      needsInterop: ['lodash', 'direction'],
    },
  },
  integrations: [
    tailwind(),
    react(),
    markdoc(),
    keystatic(),
  ],
});
