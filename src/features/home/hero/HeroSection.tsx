import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowDown, ArrowUpRight, CalendarCheck } from '@phosphor-icons/react'
import { chapterPath, homeHero, workChapters } from '@/content/home'
import { useScrollScene } from '@/hooks/use-scroll-scene'
import { scrollToSection } from '@/lib/motion/smooth-scroll'
import { heroScene } from './hero-scene'
import './hero.css'

/**
 * Hero: who and what in one glance. An eyebrow with the name and role, a thin line over a bold one,
 * one plain-English paragraph, the booking button, then the five projects as job cards so the proof is
 * on the first screen. On scroll the lines part and sink back (hero-scene.ts on desktop, CSS scroll
 * timeline on phones). Each line sits in a `__layer` wrapper so scroll and load motion never share a transform.
 */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollScene(ref, heroScene)

  return (
    <section ref={ref} id="top" className="hero" aria-labelledby="hero-title">
      <p className="hero__eyebrow">{homeHero.eyebrow}</p>
      <h1 id="hero-title" className="hero__title">
        <span className="hero__layer hero__layer--thin">
          <span className="hero__line hero__line--thin">{homeHero.headlineThin}</span>
        </span>
        <span className="hero__layer hero__layer--bold">
          <span className="hero__line hero__line--bold">{homeHero.headlineBold}</span>
        </span>
      </h1>

      <div className="hero__foot">
        <p className="hero__sub">{homeHero.subhead}</p>

        <div className="hero__ctas">
          <a className="hero__cta btn-solid" href={homeHero.cta.href} target="_blank" rel="noopener">
            <CalendarCheck size={18} weight="bold" aria-hidden />
            {homeHero.cta.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link
            to={homeHero.secondary.to}
            className="btn-line"
            onClick={(event) => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
              event.preventDefault()
              scrollToSection('work')
            }}
          >
            {homeHero.secondary.label}
            <ArrowDown size={16} weight="bold" aria-hidden />
          </Link>
        </div>

        <p className="hero__tagline">
          <b>{homeHero.tagline.line}</b> <span>{homeHero.tagline.gloss}</span>
        </p>

        <nav className="hero__proof" aria-label="Projects">
          <ol>
            {workChapters.map((chapter) => (
              <li key={chapter.id}>
                <Link to={chapterPath(chapter.id)} state={{ sheet: true }} preventScrollReset className="hero__job">
                  <span className="hero__job-code">{chapter.code}</span>
                  <span className="hero__job-title">{chapter.title}</span>
                  <span className="hero__job-kind">{chapter.kind}</span>
                  <ArrowUpRight className="hero__job-go" size={14} weight="bold" aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <ul className="hero__facts">
          {homeHero.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
