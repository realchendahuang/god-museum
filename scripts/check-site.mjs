import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'

const root = resolve('dist')
const siteRoot = join(root, 'god-museum')

if (!existsSync(join(siteRoot, 'index.html'))) {
  throw new Error('Missing dist/god-museum/index.html')
}

function walk(directory) {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const files = walk(siteRoot)
const htmlFiles = files.filter(file => extname(file) === '.html')
const failures = []

function targetFor(pathname) {
  const relative = pathname.replace(/^\/god-museum\/?/, '')
  if (!relative) return join(siteRoot, 'index.html')
  const direct = join(siteRoot, relative)
  if (existsSync(direct) && statSync(direct).isFile()) return direct
  if (existsSync(join(direct, 'index.html'))) return join(direct, 'index.html')
  if (existsSync(`${direct}.html`)) return `${direct}.html`
  return null
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  if (/href=["'](?!https?:\/\/|\/\/|mailto:)[^"']+\.md(?:#|["'])/.test(html)) {
    failures.push(`${file}: contains an unreplaced Markdown link`)
  }
  if (/\\`|\\\$\{/.test(html)) {
    failures.push(`${file}: contains an escaped template literal`)
  }

  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const raw = match[1]
    if (!raw.startsWith('/god-museum')) continue
    const pathname = raw.split('#', 1)[0].split('?', 1)[0]
    if (!targetFor(pathname)) failures.push(`${file}: missing internal target ${raw}`)
  }
}

if (!htmlFiles.some(file => file.endsWith(join('deities', 'chinese', 'leigong', 'index.html')))) {
  failures.push('Missing representative deity route')
}
if (!htmlFiles.some(file => file.endsWith(join('halls', '04_thunder-wind-rain-and-fire', 'index.html')))) {
  failures.push('Missing representative hall route')
}
if (!files.some(file => file.includes(`${join(siteRoot, '_astro')}`))) {
  failures.push('Missing built assets under /god-museum/_astro')
}

if (failures.length) {
  throw new Error(`Site verification failed:\n${failures.map(failure => `- ${failure}`).join('\n')}`)
}

console.log(`Site valid: ${htmlFiles.length} HTML pages, ${files.length} generated files, all internal targets resolved.`)
