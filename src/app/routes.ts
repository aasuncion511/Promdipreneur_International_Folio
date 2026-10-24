import type { Icon } from '@phosphor-icons/react'
import { Briefcase, CalendarCheck, Envelope, FileText, House, ShieldCheck, Stack, Storefront, User, Wrench } from '@phosphor-icons/react'
import { workCount } from '@/content/work'
import { booking, externalLinks, site } from '@/content/site'

/**
 * The route registry: the one list that drives the router, the sidebar, the search palette
 * and every page title. Add a page = add one entry here.
 */

export type NavGroupId = 'menu' | 'discover' | 'general'

export const NAV_GROUPS: { id: NavGroupId; label: string }[] = [
  { id: 'menu', label: 'Menu' },
  { id: 'discover', label: 'Next step' },
  { id: 'general', label: 'General' },
]

export type PageRoute = {
  kind: 'page'
  id: string
  path: string
  /** Short name for the sidebar and search. */
  label: string
  /** Unique document title. */
  title: string
  description: string
  icon: Icon
  /** Omit to keep the page out of the sidebar (legal pages). */
  group?: NavGroupId
  badge?: number
  /** A Home section id: the sidebar and search scroll Home to it instead of opening `path`. */
  section?: string
  /** Still the RouteStage placeholder: kept out of the sitemap (RouteStage also marks it noindex).
   *  Remove when the page is built and registered in router.tsx PAGE_COMPONENTS. */
  draft?: true
}

export type ExternalRoute = {
  kind: 'external'
  id: string
  href: string
  label: string
  description: string
  icon: Icon
  group: NavGroupId
}

export type NavEntry = PageRoute | ExternalRoute

/** Every page title ends with your name (content/site.ts). */
const SUFFIX = site.name

export const pages: PageRoute[] = [
  {
    kind: 'page',
    id: 'home',
    path: '/',
    label: 'Home',
    title: `${SUFFIX} | Business Systems & Automation Implementer`,
    description: '20+ years running sales, operations and supply businesses. I map how your work really moves, then build the CRM, workflows and automation around it.',
    icon: House,
    group: 'menu',
  },
  {
    kind: 'page',
    id: 'work',
    draft: true,
    path: '/work',
    label: 'Work',
    title: `Work | ${SUFFIX}`,
    description: 'Five systems Allan built: a cleaning-business kit funnel, a Sheets payroll app, a GoHighLevel store, a service business journey and event QR check-in.',
    icon: Briefcase,
    group: 'menu',
    badge: workCount,
    section: 'work',
  },
  {
    kind: 'page',
    id: 'services',
    draft: true,
    path: '/services',
    label: 'Ways to work',
    title: `Ways to work together | ${SUFFIX}`,
    description: 'Process and CRM mapping, defined implementation projects, part-time systems support and agency delivery support.',
    icon: Stack,
    group: 'menu',
    section: 'services',
  },
  {
    kind: 'page',
    id: 'about',
    draft: true,
    path: '/about',
    label: 'Experience',
    title: `Experience | ${SUFFIX}`,
    description: '20+ years of sales, operations, supply and startup experience, including years with US-based companies, now applied to business systems.',
    icon: User,
    group: 'menu',
    section: 'about',
  },
  {
    kind: 'page',
    id: 'tools',
    draft: true,
    path: '/tools',
    label: 'Toolbox',
    title: `Toolbox | ${SUFFIX}`,
    description: 'GoHighLevel, Google Sheets and Apps Script, AI models for thinking and prototyping, and development tools for versioned builds.',
    icon: Wrench,
    group: 'menu',
    section: 'tools',
  },
  {
    kind: 'page',
    id: 'contact',
    path: '/contact',
    label: 'Contact',
    title: `Contact | ${SUFFIX}`,
    description: 'Book a project introduction or email Allan about the process you want organized and automated. Replies within one business day.',
    icon: Envelope,
    group: 'discover',
    section: 'contact',
  },
  {
    kind: 'page',
    id: 'privacy',
    path: '/privacy',
    label: 'Privacy Policy',
    title: `Privacy Policy | ${SUFFIX}`,
    description: 'What this site stores, what it does not, and how to ask for your data.',
    icon: ShieldCheck,
  },
  {
    kind: 'page',
    id: 'terms',
    path: '/terms',
    label: 'Terms of Service',
    title: `Terms of Service | ${SUFFIX}`,
    description: 'The terms for using this portfolio site.',
    icon: FileText,
  },
]

export const externals: ExternalRoute[] = [
  {
    kind: 'external',
    id: 'book',
    href: booking.href,
    label: booking.short,
    description: 'Open the project-introduction calendar in a new tab.',
    icon: CalendarCheck,
    group: 'discover',
  },
  {
    kind: 'external',
    id: 'store',
    href: externalLinks.store,
    label: 'Digital store',
    description: 'The live PromdiPreneur store (P-03 in the work).',
    icon: Storefront,
    group: 'discover',
  },
]


/** Sidebar entries per group, in registry order (pages first, then external links). */
export function navEntries(group: NavGroupId): NavEntry[] {
  return [...pages.filter((p) => p.group === group), ...externals.filter((e) => e.group === group)]
}

/** Where a nav entry goes: its Home section when it has one, else its page. */
export function navTarget(page: PageRoute): string {
  return page.section ? `/#${page.section}` : page.path
}

export const notFoundTitle = `Page Not Found | ${SUFFIX}`
