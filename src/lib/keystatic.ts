import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

/**
 * Корень проекта: Keystatic ищет контент в rootDir/src/content/...
 * На Vercel `process.cwd()` может отличаться, поэтому вычисляем корень по пути файла.
 */
const rootDir = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
export const reader = createReader(rootDir, keystaticConfig);
