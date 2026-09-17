import { useNavigate } from 'react-router-dom'
import { countries } from '../data'

export default function RandomCountryButton() {
  const navigate = useNavigate()

  function go() {
    if (countries.length === 0) return
    const c = countries[Math.floor(Math.random() * countries.length)]
    navigate(`/countries/${c.slug}`)
  }

  return (
    <button
      type="button"
      className="icon-btn"
      aria-label="Open a random country"
      title="Random country"
      onClick={go}
    >
      <span aria-hidden="true">🎲</span>
    </button>
  )
}