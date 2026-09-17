import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FavoriteKind, RecentItem, RecentKind } from '../lib/types'

/** Colour scheme preference. `system` follows the OS setting. */
export type ThemePreference = 'light' | 'dark' | 'system'

interface UserState {
  /** Encoded as `${kind}:${id}` so a single array can hold everything. */
  favorites: string[]
  recents: RecentItem[]
  /** Country IDs the user has marked as visited. */
  visited: string[]
  /** Free-form personal notes keyed by country ID. */
  notes: Record<string, string>
  /** Persisted colour scheme preference. */
  theme: ThemePreference

  toggleFavorite: (kind: FavoriteKind, id: string) => void
  clearFavorites: () => void

  addRecent: (kind: RecentKind, id: string) => void
  clearRecents: () => void

  toggleVisited: (countryId: string) => void
  clearVisited: () => void

  setNote: (countryId: string, note: string) => void

  setTheme: (theme: ThemePreference) => void
}

export const favoriteKey = (kind: FavoriteKind, id: string): string =>
  `${kind}:${id}`

const MAX_RECENTS = 12

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      favorites: [],
      recents: [],
      visited: [],
      notes: {},
      theme: 'system',

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

      toggleVisited: (countryId) =>
        set((state) => ({
          visited: state.visited.includes(countryId)
            ? state.visited.filter((id) => id !== countryId)
            : [...state.visited, countryId],
        })),

      clearVisited: () => set({ visited: [] }),

      setNote: (countryId, note) =>
        set((state) => {
          const next = { ...state.notes }
          if (note.trim()) next[countryId] = note
          else delete next[countryId]
          return { notes: next }
        }),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'atlas:user:v1',
    },
  ),
)