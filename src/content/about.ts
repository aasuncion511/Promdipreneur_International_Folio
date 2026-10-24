import { site } from './site'

/**
 * The Home Experience section: four business perspectives, then a short selected timeline.
 * The 20+ years are business and operations experience, not AI or automation experience.
 */
export const aboutSection = {
  eyebrow: 'Experience',
  titleThin: '20+ years',
  titleBold: 'inside the business.',
  lede: `I’m ${site.fullName}. Before I built systems, I ran the work they organize: sales teams, warehouses, deliveries, crews, suppliers and payroll, including years reporting to US-based leadership.`,
  lead: 'So when I look at your process, I see it from every side of the counter.',
  perspectivesTitle: 'Four perspectives I design from',
  timelineTitle: 'Selected roles',
}

export type Perspective = { id: 'owner' | 'staff' | 'customer' | 'supplier'; title: string; body: string }

export const perspectives: Perspective[] = [
  {
    id: 'owner',
    title: 'The owner',
    body: 'I have signed payroll, chased receivables and made the call on stock. I design for the person who has to see where work is stuck.',
  },
  {
    id: 'staff',
    title: 'The staff',
    body: 'I have written SOPs for teams who had to follow them on a busy day. A step that fights how people actually work gets skipped.',
  },
  {
    id: 'customer',
    title: 'The customer',
    body: 'Quotes, follow-ups, delivery and after-sales. I know the moments a buyer waits too long, and then goes elsewhere.',
  },
  {
    id: 'supplier',
    title: 'The supplier',
    body: 'Procurement, importation, warehousing and vendor terms. Handoffs between companies are where orders break first.',
  },
]

export type Role = { period: string; title: string; org: string; detail: string; us?: true }

export const roles: Role[] = [
  { period: '2024 – now', title: 'Founder, CRM and Business Automation Consultant', org: 'PromdiPreneur BASA Consultancy (Business Automation Solutions Architect)', detail: 'Requirements, workflow architecture, CRM, customer journeys, implementation and documentation.' },
  { period: '2024 – now', title: 'President', org: 'AJDA Enterprises / Fresh Start Cleaning Services', detail: 'Quotations, clients, suppliers, staff deployment and service operations.' },
  { period: '2019 – 2024', title: 'President', org: 'AJDA Industrial Supply', detail: 'Nationwide B2B supply: procurement, vendors, delivery and after-sales.' },
  { period: '2020 – 2023', title: 'Business Development Consultant', org: 'BEPIC Philippines', detail: 'Local operations setup, compliance, staffing, order processing and distributor support.', us: true },
  { period: '2017 – 2019', title: 'President and Co-Founder', org: 'MCM Global Solutions / Distribution', detail: 'B2B payments and travel platform: translated requirements, coordinated developers and API partners.' },
  { period: '2016 – 2018', title: 'Director of Operations', org: 'Javita Philippines', detail: 'Importation, distribution, warehousing, inventory and SOPs, reporting to US leadership.', us: true },
  { period: '2014 – 2016', title: 'Operations and Product Manager', org: '5LINX Mabuhay', detail: 'Startup operations, delivery systems, controls, forecasting and SOPs.', us: true },
]

/** Older roles, one line. */
export const earlier =
  'Earlier: National Sales Manager at Victory Global (branches, distributors and sales programs); General Manager at Prime Adventure Travel & Tours (concept to launch, with sales, accounting and monitoring systems); construction project coordination, including BOTEYJU at SM Davao; customer service, supervision and business development.'

export const usNote = 'US-based company or stakeholders'
