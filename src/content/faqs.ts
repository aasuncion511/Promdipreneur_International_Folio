import type { Faq } from './schema'

/** The questions people ask before they book. */
export const faqs = {
  whatYouBuild: {
    question: 'What kind of projects do you take on?',
    answer:
      'Defined implementation work: CRM pipelines and follow-up in GoHighLevel, customer journeys from inquiry to payment, and operating tools in Google Sheets and Apps Script. I also support agencies with scoped delivery, and stay on part-time when a running system needs improving.',
  },
  timeZones: {
    question: 'I’m in the US or Australia. How do we work across time zones?',
    answer:
      'I’m in the Philippines (GMT+8). Meeting overlap and working hours are agreed per engagement. Most build work runs asynchronously with scheduled check-ins and written updates, so you always know where things stand.',
  },
  needStack: {
    question: 'Do I need GoHighLevel?',
    answer:
      'No. I start from how your work moves, then use what you already have where it fits. GoHighLevel is my main CRM platform; Google Sheets and Apps Script cover a lot of operational work without new subscriptions.',
  },
  pricing: {
    question: 'How is pricing handled?',
    answer:
      'Defined projects are quoted at a fixed price after a short discovery, with a written scope and acceptance checklist. Part-time support is scoped by monthly hours. You see the scope before anything starts.',
  },
  afterBook: {
    question: 'What happens after I book?',
    answer:
      'We talk through your process and where it breaks. If I can help, I follow up in writing with what I would build first and how. If I am not the right fit, I will say so.',
  },
} satisfies Record<string, Faq>

export const allFaqs: Faq[] = Object.values(faqs)
