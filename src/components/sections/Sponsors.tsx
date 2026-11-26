import { useReducedMotion } from 'motion/react'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { sponsors } from '@/content/site'
import { useTone } from '@/theme'

function Logo({ src, alt }: { src: string; alt: string }) {
  const { t } = useTone()
  return (
    <figure className={t('group w-[17rem] shrink-0 overflow-hidden rounded-[1.25rem] bg-white p-2 shadow-[0_14px_34px_-22px_rgba(3,16,10,0.3)] ring-1 ring-forest-950/10 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(63,149,27,0.35)] hover:ring-leaf-600/30 motion-reduce:hover:translate-y-0 sm:w-[22rem]', 'group w-[17rem] shrink-0 overflow-hidden rounded-[1.25rem] bg-white p-2 shadow-[0_14px_34px_-22px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(93,184,46,0.35)] motion-reduce:hover:translate-y-0 sm:w-[22rem]')}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="aspect-[2/1] w-full object-contain" />
    </figure>
  )
}

/**
 * Evidence chapter — Sponsors & Partners.
 * Motion Primitives InfiniteSlider (slows on hover) framed by Motion Primitives ProgressiveBlur edges.
 * Reduced motion: a static wrapped grid.
 */
export function Sponsors() {
  const { t } = useTone()
  const reduce = useReducedMotion()

  return (
    <section id="sponsors" aria-labelledby="sponsors-title" className={t('section-y relative isolate overflow-hidden bg-white text-forest-950', 'section-y relative isolate overflow-hidden bg-forest-950 text-white')}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className={t('absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-forest-950/10 to-transparent', 'absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-leaf/40 to-transparent')} />
        <div className="absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf/10 blur-[150px]" />
      </div>
      <div className="container-x text-center">
        <SectionHeading id="sponsors-title" eyebrow="Sponsors" eyebrowClassName={t('justify-center text-leaf-600', 'justify-center text-leaf-400')} className={t('text-[clamp(2.25rem,7vw,6rem)] text-forest-950', 'text-[clamp(2.25rem,7vw,6rem)] text-white')}>
          {sponsors.title}
        </SectionHeading>
        <Reveal delay={0.1}>
          <p className={t('mx-auto mt-6 max-w-2xl text-lg leading-[1.7] text-forest-950/70 sm:text-xl', 'mx-auto mt-6 max-w-2xl text-lg leading-[1.7] text-white/75 sm:text-xl')}>{sponsors.body}</p>
        </Reveal>
      </div>

      {reduce ? (
        <ul className="container-x mt-14 flex flex-wrap justify-center gap-5">
          {sponsors.logos.map((l) => (
            <li key={l.src}>
              <Logo {...l} />
            </li>
          ))}
        </ul>
      ) : (
        <Reveal delay={0.15} className="relative mt-14 sm:mt-16">
          <InfiniteSlider gap={24} speed={45} speedOnHover={12} className="-my-10 py-16">
            {sponsors.logos.map((l) => (
              <Logo key={l.src} {...l} />
            ))}
          </InfiniteSlider>
          <ProgressiveBlur className="pointer-events-none absolute top-0 left-0 h-full w-16 sm:w-48" direction="left" blurIntensity={1} />
          <ProgressiveBlur className="pointer-events-none absolute top-0 right-0 h-full w-16 sm:w-48" direction="right" blurIntensity={1} />
          <div aria-hidden className={t('pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white sm:w-24', 'pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-forest-950 sm:w-24')} />
          <div aria-hidden className={t('pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white sm:w-24', 'pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-forest-950 sm:w-24')} />
        </Reveal>
      )}
    </section>
  )
}
