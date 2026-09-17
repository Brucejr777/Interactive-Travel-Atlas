import { useMemo } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries } from '../data'
import { useAtlasStore } from '../store/useAtlasStore'
import CountryCard from '../components/CountryCard'
import ThemeFilter from '../components/ThemeFilter'
import RegionFilter from '../components/RegionFilter'

export default function CountriesPage() {
  useDocumentTitle('Countries')

  const activeThemes = useAtlasStore((s) => s.activeThemes)
  const activeRegions = useAtlasStore((s) => s.activeRegions)
  const clearFilters = useAtlasStore((s) => s.clearFilters)

  const visible = useMemo(() => {
    return countries.filter((c) => {
      const matchesTheme =
        activeThemes.length === 0 ||
        c.themes.some((t) => activeThemes.includes(t))
      const matchesRegion =
        activeRegions.length === 0 || activeRegions.includes(c.region)
      return matchesTheme && matchesRegion
    })
  }, [activeThemes, activeRegions])

  const hasFilters = activeThemes.length + activeRegions.length > 0

  return (
    <div className="container">
      <div className="page-head">
        <h1>Countries</h1>
        <p>
          {visible.length} of {countries.length} countries.
          {hasFilters ? ' Filtered.' : ''}
        </p>
      </div>

      <div className="filter-stack">
        <ThemeFilter />
        <RegionFilter />
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          <h2>No countries match your filters</h2>
          <p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </p>
        </div>
      ) : (
        <div className="grid grid--3">
          {visible.map((c) => (
            <CountryCard key={c.id} country={c} />
          ))}
        </div>
      )}
    </div>
  )
}