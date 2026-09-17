import type { MouseEvent } from 'react'
import { favoriteKey, useUserStore } from '../store/useUserStore'
import type { FavoriteKind } from '../lib/types'
import { cx } from '../lib/utils'

interface Props {
  kind: FavoriteKind
  id: string
  label?: string
}

export default function FavoriteButton({ kind, id, label }: Props) {
  const key = favoriteKey(kind, id)
  const isFav = useUserStore((s) => s.favorites.includes(key))
  const toggleFavorite = useUserStore((s) => s.toggleFavorite)

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(kind, id)
  }

  return (
    <button
      type="button"
      className={cx('fav-btn', isFav && 'is-active')}
      aria-pressed={isFav}
      aria-label={
        isFav
          ? `Remove ${label ?? id} from favorites`
          : `Add ${label ?? id} to favorites`
      }
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
      onClick={onClick}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={isFav ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}