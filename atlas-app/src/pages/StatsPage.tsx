import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries, events, foods, landmarks, people } from '../data'
import type { Region, Theme } from '../lib/types'
import { formatArea, formatNumber, titleCase } from '../lib/utils'
import { useUserStore } from '../store/useUserStore'

const regionOrder: Region[] = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Antarctica',
]

function formatYear(year: number): string {
  return year < 0 ? `${Math.abs(year)} BCE` : `${year}`
}

export default function StatsPage() {
  useDocumentTitle('Insights')

  const visited = useUserStore((s) => s.visited)
  const favorites = useUserStore((s) => s.favorites)

  const data = useMemo(() => {
    const totalPopulation = countries.reduce((n, c) => n + c.population, 0)
    const totalArea = countries.reduce((n, c) => n + c.area, 0)

    const byRegion = regionOrder
      .map((region) => ({
        region,
        count: countries.filter((c) => c.region === region).length,
      }))
      .filter((row) => row.count > 0)

    const themeCounts = new Map<Theme, number>()
    for (const c of countries) {
      for (const t of c.themes) {
        themeCounts.set(t, (themeCounts.get(t) ?? 0) + 1)
      }
    }
    const byTheme = [...themeCounts.entries()]
      .map(([theme, count]) => ({ theme, count }))
      .sort((a, b) => b.count - a.count)

    const mostPopulous = [...countries]
      .sort((a, b) => b.population - a.population)
      .slice(0, 5)

    const largest = [...countries]
      .sort((a, b) => b.area - a.area)
      .slice(0, 5)

    const timelineStart = events.reduce(
      (min, e) => Math.min(min, e.startDate),
      Number.POSITIVE_INFINITY,
    )
    const timelineEnd = events.reduce(
      (max, e) => Math.max(max, e.endDate ?? e.startDate),
      Number.NEGATIVE_INFINITY,
    )

    return {
      totalPopulation,
      totalArea,
      byRegion,
      byTheme,
      mostPopulous,
      largest,
      timelineStart,
      timelineEnd,
    }
  }, [])

  const maxRegion = Math.max(...data.byRegion.map((r) => r.count), 1)
  const maxTheme = Math.max(...data.byTheme.map((t) => t.count), 1)
  const visitedPct = countries.length
    ? Math.round((visited.length / countries.length) * 100)
    : 0

  return (
    <div className="container">
      <div className="page-head">
        <h1>Insights</h1>
        <p>A quick look at the numbers behind the atlas.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-card__label">Countries</p>
          <p className="stat-card__value">{countries.length}</p>
          <p className="stat-card__sub">{formatArea(data.totalArea)} combined</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">People represented</p>
          <p className="stat-card__value">{formatNumber(data.totalPopulation)}</p>
          <p className="stat-card__sub">Across every country in the atlas</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Landmarks</p>
          <p className="stat-card__value">{landmarks.length}</p>
          <p className="stat-card__sub">
            {people.length} people · {foods.length} foods
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Historical events</p>
          <p className="stat-card__value">{events.length}</p>
          <p className="stat-card__sub">
            {formatYear(data.timelineStart)} – {formatYear(data.timelineEnd)}
          </p>
        </div>
      </div>

      <section className="section-block">
        <h3>Countries by region</h3>
        <ul className="bar-list">
          {data.byRegion.map((row) => (
            <li className="bar-list__row" key={row.region}>
              <span className="bar-list__label">{row.region}</span>
              <span className="bar-list__track">
                <span
                  className="bar-list__fill"
                  style={{ width: `${(row.count / maxRegion) * 100}%` }}
                />
              </span>
              <span className="bar-list__count">{row.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-block">
        <h3>Countries by theme</h3>
        <ul className="bar-list">
          {data.byTheme.map((row) => (
            <li className="bar-list__row" key={row.theme}>
              <span className="bar-list__label">{titleCase(row.theme)}</span>
              <span className="bar-list__track">
                <span
                  className="bar-list__fill"
                  style={{ width: `${(row.count / maxTheme) * 100}%` }}
                />
              </span>
              <span className="bar-list__count">{row.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="split" style={{ marginTop: 36 }}>
        <section>
          <h3>Most populous</h3>
          <ul className="rank-list">
            {data.mostPopulous.map((c) => (
              <li key={c.id}>
                <span className="rank-list__flag" aria-hidden="true">
                  {c.flag}
                </span>
                <Link to={`/countries/${c.slug}`} className="rank-list__name">
                  {c.name}
                </Link>
                <span className="rank-list__value">
                  {formatNumber(c.population)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Largest by area</h3>
          <ul className="rank-list">
            {data.largest.map((c) => (
              <li key={c.id}>
                <span className="rank-list__flag" aria-hidden="true">
                  {c.flag}
                </span>
                <Link to={`/countries/${c.slug}`} className="rank-list__name">
                  {c.name}
                </Link>
                <span className="rank-list__value">{formatArea(c.area)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="section-block">
        <h3>Your journey</h3>
        <div className="stat-grid" style={{ marginBottom: 0 }}>
          <div className="stat-card">
            <p className="stat-card__label">Countries visited</p>
            <p className="stat-card__value">
              {visited.length} / {countries.length}
            </p>
            <p className="stat-card__sub">{visitedPct}% of the atlas</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Saved favorites</p>
            <p className="stat-card__value">{favorites.length}</p>
            <p className="stat-card__sub">Countries, people, landmarks</p>
          </div>
          <div className="stat-card" style={{ gridColumn: 'span 2' }}>
            <p className="stat-card__label">Progress</p>
            <span className="bar-list__track" style={{ display: 'block', marginTop: 10 }}>
              <span
                className="bar-list__fill"
                style={{ width: `${visitedPct}%` }}
              />
            </span>
            <p className="stat-card__sub" style={{ marginTop: 10 }}>
              {visitedPct === 100
                ? 'You’ve visited every country in the atlas. Impressive.'
                : 'Mark countries as visited from their detail pages to track your journey.'}
            </p>
            <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/atlas" className="btn btn--primary">
                Open the atlas
              </Link>
              <Link to="/quiz" className="btn btn--ghost">
                Take the quiz
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}