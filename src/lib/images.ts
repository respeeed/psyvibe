/**
 * Нормализует путь к изображению из Keystatic (directory: 'public/images').
 * Если путь уже с ведущим / — возвращает как есть, иначе — /images/{path}.
 */
export function imagePath(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null;
  return raw.startsWith('/') ? raw : `/images/${raw}`;
}
