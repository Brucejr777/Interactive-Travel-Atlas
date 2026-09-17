import { lazy, Suspense, useMemo } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import type { Country } from '../lib/types'
import { isoNumericToCountryId } from '../lib/mapConfig'
import Loading from './Loading'

const worldDataPromise = import('world-atlas/countries-110m.json')

// Lazy component so the topojson chunk only loads when a map is rendered.
const LazyMapBody = lazy(async () => {
  const mod = await worldDataPromise
  const worldData = mod.default

  function MapBody({
    countries,
    selectedId,
    hoveredId,
    onSelect,
    onHover,
  }: Props) {
    const byId = useMemo(
      () => new Map(countries.map((c) => [c.id, c])),
      [countries],
    )

    const anyActive = useMemo(
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
                const hasCountry = !!countryId && anyActive.has(numericId)
                const country = countryId ? byId.get(countryId) : undefined

                const isSelected = !!countryId && countryId === selectedId
                const isHovered = !!countryId && countryId === hoveredId

                const fill = isSelected
                  ? '#7c3aed'
                  : isHovered
                    ? '#a855f7'
                    : hasCountry
                      ? '#6366f1'
                      : '#cbd5e1'

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (country) onSelect?.(country.id)
                    }}
                    onMouseEnter={() => {
                      if (countryId && anyActive.has(numericId)) {
                        onHover?.(countryId)
                      }
                    }}
                    onMouseLeave={() => onHover?.(null)}
                    fill={fill}
                    stroke="#ffffff"
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

  return { default: MapBody }
})

interface Props {
  countries: Country[]
  selectedId?: string | null
  hoveredId?: string | null
  onSelect?: (countryId: string) => void
  onHover?: (countryId: string | null) => void
}

export default function WorldMap(props: Props) {
  return (
    <Suspense fallback={<Loading label="Loading map…" />}>
      <LazyMapBody {...props} />
    </Suspense>
  )
}