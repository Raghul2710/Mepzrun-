import { useEffect, useState, type Key } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { BorderBeam } from '@/components/ui/border-beam'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { notes, prizes } from '@/content/site'
import { cn } from '@/lib/utils'
import { PRIZE_TAB_EVENT } from '@/lib/prize-tab'

const EASE = [0.22, 1, 0.36, 1] as const

const places = [
  { key: 'first', label: '1st', tone: 'bg-amber', text: 'text-amber-300' },
  { key: 'second', label: '2nd', tone: 'bg-silver', text: 'text-silver' },
  { key: 'third', label: '3rd', tone: 'bg-bronze', text: 'text-bronze' },
] as const

function Rupees({ value, k }: { value: number; k: string }) {
  return (
    <>
      <span className="sr-only">₹{value.toLocaleString('en-IN')}</span>
      <span aria-hidden className="inline-flex items-baseline gap-0.5 tabular-nums">
        <span className="text-[0.7em] opacity-60">₹</span>
        <NumberTicker key={k} value={value} startValue={Math.round(value * 0.6)} locale="en-IN" stiffness={180} damping={28} className="tracking-tight text-inherit" />
      </span>
    </>
  )
}

/**
 * Evidence chapter — Prize Amount.
 * Tabs: Motion shared-layout pill. Figures: Magic UI NumberTicker (re-counts per distance).
 * Card: Magic UI BorderBeam. Notes: Motion Primitives Accordion.
 */
export function Prizes() {
  const [tab, setTab] = useState(prizes[0].id)
  const [notesOpen, setNotesOpen] = useState<Key | null>(null)
  const current = prizes.find((p) => p.id === tab)!

  useEffect(() => {
    const onTab = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (prizes.some((p) => p.id === id)) setTab(id)
    }
    window.addEventListener(PRIZE_TAB_EVENT, onTab)
    return () => window.removeEventListener(PRIZE_TAB_EVENT, onTab)
  }, [])

  return (
    <section id="prizes" aria-labelledby="prizes-title" className="grain section-y relative isolate overflow-clip bg-forest-900 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-leaf/50 to-transparent" />
        <div className="absolute -bottom-40 -left-20 size-[30rem] rounded-full bg-leaf/15 blur-[120px]" />
        <div className="absolute top-20 right-0 size-[26rem] rounded-full bg-amber/10 blur-[120px]" />
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="prizes-title"
            eyebrow="Half Marathon · 10KM · 5KM"
            eyebrowClassName="text-leaf-400"
            className="text-[clamp(2.25rem,7vw,6rem)] text-white"
          >
            Prize Amount
          </SectionHeading>

          <Reveal delay={0.1}>
            <LayoutGroup id="prize-tabs">
              <div role="tablist" aria-label="Race distance" className="inline-flex rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur">
                {prizes.map((p) => (
                  <button
                    key={p.id}
                    role="tab"
                    id={`tab-${p.id}`}
                    aria-selected={tab === p.id}
                    aria-controls={`panel-${p.id}`}
                    type="button"
                    onClick={() => setTab(p.id)}
                    className={cn(
                      'relative rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-300 sm:px-6',
                      tab === p.id ? 'text-forest-950' : 'text-white/70 hover:text-white',
                    )}
                  >
                    {tab === p.id && (
                      <motion.span
                        layoutId="prize-pill"
                        className="absolute inset-0 rounded-full bg-leaf-400"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{p.label}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Prize table */}
          <Reveal className="self-start lg:sticky lg:top-28 lg:col-span-8">
            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur">
              <BorderBeam colorFrom="#7ed348" colorTo="#f5a524" duration={9} size={140} className="motion-reduce:hidden" />

              {/* Distance watermark */}
              <div aria-hidden className="pointer-events-none absolute -top-6 right-4 overflow-hidden sm:right-8">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={current.short}
                    initial={{ y: '60%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-60%', opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="headline block text-[7rem] text-white/[0.05] sm:text-[10rem]"
                  >
                    {current.short}
                  </motion.span>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  id={`panel-${current.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${current.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative p-5 sm:p-8 lg:p-10"
                >
                  <p className="headline-cond text-3xl text-white sm:text-4xl">{current.label}</p>

                  {/* sm+ : real table */}
                  <table className="mt-8 hidden w-full border-collapse text-left sm:table">
                    <caption className="sr-only">Prize Amount — {current.label}</caption>
                    <thead>
                      <tr className="border-b border-white/10 text-xs tracking-[0.18em] text-white/50 uppercase">
                        <th scope="col" className="py-3 pr-4 font-semibold">Categories</th>
                        {places.map((pl) => (
                          <th key={pl.key} scope="col" className="py-3 pl-4 text-right font-semibold">
                            <span className="inline-flex items-center gap-2">
                              <span aria-hidden className={cn('size-2.5 rounded-full', pl.tone)} />
                              {pl.label}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {current.rows.map((r, i) => (
                        <motion.tr
                          key={r.category}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.45, ease: EASE, delay: 0.05 * i }}
                          className="group border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.04]"
                        >
                          <th scope="row" className="py-4 pr-4 font-medium text-white/85">{r.category}</th>
                          {places.map((pl) => (
                            <td key={pl.key} className={cn('headline-cond py-4 pl-4 text-right text-2xl lg:text-3xl', pl.key === 'first' ? 'text-amber-300' : 'text-white')}>
                              <Rupees value={r[pl.key]} k={`${current.id}-${i}-${pl.key}`} />
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>

                  {/* mobile: stacked rows */}
                  <ul className="mt-6 space-y-3 sm:hidden">
                    {current.rows.map((r, i) => (
                      <li key={r.category} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-sm font-semibold text-white/85">{r.category}</p>
                        <dl className="mt-3 grid grid-cols-3 gap-2">
                          {places.map((pl) => (
                            <div key={pl.key}>
                              <dt className="flex items-center gap-1.5 text-[0.7rem] tracking-widest text-white/50 uppercase">
                                <span aria-hidden className={cn('size-2 rounded-full', pl.tone)} />
                                {pl.label}
                              </dt>
                              <dd className={cn('headline-cond mt-1 text-xl', pl.key === 'first' ? 'text-amber-300' : 'text-white')}>
                                <Rupees value={r[pl.key]} k={`m-${current.id}-${i}-${pl.key}`} />
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Notes to participants */}
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <h3 className="headline-cond text-3xl leading-[0.95] text-white sm:text-4xl">{notes.title}</h3>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <Accordion
                expandedValue={notesOpen}
                onValueChange={setNotesOpen}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04]"
              >
                <AccordionItem value="notes">
                  <AccordionTrigger className="flex w-full items-center justify-between gap-4 p-6 text-left text-lg font-semibold text-white transition-colors hover:bg-white/[0.04]">
                    {notes.toggle}
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-leaf-400 text-forest-950 transition-transform duration-300 group-data-[expanded]:rotate-45">
                      <Plus className="size-4" strokeWidth={3} />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden">
                    <div className="space-y-5 px-6 pb-7 text-base leading-[1.7] text-white/75">
                      <p>{notes.intro}</p>
                      {notes.groups.map((g) => (
                        <div key={g.heading}>
                          <p className="font-semibold text-leaf-300">{g.heading}</p>
                          <ul className="mt-2 space-y-2">
                            {g.items.map((it) => (
                              <li key={it} className="relative pl-4 before:absolute before:top-[0.6em] before:left-0 before:size-1.5 before:rounded-full before:bg-leaf-400">
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div>
                        <p className="font-semibold text-leaf-300">{notes.ageHeading}</p>
                        <p className="mt-2">{notes.ageIntro}</p>
                        <ul className="mt-3 grid gap-1.5">
                          {notes.ageCategories.map((a) => (
                            <li key={a} className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-sm">{a}</li>
                          ))}
                        </ul>
                      </div>
                      {notes.closing.map((c) => (
                        <p key={c}>{c}</p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
