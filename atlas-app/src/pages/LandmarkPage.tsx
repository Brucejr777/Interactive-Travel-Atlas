import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { landmarks, countries, events, people, foods } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { titleCase } from '../lib/utils'
import { useUserStore } from '../store/useUserStore'
import Breadcrumbs from '../components/Breadcrumbs'
import FavoriteButton from '../components/FavoriteButton'
import NotFoundPage from './NotFoundPage'

export default function LandmarkPage() {
  const { id } = useParams<{ id: string }>()
  const landmark = landmarks.find((l) => l.id === id)
  const addRecent = useUserStore((s) => s.addRecent)

  useDocumentTitle(landmark?.name ?? 'Landmark not found')

  useEffect(() => {
    if (landmark) addRecent('country', landmark.countryId)
  }, [landmark, addRecent])

  if (!landmark) return <NotFoundPage />

  const country = countries.find((c) => c.id === landmark.countryId)
  const relatedEvents = events.filter((e) =>
    landmark.relatedEvents.includes(e.id),
  )
  const relatedPeople = people.filter((p) =>
    landmark.relatedPeople.includes(p.id),
  )
  const relatedFoods = foods.filter((f) =>
    landmark.relatedFoods.includes(f.id),
  )

  return (
    <div className="container">
      <Breadcrumbs
        items={[
          { label: 'Countries', to: '/countries' },
          ...(country
            ? [{ label: country.name, to: `/countries/${country.slug}` }]
            : []),
          { label: landmark.name },
        ]}
      />

      <header className="detail-hero">
        <div className="detail-hero__head">
          <span className="tag">{titleCase(landmark.type)}</span>
          <FavoriteButton
            kind="landmark"
            id={landmark.id}
            label={landmark.name}
          />
        </div>
        <h1 style={{ marginTop: 12, marginBottom: 8 }}>{landmark.name}</h1>
        <p style={{ color: 'var(--text-dim)', margin: 0 }}>
          {landmark.city ? `${landmark.city} · ` : ''}
          {landmark.period}
          {country && (
            <>
              {' · '}
              <Link to={`/countries/${country.slug}`}>
                {country.flag} {country.name}
              </Link>
            </>
          )}
        </p>
        <p className="prose" style={{ marginTop: 16, maxWidth: 720 }}>
          {landmark.description}
        </p>
        <p className="prose" style={{ maxWidth: 720 }}>
          {landmark.historicalSignificance}
        </p>
      </header>

      <div className="detail-grid">
        <div>
          {relatedEvents.length > 0 && (
            <section className="section-block">
              <h3>Related events</h3>
              <ul>
                {relatedEvents.map((e) => (
                  <li key={e.id}>
                    <strong>{e.name}</strong>{' '}
                    <span style={{ color: 'var(--text-dim)' }}>
                      · {e.period}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedPeople.length > 0 && (
            <section className="section-block">
              <h3>Related people</h3>
              <ul>
                {relatedPeople.map((p) => (
                  <li key={p.id}>
                    <Link to={`/people/${p.id}`}>{p.name}</Link>{' '}
                    <span style={{ color: 'var(--text-dim)' }}>
                      · {p.role}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedFoods.length > 0 && (
            <section className="section-block">
              <h3>Related foods</h3>
              <ul>
                {relatedFoods.map((f) => (
                  <li key={f.id}>
                    <strong>{f.name}</strong>{' '}
                    <span style={{ color: 'var(--text-dim)' }}>
                      · {f.origin}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside>
          <div className="facts">
            <dl>
              <dt>Type</dt>
              <dd className="is-capitalized">{landmark.type}</dd>
              {landmark.city && (
                <>
                  <dt>City</dt>
                  <dd>{landmark.city}</dd>
                </>
              )}
              <dt>Period</dt>
              <dd>{landmark.period}</dd>
              {country && (
                <>
                  <dt>Country</dt>
                  <dd>
                    <Link to={`/countries/${country.slug}`}>
                      {country.flag} {country.name}
                    </Link>
                  </dd>
                </>
              )}
              <dt>Coordinates</dt>
              <dd>
                {landmark.location.lat.toFixed(2)},{' '}
                {landmark.location.lng.toFixed(2)}
              </dd>
              <dt>Themes</dt>
              <dd className="is-capitalized">
                {landmark.themes.map(titleCase).join(', ')}
              </dd>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}