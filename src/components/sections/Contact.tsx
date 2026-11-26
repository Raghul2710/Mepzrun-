import type { ReactNode } from 'react'
import { Mail, MapPin, Phone, Users } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { BorderBeam } from '@/components/ui/border-beam'
import { contact } from '@/content/site'
import { useTone } from '@/theme'

const LINK = {
  light: 'font-display font-semibold tracking-tight text-forest-950 underline decoration-leaf-600/60 decoration-2 underline-offset-[6px] transition-colors hover:text-leaf-600 hover:decoration-leaf-600',
  dark: 'font-display font-semibold tracking-tight text-white underline decoration-leaf-400/50 decoration-2 underline-offset-[6px] transition-colors hover:text-leaf-300 hover:decoration-leaf-300',
}

const GLASS = {
  light: 'rounded-2xl border border-forest-950/10 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_40px_-26px_rgba(3,16,10,0.35)] backdrop-blur-xl',
  dark: 'rounded-2xl border border-white/10 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl',
}

function Tile({ icon, children, delay }: { icon: ReactNode; children: ReactNode; delay: number }) {
  const { dark, t } = useTone()
  const glass = dark ? GLASS.dark : GLASS.light
  return (
    <Reveal delay={delay}>
      <div className={`${glass} group flex gap-4 p-5 transition-colors duration-300 ${t('hover:border-leaf-600/40 hover:bg-white', 'hover:border-leaf-400/30 hover:bg-white/[0.07]')}`}>
        <span
          aria-hidden
          className={t('grid size-11 shrink-0 place-items-center rounded-xl bg-leaf/15 text-leaf-600 ring-1 ring-leaf-600/25 transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100', 'grid size-11 shrink-0 place-items-center rounded-xl bg-leaf/15 text-leaf-300 ring-1 ring-leaf-400/25 transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100')}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1 self-center">{children}</div>
      </div>
    </Reveal>
  )
}

function Label({ children }: { children: ReactNode }) {
  const { t } = useTone()
  return <span className={t('block text-[0.72rem] font-semibold tracking-[0.18em] text-forest-950/55 uppercase', 'block text-[0.72rem] font-semibold tracking-[0.18em] text-white/50 uppercase')}>{children}</span>
}

/**
 * Conversion chapter — Event Location + Contact, in frosted glass.
 * Details sit on glass tiles (display-font values); the existing Zoho form and Google Map are
 * unchanged services in light glass frames.
 * Magic UI BorderBeam traces the form card.
 */
export function Contact() {
  const { dark, t } = useTone()
  const linkCls = dark ? LINK.dark : LINK.light
  const glass = dark ? GLASS.dark : GLASS.light
  return (
    <section id="contact" aria-labelledby="contact-title" className={t('section-y relative isolate overflow-hidden bg-white text-forest-950', 'grain section-y relative isolate overflow-hidden bg-forest-950 text-white')}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className={t('absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-forest-950/10 to-transparent', 'absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-leaf/40 to-transparent')} />
        <div className={t('absolute -top-32 right-1/4 size-[32rem] rounded-full bg-leaf/15 blur-[140px]', 'absolute -top-32 right-1/4 size-[32rem] rounded-full bg-leaf/20 blur-[140px]')} />
        <div className={t('absolute bottom-0 -left-20 size-[26rem] rounded-full bg-leaf-300/20 blur-[120px]', 'absolute bottom-0 -left-20 size-[26rem] rounded-full bg-leaf-600/15 blur-[120px]')} />
        <div className="absolute right-0 bottom-1/4 size-[20rem] rounded-full bg-amber/10 blur-[120px]" />
      </div>

      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" eyebrow="Contact" eyebrowClassName={t('text-leaf-600', 'text-leaf-400')} className={t('text-[clamp(2.25rem,4.6vw,4.75rem)] text-forest-950', 'text-[clamp(2.25rem,4.6vw,4.75rem)] text-white')}>
            {contact.title}
          </SectionHeading>

          <address className="mt-10 space-y-3 not-italic">
            <Tile delay={0.05} icon={<MapPin className="size-5" />}>
              <span className={t('font-display text-lg leading-snug font-medium tracking-tight text-forest-950 sm:text-xl', 'font-display text-lg leading-snug font-medium tracking-tight text-white sm:text-xl')}>
                {contact.addressLines[0]}
                <br />
                {contact.addressLines[1]}
              </span>
            </Tile>
            <Tile delay={0.1} icon={<Mail className="size-5" />}>
              <Label>Email :</Label>
              <a href={`mailto:${contact.email}`} className={`${linkCls} mt-1 inline-block text-lg break-all sm:text-xl`}>
                {contact.email}
              </a>
            </Tile>
            <Tile delay={0.15} icon={<Phone className="size-5" />}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label>Tel :</Label>
                  <a href={contact.tel.href} className={`${linkCls} mt-1 inline-block text-lg whitespace-nowrap`}>
                    {contact.tel.label}
                  </a>
                </div>
                <div>
                  <Label>PH :</Label>
                  <a href={contact.phone.href} className={`${linkCls} mt-1 inline-block text-lg whitespace-nowrap`}>
                    {contact.phone.label}
                  </a>
                </div>
              </div>
            </Tile>
            <Tile delay={0.2} icon={<Users className="size-5" />}>
              <p className={t('text-base leading-relaxed text-forest-950/70', 'text-base leading-relaxed text-white/75')}>
                {contact.bulkText}{' '}
                <a href={`mailto:${contact.bulkEmail}`} className={`${linkCls} text-base`}>
                  {contact.bulkEmail}
                </a>
              </p>
            </Tile>
          </address>
        </div>

        <div className="space-y-5 lg:col-span-7">
          <Reveal delay={0.15}>
            <div className={`${glass} relative overflow-hidden rounded-[var(--radius-card)] p-2 sm:p-3`}>
              <BorderBeam colorFrom="#7ed348" colorTo="#f5a524" duration={10} size={160} borderWidth={1.5} className="motion-reduce:hidden" />
              {/* Zoho form in dark mode: invert + hue-rotate keeps hues; screen blend lets the glass show through */}
              <iframe
                aria-label="Mepzrun"
                title="Mepzrun"
                src={contact.formSrc}
                className={t('block h-[540px] w-full rounded-[1.25rem] border-0 bg-white sm:h-[420px]', 'block h-[540px] w-full rounded-[1.25rem] border-0 [filter:invert(1)_hue-rotate(180deg)_saturate(1.1)] mix-blend-screen sm:h-[420px]')}
              />
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className={`${glass} overflow-hidden rounded-[var(--radius-card)] p-2`}>
              <iframe
                loading="lazy"
                src={contact.mapSrc}
                title={contact.mapTitle}
                aria-label={contact.mapTitle}
                className={t('block h-[300px] w-full rounded-[1.25rem] border-0 sm:h-[340px]', 'block h-[300px] w-full rounded-[1.25rem] border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.7)_brightness(0.95)] transition-[filter] duration-500 hover:[filter:none] sm:h-[340px]')}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
