import { ArrowUp } from 'lucide-react'
import GradientText from '@/components/GradientText'
import { footer, logo, nav } from '@/content/site'
import { useTone } from '@/theme'

export function Footer({ page = 'home' }: { page?: 'home' | 'terms' }) {
  const { t } = useTone()
  const hrefFor = (href: string) => (page === 'home' && href.startsWith('/#') ? href.slice(1) : href)
  return (
    <footer className={t('relative overflow-hidden border-t border-forest-950/10 bg-white text-forest-950', 'relative overflow-hidden border-t border-white/10 bg-forest-950 text-white')}>
      <div className="container-x pt-20 pb-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <a href={hrefFor('/#top')} className="flex items-center gap-4" aria-label="MEPZ Run — Home">
            <span className={t('grid size-28 place-items-center sm:size-32', 'grid size-24 place-items-center rounded-3xl bg-white p-1.5')}>
              <img src={logo.sm} alt="MEPZ Run 2027 — 11th Edition" loading="lazy" className="h-full w-full object-contain" />
            </span>
          </a>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={hrefFor(n.href)}
                    className={t('group/fl inline-flex items-center gap-2 font-medium text-forest-950/70 transition-colors duration-300 hover:text-forest-950', 'group/fl inline-flex items-center gap-2 font-medium text-white/70 transition-colors duration-300 hover:text-white')}
                  >
                    <span className={t('h-px w-0 bg-leaf-600 transition-[width] duration-300 ease-out group-hover/fl:w-4', 'h-px w-0 bg-leaf-400 transition-[width] duration-300 ease-out group-hover/fl:w-4')} />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* React Bits GradientText: letters filled white with a transparent stroke, so only the outline shows the moving green gradient. */}
        <p aria-hidden className="group/wm headline mt-16 whitespace-nowrap text-[clamp(3rem,13.5vw,13rem)] leading-[0.8] select-none">
          <GradientText
            colors={['#1f5212', '#5db82e', '#a6e07c', '#7ed348', '#3f951b']}
            animationSpeed={6}
            yoyo={false}
            scale={2}
            className={t('!justify-start [&>span>span:first-child]:[-webkit-text-stroke:2.5px_transparent] [&>span>span:first-child]:[-webkit-text-fill-color:#ffffff] [&>span>span:first-child]:transition-[-webkit-text-fill-color] [&>span>span:first-child]:duration-700 group-hover/wm:[&>span>span:first-child]:[-webkit-text-fill-color:#5db82e]', '!justify-start [&>span>span:first-child]:[-webkit-text-stroke:2.5px_transparent] [&>span>span:first-child]:[-webkit-text-fill-color:#03100a] [&>span>span:first-child]:transition-[-webkit-text-fill-color] [&>span>span:first-child]:duration-700 group-hover/wm:[&>span>span:first-child]:[-webkit-text-fill-color:#5db82e]')}
          >
            MEPZ RUN
          </GradientText>
        </p>

        <div className={t('mt-10 flex flex-col-reverse items-start justify-between gap-6 border-t border-forest-950/10 pt-8 sm:flex-row sm:items-center', 'mt-10 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center')}>
          <p className={t('text-sm text-forest-950/60', 'text-sm text-white/60')}>
            {footer.copyright}{' '}
            <a href={footer.maintainer.href} className={t('font-semibold text-forest-950 underline decoration-leaf-600 decoration-2 underline-offset-4 transition-colors hover:text-leaf-600', 'font-semibold text-white underline decoration-leaf/60 decoration-2 underline-offset-4 transition-colors hover:text-leaf-300')}>
              {footer.maintainer.label}
            </a>
          </p>
          <a
            href={hrefFor('/#top')}
            className={t('group/top inline-flex items-center gap-2 rounded-full border border-forest-950/15 px-4 py-2 text-sm font-medium text-forest-950/80 transition-all duration-300 hover:border-leaf-600 hover:bg-leaf/10 hover:text-forest-950', 'group/top inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-all duration-300 hover:border-leaf-400 hover:text-white')}
          >
            Back to top
            <ArrowUp className="size-4 transition-transform duration-300 group-hover/top:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
