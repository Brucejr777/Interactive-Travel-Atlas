import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries } from '../data'
import { useAtlasStore } from '../store/useAtlasStore'
import { formatNumber } from '../lib/utils'
import CountryCard from '../components/CountryCard'
import ThemeFilter from '../components/ThemeFilter'
import RegionFilter from '../components/RegionFilter'

type SortKey = 'name' | 'population' | 'area'

export default function CountriesPage() {
  useDocumentTitle('Countries')

  const activeThemes = useAtlasStore((s) => s.activeThemes)
  const activeRegions = useAtlasStore((s) => s.activeRegions)
  const clearFilters = useAtlasStore((s) => s.clearFilters)

  const [sort, setSort] = useState<SortKey>('name')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const visible = useMemo(() => {
    const filtered = countries.filter((c) => {
      const matchesTheme =
        activeThemes.length === 0 ||
        c.themes.some((t) => activeThemes.includes(t))
      const matchesRegion =
        activeRegions.length === 0 || activeRegions.includes(c.region)
      return matchesTheme && matchesRegion
    })

    const sorted = [...filtered]
    sorted.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'population') return b.population - a.population
      return b.area - a.area
    })
    return sorted
  }, [activeThemes, activeRegions, sort])

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

      <div className="toolbar">
        <label className="toolbar__field">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            <option value="name">Name (A–Z)</option>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
        </label>
        <div className="toolbar__views" role="group" aria-label="View mode">
          <button
            type="button"
            className={view === 'grid' ? 'is-active' : ''}
            aria-pressed={view === 'grid'}
            onClick={() => setView('grid')}
          >
            Grid
          </button>
          <button
            type="button"
            className={view === 'list' ? 'is-active' : ''}
            aria-pressed={view === 'list'}
            onClick={() => setView('list')}
          >
            List
          </button>
        </div>
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
      ) : view === 'grid' ? (
        <div className="grid grid--3">
          {visible.map((c) => (
            <CountryCard key={c.id} country={c} />
          ))}
        </div>
      ) : (
        <ul className="list-view">
          {visible.map((c) => (
            <li key={c.id}>
              <Link to={`/countries/${c.slug}`} className="list-view__item">
                <span className="list-view__flag" aria-hidden="true">
                  {c.flag}
                </span>
                <span className="list-view__name">{c.name}</span>
                <span className="list-view__meta">
                  {c.region} · {c.capital}
                </span>
                <span className="list-view__num">
                  {formatNumber(c.population)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}