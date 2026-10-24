// Site-wide settings. Edit these values to change the site name, URL, and defaults.

export const site = {
  // Shown in the header and at the end of every page title.
  title: 'Pranesh',

  // Short description of the whole site (used for RSS and the homepage).
  description: 'Writing about software, ideas, and things I find interesting.',

  // Your name, used for article author metadata.
  author: 'Pranesh',

  // The production URL of the site, without a trailing slash.
  // Used for canonical URLs, the sitemap, RSS, and social previews.
  url: 'https://pranesh-blog.vercel.app',

  // Fallback meta description for pages that do not provide their own.
  defaultSeoDescription:
    'Personal writing by Pranesh on software engineering, AI, distributed systems, books, travel, and life.',

  // Language of the site content (used for <html lang>).
  lang: 'en',

  // Optional social preview image (Open Graph / Twitter card).
  // Put the file in /public and set a path such as '/social-preview.png'.
  // Leave as undefined to omit the image.
  socialImage: undefined as string | undefined,
};
