import { useEffect } from 'react'
import { ToneProvider, type Tone } from '@/theme'
import { markPageReady, useBooted } from '@/lib/boot'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/sections/Hero'
import { RunFilm } from '@/components/sections/RunFilm'
import { Statement } from '@/components/sections/Statement'
import { About } from '@/components/sections/About'
import { Prizes } from '@/components/sections/Prizes'
import { Tshirts } from '@/components/sections/Tshirts'
import { Memories } from '@/components/sections/Memories'
import { Sponsors } from '@/components/sections/Sponsors'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'
import { FinalCta } from '@/components/sections/FinalCta'

export function HomePage({ tone = 'mixed' }: { tone?: Tone }) {
  const booted = useBooted()
  useEffect(markPageReady, [])
  return (
    <ToneProvider value={tone}>
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-navy-950">
        Skip to content
      </a>
      <Navbar page="home" />
      <main id="content">
        {/* Remounts when the preloader lifts so the hero entrance plays in view. */}
        <Hero key={booted ? 'live' : 'boot'} />
        <RunFilm />
        <Statement />
        <About />
        <Prizes />
        <Tshirts />
        <Memories />
        <Sponsors />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer page="home" />
    </ToneProvider>
  )
}
