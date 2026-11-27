import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { ArrowDown, Expand } from 'lucide-react'
import { Lightbox } from '@/components/Lightbox'
import SplitText from '@/components/SplitText'
import GradientText from '@/components/GradientText'
import ScrollVelocity from '@/components/ScrollVelocity'
import { RegisterButton } from '@/components/RegisterButton'
import { campaignLines, heroSlides, slogans } from '@/content/site'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const
const SLIDE_MS = 6000
export const RUNNER = { src: '/media/runner.webp', trail: '/media/runner-trail.webp', w: 730, h: 952 }

/** Trail copies behind the runner: offset (% of runner width), opacity, blur. */
const TRAIL = [
  { x: -14, o: 0.55, b: 2 },
  { x: -30, o: 0.32, b: 6 },
  { x: -48, o: 0.16, b: 12 },
]

/** Light streaks crossing the stage (top %, width, duration s, delay s). */
const STREAKS = [
  { top: 30, w: 38, d: 2.6, delay: 0 },
  { top: 46, w: 24, d: 1.9, delay: 0.8 },
  { top: 58, w: 46, d: 3.1, delay: 1.6 },
  { top: 71, w: 30, d: 2.2, delay: 0.4 },
]

/**
 * Opening chapter — cinematic green hero.
 * - Oversized MEPZ RUN: React Bits SplitText, bleeding past the viewport; drifts left on scroll.
 * - Runner (AI-generated cut-out): Motion entrance, blurred trail copies, stride bob, controlled
 *   RGB-split glitch bursts, scroll + fine-pointer parallax (recipe: motion-examples-react-scroll-container).
 * - 2027 tag: React Bits GradientText.
 * - Campaign artwork card: Motion AnimatePresence crossfade.
 * - Slogan band: React Bits ScrollVelocity.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [viewer, setViewer] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const typeX = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-16%'])
  const runnerX = useTransform(scrollYProgress, [0, 1], ['0vw', reduce ? '0vw' : '16vw'])
  const runnerScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-30%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])

  // Fine-pointer parallax (desktop only).
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 18 })
  const sy = useSpring(py, { stiffness: 60, damping: 18 })
  const runnerPX = useTransform(sx, (v) => v * 18)
  const runnerPY = useTransform(sy, (v) => v * 10)
  const typePX = useTransform(sx, (v) => v * -30)
  const glowX = useTransform(sx, (v) => `${v * 6}%`)
  const glowY = useTransform(sy, (v) => `${v * 6}%`)
  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  useEffect(() => {
    if (reduce || paused || viewer) return
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [index, reduce, paused, viewer])

  const glitch = (dx: number[], clip: string[]) =>
    reduce
      ? undefined
      : {
          opacity: [0, 0.9, 0.6, 0.9, 0],
          x: dx,
          clipPath: clip,
          transition: { duration: 0.28, times: [0, 0.2, 0.5, 0.75, 1], repeat: Infinity, repeatDelay: 4.4, delay: 2.2 },
        }

  return (
    <section
      id="top"
      ref={ref}
      aria-label="MEPZ Run 2027"
      onPointerMove={onPointerMove}
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#03100a] text-white lg:min-h-[max(100svh,760px)]"
    >
      {/* Channel filters for the RGB split */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="mz-ch-r" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
        </filter>
        <filter id="mz-ch-c" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
      </svg>

      {/* Green atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_58%_52%,#17641f_0%,#0b3313_38%,#04150b_68%,#03100a_100%)]" />
        <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0">
          <motion.div
            className="absolute top-[18%] left-[42%] size-[36rem] rounded-full bg-leaf/35 blur-[140px]"
            animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-10%] left-[8%] size-[28rem] rounded-full bg-leaf-600/30 blur-[120px]"
            animate={reduce ? undefined : { x: [0, 40, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute top-[30%] right-[-6%] size-[22rem] rounded-full bg-amber/10 blur-[110px]" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#03100a]" />
      </div>

      {/* Top copy */}
      <motion.div style={{ y: copyY, opacity: fade }} className="container-x relative z-20 order-1 pt-28 lg:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="eyebrow mb-5 rounded-full border border-leaf-400/30 bg-leaf/10 px-4 py-2 text-leaf-300 backdrop-blur"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-leaf-400 shadow-[0_0_12px_2px] shadow-leaf-400/70" />
          {campaignLines.edition}
        </motion.p>
        <h1 className="sr-only">MEPZ Run 2027</h1>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="max-w-md lg:max-w-2xl"
        >
          <p className="headline-cond text-4xl text-white sm:text-5xl lg:text-[3.5rem]">{campaignLines.headline}</p>
          <p className="mt-3 text-base text-white/70 sm:text-lg">{campaignLines.sub}</p>
        </motion.div>
      </motion.div>

      {/* Stage: oversized type + runner */}
      <div className="pointer-events-none relative z-10 order-2 h-[56svh] min-h-[340px] lg:absolute lg:inset-0 lg:h-auto">
        <motion.div
          aria-hidden
          style={{ x: typeX }}
          className="absolute inset-x-0 top-[46%] -translate-y-1/2 lg:top-[min(57%,calc(100%-19rem-4.8vw))]"
        >
          <motion.div style={{ x: typePX }} className="flex justify-center">
            <div className="headline w-max shrink-0 text-center leading-[0.8] whitespace-nowrap text-[#e9f7df]">
              <span className="block text-[28vw] lg:hidden">
                <SplitText text="MEPZ" tag="span" splitType="chars" effect="rise" mask trigger="load" delay={50} duration={1} className="!block !whitespace-nowrap !overflow-visible" />
              </span>
              <span className="block text-[28vw] lg:hidden">
                <SplitText text="RUN" tag="span" splitType="chars" effect="rise" mask trigger="load" delay={50} duration={1} className="!block !whitespace-nowrap !overflow-visible" />
              </span>
              <span className="hidden text-[15vw] lg:block">
                <SplitText text="MEPZ RUN" tag="span" splitType="chars" effect="rise" mask trigger="load" delay={45} duration={1} className="!block !whitespace-nowrap !overflow-visible" />
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Speed streaks */}
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          {STREAKS.map((s) => (
            <motion.span
              key={s.top}
              className="absolute left-0 h-px bg-gradient-to-r from-transparent via-leaf-300/70 to-transparent"
              style={{ top: `${s.top}%`, width: `${s.w}%` }}
              initial={{ x: '-110%', opacity: 0 }}
              animate={reduce ? { x: '40vw', opacity: 0.4 } : { x: ['-110%', '260%'], opacity: [0, 1, 0] }}
              transition={reduce ? { duration: 0 } : { duration: s.d, delay: s.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Runner */}
        <motion.div
          style={{ x: runnerX, scale: runnerScale, opacity: fade }}
          className="absolute bottom-0 left-1/2 h-[96%] -translate-x-1/2 lg:bottom-[9%] lg:left-[55%] lg:h-[min(76svh,800px)]"
        >
          <motion.div style={{ x: runnerPX, y: runnerPY }} className="relative h-full" >
            <motion.div
              initial={reduce ? false : { x: '-45vw', opacity: 0, filter: 'blur(14px)' }}
              animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.25, ease: EASE, delay: 0.35 }}
              className="relative h-full"
              style={{ aspectRatio: `${RUNNER.w} / ${RUNNER.h}` }}
            >
              {/* Blurred motion trail */}
              {TRAIL.map((t, i) => (
                <motion.img
                  key={t.x}
                  aria-hidden
                  src={RUNNER.trail}
                  alt=""
                  draggable={false}
                  className={cn('absolute inset-0 h-full w-full object-contain mix-blend-screen', i === 2 && 'hidden sm:block')}
                  style={{ left: `${t.x}%`, opacity: t.o, filter: `blur(${t.b}px)` }}
                  animate={reduce ? undefined : { x: ['0%', `${-4 - i * 3}%`, '0%'], scaleX: [1, 1.06, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
                />
              ))}

              {/* Runner + glitch layers */}
              <motion.div
                className="absolute inset-0"
                animate={reduce ? undefined : { y: ['0%', '-1.1%', '0%'] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={RUNNER.src}
                  alt="A runner in a green MEPZ-style singlet sprinting"
                  width={RUNNER.w}
                  height={RUNNER.h}
                  fetchPriority="high"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                />
                {!reduce && (
                  <>
                    <motion.img
                      aria-hidden
                      src={RUNNER.src}
                      alt=""
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-contain opacity-0 mix-blend-screen [filter:url(#mz-ch-r)]"
                      animate={glitch([0, -9, 5, -6, 0], ['inset(0 0 0 0)', 'inset(18% 0 52% 0)', 'inset(46% 0 30% 0)', 'inset(8% 0 70% 0)', 'inset(0 0 0 0)'])}
                    />
                    <motion.img
                      aria-hidden
                      src={RUNNER.src}
                      alt=""
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-contain opacity-0 mix-blend-screen [filter:url(#mz-ch-c)]"
                      animate={glitch([0, 8, -6, 4, 0], ['inset(0 0 0 0)', 'inset(60% 0 14% 0)', 'inset(30% 0 48% 0)', 'inset(72% 0 6% 0)', 'inset(0 0 0 0)'])}
                    />
                    <motion.img
                      aria-hidden
                      src={RUNNER.src}
                      alt=""
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-contain opacity-0"
                      animate={glitch([0, 16, -12, 10, 0], ['inset(40% 0 52% 0)', 'inset(40% 0 52% 0)', 'inset(62% 0 30% 0)', 'inset(22% 0 72% 0)', 'inset(40% 0 52% 0)'])}
                    />
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 2027 tag */}
        <motion.div aria-hidden style={{ opacity: fade }} className="absolute top-[62%] right-[4%] z-10 lg:top-[72%] lg:right-[3%]">
          <motion.span
            initial={{ opacity: 0, scale: 0.8, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }} className="headline block rounded-xl border-2 border-leaf-400 bg-[#03100a]/75 px-3 py-1.5 text-[clamp(1.75rem,4.6vw,4.25rem)] shadow-[0_0_32px_rgba(126,211,72,0.3)] backdrop-blur-sm lg:px-4 lg:py-1.5">
            <GradientText colors={['#7ed348', '#f5a524', '#a6e07c', '#7ed348']} animationSpeed={6} yoyo>
              2027
            </GradientText>
          </motion.span>
        </motion.div>
      </div>

      {/* Bottom copy */}
      <motion.div style={{ opacity: fade }} className="container-x relative z-20 order-3 pt-6 pb-10 lg:mt-auto lg:pb-12">
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.95 } } }}
          className="flex flex-wrap gap-2"
          aria-label="Race categories"
        >
          {campaignLines.categories.map((c) => (
            <motion.li
              key={c}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } } }}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold tracking-wide text-white/90 backdrop-blur"
            >
              {c}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          className="mt-6 flex flex-wrap items-center gap-4"
        >
          <RegisterButton size="lg" tone="leaf" />
          <a
            href="#about"
            className="group/ghost inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#03100a]/40 px-6 py-4 font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 active:translate-y-0 motion-reduce:hover:translate-y-0"
          >
            About Us
            <ArrowDown className="size-4 transition-transform duration-300 group-hover/ghost:translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Campaign artwork card */}
      <motion.div
        style={{ opacity: fade }}
        className="container-x relative z-30 order-4 pb-10 lg:absolute lg:top-28 lg:right-12 lg:left-auto lg:w-[340px] lg:max-w-none lg:px-0 lg:pb-0 xl:w-[380px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-2 backdrop-blur-md"
        >
          <div
            className="relative aspect-[1600/724] overflow-hidden rounded-[1rem] bg-white"
            role="region"
            aria-roledescription="carousel"
            aria-label="MEPZ Run 2027 campaign"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={heroSlides[index].src}
                src={heroSlides[index].src}
                alt={heroSlides[index].alt}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.1, ease: EASE }}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
            </AnimatePresence>
            {/* Click / tap opens the image in a popup */}
            <button
              type="button"
              onClick={() => setViewer(true)}
              aria-haspopup="dialog"
              aria-label={`View larger: ${heroSlides[index].alt}`}
              className="group/zoom absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-leaf-400"
            >
              <span aria-hidden className="absolute inset-0 bg-forest-950/0 transition-colors duration-300 group-hover/zoom:bg-forest-950/15" />
              <span
                aria-hidden
                className="absolute right-2.5 bottom-2.5 grid size-9 place-items-center rounded-full bg-forest-950/70 text-white opacity-80 shadow-lg ring-1 ring-white/20 backdrop-blur-md transition-[opacity,transform] duration-300 group-hover/zoom:scale-110 group-hover/zoom:opacity-100"
              >
                <Expand className="size-4" />
              </span>
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 px-2 pt-3 pb-1">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose campaign slide">
              {heroSlides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1} of ${heroSlides.length}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'relative h-1.5 overflow-hidden rounded-full bg-white/20 transition-[width] duration-500 ease-out',
                    i === index ? 'w-12' : 'w-5 hover:bg-white/40',
                  )}
                >
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-leaf-400"
                      initial={{ width: reduce || paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: reduce || paused ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
            <p className="font-mono text-[0.7rem] tracking-widest text-white/50">
              {String(index + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </p>
          </div>
        </motion.div>

        {/* QR code card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="mt-3 flex items-center gap-4 rounded-[1.4rem] border border-leaf-400/25 bg-[#04150b]/90 p-2 pr-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <div className="relative shrink-0 rounded-[1rem] bg-white p-1.5 shadow-[0_0_28px_rgba(126,211,72,0.25)] ring-2 ring-leaf-400/70">
            <img
              src="/media/mepzrun-qr.png"
              alt="QR code to register for MEPZ Run 2027"
              width={500}
              height={500}
              loading="lazy"
              draggable={false}
              className="size-24 rounded-md xl:size-28"
            />
          </div>
          <div className="min-w-0">
            <p className="eyebrow text-[0.7rem] text-leaf-300">
              <span aria-hidden className="size-1.5 rounded-full bg-leaf-400 shadow-[0_0_10px_2px] shadow-leaf-400/70" />
              Scan me
            </p>
            <p className="headline-cond mt-1 text-xl leading-tight text-white xl:text-2xl">Scan to register</p>
            <p className="mt-1 text-sm text-white/60">Point your phone camera at the code to sign up.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Slogan band */}
      <div aria-hidden className="relative z-20 order-5 -mx-[3vw] mb-6 w-[106vw] -rotate-1 border-y-2 border-[#03100a] bg-leaf py-3 text-[#03100a] lg:mt-0">
        <ScrollVelocity
          texts={[
            <span className="inline-flex items-center gap-8">
              {slogans.map((s) => (
                <span key={s} className="inline-flex items-center gap-8">
                  {s}
                  <svg viewBox="0 0 24 24" className="size-[0.7em] shrink-0" fill="currentColor">
                    <path d="M21 3C10 3 4 9 4 17c0 1.4.3 2.7.8 4 1-4 4-8 9-10-4 3-6.5 6-7.5 10 .9.3 1.8.4 2.7.4C17 21.4 21 14 21 3Z" />
                  </svg>
                </span>
              ))}
            </span>,
          ]}
          velocity={40}
          numCopies={3}
          skewWithVelocity={6}
          pauseOnHover
          className="headline-cond"
          scrollerClassName="!drop-shadow-none"
          fontSize="clamp(1.35rem, 2.6vw, 2.25rem)"
          fontWeight={700}
          gap={32}
        />
      </div>

      <Lightbox
        images={heroSlides}
        index={index}
        open={viewer}
        onIndex={setIndex}
        onClose={() => setViewer(false)}
        label="MEPZ Run 2027 campaign"
      />
    </section>
  )
}
