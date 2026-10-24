// Links shown in the site header, in order.
// Add, remove, or reorder items here; the header updates automatically.

export interface NavigationLink {
  label: string;
  href: string;
}

export const navigation: NavigationLink[] = [
  { label: 'about', href: '/about' },
  { label: 'rss', href: '/rss.xml' },
];
