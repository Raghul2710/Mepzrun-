import { useEffect, useMemo, useState } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import termsHtml from '@/content/terms.html?raw'
import SplitText from '@/components/SplitText'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { RegisterButton } from '@/components/RegisterButton'
import { cn } from '@/lib/utils'

/** Split the verbatim Terms HTML into chapters at each heading so it can be navigated. */
function useChapters() {
  return useMemo(() => {
    const parts = termsHtml.split(/(?=<h3>)/g).filter((p) => p.trim())
    return parts.map((html, i) => {
      const title = (html.match(/<h3>([\s\S]*?)<\/h3>/)?.[1] ?? `Section ${i + 1}`)
        .replace(/&amp;/g, '&')
        .replace(/<[^>]+>/g, '')
        .trim()
      const id = title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return { id, title, html }
    })
  }, [])
}

export function TermsPage() {
  const chapters = useChapters()
  const [active, setActive] = useState(chapters[0]?.id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    )
    chapters.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [chapters])

  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-navy-950">
        Skip to content
      </a>
      <Navbar page="terms" />
      <main id="content">
        <header className="grain track-lines relative isolate overflow-hidden bg-forest-950 pt-40 pb-20 text-white sm:pb-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 -left-32 size-[30rem] rounded-full bg-leaf/20 blur-[120px]" />
            <div className="absolute -right-20 bottom-0 size-[24rem] rounded-full bg-leaf/25 blur-[120px]" />
          </div>
          <div className="container-x">
            <h1 className="headline text-[clamp(2.25rem,9vw,8rem)]">
              <SplitText text="Terms & Conditions" tag="span" splitType="words, chars" effect="rise" mask trigger="load" delay={30} duration={0.9} textAlign="left" className="!block" />
            </h1>
          </div>
        </header>

        <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <aside className="lg:col-span-3">
            <nav aria-label="On this page" className="lg:sticky lg:top-28">
              <p className="eyebrow mb-4 text-leaf-600">
                <span aria-hidden className="h-px w-8 bg-current" />
                On this page
              </p>
              <LayoutGroup id="toc">
                <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                  {chapters.map((c) => (
                    <li key={c.id} className="shrink-0">
                      <a
                        href={`#${c.id}`}
                        aria-current={active === c.id ? 'location' : undefined}
                        className={cn(
                          'relative block rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 lg:rounded-xl lg:whitespace-normal',
                          active === c.id ? 'text-navy-950' : 'text-ink/60 hover:text-navy-900',
                        )}
                      >
                        {active === c.id && (
                          <motion.span layoutId="toc-pill" className="absolute inset-0 -z-0 rounded-[inherit] bg-leaf/20 ring-1 ring-leaf/40" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />
                        )}
                        <span className="relative">{c.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </LayoutGroup>
              <div className="mt-8 hidden lg:block">
                <RegisterButton size="sm" />
              </div>
            </nav>
          </aside>

          <article className="prose-terms max-w-3xl lg:col-span-8 lg:col-start-5">
            {chapters.map((c, i) => (
              <Reveal key={c.id} delay={i === 0 ? 0.1 : 0} y={24}>
                <section id={c.id} dangerouslySetInnerHTML={{ __html: c.html }} />
              </Reveal>
            ))}
          </article>
        </div>
      </main>
      <Footer page="terms" />
    </>
  )
}
