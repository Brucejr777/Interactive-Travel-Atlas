import { useEffect, useState } from 'react'
import { useUserStore } from '../store/useUserStore'

/**
 * Resolves the persisted `theme` preference into an effective
 * `'light' | 'dark'` value, following the OS setting when the preference is
 * `'system'` and staying in sync when the OS scheme changes at runtime.
 */
export function useResolvedTheme(): 'light' | 'dark' {
  const theme = useUserStore((s) => s.theme)
  const [systemDark, setSystemDark] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    function onChange(e: MediaQueryListEvent) {
      setSystemDark(e.matches)
    }
    // Safari < 14 falls back to the deprecated addListener API.
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(mql as any).addListener(onChange)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => (mql as any).removeListener(onChange)
  }, [])

  if (theme === 'system') return systemDark ? 'dark' : 'light'
  return theme
}