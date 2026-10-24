import { method } from './method'
import { booking, site } from './site'
import { workChapters, workPage } from './work'

export { workChapters }

/**
 * Home page copy. The hero pairs a thin line with a bold one, sized in `cqi` in
 * features/home/hero/hero.css so it fills the column (re-measure when you change the words).
 */
export const homeHero = {
  eyebrow: `${site.name} · ${site.role}`,
  headlineThin: 'Organize the work.',
  headlineBold: 'Automate the rest.',
  subhead:
    'I spent 20+ years running sales, operations and supply businesses. Now I map how your work really moves, then build the CRM, workflows and tools around it, so follow-ups happen and your team stops working from memory.',
  cta: { label: booking.label, href: booking.href },
  secondary: { label: 'See the work', to: '/#work' },
  /** The tagline, glossed for visitors who do not speak Filipino. */
  tagline: { line: site.tagline, gloss: site.taglineMeaning },
  facts: ['20+ years in business operations', 'US and Australian clients welcome', 'Defined projects or part-time support'],
}

/**
 * The statement under the hero: words light up as the page scrolls, each keyword lands bold and
 * moves the tracker. Keep four keywords (the tracker shows them in order).
 * A string is plain words; `{ key }` is a keyword.
 */
export type ManifestoPart = string | { key: string }

export const homeManifesto = {
  eyebrow: method.eyebrow,
  parts: [
    'New',
    { key: 'leads' },
    'wait for a reply nobody owns.',
    { key: 'Handoffs' },
    'live in someone’s memory, and the owner chases every update. I map the',
    { key: 'process' },
    'as it really runs, then build the',
    { key: 'system' },
    'your team can follow.',
  ] satisfies ManifestoPart[],
}

/** The URL of a chapter's case-study sheet. Real, shareable and in the sitemap. */
export const chapterPath = (id: string) => `/work/${id}`

export const workSection = {
  eyebrow: workPage.eyebrow,
  titleThin: workPage.titleThin,
  titleBold: workPage.titleBold,
  lede: workPage.lede,
}

export const findChapter = (id: string | undefined) => workChapters.find((chapter) => chapter.id === id)
