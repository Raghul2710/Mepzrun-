import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

/** Local extension: scroll highlight — words flash `active`, settle to `settle`, with an optional marker sweep. */
export interface TextRevealHighlight {
  active: string
  settle: string
  /** Classes for the marker bar that sweeps in behind each revealed word. */
  markerClassName?: string
  /** Words (matched case-insensitively, punctuation ignored) that keep the active colour. */
  keep?: string[]
}

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  /** Local extension: classes for the word line (type + ghost colour). */
  textClassName?: string
  /** Local extension: classes for the revealed words. */
  wordClassName?: string
  /** Local extension: green scroll highlight. */
  highlight?: TextRevealHighlight
}

export const TextReveal: FC<TextRevealProps> = ({ children, className, textClassName, wordClassName, highlight }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")
  const norm = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "")
  const keep = new Set((highlight?.keep ?? []).map(norm))

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          // Mobile: a viewport-sized pin (text centred, small tail) so the next section follows sooner.
          "sticky top-[20svh] mx-auto flex h-[60svh] max-w-4xl items-center bg-transparent px-4 lg:top-0 lg:h-[50%] lg:py-20"
        }
      >
        <span
          className={cn(
            "flex flex-wrap p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20",
            textClassName
          )}
        >
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                className={wordClassName}
                highlight={highlight}
                kept={keep.has(norm(word))}
              >
                {word}
              </Word>
            )
          })}
        </span>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  className?: string
  progress: MotionValue<number>
  range: [number, number]
  highlight?: TextRevealHighlight
  kept?: boolean
}

const Word: FC<WordProps> = ({ children, progress, range, className, highlight, kept }) => {
  const opacity = useTransform(progress, range, [0, 1])
  const span = range[1] - range[0]
  // Active while revealing, then eases to the settle colour over the next ~1.5 words.
  const color = useTransform(
    progress,
    [range[0], range[1], range[1] + span * 1.5],
    highlight ? [highlight.active, highlight.active, kept ? highlight.active : highlight.settle] : ["", "", ""]
  )
  const marker = useTransform(progress, [range[0], range[1]], [0, 1])
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      {highlight?.markerClassName && (
        <motion.span
          aria-hidden
          style={{ scaleX: marker }}
          className={cn("pointer-events-none absolute inset-x-[-0.08em] bottom-[0.08em] -z-10 h-[0.32em] origin-left rounded-[0.08em]", highlight.markerClassName)}
        />
      )}
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={highlight ? { opacity, color } : { opacity }}
        className={cn("text-black dark:text-white", className)}
      >
        {children}
      </motion.span>
    </span>
  )
}
