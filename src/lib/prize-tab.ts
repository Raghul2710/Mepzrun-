/** Fired by the hero distance chips: switches the Prize Amount table to that distance. */
export const PRIZE_TAB_EVENT = 'mepz:prize-tab'

export function showPrizeTab(id: string) {
  window.dispatchEvent(new CustomEvent<string>(PRIZE_TAB_EVENT, { detail: id }))
}
