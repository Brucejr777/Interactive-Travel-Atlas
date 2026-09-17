/**
 * Maps world-atlas ISO 3166-1 numeric IDs to our internal country IDs.
 * Only countries present in `data/countries.ts` are included here.
 */
export const isoNumericToCountryId: Record<string, string> = {
  '250': 'fr-france',
  '276': 'de-germany',
  '380': 'it-italy',
  '392': 'jp-japan',
  '484': 'mx-mexico',
  '616': 'pl-poland',
  '710': 'za-south-africa',
  '840': 'us-united-states',
  '076': 'br-brazil',
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
}