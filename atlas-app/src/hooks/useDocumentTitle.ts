import { useEffect } from 'react'

const BASE_TITLE = 'Interactive Travel Atlas'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE_TITLE}` : BASE_TITLE
    // No cleanup: the next page's effect will overwrite the title anyway,
    // and restoring the previous title causes a visible flash.
  }, [title])
}