/**
 * Нормализует путь к изображению из Keystatic (directory: 'public/images').
 * Если путь уже с ведущим / — возвращает как есть, иначе — /images/{path}.
 */
export function imagePath(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null;
  return raw.startsWith('/') ? raw : `/images/${raw}`;
}

/**
 * Путь к превью статьи блога. Keystatic сохраняет файлы в public/images/{slug}/{filename},
 * в контенте хранится только имя файла — подставляем slug.
 */
export function blogImagePath(
  slug: string | null | undefined,
  image: string | null | undefined
): string | null {
  if (!slug || !image || image === '') return null;
  if (image.startsWith('/')) return image;
  return `/images/${slug}/${image}`;
}

/**
 * Нормализует путь к видео из CMS (файлы в public/videos/).
 * Если путь уже с ведущим / — возвращает как есть, иначе — /{path} (ожидается videos/name.mp4).
 */
export function videoPath(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null;
  return raw.startsWith('/') ? raw : `/${raw}`;
}
