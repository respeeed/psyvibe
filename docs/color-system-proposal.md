# Предложение по цветовой системе — psy-vibe.ru

Premium service landing, B2B, ориентиры: Stripe, Linear, Vercel, Notion.

---

## Шаг 1 — Анализ текущей цветовой схемы

### Текущие токены (из `src/styles/global.css`)

| Роль | Переменная | HEX |
|------|------------|-----|
| Фон основной | `--color-surface` | #fdfcfb |
| Фон приглушённый | `--color-surface-muted` | #f5f3f0 |
| Фон тонкий | `--color-surface-subtle` | #fafaf9 |
| Фон тёмный (секции) | `--color-surface-dark` | #252220 |
| Текст основной | `--color-text` | #1c1917 |
| Текст приглушённый | `--color-text-muted` | #57534e |
| Текст на тёмном | `--color-text-inverse` | #ffffff |
| Текст приглушённый на тёмном | `--color-text-muted-inverse` | #a8a29e |
| Акцент (ссылки/наведение) | `--color-accent` | #292524 |
| Акцент hover | `--color-accent-hover` | #44403c |
| Бренд (ссылки, теги) | `--color-accent-brand` | #0d7368 |
| Бренд hover | `--color-accent-brand-hover` | #0a5c52 |
| CTA (кнопки) | `--color-cta` | #292524 |
| CTA hover | `--color-cta-hover` | #3f3d3b |
| CTA active | `--color-cta-active` | #1c1917 |
| Граница | `--color-border` | #e8e6e3 |

---

### 3–5 основных проблем

1. **Дублирование и путаница ролей**  
   `accent` и `cta` визуально совпадают (оба #292524 и близкие оттенки). При этом ссылки в навигации ведут на `--color-cta`, в prose — на `accent-brand`. Нет чёткого разделения: primary action (кнопка) vs secondary action (ссылка) vs брендовый акцент. Для premium SaaS важно один доминирующий CTA и предсказуемая иерархия.

2. **Слабая визуальная иерархия**  
   Кнопка «Записаться» и обычный текст одного «веса» (тёмный charcoal). CTA не выделяется как главное действие; accent-brand (teal) используется то для ссылок, то для тегов — акцент размыт. Для landing нужен один явный primary и вторичные элементы, не конкурирующие с ним.

3. **Один уровень границ**  
   Есть только `--color-border` (#e8e6e3). Нет шкалы border-subtle / default / strong. Сложнее делать тонкие разделители в карточках и более выраженные рамки при hover/focus в стиле современных SaaS.

4. **Захардкоженные цвета вне токенов**  
   В `Button.astro` (secondary): `#ddd9d5`, `#ebe8e4`. В `global.css` градиент hero: `#faf8f6`. Тени: `rgba(28,25,23,...)`. Hero-карточка: `rgba(255,252,251,0.78)`. Это усложняет смену темы и нарушает единую систему.

5. **Нет системной нейтральной шкалы**  
   Surface и text не привязаны к общей neutral-палитре (50–900). Добавлять новые оттенки (например, для disabled, для тонких фонов) приходится ад hoc. У Stripe/Linear/Vercel нейтралы — одна шкала, от неё выводятся и фон, и текст, и границы.

---

## Шаг 2 — Целевая структура цветовой системы

Используем одну нейтральную шкалу и от неё — семантические роли. Отдельно — primary (бренд), secondary (второстепенный UI), accent (CTA и важные действия).

- **Primary** — основной брендовый цвет (логотип, ключевые акценты).
- **Secondary** — дополнительный цвет интерфейса (второстепенные кнопки, бейджи).
- **Accent** — цвет для CTA, главных кнопок и важных элементов (может совпадать с primary или быть отдельным).
- **Neutral palette** — одна шкала для текста, фонов и границ (50–900).
- **Surface colors** — производные от neutral: primary (основной фон), secondary (карточки/блоки), muted (приглушённые зоны).
- **Border colors** — subtle / default / strong от neutral.
- **Text colors** — primary / secondary / muted от neutral.
- **State colors** — hover / active / focus (могут ссылаться на те же токены, что и сейчас, но именованы явно).

Структура в коде остаётся: те же CSS-переменные и классы Tailwind (surface, text, border, accent, cta и т.д.), меняются только значения переменных. HTML, компоненты, типографика, сетка не трогаем.

---

## Шаг 3 — Design tokens (формат)

Ниже — общий формат токенов. Конкретные HEX для каждой системы даны в вариантах 1–3.

### Primary
- primary-50 … primary-900 (или минимальный набор: 50, 100, 200, 500, 600, 700)

### Secondary
- secondary-50 … secondary-500 (по необходимости)

### Accent (CTA)
- accent-50, accent-100, accent-500, accent-600, accent-700

### Neutral
- neutral-50, neutral-100, neutral-200, neutral-300, neutral-400, neutral-500, neutral-600, neutral-700, neutral-800, neutral-900

### Surface (маппинг на neutral/primary)
- surface-primary  
- surface-secondary  
- surface-muted  
- surface-dark (для тёмных секций)

### Border
- border-subtle  
- border-default  
- border-strong  

### Text
- text-primary  
- text-secondary  
- text-muted  
- text-inverse  
- text-muted-inverse  

### State
- state-hover (фон/текст при наведении)  
- state-active (нажатие)  
- state-focus (кольцо focus)

Все цвета в спецификациях ниже — в HEX.

---

## Шаг 4 — Три варианта цветовой системы

### Вариант 1 — Clean SaaS (минималистичный, как Stripe / Linear)

Минимум цветов, один нейтрал, один акцент для CTA. Никаких лишних оттенков.

**Primary (бренд, мягко)**  
- primary-50: `#f0fdf9`  
- primary-100: `#ccfbef`  
- primary-500: `#14b8a6`  
- primary-600: `#0d9488`  
- primary-700: `#0f766e`  

**Accent (CTA = primary)**  
- accent-50: `#f0fdf9`  
- accent-100: `#ccfbef`  
- accent-500: `#14b8a6`  
- accent-600: `#0d9488`  
- accent-700: `#0f766e`  

**Neutral**  
- neutral-50: `#fafaf9`  
- neutral-100: `#f5f5f4`  
- neutral-200: `#e7e5e4`  
- neutral-300: `#d6d3d1`  
- neutral-400: `#a8a29e`  
- neutral-500: `#78716c`  
- neutral-600: `#57534e`  
- neutral-700: `#44403c`  
- neutral-800: `#292524`  
- neutral-900: `#1c1917`  

**Surface**  
- surface-primary: `#ffffff`  
- surface-secondary: `#fafaf9`  
- surface-muted: `#f5f5f4`  
- surface-dark: `#1c1917`  

**Border**  
- border-subtle: `#f5f5f4`  
- border-default: `#e7e5e4`  
- border-strong: `#d6d3d1`  

**Text**  
- text-primary: `#1c1917`  
- text-secondary: `#44403c`  
- text-muted: `#78716c`  
- text-inverse: `#ffffff`  
- text-muted-inverse: `#a8a29e`  

**State**  
- state-hover (CTA): `#0d9488`  
- state-active (CTA): `#0f766e`  
- state-focus: `#14b8a6`  

---

### Вариант 2 — Premium accent (нейтральный интерфейс + сильный акцент)

Нейтралы спокойные, тёпло-серые; один насыщенный акцент для кнопок и ссылок (индиго/синий в духе Vercel/Linear).

**Primary (бренд)**  
- primary-50: `#eef2ff`  
- primary-100: `#e0e7ff`  
- primary-500: `#6366f1`  
- primary-600: `#4f46e5`  
- primary-700: `#4338ca`  

**Accent (CTA)**  
- accent-50: `#eef2ff`  
- accent-100: `#e0e7ff`  
- accent-500: `#6366f1`  
- accent-600: `#4f46e5`  
- accent-700: `#4338ca`  

**Neutral**  
- neutral-50: `#fafaf9`  
- neutral-100: `#f5f3f0`  
- neutral-200: `#e8e6e3`  
- neutral-300: `#d6d3d1`  
- neutral-400: `#a8a29e`  
- neutral-500: `#57534e`  
- neutral-600: `#44403c`  
- neutral-700: `#3f3d3b`  
- neutral-800: `#292524`  
- neutral-900: `#1c1917`  

**Surface**  
- surface-primary: `#fdfcfb`  
- surface-secondary: `#fafaf9`  
- surface-muted: `#f5f3f0`  
- surface-dark: `#1c1917`  

**Border**  
- border-subtle: `#f5f3f0`  
- border-default: `#e8e6e3`  
- border-strong: `#d6d3d1`  

**Text**  
- text-primary: `#1c1917`  
- text-secondary: `#44403c`  
- text-muted: `#57534e`  
- text-inverse: `#ffffff`  
- text-muted-inverse: `#a8a29e`  

**State**  
- state-hover (CTA): `#4f46e5`  
- state-active (CTA): `#4338ca`  
- state-focus: `#6366f1`  

---

### Вариант 3 — Soft modern (мягкая палитра, лёгкие цветные фоны)

Тёплые нейтралы + один мягкий цветной акцент (teal/sage), лёгкие подкрашенные фоны для карточек и секций.

**Primary (бренд, мягкий teal)**  
- primary-50: `#f0fdfa`  
- primary-100: `#ccfbf1`  
- primary-200: `#99f6e4`  
- primary-500: `#0d9488`  
- primary-600: `#0f766e`  
- primary-700: `#0d5c54`  

**Accent (CTA = primary)**  
- accent-50: `#f0fdfa`  
- accent-100: `#ccfbf1`  
- accent-500: `#0d9488`  
- accent-600: `#0f766e`  
- accent-700: `#0d5c54`  

**Neutral**  
- neutral-50: `#fafaf9`  
- neutral-100: `#f5f3f0`  
- neutral-200: `#e8e6e3`  
- neutral-300: `#ddd9d5`  
- neutral-400: `#a8a29e`  
- neutral-500: `#57534e`  
- neutral-600: `#44403c`  
- neutral-700: `#3f3d3b`  
- neutral-800: `#292524`  
- neutral-900: `#1c1917`  

**Surface**  
- surface-primary: `#fdfcfb`  
- surface-secondary: `#fafaf9`  
- surface-muted: `#f5f3f0`  
- surface-muted-tint: `#f0fdfa` (лёгкий primary-50 для карточек/блоков)  
- surface-dark: `#1c1917`  

**Border**  
- border-subtle: `#f0f0ee`  
- border-default: `#e8e6e3`  
- border-strong: `#ddd9d5`  

**Text**  
- text-primary: `#1c1917`  
- text-secondary: `#44403c`  
- text-muted: `#57534e`  
- text-inverse: `#ffffff`  
- text-muted-inverse: `#a8a29e`  

**State**  
- state-hover (CTA): `#0f766e`  
- state-active (CTA): `#0d5c54`  
- state-focus: `#0d9488`  

---

## Шаг 5 — Применение по вариантам

Ниже — как каждая система ложится на типовые элементы. Структура страницы и компоненты не меняются, подставляются только значения переменных.

### Общий маппинг переменных (для внедрения в CSS)

Текущие переменные проекта можно связать с новой системой так (пример для Варианта 1):

| Текущая переменная | Вариант 1 | Вариант 2 | Вариант 3 |
|--------------------|-----------|-----------|-----------|
| `--color-surface` | surface-primary | surface-primary | surface-primary |
| `--color-surface-muted` | surface-muted | surface-muted | surface-muted |
| `--color-surface-subtle` | surface-secondary | surface-secondary | surface-secondary |
| `--color-surface-dark` | surface-dark | surface-dark | surface-dark |
| `--color-text` | text-primary | text-primary | text-primary |
| `--color-text-muted` | text-muted | text-muted | text-muted |
| `--color-text-inverse` | text-inverse | text-inverse | text-inverse |
| `--color-text-muted-inverse` | text-muted-inverse | text-muted-inverse | text-muted-inverse |
| `--color-accent` | neutral-800 | neutral-800 | neutral-800 |
| `--color-accent-hover` | neutral-700 | neutral-700 | neutral-700 |
| `--color-accent-brand` | accent-500 | accent-500 | accent-500 |
| `--color-accent-brand-hover` | accent-600 | accent-600 | accent-600 |
| `--color-cta` | accent-500 | accent-500 | accent-500 |
| `--color-cta-hover` | accent-600 | accent-600 | accent-600 |
| `--color-cta-active` | accent-700 | accent-700 | accent-700 |
| `--color-border` | border-default | border-default | border-default |

Дополнительно можно ввести (опционально):  
`--color-border-subtle`, `--color-border-strong` для более тонкой иерархии границ.

---

### Hero section background

- **Вариант 1:** `#ffffff` → `neutral-100` (лёгкий градиент до surface-muted).
- **Вариант 2:** `#fdfcfb` → `surface-primary`, градиент до `surface-muted`.
- **Вариант 3:** `#fdfcfb` → `surface-primary`, градиент до `surface-muted` с лёгким подтоном primary-50 внизу (опционально).

Во всех случаях hero остаётся светлым, спокойным; только в варианте 3 можно добавить едва заметный цветной оттенок.

---

### Buttons

**Primary (CTA)**  
- Вариант 1: фон `#14b8a6`, hover `#0d9488`, active `#0f766e`, текст white.  
- Вариант 2: фон `#6366f1`, hover `#4f46e5`, active `#4338ca`, текст white.  
- Вариант 3: фон `#0d9488`, hover `#0f766e`, active `#0d5c54`, текст white.  

**Secondary**  
- Вариант 1: фон `surface-primary`, граница `border-default`, текст `text-primary`, hover — фон `surface-muted`, граница `border-strong`.  
- Вариант 2 и 3: то же, без цветного акцента; границы и фоны из neutral/surface.

Все три варианта дают чёткое разделение: primary = цветной CTA, secondary = нейтральный контур.

---

### Cards

- Фон: `surface-primary` (варианты 1–3).  
- Граница: `border-default`.  
- При hover: тень сильнее, граница можно оставить или заменить на `border-strong`.  
- Вариант 3: опционально карточка «с акцентом» — фон `surface-muted-tint` (primary-50), граница `primary-200` с низкой непрозрачностью.

---

### Section backgrounds

- Обычная секция: `surface-primary`.  
- Чередование: `surface-primary` / `surface-muted` (как сейчас).  
- Тёмная секция (Format, RelevantFor): `surface-dark`, текст `text-inverse` / `text-muted-inverse`.  
- Вариант 3: одна из светлых секций может иметь фон `surface-muted-tint` для мягкого цветного блока.

---

### Links

- В навигации и футере: цвет по умолчанию `text-muted`, hover и focus — accent (accent-500 / accent-600).  
- В prose: цвет `accent-500` (или accent-600), hover `accent-600` (или accent-700).  
- Единообразие: везде один accent для ссылок, в вариантах 1 и 3 — teal, в варианте 2 — indigo.

---

## Требования (чеклист)

- Современно (уровень UI 2025): нейтральная шкала, один явный CTA, минимум визуального шума.  
- Минималистично: 1–2 акцентных цвета, остальное — нейтралы.  
- Premium: спокойные тона, достаточный контраст, без «кричащих» цветов.  
- Контраст: text-primary и text-muted на surface-primary соответствуют WCAG AA; CTA на white — тоже.  
- Подходит для landing и блога: один набор токенов для всего сайта.  
- Удобно в Tailwind: все роли уже завязаны на CSS-переменные, в конфиге остаются `var(--color-*)`, меняются только значения в `:root`.

---

## Рекомендация

- Для **максимальной близости к Stripe/Linear** и самому чистому виду — **Вариант 1 (Clean SaaS)**.  
- Если нужен более «продуктовый» и контрастный CTA при сохранении тёплого фона — **Вариант 2 (Premium accent)**.  
- Если важно сохранить тёплую, «психологическую» атмосферу и мягкий teal — **Вариант 3 (Soft modern)** с опциональными подкрашенными фонами.

После выбора варианта достаточно обновить блок `:root` в `src/styles/global.css` (и при желании добавить `border-subtle` / `border-strong` и заменить захардкоженные `#ddd9d5` / `#ebe8e4` в Button на переменные).
