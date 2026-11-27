import { useReducedMotion } from 'motion/react'
import { TextReveal } from '@/components/ui/text-reveal'
import { campaignLines } from '@/content/site'
import { useTone } from '@/theme'

/**
 * Statement beat between the film and About — Magic UI TextReveal lights each word with scroll.
 * Mixed tone: white chapter, words go pale → near-black. Dark tone: forest chapter, words go dim → white.
 * Green scroll highlight: each word flashes brand green as it lights, a leaf marker sweeps under it, then it
 * settles to ink ("Greener" stays green). Copy is the campaign line, verbatim. Reduced motion renders it fully lit.
 */
export function Statement() {
  const reduce = useReducedMotion()
  const { dark, t } = useTone()
  const textCls = `headline-cond justify-center text-center !text-[clamp(2.6rem,7.5vw,7.5rem)] leading-[0.95] ${t('text-forest-950/40', 'text-white/15')}`
  const lit = t('text-forest-950', 'text-white')

  return (
    <section aria-label={campaignLines.back} className={t('relative isolate bg-white text-forest-950', 'relative isolate bg-forest-950 text-white')}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* soft fade out of the dark film above (white tone only) */}
        {!dark && <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-forest-950 to-white" />}
        <div className={t('absolute top-1/3 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-leaf/10 blur-[150px]', 'absolute top-1/3 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-leaf/15 blur-[150px]')} />
      </div>
      {reduce ? (
        <p className={`${textCls} container-x py-32 !${lit}`}>{campaignLines.back}</p>
      ) : (
        <TextReveal
          className="h-[160svh] lg:h-[220vh]"
          textClassName={`${textCls} !max-w-none`}
          wordClassName={lit}
          highlight={{
            active: dark ? '#7ed348' : '#3f951b',
            settle: dark ? '#ffffff' : '#03100a',
            markerClassName: dark ? 'bg-leaf/25' : 'bg-leaf/30',
            keep: ['Greener'],
          }}
        >
          {campaignLines.back}
        </TextReveal>
      )}
    </section>
  )
}
