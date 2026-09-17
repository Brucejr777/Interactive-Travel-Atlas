export type Region =
  | 'Europe'
  | 'Asia'
  | 'Africa'
  | 'North America'
  | 'South America'
  | 'Oceania'
  | 'Antarctica'

export type Theme =
  | 'culture'
  | 'food'
  | 'history'
  | 'architecture'
  | 'nature'
  | 'landmarks'
  | 'traditions'
  | 'art'

export type HistoricalCategory =
  | 'period'
  | 'event'
  | 'movement'
  | 'civilization'
  | 'person'
  | 'landmark'

export interface GeoPoint {
  lat: number
  lng: number
}

export interface RelatedLink {
  type: 'country' | 'region' | 'city' | 'landmark' | 'food' | 'event' | 'person'
  id: string
  label: string
}

export interface Person {
  id: string
  name: string
  birth?: string
  death?: string
  role: string
  countryId?: string
  description: string
  relatedEvents: string[]
  relatedLandmarks: string[]
  relatedFoods: string[]
  relatedPeople: string[]
  themes: Theme[]
}

export interface Food {
  id: string
  name: string
  countryId: string
  region?: string
  origin: string
  description: string
  ingredients: string[]
  culturalContext: string
  themes: Theme[]
  relatedLandmarks: string[]
  relatedEvents: string[]
  relatedFoods: string[]
  relatedPeople: string[]
}

export interface Landmark {
  id: string
  name: string
  countryId: string
  city?: string
  location: GeoPoint
  type: 'cultural' | 'natural' | 'historical' | 'modern'
  description: string
  historicalSignificance: string
  period: string
  themes: Theme[]
  relatedEvents: string[]
  relatedPeople: string[]
  relatedFoods: string[]
  relatedLandmarks: string[]
  relatedCountries: string[]
}

export interface HistoricalEvent {
  id: string
  name: string
  period: string
  startDate: number
  endDate?: number
  location: string
  countryIds: string[]
  description: string
  historicalContext: string
  category: HistoricalCategory
  themes: Theme[]
  relatedPeople: string[]
  relatedPlaces: string[]
  relatedEvents: string[]
  relatedLandmarks: string[]
  relatedFoods: string[]
  relatedCountries: string[]
}

export interface HistoricalPeriod {
  id: string
  name: string
  startYear: number
  endYear: number
  region: Region
  description: string
  themes: Theme[]
  events: string[]
  relatedCountries: string[]
  relatedPeople: string[]
  relatedLandmarks: string[]
}

export interface City {
  id: string
  name: string
  countryId: string
  location: GeoPoint
  population?: number
  description: string
  themes: Theme[]
  relatedLandmarks: string[]
  relatedFoods: string[]
  relatedEvents: string[]
}

export interface CulturalTradition {
  id: string
  name: string
  countryId: string
  category: string
  description: string
  themes: Theme[]
  relatedEvents: string[]
  relatedFoods: string[]
  relatedLandmarks: string[]
  relatedPeople: string[]
}

export interface CultureBlock {
  traditions: CulturalTradition[]
  clothing: string
  music: string
  art: string
  festivals: string
  architecture: string
  dailyLife: string
}

export interface Country {
  id: string
  name: string
  slug: string
  region: Region
  subregion?: string
  capital: string
  flag: string
  population: number
  area: number
  languages: string[]
  currency: string
  climate: string
  geography: string
  culturalRegions: string[]
  majorCities: string[]
  description: string
  editorialIntro: string
  themes: Theme[]
  heroImage: string
  galleryImages: string[]
  culture: CultureBlock
  foods: string[]
  landmarks: string[]
  historicalEvents: string[]
  historicalPeriods: string[]
  people: string[]
  relatedCountries: string[]
  neighboringCountries: string[]
  coordinates: GeoPoint
  color: string
}

export interface FeaturedStory {
  id: string
  title: string
  subtitle: string
  image: string
  href: string
  type: 'country' | 'event' | 'landmark' | 'food'
  countryId?: string
  themes: Theme[]
}

export interface ThemeCategory {
  id: Theme
  name: string
  description: string
  image: string
  href: string
  relatedCountryIds: string[]
  relatedEventIds: string[]
  relatedLandmarkIds: string[]
  relatedFoodIds: string[]
}

export interface AtlasConfig {
  name: string
  tagline: string
  intro: string
}

export interface SearchResult {
  type: 'country' | 'region' | 'city' | 'landmark' | 'food' | 'event' | 'person' | 'tradition'
  id: string
  label: string
  secondary: string
  href: string
  image?: string
  themes: Theme[]
  matchTerms: string[]
}