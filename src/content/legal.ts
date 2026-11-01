import { site } from './site'

export type LegalSection = { heading: string; paragraphs: string[] }

export type LegalDoc = {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

/** What this site actually stores and loads. Keep in sync with src/lib/storage.ts. */
export const privacyPolicy: LegalDoc = {
  title: 'Privacy Policy',
  updated: 'October 24, 2026',
  intro: `This policy covers the portfolio of ${site.name}, trading as ${site.legalTradeName}. It is a plain description of how the site works, not legal advice.`,
  sections: [
    {
      heading: 'What this site collects',
      paragraphs: [
        'Nothing through its own forms. The contact form opens your own email app with your message filled in; nothing is sent to or stored on this site.',
        `If you email ${site.email} or book a call, I keep your message and contact details to reply and to manage the project conversation, and delete them on request.`,
      ],
    },
    {
      heading: 'What your browser stores',
      paragraphs: ['Your theme choice and whether the sidebar is collapsed, in your browser’s local storage. Nothing else.'],
    },
    {
      heading: 'Booking',
      paragraphs: ['The booking link opens a calendar hosted by GoHighLevel (LeadConnector). What you enter there is handled under that service’s terms and used only to arrange our call.'],
    },
    {
      heading: 'Analytics',
      paragraphs: ['This site runs no analytics or advertising trackers.'],
    },
    {
      heading: 'Your rights',
      paragraphs: [`To ask what I hold about you or to have it deleted, email ${site.email}.`],
    },
  ],
}

export const termsOfService: LegalDoc = {
  title: 'Terms of Service',
  updated: 'October 24, 2026',
  intro: `These terms cover your use of this portfolio site, run by ${site.name} trading as ${site.legalTradeName}. They are a plain description, not legal advice.`,
  sections: [
    {
      heading: 'Using this site',
      paragraphs: [
        'You may read and share the pages. Screenshots of live pages show their public presentation on the date captured; the illustration in the event check-in project uses synthetic data.',
      ],
    },
    {
      heading: 'Working together',
      paragraphs: ['Nothing on this site is a binding offer. Work starts with a call, then a written scope that both sides agree to.'],
    },
    {
      heading: 'Trademarks',
      paragraphs: ['Tool names and logos belong to their owners and are shown only to name the tools I work in. They do not imply certification, endorsement or partnership.'],
    },
    {
      heading: 'Template credit',
      paragraphs: ['This site is built on the BrewedOps Portfolio Template V2 under its license for an owner’s own portfolio.'],
    },
    {
      heading: 'Contact',
      paragraphs: [`Questions about these terms: ${site.email}.`],
    },
  ],
}
