import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import ScrollExpand from '@/components/ScrollExpand'
import { RegisterButton } from '@/components/RegisterButton'
import { campaignLines, slogans } from '@/content/site'

const FILM = {
  desktop: { src: '/media/run-film.mp4', poster: '/media/run-film-poster.jpg' },
  mobile: { src: '/media/run-film-mobile.mp4', poster: '/media/run-film-mobile-poster.jpg' },
}
const EXPAND = 1.1 // viewports spent growing the frame
const HOLD = 2.2 // viewports spent scrubbing at full bleed

/** Lines read over the film, all reused verbatim from the campaign artwork. */
const CAPTIONS = [
  { text: campaignLines.tagline, range: [0.34, 0.39, 0.46, 0.5] }, // over the solo runner
  { text: slogans[2], range: [0.56, 0.61, 0.72, 0.78] }, // Namma MEPZ, Namma Run! — as the crowd floods in
] as const

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setMobile(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return mobile
}

/**
 * Scroll-driven running film, directly after the hero.
 * - React Bits ScrollExpand (locally extended with `scrub` + `videoRef`): rounded frame -> full bleed.
 * - Motion useScroll/useSpring drive video.currentTime with seek coalescing; captions fade on progress
 *   (recipe: motion-examples-react-scroll-container).
 * - Film is attached (preload auto) when the section nears the viewport; GOP-8 encode keeps seeks cheap.
 * - Reduced motion: no video fetch, poster still + all copy shown.
 */
export function RunFilm() {
  const reduce = useReducedMotion()
  const mobile = useIsMobile()
  const film = mobile ? FILM.mobile : FILM.desktop
  const sectionRef = useRef<HTMLElement>(null)
  const videoEl = useRef<HTMLVideoElement | null>(null)
  const [filmSrc, setFilmSrc] = useState<string>()
  const [ctaOn, setCtaOn] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 34, mass: 0.4 })

  // Attach the film (preload="auto") only once the section is within ~1.5 viewports.
  // A same-origin URL is used rather than a Blob URL: Blob-backed media failed to decode seeks in QA.
  useEffect(() => {
    if (reduce) return
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setFilmSrc(film.src)
      },
      { rootMargin: '150% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [film.src, reduce])

  const setVideo = useCallback((el: HTMLVideoElement | null) => {
    videoEl.current = el
  }, [])

  // Scrub loop: while the section is on screen, each frame steers video time toward the scroll
  // position. A new seek is only issued once the previous one has finished (seek coalescing).
  useEffect(() => {
    if (reduce) return
    const el = sectionRef.current
    if (!el) return
    let raf = 0
    const tick = () => {
      const v = videoEl.current
      if (v && v.duration && !Number.isNaN(v.duration) && v.readyState >= 1 && !v.seeking) {
        const t = Math.min(v.duration - 0.05, Math.max(0, smooth.get() * v.duration))
        if (Math.abs(v.currentTime - t) > 1 / 60) v.currentTime = t
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduce, smooth])

  useMotionValueEvent(smooth, 'change', (p) => {
    const on = p > 0.8
    if (on !== ctaOn) setCtaOn(on)
  })

  const c0 = useTransform(smooth, [...CAPTIONS[0].range], [0, 1, 1, 0])
  const c1 = useTransform(smooth, [...CAPTIONS[1].range], [0, 1, 1, 0])
  const y0 = useTransform(smooth, [...CAPTIONS[0].range], [28, 0, 0, -28])
  const y1 = useTransform(smooth, [...CAPTIONS[1].range], [28, 0, 0, -28])
  const ctaO = useTransform(smooth, [0.8, 0.88], [0, 1])
  const ctaY = useTransform(smooth, [0.8, 0.88], [30, 0])
  const progressW = useTransform(smooth, [0.33, 1], ['0%', '100%'])

  const cta = (
    <>
      <p className="eyebrow text-leaf-300">{campaignLines.claim}</p>
      <p className="headline mt-4 max-w-4xl text-[clamp(2.4rem,7vw,6.5rem)] text-white">{campaignLines.categories.join(' • ')}</p>
      <div className="mt-8">
        <RegisterButton size="lg" tone="leaf" />
      </div>
    </>
  )

  if (reduce) {
    return (
      <section aria-label="MEPZ Run film" className="relative isolate overflow-hidden bg-[#03100a] text-white">
        <img src={film.poster} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
        <div className="container-x flex min-h-[80svh] flex-col items-center justify-center gap-6 py-24 text-center">
          <p className="headline-cond text-4xl sm:text-6xl">{campaignLines.headline}</p>
          {CAPTIONS.map((c) => (
            <p key={c.text} className="headline-cond text-2xl text-white/85 sm:text-4xl">
              {c.text}
            </p>
          ))}
          <div className="mt-6 flex flex-col items-center">{cta}</div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="film" aria-label="MEPZ Run film" className="relative bg-[#03100a] text-white">
      {/* seam glow continuing the hero light */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[60vh] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(93,184,46,0.28),transparent_70%)]" />
      <ScrollExpand
        useWindowScroll
        className="[&_video]:[filter:brightness(1.4)_contrast(1.06)_saturate(1.12)]"
        mediaType="video"
        scrub
        videoRef={setVideo}
        src={filmSrc}
        poster={film.poster}
        startWidth={mobile ? 78 : 46}
        startHeight={mobile ? 46 : 58}
        startRadius={28}
        mediaZoom={1.3}
        scrollDistance={EXPAND}
        holdDistance={HOLD}
        smoothing={0.1}
        overlayScrim={0.12}
        title={<span className="headline-cond block text-[clamp(2.6rem,9vw,8rem)] text-white">{campaignLines.headline}</span>}
      >
        <div className="absolute inset-0">
          {/* green cinematic grade + vignette */}
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(3,16,10,0.4)_100%)] mix-blend-multiply" />

          {CAPTIONS.map((c, i) => (
            <motion.p
              key={c.text}
              style={{ opacity: i === 0 ? c0 : c1, y: i === 0 ? y0 : y1 }}
              className="headline-cond absolute inset-x-0 top-1/2 -translate-y-1/2 px-[6%] text-center text-[clamp(2rem,6vw,5.5rem)] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55),0_4px_40px_rgba(0,0,0,0.6)]"
            >
              {c.text}
            </motion.p>
          ))}

          <motion.div
            style={{ opacity: ctaO, y: ctaY, visibility: ctaOn ? 'visible' : 'hidden' }}
            className="absolute inset-0 flex flex-col items-center justify-center px-[6%] text-center"
          >
            {cta}
          </motion.div>

          {/* scrub progress */}
          <div aria-hidden className="absolute inset-x-[6%] bottom-8 h-px bg-white/20">
            <motion.div style={{ width: progressW }} className="h-full bg-leaf-400 shadow-[0_0_12px_rgba(126,211,72,0.8)]" />
          </div>
        </div>
      </ScrollExpand>
      {/* exit seam into the statement */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-[#03100a]" />
    </section>
  )
}
