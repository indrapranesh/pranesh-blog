// Your links, shown under the introduction on the homepage and in the footer of every other page.
// Order here is the order on the page.
// A link with an empty href is hidden, so you can fill these in whenever you're ready.

export interface SocialLink {
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { label: 'github', href: 'https://github.com/indrapranesh' },
  { label: 'linkedin', href: '' }, // e.g. 'https://www.linkedin.com/in/your-name'
  // Put your resume at public/resume.pdf, then set href to '/resume.pdf'.
  { label: 'resume', href: '' },
  { label: 'email', href: '' }, // e.g. 'mailto:you@example.com'
  { label: 'x', href: '' }, // e.g. 'https://x.com/your-name'
];
