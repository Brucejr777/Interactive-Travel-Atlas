import { Link } from 'react-router-dom'
import type { Country } from '../lib/types'
import { formatArea, formatNumber } from '../lib/utils'
import FavoriteButton from './FavoriteButton'

interface Props {
  country: Country
}

export default function CountryCard({ country }: Props) {
  return (
    <div className="card-wrap">
      <Link to={`/countries/${country.slug}`} className="card">
        <div className="card__flag" aria-hidden="true">
          {country.flag}
        </div>
        <h3 className="card__title">{country.name}</h3>
        <p className="card__meta">
          {country.region} · {country.capital}
        </p>
        <p className="card__desc">{country.description}</p>
        <p className="card__meta" style={{ marginTop: 12 }}>
          {formatNumber(country.population)} people · {formatArea(country.area)}
        </p>
      </Link>
      <div className="card-wrap__fav">
        <FavoriteButton kind="country" id={country.id} label={country.name} />
      </div>
    </div>
  )
}