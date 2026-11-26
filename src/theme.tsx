import { createContext, useContext } from 'react'

/**
 * Page tone. "mixed" (home, /) alternates dark and white chapters; "dark" (/home2/) keeps every
 * chapter in the original dark forest tone. Sections that changed to white read this to pick classes.
 */
export type Tone = 'mixed' | 'dark'

const ToneContext = createContext<Tone>('mixed')
export const ToneProvider = ToneContext.Provider

/** `t(light, dark)` returns the class string for the current page tone. */
export function useTone() {
  const tone = useContext(ToneContext)
  const dark = tone === 'dark'
  return { dark, t: (light: string, darkCls: string) => (dark ? darkCls : light) }
}
