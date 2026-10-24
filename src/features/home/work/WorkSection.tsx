import { Link } from 'react-router'
import { ArrowRight } from '@phosphor-icons/react'
import { chapterPath, workChapters, workSection } from '@/content/home'
import { chapterPicture } from './chapter-picture'
import { ChapterFace } from './ChapterFace'
import './work.css'

/** Tiles are lazy, so Chrome reads their real width (`auto`); the fallback is the largest tile's share of the screen. */
const TILE_SIZES = 'auto, (min-width: 1280px) 44vw, (min-width: 1024px) 60vw, 92vw'

/**
 * Work: the five projects as job cards. The two products lead large; the business, the store and the
 * event system follow. Each card shows a real capture (or the tools, when there is no public page), the
 * project's kind, a one-line summary and its workflow as a chip row, so the work reads without opening
 * anything. Every card is a real link to /work/<project>, which opens its case-study sheet over Home.
 */
const done = workChapters.filter((chapter) => chapter.status !== 'in-progress')
const running = workChapters.filter((chapter) => chapter.status === 'in-progress')

export function WorkSection() {
  return (
    <section id="work" className="wk wb" aria-labelledby="work-title">
      <header className="wb__head">
        <p className="wk-eyebrow">{workSection.eyebrow}</p>
        <h2 id="work-title" className="wk-title">
          <span className="wk-title__thin">{workSection.titleThin}</span> <span className="wk-title__bold">{workSection.titleBold}</span>
        </h2>
        <p className="wk-lede">{workSection.lede}</p>
      </header>
      <ul className="wb__grid">
        {done.map((chapter) => {
          const pic = chapterPicture(chapter)
          return (
            <li key={chapter.id} className="wb__cell" data-area={chapter.id}>
              <Link to={chapterPath(chapter.id)} state={{ sheet: true }} preventScrollReset className="wb__tile" data-kind={pic ? 'pic' : 'marks'}>
                <span className="wb__media" aria-hidden>
                  {pic ? (
                    <img
                      src={pic.src}
                      srcSet={pic.srcSet}
                      sizes={pic.srcSet ? TILE_SIZES : undefined}
                      alt=""
                      width={pic.width}
                      height={pic.height}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <ChapterFace chapter={chapter} foot={false} />
                  )}
                  <span className="wb__scope">{pic ? 'Live page' : 'No public demo'}</span>
                </span>
                <span className="wb__cap">
                  <span className="wb__meta">
                    <span className="wb__code">{chapter.code}</span>
                    <span>{chapter.kind}</span>
                  </span>
                  <b className="wb__title">{chapter.title}</b>
                  <span className="wb__line">{chapter.line}</span>
                  <span className="wb__flow">
                    {chapter.caseStudy.flow.map((step) => (
                      <span key={step.label} data-by={step.by}>
                        {step.label}
                      </span>
                    ))}
                  </span>
                  <span className="wb__open">
                    Open case study
                    <ArrowRight size={14} weight="bold" aria-hidden />
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      {running.length ? (
        <div className="wb__now">
          <h3 className="wb__now-title">In progress</h3>
          <ul>
            {running.map((chapter) => (
              <li key={chapter.id}>
                <Link to={chapterPath(chapter.id)} state={{ sheet: true }} preventScrollReset className="wb__now-card">
                  <span className="wb__now-face" aria-hidden>
                    <ChapterFace chapter={chapter} foot={false} />
                  </span>
                  <span className="wb__cap">
                    <span className="wb__meta">
                      <span className="wb__code">{chapter.code}</span>
                      <span className="wb__pill">{chapter.statusNote}</span>
                    </span>
                    <b className="wb__title">{chapter.title}</b>
                    <span className="wb__line">{chapter.line}</span>
                    <span className="wb__flow">
                      {chapter.caseStudy.flow.map((step) => (
                        <span key={step.label} data-by={step.by}>
                          {step.label}
                        </span>
                      ))}
                    </span>
                    <span className="wb__open">
                      See the set-up
                      <ArrowRight size={14} weight="bold" aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
