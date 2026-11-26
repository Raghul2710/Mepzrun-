import { useRef } from 'react'
import { useInView } from 'motion/react'
import { TextEffect } from '@/components/ui/text-effect'
import { cn } from '@/lib/utils'

/**
 * Section heading — Motion Primitives `TextEffect` (recipe: motion-primitives-text-effect),
 * per-word fade-in-blur triggered on viewport entry.
 * A visually-hidden-but-present <h2> keeps the semantic heading in the document at all times and
 * reserves the layout box, so the animated copy never causes layout shift.
 */
export function SectionHeading({
  children,
  eyebrow,
  className,
  eyebrowClassName,
  as = 'h2',
  id,
}: {
  children: string
  eyebrow?: string
  className?: string
  eyebrowClassName?: string
  as?: 'h1' | 'h2'
  id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const Tag = as

  return (
    <div ref={ref}>
      {eyebrow && (
        <p className={cn('eyebrow mb-5 text-leaf-400', eyebrowClassName)}>
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
      )}
      <div className="grid">
        <Tag id={id} className={cn('headline [grid-area:1/1] opacity-0', className)}>
          {children}
        </Tag>
        <div aria-hidden className="[grid-area:1/1]">
          <TextEffect
            as="span"
            per="word"
            preset="fade-in-blur"
            speedReveal={1.1}
            speedSegment={0.6}
            trigger={inView}
            className={cn('headline block', className)}
          >
            {children}
          </TextEffect>
        </div>
      </div>
    </div>
  )
}
