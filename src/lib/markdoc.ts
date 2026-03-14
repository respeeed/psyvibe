import Markdoc from '@markdoc/markdoc';

/**
 * Рендерит строку Markdoc (из Keystatic) в HTML.
 * Используется на страницах «Обо мне» и в статьях блога.
 * Если body не строка — рендер не падает; в dev показывается понятный fallback.
 */
export function renderMarkdocToHtml(content: string | null | undefined): string {
  if (content == null || content === '') return '';
  if (typeof content !== 'string') {
    if (import.meta.env?.DEV) {
      console.warn('[markdoc] body не строка, тип:', typeof content);
      return '<p class="text-text-muted">Контент не в ожидаемом формате.</p>';
    }
    return '';
  }
  try {
    const ast = Markdoc.parse(content);
    const tree = Markdoc.transform(ast);
    return Markdoc.renderers.html(tree);
  } catch {
    return '';
  }
}
