// Site navigation configuration. Single source of truth for menus so that a
// future CMS or a company stakeholder can change structure in one place.

export interface NavItem {
  label: string;
  href: string;
  /** Path prefix used to determine the active state. */
  match: string;
}

export const primaryNav: NavItem[] = [
  { label: 'About', href: '/about/', match: '/about' },
  { label: 'What We Do', href: '/what-we-do/', match: '/what-we-do' },
  { label: 'Products', href: '/products/', match: '/products' },
  { label: 'Impact', href: '/impact/', match: '/impact' },
  { label: 'Insights', href: '/insights/', match: '/insights' },
  { label: 'Contact', href: '/contact/', match: '/contact' },
];

export interface FooterColumn {
  heading: string;
  links: NavItem[];
}

export const footerNav: FooterColumn[] = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/', match: '/about' },
      { label: 'What We Do', href: '/what-we-do/', match: '/what-we-do' },
      { label: 'Impact', href: '/impact/', match: '/impact' },
      { label: 'Insights', href: '/insights/', match: '/insights' },
    ],
  },
  {
    heading: 'For Partners',
    links: [
      { label: 'Products', href: '/products/', match: '/products' },
      { label: 'Contact', href: '/contact/', match: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy/', match: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms/', match: '/terms' },
    ],
  },
];