import { ShimmerButton } from '@/components/ui/shimmer-button'
import { REGISTER_URL } from '@/content/site'
import { cn } from '@/lib/utils'

/** Brand yellow (amber) for every Register CTA; the navbar uses a white-yellow glass. */
const YELLOW = {
    background: 'linear-gradient(135deg,#ffd27a 0%,#f5a524 55%,#e3901b 100%)',
    shimmer: '#ffffff',
    cls: 'border-amber-300/70 font-bold text-forest-950 shadow-[0_10px_30px_-10px_rgba(245,165,36,0.6)] hover:shadow-[0_18px_40px_-12px_rgba(245,165,36,0.75)]',
  }

const TONES = {
  navy: YELLOW,
  leaf: YELLOW,
  /** White-yellow frosted glass — over dark or photographic backgrounds (navbar). */
  glass: {
    background: 'linear-gradient(135deg,rgba(255,214,120,0.38) 0%,rgba(255,255,255,0.12) 60%,rgba(255,214,120,0.18) 100%), rgba(0,0,0,0.3)',
    shimmer: '#ffd27a',
    cls: 'border-amber-300/55 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,236,190,0.6),0_8px_24px_-10px_rgba(245,165,36,0.45)] hover:border-amber-300/90 hover:bg-amber/15 hover:shadow-[inset_0_1px_0_rgba(255,236,190,0.75),0_14px_32px_-12px_rgba(245,165,36,0.6)]',
  },
} as const

/**
 * Primary "Register Now" CTA — Magic UI `ShimmerButton` (recipe: magicui-docs-components-shimmer-button)
 * rendered as a link to the existing external registration flow.
 */
export function RegisterButton({
  label = 'Register Now',
  size = 'md',
  tone = 'navy',
  className,
}: {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  tone?: keyof typeof TONES
  className?: string
}) {
  const t = TONES[tone]
  return (
    <ShimmerButton
      href={REGISTER_URL}
      background={t.background}
      shimmerColor={t.shimmer}
      shimmerDuration="3.2s"
      borderRadius="999px"
      className={cn(
        'group/cta inline-flex w-auto font-semibold tracking-tight transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
        t.cls,
        size === 'sm' && 'px-5 py-2.5 text-sm',
        size === 'md' && 'px-7 py-3 text-[0.95rem]',
        size === 'lg' && 'px-9 py-4 text-lg',
        className,
      )}
    >
      <span className="relative z-10">{label}</span>
    </ShimmerButton>
  )
}
