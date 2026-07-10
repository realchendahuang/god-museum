import { getCollection } from 'astro:content'
import { routeForEntry, type DocEntry } from '../lib/content'

export async function GET() {
  const docs: DocEntry[] = await getCollection('docs')
  const urls = [
    'https://chendahuang.com/god-museum/',
    'https://chendahuang.com/god-museum/catalog/',
    ...docs.map(entry => `https://chendahuang.com${routeForEntry(entry)}`)
  ]
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(url => `  <url><loc>${url}</loc></url>`),
    '</urlset>'
  ].join('\n')

  return new Response(body, {
    headers: { 'content-type': 'application/xml; charset=utf-8' }
  })
}
