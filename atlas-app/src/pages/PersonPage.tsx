import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { people, countries, landmarks, events, foods } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { titleCase } from '../lib/utils'
import { useUserStore } from '../store/useUserStore'
import Breadcrumbs from '../components/Breadcrumbs'
import FavoriteButton from '../components/FavoriteButton'
import NotFoundPage from './NotFoundPage'

export default function PersonPage() {
  const { id } = useParams<{ id: string }>()
  const person = people.find((p) => p.id === id)
  const addRecent = useUserStore((s) => s.addRecent)

  useDocumentTitle(person?.name ?? 'Person not found')

  useEffect(() => {
    if (person) addRecent('person', person.id)
  }, [person, addRecent])

  if (!person) return <NotFoundPage />

  const country = person.countryId
    ? countries.find((c) => c.id === person.countryId)
    : undefined

  const personLandmarks = landmarks.filter((l) =>
    person.relatedLandmarks.includes(l.id),
  )
  const personEvents = events.filter((e) => person.relatedEvents.includes(e.id))
  const personFoods = foods.filter((f) => person.relatedFoods.includes(f.id))
  const personPeople = people.filter((p) =>
    person.relatedPeople.includes(p.id),
  )

  const dates =
    person.birth && person.death
      ? `${person.birth}–${person.death}`
      : person.birth
        ? `b. ${person.birth}`
        : ''

  return (
    <div className="container">
      <Breadcrumbs
        items={[{ label: 'People', to: '/people' }, { label: person.name }]}
      />

      <header className="detail-hero">
        <div className="detail-hero__head">
          <span className="tag">{titleCase(person.themes[0] ?? 'person')}</span>
          <FavoriteButton
            kind="person"
            id={person.id}
            label={person.name}
          />
        </div>
        <h1 style={{ marginTop: 12, marginBottom: 8 }}>{person.name}</h1>
        <p style={{ color: 'var(--text-dim)', margin: 0 }}>
          {person.role}
          {dates ? ` · ${dates}` : ''}
        </p>
        <p className="prose" style={{ marginTop: 16, maxWidth: 720 }}>
          {person.description}
        </p>
      </header>

      <div className="detail-grid">
        <div>
          {personLandmarks.length > 0 && (
            <section className="section-block">
              <h3>Related landmarks</h3>
              <ul>
                {personLandmarks.map((l) => (
                  <li key={l.id}>
                    <Link
                      to={`/landmarks/${l.id}`}
                      style={{ color: 'var(--text-head)' }}
                    >
                      <strong>{l.name}</strong>
                    </Link>{' '}
                    <span style={{ color: 'var(--text-dim)' }}>
                      {l.city ? `· ${l.city}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {personEvents.length > 0 && (
            <section className="section-block">
              <h3>Related events</h3>
              <ul>
                {personEvents.map((e) => (
                  <li key={e.id}>
                    <strong style={{ color: 'var(--text-head)' }}>
                      {e.name}
                    </strong>{' '}
                    <span style={{ color: 'var(--text-dim)' }}>
                      · {e.period}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {personFoods.length > 0 && (
            <section className="section-block">
              <h3>Related foods</h3>
              <ul>
                {personFoods.map((f) => (
                  <li key={f.id}>
                    <strong style={{ color: 'var(--text-head)' }}>
                      {f.name}
                    </strong>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {personPeople.length > 0 && (
            <section className="section-block">
              <h3>Connected people</h3>
              <ul>
                {personPeople.map((p) => (
                  <li key={p.id}>
                    <Link to={`/people/${p.id}`}>{p.name}</Link>{' '}
                    <span style={{ color: 'var(--text-dim)' }}>· {p.role}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside>
          <div className="facts">
            <dl>
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
              <dt>Role</dt>
              <dd>{person.role}</dd>
              {dates && (
                <>
                  <dt>Lifespan</dt>
                  <dd>{dates}</dd>
                </>
              )}
              <dt>Themes</dt>
              <dd>{person.themes.map(titleCase).join(', ')}</dd>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}