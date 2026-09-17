import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries } from '../data'
import { useAtlasStore } from '../store/useAtlasStore'
import WorldMap from '../components/WorldMap'
import ThemeFilter from '../components/ThemeFilter'
import RegionFilter from '../components/RegionFilter'
import CountryCard from '../components/CountryCard'

export default function AtlasPage() {
  useDocumentTitle('Atlas')

  const selectedCountryId = useAtlasStore((s) => s.selectedCountryId)
  const hoveredCountryId = useAtlasStore((s) => s.hoveredCountryId)
  const setSelectedCountry = useAtlasStore((s) => s.setSelectedCountry)
  const setHoveredCountry = useAtlasStore((s) => s.setHoveredCountry)
  const activeThemes = useAtlasStore((s) => s.activeThemes)
  const activeRegions = useAtlasStore((s) => s.activeRegions)

  const selected = countries.find((c) => c.id === selectedCountryId) ?? null
  const hovered = countries.find((c) => c.id === hoveredCountryId) ?? null

  const visibleCountries = countries.filter((c) => {
    const matchesTheme =
      activeThemes.length === 0 || c.themes.some((t) => activeThemes.includes(t))
    const matchesRegion =
      activeRegions.length === 0 || activeRegions.includes(c.region)
    return matchesTheme && matchesRegion
  })

  return (
    <div className="container">
      <div className="page-head">
        <h1>Atlas</h1>
        <p>
          Click a highlighted country to see its culture, landmarks, foods, and
          people. Use the filters to narrow the selection.
        </p>
      </div>

      <div className="filter-stack">
        <ThemeFilter />
        <RegionFilter />
      </div>

      <div className="atlas-layout">
        <div className="map-frame">
          <WorldMap
            countries={visibleCountries}
            selectedId={selectedCountryId}
            hoveredId={hoveredCountryId}
            onSelect={setSelectedCountry}
            onHover={setHoveredCountry}
          />
          {hovered && (
            <div className="map-frame__tooltip" role="status">
              {hovered.flag} {hovered.name}
            </div>
          )}
        </div>

        <aside className="side-panel">
          <h2 className="side-panel__title">
            {selected ? selected.name : 'No country selected'}
          </h2>

          {selected ? (
            <>
              <p className="side-panel__meta">
                {selected.capital} · {selected.region}
              </p>
              <p className="side-panel__body">{selected.description}</p>
              <Link
                to={`/countries/${selected.slug}`}
                className="btn btn--primary"
              >
                Open country page
              </Link>
            </>
          ) : (
            <p className="side-panel__body side-panel__body--dim">
              Hover a country to preview it, then click to see details.
            </p>
          )}
        </aside>
      </div>

      <section className="section">
        <div className="section__head">
          <h2>
            {activeThemes.length + activeRegions.length > 0
              ? 'Filtered countries'
              : 'All countries'}
          </h2>
          <span className="section__count">
            {visibleCountries.length} of {countries.length}
          </span>
        </div>

        {visibleCountries.length === 0 ? (
          <div className="empty">
            <h2>No matches</h2>
            <p>Try clearing a filter.</p>
          </div>
        ) : (
          <div className="grid grid--3">
            {visibleCountries.map((c) => (
              <CountryCard key={c.id} country={c} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}