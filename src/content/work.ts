import type { Evidence, EvidenceScope, Image, WorkChapter } from './schema'
import { asset } from './site'
import { tools } from './tools'

/**
 * The five projects, each told as a case study. Facts only: counts and claims were checked against the
 * live public pages on 24 October 2026. A capture of a landing page proves its public presentation, not
 * the private backend; every picture says which it is. No paid purchase was made for this research.
 */

const WIDTHS = [480, 640, 960]

/** A capture from public/images/work (1440 wide), with its 480 / 640 / 960 copies. */
const shot = (id: string, alt: string, height: number): Image => ({
  src: asset(`/images/work/${id}.webp`),
  alt,
  width: 1440,
  height,
  srcSet: [...WIDTHS.map((w) => `${asset(`/images/work/${w}/${id}.webp`)} ${w}w`), `${asset(`/images/work/${id}.webp`)} 1440w`].join(', '),
})

const evidence = (id: string, height: number, caption: string, scope: EvidenceScope, alt = caption): Evidence => ({
  ...shot(id, alt, height),
  caption,
  scope,
})

const LIVE: EvidenceScope = 'Live public page'
const DEMO: EvidenceScope = 'Public demo, sample data'

export const workPage = {
  eyebrow: 'Selected work',
  titleThin: 'Five systems.',
  titleBold: 'Open any of them.',
  lede: 'Each one starts with a business problem I know from the inside. Tap a project for the workflow, my role and the evidence you can check yourself.',
}

export const workChapters: WorkChapter[] = [
  {
    id: 'cleaning-kits',
    code: 'P-01',
    kind: 'Own digital product',
    title: 'Cleaning Business Kits',
    line: 'Operations know-how from a real cleaning company, packaged and sold through a funnel.',
    count: 37,
    unit: 'editable templates',
    description:
      'A digital product built from running Fresh Start Cleaning: manuals, forms and checklists, sold through a GoHighLevel funnel with checkout and email delivery.',
    stack: ['GoHighLevel', 'SaligPay', 'Word + PDF'],
    marks: [tools.ghl],
    items: [],
    tile: shot('kits-hero', 'The Cleaning Business Kits funnel, first screen', 900),
    caseStudy: {
      problem:
        'Cleaning owners quote before the scope is clear, send crews without full instructions and close jobs with payment still open. The fix is a repeatable process, but most small operators have never seen one written down.',
      built: [
        'An operations manual, editable forms and service checklists drawn from how Fresh Start Cleaning actually runs jobs.',
        'Three offers (Operations Kit, Service Offer Model, Starter Combo) structured so a buyer can start with what they need.',
        'A customer-facing funnel that explains each package and routes to checkout.',
        'A purchase-to-delivery journey: SaligPay checkout, then the right package emailed to the buyer.',
      ],
      role: [
        'Wrote the product from my own operating records',
        'Structured the offers and pricing tiers',
        'Built the funnel and store pages in GoHighLevel',
        'Designed the post-purchase delivery workflow',
      ],
      flow: [
        { label: 'Problem page', note: 'Owner recognises the gaps', by: 'person' },
        { label: 'Choose a kit', note: 'Pack 1, Pack 2 or Combo', by: 'person' },
        { label: 'Checkout', note: 'SaligPay: QR Ph, e-wallet, card', by: 'system' },
        { label: 'Payment confirmed', note: 'Order tagged by product', by: 'system' },
        { label: 'Files emailed', note: 'The package that was bought', by: 'system' },
      ],
      matters:
        'The kit follows the same four stages as a real cleaning job: scope and quote, book and deploy, clean and hand over, collect and review. It is the clearest example of how I turn operating experience into a structure other people can follow.',
      evidence: [
        evidence('kits-hero', 900, 'Funnel first screen: the promise and the 37-template count', LIVE),
        evidence('kits-flow', 560, 'The kit mapped to the four stages of a cleaning job', LIVE),
        evidence('kits-pricing', 1000, 'Three offers, laid out for a buyer to choose', LIVE),
        evidence('kits-inside', 650, 'Actual blank pages from the forms pack (F05 quotation, F10 acceptance)', LIVE),
      ],
      links: [{ label: 'Open the live funnel', href: 'https://kits.promdipreneur.com/', external: true }],
      notes: [
        'Counts from the live page on 24 Oct 2026: 37 editable operations templates, 9 service-specific checklists, a 15-page operations manual.',
        'The page says files are emailed after successful payment. The captures show the public funnel; no purchase was made to test delivery for this portfolio.',
        'Built for Philippine cleaning businesses, priced in pesos.',
      ],
    },
  },
  {
    id: 'payroll',
    code: 'P-02',
    kind: 'Own software product',
    title: 'PromdiPreneur Payroll',
    line: 'A Google Sheets and Apps Script payroll system that runs every cutoff the same way.',
    count: 10,
    unit: 'step cutoff workflow',
    description:
      'A payroll system for Philippine SMEs built on Google Sheets and Apps Script: employee records, computation, payslips, leave and locked history, sold per company.',
    stack: ['Google Sheets', 'Apps Script', 'Gmail', 'AI-assisted build'],
    marks: [tools.sheets, tools.appsScript],
    items: [],
    tile: shot('payroll-demo', 'The public payroll demo running a sample cutoff', 1100),
    caseStudy: {
      problem:
        'Every payroll cutoff, a small business re-does the same computations by hand, keeps records in inconsistent files and types payslips one by one. Mistakes surface after people have been paid.',
      built: [
        'One workbook per company: setup, employees, pay periods, attendance and overtime, leave, register, payslips, remittance and archive.',
        'An Apps Script menu that runs the cutoff in order: Prepare, Validate, Finalize, email payslips, Mark Paid.',
        'Guard rails: finalized cutoffs are archived and locked, paid periods cannot be re-prepared, every action is logged.',
        'A licensing and access design so each company gets its own deployment, plus a public step-by-step demo.',
      ],
      role: [
        'Architecture: sheet structure, data flow and controls',
        'AI-assisted development of the Apps Script logic',
        'Licensing and company deployment design',
        'Product page, demo and checkout',
      ],
      flow: [
        { label: 'Employee records', note: 'One permanent ID per person', by: 'person' },
        { label: 'Cutoff inputs', note: 'Attendance, OT, leave', by: 'person' },
        { label: 'Validate + compute', note: 'Issues flagged before pay', by: 'system' },
        { label: 'Finalize', note: 'Archived and locked', by: 'system' },
        { label: 'Payslips + records', note: 'PDFs emailed, history kept', by: 'system' },
      ],
      matters:
        'The value is the control, not the arithmetic. Locked history, enforced order and a log mean an owner can hand payroll to an admin and still trust last month’s numbers. The same pattern applies to any repeated, high-stakes admin process.',
      evidence: [
        evidence('payroll-demo', 1100, 'Public demo: the ten-step cutoff and the real workbook, with a test employee', DEMO),
        evidence('payroll-hero', 900, 'Product page: what the system handles', LIVE),
        evidence('payroll-payslip', 520, 'Sample payslip as shown on the product page (illustrative figures)', LIVE),
        evidence('payroll-steps', 430, 'From checkout to first payroll, as stated publicly', LIVE),
      ],
      links: [
        { label: 'Try the public demo', href: 'https://payroll.promdipreneur.com/payroll-demo', external: true },
        { label: 'Open the product page', href: 'https://payroll.promdipreneur.com/', external: true },
      ],
      notes: [
        'Localized for Philippine payroll (SSS, PhilHealth, Pag-IBIG, BIR). It shows how I design and build a system; it is not a claim of US or Australian payroll expertise.',
        'Company setup is delivered by email within one business day after the company details are supplied. It is not instant or fully automatic provisioning.',
        'The demo uses sample data only. No real employee, salary, TIN or account details are shown anywhere on this site.',
      ],
    },
  },
  {
    id: 'digital-store',
    code: 'P-03',
    kind: 'Own storefront',
    title: 'PromdiPreneur Digital Store',
    line: 'One GoHighLevel store, two very different post-purchase journeys.',
    count: 4,
    unit: 'products, 2 fulfilment paths',
    description:
      'A GoHighLevel storefront that sells the cleaning kits and the payroll licence side by side, with product-specific CRM and fulfilment after SaligPay checkout.',
    stack: ['GoHighLevel', 'SaligPay', 'CRM workflows'],
    marks: [tools.ghl, tools.gmail],
    items: [],
    tile: shot('shop-products', 'The PromdiPreneur store product grid', 760),
    caseStudy: {
      problem:
        'A downloadable kit and a configured software licence cannot share one “thank you, here are your files” ending. Each product needs its own explanation before purchase and its own next step after it.',
      built: [
        'A storefront that groups products by the job they do: cleaning kits, and payroll for SMEs.',
        'Product pages and copy that explain what is delivered, how, and what the buyer needs.',
        'One cart and SaligPay checkout for everything.',
        'Product-specific CRM and fulfilment workflow architecture: kits go to file delivery, payroll goes to company setup.',
      ],
      role: ['Store structure and product presentation', 'Purchase journey design', 'CRM tagging and fulfilment workflow architecture'],
      flow: [
        { label: 'Catalog', note: 'Grouped by business need', by: 'person' },
        { label: 'Product page', note: 'What you get, how it arrives', by: 'person' },
        { label: 'Cart + checkout', note: 'SaligPay', by: 'system' },
        { label: 'Payment confirmed', note: 'Order tagged by product', by: 'system' },
        { label: 'Right next step', note: 'Kit: files emailed. Payroll: setup form', by: 'system' },
      ],
      matters:
        'Most online stores treat fulfilment as an afterthought. Designing the branch after payment is what stops support emails, refunds and confused buyers, and it is the same thinking an agency needs when one CRM serves several offers.',
      evidence: [
        evidence('shop-hero', 900, 'Store first screen', LIVE),
        evidence('shop-products', 760, 'Cleaning kits, each with its own explanation', LIVE),
        evidence('shop-payroll', 820, 'Payroll sold as a company licence, separate from the kits', LIVE),
      ],
      links: [{ label: 'Open the live store', href: 'https://shop.promdipreneur.com/products-list', external: true }],
      notes: [
        'Downloadable kits are emailed after payment. The payroll licence is set up per company after the buyer submits a short form, delivered within one business day. They are deliberately not one identical instant process.',
        'Captures show the public store. The CRM workflows behind it are private and are not shown.',
      ],
    },
  },
  {
    id: 'fresh-start',
    code: 'P-04',
    kind: 'Own service business',
    title: 'Fresh Start Cleaning Services',
    line: 'The business I run: inquiries, quotes, crews, service and follow-up in Cagayan de Oro.',
    count: 5,
    unit: 'stage service journey',
    description:
      'A cleaning company I own and operate. I built its customer journey from inquiry to quotation, scheduling, service delivery and follow-up.',
    stack: ['GoHighLevel', 'Forms + chat', 'Operations records'],
    marks: [tools.ghl],
    items: [],
    tile: shot('fresh-hero', 'The Fresh Start Cleaning Services website', 900),
    caseStudy: {
      problem:
        'A service booking is not done when the customer says yes. Someone has to scope the job, price it, schedule the crew, bring the right equipment, check the work, collect payment and ask for the next booking.',
      built: [
        'A website and quote form that capture what the job needs before anyone gives a price.',
        'An inquiry-to-quotation process, with pricing worked out from scope, labour and supplies.',
        'Scheduling and crew coordination, with deployment, quality and acceptance records.',
        'Follow-up for payment, feedback and repeat bookings.',
      ],
      role: [
        'Owner and operator: pricing, staff, suppliers, service quality',
        'Customer-journey and workflow implementation',
        'The operating records that later became the Cleaning Business Kits',
      ],
      flow: [
        { label: 'Inquiry', note: 'Form, chat or message', by: 'person' },
        { label: 'Scope + quote', note: 'Site details before price', by: 'person' },
        { label: 'Schedule', note: 'Crew, equipment, payment check', by: 'person' },
        { label: 'Service delivered', note: 'Checklist, QA, client sign-off', by: 'person' },
        { label: 'Follow-up', note: 'Balance, feedback, rebooking', by: 'system' },
      ],
      matters:
        'This is where my process thinking is tested every week. When I map a client’s operations, I am drawing on the same decisions I make here: what to ask before quoting, what the crew needs to know, and where money gets left on the table.',
      evidence: [
        evidence('fresh-hero', 900, 'Website first screen with the free-quote entry point', LIVE),
        evidence('fresh-mid', 1000, 'Service promise and quote call to action', LIVE),
        evidence('fresh-contact', 900, 'Contact section with the shop location and team', LIVE),
      ],
      links: [{ label: 'Open the live website', href: 'https://freshstartclean.shop/home', external: true }],
      notes: [
        'My own business, not a client project. Testimonials from the live site are not reproduced here.',
        'The internal quoting and scheduling records are private; the kits in P-01 show their structure.',
      ],
    },
  },
  {
    id: 'qr-checkin',
    code: 'P-05',
    kind: 'Event system',
    title: 'MinBizCon 2026 QR Check-in',
    line: 'Registration and three-day check-in for the 35th Mindanao Business Conference, built on Google tools.',
    count: 3,
    unit: 'event days, one system',
    description:
      'The digital check-in for the 35th Mindanao Business Conference (Aug 11–13, 2026, Cagayan de Oro): unique QR codes by email, a phone-based scanner, walk-in handling and a live dashboard.',
    stack: ['Google Sheets', 'Apps Script', 'Gmail', 'Google Forms', 'Looker Studio', 'Netlify', 'jsQR'],
    marks: [tools.sheets, tools.appsScript, tools.netlify],
    items: [],
    tile: shot('qr-scanner', 'The MinBizCon 2026 check-in scanner start screen on a phone', 900),
    caseStudy: {
      problem:
        'A three-day business conference expecting about 800 participants needed to know who arrived, on which day, without a paper list at the door. Walk-ins, paid-but-unregistered guests and people who lost their QR all had to be handled at the same desk, by staff with no training time.',
      built: [
        'A participant database in Google Sheets: one row and one permanent ID (MBC2026-0001…) per attendee, with separate Day 1, Day 2 and Day 3 check-in columns.',
        'QR generation and branded HTML emails sent from Gmail by Apps Script, rate-limited, and resumable so nobody gets two emails.',
        'A scanner web app hosted on Netlify: any phone browser, rear camera, jsQR reading normal and inverted codes, only accepting MBC2026- codes, with manual ID entry and support for handheld scanner guns.',
        'Check-in logic in Apps Script: the event day comes from the date, duplicates are caught per day, and every scan lands in a log with its station name.',
        'A walk-in path: a Google Form feeds the same sheet with a payment status; staff search by name, then Process (ID, QR email and check-in in one step) or Flag for review.',
        'A Looker Studio dashboard for live totals per day, station and walk-in type, plus an SOP, an outage plan and a ten-phase test checklist.',
      ],
      role: [
        'Official digital check-in partner: scoped and delivered the system',
        'Workflow architecture and database design',
        'QR generation, email delivery and scanner logic (AI-assisted build)',
        'Staff SOP, test plan and event-day support',
      ],
      flow: [
        { label: 'Attendee record', note: 'One row, permanent ID', by: 'person' },
        { label: 'Unique QR', note: 'Generated per ID', by: 'system' },
        { label: 'Confirmation email', note: 'Branded, sent from Gmail', by: 'system' },
        { label: 'Desk scan', note: 'Phone camera or scanner gun', by: 'person' },
        { label: 'Attendance record', note: 'Day column + station log', by: 'system' },
      ],
      matters:
        'Event check-in is a small version of a problem every business has: a record created in one place must be recognised quickly and correctly somewhere else, by whoever is on shift. Designing for the messy cases (walk-ins, lost codes, repeat scans, dropped Wi-Fi) is what keeps the line moving and the count trustworthy.',
      evidence: [evidence('qr-scanner', 900, 'Scanner start screen: staff name their station and start scanning', LIVE, 'The MinBizCon 2026 check-in scanner start screen on a phone')],
      illustration: 'qr-checkin',
      links: [],
      notes: [
        'The interactive demo above recreates the scanner’s check-in rules with synthetic attendees. It runs in your browser and connects to nothing.',
        'The live scanner and its code are not linked here because they connect to the real attendance records.',
        'About 800 participants were expected. Final attendance totals are not published here.',
      ],
    },
  },
]

/** Number of projects, shown as the sidebar badge. Derived, never typed in. */
export const workCount = workChapters.length
