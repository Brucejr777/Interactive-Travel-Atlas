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

export const mapColors = {
  landFill: '#cbd5e1',
  landFillDark: '#334155',
  landHoverFill: '#a855f7',
  landSelectedFill: '#7c3aed',
  stroke: '#ffffff',
  strokeDark: '#0b0d12',
  activeFill: '#6366f1',
}