import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const WORDS_PER_MINUTE = 220;

/**
 * Posts visible on this build, newest first.
 * Drafts are included only in `npm run dev`, never in production builds.
 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

/** Estimated reading time in whole minutes (at least 1). */
export function readingTime(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// Dates are formatted in UTC so a date written as 2026-10-24 always shows as Oct 24.
export function formatDate(date: Date, style: 'short' | 'long' = 'long'): string {
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    ...(style === 'long' ? { year: 'numeric' } : {}),
  });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
