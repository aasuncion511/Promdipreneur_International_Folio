// End-to-end checks for this build: case-study sheets (open, direct URL, Next, Escape, Back), keyboard
// access, the phone drawer, the theme switch, booking and email destinations, and the email-draft form.
// Usage: BASE=http://localhost:5191 node scripts/check-review.mjs   (default BASE: the dev server)
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'http://localhost:5190'
const BOOKING = 'https://api.leadconnectorhq.com/widget/booking/ireOpOYGzupk7E9wo3zy'
let fails = 0
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`)
  if (!ok) fails++
}
const sheetOpen = (page) => page.evaluate(() => !!document.querySelector('dialog.sh')?.open)

const browser = await chromium.launch()

/* ---------- Desktop ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  check('home title', (await page.title()).startsWith('Allan Asuncion | Business Systems'))
  check('default theme is light (cream)', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'light')
  check('one h1', (await page.locator('h1').count()) === 1)

  // Booking + email destinations
  const bookHrefs = await page.locator(`a[href="${BOOKING}"]`).count()
  check('booking calendar linked (hero, nav, contact)', bookHrefs >= 3, `${bookHrefs} links`)
  check('booking links open in a new tab', (await page.locator(`a[href="${BOOKING}"]:not([target="_blank"])`).count()) === 0)
  check('email link is allan@promdipreneur.com', (await page.locator('a[href^="mailto:allan@promdipreneur.com"]').count()) >= 1)
  check('no "System live" claim anywhere', !(await page.content()).includes('System live'))

  // Open a sheet from a work card
  await page.locator('#work a[href="/work/cleaning-kits"]').click()
  await page.waitForTimeout(900)
  check('card opens sheet', await sheetOpen(page))
  check('sheet URL is shareable', page.url().endsWith('/work/cleaning-kits'))
  check('sheet title in document title', (await page.title()).includes('Cleaning Business Kits'))
  const labels = await page.locator('.cs__label').allInnerTexts()
  check('sheet answers the six questions', labels.length === 6, labels.join(' | '))
  check('every capture is labelled with its scope', (await page.locator('.cs__shot').count()) === (await page.locator('.cs__scope').count()))
  // Next inside the sheet
  await page.locator('.sh__next a').click()
  await page.waitForTimeout(700)
  check('Next goes to P-02', page.url().endsWith('/work/payroll') && (await sheetOpen(page)))
  // Escape closes, back to Home
  await page.keyboard.press('Escape')
  await page.waitForTimeout(900)
  check('Escape closes the sheet', !(await sheetOpen(page)))
  check('closing returns to Home URL', new URL(page.url()).pathname === '/')

  // Browser Back closes a sheet opened from Home
  await page.locator('#work a[href="/work/fresh-start"]').click()
  await page.waitForTimeout(900)
  await page.goBack()
  await page.waitForTimeout(900)
  check('Back closes the sheet', !(await sheetOpen(page)) && new URL(page.url()).pathname === '/')

  // Keyboard: focus a card and open with Enter
  await page.locator('#work a[href="/work/qr-checkin"]').focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(900)
  check('Enter on a focused card opens it', await sheetOpen(page))
  check('P-05 shows the synthetic-data demo', (await page.locator('.qd__label').innerText()).toLowerCase().includes('synthetic'))
  check('focus is inside the sheet', await page.evaluate(() => !!document.activeElement?.closest('dialog.sh')))
  await page.locator('.sh__close').click()
  await page.waitForTimeout(900)
  check('Close button closes', !(await sheetOpen(page)))

  // Direct URL
  await page.goto(BASE + '/work/digital-store', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  check('direct URL opens its sheet', await sheetOpen(page))
  await page.keyboard.press('Escape')
  await page.waitForTimeout(900)
  check('direct URL closes to Home', !(await sheetOpen(page)) && new URL(page.url()).pathname === '/')
  await page.goto(BASE + '/work/nope', { waitUntil: 'networkidle' })
  check('unknown project redirects Home', new URL(page.url()).pathname === '/')

  // Theme switch persists
  await page.locator('.sb-panel [role="switch"], .sb-panel button:has-text("Dark mode")').first().click()
  await page.waitForTimeout(600)
  check('theme switch to dark', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark')
  await page.reload({ waitUntil: 'networkidle' })
  check('dark theme persists on reload', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark')
  await page.evaluate(() => localStorage.removeItem('pv2-theme'))

  // Contact form: email draft, honest wording
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' })
  let opened = ''
  await page.exposeFunction('__captureOpen', (url) => (opened = url))
  await page.evaluate(() => (window.open = (url) => (window.__captureOpen(String(url)), null)))
  const send = page.locator('.ct-send')
  check('form button says what it does', (await send.textContent()).trim().toLowerCase() === 'open email draft')
  await send.click()
  check('empty form shows an error, not success', (await page.locator('.ct-err').count()) === 1)
  await page.fill('[name=firstName]', 'Test')
  await page.fill('[name=lastName]', 'Visitor')
  await page.fill('[name=email]', 'test@example.com')
  await page.fill('[name=message]', 'Leads fall through after the first reply.')
  await send.click()
  await page.waitForTimeout(300)
  check('complete form opens a mailto draft to Allan', opened.startsWith('mailto:allan@promdipreneur.com'), opened.slice(0, 60))
  const done = await page.locator('.ct-done').innerText()
  check('success copy never claims "sent"', !/message sent/i.test(done) && /not been sent/i.test(done))

  check('no page errors on desktop', errors.length === 0, errors.join('; '))
  await page.close()
}

/* ---------- Phone ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const page = await ctx.newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  check('phone: no sideways scroll', (await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 0)
  await page.locator('.mb-bar button[aria-label="Open menu"]').tap()
  await page.waitForTimeout(500)
  check('phone: drawer opens', (await page.locator('.mb-drawer').getAttribute('data-open')) === 'true')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(500)
  check('phone: Escape closes drawer', (await page.locator('.mb-drawer').getAttribute('data-open')) === 'false')
  await page.locator('.mb-bar button[aria-label="Open menu"]').tap()
  await page.waitForTimeout(500)
  await page.locator('.mb-drawer a:has-text("Experience")').tap()
  await page.waitForTimeout(1200)
  check('phone: drawer link closes drawer and scrolls', (await page.locator('.mb-drawer').getAttribute('data-open')) === 'false' && (await page.evaluate(() => scrollY)) > 500)
  await page.locator('.hero__job').first().scrollIntoViewIfNeeded()
  await page.locator('.hero__job').first().tap()
  await page.waitForTimeout(1000)
  check('phone: hero job card opens sheet', await sheetOpen(page))
  const small = await page.evaluate(() =>
    [...document.querySelectorAll('dialog.sh a, dialog.sh button')].filter((el) => {
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0 && r.height < 40
    }).length,
  )
  check('phone: sheet touch targets >= 40px tall', small === 0, `${small} small`)
  for (const w of [320, 360, 768, 1024, 1280]) {
    await page.setViewportSize({ width: w, height: 800 })
    await page.goto(BASE + '/', { waitUntil: 'networkidle' })
    const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
    check(`no sideways scroll at ${w}px`, over <= 0, `${over}px`)
  }
  await ctx.close()
}

await browser.close()
console.log(fails ? `\n${fails} check(s) failed` : '\nall checks passed')
process.exit(fails ? 1 : 0)
