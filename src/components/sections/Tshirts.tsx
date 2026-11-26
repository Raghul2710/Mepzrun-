import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { FocusCards } from '@/components/ui/focus-cards'
import { tshirts } from '@/content/site'
import { cn } from '@/lib/utils'
import { useTone } from '@/theme'

/**
 * Showcase chapter — T-Shirt Distribution.
 * Aceternity UI Focus Cards arranged as a bento: the hovered/focused photo stays sharp while siblings soften.
 */
export function Tshirts() {
  const { t } = useTone()
  const cards = tshirts.images.map((src, i) => ({
    src,
    title: tshirts.title,
    alt: `MEPZ Run ${tshirts.title.toLowerCase()} — photo ${i + 1}`,
  }))

  return (
    <section id="tshirts" aria-labelledby="tshirts-title" className={t('section-y relative isolate overflow-hidden bg-white text-forest-950', 'section-y relative isolate overflow-hidden bg-forest-950 text-white')}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className={t('absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-forest-950/10 to-transparent', 'absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-leaf/40 to-transparent')} />
        <div className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-leaf/10 blur-[140px]" />
      </div>
      <div className="container-x">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-10">
            <SectionHeading id="tshirts-title" className={t('text-[clamp(2.25rem,7vw,6rem)] text-forest-950', 'text-[clamp(2.25rem,7vw,6rem)] text-white')}>
              {tshirts.title}
            </SectionHeading>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <FocusCards
            cards={cards}
            className="max-w-none auto-rows-[11rem] grid-cols-2 gap-3 px-0 sm:auto-rows-[15rem] sm:gap-4 md:px-0 lg:auto-rows-[17rem] lg:grid-cols-3 lg:gap-5"
            cardClassName={(i) =>
              cn(
                'h-full rounded-[1.25rem] md:h-full outline-offset-4',
                i === 0 && 'col-span-2 row-span-2 lg:col-span-2',
                i === tshirts.images.length - 1 && 'col-span-2 lg:col-span-1',
              )
            }
          />
        </Reveal>
      </div>
    </section>
  )
}
