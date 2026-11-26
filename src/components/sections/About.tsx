import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { RegisterButton } from '@/components/RegisterButton'
import TiltedCard from '@/components/TiltedCard'
import CircularText from '@/components/CircularText'
import { NumberTicker } from '@/components/ui/number-ticker'
import { about } from '@/content/site'
import { useTone } from '@/theme'
import { cn } from '@/lib/utils'
import { Award, Factory, Lightbulb, Route } from 'lucide-react'

/** Highlights drawn directly from the About copy and the 2027 campaign (no new claims). */
const stats = [
  { value: 1984, start: 1950, label: 'MEPZ created', note: 'One of the oldest Export Processing Zones in India', icon: Factory },
  { value: 2014, start: 1990, label: 'The idea is born', note: 'An annual MEPZ run, discussed in MEPZMA', icon: Lightbulb },
  { value: 11, start: 0, suffix: 'th', label: 'Edition', note: 'MEPZ Run 2027', icon: Award },
  { value: 3, start: 0, label: 'Race categories', note: '5KM • 10KM • Half Marathon', icon: Route },
]

/**
 * Story chapter — "open letter" composition.
 * Motion useScroll parallax on the photo pair, Motion Primitives TextEffect heading + InView reveals,
 * Magic UI NumberTicker for the highlight figures.
 */
export function About() {
  const { dark, t } = useTone()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const frontY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['22%', '-18%'])

  return (
    <section id="about" ref={ref} className={t('section-y relative isolate overflow-hidden bg-white text-forest-950', 'section-y relative isolate overflow-hidden bg-forest-950 text-white')}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 size-[32rem] rounded-full bg-leaf/10 blur-[140px]" />
      </div>
      <div aria-hidden className={t('pointer-events-none absolute -top-10 right-0 select-none headline text-[22vw] leading-none text-forest-950/[0.04]', 'pointer-events-none absolute -top-10 right-0 select-none headline text-[22vw] leading-none text-white/[0.03]')}>
        MEPZ
      </div>

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Photo composition: React Bits TiltedCard + CircularText badge, Motion scroll drift */}
        <div className="relative order-2 pb-14 sm:pb-20 lg:order-1 lg:col-span-6 lg:pr-6">
          <Reveal className="relative w-[86%] sm:w-[78%]">
            <div className="aspect-[4/5] w-full">
              <TiltedCard
                imageSrc={about.images[0].src}
                altText={about.images[0].alt}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={9}
                scaleOnHover={1.03}
                showTooltip={false}
                radius={28}
                glare={0.35}
                shadow={0.7}
                floating
              />
            </div>
          </Reveal>
          <motion.div style={{ y: frontY }} className="absolute right-0 bottom-0 w-[48%] sm:w-[44%]">
            <Reveal delay={0.15} className={t('overflow-hidden rounded-[1.5rem] border-[6px] border-white shadow-2xl shadow-forest-950/25 ring-1 ring-forest-950/10', 'overflow-hidden rounded-[1.5rem] border-[6px] border-forest-950 shadow-2xl shadow-black/60 ring-1 ring-white/10')}>
              <img src={about.images[1].src} alt={about.images[1].alt} loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
            </Reveal>
          </motion.div>
          <Reveal delay={0.3} className="absolute top-[5%] right-[2%] sm:right-[10%]">
            <CircularText
              text="MEPZ RUN • SINCE 2014 • "
              size={132}
              fontSize={12}
              fontWeight={700}
              spinDuration={18}
              onHover="speedUp"
              draggable
              color="#03100a"
              className="font-display tracking-[0.12em] uppercase rounded-full bg-amber shadow-[0_0_44px_rgba(245,165,36,0.4)]"
            >
              <span className="headline-cond text-[1.9rem] leading-none text-forest-950">2014</span>
            </CircularText>
          </Reveal>
        </div>

        {/* Letter */}
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <SectionHeading eyebrow={about.eyebrow} eyebrowClassName={t('text-leaf-600', 'text-leaf-400')} className={t('text-[clamp(2.25rem,7vw,6rem)] text-forest-950', 'text-[clamp(2.25rem,7vw,6rem)] text-white')}>
            {about.title}
          </SectionHeading>
          <Reveal delay={0.1}>
            <p className={t('mt-8 max-w-[36rem] text-lg leading-[1.7] text-forest-950/70 sm:text-xl', 'mt-8 max-w-[36rem] text-lg leading-[1.7] text-white/75 sm:text-xl')}>
              <span className={t('float-left mt-1 mr-3 headline text-[4.2rem] leading-[0.8] text-leaf-600', 'float-left mt-1 mr-3 headline text-[4.2rem] leading-[0.8] text-leaf-400')}>{about.body.charAt(0)}</span>
              {about.body.slice(1)}
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <RegisterButton tone="leaf" />
          </Reveal>
        </div>
      </div>

      {/* Highlights */}
      <div className="container-x relative mt-24 lg:mt-32">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => {
            const featured = i === 2
            const onDark = dark || featured
            const Icon = s.icon
            return (
              <Reveal as="li" key={s.label} delay={i * 0.08} className="h-full">
                <div
                  className={cn(
                    'group relative h-full overflow-hidden rounded-2xl border p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:p-6',
                    featured && !dark && 'border-forest-950 bg-forest-950 shadow-[0_24px_50px_-28px_rgba(3,16,10,0.7)]',
                    featured && dark && 'border-leaf-400/30 bg-gradient-to-br from-leaf-600/35 via-forest-850 to-forest-900 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.9)]',
                    !featured && !dark && 'border-forest-950/10 bg-gradient-to-br from-leaf/[0.09] via-white to-white shadow-[0_18px_40px_-28px_rgba(3,16,10,0.35)] hover:border-leaf-600/35 hover:shadow-[0_26px_50px_-28px_rgba(63,149,27,0.45)]',
                    !featured && dark && 'border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl hover:border-leaf-400/30',
                  )}
                >
                  {/* accent bar: grows across on hover */}
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[0.28] bg-gradient-to-r from-leaf-600 via-leaf-400 to-leaf-300 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                  <span aria-hidden className="pointer-events-none absolute -top-14 -right-14 size-36 rounded-full bg-leaf/25 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-3">
                    <p className={cn('headline flex items-baseline text-[2.1rem] tabular-nums sm:text-[2.6rem]', onDark ? 'text-white' : 'text-forest-950')}>
                      <span className="sr-only">{s.value}</span>
                      <NumberTicker aria-hidden value={s.value} startValue={s.start} useGrouping={false} stiffness={120} damping={26} className={cn('tracking-tight', onDark ? 'text-white' : 'text-forest-950')} />
                      {s.suffix && <span className={cn('ml-1 text-lg sm:text-xl', onDark ? 'text-leaf-400' : 'text-leaf-600')}>{s.suffix}</span>}
                    </p>
                    <span
                      aria-hidden
                      className={cn(
                        'grid size-10 shrink-0 place-items-center rounded-xl ring-1 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] motion-reduce:group-hover:transform-none sm:size-11',
                        onDark ? 'bg-leaf-400/15 text-leaf-300 ring-leaf-400/30' : 'bg-leaf/12 text-leaf-600 ring-leaf-600/20',
                      )}
                    >
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                  </div>
                  <p className={cn('mt-4 text-xs font-semibold tracking-[0.14em] uppercase', onDark ? 'text-leaf-300' : 'text-leaf-600')}>{s.label}</p>
                  <p className={cn('mt-1.5 text-sm leading-snug', onDark ? 'text-white/65' : 'text-forest-950/60')}>{s.note}</p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
