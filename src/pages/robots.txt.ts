import type { APIContext } from 'astro';
import { site } from '../data/site';

// Generated so the sitemap URL always matches the `url` in src/data/site.ts.
export function GET(context: APIContext) {
  const sitemap = new URL('/sitemap-index.xml', context.site ?? site.url);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
