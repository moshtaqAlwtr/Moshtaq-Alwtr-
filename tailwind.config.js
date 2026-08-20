/** @type {import('tailwindcss').Config} */

// Every colour resolves through a CSS variable holding an "R G B" triple, so a
// single class works in both themes and still accepts opacity modifiers.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
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
