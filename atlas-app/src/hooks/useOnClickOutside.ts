import { useEffect, useRef, type RefObject } from 'react'

/**
 * Calls `handler` whenever a pointer event occurs outside `ref`.
 * `enabled` lets callers attach/detach the listener conditionally.
 *
 * The handler is stored in a ref so the caller does not need to memoise it.
 */
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (e: MouseEvent | TouchEvent) => void,
  enabled = true,
) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    if (!enabled) return

    function listener(e: MouseEvent | TouchEvent) {
      const el = ref.current
      if (!el || el.contains(e.target as Node)) return
      handlerRef.current(e)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, enabled])
}