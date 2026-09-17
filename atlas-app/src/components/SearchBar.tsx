import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDebounce } from '../hooks/useDebounce'
import { search } from '../lib/search'
import type { SearchResult } from '../lib/types'
import SearchSuggestions from './SearchSuggestions'

export default function SearchBar() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const initial = params.get('q') ?? ''

  const [value, setValue] = useState(initial)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const wrapperRef = useRef<HTMLFormElement>(null)

  const debounced = useDebounce(value, 160)
  const suggestions: SearchResult[] = debounced.trim()
    ? search(debounced).slice(0, 6)
    : []

  useEffect(() => {
    setValue(initial)
  }, [initial])

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  function go(href: string) {
    setOpen(false)
    setActiveIndex(-1)
    navigate(href)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      go(suggestions[activeIndex].href)
      return
    }
    if (!trimmed) {
      navigate('/search')
      return
    }
    go(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
      return
    }
    if (!open || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length)
    }
  }

  const showSuggestions = open && suggestions.length > 0

  return (
    <form
      ref={wrapperRef}
      className="search"
      role="search"
      onSubmit={onSubmit}
    >
      <span className="search__icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="m20 20-3.5-3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <input
        type="search"
        className="search__input"
        placeholder="Search countries, people, places…"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setOpen(true)
          setActiveIndex(-1)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        aria-label="Search"
        aria-autocomplete="list"
        aria-expanded={showSuggestions}
        autoComplete="off"
      />
      {showSuggestions && (
        <SearchSuggestions
          results={suggestions}
          activeIndex={activeIndex}
          onSelect={(r) => go(r.href)}
          onHover={setActiveIndex}
        />
      )}
    </form>
  )
}