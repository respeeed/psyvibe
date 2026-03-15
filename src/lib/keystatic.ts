import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

/** Корень проекта: Keystatic ищет контент в rootDir/src/content/... — запускайте dev/build из корня репозитория. */
const rootDir = process.cwd();
export const reader = createReader(rootDir, keystaticConfig);
