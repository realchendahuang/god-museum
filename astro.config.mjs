import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import rewriteMarkdownLinks from './src/plugins/remark-rewrite-links.mjs'

export default defineConfig({
  site: 'https://chendahuang.com',
  base: '/god-museum',
  outDir: './dist/god-museum',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      remarkPlugins: [rewriteMarkdownLinks]
    }),
    shikiConfig: {
      theme: 'github-dark-default'
    }
  },
  vite: {
    server: {
      fs: {
        allow: ['.']
      }
    }
  }
})
