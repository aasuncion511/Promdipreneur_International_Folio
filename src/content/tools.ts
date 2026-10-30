import type { ToolMark } from './schema'
import { asset } from './site'

const mark = (name: string, file: string, mono?: true): ToolMark => ({ name, logo: asset(`/images/tools/${file}`), mono })

/**
 * Every tool logo the site can show. Pages reference these, never a raw path. Marks come from the
 * official HighLevel asset, Simple Icons and SVG Logos (both CC0) and
 * Lobe Icons (MIT), hosted locally. Showing a logo
 * names a tool Allan works in; it does not imply a certification or partnership.
 * A black one-colour logo takes a third argument, `true`, so it is inverted on dark grounds.
 */
export const tools = {
  ghl: mark('GoHighLevel', 'highlevel.svg'),
  meta: mark('Meta Ads', 'meta.svg'),
  workspace: mark('Google Workspace', 'google-workspace.svg'),
  sheets: mark('Google Sheets', 'googlesheets.svg'),
  appsScript: mark('Google Apps Script', 'googleappsscript.svg'),
  gmail: mark('Gmail', 'gmail.svg'),
  chatgpt: mark('ChatGPT', 'chatgpt.svg', true),
  claude: mark('Claude', 'claude.svg'),
  gemini: mark('Gemini', 'gemini.svg'),
  manus: mark('Manus', 'manus.svg', true),
  aiStudio: mark('Google AI Studio', 'google-ai-studio.svg', true),
  n8n: mark('n8n', 'n8n.svg'),
  codex: mark('Codex', 'codex.svg'),
  claudeCode: mark('Claude Code', 'claude-code.svg'),
  netlify: mark('Netlify', 'netlify.svg'),
  render: mark('Render', 'render.svg', true),
  supabase: mark('Supabase', 'supabase.svg'),
  turso: mark('Turso', 'turso.svg', true),
  github: mark('GitHub', 'github.svg', true),
  slack: mark('Slack', 'slack.svg'),
  make: mark('Make', 'make.svg'),
  zapier: mark('Zapier', 'zapier.svg'),
} satisfies Record<string, ToolMark>

export type ToolGroup = { id: string; title: string; use: string; tools: ToolMark[] }

/** The toolbox, grouped by the job each tool does in a project. No proficiency bars, no percentages. */
export const toolGroups: ToolGroup[] = [
  {
    id: 'crm',
    title: 'CRM, ads and customer journeys',
    use: 'Pipelines, forms, calendars, funnels and stores, the follow-up workflows behind them, and the paid traffic that feeds them.',
    tools: [tools.ghl, tools.meta],
  },
  {
    id: 'ops',
    title: 'Operational tools',
    use: 'Records, computations, documents, email and shared drives a team can run without buying new software.',
    tools: [tools.workspace, tools.sheets, tools.appsScript],
  },
  {
    id: 'think',
    title: 'Thinking and prototyping',
    use: 'Requirements, process maps, first drafts and quick prototypes before anything is built for real.',
    tools: [tools.chatgpt, tools.claude, tools.gemini, tools.aiStudio, tools.manus],
  },
  {
    id: 'dev',
    title: 'Development, data and hosting',
    use: 'AI-assisted development, versioned code, databases, hosting for web apps and their backends, and team updates where the work happens.',
    tools: [tools.claudeCode, tools.codex, tools.github, tools.netlify, tools.render, tools.supabase, tools.turso, tools.slack],
  },
]

/** Shown under the groups as "Also familiar with", never as specialties. */
export const alsoFamiliar: ToolMark[] = [tools.n8n, tools.make, tools.zapier]
