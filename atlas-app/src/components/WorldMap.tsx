import { lazy, Suspense } from 'react'
import type { Country } from '../lib/types'
import Loading from './Loading'

// The body imports the ~100 KB `world-atlas` TopoJSON, so it lives in its
// own chunk and is only fetched when a map is rendered.
const LazyMapBody = lazy(() => import('./WorldMapBody'))

export interface WorldMapProps {
  countries: Country[]
  selectedId?: string | null
  hoveredId?: string | null
  onSelect?: (countryId: string) => void
  onHover?: (countryId: string | null) => void
}

export default function WorldMap(props: WorldMapProps) {
  return (
    <div className="map-frame__canvas">
      <Suspense fallback={<Loading label="Loading map…" />}>
        <LazyMapBody {...props} />
      </Suspense>
    </div>
  )
}