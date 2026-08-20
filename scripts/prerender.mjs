import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const indexPath = path.join(root, 'dist', 'index.html')
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js')

if (!fs.existsSync(serverEntry)) {
  console.error('prerender: missing dist-ssr build — run the ssr build first')
  process.exit(1)
}

const { render } = await import(pathToFileURL(serverEntry).href)
const appHtml = render()

let html = fs.readFileSync(indexPath, 'utf8')

if (!html.includes('<div id="root"></div>')) {
  console.error('prerender: could not find the empty root div to fill')
  process.exit(1)
}

html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
fs.writeFileSync(indexPath, html)

// Report what a crawler will now actually read, so a silently empty render
// cannot pass unnoticed.
const bodyText = appHtml
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)}KB of markup`)
console.log(`prerender: ${bodyText.split(' ').length} crawlable words in the initial HTML`)

if (bodyText.split(' ').length < 100) {
  console.error('prerender: suspiciously little text — failing the build')
  process.exit(1)
}
