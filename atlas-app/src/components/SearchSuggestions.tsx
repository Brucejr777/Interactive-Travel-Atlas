import type { SearchResult } from '../lib/types'

interface Props {
  results: SearchResult[]
  activeIndex: number
  onSelect: (result: SearchResult) => void
  onHover: (index: number) => void
}

export default function SearchSuggestions({
  results,
  activeIndex,
  onSelect,
  onHover,
}: Props) {
  return (
    <ul className="search__suggestions" role="listbox" aria-label="Suggestions">
      {results.map((r, i) => {
        const isActive = i === activeIndex
        return (
          <li
            key={`${r.type}-${r.id}`}
            role="option"
            aria-selected={isActive}
          >
            <button
              type="button"
              className={`search__suggestion${isActive ? ' is-active' : ''}`}
              onMouseEnter={() => onHover(i)}
              onMouseDown={(e) => {
                // Prevent the input from losing focus before we navigate.
                e.preventDefault()
              }}
              onClick={() => onSelect(r)}
            >
              <span className="search__suggestion-icon" aria-hidden="true">
                {r.type === 'country' ? '🌍' : '•'}
              </span>
              <span>
                <span className="result-item__label">{r.label}</span>
                <br />
                <span className="result-item__sub">{r.secondary}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}