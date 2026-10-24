# Pranesh's blog

A minimal personal blog built with [Astro](https://astro.build), TypeScript, Markdown/MDX, and plain CSS. Every page is static HTML. There is no database, no CMS, and no client-side framework.

- **Content** lives in Markdown files and small TypeScript data files.
- **Presentation** lives in `src/components`, `src/layouts`, and `src/styles`.
- You can change any of the site's content without touching the second group.

---

## Contents

1. [Initial setup](#initial-setup)
2. [Project structure](#project-structure)
3. [Editing website content](#editing-website-content)
4. [Publishing a new article](#publishing-a-new-article)
5. [Drafts](#drafts)
6. [Adding images](#adding-images)
7. [Markdown features](#markdown-features)
8. [Deploying](#deploying)
9. [Analytics](#analytics)
10. [Troubleshooting](#troubleshooting)

---

## Initial setup

Requirements: **Node.js 22.23.4 or newer** (Node 24 LTS recommended; `.nvmrc` pins 24) and npm.

```bash
npm ci          # install exact dependency versions from package-lock.json
npm run dev     # start the dev server at http://localhost:4321
```

You don't need environment variables for local development.

| Command           | What it does                                                         |
| ----------------- | -------------------------------------------------------------------- |
| `npm run dev`     | Dev server with live reload. **Shows drafts.**                       |
| `npm run build`   | Production build into `dist/`. Drafts are excluded.                  |
| `npm run preview` | Serves the `dist/` build locally so you can check it before deploying. |
| `npm run check`   | Type-checks Astro and TypeScript files and validates post front matter. |

Use `npm install <package>` only when adding a dependency. It updates `package-lock.json`, which you should commit.

---

## Project structure

```
.
├── .github/workflows/ci.yml   CI: type check + build on PRs and pushes to main
├── public/                    Files copied as-is (favicon, images referenced by URL)
├── src/
│   ├── content/posts/         ← YOUR ARTICLES (one .md or .mdx file per post)
│   ├── data/                  ← YOUR SITE CONTENT AND SETTINGS
│   │   ├── site.ts            title, author, URL, SEO defaults, language
│   │   ├── navigation.ts      header links
│   │   ├── introduction.md    homepage introduction
│   │   ├── about.md           About page
│   │   ├── social-links.ts    footer links (GitHub, LinkedIn, email…)
│   │   └── footer.ts          footer text and options
│   ├── components/            Header, Footer, writing list, SEO tags…
│   ├── layouts/               BaseLayout (every page), PostLayout (articles)
│   ├── lib/                   posts.ts (draft filtering, sorting, reading time),
│   │                          heading-anchors.ts (adds "#" links to headings)
│   ├── pages/                 Routes: /, /about, /posts/[slug], /rss.xml, /robots.txt, 404
│   ├── styles/                global.css, typography.css, code.css
│   └── content.config.ts      Front-matter schema for posts
├── astro.config.mjs           Astro config (integrations, Markdown, syntax highlighting)
├── vercel.json                Vercel settings (no trailing slashes)
└── package.json
```

---

## Editing website content

| To change…                         | Edit this file                         |
| ---------------------------------- | -------------------------------------- |
| Name / site title                  | `src/data/site.ts` → `title`, `author` |
| Site description, SEO default      | `src/data/site.ts` → `description`, `defaultSeoDescription` |
| Production URL (canonical, RSS, sitemap) | `src/data/site.ts` → `url`       |
| Social preview image               | `src/data/site.ts` → `socialImage` (file goes in `public/`) |
| Homepage introduction              | `src/data/introduction.md`             |
| About page                         | `src/data/about.md`                    |
| Header navigation                  | `src/data/navigation.ts`               |
| Social links                       | `src/data/social-links.ts`             |
| Footer text                        | `src/data/footer.ts`                   |
| Articles                           | `src/content/posts/*.md` / `*.mdx`     |
| Colors, fonts, widths, layout      | `src/styles/global.css` (variables are at the top) |
| Article text styles                | `src/styles/typography.css`            |
| Code block styles                  | `src/styles/code.css`                  |
| Syntax highlighting theme          | `astro.config.mjs` → `shikiConfig.theme` |
| Favicon                            | `public/favicon.svg`                   |

**Before your first deploy**, set `url` in `src/data/site.ts` to your real domain (for example `https://pranesh.dev`). It's used for canonical URLs, Open Graph tags, the RSS feed, the sitemap, and `robots.txt`.

### Examples

Add a navigation link (`src/data/navigation.ts`):

```ts
export const navigation: NavigationLink[] = [
  { label: 'about', href: '/about' },
  { label: 'now', href: '/now' }, // new
  { label: 'rss', href: '/rss.xml' },
];
```

A new page like `/now` also needs a file in `src/pages/`. Copy `src/pages/about.astro` to `src/pages/now.astro` and point it at a new `src/data/now.md`.

Change social links (`src/data/social-links.ts`):

```ts
export const socialLinks: SocialLink[] = [
  { label: 'github', href: 'https://github.com/your-name' },
  { label: 'email', href: 'mailto:you@example.com' },
];
```

### Design notes

The look comes from a few rules. Keep them in mind when you change the styles:

- **Four colors only:** `--background`, `--foreground`, `--muted`, and `--border` at the top of `src/styles/global.css`. Code highlighting is the one exception.
- **Two typefaces, both system fonts:** sans for reading, monospace (`--font-mono`, at `--meta-size`) for anything that is data: dates, tags, reading time, navigation, the footer, and code.
- **Homepage introduction:** the first paragraph of `introduction.md` is styled as the headline. Later paragraphs are the lede.
- **The index:** on screens 960px and wider, each year hangs in the left margin beside its posts, and dotted leaders run from each title to its tag and reading time. On narrow screens the year sits above its posts and the meta wraps under the title.
- **Wide-screen details:** heading `#` links hang in the left margin, and code blocks extend slightly past the text column and show their language in the corner.

---

## Publishing a new article

1. **Create a file** in `src/content/posts/`. The file name becomes the URL:
   `src/content/posts/understanding-llm-inference.md` → `/posts/understanding-llm-inference`.
   Use lowercase words separated by hyphens.

2. **Add front matter and write:**

   ```markdown
   ---
   title: "Understanding LLM Inference"
   description: "What happens when an LLM generates text."
   publishedAt: 2026-10-24
   tags:
     - technology
     - ai
   draft: false
   ---

   Your first paragraph goes here.

   ## A section

   More text.
   ```

   | Field         | Required | Notes                                                        |
   | ------------- | -------- | ------------------------------------------------------------ |
   | `title`       | yes      | Page title and heading.                                      |
   | `description` | yes      | Used for the meta description, social previews, and RSS.     |
   | `publishedAt` | yes      | `YYYY-MM-DD`. Controls ordering and the year group.          |
   | `updatedAt`   | no       | `YYYY-MM-DD`. Shown as "updated …" when it differs from `publishedAt`. |
   | `tags`        | yes      | At least one. The **first tag** is shown on the homepage.    |
   | `draft`       | no       | `true` hides the post from production. Defaults to `false`.  |

   Don't add an `# H1` heading in the body. The title is already the page's H1, so start sections at `##`.

3. **Preview it:** `npm run dev`, then open http://localhost:4321.

4. **Check it:** `npm run check && npm run build`.

5. **Publish:**

   ```bash
   git checkout -b post/understanding-llm-inference
   git add src/content/posts/understanding-llm-inference.md
   git commit -m "Add post: Understanding LLM Inference"
   git push -u origin post/understanding-llm-inference
   ```

   Open a pull request. CI runs and Vercel posts a preview URL. Merge when the checks pass. Vercel then deploys `main` to production.

   If you're working alone and skip PRs, pushing straight to `main` also deploys, unless branch protection blocks it (see below).

The homepage list, RSS feed, and sitemap pick the post up automatically. There is no list of posts to update by hand.

Use `.md` for most posts. Use `.mdx` when you want to import components or use JavaScript expressions in the text.

### Removing the sample posts

The two sample posts are labeled "Sample" in their titles and tagged `sample`. Delete them when you're ready:

```bash
rm src/content/posts/first-post.md src/content/posts/example-technical-post.mdx
```

The homepage shows "Nothing published yet." when there are no posts.

---

## Drafts

Set `draft: true` in the front matter:

```yaml
draft: true
```

A draft:

- **appears in `npm run dev`**, marked "draft" on the homepage and post page, so you can preview it at its real URL;
- is **not built** by `npm run build`. It has no page in `dist/` and is left out of the homepage, RSS feed, and sitemap.

To publish, change it to `draft: false` (or delete the line) and set `publishedAt` to the publication date.

The filtering is in `getPosts()` in `src/lib/posts.ts`. Every page, the RSS feed, and the post routes use that one function.

> Drafts are hidden from the built site, but the Markdown files are still in your Git repository. If the repository is public, anyone can read your drafts on GitHub. Keep sensitive drafts outside the repo, or make the repository private.

---

## Adding images

**Recommended: next to your posts, so Astro optimizes them.** Put images in `src/assets/` (for example `src/assets/posts/my-post/diagram.png`) and use a relative path:

```markdown
![A diagram of the request flow](../../assets/posts/my-post/diagram.png)
```

Astro checks that the file exists at build time. It converts the image to an efficient format, adds `width`/`height` so the layout doesn't shift, and lazy-loads it.

**Alternative: `public/`.** Files in `public/` are copied unchanged and referenced from the site root:

```markdown
![Alt text](/images/photo.jpg)   <!-- file at public/images/photo.jpg -->
```

These are not optimized, so resize them yourself. Use `public/` for files that need a fixed URL, like the social preview image.

Always write meaningful alt text. Use `![](…)` with empty alt text only for decorative images.

For a caption, use HTML in Markdown or MDX:

```html
<figure>
  <img src="/images/photo.jpg" alt="Description" />
  <figcaption>Caption text.</figcaption>
</figure>
```

---

## Markdown features

Supported out of the box, in `.md` and `.mdx`:

- Headings, paragraphs, **bold**, *italic*, ~~strikethrough~~, links
- Ordered, unordered, and task lists
- Blockquotes and horizontal rules
- Tables (GitHub-flavored Markdown)
- Footnotes (`text[^1]` … `[^1]: note`)
- Code blocks with syntax highlighting (Shiki, theme `github-light`). Add a language after the fences: ` ```ts `, ` ```python `, ` ```bash `…
- Automatic heading ids, plus a `#` link that appears when you hover over an `h2`–`h4`
- Smart quotes and dashes
- Images (see above)
- MDX only: `import` components, `export const` values, `{expressions}`

Reading time is estimated at 220 words per minute from the raw file (see `src/lib/posts.ts`).

### Mermaid diagrams (optional, not installed)

` ```mermaid ` blocks are excluded from syntax highlighting, so they show as plain code until you add a renderer. Mermaid's library is large, so it isn't installed by default. When you need it:

1. `npm install mermaid`
2. Create `src/components/Mermaid.astro`:

   ```astro
   <script>
     import mermaid from 'mermaid';
     document.querySelectorAll('pre:has(> code.language-mermaid)').forEach((pre) => {
       const div = document.createElement('div');
       div.className = 'mermaid';
       div.textContent = pre.textContent;
       pre.replaceWith(div);
     });
     mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
     await mermaid.run();
   </script>
   ```

3. Use an `.mdx` post and add `import Mermaid from '../../components/Mermaid.astro'` and `<Mermaid />` to it. Only posts that include the component load the script.

### LaTeX equations (optional, not installed)

Astro's Markdown processor (Sätteri) can parse `$inline$` and `$$display$$` math, but it needs a renderer to turn it into formatted equations. When you need it:

1. `npm install katex`
2. In `astro.config.mjs`, enable math: `satteri({ features: { math: true }, hastPlugins: [...] })`. Math then arrives as `<code class="language-math math-inline">` and `<pre><code class="language-math math-display">`.
3. Add a small hast plugin, alongside `src/lib/heading-anchors.ts`, that replaces those nodes with `katex.renderToString(text, { displayMode, output: 'mathml' })`. MathML output needs no extra CSS or fonts and renders in all current browsers.

---

## Deploying

The site deploys through **Vercel's native GitHub integration**. You don't need a deploy workflow or secrets in GitHub Actions.

```
Write article → commit → push to GitHub
                              ├──→ GitHub Actions CI (check + build)
                              └──→ Vercel build & deploy → live site
```

CI and Vercel **run independently**. A failing CI run does **not** stop Vercel from deploying a commit that's already on `main`. The safeguard is to block merges into `main` until CI passes (see [Required checks](#required-github-checks)).

### 1. Create a GitHub repository

```bash
git init -b main         # skip if already a repository
git add .
git commit -m "Initial commit"
```

Create an empty repository on GitHub (https://github.com/new) without a README or .gitignore. Then:

```bash
git remote add origin git@github.com:<your-username>/<repo-name>.git
git push -u origin main
```

### 2. Connect it to Vercel

1. Sign in at https://vercel.com with your GitHub account.
2. **Add New… → Project**, then import the repository. Grant the Vercel GitHub app access to it if asked.
3. Vercel detects **Astro**. Keep the defaults:
   - Build command: `npm run build` (or `astro build`)
   - Output directory: `dist`
   - Install command: `npm install`. Vercel uses `npm ci` automatically when a lockfile is present.
4. **Deploy.** You don't need any environment variables.

Vercel's Node.js version is set in **Project → Settings → Build and Deployment → Node.js Version**. Choose 24.x to match CI and `.nvmrc`.

### 3. Production branch

**Project → Settings → Environments → Production → Branch Tracking** (older dashboards: **Settings → Git → Production Branch**). Set it to `main`.

- Pushes and merges to `main` produce **production** deployments.
- Every other branch and every PR gets a **preview** deployment with its own URL, posted on the PR.

This produces one deployment per push, made by Vercel. Don't add a second deploy step in GitHub Actions, or every commit deploys twice.

### 4. Custom domain

1. **Project → Settings → Domains → Add**, then enter your domain (for example `pranesh.dev`).
2. Add the DNS records Vercel shows at your registrar: usually an `A` record for the root domain and a `CNAME` for `www`.
3. Choose which form is primary (`pranesh.dev` or `www.pranesh.dev`). Vercel redirects the other.
4. Set `url` in `src/data/site.ts` to the primary domain, then commit and push.

HTTPS certificates are issued automatically.

### 5. Required GitHub checks

Make CI a gate for merging to `main`:

1. Push a branch and open a PR once, so GitHub sees the **CI / Check and build** check.
2. In the GitHub repository, go to **Settings → Rules → Rulesets → New ruleset → New branch ruleset**:
   - **Enforcement status:** Active
   - **Target branches:** Add target → *Include default branch* (`main`)
   - Enable **Require a pull request before merging**
   - Enable **Require status checks to pass**, click **Add checks**, and select **Check and build**
   - Optionally enable **Block force pushes**
3. Save.

The classic alternative is **Settings → Branches → Add branch protection rule** for `main`, with *Require status checks to pass before merging* → **Check and build**.

With this in place, changes reach `main` only through PRs that passed CI, so production deployments only come from code that passed CI. Without it, CI only reports results.

To push straight to `main` while working alone, leave "Require a pull request" off. CI still runs on every push, but it won't block the deploy.

### CI details

`.github/workflows/ci.yml` runs on PRs targeting `main` and on pushes to `main`. It checks out the code, sets up Node from `.nvmrc` with npm caching, then runs `npm ci`, `npm run check`, and `npm run build`. It has read-only permissions and uses no secrets.

---

## Analytics

The site uses **Vercel Web Analytics** through the official `@vercel/analytics` package and its Astro component (`@vercel/analytics/astro`, included in `src/layouts/BaseLayout.astro`). It adds one small script to each page and doesn't need React.

### Enable it

1. In Vercel: **Project → Analytics → Enable**. (The tab may be named *Web Analytics*.)
2. Redeploy. The next deployment starts collecting.

Until you enable it, the script's requests return 404. That's harmless.

You can also enable it from the CLI: `vercel api "/web/insights/toggle?projectId=<project id>" -X POST -F value=true`. The project id is in `.vercel/project.json` after `vercel link`.

### Verify events

1. Open the deployed site (production or a preview URL).
2. Open the browser DevTools **Network** tab and reload.
3. Look for two same-origin requests: `…/script.js` and, after the page loads, `…/view`. Status 200 means it's working. Vercel serves these from a random per-project path such as `/42127278aaabc117/` (or `/_vercel/insights/` on older setups), which helps them get past ad blockers.
4. Some ad blockers still block them. If nothing shows up, test in a private window without extensions.
5. Page views appear in the dashboard within a minute or two.

In `npm run dev`, the component runs in debug mode and logs page views to the browser console instead of sending them.

### View traffic

Go to **Vercel → Project → Analytics**. It shows visitors, page views, top pages, referrers, countries, devices, and browsers. Filter by time range or page. The numbers are private to your Vercel team and aren't shown on the site.

### Privacy and limits

- Vercel Web Analytics **doesn't use cookies**. It identifies visitors with a hash that resets daily. That's why the site has no cookie banner. Check your own legal obligations if your situation is unusual.
- **Hobby (free) plan:** a monthly cap on events, historically 50,000 per month. When you reach it, collection pauses until the next cycle. Data retention and reporting window are limited, and custom events require a paid plan. Limits change, so check https://vercel.com/docs/analytics/limits-and-pricing for current numbers.
- Visitors with ad or tracker blockers aren't counted.

---

## Troubleshooting

### Markdown and content

| Problem | Fix |
| --- | --- |
| `InvalidContentEntryDataError` / "posts → … data does not match collection schema" | A front-matter field is missing or has the wrong type. The error names the field. Check `title`, `description`, `publishedAt` (`YYYY-MM-DD`), and that `tags` is a list with at least one item. |
| Post doesn't appear on the homepage | Is `draft: true` set? Drafts only show in `npm run dev`. Is the file in `src/content/posts/` with a `.md` or `.mdx` extension? |
| Post shows the wrong date | Dates are read as UTC. Write them as `2026-10-24`, not `10/24/2026`. |
| YAML error in front matter | Titles containing `:` or `#` must be quoted: `title: "Part 1: Basics"`. |
| MDX error like "Could not parse expression" | In `.mdx`, `{`, `}`, and `<` are syntax. Escape them (`\{`) or put them in backticks, or use `.md` for that post. |
| Code block not highlighted | Add a language after the opening fence (` ```js `). An unknown language name falls back to plain text. |
| Image not found during build | Relative image paths are relative to the post file. Check the `../../assets/...` path. |

### Build

| Problem | Fix |
| --- | --- |
| `npm ci` fails with a lockfile mismatch | Run `npm install` locally and commit the updated `package-lock.json`. |
| "Node.js vX is not supported" | Use Node 22.23.4+ (`nvm use` picks up `.nvmrc`). |
| `npm run check` reports type errors | Fix the file and line shown. `npm run check` is the same command CI runs. |
| Stale content or types after renaming files | Stop the dev server, delete `.astro/` and `node_modules/.astro/`, then restart. |
| Port 4321 in use | `npm run dev -- --port 4322`. If a previous dev server was left running in the background, `npx astro dev stop` stops it. |

### Deployment

| Problem | Fix |
| --- | --- |
| Canonical URLs, RSS links, or sitemap point to `example.com` | Set `url` in `src/data/site.ts`. |
| CI failed but the site deployed anyway | Expected: Vercel deploys independently. Add the [required check ruleset](#5-required-github-checks) so failing changes can't reach `main`. |
| Vercel build fails but local build works | Match Node versions (Vercel → Settings → Build and Deployment → Node.js Version = 24.x), and make sure `package-lock.json` is committed. |
| Two deployments per push | Remove any deploy step from GitHub Actions. Vercel's Git integration already deploys. |
| Analytics shows no data | Enable Analytics in the Vercel project, redeploy, and test without an ad blocker. |
| The first deployment of a new Vercel project went to production from a feature branch | Vercel makes a project's first deployment production regardless of branch. Later branch pushes are previews. Merge to `main` to replace it. |
| URLs ending in `/` redirect | Intended. `vercel.json` sets `trailingSlash: false` so each page has one URL. |
| Custom domain shows "Invalid configuration" | DNS changes can take up to a few hours. Re-check the records in Vercel → Domains. |
