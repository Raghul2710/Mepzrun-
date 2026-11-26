import { useSyncExternalStore } from 'react'

/**
 * Boot state shared by the logo preloader and the page.
 * - `pageReady`: the lazily loaded page has mounted (its chunk arrived).
 * - `booted`: the preloader has started lifting; the hero replays its entrance from here.
 */
const state = { pageReady: false, booted: false }
const subs = new Set<() => void>()
const emit = () => subs.forEach((f) => f())
const subscribe = (cb: () => void) => {
  subs.add(cb)
  return () => subs.delete(cb)
}

export function markPageReady() {
  if (state.pageReady) return
  state.pageReady = true
  emit()
}

export function markBooted() {
  if (state.booted) return
  state.booted = true
  emit()
}

export const usePageReady = () => useSyncExternalStore(subscribe, () => state.pageReady)
export const useBooted = () => useSyncExternalStore(subscribe, () => state.booted)
