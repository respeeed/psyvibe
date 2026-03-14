import {
  config,
  fields,
  collection,
  singleton,
} from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
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
          { label: 'Пункты меню' }
        ),
        phone: fields.text({ label: 'Телефон' }),
        messengerUrl: fields.text({
          label: 'Ссылка на мессенджер',
          description: 'Опционально',
        }),
        copyright: fields.text({ label: 'Копирайт в подвале' }),
      },
    }),
    home: singleton({
      label: 'Главная',
      path: 'src/content/home',
      schema: {
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
            stats: fields.array(
              fields.object({
                value: fields.text({ label: 'Значение' }),
                label: fields.text({ label: 'Подпись' }),
              }),
              { label: 'Цифры', validation: { length: { min: 3, max: 3 } } }
            ),
          },
          { label: 'Hero' }
        ),
        whyTrust: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            body: fields.text({ label: 'Текст', multiline: true }),
            tags: fields.array(fields.text({ label: 'Тег' }), { label: 'Теги' }),
            image: fields.image({
              label: 'Изображение',
              directory: 'public/images',
            }),
          },
          { label: 'Почему доверяют' }
        ),
        process: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            subtitle: fields.text({ label: 'Подзаголовок' }),
            topicTags: fields.array(fields.text({ label: 'Тег' }), {
              label: 'Теги тем',
            }),
            body: fields.text({ label: 'Текст', multiline: true }),
            cardTitle: fields.text({ label: 'Заголовок карточки' }),
            cardBody: fields.text({ label: 'Текст карточки', multiline: true }),
          },
          { label: 'Внутренние процессы' }
        ),
        benefits: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            body: fields.text({ label: 'Текст', multiline: true }),
            listItems: fields.array(fields.text({ label: 'Пункт' }), {
              label: 'Список',
            }),
            image: fields.image({
              label: 'Изображение',
              directory: 'public/images',
            }),
          },
          { label: 'Почему выгоден психолог' }
        ),
        cta: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            ctaLabel: fields.text({ label: 'Текст кнопки' }),
            ctaUrl: fields.text({ label: 'URL кнопки' }),
          },
          { label: 'CTA-блок' }
        ),
        diagnostic: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            intro: fields.text({ label: 'Вводный текст', multiline: true }),
            resultCards: fields.array(
              fields.object({
                title: fields.text({ label: 'Заголовок карточки' }),
                description: fields.text({
                  label: 'Описание',
                  multiline: true,
                }),
              }),
              { label: 'Карточки результата', validation: { length: { max: 4 } } }
            ),
            ctaLabel: fields.text({ label: 'Текст кнопки' }),
            ctaUrl: fields.text({ label: 'URL кнопки' }),
          },
          { label: 'Бесплатная диагностика' }
        ),
        format: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            body: fields.text({ label: 'Текст', multiline: true }),
            listItems: fields.array(fields.text({ label: 'Пункт' }), {
              label: 'Список',
            }),
            priceText: fields.text({ label: 'Текст цены' }),
            priceNote: fields.text({ label: 'Подпись к цене' }),
            image: fields.image({
              label: 'Изображение',
              directory: 'public/images',
            }),
          },
          { label: 'Формат сотрудничества' }
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
              { label: 'Шаги', validation: { length: { max: 5 } } }
            ),
          },
          { label: 'Как проходит сотрудничество' }
        ),
        discuss: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            body: fields.text({ label: 'Текст', multiline: true }),
            listItems: fields.array(fields.text({ label: 'Пункт' }), {
              label: 'Список',
            }),
          },
          { label: 'Обсудим задачи' }
        ),
        results: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            columns: fields.array(
              fields.object({
                title: fields.text({ label: 'Заголовок колонки' }),
                items: fields.array(fields.text({ label: 'Пункт' }), {
                  label: 'Пункты',
                }),
              }),
              { label: 'Колонки', validation: { length: { max: 3 } } }
            ),
          },
          { label: 'Результаты работы' }
        ),
        relevantFor: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            cards: fields.array(
              fields.object({
                text: fields.text({
                  label: 'Текст карточки',
                  multiline: true,
                }),
              }),
              { label: 'Карточки', validation: { length: { max: 5 } } }
            ),
          },
          { label: 'Особенно актуально' }
        ),
        clients: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            clientNames: fields.array(fields.text({ label: 'Название' }), {
              label: 'Клиенты',
            }),
            ctaLabel: fields.text({ label: 'Текст кнопки' }),
            ctaUrl: fields.text({ label: 'URL кнопки' }),
          },
          { label: 'Нас выбирают' }
        ),
        faq: fields.object(
          {
            title: fields.text({ label: 'Заголовок' }),
            items: fields.array(
              fields.object({
                question: fields.text({ label: 'Вопрос' }),
                answer: fields.text({ label: 'Ответ', multiline: true }),
              }),
              { label: 'Вопросы и ответы' }
            ),
          },
          { label: 'FAQ' }
        ),
        blogPreview: fields.object(
          {
            title: fields.text({ label: 'Заголовок секции' }),
            subtitle: fields.text({ label: 'Подзаголовок' }),
          },
          { label: 'Превью статей на главной' }
        ),
      },
    }),
    about: singleton({
      label: 'Обо мне',
      path: 'src/content/about',
      format: { contentField: 'body' },
      schema: {
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
            }),
          }),
          { label: 'Форматы работы' }
        ),
      },
    }),
    contacts: singleton({
      label: 'Контакты',
      path: 'src/content/contacts',
      schema: {
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
