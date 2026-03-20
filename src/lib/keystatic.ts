import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

/**
 * Корень проекта: Keystatic ищет контент в rootDir/src/content/...
 *
 * На Vercel путь к файлу в bundle отличается от пути в репозитории,
 * поэтому "фиксированный" `../..` может приводить к неверному rootDir.
 * Делаем поиск вверх по каталогам, пока не найдём `src/content`.
 */
function findRootDir(startDir: string): string {
  let current = startDir;
  // Делаем запас по глубине, т.к. структура в bundle может отличаться.
  for (let i = 0; i < 10; i++) {
    const candidate = path.join(current, 'src', 'content');
    if (fs.existsSync(candidate)) return current;

    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }

  return startDir;
}

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = findRootDir(moduleDir);
export const reader = createReader(rootDir, keystaticConfig);
