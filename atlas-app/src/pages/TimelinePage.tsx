import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { events, countries } from '../data'

export default function TimelinePage() {
  useDocumentTitle('Timeline')

  const sorted = [...events].sort((a, b) => a.startDate - b.startDate)

  return (
    <div className="container">
      <div className="page-head">
        <h1>Timeline</h1>
        <p>
          Key moments from the atlas, arranged from earliest to most recent.
        </p>
      </div>

      <ol className="timeline">
        {sorted.map((e) => {
          const primary = e.countryIds[0]
            ? countries.find((c) => c.id === e.countryIds[0])
            : undefined
          return (
            <li key={e.id} className="timeline__item">
              <div className="timeline__marker" aria-hidden="true" />
              <div className="timeline__body">
                <div className="timeline__period">{e.period}</div>
                <h3>{e.name}</h3>
                <p className="timeline__meta">
                  {e.location}
                  {primary && (
                    <>
                      {' · '}
                      <Link to={`/countries/${primary.slug}`}>
                        {primary.flag} {primary.name}
                      </Link>
                    </>
                  )}
                </p>
                <p>{e.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}