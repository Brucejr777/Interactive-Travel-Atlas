import type { Region } from '../lib/types'
import { cx } from '../lib/utils'
import { useAtlasStore } from '../store/useAtlasStore'

const regions: Region[] = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
]

interface Props {
  className?: string
}

export default function RegionFilter({ className }: Props) {
  const activeRegions = useAtlasStore((s) => s.activeRegions)
  const toggleRegion = useAtlasStore((s) => s.toggleRegion)

  return (
    <div
      className={cx('chip-row', className)}
      role="group"
      aria-label="Filter by region"
    >
      {regions.map((region) => {
        const active = activeRegions.includes(region)
        return (
          <button
            key={region}
            type="button"
            className={cx('chip', active && 'is-active')}
            aria-pressed={active}
            onClick={() => toggleRegion(region)}
          >
            {region}
          </button>
        )
      })}
    </div>
  )
}