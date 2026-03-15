import Markdoc from '@markdoc/markdoc';

/** Узел дерева контента Keystatic (document/node с type, children, attributes). */
interface KeystaticNode {
  type?: string;
  children?: KeystaticNode[];
  attributes?: Record<string, unknown>;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Рендерит document-node из Keystatic (post.body с полем node) в HTML.
 * Текст лежит в узлах type: 'text', attributes: { content: "..." }.
 */
function renderKeystaticNodeToHtml(node: KeystaticNode): string {
  if (!node) return '';
  const type = node.type ?? '';
  const children = node.children ?? [];
  const childHtml = children.map(renderKeystaticNodeToHtml).join('');

  switch (type) {
    case 'document':
      return childHtml;
    case 'paragraph':
      return childHtml ? `<p>${childHtml}</p>` : '';
    case 'inline':
      return childHtml;
    case 'text': {
      const content = node.attributes?.content;
      return typeof content === 'string' ? escapeHtml(content) : '';
    }
    case 'heading': {
      const level = (node.attributes?.level as number) ?? 2;
      const tag = level >= 1 && level <= 6 ? `h${level}` : 'h2';
      return childHtml ? `<${tag}>${childHtml}</${tag}>` : '';
    }
    case 'list':
      const listTag = node.attributes?.listType === 'ordered' ? 'ol' : 'ul';
      return childHtml ? `<${listTag}>${childHtml}</${listTag}>` : '';
    case 'list-item':
      return childHtml ? `<li>${childHtml}</li>` : '';
    case 'blockquote':
      return childHtml ? `<blockquote>${childHtml}</blockquote>` : '';
    case 'code':
      return typeof node.attributes?.content === 'string'
        ? `<pre><code>${escapeHtml(node.attributes.content)}</code></pre>`
        : childHtml ? `<code>${childHtml}</code>` : '';
    case 'link': {
      const href = node.attributes?.href;
      const url = typeof href === 'string' ? href : '#';
      return childHtml ? `<a href="${escapeHtml(url)}">${childHtml}</a>` : '';
    }
    case 'bold':
    case 'italic':
    case 'underline': {
      const tag = type === 'bold' ? 'strong' : type === 'italic' ? 'em' : 'span';
      return childHtml ? `<${tag}>${childHtml}</${tag}>` : '';
    }
    default:
      return childHtml;
  }
}

/**
 * Рендерит body статьи из Keystatic в HTML.
 * Поддерживает: 1) объект с полем node (document-структура); 2) строку Markdoc; 3) объект с content (строка).
 */
export function renderMarkdocToHtml(
  content: string | null | undefined | { node?: KeystaticNode; content?: string } | Record<string, unknown>
): string {
  if (content == null) return '';
  if (typeof content === 'string') {
    try {
      const ast = Markdoc.parse(content);
      const tree = Markdoc.transform(ast);
      return Markdoc.renderers.html(tree);
    } catch {
      return '';
    }
  }
  if (typeof content === 'object' && content !== null) {
    if ('node' in content && content.node) {
      const html = renderKeystaticNodeToHtml(content.node as KeystaticNode);
      return html || '';
    }
    if ('content' in content && typeof (content as { content?: string }).content === 'string') {
      try {
        const str = (content as { content: string }).content;
        const ast = Markdoc.parse(str);
        const tree = Markdoc.transform(ast);
        return Markdoc.renderers.html(tree);
      } catch {
        return '';
      }
    }
  }
  return '';
}
