import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { logo } from '@/content/site'
import { markBooted, usePageReady } from '@/lib/boot'

const EASE = [0.76, 0, 0.24, 1] as const
const MAX_WAIT_MS = 4500 // never hold the page longer than this, even on a slow network
const SEEN_KEY = 'mepz-preloader-seen'

/**
 * Logo preloader (Motion). Brand tile with a spinning green gradient border and start-line pulse rings,
 * a progress track + counter, then a two-layer curtain (forest, then leaf) wipes up to reveal the page.
 * Waits for the page chunk + window load (capped), with a short minimum so it never just flashes.
 * Repeat visits in the same tab session get a quicker pass; reduced motion gets a plain fade.
 */
export function Preloader() {
  const reduce = useReducedMotion()
  const pageReady = usePageReady()
  const [loaded, setLoaded] = useState(() => document.readyState === 'complete')
  const [show, setShow] = useState(true)
  const progress = useMotionValue(0)
  const pct = useTransform(progress, (v) => String(Math.round(v * 100)).padStart(3, '0'))

  // Window load, or give up waiting after MAX_WAIT_MS.
  useEffect(() => {
    if (loaded) return
    const done = () => setLoaded(true)
    window.addEventListener('load', done, { once: true })
    const cap = window.setTimeout(done, MAX_WAIT_MS)
    return () => {
      window.removeEventListener('load', done)
      window.clearTimeout(cap)
    }
  }, [loaded])

  // Lock scrolling while the loader is up.
  useEffect(() => {
    if (!show) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [show])

  // Phase 1: run the bar to 85% over a minimum time. Phase 2: once ready, finish and lift.
  const [warmed, setWarmed] = useState(false)
  useEffect(() => {
    const seen = sessionStorage.getItem(SEEN_KEY) === '1'
    const min = reduce ? 0.35 : seen ? 0.7 : 1.5
    const c = animate(progress, 0.85, { duration: min, ease: [0.22, 1, 0.36, 1] })
    c.then(() => setWarmed(true))
    return () => c.stop()
  }, [progress, reduce])

  useEffect(() => {
    if (!warmed || !pageReady || !loaded) return
    const c = animate(progress, 1, { duration: reduce ? 0.15 : 0.4, ease: 'easeOut' })
    c.then(() => {
      sessionStorage.setItem(SEEN_KEY, '1')
      window.setTimeout(() => {
        markBooted()
        setShow(false)
      }, reduce ? 0 : 220)
    })
    return () => c.stop()
  }, [warmed, pageReady, loaded, progress, reduce])

  const curtain = reduce
    ? { opacity: 0, transition: { duration: 0.35 } }
    : { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.95, ease: EASE } }

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="preloader" className="pointer-events-auto fixed inset-0 z-[100]" exit={{ opacity: 1, transition: { duration: reduce ? 0.35 : 1.1 } }}>
          {/* trailing leaf layer: shows as a green sweep behind the forest curtain */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-leaf"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduce ? { opacity: 0, transition: { duration: 0.35 } } : { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.95, ease: EASE, delay: 0.14 } }}
          />
          <motion.div
            role="status"
            aria-live="polite"
            className="track-lines absolute inset-0 grid place-items-center overflow-hidden bg-forest-950 text-white"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={curtain}
          >
            <span className="sr-only">Loading MEPZ Run</span>
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf/20 blur-[140px]" />
              <div className="absolute -bottom-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[50%] bg-forest-800/70 blur-3xl" />
            </div>

            <motion.div
              className="relative flex flex-col items-center"
              exit={reduce ? undefined : { y: -60, opacity: 0, transition: { duration: 0.5, ease: EASE } }}
            >
              {/* Logo tile */}
              <motion.div
                className="relative"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={reduce ? { duration: 0.3 } : { type: 'spring', stiffness: 170, damping: 16, delay: 0.05 }}
              >
                {/* start-line pulse rings */}
                {!reduce &&
                  [0, 0.7].map((d) => (
                    <motion.span
                      key={d}
                      aria-hidden
                      className="absolute inset-0 rounded-[2rem] border-2 border-leaf-400/70"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
                      transition={{ duration: 1.4, ease: 'easeOut', repeat: Infinity, delay: 0.4 + d }}
                    />
                  ))}
                <div className="relative overflow-hidden rounded-[2rem] p-[3px] shadow-[0_0_60px_-10px_rgba(126,211,72,0.55)]">
                  {/* spinning green gradient border */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-[-60%] bg-[conic-gradient(from_0deg,transparent_0%,#1f5212_20%,#5db82e_38%,#a6e07c_48%,transparent_62%,transparent_100%)]"
                    animate={reduce ? undefined : { rotate: 360 }}
                    transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
                  />
                  <motion.div
                    className="relative grid size-32 place-items-center rounded-[calc(2rem-3px)] bg-white p-2.5 sm:size-40"
                    animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
                    transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
                  >
                    <img src={logo.sm} alt="" width={160} height={160} decoding="sync" fetchPriority="high" className="h-full w-full object-contain" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Progress */}
              <motion.div
                className="mt-12 flex w-60 flex-col items-center sm:w-72"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : 0.35 }}
              >
                <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-leaf-600 via-leaf-400 to-leaf-300 shadow-[0_0_14px_rgba(126,211,72,0.7)]"
                    style={{ scaleX: progress }}
                  />
                </div>
                <p aria-hidden className="mt-4 flex w-full items-baseline justify-between text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                  <span>MEPZ Run 2027</span>
                  <span className="headline-cond text-2xl tracking-normal text-white tabular-nums">
                    <motion.span>{pct}</motion.span>
                    <span className="text-leaf-400">%</span>
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
