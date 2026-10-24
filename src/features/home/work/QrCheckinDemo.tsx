import { useEffect, useRef, useState, type FormEvent } from 'react'
import { MagnifyingGlass, Play, Stop } from '@phosphor-icons/react'

/**
 * P-05 demo: the MinBizCon 2026 scanner's check-in rules, recreated in the browser with synthetic
 * attendees. It follows the real scanner's rules:
 * only codes starting MBC2026- are read, the event day decides which column is marked, a second scan
 * the same day is a duplicate, unknown IDs are "not registered", results reset after 3 seconds, and
 * walk-ins found by name are processed (new ID, QR email, check-in) or flagged. It connects to nothing.
 */

type Day = 1 | 2 | 3
type Attendee = { id: string; name: string; company: string; position: string; days: Partial<Record<Day, string>> }
type WalkIn = { row: number; name: string; company: string; payment: 'Paid' | 'Non-Paying' | 'For Payment'; done?: string; flagged?: boolean }
type Result =
  | { kind: 'checked_in' | 'already_checked_in'; a: Attendee; day: Day; time: string }
  | { kind: 'not_found'; id: string }
type LogRow = { n: number; time: string; id: string; name: string; day: Day; station: string; status: 'Success' }

const PREFIX = 'MBC2026-'
const STATION = 'Main Gate'

const seedAttendees = (): Attendee[] => [
  { id: 'MBC2026-0001', name: 'Sample Attendee One', company: 'Sample Trading Co.', position: 'Owner', days: {} },
  { id: 'MBC2026-0002', name: 'Sample Attendee Two', company: 'Demo Hardware Supply', position: 'Operations Head', days: {} },
  { id: 'MBC2026-0003', name: 'Sample Attendee Three', company: 'Example Chamber of Commerce', position: 'President', days: {} },
  { id: 'MBC2026-0004', name: 'Sample Attendee Four', company: 'Placeholder Foods Inc.', position: 'Marketing Lead', days: {} },
]
const seedWalkIns = (): WalkIn[] => [
  { row: 41, name: 'Walk-in Sample Paid', company: 'Demo Logistics', payment: 'Paid' },
  { row: 42, name: 'Walk-in Sample Guest', company: 'Example University', payment: 'Non-Paying' },
  { row: 43, name: 'Walk-in Sample Pending', company: 'Sample Retail', payment: 'For Payment' },
]

/** The cards a visitor can "scan": four registered codes, one unknown ID and one foreign QR the filter ignores. */
const TICKETS = [
  { code: 'MBC2026-0001', label: 'Attendee One' },
  { code: 'MBC2026-0002', label: 'Attendee Two' },
  { code: 'MBC2026-0003', label: 'Attendee Three' },
  { code: 'MBC2026-0004', label: 'Attendee Four' },
  { code: 'MBC2026-0999', label: 'Unregistered code' },
  { code: 'WIFI:VenueGuest', label: 'Venue Wi-Fi QR' },
]

const pad = (n: number) => String(n).padStart(2, '0')
const clock = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  return `${((h + 11) % 12) + 1}:${pad(minutes % 60)} ${h < 12 ? 'AM' : 'PM'}`
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** A decorative code pattern seeded by the ID: it looks like a QR but encodes nothing. */
function Pattern({ seed, size = 17 }: { seed: string; size?: number }) {
  let x = [...seed].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0
  const rand = () => ((x = (x * 1103515245 + 12345) >>> 0) / 4294967296)
  const finder = (fx: number, fy: number, cx: number, cy: number) => cx >= fx && cx < fx + 6 && cy >= fy && cy < fy + 6
  const cells: [number, number][] = []
  for (let y = 0; y < size; y++)
    for (let c = 0; c < size; c++)
      if (!finder(0, 0, c, y) && !finder(size - 6, 0, c, y) && !finder(0, size - 6, c, y) && rand() > 0.55) cells.push([c, y])
  const box = (fx: number, fy: number) => (
    <g key={`${fx}-${fy}`}>
      <rect x={fx} y={fy} width={5} height={5} fill="currentColor" />
      <rect x={fx + 1} y={fy + 1} width={3} height={3} fill="#fff" />
      <rect x={fx + 2} y={fy + 2} width={1} height={1} fill="currentColor" />
    </g>
  )
  return (
    <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} aria-hidden className="qd__pattern">
      <rect x={-1} y={-1} width={size + 2} height={size + 2} fill="#fff" />
      {box(0, 0)}
      {box(size - 5, 0)}
      {box(0, size - 5)}
      {cells.map(([c, y]) => (
        <rect key={`${c}.${y}`} x={c} y={y} width={1} height={1} fill="currentColor" />
      ))}
    </svg>
  )
}

export function QrCheckinDemo() {
  const [day, setDay] = useState<Day>(1)
  const [people, setPeople] = useState(seedAttendees)
  const [walkIns, setWalkIns] = useState(seedWalkIns)
  const [log, setLog] = useState<LogRow[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [countdown, setCountdown] = useState(0)
  const [busy, setBusy] = useState(false)
  const [hint, setHint] = useState("Point camera at participant's QR code")
  const [query, setQuery] = useState('')
  const [manual, setManual] = useState('')
  const [playing, setPlaying] = useState(false)
  const [focusCode, setFocusCode] = useState<string | null>(null)
  const minutes = useRef(8 * 60 + 2)
  const nextId = useRef(5)
  const logN = useRef(0)
  const stopRef = useRef(false)
  const state = useRef({ people, walkIns, day })
  useEffect(() => {
    state.current = { people, walkIns, day }
  }, [people, walkIns, day])

  // The real scanner dismisses each result after 3 seconds.
  useEffect(() => {
    if (!result) return
    const t = setInterval(() => setCountdown((c) => c - 1), 1000)
    const done = setTimeout(() => setResult(null), 3000)
    return () => {
      clearInterval(t)
      clearTimeout(done)
    }
  }, [result])

  useEffect(() => () => void (stopRef.current = true), [])

  const show = (r: Result) => {
    setCountdown(3)
    setResult(r)
  }
  const tick = () => clock((minutes.current += 1 + Math.floor(Math.random() * 3)))
  const addLog = (row: Omit<LogRow, 'n'>) => setLog((l) => [{ ...row, n: ++logN.current }, ...l].slice(0, 6))

  async function scan(raw: string, station = STATION) {
    const code = raw.trim().toUpperCase()
    if (!code.startsWith(PREFIX)) {
      setHint('Ignored: not an MBC2026 code (only event QR codes are read)')
      return
    }
    setHint("Point camera at participant's QR code")
    setBusy(true)
    await sleep(550)
    setBusy(false)
    const { people: list, day: d } = state.current
    const a = list.find((p) => p.id === code)
    if (!a) {
      show({ kind: 'not_found', id: code })
      return
    }
    if (a.days[d]) {
      // A repeat scan the same day shows the original time and adds no log row.
      show({ kind: 'already_checked_in', a, day: d, time: a.days[d]! })
      return
    }
    const time = tick()
    const updated = { ...a, days: { ...a.days, [d]: time } }
    setPeople((ps) => ps.map((p) => (p.id === code ? updated : p)))
    show({ kind: 'checked_in', a: updated, day: d, time })
    addLog({ time, id: code, name: a.name, day: d, station, status: 'Success' })
  }

  async function processWalkIn(row: number) {
    const w = state.current.walkIns.find((x) => x.row === row)
    if (!w) return
    setBusy(true)
    await sleep(700)
    setBusy(false)
    const id = `${PREFIX}${String(nextId.current++).padStart(4, '0')}`
    const time = tick()
    const d = state.current.day
    const a: Attendee = { id, name: w.name, company: w.company, position: `Walk-in · ${w.payment}`, days: { [d]: time } }
    setPeople((ps) => [...ps, a])
    setWalkIns((ws) => ws.map((x) => (x.row === row ? { ...x, done: id } : x)))
    setQuery('')
    show({ kind: 'checked_in', a, day: d, time })
    addLog({ time, id, name: a.name, day: d, station: `${STATION} (Walk-In)`, status: 'Success' })
  }

  const flagWalkIn = (row: number) => setWalkIns((ws) => ws.map((x) => (x.row === row ? { ...x, flagged: true } : x)))

  function reset() {
    stopRef.current = true
    setPlaying(false)
    setDay(1)
    setPeople(seedAttendees())
    setWalkIns(seedWalkIns())
    setLog([])
    setResult(null)
    setQuery('')
    setHint("Point camera at participant's QR code")
    minutes.current = 8 * 60 + 2
    nextId.current = 5
  }

  async function play() {
    reset()
    await sleep(50)
    stopRef.current = false
    setPlaying(true)
    const step = async (fn: () => unknown, wait = 3600) => {
      if (stopRef.current) throw new Error('stopped')
      await fn()
      await sleep(wait)
    }
    try {
      await step(() => setFocusCode('MBC2026-0001'), 700)
      await step(() => scan('MBC2026-0001'))
      await step(() => scan('MBC2026-0001'))
      await step(() => setFocusCode('WIFI:VenueGuest'), 600)
      await step(() => scan('WIFI:VenueGuest'), 2200)
      await step(() => setFocusCode('MBC2026-0999'), 600)
      await step(() => scan('MBC2026-0999'))
      await step(() => setFocusCode(null), 200)
      await step(() => setQuery('Walk-in'), 1800)
      await step(() => processWalkIn(41))
      await step(() => setDay(2), 900)
      await step(() => setFocusCode('MBC2026-0001'), 600)
      await step(() => scan('MBC2026-0001'))
    } catch {
      /* stopped */
    }
    setFocusCode(null)
    setPlaying(false)
  }

  const stop = () => {
    stopRef.current = true
    setPlaying(false)
    setFocusCode(null)
  }

  const onManual = (e: FormEvent) => {
    e.preventDefault()
    if (!manual.trim()) return
    void scan(manual)
    setManual('')
  }

  const checkedToday = people.filter((p) => p.days[day]).length
  const matches = query.trim().length >= 2 ? walkIns.filter((w) => w.name.toLowerCase().includes(query.trim().toLowerCase())) : []

  return (
    <figure className="qd" data-reveal>
      <figcaption className="qd__head">
        <span className="qd__label">Interactive demo · synthetic data · connects to nothing</span>
        <span className="qd__controls">
          {playing ? (
            <button type="button" className="qd__btn" onClick={stop}>
              <Stop size={14} weight="fill" aria-hidden /> Stop
            </button>
          ) : (
            <button type="button" className="qd__btn qd__btn--go" onClick={play}>
              <Play size={14} weight="fill" aria-hidden /> Play the demo
            </button>
          )}
          <button type="button" className="qd__btn" onClick={reset}>
            Reset
          </button>
        </span>
      </figcaption>

      <div className="qd__grid">
        {/* The scanner, styled after the real one */}
        <div className="qd__phone" aria-label="Scanner (demo)">
          <div className="qd__bar">
            <span>
              <b>MinBizCon 2026</b>
              <small>{STATION}</small>
            </span>
            <span className="qd__stats" aria-label={`${checkedToday} of ${people.length} checked in on Day ${day}`}>
              {checkedToday} / {people.length}
            </span>
          </div>
          <div className="qd__days" role="group" aria-label="Event day (set from the date on the real scanner)">
            {([1, 2, 3] as Day[]).map((d) => (
              <button key={d} type="button" aria-pressed={day === d} onClick={() => setDay(d)} disabled={playing}>
                Day {d} · Aug {10 + d}
              </button>
            ))}
          </div>
          <div className="qd__search">
            <MagnifyingGlass size={14} aria-hidden />
            <input
              id="qd-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a walk-in by name (try “walk-in”)"
              aria-label="Find a walk-in by name"
              disabled={playing}
            />
          </div>
          {matches.length ? (
            <ul className="qd__walkins">
              {matches.map((w) => (
                <li key={w.row}>
                  <b>{w.name}</b>
                  <small>{w.company}</small>
                  <span className="qd__tags">
                    <span className="qd__pay" data-pay={w.payment}>
                      {w.payment === 'For Payment' ? '⚠ ' : ''}
                      {w.payment}
                    </span>
                    {w.flagged ? <span className="qd__pay" data-pay="flag">Flagged for review</span> : null}
                    {w.done ? <span className="qd__pay" data-pay="Paid">Processed · {w.done}</span> : null}
                  </span>
                  {!w.done && !w.flagged ? (
                    <span className="qd__acts">
                      <button type="button" onClick={() => processWalkIn(w.row)} disabled={busy}>
                        Process
                      </button>
                      <button type="button" onClick={() => flagWalkIn(w.row)}>
                        Flag
                      </button>
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="qd__view">
            <span className="qd__corner" aria-hidden />
            <span className="qd__line" aria-hidden />
            {focusCode ? (
              <span className="qd__aim" aria-hidden>
                <Pattern seed={focusCode} />
              </span>
            ) : null}
            <p className="qd__hint">{busy ? 'Processing…' : hint}</p>

            <div className="qd__result" data-kind={result?.kind ?? ''} role="status" aria-live="polite">
              {result ? (
                result.kind === 'not_found' ? (
                  <>
                    <b className="qd__badge">NOT REGISTERED</b>
                    <strong>Participant not found</strong>
                    <span>{result.id} is not in the database</span>
                    <span>Direct to manual registration desk</span>
                  </>
                ) : (
                  <>
                    <b className="qd__badge">
                      {result.kind === 'checked_in' ? 'CHECKED IN' : 'ALREADY CHECKED IN'} — Day {result.day}
                    </b>
                    <strong>{result.a.name}</strong>
                    <span>{result.a.company}</span>
                    <span>{result.a.position}</span>
                    <span>{result.kind === 'checked_in' ? `Checked in at ${result.time}` : `Previously at ${result.time}`}</span>
                  </>
                )
              ) : null}
              {result ? <small className="qd__count">Scanning again in {Math.max(countdown, 1)}…</small> : null}
            </div>
          </div>
          <form className="qd__manual" onSubmit={onManual}>
            <label htmlFor="qd-manual">Manual</label>
            <input id="qd-manual" value={manual} onChange={(e) => setManual(e.target.value)} placeholder="MBC2026-0002" disabled={playing} />
            <button type="submit" disabled={playing}>
              Check in
            </button>
          </form>
        </div>

        {/* What staff point the camera at, and the sheet the scans land in */}
        <div className="qd__side">
          <p className="qd__sub">Tap a code to scan it</p>
          <ul className="qd__tickets">
            {TICKETS.map((t) => (
              <li key={t.code}>
                <button type="button" onClick={() => scan(t.code)} disabled={playing || busy} data-aim={focusCode === t.code || undefined}>
                  <Pattern seed={t.code} />
                  <span>
                    <b>{t.label}</b>
                    <small>{t.code}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="qd__sub">Checkin_Log: one row per successful check-in</p>
          <div className="qd__logwrap">
            <table className="qd__log">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">ID</th>
                  <th scope="col">Day</th>
                  <th scope="col">Station</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {log.length ? (
                  log.map((r) => (
                    <tr key={r.n} data-status={r.status}>
                      <td>{r.time}</td>
                      <td>{r.id}</td>
                      <td>{r.day}</td>
                      <td>{r.station}</td>
                      <td>{r.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No scans yet. Press Play, or tap a code.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </figure>
  )
}
