import type { ReactNode } from 'react'
import { InView } from '@/components/ui/in-view'

/**
 * Section entrance — Motion Primitives `InView` (recipe: motion-primitives-in-view).
 * Fade + slide-up + de-blur once the element enters the viewport. MotionConfig(reducedMotion="user")
 * at the app root drops the transform for users who prefer reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'section' | 'article' | 'figure' | 'p'
}) {
  return (
    <InView
      as={as}
      once
      className={className}
      viewOptions={{ margin: '0px 0px -12% 0px', once: true }}
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </InView>
  )
}
