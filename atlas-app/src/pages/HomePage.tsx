import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries, people } from '../data'
import CountryCard from '../components/CountryCard'
import PersonCard from '../components/PersonCard'

export default function HomePage() {
  useDocumentTitle('Home')

  const featured = countries.slice(0, 6)
  const featuredPeople = people.slice(0, 4)

  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero__title">
          Explore the world, <em>one story at a time</em>.
        </h1>
        <p className="hero__lead">
          An interactive atlas of countries, cultures, landmarks, foods, and the
          people who shaped them. Start with the map, or dive into a country.
        </p>
        <div className="hero__cta">
          <Link to="/atlas" className="btn btn--primary">
            Open the atlas
          </Link>
          <Link to="/countries" className="btn btn--ghost">
            Browse countries
          </Link>
        </div>
      </section>

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