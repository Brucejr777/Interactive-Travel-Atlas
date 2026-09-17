import type { SearchResult } from './types'
import { countries } from '../data/countries'
import { landmarks } from '../data/landmarks'
import { events } from '../data/events'
import { foods } from '../data/foods'
import { people } from '../data/people'

function matches(haystack: string[], needle: string): boolean {
  if (!needle) return true
  return haystack.some((h) => h.toLowerCase().includes(needle))
}

function countrySlug(id: string): string {
  const c = countries.find((x) => x.id === id)
  return c?.slug ?? ''
}

export function buildIndex(): SearchResult[] {
  const results: SearchResult[] = []

  for (const c of countries) {
    results.push({
      type: 'country',
      id: c.id,
      label: `${c.flag}  ${c.name}`,
      secondary: `${c.region} · ${c.capital}`,
      href: `/countries/${c.slug}`,
      themes: c.themes,
      matchTerms: [
        c.name,
        c.capital,
        c.region,
        c.slug,
        ...c.majorCities,
        ...c.culturalRegions,
      ],
    })
  }

  for (const l of landmarks) {
    results.push({
      type: 'landmark',
      id: l.id,
      label: l.name,
      secondary: `${l.city ?? l.countryId} · ${l.type}`,
      href: `/countries/${countrySlug(l.countryId)}#${l.id}`,
      themes: l.themes,
      matchTerms: [l.name, l.city ?? '', l.period, l.description],
    })
  }

  for (const e of events) {
    results.push({
      type: 'event',
      id: e.id,
      label: e.name,
      secondary: `${e.period} · ${e.location}`,
      href: `/countries/${countrySlug(e.countryIds[0] ?? '')}#${e.id}`,
      themes: e.themes,
      matchTerms: [e.name, e.period, e.location, e.description],
    })
  }

  for (const f of foods) {
    results.push({
      type: 'food',
      id: f.id,
      label: f.name,
      secondary: `${f.origin} · ${f.countryId}`,
      href: `/countries/${countrySlug(f.countryId)}#${f.id}`,
      themes: f.themes,
      matchTerms: [f.name, f.origin, f.description, ...f.ingredients],
    })
  }

  for (const p of people) {
    results.push({
      type: 'person',
      id: p.id,
      label: p.name,
      secondary: p.role,
      href: `/people/${p.id}`,
      themes: p.themes,
      matchTerms: [p.name, p.role, p.description],
    })
  }

  return results
}

/** Lazily-built, module-level cache of the search index. */
let cachedIndex: SearchResult[] | null = null

export function getSearchIndex(): SearchResult[] {
  if (!cachedIndex) cachedIndex = buildIndex()
  return cachedIndex
}

export function search(
  query: string,
  index: SearchResult[] = getSearchIndex(),
): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return index
    .filter((r) => matches(r.matchTerms, q) || r.label.toLowerCase().includes(q))
    .slice(0, 60)
}