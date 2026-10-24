import { method } from './method'

/**
 * The workflow diagram on Home: an EXAMPLE service-business journey from inquiry to a paid job, drawn
 * stage by stage as the page scrolls. It illustrates the kind of system Allan builds; it is not a
 * running client workflow, and the section says so on screen.
 *
 * Coordinates are in the diagram's own 1200 x 600 units: the main path is the top row, what happens
 * after the decision the bottom row. `plane` is who moves it: `lead` = a person, `auto` = the system.
 * `step` is the method step (0, 1 or 2: the three steps in method.ts). Nodes are listed in build order.
 */
export type FlowPlane = 'lead' | 'auto'
export type FlowIcon = 'form' | 'email' | 'scope' | 'proposal' | 'reminder' | 'decision' | 'booked' | 'crew' | 'check' | 'won' | 'later' | 'lost'

export type FlowNode = {
  id: string
  title: string
  tag: string
  plane: FlowPlane
  icon: FlowIcon
  x: number
  y: number
  w: number
  h: number
  step: number
  /** One line for the inspector. */
  about: string
}

/** `solid` links are the main path (arrows a packet runs); `dashed` links reroute it or branch it. */
export type FlowLink = { from: string; to: string; style: 'solid' | 'dashed'; label?: string }

const ROWS = [64, 376]
const box = (col: number, row: number) => ({ x: 24 + col * 200, y: ROWS[row]!, w: 156, h: 136 })

export const liveAutomation = {
  eyebrow: 'Example workflow',
  titleThin: 'Capture. Coordinate.',
  titleBold: 'Close.',
  /** Shown under the title: the diagram is an illustration, not a verified running system. */
  note: 'An illustrative inquiry-to-payment journey for a service business, the kind I map and build in GoHighLevel and Google tools. Not a live client system.',
  steps: method.steps.map((step) => ({ name: step.name, body: step.body })),
  panel: { lead: 'Inquiry to', rest: 'Paid Job' },
  legend: { auto: 'Automation', lead: 'Person' },
  zones: { booking: 'CRM follow-up', pipeline: 'Operations' },
  connected: 'Example complete',
  hint: { hover: 'Hover a stage to inspect', tap: 'Tap a stage to inspect' },
  nodes: [
    { id: 'form', title: 'New Inquiry', tag: 'Form, chat, call', plane: 'lead', icon: 'form', ...box(0, 0), step: 0, about: 'The request lands in one CRM record, whichever channel it came from, so nothing lives only in a phone.' },
    { id: 'reply', title: 'Instant Reply', tag: 'Sent in minutes', plane: 'auto', icon: 'email', ...box(1, 0), step: 0, about: 'An automatic reply confirms the request and asks the few questions needed to quote properly.' },
    { id: 'scope', title: 'Scope Check', tag: 'Before pricing', plane: 'lead', icon: 'scope', ...box(2, 0), step: 1, about: 'Staff confirm the scope with a checklist, so the quote is right the first time.' },
    { id: 'quote', title: 'Quote Sent', tag: 'Scope + price', plane: 'lead', icon: 'proposal', ...box(3, 0), step: 1, about: 'A standard quotation goes out and the pipeline stage changes, so the owner can see it.' },
    { id: 'follow', title: 'Follow-up', tag: 'Day 1, day 3', plane: 'auto', icon: 'reminder', ...box(4, 0), step: 1, about: 'Reminders go out on a schedule until the customer answers. Nobody has to remember to chase.' },
    { id: 'decide', title: 'Decision', tag: 'Yes, later, no', plane: 'lead', icon: 'decision', ...box(5, 0), step: 1, about: 'The customer’s answer moves the record to the right branch.' },
    { id: 'booked', title: 'Job Booked', tag: 'Date + deposit', plane: 'lead', icon: 'booked', ...box(0, 1), step: 2, about: 'The date is fixed and payment terms confirmed before the crew is committed.' },
    { id: 'crew', title: 'Crew Briefed', tag: 'Task + checklist', plane: 'auto', icon: 'crew', ...box(1, 1), step: 2, about: 'The assigned team gets the address, scope and checklist without the owner relaying it.' },
    { id: 'done', title: 'Job + QA', tag: 'Signed off', plane: 'lead', icon: 'check', ...box(2, 1), step: 2, about: 'A quality check and customer sign-off close the job properly.' },
    { id: 'paid', title: 'Paid + Review', tag: 'Balance, rebook', plane: 'auto', icon: 'won', ...box(3, 1), step: 2, about: 'The balance reminder, a review request and the next-booking offer go out automatically.' },
    { id: 'later', title: 'Not Yet', tag: 'Nurture series', plane: 'auto', icon: 'later', ...box(4, 1), step: 2, about: 'Undecided customers get occasional useful messages instead of being forgotten.' },
    { id: 'lost', title: 'Not a Fit', tag: 'Reason logged', plane: 'lead', icon: 'lost', ...box(5, 1), step: 2, about: 'A closed reason is recorded, so the owner can see why work is lost.' },
  ] satisfies FlowNode[],
  links: [
    { from: 'form', to: 'reply', style: 'solid' },
    { from: 'reply', to: 'scope', style: 'solid' },
    { from: 'scope', to: 'quote', style: 'solid' },
    { from: 'quote', to: 'follow', style: 'solid' },
    { from: 'follow', to: 'decide', style: 'solid' },
    { from: 'follow', to: 'quote', style: 'dashed', label: 'Quote revised' },
    { from: 'decide', to: 'booked', style: 'dashed' },
    { from: 'decide', to: 'later', style: 'dashed' },
    { from: 'decide', to: 'lost', style: 'dashed' },
    { from: 'booked', to: 'crew', style: 'solid' },
    { from: 'crew', to: 'done', style: 'solid' },
    { from: 'done', to: 'paid', style: 'solid' },
  ] satisfies FlowLink[],
}
