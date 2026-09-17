import { useMemo } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries, people, landmarks } from '../data'
import { useUserStore } from '../store/useUserStore'
import type { Country, Landmark, Person } from '../lib/types'
import CountryCard from '../components/CountryCard'
import PersonCard from '../components/PersonCard'
import LandmarkCard from '../components/LandmarkCard'

export default function FavoritesPage() {
  useDocumentTitle('Favorites')

  const favorites = useUserStore((s) => s.favorites)
  const clearFavorites = useUserStore((s) => s.clearFavorites)

  const { favCountries, favPeople, favLandmarks } = useMemo(() => {
    const favCountries: Country[] = []
    const favPeople: Person[] = []
    const favLandmarks: Landmark[] = []

    for (const key of favorites) {
      const [kind, id] = key.split(':')
      if (kind === 'country') {
        const c = countries.find((x) => x.id === id)
        if (c) favCountries.push(c)
      } else if (kind === 'person') {
        const p = people.find((x) => x.id === id)
        if (p) favPeople.push(p)
      } else if (kind === 'landmark') {
        const l = landmarks.find((x) => x.id === id)
        if (l) favLandmarks.push(l)
      }
    }
    return { favCountries, favPeople, favLandmarks }
  }, [favorites])

  const total = favCountries.length + favPeople.length + favLandmarks.length

  return (
    <div className="container">
      <div className="page-head">
        <h1>Favorites</h1>
        <p>Your saved countries, people, and landmarks, kept in this browser.</p>
      </div>

      {total === 0 ? (
        <div className="empty">
          <h2>Nothing saved yet</h2>
          <p>Tap the heart icon on any card to save it here.</p>
        </div>
      ) : (
        <>
          {favCountries.length > 0 && (
            <section className="section-block">
              <h3>Countries</h3>
              <div className="grid grid--3">
                {favCountries.map((c) => (
                  <CountryCard key={c.id} country={c} />
                ))}
              </div>
            </section>
          )}

          {favPeople.length > 0 && (
            <section className="section-block">
              <h3>People</h3>
              <div className="grid grid--3">
                {favPeople.map((p) => (
                  <PersonCard key={p.id} person={p} />
                ))}
              </div>
            </section>
          )}

          {favLandmarks.length > 0 && (
            <section className="section-block">
              <h3>Landmarks</h3>
              <div className="grid grid--3">
                {favLandmarks.map((l) => (
                  <LandmarkCard key={l.id} landmark={l} />
                ))}
              </div>
            </section>
          )}

          <div style={{ marginTop: 32 }}>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={clearFavorites}
            >
              Clear all favorites
            </button>
          </div>
        </>
      )}
    </div>
  )
}