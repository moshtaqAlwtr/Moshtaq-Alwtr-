import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Build-time render used by scripts/prerender.mjs.
 *
 * The site is a client-rendered SPA, so without this the file Google first
 * receives is an empty <div id="root">. Googlebot does execute JavaScript, but
 * it queues rendering separately and gives it far less priority than plain
 * HTML — a page with no crawlable text is a real ranking handicap.
 *
 * The providers read theme and language from `document` at render time, and
 * both guard on `typeof window === 'undefined'`, so this renders the Arabic
 * dark version — the right crawlable default for this audience.
 */
export function render() {
  return renderToString(<App />)
}
