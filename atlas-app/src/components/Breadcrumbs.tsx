import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

interface Props {
  items: Crumb[]
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`}>
            {c.to ? (
              <Link to={c.to}>{c.label}</Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}