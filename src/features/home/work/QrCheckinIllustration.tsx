import { CheckCircle, EnvelopeSimple, Table } from '@phosphor-icons/react'

/**
 * P-05 has no public demo, so its sheet shows this drawing instead of captures: one attendee's journey
 * from record to emailed code to desk scan. Every value is synthetic, and the "QR" is a decorative
 * pattern that encodes nothing, so no real attendee data or working access can leak from it.
 */

const SIZE = 21
// Deterministic pseudo-random modules (a fixed seed, so the drawing never changes between renders).
const modules: [number, number][] = []
let seed = 412
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648)
const inFinder = (x: number, y: number) => [[0, 0], [SIZE - 7, 0], [0, SIZE - 7]].some(([fx, fy]) => x >= fx! && x < fx! + 8 && y >= fy! && y < fy! + 8)
for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (!inFinder(x, y) && rand() > 0.52) modules.push([x, y])

function PatternCode() {
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} fill="currentColor" />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill="var(--paper)" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="currentColor" />
    </g>
  )
  return (
    <svg className="qr__code" viewBox={`-1 -1 ${SIZE + 2} ${SIZE + 2}`} role="img" aria-label="Decorative code pattern, not a working QR code">
      <rect x={-1} y={-1} width={SIZE + 2} height={SIZE + 2} fill="var(--paper)" />
      {finder(0, 0)}
      {finder(SIZE - 7, 0)}
      {finder(0, SIZE - 7)}
      {modules.map(([x, y]) => (
        <rect key={`${x}.${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
      ))}
    </svg>
  )
}

export function QrCheckinIllustration() {
  return (
    <figure className="qr" data-reveal>
      <figcaption className="qr__label">Illustration · synthetic data · not a working code</figcaption>
      <ol className="qr__steps">
        <li className="qr__panel">
          <p className="qr__kicker">
            <Table size={14} weight="bold" aria-hidden /> 1 · Attendee record
          </p>
          <dl className="qr__record">
            <div>
              <dt>ID</dt>
              <dd>MBC-0412</dd>
            </div>
            <div>
              <dt>Name</dt>
              <dd>Sample Attendee</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>attendee@example.com</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <span className="qr__pill">Code sent</span>
              </dd>
            </div>
          </dl>
        </li>
        <li className="qr__panel">
          <p className="qr__kicker">
            <EnvelopeSimple size={14} weight="bold" aria-hidden /> 2 · Confirmation email
          </p>
          <div className="qr__mail">
            <p className="qr__subject">Your MinBizCon 2026 check-in code</p>
            <p className="qr__body">Show this code at the registration desk.</p>
            <PatternCode />
            <p className="qr__id">MBC-0412</p>
          </div>
        </li>
        <li className="qr__panel">
          <p className="qr__kicker">
            <CheckCircle size={14} weight="bold" aria-hidden /> 3 · Desk scan
          </p>
          <div className="qr__scan">
            <CheckCircle size={40} weight="fill" aria-hidden />
            <p className="qr__ok">Verified</p>
            <p className="qr__body">MBC-0412 · Sample Attendee</p>
            <p className="qr__row">Attendance recorded · 08:42 · Desk 2</p>
          </div>
        </li>
      </ol>
    </figure>
  )
}
