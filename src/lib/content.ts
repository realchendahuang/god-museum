import type { CollectionEntry } from 'astro:content'

export type DocEntry = CollectionEntry<'docs'>

const BASE = '/god-museum'

const SECTION_ROUTES: Record<string, string> = {
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
  '99_sources': 'sources'
}

const TYPE_LABELS: Record<string, string> = {
  deity: '神座',
  hall: '权柄大殿',
  tradition: '文明传统',
  foundation: '设定基石',
  source: '来源',
  hero: '英雄',
  royal_actor: '王权行动者',
  relic: '圣物',
  being: '异兽',
  place: '地点',
  myth: '神话事件'
}

const SECTION_LABELS: Record<string, string> = {
  '00_foundation': '设定基石',
  '01_halls': '权柄大殿',
  '02_deities': '神明档案',
  '03_civilizations': '文明与通道',
  '04_heroes': '英雄长廊',
  '05_relics': '圣物宝库',
  '06_beasts': '异兽庭院',
  '07_places': '神域与地点',
  '08_myths': '神话剧场',
  '09_silent-gallery': '静默长廊',
  '99_sources': '来源目录'
}

export function cleanEntryId(id: string): string {
  return id.replaceAll('\\', '/').replace(/\.md$/, '')
}

export function entrySourcePath(entry: DocEntry): string {
  const parts = cleanEntryId(entry.id).split('/')
  if (parts.at(-1)?.toLowerCase() === 'readme') parts[parts.length - 1] = 'README'
  return `${parts.join('/')}.md`
}

export function routeSegmentsForEntry(entry: DocEntry): string[] {
  const [section, ...parts] = cleanEntryId(entry.id).split('/')
  const root = SECTION_ROUTES[section]
  if (!root) return ['catalog']

  const isIndex = parts.at(-1)?.toLowerCase() === 'readme'
  return [root, ...(isIndex ? parts.slice(0, -1) : parts)].filter(Boolean)
}

export function routeForEntry(entry: DocEntry): string {
  return `${BASE}/${routeSegmentsForEntry(entry).join('/')}/`
}

export function withBase(path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '')
  return clean ? `${BASE}/${clean}/` : `${BASE}/`
}

export function entryTitle(entry: DocEntry): string {
  if (entry.data.name_zh) return entry.data.name_zh
  const heading = entry.body?.match(/^#\s+(.+)$/m)?.[1]
  return heading?.replace(/\s+·\s+.*$/, '').trim() || cleanEntryId(entry.id).split('/').at(-1) || '未命名条目'
}

export function entrySummary(entry: DocEntry): string {
  const lines = (entry.body || '').split('\n')
  const leadQuote = lines
    .map(line => line.trim())
    .find(line => line.startsWith('> '))
    ?.replace(/^>\s*/, '')
  const paragraphs: string[] = []
  let current: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (current.length) paragraphs.push(current.join(' '))
      current = []
      continue
    }
    if (
      trimmed.startsWith('#')
      || trimmed.startsWith('>')
      || trimmed.startsWith('|')
      || trimmed.startsWith('- ')
      || /^\d+\.\s/.test(trimmed)
      || trimmed === '---'
    ) continue
    current.push(trimmed)
  }
  if (current.length) paragraphs.push(current.join(' '))

  const summary = leadQuote || paragraphs.find(text => text.length > 24) || paragraphs[0] || ''
  return summary
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~\`]/g, '')
    .slice(0, 150)
}

export function entrySection(entry: DocEntry): string {
  return cleanEntryId(entry.id).split('/')[0]
}

export function entryTypeLabel(entry: DocEntry): string {
  if (entry.data.type && TYPE_LABELS[entry.data.type]) return TYPE_LABELS[entry.data.type]
  return SECTION_LABELS[entrySection(entry)] || '馆藏'
}

export function sectionLabel(entry: DocEntry): string {
  return SECTION_LABELS[entrySection(entry)] || '众神殿'
}

export function githubUrlForEntry(entry: DocEntry): string {
  return `https://github.com/realchendahuang/god-museum/blob/main/${entrySourcePath(entry)}`
}

export function traditionLabel(tradition?: string): string {
  const labels: Record<string, string> = {
    'tradition.chinese': '中国',
    'tradition.greek': '希腊',
    'tradition.norse': '北欧',
    'tradition.vedic': '吠陀',
    'tradition.egyptian': '古埃及',
    'tradition.mesopotamian': '美索不达米亚'
  }
  return tradition ? labels[tradition] || tradition.replace('tradition.', '') : ''
}

export function plainSearchText(entry: DocEntry): string {
  return [
    entryTitle(entry),
    entry.data.name_native,
    ...(entry.data.aliases || []),
    traditionLabel(entry.data.tradition),
    ...(entry.data.domains || []),
    entry.body
  ].filter(Boolean).join(' ').toLocaleLowerCase('zh-CN')
}
