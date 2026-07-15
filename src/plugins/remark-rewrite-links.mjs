import path from 'node:path'
import { visit } from 'unist-util-visit'

const BASE = '/god-museum'

function routeForSource(relativePath) {
  const clean = relativePath.replaceAll('\\', '/').replace(/\.md$/, '')
  const [section, ...parts] = clean.split('/')
  const filename = parts.at(-1)
  const isIndex = filename === 'README'
  const rest = isIndex ? parts.slice(0, -1) : parts

  const roots = {
    '00_foundation': 'foundation',
    '01_halls': 'halls',
    '02_deities': 'deities',
    '03_civilizations': 'civilizations',
    '04_heroes': 'heroes',
    '05_relics': 'relics',
    '06_beasts': 'beasts',
    '07_places': 'places',
    '08_myths': 'myths',
    '09_silent-gallery': 'silent-gallery',
    '10_chronicles': 'chronicles',
    '99_sources': 'sources'
  }

  const routeRoot = roots[section]
  if (!routeRoot) return null

  return `${BASE}/${[routeRoot, ...rest].filter(Boolean).join('/')}/`
}

export default function rewriteMarkdownLinks() {
  return (tree, file) => {
    visit(tree, 'link', (node) => {
      const [rawPath, hash] = node.url.split('#', 2)
      if (
        !rawPath?.endsWith('.md')
        || !file.path
        || /^[a-z][a-z\d+.-]*:/i.test(rawPath)
        || rawPath.startsWith('//')
      ) return

      const target = path.resolve(path.dirname(file.path), rawPath)
      const relative = path.relative(process.cwd(), target)
      const route = routeForSource(relative)
      if (!route) return

      node.url = hash ? `${route}#${hash}` : route
    })
  }
}
