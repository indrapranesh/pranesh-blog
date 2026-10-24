import GithubSlugger from 'github-slugger';
import { defineHastPlugin } from 'satteri';

// Adds a small "#" link to every h2–h4 in posts so sections can be linked to directly.
// This plugin runs before Astro assigns heading ids, so it sets the id itself using the
// same slug rules Astro uses (Astro keeps any id that is already present).
export const headingAnchors = () => {
  const slugger = new GithubSlugger();
  return defineHastPlugin({
    name: 'heading-anchors',
    element: {
      filter: ['h2', 'h3', 'h4'],
      visit(node, ctx) {
        const existing = node.properties['id'];
        const id = typeof existing === 'string' ? existing : slugger.slug(ctx.textContent(node));
        ctx.setProperty(node, 'id', id);
        ctx.appendChild(node, {
          type: 'element',
          tagName: 'a',
          properties: { className: ['heading-anchor'], href: `#${id}`, ariaHidden: 'true', tabIndex: -1 },
          children: [{ type: 'text', value: '#' }],
        });
      },
    },
  });
};
