import { Link, useParams } from 'react-router-dom'
import { countries, landmarks, events, foods, people } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatArea, formatNumber, titleCase } from '../lib/utils'
import LandmarkCard from '../components/LandmarkCard'
import PersonCard from '../components/PersonCard'
import NotFoundPage from './NotFoundPage'

export default function CountryPage() {
  const { slug } = useParams<{ slug: string }>()
  const country = countries.find((c) => c.slug === slug)

  useDocumentTitle(country?.name ?? 'Country not found')

  if (!country) return <NotFoundPage />

  const countryLandmarks = landmarks.filter((l) => l.countryId === country.id)
  const countryEvents = events.filter((e) =>
    e.countryIds.includes(country.id),
  )
  const countryFoods = foods.filter((f) => f.countryId === country.id)
  const countryPeople = people.filter((p) => p.countryId === country.id)

  return (
    <div className="container">
      <header className="detail-hero">
        <div className="detail-hero__flag" aria-hidden="true">
          {country.flag}
        </div>
        <h1 style={{ marginBottom: 8 }}>{country.name}</h1>
        <p style={{ color: 'var(--text-dim)', margin: 0 }}>
          {country.editorialIntro}
        </p>
        <div className="detail-hero__meta">
          <span>{country.region}</span>
          <span>Capital: {country.capital}</span>
          <span>{formatNumber(country.population)} people</span>
          <span>{formatArea(country.area)}</span>
        </div>
      </header>

      <div className="detail-grid">
        <div>
          <section className="section-block">
            <h3>Overview</h3>
            <p className="prose">{country.description}</p>
            <p className="prose">{country.geography}</p>
          </section>

          {countryLandmarks.length > 0 && (
            <section className="section-block">
              <h3>Landmarks</h3>
              <div className="grid grid--3">
                {countryLandmarks.map((l) => (
                  <LandmarkCard key={l.id} landmark={l} />
                ))}
              </div>
            </section>
          )}

          {countryPeople.length > 0 && (
            <section className="section-block">
              <h3>People</h3>
              <div className="grid grid--3">
                {countryPeople.map((p) => (
                  <PersonCard key={p.id} person={p} />
                ))}
              </div>
            </section>
          )}

          {countryEvents.length > 0 && (
            <section className="section-block">
              <h3>Historical events</h3>
              <ul style={{ display: 'grid', gap: 12 }}>
                {countryEvents.map((e) => (
                  <li key={e.id} id={e.id} style={{ listStyle: 'none' }}>
                    <strong style={{ color: 'var(--text-head)' }}>
                      {e.name}
                    </strong>
                    <span style={{ color: 'var(--text-dim)' }}>
                      {' '}
                      · {e.period}
                    </span>
                    <p style={{ margin: '4px 0 0' }}>{e.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {countryFoods.length > 0 && (
            <section className="section-block">
              <h3>Foods</h3>
              <ul style={{ display: 'grid', gap: 12 }}>
                {countryFoods.map((f) => (
                  <li key={f.id} id={f.id} style={{ listStyle: 'none' }}>
                    <strong style={{ color: 'var(--text-head)' }}>
                      {f.name}
                    </strong>
                    <p style={{ margin: '4px 0 0' }}>{f.description}</p>
                    <p
                      style={{
                        margin: '4px 0 0',
                        color: 'var(--text-dim)',
                        fontSize: '0.85rem',
                      }}
                    >
                      Ingredients: {f.ingredients.join(', ')}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="section-block">
            <h3>Culture</h3>
            <dl className="kv">
              <dt>Clothing</dt>
              <dd>{country.culture.clothing}</dd>
              <dt>Music</dt>
              <dd>{country.culture.music}</dd>
              <dt>Art</dt>
              <dd>{country.culture.art}</dd>
              <dt>Festivals</dt>
              <dd>{country.culture.festivals}</dd>
              <dt>Architecture</dt>
              <dd>{country.culture.architecture}</dd>
              <dt>Daily life</dt>
              <dd>{country.culture.dailyLife}</dd>
            </dl>

            {country.culture.traditions.length > 0 && (
              <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
                {country.culture.traditions.map((t) => (
                  <div key={t.id}>
                    <strong style={{ color: 'var(--text-head)' }}>
                      {t.name}
                    </strong>
                    <span style={{ color: 'var(--text-dim)' }}>
                      {' '}
                      · {t.category}
                    </span>
                    <p style={{ margin: '4px 0 0' }}>{t.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside>
          <div className="facts">
            <dl>
              <dt>Capital</dt>
              <dd>{country.capital}</dd>
              <dt>Region</dt>
              <dd>{country.region}</dd>
              {country.subregion && (
                <>
                  <dt>Subregion</dt>
                  <dd>{country.subregion}</dd>
                </>
              )}
              <dt>Languages</dt>
              <dd>{country.languages.join(', ')}</dd>
              <dt>Currency</dt>
              <dd>{country.currency}</dd>
              <dt>Climate</dt>
              <dd>{country.climate}</dd>
              <dt>Major cities</dt>
              <dd>{country.majorCities.join(', ')}</dd>
              <dt>Themes</dt>
              <dd style={{ textTransform: 'capitalize' }}>
                {country.themes.map(titleCase).join(', ')}
              </dd>
            </dl>
          </div>

          {country.neighboringCountries.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h4>Neighbours</h4>
              <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                {country.neighboringCountries.map((id) => {
                  const neighbour = countries.find((c) => c.id === id)
                  if (!neighbour) return null
                  return (
                    <li key={id} style={{ marginBottom: 6 }}>
                      <Link to={`/countries/${neighbour.slug}`}>
                        {neighbour.flag} {neighbour.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {country.relatedCountries.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h4>Related countries</h4>
              <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                {country.relatedCountries
                  .filter(
                    (id) => !country.neighboringCountries.includes(id),
                  )
                  .map((id) => {
                    const related = countries.find((c) => c.id === id)
                    if (!related) return null
                    return (
                      <li key={id} style={{ marginBottom: 6 }}>
                        <Link to={`/countries/${related.slug}`}>
                          {related.flag} {related.name}
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}