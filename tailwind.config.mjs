/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        'surface-dark': 'var(--color-surface-dark)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',
        'text-muted-inverse': 'var(--color-text-muted-inverse)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2rem, 5vw, 2.5rem)', { lineHeight: '1.2' }],
        h1: ['1.875rem', { lineHeight: '1.3' }],
        h2: ['1.5rem', { lineHeight: '1.35' }],
        h3: ['1.25rem', { lineHeight: '1.4' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
      spacing: {
        'section': 'var(--section-gap)',
        'block': 'var(--block-gap)',
      },
      borderRadius: {
        'soft': 'var(--radius-soft)',
      },
    },
  },
  plugins: [],
};
