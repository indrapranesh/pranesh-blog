import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  // Every .md or .mdx file in src/content/posts is a post.
  // The file name (without extension) becomes the URL: /posts/<file-name>
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    // One line shown under the title on the homepage and the post page, and used for SEO.
    description: z.string().max(200, 'Keep the description to one line (200 characters or fewer).'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    // The first tag is the "primary" tag shown on the homepage.
    tags: z.array(z.string()).min(1),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
