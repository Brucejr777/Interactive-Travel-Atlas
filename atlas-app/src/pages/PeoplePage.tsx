import { useMemo } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { people } from '../data'
import { useAtlasStore } from '../store/useAtlasStore'
import PersonCard from '../components/PersonCard'
import ThemeFilter from '../components/ThemeFilter'

export default function PeoplePage() {
  useDocumentTitle('People')

  const activeThemes = useAtlasStore((s) => s.activeThemes)

  const visible = useMemo(() => {
    if (activeThemes.length === 0) return people
    return people.filter((p) => p.themes.some((t) => activeThemes.includes(t)))
  }, [activeThemes])

  return (
    <div className="container">
      <div className="page-head">
        <h1>People</h1>
        <p>
          Artists, scientists, and leaders whose stories are tied to the places
          in the atlas.
        </p>
      </div>

      <div style={{ marginBottom: 28 }}>
        <ThemeFilter />
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          <h2>No people match your filters</h2>
        </div>
      ) : (
        <div className="grid grid--3">
          {visible.map((p) => (
            <PersonCard key={p.id} person={p} />
          ))}
        </div>
      )}
    </div>
  )
}