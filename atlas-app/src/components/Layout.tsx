import { useState } from 'react'
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
  const [open, setOpen] = useState(false)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container site-header__inner">
          <Link
            to="/"
            className="brand"
            aria-label="Interactive Travel Atlas home"
            onClick={() => setOpen(false)}
          >
            <span className="brand__mark" aria-hidden="true">
              A
            </span>
            <span className="brand__label">Interactive Travel Atlas</span>
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          <nav
            id="primary-nav"
            className={cx('site-nav', open && 'is-open')}
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cx('nav-link', isActive && 'is-active')
                }
                onClick={() => setOpen(false)}
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