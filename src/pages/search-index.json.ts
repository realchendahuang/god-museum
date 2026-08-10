import { getCollection } from 'astro:content'
import {
  type DocEntry,
  entrySummary,
  entryTitle,
  entryTypeLabel,
  plainSearchText,
  routeForEntry
} from '../lib/content'

/** 生成独立搜索索引文件，供 SearchDialog 按需加载，避免在每个页面内联全文索引。 */
export async function GET() {
  const docs: DocEntry[] = await getCollection('docs')
  const records = docs.map(entry => ({
    title: entryTitle(entry),
    type: entryTypeLabel(entry),
    summary: entrySummary(entry),
    href: routeForEntry(entry),
    search: plainSearchText(entry)
  }))
  const body = JSON.stringify(records).replaceAll('<', '\\u003c')

  return new Response(body, {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  })
}
