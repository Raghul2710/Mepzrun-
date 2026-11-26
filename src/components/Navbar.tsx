import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { logo, nav } from '@/content/site'
import { RegisterButton } from '@/components/RegisterButton'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Sticky navigation.
 * - Hover/active pill: Motion shared layout animation (recipe: motion-examples-react-shared-layout-animation).
 * - Compact + hide-on-scroll-down header: Motion useScroll/useMotionValueEvent (recipe: motion-examples-react-scroll-hide-header).
 * - Mobile sheet: Motion AnimatePresence with staggered links.
 */
export function Navbar({ page = 'home' }: { page?: 'home' | 'terms' }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [active, setActive] = useState<string>(page === 'terms' ? 'terms' : 'top')

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 640 && y > prev + 4 && !open)
    if (y < prev - 4) setHidden(false)
  })

  // Scroll-spy for in-page anchors on the home page.
  useEffect(() => {
    if (page !== 'home') return
    const ids = nav.filter((n) => n.id !== 'terms').map((n) => n.id)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [page])

  // Lock scroll + close on Escape while the mobile sheet is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const hrefFor = (href: string) => (page === 'home' && href.startsWith('/#') ? href.slice(1) : href)
  const pillId = hovered ?? active

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.35, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            'transition-[background-color,backdrop-filter,box-shadow,padding] duration-500 ease-out',
            scrolled || open
              ? 'bg-transparent py-2'
              : 'bg-transparent py-4',
          )}
        >
          <nav aria-label="Header" className="container-x flex items-center justify-between gap-6">
            <a href={hrefFor('/#top')} className="relative z-10 flex shrink-0 items-center gap-3" aria-label="MEPZ Run — Home">
              <span className="grid size-14 place-items-center overflow-hidden rounded-2xl bg-white p-1 shadow-lg shadow-black/20 transition-[width,height] duration-500 sm:size-16">
                <img src={logo.sm} alt="MEPZ Run 2027 — 11th Edition" className="h-full w-full object-contain" width={64} height={64} />
              </span>
            </a>

            <LayoutGroup id="desktop-nav">
              <ul
                className="hidden items-center gap-1 rounded-full border border-white/15 bg-black/40 p-1.5 backdrop-blur-md lg:flex"
                onMouseLeave={() => setHovered(null)}
              >
                {nav.map((item) => (
                  <li key={item.id} className="relative">
                    <a
                      href={hrefFor(item.href)}
                      onMouseEnter={() => setHovered(item.id)}
                      onFocus={() => setHovered(item.id)}
                      onBlur={() => setHovered(null)}
                      aria-current={active === item.id ? (item.id === 'terms' ? 'page' : 'true') : undefined}
                      className={cn(
                        'relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                        pillId === item.id ? 'text-navy-950' : 'text-white/80 hover:text-white',
                      )}
                    >
                      {pillId === item.id && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-leaf-400"
                          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </LayoutGroup>

            <div className="flex items-center gap-3">
              <RegisterButton size="sm" className="hidden sm:flex" />
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="relative z-10 grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95 lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="track-lines fixed inset-0 z-40 flex flex-col overflow-y-auto bg-forest-950 px-6 pt-28 pb-10 lg:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-leaf/25 blur-3xl" />
            <motion.ul
              className="relative flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                  className="border-b border-white/10"
                >
                  <a
                    href={hrefFor(item.href)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-baseline gap-4 py-4 text-white transition-colors active:text-leaf-400',
                      active === item.id && 'text-leaf-400',
                    )}
                  >
                    <span className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, '0')}</span>
                    <span className="headline-cond text-4xl sm:text-5xl">{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5, ease: EASE } }}
              className="relative mt-10"
            >
              <RegisterButton size="lg" className="w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
