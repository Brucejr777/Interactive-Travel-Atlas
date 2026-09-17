import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SearchBar() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const initial = params.get('q') ?? ''
  const [value, setValue] = useState(initial)

  useEffect(() => {
    setValue(initial)
  }, [initial])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const q = value.trim()
    if (!q) {
      navigate('/search')
      return
    }
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <form className="search" role="search" onSubmit={onSubmit}>
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
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search"
      />
    </form>
  )
}