import type { Service } from './schema'
import { tools } from './tools'

export const servicesPage = {
  eyebrow: 'Ways to work together',
  title: 'Defined projects first. Ongoing help when it fits.',
  lede: 'Start with a scoped project. Keep me on part-time once the system is running and you want it improved.',
}

/**
 * The Home Services section: a stack of cards dealt onto a pile as the page scrolls.
 * Working hours and meeting overlap are agreed per engagement; nothing here promises round-the-clock cover.
 */
export const servicesSection = {
  eyebrow: servicesPage.eyebrow,
  titleThin: 'Start scoped.',
  titleBold: 'Stay if it helps.',
  explore: 'See related work',
  /** The Work chapter each card opens, by service id. */
  work: { map: 'fresh-start', build: 'payroll', support: 'digital-store', agency: 'cleaning-kits' } as Record<string, string>,
}

export const services: Service[] = [
  {
    id: 'map',
    title: 'Process and CRM Mapping',
    summary: 'Before anything is built, I map how inquiries, quotes, jobs and payments really move in your business, and where they stall.',
    outcome: 'A clear blueprint',
    bullets: ['Current workflow mapped with your team', 'Gaps, handoffs and owner bottlenecks named', 'Pipeline stages and automations specified before build'],
    tools: [tools.ghl, tools.sheets, tools.claude],
  },
  {
    id: 'build',
    title: 'Defined Implementation Project',
    summary: 'A fixed scope, built and handed over: a CRM pipeline, a follow-up system, an operations tool or a customer journey.',
    outcome: 'A working system',
    bullets: ['Written scope and acceptance checklist up front', 'Built in the tools you already pay for where possible', 'Documentation and a walkthrough for your staff'],
    tools: [tools.ghl, tools.appsScript, tools.codex],
  },
  {
    id: 'support',
    title: 'Part-time Systems Support',
    summary: 'Scoped hours each month to improve what is running: new automations, reports, fixes and the next workflow on the list.',
    outcome: 'Steady improvement',
    bullets: ['A short monthly priority list', 'Changes tested before your team relies on them', 'Hours and meeting overlap agreed up front'],
    tools: [tools.ghl, tools.sheets, tools.n8n],
  },
  {
    id: 'agency',
    title: 'Agency Delivery Support',
    summary: 'For agencies that sell GoHighLevel and systems work: I take defined builds off your team’s plate and deliver them to your standard.',
    outcome: 'More delivery capacity',
    bullets: ['Funnels, pipelines, forms, calendars and workflows', 'Works inside your process and naming', 'Clear handoff notes for your account managers'],
    tools: [tools.ghl, tools.github, tools.chatgpt],
  },
]
