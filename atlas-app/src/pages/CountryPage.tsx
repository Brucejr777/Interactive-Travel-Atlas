import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { countries, landmarks, events, foods, people } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatArea, formatNumber, titleCase } from '../lib/utils'
import { useUserStore } from '../store/useUserStore'
import LandmarkCard from '../components/LandmarkCard'
import PersonCard from '../components/PersonCard'
import Breadcrumbs from '../components/Breadcrumbs'
import FavoriteButton from '../components/FavoriteButton'
import VisitedButton from '../components/VisitedButton'
import NoteEditor from '../components/NoteEditor'
import NotFoundPage from './NotFoundPage'

export default function CountryPage() {
  const { slug } = useParams<{ slug: string }>()
  const country = countries.find((c) => c.slug === slug)
  const addRecent = useUserStore((s) => s.addRecent)

  useDocumentTitle(country?.name ?? 'Country not found')

  useEffect(() => {
    if (country) addRecent('country', country.id)
  }, [country, addRecent])

  if (!country) return <NotFoundPage />

  const countryLandmarks = landmarks.filter((l) => l.countryId === country.id)
  const countryEvents = events.filter((e) => e.countryIds.includes(country.id))
  const countryFoods = foods.filter((f) => f.countryId === country.id)
  const countryPeople = people.filter((p) => p.countryId === country.id)

  return (
    <div className="container">
      <Breadcrumbs
        items={[
          { label: 'Countries', to: '/countries' },
          { label: country.name },
        ]}
      />

      <header className="detail-hero">
        <div className="detail-hero__head">
          <div className="detail-hero__flag" aria-hidden="true">
            {country.flag}
          </div>
          <div className="detail-hero__actions">
            <VisitedButton countryId={country.id} label={country.name} />
            <FavoriteButton
              kind="country"
              id={country.id}
              label={country.name}
            />
          </div>
        </div>
        <h1 className="detail-hero__title">{country.name}</h1>
        <p className="detail-hero__lead">{country.editorialIntro}</p>
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
              <ul className="link-list">
                {countryEvents.map((e) => (
                  <li key={e.id} id={e.id} className="link-list__item">
                    <strong className="link-list__title">{e.name}</strong>
                    <span className="link-list__meta"> · {e.period}</span>
                    <p className="link-list__body">{e.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {countryFoods.length > 0 && (
            <section className="section-block">
              <h3>Foods</h3>
              <ul className="link-list">
                {countryFoods.map((f) => (
                  <li key={f.id} id={f.id} className="link-list__item">
                    <strong className="link-list__title">{f.name}</strong>
                    <p className="link-list__body">{f.description}</p>
                    <p className="link-list__sub">
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
              <div className="tradition-stack">
                {country.culture.traditions.map((t) => (
                  <div key={t.id}>
                    <strong className="link-list__title">{t.name}</strong>
                    <span className="link-list__meta"> · {t.category}</span>
                    <p className="link-list__body">{t.description}</p>
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
              <dd className="is-capitalized">
                {country.themes.map(titleCase).join(', ')}
              </dd>
            </dl>
          </div>

          <div className="aside-block">
            <NoteEditor countryId={country.id} countryName={country.name} />
          </div>

          {country.neighboringCountries.length > 0 && (
            <div className="aside-block">
              <h4>Neighbours</h4>
              <ul className="link-list link-list--compact">
                {country.neighboringCountries.map((id) => {
                  const neighbour = countries.find((c) => c.id === id)
                  if (!neighbour) return null
                  return (
                    <li key={id}>
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
            <div className="aside-block">
              <h4>Related countries</h4>
              <ul className="link-list link-list--compact">
                {country.relatedCountries
                  .filter((id) => !country.neighboringCountries.includes(id))
                  .map((id) => {
                    const related = countries.find((c) => c.id === id)
                    if (!related) return null
                    return (
                      <li key={id}>
                        <Link to={`/countries/${related.slug}`}>
                          {related.flag} {related.name}
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )}

          <div className="aside-block">
            <Link to="/compare" className="btn btn--ghost">
              Compare with another country
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}