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
const SAMPLE: EvidenceScope = 'Working build, sample data'

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
    statusNote: 'In development · launch target December 2026',
    title: 'Car Rental OS: Booking Website and Fleet Dashboard',
    line: 'A multi-company booking website and operations dashboard for Philippine car rental operators. Working with sample data; no paying operator is live yet.',
    count: 3,
    unit: 'workspaces',
    description:
      'A multi-tenant SaaS I am building for Philippine car rental operators: a branded booking website, an owner and staff dashboard, and a platform admin across every client company.',
    stack: ['Next.js', 'Prisma', 'Turso', 'PayMongo', 'Stripe', 'Resend', 'Render', 'Claude Code'],
    marks: [tools.render, tools.turso, tools.claudeCode],
    tile: shot('crm-admin-dashboard', 'Car Rental OS owner dashboard with sample figures', 900),
    items: [],
    caseStudy: {
      problem:
        'Small rental operators take bookings in Messenger and track which car is free in a notebook or a shared calendar. Two customers get promised the same unit, deposits get mixed up with income, and the owner cannot see how much cash actually came in this month.',
      built: [
        'A branded booking website for each operator, all on one platform: renters pick dates, see which units are free for those dates, and get a 25-minute hold that stops two people from claiming the same car at once.',
        'Online reservation fees through the operator’s own PayMongo account (GCash, Maya, cards). Payment confirmations are verified per company, and the money never passes through me.',
        'An owner and staff dashboard: bookings with a fleet calendar, units, customers, expenses, maintenance and team permissions. Refunds of rental payments are owner-only.',
        'Money shown the way an owner thinks about it: cash actually collected, expenses, net profit, and security deposits held separately so they never count as revenue.',
        'A platform admin for me as the operator of the service: every client company, its status, fleet size and bookings, with suspend and reactivate.',
        'Each company’s data kept separate inside one shared app, and subscription billing for the operators through Stripe.',
      ],
      role: [
        'Product design and business rules from rental operations',
        'AI-assisted development with Claude Code and Codex',
        'Data model, multi-company separation and payments design',
        'Deployment on Render with a Turso database',
        'Pricing, sales playbook and demo programme',
      ],
      flow: [
        { label: 'Search dates', note: 'Branded booking site', by: 'person' },
        { label: '25-minute hold', note: 'No double claims', by: 'system' },
        { label: 'Reservation fee', note: 'Operator’s own PayMongo', by: 'system' },
        { label: 'Booking recorded', note: 'Unit blocked on the calendar', by: 'system' },
        { label: 'Release and return', note: 'Deposit held, then refunded', by: 'person' },
      ],
      matters:
        'Rental operators lose money in the gaps between Messenger, the calendar and the cash box. Putting availability, payment and deposits in one record removes the double booking and the end-of-month guessing, and it lets a small team take bookings while the owner is away.',
      evidence: [
        evidence('crm-store-home', 900, 'Booking website: date search first, then the fleet', SAMPLE, 'Car Rental OS booking website for a sample rental company'),
        evidence('crm-admin-dashboard', 900, 'Owner dashboard: cash collected, expenses, deposits on hand and fleet status', SAMPLE, 'Car Rental OS owner dashboard with sample figures'),
        evidence('crm-admin-bookings', 900, 'Bookings: every reservation, with the fleet calendar and refund log', SAMPLE, 'Car Rental OS bookings list with sample renters'),
        evidence('crm-platform-admin', 300, 'Platform admin: every client company on the service, with suspend and reactivate', SAMPLE, 'Car Rental OS platform admin listing one sample company'),
      ],
      links: [],
      notes: [
        'Screens are from the current code running with its fictional sample company, renters and figures. No real customer data is shown.',
        'Not yet live with a paying operator. Before the first one: time-aware same-day pickup and return checks, payment-dated revenue reports, and an end-to-end subscription billing test.',
        'Renter payments use each operator’s own PayMongo merchant account; this product never holds their customers’ money.',
      ],
    },
  },
  {
    id: 'baltacars',
    code: 'P-08',
    kind: 'In progress · client proposal',
    status: 'in-progress',
    statusNote: 'Working concept · proposal stage',
    title: 'BaltaCars: Dealership Showroom and Sales OS',
    line: 'A showroom website and owner sales pipeline for a pre-owned car dealer in Cagayan de Oro, built as a working concept for the owner meeting.',
    count: 3,
    unit: 'screens',
    description:
      'A working concept for a Cagayan de Oro pre-owned car dealer: an online showroom, an owner sales pipeline from inquiry to release, and a content admin on Supabase.',
    stack: ['JavaScript', 'Supabase', 'Netlify', 'Codex', 'Canva'],
    marks: [tools.supabase, tools.netlify, tools.codex],
    tile: shot('balta-store-home', 'BaltaCars showroom concept home page', 900),
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
        evidence('balta-store-home', 900, 'Showroom home: the promise, then browse or ask about financing', SAMPLE, 'BaltaCars showroom concept home page'),
        evidence('balta-store-units', 900, 'Featured units with category filters and search', SAMPLE, 'BaltaCars showroom concept unit grid with sample prices'),
        evidence('balta-owner', 900, 'Owner demo: the six-stage pipeline and the selected inquiry', SAMPLE, 'BaltaCars owner sales pipeline with fictional buyers'),
        evidence('balta-admin', 900, 'Content admin: listings, drafts and publishing', SAMPLE, 'BaltaCars content admin listing sample vehicles'),
      ],
      links: [],
      notes: [
        'A working concept prepared for the owner, not a commissioned production system. Units, prices and buyers are fictional.',
        'Vehicle photos are representative Creative Commons photographs, not BaltaCars stock.',
        'The sales pipeline runs in the browser for the demo; the shared CRM and messaging come in a later phase if the project goes ahead.',
      ],
    },
  },
  {
    id: 'socri',
    code: 'P-09',
    kind: 'In progress · client website',
    status: 'in-progress',
    statusNote: 'Preview live · awaiting launch',
    title: 'Socri Private Resort Website',
    line: 'A one-page website for an exclusive-use private resort in Iponan, Cagayan de Oro: packages, a real photo tour, reviews and a date-check form.',
    count: 3,
    unit: 'packages',
    description:
      'A one-page website for Socri Private Resort in Cagayan de Oro: three event packages, an 18-photo tour, verified reviews and a booking request form. The preview is live; launch is pending.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Netlify', 'Google Maps'],
    marks: [tools.netlify],
    tile: shot('socri-hero', 'Socri Private Resort website home page', 900),
    items: [],
    caseStudy: {
      problem:
        'The resort was booked through Facebook and booking listings, with packages, rates and rules spread across posts and chat replies. Guests had to ask in chat before they could decide, and the place was hard to picture from scattered photos.',
      built: [
        'Three packages laid out side by side (Venue, Gathering with catering, Bliss with kids’ entertainment), each with full inclusions, catering sets and sample photos.',
        'Day, night and full-use options with the capacity rules stated plainly: up to 80 event guests, 30 overnight.',
        'An 18-photo resort tour with thumbnails, swipe, an optional slideshow and a full-screen viewer.',
        'Reviews as short verified excerpts with the Google Maps rating at the time of research, a map, and Google Maps and Waze directions.',
        'A booking request form that picks the package, date and use and shows the base rate, plus an FAQ built from the resort’s own answers.',
      ],
      role: ['Content structure and copy', 'Design and front-end build', 'Photo selection and review verification', 'Netlify deployment package'],
      flow: [
        { label: 'Find the resort', note: 'Facebook, Maps, search', by: 'person' },
        { label: 'Compare packages', note: 'Inclusions and rates', by: 'person' },
        { label: 'Photo tour', note: '18 real photos', by: 'system' },
        { label: 'Pick date and use', note: 'Base rate shown', by: 'system' },
        { label: 'Booking request', note: 'Resort confirms', by: 'person' },
      ],
      matters:
        'For an exclusive-use resort, every booking is a big decision for the guest. Answering the package, capacity and photo questions on one page cuts the back-and-forth in Messenger and sends better-qualified inquiries to the staff.',
      evidence: [
        evidence('socri-hero', 900, 'Home: the promise, then a quick date and package check', LIVE, 'Socri Private Resort website home page'),
        evidence('socri-packages', 900, 'Three packages with starting rates and full details', LIVE, 'Socri website package cards with starting rates'),
        evidence('socri-gallery', 900, 'The real photo tour: 18 resort photos with slideshow and full-screen view', LIVE, 'Socri website photo tour'),
        evidence('socri-reviews', 630, 'Google Maps rating and short verified review excerpts', LIVE, 'Socri website reviews section'),
      ],
      links: [{ label: 'Open the website preview', href: 'https://socri-private-resort-preview.netlify.app/', external: true }],
      notes: [
        'This is the public preview address. The resort’s own domain and launch are still pending.',
        'The form is front-end only: it does not check live availability, hold dates or take payment. Package rates come from the resort’s materials and are confirmed by its staff.',
      ],
    },
  },
]

/** Number of finished projects, shown as the sidebar badge. Derived, never typed in. */
export const workCount = workChapters.filter((chapter) => chapter.status !== 'in-progress').length
