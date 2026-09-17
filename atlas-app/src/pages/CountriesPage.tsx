import { useMemo } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries } from '../data'
import { useAtlasStore } from '../store/useAtlasStore'
import CountryCard from '../components/CountryCard'
import ThemeFilter from '../components/ThemeFilter'

export default function CountriesPage() {
  useDocumentTitle('Countries')

  const activeThemes = useAtlasStore((s) => s.activeThemes)

  const visible = useMemo(() => {
    if (activeThemes.length === 0) return countries
    return countries.filter((c) => c.themes.some((t) => activeThemes.includes(t)))
  }, [activeThemes])

  return (
    <div className="container">
      <div className="page-head">
        <h1>Countries</h1>
        <p>
          {visible.length} of {countries.length} countries. Filter by theme.
        </p>
      </div>

      <div style={{ marginBottom: 28 }}>
        <ThemeFilter />
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          <h2>No countries match your filters</h2>
          <p>Try clearing a theme.</p>
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