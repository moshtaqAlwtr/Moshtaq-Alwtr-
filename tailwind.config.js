/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        page: '#020617',
        section: '#0f172a',
        ink: {
          DEFAULT: '#f8fafc',
          soft: '#cbd5e1',
          muted: '#94a3b8',
          dim: '#64748b',
        },
        accent: {
          DEFAULT: '#10b981',
          2: '#06b6d4',
          3: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
        display: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg,#10b981,#06b6d4)',
        'grad-hero': 'linear-gradient(135deg,#020617,#0f172a,#064e3b)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        drift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.08)' },
          '66%': { transform: 'translate(-30px,25px) scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        blink: {
          '0%,49%': { opacity: 1 },
          '50%,100%': { opacity: 0 },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        blink: 'blink 1s step-end infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
