import {
  config,
  fields,
  collection,
  singleton,
} from '@keystatic/core';

/** Keystatic передаёт в itemLabel объект { value, onChange, schema, key }; отображать нужно value */
function itemVal(item: unknown): unknown {
  if (item != null && typeof item === 'object' && 'value' in item) {
    return (item as { value: unknown }).value;
  }
  return item;
}

export default config({
  storage: {
    kind: 'github',
    // Repo owner/name for GitHub mode (нужно для GitHub-only входа в /keystatic).
    // Важно: этот файл импортируется и в браузере, поэтому нельзя использовать process.env здесь.
    repo: { owner: 'respeeed', name: 'psyvibe' },
  },
  singletons: {
    siteSettings: singleton({
      label: 'Настройки сайта',
      path: 'src/content/siteSettings',
      schema: {
        siteName: fields.text({
          label: 'Название сайта',
          validation: { isRequired: true },
        }),
        navLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Текст ссылки' }),
            href: fields.text({ label: 'URL' }),
          }),
          { label: 'Пункты меню', itemLabel: (item: unknown) => (itemVal(item) as { label?: string })?.label || 'Пункт меню' }
        ),
        phone: fields.text({ label: 'Телефон' }),
        messengerUrl: fields.text({
          label: 'Ссылка на мессенджер',
          description: 'Опционально',
        }),
        copyright: fields.text({ label: 'Копирайт в подвале' }),
        logoBg: fields.select({
          label: 'Фон лого в шапке',
          options: [
            { label: 'Приглушённый', value: 'muted' },
            { label: 'Светлый', value: 'subtle' },
            { label: 'Сирений (акцент)', value: 'primary' },
            { label: 'Белый', value: 'white' },
          ],
          defaultValue: 'muted',
        }),
      },
    }),
    home: singleton({
      label: 'Главная',
      path: 'src/content/home',
      schema: {
        seoTitle: fields.text({
          label: 'Title (SEO)',
          description: 'Заголовок для вкладки браузера и поисковиков. Если пусто — подставится «Главная».',
        }),
        hero: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            subtitle: fields.text({ label: 'Подзаголовок', multiline: true }),
            primaryCtaLabel: fields.text({ label: 'Текст кнопки (основная)' }),
            primaryCtaUrl: fields.text({ label: 'URL основной кнопки' }),
            secondaryCtaLabel: fields.text({ label: 'Текст кнопки (вторая)' }),
            secondaryCtaUrl: fields.text({ label: 'URL второй кнопки' }),
            workingHours: fields.text({ label: 'Часы работы' }),
            image: fields.image({ label: 'Изображение', directory: 'public/images' }),
            video: fields.text({
              label: 'Видео (MP4)',
              description: 'Путь к файлу от public, например: videos/иллюстрация.mp4. Загрузите MP4 в public/videos/',
            }),
            stats: fields.array(
              fields.object({
                value: fields.text({ label: 'Значение' }),
                label: fields.text({ label: 'Подпись' }),
              }),
              {
                label: 'Цифры',
                validation: { length: { min: 3, max: 3 } },
                itemLabel: (item: unknown) => {
                  const v = itemVal(item) as { value?: string; label?: string };
                  return [v?.value, v?.label].filter(Boolean).join(' — ') || 'Статистика';
                },
              }
            ),
          },
          { label: 'Hero (баннер главной)', description: 'Заголовок, подзаголовок, кнопки, фото/видео' }
        ),
        whyTrust: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            body: fields.text({ label: 'Текст', multiline: true }),
            tags: fields.array(fields.text({ label: 'Тег' }), {
              label: 'Теги',
              itemLabel: (item: unknown) => (typeof itemVal(item) === 'string' ? itemVal(item) : '') || 'Тег',
            }),
            image: fields.image({
              label: 'Изображение',
              directory: 'public/images',
            }),
            video: fields.text({
              label: 'Видео (MP4)',
              description: 'Путь от public, например: videos/иллюстрация.mp4',
            }),
          },
          { label: 'Почему доверяют', description: 'Блок «Почему компании доверяют мне»' }
        ),
        process: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            subtitle: fields.text({ label: 'Подзаголовок' }),
            topicTags: fields.array(fields.text({ label: 'Тег' }), {
              label: 'Теги тем',
              itemLabel: (item: unknown) => (typeof itemVal(item) === 'string' ? itemVal(item) : '') || 'Тег',
            }),
            body: fields.text({ label: 'Текст', multiline: true }),
            cardTitle: fields.text({ label: 'Заголовок карточки' }),
            cardBody: fields.text({ label: 'Текст карточки', multiline: true }),
            cardImage: fields.image({
              label: 'Иконка карточки',
              directory: 'public/images',
            }),
            cardIconBg: fields.select({
              label: 'Фон иконки',
              options: [
                { label: 'Приглушённый', value: 'muted' },
                { label: 'Сирений (акцент)', value: 'primary' },
                { label: 'Белый', value: 'white' },
                { label: 'Светлый', value: 'subtle' },
              ],
              defaultValue: 'muted',
            }),
            cardCtaLabel: fields.text({
              label: 'Текст кнопки в карточке',
              description: 'Например: Попробовать бесплатно. Оставьте пустым, чтобы не показывать кнопку.',
            }),
            cardCtaUrl: fields.text({
              label: 'URL кнопки в карточке',
              description: 'Например: #diagnostic',
            }),
          },
          { label: 'Внутренние процессы', description: 'Блок про процессы в команде и прибыль' }
        ),
        benefits: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            body: fields.text({ label: 'Текст', multiline: true }),
            listItems: fields.array(fields.text({ label: 'Пункт' }), {
              label: 'Список',
              itemLabel: (item: unknown) => (typeof itemVal(item) === 'string' ? itemVal(item) : '') || 'Пункт',
            }),
            image: fields.image({
              label: 'Изображение',
              directory: 'public/images',
            }),
            video: fields.text({
              label: 'Видео (MP4)',
              description: 'Путь от public, например: videos/иллюстрация.mp4',
            }),
          },
          { label: 'Почему выгоден психолог', description: 'Блок «Почему бизнесу выгоден корпоративный психолог»' }
        ),
        cta: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            ctaLabel: fields.text({ label: 'Текст кнопки' }),
            ctaUrl: fields.text({ label: 'URL кнопки' }),
          },
          { label: 'CTA-блок', description: 'Блок с текстом и кнопкой «Записаться на консультацию»' }
        ),
        diagnostic: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            intro: fields.text({ label: 'Вводный текст', multiline: true }),
            resultCards: fields.array(
              fields.object({
                icon: fields.image({
                  label: 'Иконка',
                  directory: 'public/images',
                  description: 'Квадратная иконка до 96×96. Стиль — в общем ключе сайта.',
                }),
                iconBackground: fields.select({
                  label: 'Фон иконки',
                  options: [
                    { label: 'Светлый', value: 'surface' },
                    { label: 'Приглушённый', value: 'surface-muted' },
                    { label: 'Акцентный (синий)', value: 'accent' },
                  ],
                  defaultValue: 'surface',
                }),
                title: fields.text({ label: 'Заголовок карточки' }),
                description: fields.text({
                  label: 'Описание',
                  multiline: true,
                }),
              }),
              {
                label: 'Карточки результата',
                validation: { length: { max: 4 } },
                itemLabel: (item: unknown) => (itemVal(item) as { title?: string })?.title || 'Карточка',
              }
            ),
            ctaLabel: fields.text({ label: 'Текст кнопки' }),
            ctaUrl: fields.text({ label: 'URL кнопки' }),
          },
          { label: 'Бесплатная диагностика', description: 'Блок «Бесплатная диагностика выгорания команды»' }
        ),
        format: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            body: fields.text({ label: 'Текст', multiline: true }),
            listItems: fields.array(fields.text({ label: 'Пункт' }), {
              label: 'Список',
              itemLabel: (item: unknown) => (typeof itemVal(item) === 'string' ? itemVal(item) : '') || 'Пункт',
            }),
            priceText: fields.text({ label: 'Текст цены' }),
            priceNote: fields.text({ label: 'Подпись к цене' }),
            image: fields.image({
              label: 'Изображение',
              directory: 'public/images',
            }),
            video: fields.text({
              label: 'Видео (MP4)',
              description: 'Путь от public, например: videos/иллюстрация.mp4',
            }),
          },
          { label: 'Формат сотрудничества', description: 'Блок «Формат сотрудничества»' }
        ),
        howItWorks: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            steps: fields.array(
              fields.object({
                title: fields.text({ label: 'Заголовок шага' }),
                description: fields.text({
                  label: 'Описание',
                  multiline: true,
                }),
              }),
              {
                label: 'Шаги',
                validation: { length: { max: 5 } },
                itemLabel: (item: unknown) => (itemVal(item) as { title?: string })?.title || 'Шаг',
              }
            ),
          },
          { label: 'Как проходит сотрудничество', description: 'Блок с шагами сотрудничества' }
        ),
        discuss: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            body: fields.text({ label: 'Вводная строка (например: На короткой встрече мы:)' }),
            items: fields.array(
              fields.object({
                text: fields.text({ label: 'Пункт' }),
                icon: fields.image({
                  label: 'Иконка',
                  directory: 'public/images',
                  description: 'Квадратная иконка, рекомендуется до 96×96. Если не задана — используется иконка по умолчанию.',
                }),
                iconBackground: fields.select({
                  label: 'Фон иконки',
                  options: [
                    { label: 'Светлый', value: 'surface' },
                    { label: 'Приглушённый', value: 'surface-muted' },
                    { label: 'Акцентный (синий)', value: 'accent' },
                  ],
                  defaultValue: 'surface',
                }),
              }),
              {
                label: 'Пункты с иконками',
                validation: { length: { max: 6 } },
                itemLabel: (item: unknown) => (itemVal(item) as { text?: string })?.text?.slice(0, 40) || 'Пункт',
              }
            ),
            ctaLabel: fields.text({ label: 'Текст кнопки (слева)' }),
            ctaUrl: fields.text({ label: 'URL кнопки (слева)' }),
            contactEmail: fields.text({
              label: 'Email для кнопки «Написать на почту»',
              description: 'Опционально',
            }),
          },
          { label: 'Обсудим задачи', description: 'Блок «Обсудим задачи вашей команды» с кнопками связи' }
        ),
        results: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            columns: fields.array(
              fields.object({
                icon: fields.image({
                  label: 'Иллюстрация',
                  directory: 'public/images',
                  description: 'Иллюстрация над блоком (например, лампочка). Рекомендуется одинаковый стиль для всех колонок.',
                }),
                title: fields.text({ label: 'Название (тип клиента)' }),
                subtitle: fields.text({
                  label: 'Подзаголовок',
                  description: 'Например: 35 сотрудников',
                }),
                context: fields.text({
                  label: 'Контекст',
                  description: 'Например: После внедрения корпоративного психолога:',
                }),
                items: fields.array(fields.text({ label: 'Результат' }), {
                  label: 'Результаты (список с галочками)',
                  itemLabel: (item: unknown) => (typeof itemVal(item) === 'string' ? itemVal(item) : '') || 'Пункт',
                }),
              }),
              {
                label: 'Колонки',
                validation: { length: { max: 3 } },
                itemLabel: (item: unknown) => (itemVal(item) as { title?: string })?.title || 'Колонка',
              }
            ),
          },
          { label: 'Результаты работы', description: 'Блок «Результаты работы с командами»' }
        ),
        relevantFor: fields.object(
          {
            title: fields.text({ label: 'Заголовок (основной)' }),
            iconItems: fields.array(
              fields.object({
                icon: fields.image({
                  label: 'Иконка',
                  directory: 'public/images',
                  description: 'Квадратная иконка, рекомендуется до 96×96',
                }),
                iconBackground: fields.select({
                  label: 'Фон иконки',
                  options: [
                    { label: 'Светлый', value: 'surface' },
                    { label: 'Приглушённый', value: 'surface-muted' },
                    { label: 'Акцентный (синий)', value: 'accent' },
                  ],
                  defaultValue: 'surface-muted',
                }),
                text: fields.text({ label: 'Текст под иконкой', multiline: true }),
              }),
              {
                label: 'Линия иконок с текстами',
                validation: { length: { max: 6 } },
                itemLabel: (item: unknown) => {
                  const v = itemVal(item) as { text?: string };
                  return (v?.text?.slice(0, 40) || 'Пункт') + (v?.text && v.text.length > 40 ? '…' : '');
                },
              }
            ),
            secondaryTitle: fields.text({
              label: 'Второй заголовок',
              description: 'Например: Когда компании обращаются',
            }),
            tags: fields.array(fields.text({ label: 'Текст чипа' }), {
              label: 'Теги-чипсы',
              validation: { length: { max: 8 } },
              itemLabel: (item: unknown) => (typeof itemVal(item) === 'string' ? itemVal(item) : '') || 'Тег',
            }),
            ctaLabel: fields.text({ label: 'Текст кнопки' }),
            ctaUrl: fields.text({ label: 'URL кнопки' }),
          },
          { label: 'Особенно актуально', description: 'Блок «Особенно актуально, если команда» + теги и CTA' }
        ),
        clients: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            clientNames: fields.array(fields.text({ label: 'Название' }), {
              label: 'Клиенты',
              itemLabel: (item: unknown) => (typeof itemVal(item) === 'string' ? itemVal(item) : '') || 'Клиент',
            }),
            ctaLabel: fields.text({ label: 'Текст кнопки' }),
            ctaUrl: fields.text({ label: 'URL кнопки' }),
          },
          { label: 'Нас выбирают', description: 'Блок «Нас выбирают» (клиенты)' }
        ),
        faq: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            items: fields.array(
              fields.object({
                question: fields.text({ label: 'Вопрос' }),
                answer: fields.text({ label: 'Ответ', multiline: true }),
              }),
              {
                label: 'Вопросы и ответы',
                itemLabel: (item: unknown) => {
                const v = itemVal(item) as { question?: string };
                const q = v?.question ?? '';
                return (q.slice(0, 50) || 'Вопрос') + (q.length > 50 ? '…' : '');
              },
              }
            ),
          },
          { label: 'FAQ', description: 'Часто задаваемые вопросы' }
        ),
        blogPreview: fields.object(
          {
            title: fields.text({ label: 'Заголовок секции' }),
            subtitle: fields.text({ label: 'Подзаголовок' }),
          },
          { label: 'Превью статей на главной', description: 'Заголовок и подзаголовок блока статей' }
        ),
      },
    }),
    about: singleton({
      label: 'Обо мне',
      path: 'src/content/about',
      format: { contentField: 'body' },
      schema: {
        seoTitle: fields.text({
          label: 'Title (SEO)',
          description: 'Заголовок для вкладки браузера и поисковиков. Если пусто — используется заголовок страницы.',
        }),
        title: fields.text({ label: 'Заголовок' }),
        image: fields.image({
          label: 'Фото',
          directory: 'public/images',
        }),
        body: fields.markdoc({
          label: 'Текст',
          options: { image: { directory: 'public/images' } },
        }),
      },
    }),
    pricing: singleton({
      label: 'Тарифы',
      path: 'src/content/pricing',
      schema: {
        seoTitle: fields.text({
          label: 'Title (SEO)',
          description: 'Заголовок для вкладки браузера и поисковиков. Если пусто — используется заголовок страницы.',
        }),
        title: fields.text({ label: 'Заголовок' }),
        intro: fields.text({
          label: 'Вводный текст',
          multiline: true,
        }),
        formats: fields.array(
          fields.object({
            name: fields.text({ label: 'Название формата' }),
            price: fields.text({ label: 'Цена' }),
            description: fields.text({
              label: 'Описание',
              multiline: true,
            }),
            features: fields.array(fields.text({ label: 'Пункт' }), {
              label: 'Опции',
              itemLabel: (item: unknown) => (typeof itemVal(item) === 'string' ? itemVal(item) : '') || 'Опция',
            }),
          }),
          { label: 'Форматы работы', itemLabel: (item: unknown) => (itemVal(item) as { name?: string })?.name || 'Формат' }
        ),
      },
    }),
    contacts: singleton({
      label: 'Контакты',
      path: 'src/content/contacts',
      schema: {
        seoTitle: fields.text({
          label: 'Title (SEO)',
          description: 'Заголовок для вкладки браузера и поисковиков. Если пусто — используется заголовок страницы.',
        }),
        title: fields.text({ label: 'Заголовок' }),
        body: fields.text({
          label: 'Текст',
          multiline: true,
        }),
        phone: fields.text({ label: 'Телефон' }),
        email: fields.text({ label: 'Email' }),
        address: fields.text({ label: 'Адрес' }),
        workingHours: fields.text({ label: 'Часы работы' }),
      },
    }),
  },
  collections: {
    blog: collection({
      label: 'Статьи блога',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'body' },
      schema: {
        seoTitle: fields.text({
          label: 'Title (SEO)',
          description: 'Заголовок для вкладки браузера и поисковиков. Если пусто — используется заголовок статьи.',
        }),
        title: fields.slug({
          name: { label: 'Заголовок' },
          slug: { label: 'URL (slug)' },
        }),
        excerpt: fields.text({
          label: 'Краткое описание',
          multiline: true,
        }),
        publishDate: fields.datetime({
          label: 'Дата публикации',
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: 'Превью',
          directory: 'public/images',
        }),
        body: fields.markdoc({
          label: 'Текст статьи',
          options: { image: { directory: 'public/images' } },
        }),
      },
    }),
  },
});
