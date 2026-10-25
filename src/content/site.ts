import type { SocialLink } from './schema'

/** Public files (images, fonts) under the deploy base, so the same build works at a domain root or a sub-path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/**
 * Who the site is about. START HERE: every page, the sidebar, the SEO tags and the legal pages read
 * these values, so changing them here changes them everywhere.
 */
export const site = {
  name: 'Allan Asuncion',
  fullName: 'Allan Jay D. Asuncion',
  brand: 'PromdiPreneur BASA Consultancy',
  /** BASA, spelled out once wherever the acronym first appears. */
  basa: 'Business Automation Solutions Architect',
  tagline: 'From diskarte to systems.',
  /** The tagline for visitors who do not speak Filipino. */
  taglineMeaning: 'From getting by on improvisation to a process your team can follow.',
  /** The real PromdiPreneur lockup (salakot + lightbulb mark and wordmark), cropped from the original asset.
   *  The wordmark is dark green, so on the dark theme it sits on a cream plate rather than being recoloured. */
  logo: {
    full: asset('/images/brand/promdipreneur-logo-480.webp'),
    fullLarge: asset('/images/brand/promdipreneur-logo-1200.webp'),
    fullWidth: 480,
    fullHeight: 214,
    mark: asset('/images/brand/mark-96.webp'),
    markLarge: asset('/images/brand/mark-512.webp'),
  },
  /** The live address, no trailing slash. Canonical URLs, the sitemap and the JSON-LD use it. */
  url: 'https://portfolio.promdipreneur.com',
  role: 'Business Systems & Automation Implementer',
  email: 'allan@promdipreneur.com',
  emailSubject: 'Project inquiry from your portfolio',
  replyPromise: 'I reply within one business day (Philippine time).',
  location: 'Cagayan de Oro, Philippines (GMT+8)',
  /** Two-letter country code (ISO 3166) for the Person JSON-LD address. */
  countryCode: 'PH',
  /** Your clock, shown live at the top of the sidebar. */
  timeZone: 'Asia/Manila',
  timePlace: 'in the Philippines',
  /** No verified portrait yet: the sidebar shows a monogram. */
  monogram: 'AA',
} as const

/** The existing international project-introduction calendar (GoHighLevel). Not the paid Philippine discovery offer. */
export const booking = {
  href: 'https://api.leadconnectorhq.com/widget/booking/ireOpOYGzupk7E9wo3zy',
  label: 'Book a project introduction',
  short: 'Book an intro',
}

/** Up to five fit the sidebar header. `icon` picks the glyph in components/brand/SocialIcon.tsx. */
export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/allan-asuncion-39878434/', external: true, icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/aasuncion511', external: true, icon: 'github' },
]

/** Off-site links the pages point at. */
export const externalLinks = {
  store: 'https://shop.promdipreneur.com/products-list',
  company: 'https://portfolio.promdipreneur.com',
} as const

export function mailtoHref(): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}`
}
