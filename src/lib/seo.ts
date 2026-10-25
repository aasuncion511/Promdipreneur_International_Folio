import { site } from '@/content/site'
import type { Faq, WorkChapter } from '@/content/schema'

/** Absolute URL for a site path or an already absolute link. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl
  return `${site.url}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

/** Title for a Work chapter's own URL. */
export const chapterTitle = (chapter: WorkChapter) => `${chapter.title} (${chapter.code}) | Case study by ${site.name}`

/**
 * schema.org structured data for a project's case study: a WebPage about one CreativeWork, linking to
 * its live page and capture. Serialized safe for an inline <script>.
 */
export function chapterJsonLd(chapter: WorkChapter, path: string): string {
  const live = chapter.caseStudy.links[0]
  const picture = chapter.tile ?? chapter.caseStudy.evidence[0]
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${chapter.title}: case study`,
    description: chapter.description,
    url: absoluteUrl(path),
    isPartOf: { '@type': 'WebSite', name: `${site.name} - ${site.brand}`, url: site.url },
    about: {
      '@type': 'CreativeWork',
      name: chapter.title,
      description: chapter.description,
      ...(live ? { url: live.href } : {}),
      ...(picture ? { image: absoluteUrl(picture.src) } : {}),
      creator: { '@type': 'Person', '@id': `${site.url}/#person`, name: site.name },
    },
  }
  // "<" escaped so a value can never close the script element early.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

const person = () => ({ '@type': 'Person', '@id': `${site.url}/#person`, name: site.name, url: site.url, jobTitle: site.role })

function breadcrumbs(path: string, name: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name, item: absoluteUrl(path) },
    ],
  }
}

type PersonLd = { description: string; skills: string[]; sameAs: string[] }

/**
 * Home's Experience section: Allan as a Person (the `#person` node the other pages point at), with the
 * profiles that confirm who he is. No credential node: none is claimed without evidence.
 */
export function personJsonLd({ description, skills, sameAs }: PersonLd): string {
  return serialize([
    {
      ...person(),
      description,
      image: absoluteUrl(site.avatar.large),
      address: { '@type': 'PostalAddress', addressLocality: 'Cagayan de Oro', addressCountry: site.countryCode },
      worksFor: { '@type': 'Organization', name: site.brand, url: site.url },
      knowsAbout: skills,
      sameAs,
    },
  ])
}

const serialize = (graph: object[]) => JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')

type ContactLd = { path: string; title: string; description: string; faq: Faq[] }

/** Contact page: a ContactPage about you with your email as the contact point, the visible FAQ, the breadcrumb. */
export function contactJsonLd({ path, title, description, faq }: ContactLd): string {
  return serialize([
    {
      '@type': 'ContactPage',
      '@id': absoluteUrl(path),
      name: title,
      description,
      url: absoluteUrl(path),
      about: { ...person(), email: site.email, contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: site.email, availableLanguage: 'English' } },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
    },
    breadcrumbs(path, 'Contact'),
  ])
}
