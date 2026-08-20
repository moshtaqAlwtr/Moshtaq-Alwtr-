import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

// Point Tailwind at the config by absolute path. With a bare `tailwindcss: {}`
// it auto-discovers tailwind.config.js relative to process.cwd(), so starting
// the dev server from any other directory silently falls back to the default
// theme and every custom utility (`bg-bg`, `text-text`, …) fails to resolve.
export default {
  plugins: {
    tailwindcss: { config: path.join(here, 'tailwind.config.js') },
    autoprefixer: {},
  },
}
