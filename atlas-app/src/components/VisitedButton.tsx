import type { MouseEvent } from 'react'
import { useUserStore } from '../store/useUserStore'
import { cx } from '../lib/utils'

interface Props {
  countryId: string
  label?: string
}

export default function VisitedButton({ countryId, label }: Props) {
  const visited = useUserStore((s) => s.visited.includes(countryId))
  const toggleVisited = useUserStore((s) => s.toggleVisited)

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    toggleVisited(countryId)
  }

  return (
    <button
      type="button"
      className={cx('visited-btn', visited && 'is-active')}
      aria-pressed={visited}
      aria-label={
        visited
          ? `Mark ${label ?? countryId} as not visited`
          : `Mark ${label ?? countryId} as visited`
      }
      title={visited ? 'Visited' : 'Mark as visited'}
      onClick={onClick}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span>{visited ? 'Visited' : 'Mark visited'}</span>
    </button>
  )
}