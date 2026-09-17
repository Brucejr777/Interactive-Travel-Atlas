import { useMemo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import worldData from 'world-atlas/countries-110m.json'
import type { Country } from '../lib/types'
import { isoNumericToCountryId, mapColors } from '../lib/mapConfig'
import type { WorldMapProps } from './WorldMap'

export default function WorldMapBody({
  countries,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: WorldMapProps) {
  const byId = useMemo(
    () => new Map(countries.map((c) => [c.id, c])),
    [countries],
  )

  const activeNumericIds = useMemo(
    () =>
      new Set(
        countries.flatMap((c) => (c.isoNumeric ? [c.isoNumeric] : [])),
      ),
    [countries],
  )

  return (
    <ComposableMap
      projectionConfig={{ scale: 147, center: [0, 20] }}
      style={{ width: '100%', height: 'auto' }}
    >
      <ZoomableGroup>
        <Geographies geography={worldData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const numericId = String(geo.id ?? '')
              const countryId = isoNumericToCountryId[numericId]
              const hasCountry = !!countryId && activeNumericIds.has(numericId)
              const country = countryId ? byId.get(countryId) : undefined

              const isSelected = !!countryId && countryId === selectedId
              const isHovered = !!countryId && countryId === hoveredId

              const fill = isSelected
                ? mapColors.landSelectedFill
                : isHovered
                  ? mapColors.landHoverFill
                  : hasCountry
                    ? mapColors.activeFill
                    : mapColors.landFill

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (country) onSelect?.(country.id)
                  }}
                  onMouseEnter={() => {
                    if (countryId && activeNumericIds.has(numericId)) {
                      onHover?.(countryId)
                    }
                  }}
                  onMouseLeave={() => onHover?.(null)}
                  fill={fill}
                  stroke={mapColors.stroke}
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      outline: 'none',
                      cursor: country ? 'pointer' : 'default',
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}