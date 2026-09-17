import { useMemo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import type { GeoJsonObject } from 'geojson'
import worldData from 'world-atlas/countries-110m.json'
import {
  getMapPalette,
  isoNumericToCountryId,
  mapProjection,
} from '../lib/mapConfig'
import { useResolvedTheme } from '../hooks/useResolvedTheme'
import type { WorldMapProps } from './WorldMap'

export default function WorldMapBody({
  countries,
  selectedId,
  hoveredId,
  visitedIds,
  onSelect,
  onHover,
}: WorldMapProps) {
  const theme = useResolvedTheme()
  const palette = getMapPalette(theme)

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

  const visitedSet = useMemo(
    () => new Set(visitedIds ?? []),
    [visitedIds],
  )

  return (
    <ComposableMap
      projectionConfig={mapProjection}
      style={{ width: '100%', height: 'auto' }}
    >
      <ZoomableGroup>
        <Geographies geography={worldData as unknown as GeoJsonObject}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const numericId = String(geo.id ?? '')
              const countryId = isoNumericToCountryId[numericId]
              const hasCountry = !!countryId && activeNumericIds.has(numericId)
              const country = countryId ? byId.get(countryId) : undefined

              const isSelected = !!countryId && countryId === selectedId
              const isHovered = !!countryId && countryId === hoveredId
              const isVisited = !!countryId && visitedSet.has(countryId)

              const fill = isSelected
                ? palette.landSelectedFill
                : isHovered
                  ? palette.landHoverFill
                  : isVisited
                    ? palette.visitedFill
                    : hasCountry
                      ? palette.activeFill
                      : palette.landFill

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
                  stroke={palette.stroke}
                  strokeWidth={0.4}
                  style={{
                    outline: 'none',
                    cursor: country ? 'pointer' : 'default',
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