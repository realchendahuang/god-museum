import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const docs = defineCollection({
  loader: glob({
    pattern: '{00_foundation,01_halls,02_deities,03_civilizations,04_heroes,05_relics,06_beasts,07_places,08_myths,09_silent-gallery,99_sources}/**/[^_]*.md',
    base: '.'
  }),
  schema: z.object({
    id: z.string().optional(),
    type: z.string().optional(),
    name_zh: z.string().optional(),
    name_native: z.string().optional(),
    aliases: z.array(z.string()).optional(),
    tradition: z.string().optional(),
    periods: z.array(z.string()).optional(),
    primary_halls: z.array(z.string()).optional(),
    secondary_halls: z.array(z.string()).optional(),
    domains: z.array(z.string()).optional(),
    source_status: z.string().optional(),
    setting_status: z.string().optional()
  }).passthrough()
})

export const collections = { docs }
