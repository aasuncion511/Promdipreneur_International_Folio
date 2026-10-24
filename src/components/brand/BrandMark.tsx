import { site } from '@/content/site'

/** The PromdiPreneur salakot-and-lightbulb mark (content/site.ts). It reads on both themes as drawn. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <img src={site.logo.mark} alt="" width={96} height={96} fetchPriority="high" />
    </span>
  )
}

/** The wordmark half of the real lockup. Dark green artwork: CSS sets it on a cream plate in the dark theme. */
export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <img src={`${import.meta.env.BASE_URL}images/brand/wordmark-96.webp`} alt="" width={321} height={96} />
    </span>
  )
}
