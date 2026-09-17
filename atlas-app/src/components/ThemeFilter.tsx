import type { Theme } from '../lib/types'
import { cx, titleCase } from '../lib/utils'
import { useAtlasStore } from '../store/useAtlasStore'

const allThemes: Theme[] = [
  'culture',
  'food',
  'history',
  'architecture',
  'nature',
  'landmarks',
  'traditions',
  'art',
]

interface Props {
  themes?: Theme[]
  className?: string
}

export default function ThemeFilter({ themes = allThemes, className }: Props) {
  const activeThemes = useAtlasStore((s) => s.activeThemes)
  const toggleTheme = useAtlasStore((s) => s.toggleTheme)

  return (
    <div
      className={cx('chip-row', className)}
      role="group"
      aria-label="Filter by theme"
    >
      {themes.map((theme) => {
        const active = activeThemes.includes(theme)
        return (
          <button
            key={theme}
            type="button"
            className={cx('chip', active && 'is-active')}
            aria-pressed={active}
            onClick={() => toggleTheme(theme)}
          >
            {titleCase(theme)}
          </button>
        )
      })}
    </div>
  )
}