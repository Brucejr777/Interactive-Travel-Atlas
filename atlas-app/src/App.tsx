import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import AtlasPage from './pages/AtlasPage'
import CountriesPage from './pages/CountriesPage'
import CountryPage from './pages/CountryPage'
import PeoplePage from './pages/PeoplePage'
import PersonPage from './pages/PersonPage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'
import FavoritesPage from './pages/FavoritesPage'
import ComparePage from './pages/ComparePage'
import TimelinePage from './pages/TimelinePage'
import LandmarkPage from './pages/LandmarkPage'
import QuizPage from './pages/QuizPage'
import StatsPage from './pages/StatsPage'

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="atlas" element={<AtlasPage />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="countries/:slug" element={<CountryPage />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:id" element={<PersonPage />} />
          <Route path="landmarks/:id" element={<LandmarkPage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="insights" element={<StatsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}