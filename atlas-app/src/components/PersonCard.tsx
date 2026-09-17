import { Link } from 'react-router-dom'
import type { Person } from '../lib/types'
import { titleCase } from '../lib/utils'
import FavoriteButton from './FavoriteButton'

interface Props {
  person: Person
}

export default function PersonCard({ person }: Props) {
  const dates =
    person.birth && person.death
      ? `${person.birth}–${person.death}`
      : person.birth
        ? `b. ${person.birth}`
        : ''

  return (
    <div className="card-wrap">
      <Link to={`/people/${person.id}`} className="card">
        <span className="tag">{titleCase(person.themes[0] ?? 'person')}</span>
        <h3 className="card__title" style={{ marginTop: 10 }}>
          {person.name}
        </h3>
        <p className="card__meta">
          {person.role}
          {dates ? ` · ${dates}` : ''}
        </p>
        <p className="card__desc">{person.description}</p>
      </Link>
      <div className="card-wrap__fav">
        <FavoriteButton kind="person" id={person.id} label={person.name} />
      </div>
    </div>
  )
}