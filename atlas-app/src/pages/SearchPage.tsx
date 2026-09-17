import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { search } from '../lib/search'
import type { SearchResult } from '../lib/types'

const typeLabel: Record<SearchResult['type'], string> = {
  country: 'Countries',
  region: 'Regions',
  city: 'Cities',
  landmark: 'Landmarks',
  food: 'Foods',
  event: 'Events',
  person: 'People',
  tradition: 'Traditions',
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''

  useDocumentTitle(query ? `Search: ${query}` : 'Search')

  const results = useMemo(() => search(query), [query])

  const grouped = useMemo(() => {
    const map = new Map<SearchResult['type'], SearchResult[]>()
    for (const r of results) {
      const arr = map.get(r.type) ?? []
      arr.push(r)
      map.set(r.type, arr)
    }
    return map
  }, [results])

  return (
    <div className="container">
      <div className="page-head">
        <h1>{query ? `Results for “${query}”` : 'Search'}</h1>
        <p>
          {query
            ? `${results.length} result${results.length === 1 ? '' : 's'}`
            : 'Use the search bar above to find countries, people, landmarks, foods, and events.'}
          {query && (
            <>
              {' '}
              <button
                type="button"
                className="btn btn--ghost"
                style={{ padding: '2px 10px', fontSize: '0.8rem' }}
                onClick={() => setParams({}, { replace: true })}
              >
                Clear
              </button>
            </>
          )}
        </p>
      </div>

      {query && results.length === 0 && (
        <div className="empty">
          <h2>No results</h2>
          <p>Try a different spelling or a broader term.</p>
        </div>
      )}

      {[...grouped.entries()].map(([type, items]) => (
        <section className="result-group" key={type}>
          <h3>{typeLabel[type]}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((r) => (
              <li key={`${r.type}-${r.id}`}>
                <Link to={r.href} className="result-item">
                  <span className="result-item__icon" aria-hidden="true">
                    {r.type === 'country' ? '🌍' : '•'}
                  </span>
                  <span>
                    <span className="result-item__label">{r.label}</span>
                    <br />
                    <span className="result-item__sub">{r.secondary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}