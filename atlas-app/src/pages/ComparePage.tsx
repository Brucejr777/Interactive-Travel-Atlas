import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries } from '../data'
import type { Country } from '../lib/types'
import { formatArea, formatNumber } from '../lib/utils'

interface Row {
  label: string
  render: (c: Country) => ReactNode
}

const rows: Row[] = [
  {
    label: 'Flag',
    render: (c) => (
      <span style={{ fontSize: '1.8rem' }} aria-hidden="true">
        {c.flag}
      </span>
    ),
  },
  { label: 'Region', render: (c) => c.region },
  { label: 'Capital', render: (c) => c.capital },
  { label: 'Population', render: (c) => formatNumber(c.population) },
  { label: 'Area', render: (c) => formatArea(c.area) },
  { label: 'Languages', render: (c) => c.languages.join(', ') },
  { label: 'Currency', render: (c) => c.currency },
  { label: 'Climate', render: (c) => c.climate },
]

export default function ComparePage() {
  const [params, setParams] = useSearchParams()
  const aId = params.get('a') ?? ''
  const bId = params.get('b') ?? ''

  useDocumentTitle('Compare countries')

  const a = countries.find((c) => c.id === aId)
  const b = countries.find((c) => c.id === bId)

  function setParam(side: 'a' | 'b', value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set(side, value)
    else next.delete(side)
    setParams(next, { replace: true })
  }

  return (
    <div className="container">
      <div className="page-head">
        <h1>Compare countries</h1>
        <p>Put two countries side by side.</p>
      </div>

      <div className="compare__pickers">
        <select
          value={aId}
          onChange={(e) => setParam('a', e.target.value)}
          aria-label="First country"
        >
          <option value="">Select a country…</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
        <span aria-hidden="true">vs</span>
        <select
          value={bId}
          onChange={(e) => setParam('b', e.target.value)}
          aria-label="Second country"
        >
          <option value="">Select a country…</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
      </div>

      {!a || !b ? (
        <div className="empty">
          <h2>Pick two countries</h2>
          <p>Use the selectors above to start a comparison.</p>
        </div>
      ) : (
        <div className="compare__table" role="table">
          {rows.map((row) => (
            <div className="compare__row" key={row.label} role="row">
              <div className="compare__cell" role="cell">
                {row.render(a)}
              </div>
              <div
                className="compare__cell compare__cell--label"
                role="rowheader"
              >
                {row.label}
              </div>
              <div className="compare__cell" role="cell">
                {row.render(b)}
              </div>
            </div>
          ))}
          <div className="compare__row">
            <div className="compare__cell">
              <Link to={`/countries/${a.slug}`} className="btn btn--ghost">
                Open {a.name}
              </Link>
            </div>
            <div className="compare__cell compare__cell--label" />
            <div className="compare__cell">
              <Link to={`/countries/${b.slug}`} className="btn btn--ghost">
                Open {b.name}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}