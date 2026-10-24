# Claude independent build: handoff

Prepared 24 October 2026 for Allan Asuncion. Built from the original V2 template (`aasuncion511/portfoliov2-template`, commit `b404809`) on branch `claude/portfolio-v2-independent`. No code, hosting, project ID or configuration from the ChatGPT build was used or viewed. The ChatGPT review URL was not opened.

## Where to see it

- **Review URL (private Claude artifact):** https://claude.ai/artifact/9ZTX6NdM8kNnmQCWZu3dos. Only you can open it until you share it from its Share menu. Deep links work with a bare hash: `#payroll`, `#cleaning-kits`, `#digital-store`, `#fresh-start`, `#qr-checkin`, `#work`, `#about`, `#contact`.
- **Locally:** `npm install`, then `npm run dev` (http://localhost:5190). Production: `npm run build && npm run preview` (http://localhost:5191).

## Branch status: pushed

All work is on GitHub at https://github.com/aasuncion511/portfoliov2-template/tree/claude/portfolio-v2-independent. `main` was never touched.

Nothing was changed on international.promdipreneur.com, its DNS, GHL funnels, the booking calendar, the store or any automation.

## Design choices and why

| Choice | Why it helps a prospect |
|---|---|
| Hero states the value in plain English: "Organize the work. Automate the rest.", with name and role above it and one paragraph that says *20+ years running businesses*, then what I build | The five-second test: who, what, and why him, before any scrolling |
| All five projects appear as job cards **on the first screen** (P-01 to P-05) | Proof is one tap away from the first impression |
| Work section comes **directly after the hero**; each card shows the real capture, a one-line summary and the workflow as chips (system steps in green) | The visitor sees what was built and how it flows without opening anything |
| Each case study has its own shareable URL and answers six questions in order: problem, what I built, my role, how the workflow connects, why it matters, evidence | Matches the brief's checklist; easy to send to a partner or agency owner |
| Every screenshot carries a scope label ("Live public page", "Public demo, sample data", "Illustration, synthetic data"), and each project ends with scope notes | Honest about what a capture proves. Builds trust with careful buyers |
| The problem statement ("New leads wait for a reply nobody owns…") follows the work, using V2's reading-band animation | Names the client's pain in their words |
| The workflow diagram is relabelled **Example workflow** with an on-screen note that it is illustrative, and its end state reads "Example complete", never "System live" | Keeps V2's best motion piece without implying a live client system |
| **Experience** section: four perspectives (owner, staff, customer, supplier) plus a selected timeline, with roles involving US-based companies marked "US" | Turns 20+ years into the differentiator without a résumé dump |
| "Ways to work together": mapping, defined project, part-time support, agency delivery support. Hours and overlap are "agreed per engagement" | Fits the target engagements; no night-shift or 24/7 promise |
| Toolbox grouped by job (CRM and journeys; operational tools incl. Google Workspace; thinking and prototyping; development and collaboration: Claude Code, Codex, GitHub, Netlify, Slack), logos on light keys with names visible, n8n, Make and Zapier as "Also familiar with", plus a no-partnership note | Recognisable, secondary to the work, no proficiency bars |
| Contact leads with a green **Book a project introduction** panel (existing GHL calendar, new tab), then email, FAQs and an email-draft form whose button says **Open email draft** and whose success state says the message **has not been sent yet** | One obvious next step; the form never claims to send anything |
| Cream `#F7F7F3` default, dark green `#004C25` for ink and buttons, bright `#18B957` only for "live" or system steps, brown `#754000` for annotations and the tagline. Optional dark "Forest" theme | Clearly PromdiPreneur; no template blue remains |
| Real logo cropped from the original asset. The sidebar uses the bulb mark plus the wordmark; on dark the wordmark sits on a cream plate rather than being recoloured. "AA" monogram instead of a photo | Logo used as drawn; no invented portrait |
| "From diskarte to systems." appears with an English gloss | Works for international visitors |

Removed from V2: Proof (no verified testimonials or client accounts), Showcase (needs a product film), the certification tick and credential schema, the placeholder clients, demo sites, apps, videos and the template's tools.

## Facts checked against the live pages (24 Oct 2026)

- Kits: 37 editable templates, 9 service-specific checklists, 15-page manual; files emailed after successful payment (stated on the page; no purchase made).
- Payroll: Philippine payroll (SSS, PhilHealth, Pag-IBIG, BIR); company setup delivered by email within 1 business day after the company form. Public demo at `/payroll-demo` uses sample data ("QA-EMP-001, Test Payroll").
- Store: kits (file delivery) and payroll licence (setup form) are presented as different fulfilment paths.
- Fresh Start: live site still contains John Doe / Jane Doe placeholder testimonials. None of its testimonials are reproduced.
- MinBizCon (from the MinBizCon Drive folder and the scanner's source, 24 Oct): 35th Mindanao Business Conference, Aug 11–13, 2026, Cagayan de Oro; Promdipreneur BASA as official digital check-in partner. Built on Google Sheets, Apps Script, Gmail, Google Forms and Looker Studio, with the scanner on Netlify. The case study shows a real capture of the scanner's start screen and an interactive demo that recreates the scanner's rules with synthetic attendees. "About 800 expected" only; no attendance totals or queue-time claims (the attendance sheet holds personal data, so it was not copied).

- Meta Ads (P-06, shown under "In progress"): facts from Allan's own launch playbook (first campaign: PromdiPreneur Payroll, Oct 2026; Pixel in the GHL funnel; landing-page-view optimisation first; UTM-tagged ads; in-house creatives; daily checks and a pause rule). Early traffic figures added from Allan's Meta Ads Manager / Meta AI snapshot (cost per landing-page view ₱1.21 vs Meta's ₱1.92 benchmark, link CTR 11.86%, reach 36,758), labelled as traffic, not sales. Budgets and account IDs are not shown. Ads Manager itself was not accessed by Claude.

Promotional prices are not shown anywhere on the portfolio.

## Checks run

- `npm run build`: pass (typecheck + production build). `npm run lint`: pass.
- `scripts/check-review.mjs` (new, 42 checks): all pass. Covers sheet open from cards, shareable URLs, Next, Escape, Back, Close button, direct URLs, unknown project redirect, keyboard Enter, focus inside the sheet, theme switch and persistence, booking and email destinations, email-draft form (error state, mailto to allan@promdipreneur.com, no "sent" claim), phone drawer, phone sheet touch targets, and no sideways scroll at 320, 360, 390, 768, 1024, 1180, 1280, 1440 and 1920px.
- `scripts/audit/csp-harness.mjs` (updated routes): all routes pass under the strict deploy CSP. The inline theme script's hash was updated in `deploy/headers.conf`.
- Colour contrast: all text pairs at or above 4.5:1 in both themes (body ink-3 5.9:1 light, 7.1:1 dark).
- V2's original `check:*` scripts: background passes fully. The others pass their behaviour checks, but some fail on hard-coded template content (for example they look for the placeholder sentence "Say who you…", five socials ending in Discord, "you@example.com", 8 tiles, dark as the default theme). These are expected and are not regressions.

## Limitations

- The review artifact was published but **I could not open claude.ai from this environment to view it live**. I tested the exact review build locally inside a simulated host wrapper (home, `#payroll`, `#contact`, sheet open/close, fonts and images). If anything looks off on the live link, tell me and I'll fix it.
- In the review artifact, links open in a new tab as normal, but `mailto:` links and the email-draft form may not open a mail app inside Claude's viewer. The email address is shown as text there. The real site behaves normally.
- `index.html` carries `noindex, nofollow` for this comparison build. Remove it at launch.
- Canonical URLs, sitemap and Open Graph tags point at `international.promdipreneur.com` as the intended home. Change `site.url` if the domain differs.
- The main JS bundle is about 650 kB (206 kB gzipped). It was already large in the template; code-splitting is an optional later improvement.
- The services card stack keeps V2's tall card format, which leaves some empty space on large screens.

## Security note: MinBizCon scanner repo

`aasuncion511/minbizcon-promdipreneur-scanner` is now public, and `netlify/functions/proxy.js` contains the live Apps Script URL. That endpoint answers name searches (`search_walkins`) and check-ins without authentication, so anyone reading the repo can look up attendee names. Recommended now that the event is over: in Apps Script, open Deploy → Manage deployments and archive the web app (or set access to "Only myself"), then take the Netlify site down or password-protect it. The portfolio does not link the repo or the live scanner. After the endpoint is closed, linking the repo is safe and would be good evidence.

## Still needed (none of these block review)

1. Your resume file, `AllanAsuncionResume_CRM_AI_Automation_Specialist.docx`, if you want more detail. The timeline uses the brief's summary, with PromdiPreneur BASA Consultancy shown as "(Business Automation Solutions Architect)".
2. A verified portrait (optional). The monogram is a deliberate stand-in.
3. MinBizCon attendance totals, if you want them shown: the figures from the sheet's "Attendance Stats (All Days)" menu. Only totals, no names.
4. Real customer feedback for Fresh Start or the products, if you want a proof section later.
5. A CRM-connected inquiry form (later integration). Today: booking calendar + email.
6. Deployment target for the real site (any static host with SPA fallback; `deploy/` has an nginx example).

## Where things live

- Content: `src/content/` (`site.ts`, `home.ts`, `work.ts` for the five case studies, `automation.ts`, `services.ts`, `about.ts`, `tools.ts`, `contact.ts`, `faqs.ts`, `legal.ts`)
- Brand tokens: `src/styles/tokens.css`
- Section order: `src/features/home/sections.ts`
- Case-study sheet: `src/features/home/work/WorkSheet.tsx`; P-05 interactive demo: `QrCheckinDemo.tsx`
- New sections: `src/features/home/tools/`, rebuilt `about/`, `hero/`, `work/`
- Images: `public/images/work/` (captures from the live pages), `public/images/brand/` (logo crops), `public/images/tools/` (official HighLevel mark, Simple Icons and SVG Logos CC0, Lobe Icons MIT)

## License

The template's PolyForm Noncommercial license and its Required Notice are unchanged in `LICENSE`. This build is Allan's own portfolio promoting his own services, which the license's Additional Permission allows. It must not be resold or used to build paid portfolio sites for others without a commercial license from BrewedOps. Font licences ship in `public/fonts/`.
