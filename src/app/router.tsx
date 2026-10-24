import type { ComponentType } from 'react'
import { createBrowserRouter, createMemoryRouter, Navigate, type RouteObject } from 'react-router'
import { findChapter } from '@/content/home'
import { ContactPage } from '@/features/contact/ContactPage'
import { HomePage } from '@/features/home/HomePage'
import { LegalPage } from '@/features/legal/LegalPage'
import { AppShell } from './AppShell'
import { RouteStage } from './RouteStage'
import { notFoundTitle, pages, type PageRoute } from './routes'

/** Built pages by registry id. Any page not listed here still renders the bare RouteStage. */
const PAGE_COMPONENTS: Partial<Record<string, ComponentType<{ page: PageRoute }>>> = {
  home: HomePage,
  contact: ContactPage,
  privacy: LegalPage,
  terms: LegalPage,
}

function elementFor(page: PageRoute) {
  // A page that only lives as a Home section (Work, Services, About) sends its own URL there.
  if (page.draft && page.section) return <Navigate to={`/#${page.section}`} replace />
  const Page = PAGE_COMPONENTS[page.id] ?? RouteStage
  return <Page page={page} />
}

/**
 * Home is a layout over its own URL and the Work chapter URLs (/work/<chapter>). Moving between
 * them keeps Home mounted, so a chapter sheet opens over the page you were on and closes back to it.
 * HomePage reads the chapter from the URL; the child routes render nothing themselves.
 */
function routeFor(page: PageRoute): RouteObject {
  if (page.path === '/') {
    return { element: elementFor(page), children: [{ index: true }, { path: 'work/:chapter' }] }
  }
  return { path: page.path.slice(1), element: elementFor(page) }
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    children: [...pages.map(routeFor), { path: '*', element: <RouteStage title={notFoundTitle} label="Page not found" /> }],
  },
]

/**
 * The review build (VITE_REVIEW_ARTIFACT=1, `npm run build:review`) runs inside a hosted viewer whose
 * address bar never follows the page, so routing stays in memory. A bare `#token` in the link opens a
 * project (`#payroll`) or a Home section (`#contact`); everything else behaves as on the real site.
 */
function reviewEntry(): string {
  const token = window.location.hash.slice(1)
  if (findChapter(token)) return `/work/${token}`
  return token ? `/#${token}` : '/'
}

/** Every route comes from the registry in routes.ts. */
export const router = import.meta.env.VITE_REVIEW_ARTIFACT === '1' ? createMemoryRouter(routes, { initialEntries: [reviewEntry()] }) : createBrowserRouter(routes)
