import type { Icon } from '@phosphor-icons/react'
import { Handshake, Storefront, Truck, UsersThree } from '@phosphor-icons/react'
import { aboutSection, earlier, perspectives, roles, usNote, type Perspective } from '@/content/about'
import { site, socials } from '@/content/site'
import { personJsonLd } from '@/lib/seo'
import './about.css'

const ICONS: Record<Perspective['id'], Icon> = {
  owner: Storefront,
  staff: UsersThree,
  customer: Handshake,
  supplier: Truck,
}

const personLd = personJsonLd({
  description: aboutSection.lede,
  skills: ['CRM implementation', 'Workflow automation', 'Business process design', 'GoHighLevel', 'Google Apps Script', 'Operations management'],
  sameAs: socials.map((s) => s.href),
})

/**
 * Experience: the differentiator. Four business perspectives (owner, staff, customer, supplier), each
 * with what it taught, then a short selected timeline that marks the roles with US-based stakeholders.
 * Not a résumé: the point is that the systems come from someone who has run the work.
 */
export function AboutSection() {
  const s = aboutSection
  return (
    <section id="about" className="ab" aria-labelledby="ab-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personLd }} />
      <header className="ab__head">
        <p className="wk-eyebrow">{s.eyebrow}</p>
        <h2 id="ab-title" className="wk-title">
          <span>{s.titleThin}</span> <span className="wk-title__bold">{s.titleBold}</span>
        </h2>
        <p className="ab__lede">{s.lede}</p>
        <p className="ab__lead">{s.lead}</p>
      </header>

      <h3 className="ab__sub">{s.perspectivesTitle}</h3>
      <ul className="ab__persp">
        {perspectives.map((p) => {
          const Glyph = ICONS[p.id]
          return (
            <li key={p.id} className="ab__card">
              <span className="ab__icon" aria-hidden>
                <Glyph size={22} weight="duotone" />
              </span>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </li>
          )
        })}
      </ul>

      <div className="ab__time">
        <div className="ab__time-head">
          <h3 className="ab__sub">{s.timelineTitle}</h3>
          <p className="ab__legend">
            <span className="ab__us">US</span> {usNote}
          </p>
        </div>
        <ol className="ab__roles">
          {roles.map((r) => (
            <li key={r.org + r.title} className="ab__role">
              <span className="ab__period">{r.period}</span>
              <span className="ab__what">
                <b>{r.title}</b>
                <span className="ab__org">
                  {r.org}
                  {r.us ? (
                    <span className="ab__us" title={usNote}>
                      US
                    </span>
                  ) : null}
                </span>
                <span className="ab__detail">{r.detail}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="ab__earlier">{earlier}</p>
        <p className="ab__based">Based in {site.location}.</p>
      </div>
    </section>
  )
}
