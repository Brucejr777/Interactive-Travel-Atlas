import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries, foods, landmarks, people } from '../data'
import CountryCard from '../components/CountryCard'
import PersonCard from '../components/PersonCard'
import { useUserStore } from '../store/useUserStore'

export default function HomePage() {
  useDocumentTitle('Home')

  const featured = countries.slice(0, 6)
  const featuredPeople = people.slice(0, 4)
  const recents = useUserStore((s) => s.recents)

  const heroStats = [
    { value: countries.length, label: 'Countries' },
    { value: landmarks.length, label: 'Landmarks' },
    { value: people.length, label: 'People' },
    { value: foods.length, label: 'Foods' },
  ]

  const recentItems = recents
    .map((r) => {
      if (r.kind === 'country') {
        const c = countries.find((x) => x.id === r.id)
        return c ? { kind: 'country' as const, country: c } : null
      }
      const p = people.find((x) => x.id === r.id)
      return p ? { kind: 'person' as const, person: p } : null
    })
    .filter(
      (
        x,
      ): x is
        | { kind: 'country'; country: (typeof countries)[number] }
        | { kind: 'person'; person: (typeof people)[number] } => x !== null,
    )
    .slice(0, 4)

  return (
    <div className="container">
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>

        <div className="hero__content">
          <span className="hero__eyebrow">A world of stories</span>

          <h1 className="hero__title">
            Explore the world, <em>one story at a time</em>.
          </h1>

          <p className="hero__lead">
            An interactive atlas of countries, cultures, landmarks, foods, and
            the people who shaped them. Start with the map, or dive straight
            into a country.
          </p>

          <div className="hero__cta">
            <Link to="/atlas" className="btn btn--primary">
              Open the atlas
            </Link>
            <Link to="/countries" className="btn btn--ghost">
              Browse countries
            </Link>
          </div>

          <div className="hero__stats">
            {heroStats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {recentItems.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2>Continue exploring</h2>
          </div>
          <div className="grid grid--4">
            {recentItems.map((item) =>
              item.kind === 'country' ? (
                <CountryCard key={item.country.id} country={item.country} />
              ) : (
                <PersonCard key={item.person.id} person={item.person} />
              ),
            )}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section__head">
          <h2>Featured countries</h2>
          <Link to="/countries" className="section__more">
            See all →
          </Link>
        </div>
        <div className="grid grid--3">
          {featured.map((c) => (
            <CountryCard key={c.id} country={c} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>People worth knowing</h2>
          <Link to="/people" className="section__more">
            See all →
          </Link>
        </div>
        <div className="grid grid--4">
          {featuredPeople.map((p) => (
            <PersonCard key={p.id} person={p} />
          ))}
        </div>
      </section>
    </div>
  )
}