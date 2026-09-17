import type { Landmark } from '../lib/types'

interface Props {
  landmark: Landmark
}

export default function LandmarkCard({ landmark }: Props) {
  return (
    <div className="card" id={landmark.id}>
      <span className="tag">{landmark.type}</span>
      <h3 className="card__title" style={{ marginTop: 10 }}>
        {landmark.name}
      </h3>
      <p className="card__meta">
        {landmark.city ?? ''} · {landmark.period}
      </p>
      <p className="card__desc">{landmark.description}</p>
    </div>
  )
}