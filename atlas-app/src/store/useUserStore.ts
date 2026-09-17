import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FavoriteKind, RecentItem, RecentKind } from '../lib/types'

interface UserState {
  /** Encoded as `${kind}:${id}` so a single Set-like array can hold everything. */
  favorites: string[]
  recents: RecentItem[]
  toggleFavorite: (kind: FavoriteKind, id: string) => void
  clearFavorites: () => void
  addRecent: (kind: RecentKind, id: string) => void
  clearRecents: () => void
}

export const favoriteKey = (kind: FavoriteKind, id: string): string =>
  `${kind}:${id}`

const MAX_RECENTS = 12

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      favorites: [],
      recents: [],

      toggleFavorite: (kind, id) => {
        const k = favoriteKey(kind, id)
        set((state) => ({
          favorites: state.favorites.includes(k)
            ? state.favorites.filter((x) => x !== k)
            : [...state.favorites, k],
        }))
      },

      clearFavorites: () => set({ favorites: [] }),

      addRecent: (kind, id) => {
        set((state) => {
          const filtered = state.recents.filter(
            (r) => !(r.kind === kind && r.id === id),
          )
          const next: RecentItem[] = [
            { kind, id, viewedAt: Date.now() },
            ...filtered,
          ].slice(0, MAX_RECENTS)
          return { recents: next }
        })
      },

      clearRecents: () => set({ recents: [] }),
    }),
    {
      name: 'atlas:user:v1',
    },
  ),
)