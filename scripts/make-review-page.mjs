// Turns dist-review/index.html into dist-review/review.html: the head's own tags and the body, without the
// document skeleton, for hosts that wrap a published page in their own (the comparison review artifact).
import { readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync('dist-review/index.html', 'utf8')
const head = html.match(/<head>([\s\S]*)<\/head>/)[1]
  .replace(/<meta charset[^>]*>\s*/i, '')
  .replace(/<meta name="viewport"[^>]*>\s*/i, '')
  .replace(/ data-static-meta/g, '')
const body = html.match(/<body>([\s\S]*)<\/body>/)[1]
writeFileSync('dist-review/review.html', `${head.trim()}\n${body.trim()}\n`)
console.log('wrote dist-review/review.html')
