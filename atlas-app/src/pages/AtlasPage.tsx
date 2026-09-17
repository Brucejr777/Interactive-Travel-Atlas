import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries } from '../data'
import { useAtlasStore } from '../store/useAtlasStore'
import WorldMap from '../components/WorldMap'
import ThemeFilter from '../components/ThemeFilter'
import CountryCard from '../components/CountryCard'

export default function AtlasPage() {
  useDocumentTitle('Atlas')

  const selectedCountryId = useAtlasStore((s) => s.selectedCountryId)
  const hoveredCountryId = useAtlasStore((s) => s.hoveredCountryId)
  const setSelectedCountry = useAtlasStore((s) => s.setSelectedCountry)
  const setHoveredCountry = useAtlasStore((s) => s.setHoveredCountry)
  const activeThemes = useAtlasStore((s) => s.activeThemes)

  const selected = countries.find((c) => c.id === selectedCountryId) ?? null
  const hovered = countries.find((c) => c.id === hoveredCountryId) ?? null

  const visibleCountries =
    activeThemes.length === 0
      ? countries
      : countries.filter((c) =>
          c.themes.some((t) => activeThemes.includes(t)),
        )

  return (
    <div className="container">
      <div className="page-head">
        <h1>Atlas</h1>
        <p>
          Click a highlighted country to see its culture, landmarks, foods, and
          people. Use the themes below to narrow the selection.
        </p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <ThemeFilter />
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
          <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}>
            {selected ? selected.name : 'No country selected'}
          </h2>

          {selected ? (
            <>
              <p style={{ color: 'var(--text-dim)', marginBottom: 16 }}>
                {selected.capital} · {selected.region}
              </p>
              <p style={{ marginBottom: 16 }}>{selected.description}</p>
              <Link
                to={`/countries/${selected.slug}`}
                className="btn btn--primary"
              >
                Open country page
              </Link>
            </>
          ) : (
            <p style={{ color: 'var(--text-dim)' }}>
              Hover a country to preview it, then click to see details.
            </p>
          )}
        </aside>
      </div>

      <section className="section">
        <div className="section__head">
          <h2>
            {activeThemes.length > 0
              ? `Countries matching ${activeThemes.length} theme${
                  activeThemes.length === 1 ? '' : 's'
                }`
              : 'All countries'}
          </h2>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            {visibleCountries.length} of {countries.length}
          </span>
        </div>

        {visibleCountries.length === 0 ? (
          <div className="empty">
            <h2>No matches</h2>
            <p>Try clearing a theme filter.</p>
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