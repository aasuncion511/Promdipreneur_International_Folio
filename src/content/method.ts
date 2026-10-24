import type { MethodStep } from './schema'

/** The method: three jobs a system has to do for a service business, in order. It names the steps of the Home workflow diagram. */
export const method = {
  eyebrow: 'The problem I fix',
  title: 'Capture. Coordinate. Close.',
  summary: 'Every system I build answers three questions: did we catch the request, did the right person act on it, and did the job finish and get paid.',
  steps: [
    { name: 'Capture', body: 'Every inquiry lands in one place with what you need to know, and gets an answer fast.', inputs: ['Forms', 'Chat', 'Messages', 'Calls'] },
    { name: 'Coordinate', body: 'Quotes, reminders and schedules move without the owner pushing each one.', inputs: ['Quote', 'Follow-up', 'Schedule'] },
    { name: 'Close', body: 'The job is checked, paid and followed up, and the next booking is asked for.', inputs: ['QA', 'Payment', 'Repeat'] },
  ] satisfies MethodStep[],
}
