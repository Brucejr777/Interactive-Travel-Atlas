import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AtlasPage from './pages/AtlasPage'
import CountriesPage from './pages/CountriesPage'
import CountryPage from './pages/CountryPage'
import PeoplePage from './pages/PeoplePage'
import PersonPage from './pages/PersonPage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="atlas" element={<AtlasPage />} />
        <Route path="countries" element={<CountriesPage />} />
        <Route path="countries/:slug" element={<CountryPage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="people/:id" element={<PersonPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}