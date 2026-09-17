import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the top on route change, or to the hash target when a
 * `#fragment` is present. The hash target is resolved after a microtask
 * so that the destination page has had a chance to render.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' })
        }
      }, 0)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}