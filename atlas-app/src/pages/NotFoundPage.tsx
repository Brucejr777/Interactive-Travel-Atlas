import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Not found')

  return (
    <div className="container">
      <div className="empty">
        <h2>Page not found</h2>
        <p>The page you’re looking for doesn’t exist in this atlas.</p>
        <p style={{ marginTop: 16 }}>
          <Link to="/" className="btn btn--primary">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}