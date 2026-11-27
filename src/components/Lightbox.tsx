import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

type Img = { src: string; alt: string }

/**
 * Image popup (Motion). Portal to <body>, blurred forest backdrop, image scales in from the card,
 * crossfades between slides. Esc / backdrop click closes, ←/→ step, focus moves to the close button and
 * returns to the opener; page scroll is locked while open. Reduced motion: fades only.
 */
export function Lightbox({
  images,
  index,
  open,
  onIndex,
  onClose,
  label,
}: {
  images: Img[]
  index: number
  open: boolean
  onIndex: (i: number) => void
  onClose: () => void
  label: string
}) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const count = images.length
  const step = (d: number) => onIndex((index + d + count) % count)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      root.style.overflow = prev
      opener?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && count > 1) onIndex((index + 1) % count)
      else if (e.key === 'ArrowLeft' && count > 1) onIndex((index - 1 + count) % count)
      else if (e.key === 'Tab') {
        // keep focus inside the popup
        const nodes = [...document.querySelectorAll<HTMLElement>('[data-lightbox] button')]
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, count, onIndex, onClose])

  const navBtn =
    'grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-[background-color,border-color,transform] duration-200 hover:border-leaf-400/60 hover:bg-leaf/25 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-400'

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {/* backdrop */}
          <div aria-hidden onClick={onClose} className="absolute inset-0 cursor-zoom-out bg-forest-950/85 backdrop-blur-xl" />

          <motion.figure
            className="relative z-10 w-full max-w-6xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
            transition={reduce ? { duration: 0.2 } : { type: 'spring', stiffness: 260, damping: 28 }}
          >
            <div className="relative aspect-[1600/724] overflow-hidden rounded-2xl bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15 sm:rounded-3xl">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={images[index].src}
                  src={images[index].src}
                  alt={images[index].alt}
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <p className="font-mono text-xs tracking-widest text-white/60" aria-live="polite">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </p>
              {count > 1 && (
                <div className="flex items-center gap-2">
                  {images.map((im, i) => (
                    <button
                      key={im.src}
                      type="button"
                      aria-label={`Slide ${i + 1} of ${count}`}
                      aria-current={i === index}
                      onClick={() => onIndex(i)}
                      className={cn(
                        'h-1.5 rounded-full transition-[width,background-color] duration-300',
                        i === index ? 'w-10 bg-leaf-400' : 'w-4 bg-white/25 hover:bg-white/50',
                      )}
                    />
                  ))}
                </div>
              )}
            </figcaption>

            {count > 1 && (
              <>
                <button type="button" aria-label="Previous image" onClick={() => step(-1)} className={cn(navBtn, 'absolute top-[calc(50%-1.5rem)] left-2 -translate-y-1/2 sm:-left-6')}>
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" aria-label="Next image" onClick={() => step(1)} className={cn(navBtn, 'absolute top-[calc(50%-1.5rem)] right-2 -translate-y-1/2 sm:-right-6')}>
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </motion.figure>

          <button ref={closeRef} type="button" aria-label="Close" onClick={onClose} className={cn(navBtn, 'absolute top-4 right-4 z-20 sm:top-6 sm:right-6')}>
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
