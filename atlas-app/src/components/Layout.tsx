import { NavLink, Outlet, Link } from 'react-router-dom'
import { cx } from '../lib/utils'
import SearchBar from './SearchBar'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/atlas', label: 'Atlas' },
  { to: '/countries', label: 'Countries' },
  { to: '/people', label: 'People' },
]

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label="Interactive Travel Atlas home">
            <span className="brand__mark" aria-hidden="true">
              A
            </span>
            <span>Interactive Travel Atlas</span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cx('nav-link', isActive && 'is-active')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__search">
            <SearchBar />
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          Built with React, Vite, react-simple-maps, and world-atlas data.
        </div>
      </footer>
    </div>
  )
}