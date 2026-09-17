import { create } from 'zustand'
import type { Theme } from '../lib/types'

interface AtlasState {
  selectedCountryId: string | null
  hoveredCountryId: string | null
  activeThemes: Theme[]
  setSelectedCountry: (id: string | null) => void
  setHoveredCountry: (id: string | null) => void
  toggleTheme: (theme: Theme) => void
  setThemes: (themes: Theme[]) => void
  clearThemes: () => void
}

export const useAtlasStore = create<AtlasState>((set) => ({
  selectedCountryId: null,
  hoveredCountryId: null,
  activeThemes: [],
  setSelectedCountry: (id) => set({ selectedCountryId: id }),
  setHoveredCountry: (id) => set({ hoveredCountryId: id }),
  toggleTheme: (theme) =>
    set((state) => ({
      activeThemes: state.activeThemes.includes(theme)
        ? state.activeThemes.filter((t) => t !== theme)
        : [...state.activeThemes, theme],
    })),
  setThemes: (themes) => set({ activeThemes: themes }),
  clearThemes: () => set({ activeThemes: [] }),
}))