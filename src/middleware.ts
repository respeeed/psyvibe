import { defineMiddleware } from 'astro:middleware';

/**
 * Keystatic (GitHub mode) формирует redirect_uri для OAuth на основе origin, который
 * на NetAngels внутри Node может выглядеть как localhost. GitHub это отклоняет.
 *
 * Минимальный безопасный фикс: на PROD перехватываем редирект /api/keystatic/github/login
 * и заменяем параметр redirect_uri на публичный домен сайта.
 *
 * Базовый origin берём из окружения, чтобы один и тот же бандл можно было
 * использовать и локально, и на продакшене.
 */
const SITE_ORIGIN =
  // Astro на сервере прокидывает process.env.* в Node, но не в браузер.
  process.env.KEYSTATIC_URL ||
  process.env.SITE ||
  'https://psy-vibe.ru';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Только для продакшена и только для login-редиректа.
  if (!(import.meta.env.PROD === true && pathname === '/api/keystatic/github/login')) {
    return next();
  }

  const res = await next();
  const location = res.headers.get('location');
  if (!location) return res;

  // Ожидаем редирект на GitHub authorize.
  let url: URL;
  try {
    url = new URL(location);
  } catch {
    return res;
  }

  if (!(url.hostname === 'github.com' && url.pathname === '/login/oauth/authorize')) {
    return res;
  }

  const redirectUri = url.searchParams.get('redirect_uri');
  if (!redirectUri) return res;

  // Если Keystatic подставил localhost — переписываем на публичный домен сайта.
  if (redirectUri.includes('localhost')) {
    url.searchParams.set('redirect_uri', `${SITE_ORIGIN}/api/keystatic/github/oauth/callback`);

    const headers = new Headers(res.headers);
    headers.set('location', url.toString());

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    });
  }

  return res;
});

