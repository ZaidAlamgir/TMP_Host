import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders'; 

const newsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    subheadline: z.string().optional(),
    // CHANGE THIS LINE: use coerce.date() to safely parse your Jekyll timestamps
    date: z.coerce.date(), 
    image: z.string().url().optional(),
    image_description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('By TMP Staff'),
    layout: z.string().optional(),
  }),
});

// ... rest of the file stays the same
export const collections = {
  'news': newsCollection,
};