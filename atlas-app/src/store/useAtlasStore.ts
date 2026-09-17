import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Region, Theme } from '../lib/types'

interface AtlasState {
  selectedCountryId: string | null
  hoveredCountryId: string | null
  activeThemes: Theme[]
  activeRegions: Region[]
  setSelectedCountry: (id: string | null) => void
  setHoveredCountry: (id: string | null) => void
  toggleTheme: (theme: Theme) => void
  toggleRegion: (region: Region) => void
  setThemes: (themes: Theme[]) => void
  setRegions: (regions: Region[]) => void
  clearFilters: () => void
}

export const useAtlasStore = create<AtlasState>()(
  persist(
    (set) => ({
      selectedCountryId: null,
      hoveredCountryId: null,
      activeThemes: [],
      activeRegions: [],
      setSelectedCountry: (id) => set({ selectedCountryId: id }),
      setHoveredCountry: (id) => set({ hoveredCountryId: id }),
      toggleTheme: (theme) =>
        set((state) => ({
          activeThemes: state.activeThemes.includes(theme)
            ? state.activeThemes.filter((t) => t !== theme)
            : [...state.activeThemes, theme],
        })),
      toggleRegion: (region) =>
        set((state) => ({
          activeRegions: state.activeRegions.includes(region)
            ? state.activeRegions.filter((r) => r !== region)
            : [...state.activeRegions, region],
        })),
      setThemes: (themes) => set({ activeThemes: themes }),
      setRegions: (regions) => set({ activeRegions: regions }),
      clearFilters: () => set({ activeThemes: [], activeRegions: [] }),
    }),
    {
      name: 'atlas:filters:v1',
      // Only persist the filter selections; transient hover/selection state
      // should always start empty.
      partialize: (state) => ({
        activeThemes: state.activeThemes,
        activeRegions: state.activeRegions,
      }),
    },
  ),
)