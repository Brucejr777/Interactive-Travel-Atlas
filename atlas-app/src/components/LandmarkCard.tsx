import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { Landmark } from '../lib/types'
import FavoriteButton from './FavoriteButton'

interface Props {
  landmark: Landmark
}

function LandmarkCardBase({ landmark }: Props) {
  return (
    <div className="card-wrap">
      <Link to={`/landmarks/${landmark.id}`} className="card" id={landmark.id}>
        <div className="card__tag">
          <span className="tag">{landmark.type}</span>
        </div>
        <h3 className="card__title">{landmark.name}</h3>
        <p className="card__meta">
          {landmark.city ? `${landmark.city} · ` : ''}
          {landmark.period}
        </p>
        <p className="card__desc">{landmark.description}</p>
      </Link>
      <div className="card-wrap__fav">
        <FavoriteButton
          kind="landmark"
          id={landmark.id}
          label={landmark.name}
        />
      </div>
    </div>
  )
}

const LandmarkCard = memo(LandmarkCardBase)
export default LandmarkCard