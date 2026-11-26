import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import { Preloader } from '@/components/Preloader'

const root = document.getElementById('root')!
// Each HTML entry (/, /home2/, /terms-conditions/) only downloads the code for its own page.
// /home2/ is the same home page rendered in the all-dark tone.
const Page =
  root.dataset.page === 'terms'
    ? lazy(() => import('@/pages/TermsPage').then((m) => ({ default: m.TermsPage })))
    : root.dataset.page === 'home2'
      ? lazy(() => import('@/pages/HomePage').then((m) => ({ default: () => <m.HomePage tone="dark" /> })))
      : lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))

createRoot(root).render(
  <StrictMode>
    {/* Honour the OS "reduce motion" setting for every Motion-driven component. */}
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<div className="min-h-[100svh] bg-forest-950" />}>
        <Page />
      </Suspense>
      {/* Logo loading animation on the home pages (/ and /home2/). */}
      {root.dataset.page !== 'terms' && <Preloader />}
    </MotionConfig>
  </StrictMode>,
)
