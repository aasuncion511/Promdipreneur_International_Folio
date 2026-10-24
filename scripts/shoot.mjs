// Review screenshots: node scripts/shoot.mjs <outDir> [base]
// Desktop and phone, light and dark, the Home sections one by one, plus a case-study sheet.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const out = process.argv[2] ?? 'scripts/out/review'
const BASE = process.argv[3] ?? process.env.BASE ?? 'http://localhost:5190'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const sections = ['top', 'work', 'manifesto', 'automation', 'about', 'services', 'tools', 'contact']
const errors = []

for (const [name, viewport, mobile] of [
  ['desktop', { width: 1440, height: 900 }, false],
  ['phone', { width: 390, height: 844 }, true],
]) {
  for (const theme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce' })
    await ctx.addInitScript((t) => localStorage.setItem('pv2-theme', t), theme)
    const page = await ctx.newPage()
    page.on('pageerror', (e) => errors.push(`${name}/${theme}: ${e.message}`))
    page.on('console', (m) => m.type() === 'error' && errors.push(`${name}/${theme} console: ${m.text()}`))
    await page.goto(BASE + '/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    for (const id of sections) {
      await page.evaluate((id) => document.getElementById(id)?.scrollIntoView({ block: 'start' }), id)
      await page.waitForTimeout(500)
      await page.screenshot({ path: `${out}/${name}-${theme}-${id}.png` })
    }
    const sw = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    if (sw > 0) errors.push(`${name}/${theme}: sideways scroll ${sw}px`)
    await page.goto(BASE + '/work/payroll', { waitUntil: 'networkidle' })
    await page.waitForTimeout(900)
    await page.screenshot({ path: `${out}/${name}-${theme}-sheet.png` })
    await page.evaluate(() => document.querySelector('.sh__body')?.scrollBy(0, 900))
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${out}/${name}-${theme}-sheet2.png` })
    await ctx.close()
  }
}
await browser.close()
console.log(errors.length ? errors.join('\n') : 'no errors')
