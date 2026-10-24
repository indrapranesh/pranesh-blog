// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site.ts';
import { headingAnchors } from './src/lib/heading-anchors.ts';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Canonical URL, used for canonical links, RSS, and the sitemap.
  // Change it in src/data/site.ts, not here.
  site: site.url,
  // URLs have no trailing slash (/about, not /about/). vercel.json matches this.
  trailingSlash: 'never',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: satteri({
      hastPlugins: [headingAnchors],
    }),
    syntaxHighlight: {
      type: 'shiki',
      // Leave diagram and math blocks alone so they can be handled separately later.
      excludeLangs: ['mermaid', 'math'],
    },
    shikiConfig: {
      theme: 'github-light',
      wrap: false,
    },
  },
});
