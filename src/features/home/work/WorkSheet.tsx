import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ArrowRight, ArrowUpRight, Gear, User, X } from '@phosphor-icons/react'
import { HeadMeta } from '@/app/PageMeta'
import { chapterPath, workChapters } from '@/content/home'
import type { WorkChapter } from '@/content/schema'
import { gsap, MOTION_CONDITIONS, spring } from '@/lib/motion/gsap'
import { chapterJsonLd, chapterTitle } from '@/lib/seo'
import { QrCheckinDemo } from './QrCheckinDemo'
import { useSheet } from './use-sheet'
import './work-sheet.css'

type SheetState = { sheet?: boolean } | null

const pad2 = (n: number) => String(n).padStart(2, '0')

/**
 * The case study for one project, at its own URL (/work/<project>) so it can be shared, indexed and
 * opened directly. A native modal <dialog> (focus trap, Escape, top layer) holding a sheet that rises
 * over Home. Closing goes back in history when the visitor came from Home, so Back closes it too.
 * The sheet answers six questions in order: problem, what was built, Allan's role, the workflow,
 * why it matters, and the evidence (each picture labelled with what it proves).
 */
export function WorkSheet({ chapter }: { chapter: WorkChapter | null }) {
  const navigate = useNavigate()
  const location = useLocation()
  const fromHome = !!(location.state as SheetState)?.sheet
  const [shown, setShown] = useState<WorkChapter | null>(chapter)
  if (chapter && chapter !== shown) setShown(chapter)

  const requestClose = () => {
    if (fromHome) navigate(-1)
    else navigate('/', { preventScrollReset: true })
  }
  const { dialogRef, panelRef, scrimRef, onDragStart } = useSheet({
    open: !!chapter,
    onRequestClose: requestClose,
    onClosed: () => setShown(null),
  })

  // New chapter (opened, or "Next" inside the sheet): back to the top and bring the blocks in.
  const bodyRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const body = bodyRef.current
    if (!body || !shown) return
    body.scrollTop = 0
    headRef.current?.removeAttribute('data-scrolled')
    if (window.matchMedia(MOTION_CONDITIONS.reduce).matches) return
    const items = Array.from(body.querySelectorAll('[data-reveal]')).slice(0, 8)
    const tween = gsap.from(items, { y: 22, autoAlpha: 0, stagger: 0.045, delay: 0.08, ...spring({ response: 0.55 }) })
    return () => {
      tween.revert()
    }
  }, [shown])

  const onBodyScroll = () => {
    const scrolled = (bodyRef.current?.scrollTop ?? 0) > 4
    headRef.current?.toggleAttribute('data-scrolled', scrolled)
  }

  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === scrimRef.current) requestClose()
  }

  const next = shown ? workChapters[(workChapters.indexOf(shown) + 1) % workChapters.length] : undefined

  return (
    <dialog
      ref={dialogRef}
      className="sh"
      aria-labelledby="sh-title"
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onClick={onDialogClick}
    >
      <div ref={scrimRef} className="sh__scrim" />
      {chapter ? (
        <>
          <HeadMeta title={chapterTitle(chapter)} description={chapter.description} path={chapterPath(chapter.id)} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: chapterJsonLd(chapter, chapterPath(chapter.id)) }} />
        </>
      ) : null}

      <div ref={panelRef} className="sh__panel" tabIndex={-1}>
        <div className="sh__grab" onPointerDown={onDragStart} aria-hidden>
          <span />
        </div>

        {shown ? (
          <>
            <header ref={headRef} className="sh__head" onPointerDown={onDragStart}>
              <div>
                <p className="sh__meta">
                  <span className="sh__code">{shown.code}</span>
                  <span>{shown.kind}</span>
                  {shown.statusNote ? <span className="wb__pill">{shown.statusNote}</span> : null}
                </p>
                <h2 id="sh-title" className="sh__title">
                  {shown.title}
                </h2>
              </div>
              <button type="button" className="sh__close" onClick={requestClose} aria-label="Close case study">
                <X size={20} weight="bold" aria-hidden />
              </button>
            </header>

            <div ref={bodyRef} className="sh__body" onScroll={onBodyScroll}>
              <CaseStudyBody chapter={shown} />

              {next && next !== shown ? (
                <nav className="sh__next" aria-label="More work" data-reveal>
                  <Link to={chapterPath(next.id)} replace state={location.state} preventScrollReset>
                    <span className="wk-count">Next · {next.code}</span>
                    <span className="sh__next-title">{next.title}</span>
                    <ArrowRight size={22} weight="bold" aria-hidden />
                  </Link>
                </nav>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </dialog>
  )
}

function CaseStudyBody({ chapter }: { chapter: WorkChapter }) {
  const cs = chapter.caseStudy
  return (
    <article className="cs">
      <p className="cs__intro" data-reveal>
        {chapter.description}
      </p>
      <p className="cs__stack" data-reveal>
        {chapter.stack.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </p>

      <div className="cs__card" data-reveal>
        <section className="cs__cell cs__cell--problem" aria-labelledby="cs-problem">
          <h3 id="cs-problem" className="cs__label">
            <span>01</span> The problem
          </h3>
          <p>{cs.problem}</p>
        </section>
        <section className="cs__cell" aria-labelledby="cs-built">
          <h3 id="cs-built" className="cs__label">
            <span>02</span> What I built
          </h3>
          <ul className="cs__list">
            {cs.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="cs__cell" aria-labelledby="cs-role">
          <h3 id="cs-role" className="cs__label">
            <span>03</span> My role
          </h3>
          <ul className="cs__role">
            {cs.role.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="cs__block" aria-labelledby="cs-flow" data-reveal>
        <h3 id="cs-flow" className="cs__label">
          <span>04</span> How the workflow connects
        </h3>
        <ol className="cs__flow">
          {cs.flow.map((step, i) => (
            <li key={step.label} data-by={step.by}>
              <span className="cs__flow-n">{pad2(i + 1)}</span>
              <span className="cs__flow-by">
                {step.by === 'system' ? <Gear size={13} weight="bold" aria-hidden /> : <User size={13} weight="bold" aria-hidden />}
                {step.by === 'system' ? 'System' : 'Person'}
              </span>
              <b>{step.label}</b>
              <span className="cs__flow-note">{step.note}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="cs__block cs__matters" aria-labelledby="cs-matters" data-reveal>
        <h3 id="cs-matters" className="cs__label">
          <span>05</span> Why it matters operationally
        </h3>
        <p>{cs.matters}</p>
      </section>

      <section className="cs__block" aria-labelledby="cs-evidence">
        <h3 id="cs-evidence" className="cs__label" data-reveal>
          <span>06</span> {chapter.status === 'in-progress' ? 'Where it stands' : 'Evidence you can check'}
        </h3>
        {cs.links.length ? (
          <p className="cs__links" data-reveal>
            {cs.links.map((link, i) => (
              <a key={link.href} className={i === 0 ? 'btn-solid' : 'btn-line'} href={link.href} target="_blank" rel="noopener">
                {link.label}
                <ArrowUpRight size={16} weight="bold" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </p>
        ) : null}
        {cs.illustration === 'qr-checkin' ? <QrCheckinDemo /> : null}
        {cs.evidence.length ? (
          <ul className="cs__evidence">
            {cs.evidence.map((shot, i) => (
              <li key={shot.src} className={i === 0 ? 'cs__shot cs__shot--lead' : 'cs__shot'} data-reveal>
                <a href={shot.src} target="_blank" rel="noopener" className="cs__frame" aria-label={`${shot.caption}, full size (opens in a new tab)`}>
                  <img
                    src={shot.src}
                    srcSet={shot.srcSet}
                    sizes={i === 0 ? '(min-width: 1024px) 1080px, 92vw' : '(min-width: 1024px) 520px, 92vw'}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </a>
                <p className="cs__caption">
                  <span className="cs__scope" data-scope={shot.scope}>
                    {shot.scope}
                  </span>
                  {shot.caption}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="cs__notes" data-reveal>
          {cs.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}
