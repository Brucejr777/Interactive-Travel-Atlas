import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the top on route change, or to the hash target when a
 * `#fragment` is present. Because the destination page may render
 * asynchronously (lazy chunks, data lookups), the hash target is retried a
 * few times before falling back to the top of the page.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    let cancelled = false
    let attempts = 0
    const MAX_ATTEMPTS = 12
    const RETRY_MS = 40

    function tryScroll() {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      attempts += 1
      if (attempts < MAX_ATTEMPTS) {
        window.setTimeout(tryScroll, RETRY_MS)
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    }

    tryScroll()
    return () => {
      cancelled = true
    }
  }, [pathname, hash])

  return null
}