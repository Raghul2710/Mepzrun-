import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AccordionGallery from '@/components/AccordionGallery'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Marquee } from '@/components/ui/marquee'
import { archiveBanners, memories } from '@/content/site'

function useNarrow(query = '(max-width: 639px)') {
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setNarrow(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return narrow
}

type Slide = { image: string; label: string; alt: string }

/**
 * Phone slider: native swipe + scroll-snap, next photo peeks in, centred photo is full colour.
 * Dots use a Motion shared-layout pill; arrow buttons are 44px touch targets.
 */
function MobileSlider({ items }: { items: Slide[] }) {
  const reduce = useReducedMotion()
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = useCallback(() => {
    const el = track.current
    if (!el) return
    const slides = [...el.children] as HTMLElement[]
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let dist = Infinity
    slides.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    setActive(best)
  }, [])

  const go = (i: number) => {
    const el = track.current
    const target = el?.children[Math.max(0, Math.min(items.length - 1, i))] as HTMLElement | undefined
    if (!el || !target) return
    el.scrollTo({ left: target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={memories.title}>
      <ul
        ref={track}
        onScroll={onScroll}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <li
            key={it.image}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className={`relative aspect-[4/5] w-[82%] shrink-0 snap-center overflow-hidden rounded-[1.5rem] ring-1 ring-white/10 transition-[transform,opacity,filter] duration-500 ease-out motion-reduce:transition-none ${i === active ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-55 saturate-50'}`}
          >
            <img src={it.image} alt={it.alt} loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-forest-950/85 via-forest-950/30 to-transparent px-5 pt-16 pb-5">
              <span className="h-6 w-[3px] rounded-full bg-leaf-400 shadow-[0_0_12px_rgba(126,211,72,0.7)]" />
              <span className="font-semibold text-white">{it.label}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Choose photo">
          {items.map((it, i) => (
            <button
              key={it.image}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Photo ${i + 1}`}
              onClick={() => go(i)}
              className={`relative h-2 rounded-full bg-white/20 transition-[width] duration-300 ${i === active ? 'w-7' : 'w-2'}`}
            >
              {i === active && <motion.span layoutId="mem-dot" className="absolute inset-0 rounded-full bg-leaf-400" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Previous photo" onClick={() => go(active - 1)} disabled={active === 0} className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition-colors active:scale-95 disabled:opacity-35">
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" aria-label="Next photo" onClick={() => go(active + 1)} disabled={active === items.length - 1} className="grid size-11 place-items-center rounded-full border border-leaf-400/40 bg-leaf-400/15 text-white backdrop-blur transition-colors active:scale-95 disabled:opacity-35">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Showcase chapter — Ever-Green Memories.
 * React Bits AccordionGallery: the active photo expands in colour with parallax while the rest stay
 * slim, tilted and desaturated; hover, focus or arrow keys move through all nine. Phones get a swipe slider.
 * Earlier campaign banners follow in a Magic UI Marquee.
 */
export function Memories() {
  const narrow = useNarrow()
  const items = memories.images.map((src, i) => ({
    image: src,
    label: memories.title,
    alt: `MEPZ Run — ${memories.title.toLowerCase()} photo ${i + 1}`,
  }))

  return (
    <section id="memories" aria-labelledby="memories-title" className="grain section-y relative isolate overflow-hidden bg-forest-900 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-800 to-forest-900" />
        <div className="absolute top-1/4 -left-40 size-[34rem] rounded-full bg-leaf/25 blur-[140px]" />
        <div className="absolute right-0 bottom-1/4 size-[28rem] rounded-full bg-amber/10 blur-[120px]" />
      </div>

      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeading id="memories-title" eyebrow="#LetsGoGreen" eyebrowClassName="text-leaf-300" className="text-[clamp(2.1rem,5.4vw,4.75rem)] text-white">
              {memories.title}
            </SectionHeading>
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-lg leading-[1.7] text-white/75 sm:text-xl">{memories.body}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14 lg:mt-16">
          {narrow ? (
            <MobileSlider items={items} />
          ) : (
            <AccordionGallery
              key={narrow ? 'v' : 'h'}
              items={items}
              defaultIndex={0}
              orientation={narrow ? 'vertical' : 'horizontal'}
              height={narrow ? 560 : 560}
              gap={narrow ? 8 : 12}
              radius={22}
              expandRatio={narrow ? 0.42 : 0.5}
              duration={0.7}
              parallax={0.6}
              tilt={narrow ? 0 : 6}
              accentColor="#7ed348"
              overlayColor="#03100a"
              grayscale
              className="[&_[role=listitem]]:ring-1 [&_[role=listitem]]:ring-white/10"
            />
          )}
        </Reveal>
      </div>

      {/* Campaign archive (second slider on the original home page) */}
      <div className="relative mt-24 lg:mt-32" role="region" aria-label="MEPZ Run campaign banners">
        <Marquee pauseOnHover repeat={2} className="[--duration:70s] [--gap:1.25rem]">
          {archiveBanners.map((b) => (
            <figure key={b.src} className="w-[18rem] shrink-0 overflow-hidden rounded-2xl bg-white shadow-xl shadow-black/30 ring-1 ring-white/10 sm:w-[26rem]">
              <img src={b.src} alt={b.alt} loading="lazy" decoding="async" className="aspect-[1600/985] w-full object-cover" />
            </figure>
          ))}
        </Marquee>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-forest-900 to-transparent sm:w-40" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-forest-900 to-transparent sm:w-40" />
      </div>
    </section>
  )
}
