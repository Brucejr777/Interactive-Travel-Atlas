import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} · Interactive Travel Atlas` : 'Interactive Travel Atlas'
    return () => {
      document.title = previous
    }
  }, [title])
}