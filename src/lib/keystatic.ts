import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const rootDir = process.cwd();
export const reader = createReader(rootDir, keystaticConfig);
