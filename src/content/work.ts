import type { Evidence, EvidenceScope, Image, WorkChapter } from './schema'
import { asset } from './site'
import { tools } from './tools'

/**
 * The finished projects, each told as a case study. Facts only: counts and claims were checked against the
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
const SAMPLE: EvidenceScope = 'Working build, sample data'

/** Socri’s live website. */
const SOCRI_URL = 'https://socriresort.com/'

export const workPage = {
  eyebrow: 'Selected work',
  titleThin: 'Six systems.',
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
  {
    id: 'meta-ads',
    code: 'P-06',
    kind: 'In progress · own businesses',
    status: 'in-progress',
    statusNote: 'Running since October 2026 · early traffic results',
    title: 'Meta Ads for My Own Store and Cleaning Company',
    line: 'Paid traffic for my own store and cleaning company. First campaign: ₱1.21 per landing-page view and an 11.86% link click-through rate. Sales not reported yet.',
    count: 2,
    unit: 'businesses',
    description:
      'Meta ad campaigns I am running for my own Digital Store and cleaning company, starting with PromdiPreneur Payroll in October 2026. Early traffic results are in; sales results are not reported yet.',
    stack: ['Meta Ads Manager', 'Meta Pixel', 'GoHighLevel', 'UTM tracking'],
    marks: [tools.meta, tools.ghl],
    items: [],
    caseStudy: {
      problem:
        'My own products and cleaning company need inquiries and buyers beyond referrals and organic posts. Paid ads only help if every click can be traced to a visit, an inquiry or a sale. Otherwise the budget teaches you nothing.',
      built: [
        'Tracking before spending: the Meta Pixel installed in the GoHighLevel funnel and checked in Events Manager.',
        'A campaign structure that starts by optimising for landing-page views, and moves to purchase optimisation only once real purchase events exist.',
        'Three to four ads per campaign, each tagged with its own UTM parameters, so every visit can be traced to the ad that sent it.',
        'Short vertical video ads made in-house in the brand colours.',
        'A written launch and review playbook: a publish checklist, daily checks for the first week, and a pause rule for ads that cost too much per visit or get too few clicks.',
      ],
      role: ['Campaign planning and structure', 'Pixel and UTM tracking set-up', 'Creative direction and ad copy', 'Monitoring rules and daily checks'],
      flow: [
        { label: 'Ad', note: 'Meta, UTM-tagged', by: 'person' },
        { label: 'Landing page', note: 'GoHighLevel funnel', by: 'system' },
        { label: 'Pixel event', note: 'Visit recorded per ad', by: 'system' },
        { label: 'Checkout or inquiry', note: 'Store sale or cleaning quote', by: 'person' },
        { label: 'Review and adjust', note: 'Daily checks, pause rule', by: 'person' },
      ],
      matters:
        'Ads are the most expensive way to find out a funnel leaks. Setting up measurement first means the first weeks of spend answer real questions: which ad, which page, which step loses people. It is the same discipline I would bring to a client’s campaign.',
      evidence: [],
      links: [],
      metrics: [
        { label: 'Cost per landing-page view', value: '₱1.21', note: 'Meta’s benchmark for similar prospecting campaigns: ₱1.92' },
        { label: 'Link click-through rate', value: '11.86%' },
        { label: 'People reached', value: '36,758' },
      ],
      metricsSource:
        'Snapshot from Meta Ads Manager, late October 2026: the PromdiPreneur Payroll campaign, optimised for landing-page views in the Philippines. Amounts in Philippine pesos.',
      notes: [
        'These are traffic numbers. They show the ads bring interested visitors cheaply; they do not show sales. Purchase results are not reported here yet.',
        'What Meta flags, and what I am fixing next: every ad has a below-average quality ranking, one video was flagged as possibly click-baity, and one ad’s cost per result is rising. Next steps are static image ads, refreshed creatives and a retargeting ad set for site visitors.',
        'I will update this with sales results once there is enough data to report honestly, good or bad.',
        'Ad account details and budgets are kept private.',
      ],
    },
  },
  {
    id: 'car-rental-os',
    code: 'P-07',
    kind: 'In progress · own SaaS product',
    status: 'in-progress',
    statusNote: 'Working build · demo on request',
    title: 'Car Rental OS: Booking Website and Rental Workspace',
    line: 'A branded booking website and rental management workspace for Philippine car rental businesses: vehicles, reservations, customer balances and staff access in one place.',
    count: 3,
    unit: 'workspaces',
    description:
      'PromdiPreneur Car Rental OS: a branded booking website and rental management workspace that helps Philippine rental businesses organize vehicles, reservations, customer balances and staff access.',
    stack: ['Next.js', 'Prisma', 'Turso', 'PayMongo', 'Stripe', 'Render', 'Claude Code'],
    marks: [tools.render, tools.turso, tools.claudeCode],
    tile: shot('crm-admin-dashboard', 'Car Rental OS owner dashboard with sample figures', 900),
    items: [],
    caseStudy: {
      problem:
        'When bookings grow, scattered records get harder to manage. A customer asks which car is available. A staff member needs the remaining balance. Another booking arrives while you are arranging a pickup. When those details live in separate chats and spreadsheets, even routine work takes more checking.',
      built: [
        'A booking website under each rental company’s own name, logo, vehicle photos and business details, so customers browse the fleet and start a reservation under that brand.',
        'A clearer path from dates to reservation: customers check a vehicle’s availability, pick dates and get a 25-minute hold while they finish. Two people cannot hold the same car for the same dates.',
        'Reservation payments by vehicle category, paid through each company’s own PayMongo account and credited toward the rental total. The money goes straight to the rental company, never through me.',
        'Bookings and balances together: every booking with its remaining balance, cash collections recorded at pickup or return, and online payment links or QR codes for the balance.',
        'Fleet records the team can maintain: units, real photos, daily rates, reservation categories and status (available, reserved, in maintenance).',
        'An owner dashboard that counts only money actually collected, shows expenses and net profit, keeps refundable deposits out of revenue, and lists balances that need follow-up.',
        'Owner and staff roles with feature-by-feature permissions, customer accounts with booking history, invoiced corporate accounts, and a platform admin for me across every client company.',
      ],
      role: [
        'Product design from real rental operations',
        'Requirements, architecture and competitive review',
        'AI-assisted development with Claude Code',
        'Payments, permissions and multi-company data design',
        'Deployment on Render with a Turso database',
      ],
      flow: [
        { label: 'Browse vehicles', note: 'Company-branded site', by: 'person' },
        { label: 'Choose dates', note: 'Availability checked', by: 'system' },
        { label: '25-minute hold', note: 'No double claims', by: 'system' },
        { label: 'Reservation payment', note: 'Company’s own PayMongo', by: 'person' },
        { label: 'Booking and balance', note: 'Recorded for the team', by: 'system' },
      ],
      matters:
        'The strongest part is the connection between the customer’s booking and the owner’s records. Availability, payment and balance live in one booking, so the team stops re-checking chats, and the owner sees what was actually collected, what it cost to operate, and who still owes a balance.',
      evidence: [
        evidence('crm-admin-dashboard', 900, 'See what the fleet has collected, what it costs to operate and which rental balances need follow-up.', SAMPLE, 'Car Rental OS dashboard showing collection and expense summaries'),
        evidence('crm-admin-bookings', 900, 'Keep reservations and remaining balances together.', SAMPLE, 'Rental booking list with status and balance information'),
        evidence('crm-store-home', 900, 'Give customers a booking experience under the rental company’s own brand.', SAMPLE, 'Branded rental website with a date search'),
        evidence('crm-store-fleet', 900, 'Customers search dates and browse the fleet with real vehicle photos and daily rates.', SAMPLE, 'Rental website fleet page with vehicle cards'),
        evidence('crm-admin-fleet', 640, 'Keep vehicle information organized and easy to update.', SAMPLE, 'Fleet management view showing vehicle records and status'),
        evidence('crm-platform-admin', 300, 'Platform admin: every client company on the service, with suspend and reactivate.', SAMPLE, 'Car Rental OS platform admin listing one sample company'),
      ],
      links: [],
      notes: [
        'Screens are from the running application with a fictional demo company, renters, plates and figures. They illustrate the interface and are not client results.',
        'A demo is available on request. Not yet live with a paying rental company, so no customer outcomes are claimed.',
        'Planned, not yet included: built-in SMS and email for every company, custom domains and more storefront themes.',
      ],
    },
  },
  {
    id: 'car-dealer',
    code: 'P-08',
    kind: 'In progress · client proposal',
    status: 'in-progress',
    statusNote: 'Working concept · proposal stage',
    title: 'Dealership Showroom and Sales OS',
    line: 'A showroom website and owner sales pipeline for a pre-owned car dealer in Cagayan de Oro, built as a working concept for the owner.',
    count: 3,
    unit: 'screens',
    description:
      'A working concept for a Cagayan de Oro pre-owned car dealer: an online showroom, an owner sales pipeline from inquiry to release, and a content admin on Supabase.',
    stack: ['JavaScript', 'Supabase', 'Netlify', 'Codex', 'Canva'],
    marks: [tools.supabase, tools.netlify, tools.codex],
    tile: shot('dealer-store-home', 'Pre-owned car dealer showroom concept home page', 900),
    items: [],
    caseStudy: {
      problem:
        'A used-car dealer sells through Facebook posts and Messenger. Buyers cannot browse what is actually available, inquiries sit in chat threads, and the owner has no single view of who is in financing review, who reserved a unit, and what is ready for release.',
      built: [
        'An online showroom: units by category with search, a details view, and three clear next steps for a buyer: inquire, request a viewing, or ask about financing.',
        'An owner sales pipeline: New Inquiry, Contacted, Financing Review, Reserved, For Release, Released, with a five-point release checklist before a unit can be handed over.',
        'A content admin on Supabase: the owner adds or edits units with up to six photos, keeps them as drafts or publishes them, and changes the homepage hero without a developer.',
        'Database rules so visitors only read published units, and only named admin accounts can change listings or upload photos.',
        'A 13-page owner presentation and an implementation plan in phases: inventory and content, CRM and automations, then release controls and reports.',
      ],
      role: ['Discovery and sales-process mapping', 'Showroom and pipeline design', 'AI-assisted build with Codex', 'Supabase data and access rules', 'Owner presentation and proposal'],
      flow: [
        { label: 'Facebook or website', note: 'Buyer finds a unit', by: 'person' },
        { label: 'Inquiry or viewing', note: 'Captured as a lead', by: 'system' },
        { label: 'Financing review', note: 'Cash or financed', by: 'person' },
        { label: 'Reserved', note: 'Unit assigned to buyer', by: 'system' },
        { label: 'Release checklist', note: 'Five checks, then handover', by: 'person' },
      ],
      matters:
        'For a dealer, the costly leaks are slow replies and units promised twice. A showroom that shows real availability, plus one pipeline the owner can read in a minute, turns Messenger chatter into a sales process the team can follow.',
      evidence: [
        evidence('dealer-store-home', 900, 'Showroom home: the promise, then browse or ask about financing', SAMPLE, 'Pre-owned car dealer showroom concept home page'),
        evidence('dealer-store-units', 900, 'Featured units with category filters and search', SAMPLE, 'Showroom concept unit grid with sample prices'),
        evidence('dealer-owner', 900, 'Owner demo: the six-stage pipeline and the selected inquiry', SAMPLE, 'Dealer owner sales pipeline with fictional buyers'),
        evidence('dealer-admin', 900, 'Content admin: listings, drafts and publishing', SAMPLE, 'Dealer content admin listing sample vehicles'),
      ],
      links: [],
      notes: [
        'A working concept prepared for the owner, not a commissioned production system. Units, prices and buyers are fictional.',
        'Vehicle photos are representative Creative Commons photographs, not the dealer’s stock. The dealer’s name and logo are left out of this page while the proposal is open.',
        'The sales pipeline runs in the browser for the demo; the shared CRM and messaging come in a later phase if the project goes ahead.',
      ],
    },
  },
  {
    id: 'socri',
    code: 'P-09',
    kind: 'Completed · Live client website',
    title: 'Socri Private Resort: Website and Booking Experience',
    line: 'A live client website for an exclusive-use private resort in Cagayan de Oro: packages and rates, a real photo gallery, guest information and a booking path to the resort team. Hospitality · Business systems design.',
    count: 3,
    unit: 'packages',
    description:
      'Socri Private Resort’s live website at socriresort.com: responsive site, package selection, resort gallery and guest information, plus the approved booking automation architecture behind it.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Netlify', 'Google Maps', 'GoHighLevel', 'SaligPay'],
    marks: [tools.netlify, tools.ghl],
    tile: shot('socri-live-hero', 'Socri Private Resort website home page', 900),
    items: [],
    caseStudy: {
      problem:
        'The resort was booked through Facebook and booking listings, with packages, rates and rules spread across posts and chat replies. Guests had to ask in chat before they could decide, the place was hard to picture from scattered photos, and every booking was confirmed by hand.',
      built: [
        'Delivered and live at socriresort.com: a responsive website that works on phones first, built and deployed on Netlify.',
        'Delivered: a package selection experience (Venue, Gathering with catering, Bliss with kids’ entertainment) with full inclusions, catering menus, published day, night and full-use rates for weekdays and weekends, and capacity rules stated plainly.',
        'Delivered: a 22-photo resort gallery from real resort photography, with thumbnails, swipe, slideshow and a full-screen viewer.',
        'Delivered: published guest information: verified Google Maps review excerpts and rating, a map with Google Maps and Waze directions, house rules, an FAQ from the resort’s own answers, and a quick-answer concierge in Tagalog, Bisaya or English.',
        'Delivered: a booking path that works today: guests check their published rate, then send their details to the resort team on Messenger or by phone, with the inquiry copied for them.',
        'Delivered systems design, approved by the resort: the booking automation architecture and the CRM workflow mapping from first inquiry to post-stay review.',
        'Delivered systems design: the Guest Folio specification (one record per booking for the guest, charges, payments and balance), the payment verification design, and the AI receptionist blueprint with its hand-off rules to staff.',
      ],
      role: ['Content structure, copy and visual design', 'Front-end build and deployment', 'Photo selection and review verification', 'Booking automation and CRM architecture', 'Guest Folio, payment verification and AI receptionist design'],
      flow: [
        { label: 'Find the resort', note: 'Facebook, Maps, search', by: 'person' },
        { label: 'Compare packages', note: 'Inclusions and rates', by: 'person' },
        { label: 'Photo gallery', note: '22 real photos', by: 'system' },
        { label: 'Pick date and use', note: 'Published rate shown', by: 'system' },
        { label: 'Message the resort', note: 'Messenger or phone', by: 'person' },
      ],
      matters:
        'For an exclusive-use resort, every booking is a big decision for the guest and a full day of revenue for the owner. One clear page answers the package, capacity and photo questions before the chat starts, and the approved architecture behind it means each booking will be verified, recorded and confirmed the same way every time.',
      evidence: [
        evidence('socri-live-hero', 900, 'Home: the promise, then a quick package, date and guest check', LIVE, 'Socri Private Resort website home page'),
        evidence('socri-live-packages', 900, 'Package selection with published starting rates and full details', LIVE, 'Socri website package cards with starting rates'),
        evidence('socri-live-gallery', 900, 'Resort gallery: 22 real photos with slideshow and full-screen view', LIVE, 'Socri website photo gallery'),
        evidence('socri-live-reviews', 630, 'Published guest information: Google Maps rating and verified review excerpts', LIVE, 'Socri website reviews section'),
        evidence('socri-live-steps', 520, 'Booking in four steps, ending with the resort team on Messenger or phone', LIVE, 'Socri website four-step booking guide'),
      ],
      links: [{ label: 'Visit Live Website', href: SOCRI_URL, external: true }],
      notes: [
        'The website is delivered. The live booking automation (GoHighLevel, SaligPay payments and the AI receptionist) is being implemented separately as P-10.',
        'Package rates come from the resort’s own materials and are confirmed by its staff.',
      ],
    },
  },
  {
    id: 'socri-booking',
    code: 'P-10',
    kind: 'In progress · client automation',
    status: 'in-progress',
    statusNote: 'Architecture approved · implementation in progress',
    title: 'Socri Private Resort: Reservation Automation',
    line: 'The approved reservation system behind the resort website, now being implemented: CRM, verified SaligPay payments, automatic calendar booking on confirmed payment, guest SMS and email, and an AI receptionist.',
    count: 5,
    unit: 'parts',
    description:
      'Reservation automation for Socri Private Resort: the architecture is approved and implementation is in progress in GoHighLevel with SaligPay payments, automatic calendar booking, guest messaging and an AI receptionist.',
    stack: ['GoHighLevel', 'SaligPay', 'SMS', 'AI receptionist'],
    marks: [tools.ghl],
    items: [],
    caseStudy: {
      problem:
        'An exclusive-use resort sells one booking per date. The owner checks payment screenshots by hand, writes the date on the calendar, and answers the same questions in Messenger late at night. One slip means a double booking or a lost guest.',
      built: [
        'A CRM where every inquiry, from the website, Messenger or a call, becomes one contact on a booking pipeline, tagged by package, date and guest count.',
        'Payment confirmation and verification: the reservation fee is paid online through SaligPay and confirmed by the payment provider itself, not by a screenshot sent in chat.',
        'Automated calendar booking: once a guest’s payment is confirmed, the date is plotted on the resort calendar and blocked automatically, so it cannot be sold twice.',
        'A Guest Folio for every booking: guest details, package, charges, payments received and the balance due.',
        'SMS and email to guests, sent automatically: booking received, payment confirmed, reminders before the stay, then a thank-you and review request. Staff get an alert for each new booking.',
        'An AI receptionist that answers package, rate and availability questions in Tagalog, Bisaya or English, captures the inquiry in the CRM, and hands the guest to staff for anything it cannot answer.',
      ],
      role: ['Booking-process mapping with the resort', 'CRM and pipeline architecture', 'Payment, calendar and messaging automation', 'AI receptionist scope and hand-off rules'],
      flow: [
        { label: 'Inquiry', note: 'Website, Messenger, AI receptionist', by: 'system' },
        { label: 'CRM contact', note: 'Package, date, guests', by: 'system' },
        { label: 'Reservation fee', note: 'Paid through SaligPay', by: 'person' },
        { label: 'Payment verified', note: 'Provider confirmation', by: 'system' },
        { label: 'Date on calendar', note: 'Booked and blocked automatically', by: 'system' },
        { label: 'SMS and email', note: 'Confirmation, reminders, review', by: 'system' },
      ],
      matters:
        'Verified payment that books the calendar by itself removes the two costliest mistakes for a private resort: a date sold twice and a guest left waiting for confirmation. Automatic messages and an always-on receptionist give the owner back their evenings.',
      evidence: [],
      links: [],
      notes: [
        'The architecture is approved by the resort and implementation is in progress. These parts are not live yet, and no results are claimed.',
      ],
    },
  },
]

/** Number of finished projects, shown as the sidebar badge. Derived, never typed in. */
export const workCount = workChapters.filter((chapter) => chapter.status !== 'in-progress').length
