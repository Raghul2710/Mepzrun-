import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import SplitText from '@/components/SplitText'
import { Reveal } from '@/components/Reveal'
import { RegisterButton } from '@/components/RegisterButton'
import { campaignLines } from '@/content/site'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Closing invitation — "Beat Your Best at MEPZ Run 2027!" over an AI-generated (Higgsfield) runner
 * sequence: four motion-blurred strides leading into the sharp hero runner.
 * React Bits SplitText heading (on view); Motion whileInView clip reveal + useScroll drift
 * (recipe: motion-examples-react-scroll-container); Magic UI ShimmerButton CTA.
 */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-3%', '3%'])
  const zoom = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1])
  const [lead, ...rest] = campaignLines.beat.split(' at ')

  return (
    <section ref={ref} aria-label={campaignLines.claim} className="relative isolate overflow-hidden bg-forest-950 text-white">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-leaf/40 to-transparent" />

      <div className="container-x relative z-10 grid gap-8 pt-20 sm:pt-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-leaf-400">
              <span aria-hidden className="h-px w-8 bg-current" />
              {campaignLines.claim}
            </p>
          </Reveal>
          <h2 className="headline mt-5 text-[clamp(2.1rem,4.4vw,4rem)] leading-[0.95]">
            <span className="sr-only">{campaignLines.beat}</span>
            <span aria-hidden className="block">
              <SplitText text={lead} tag="span" splitType="words" effect="rise" mask trigger="view" delay={70} duration={0.9} textAlign="left" className="!block" />
            </span>
            <span aria-hidden className="block text-white/35">
              <SplitText text={`at ${rest.join(' at ')}`} tag="span" splitType="words" effect="rise" mask trigger="view" delay={70} duration={0.9} textAlign="left" className="!block" />
            </span>
          </h2>
        </div>
        <div className="lg:col-span-5 lg:pb-2">
          <Reveal delay={0.15}>
            <p className="max-w-sm text-base leading-[1.7] text-white/70 sm:text-lg">{campaignLines.tagline}</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-7">
            <RegisterButton size="lg" tone="leaf" />
          </Reveal>
        </div>
      </div>

      {/* Runner sequence */}
      <div aria-hidden className="relative -mt-6 h-[240px] sm:-mt-16 sm:h-auto sm:aspect-[1344/576] lg:-mt-28">
        {/* Observer sits on an unclipped wrapper: a fully clipped element never reports as in view. */}
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        >
          <motion.div
            className="absolute inset-0"
            variants={{
              hidden: { clipPath: 'inset(0 100% 0 0)' },
              show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.6, ease: EASE } },
            }}
          >
          <motion.img
            src="/media/cta-runners.webp"
            alt=""
            width={1344}
            height={576}
            decoding="async"
            draggable={false}
            style={{ x: drift, scale: zoom }}
            className="h-full w-full object-cover object-[94%_70%] sm:object-center"
          />
          </motion.div>
        </motion.div>
        {/* blend the image edges into the section */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-forest-950 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-forest-950 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-forest-950 to-transparent" />
      </div>
    </section>
  )
}
