import { useEffect } from 'react'
import { useUserStore } from '../store/useUserStore'

/**
 * Applies the persisted theme preference to `<html data-theme="…">`.
 *
 * When the preference is `system` the attribute is removed so the
 * `prefers-color-scheme` media query in `index.css` takes over.
 */
export function useTheme() {
  const theme = useUserStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme])

  return theme
}