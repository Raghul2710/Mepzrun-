import { useState, type Key } from 'react'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqs } from '@/content/site'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Process chapter — FAQ, as a numbered chapter rail.
 * Motion Primitives Accordion (one open at a time; first open by default, as on the original page).
 */
export function Faq() {
  const [open, setOpen] = useState<Key | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative isolate overflow-clip bg-forest-900 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-40 -left-32 size-[30rem] rounded-full bg-leaf/10 blur-[140px]" />
      </div>
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="faq-title" eyebrow="FaQ" className="text-[clamp(2rem,3.2vw,3.25rem)] leading-[0.95] text-white">
              Frequently Asked Questions
            </SectionHeading>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Accordion
            expandedValue={open}
            onValueChange={setOpen}
            transition={{ duration: 0.4, ease: EASE }}
            className="border-t border-white/10"
          >
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={Math.min(i, 5) * 0.05}>
                <AccordionItem value={i} className="border-b border-white/10">
                  <AccordionTrigger className="grid w-full grid-cols-[1fr_2.25rem] items-start gap-x-4 py-6 text-left sm:gap-x-6 sm:py-7">
                    <span
                      className={cn(
                        'text-lg leading-snug font-semibold text-white transition-colors duration-300 group-hover:text-leaf-300 sm:text-xl',
                      )}
                    >
                      {f.q}
                    </span>
                    <span className="-mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-leaf-400 group-hover:bg-leaf/15 group-data-[expanded]:rotate-45 group-data-[expanded]:border-leaf-400 group-data-[expanded]:bg-leaf-400 group-data-[expanded]:text-forest-950">
                      <Plus className="size-4" strokeWidth={2.5} />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden">
                    <div className="grid grid-cols-[1fr_2.25rem] gap-x-4 pb-7 sm:gap-x-6">
                    <div className="col-start-1 space-y-3 text-base leading-[1.7] text-white/75 sm:text-[1.05rem]">
                      {f.a.map((part, j) =>
                        typeof part === 'string' ? (
                          <p key={j}>{part}</p>
                        ) : (
                          <ul key={j} className="space-y-2">
                            {part.list.map((li) => (
                              <li key={li} className="relative pl-4 before:absolute before:top-[0.62em] before:left-0 before:size-1.5 before:rounded-full before:bg-leaf-400">
                                {li}
                              </li>
                            ))}
                          </ul>
                        ),
                      )}
                    </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
