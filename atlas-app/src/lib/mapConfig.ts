/**
 * Maps world-atlas ISO 3166-1 numeric IDs to our internal country IDs.
 *
 * Only countries that actually exist in `data/countries.ts` are listed here;
 * anything else simply renders as inactive land.
 */
export const isoNumericToCountryId: Record<string, string> = {
  '250': 'fr-france',
  '380': 'it-italy',
  '392': 'jp-japan',
  '484': 'mx-mexico',
  '616': 'pl-poland',
  '710': 'za-south-africa',
  '840': 'us-united-states',
}

export const mapProjection = {
  scale: 147,
  center: [0, 20] as [number, number],
}

/** The set of colours the map needs for a single render pass. */
export interface MapPalette {
  /** Land for countries that are not part of the atlas. */
  landFill: string
  /** Hover highlight. */
  landHoverFill: string
  /** Selected-country highlight. */
  landSelectedFill: string
  /** Country outline. */
  stroke: string
  /** Countries present in the atlas but not selected/hovered/visited. */
  activeFill: string
  /** Countries the user has marked as visited. */
  visitedFill: string
}

const lightPalette: MapPalette = {
  landFill: '#cbd5e1',
  landHoverFill: '#a855f7',
  landSelectedFill: '#7c3aed',
  stroke: '#ffffff',
  activeFill: '#6366f1',
  visitedFill: '#16a34a',
}

const darkPalette: MapPalette = {
  landFill: '#334155',
  landHoverFill: '#c084fc',
  landSelectedFill: '#a855f7',
  stroke: '#0b0d12',
  activeFill: '#818cf8',
  visitedFill: '#22c55e',
}

/** Return the map palette for the given resolved theme. */
export function getMapPalette(theme: 'light' | 'dark'): MapPalette {
  return theme === 'dark' ? darkPalette : lightPalette
}