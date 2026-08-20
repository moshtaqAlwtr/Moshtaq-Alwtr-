import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('tailwindcss').Config} */

// Every colour resolves through a CSS variable holding an "R G B" triple, so a
// single class works in both themes and still accepts opacity modifiers.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  // Absolute, so content scanning does not depend on the directory the dev
  // server or build was launched from.
  content: [path.join(here, 'index.html'), path.join(here, 'src/**/*.{js,jsx}')],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        'bg-soft': token('bg-soft'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        border: token('border'),
        'border-strong': token('border-strong'),

        text: token('text'),
        'text-2': token('text-2'),
        'text-3': token('text-3'),
        'text-4': token('text-4'),

        brand: token('brand'),
        'brand-2': token('brand-2'),
        'brand-3': token('brand-3'),
        'brand-contrast': token('brand-contrast'),
      },
      // The whole type scale is raised one notch. Arabic needs more optical
      // size than Latin at the same nominal px to read comfortably, and the
      // previous scale ran small across the board.
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.2rem' }], //  13px
        sm: ['0.9375rem', { lineHeight: '1.45rem' }], // 15px
        base: ['1.0625rem', { lineHeight: '1.75rem' }], // 17px
        lg: ['1.1875rem', { lineHeight: '1.85rem' }], // 19px
        xl: ['1.3125rem', { lineHeight: '1.95rem' }], // 21px
        '2xl': ['1.625rem', { lineHeight: '2.15rem' }], // 26px
        '3xl': ['2rem', { lineHeight: '2.5rem' }], //     32px
        '4xl': ['2.5rem', { lineHeight: '1.22' }], //     40px
        '5xl': ['3.25rem', { lineHeight: '1.14' }], //    52px
        '6xl': ['4rem', { lineHeight: '1.08' }], //       64px
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        drift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(36px,-28px) scale(1.08)' },
          '66%': { transform: 'translate(-28px,22px) scale(0.95)' },
        },
        blink: {
          '0%,49%': { opacity: '1' },
          '50%,100%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sweep: {
          '0%,100%': { transform: 'translateY(0)', opacity: '0.35' },
          '50%': { transform: 'translateY(-6px)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 20s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        marquee: 'marquee 34s linear infinite',
        sweep: 'sweep 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
