import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { cx } from '../lib/utils'
import SearchBar from './SearchBar'
import ScrollTopButton from './ScrollTopButton'
import RandomCountryButton from './RandomCountryButton'
import ThemeToggle from './ThemeToggle'
import { useUserStore } from '../store/useUserStore'
import { useTheme } from '../hooks/useTheme'
import { useOnClickOutside } from '../hooks/useOnClickOutside'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/atlas', label: 'Atlas' },
  { to: '/countries', label: 'Countries' },
  { to: '/people', label: 'People' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/compare', label: 'Compare' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/insights', label: 'Insights' },
]

const footerNav = [
  { to: '/atlas', label: 'Atlas' },
  { to: '/countries', label: 'Countries' },
  { to: '/people', label: 'People' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/favorites', label: 'Favorites' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const favCount = useUserStore((s) => s.favorites.length)
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()

  useTheme()

  // Close the mobile menu when clicking outside the header.
  useOnClickOutside(headerRef, () => setOpen(false), open)

  // Close on route change so the next page never opens with the menu open.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Elevate the header once the user scrolls.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        const input = document.getElementById(
          'global-search',
        ) as HTMLInputElement | null
        if (input) {
          e.preventDefault()
          input.focus()
          input.select()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="app-shell">
      <header
        className={cx('site-header', scrolled && 'is-scrolled')}
        ref={headerRef}
      >
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

          <div className="site-header__actions">
            <RandomCountryButton />
            <Link
              to="/favorites"
              className="fav-link"
              aria-label={`Favorites (${favCount})`}
              title="Favorites"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={favCount > 0 ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {favCount > 0 && (
                <span className="fav-link__badge">{favCount}</span>
              )}
            </Link>
          </div>

          <div className="site-header__theme">
            <ThemeToggle />
          </div>

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
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer__inner">
            <div className="site-footer__brand">
              <span className="brand__mark" aria-hidden="true">
                A
              </span>
              <div>
                <strong>Interactive Travel Atlas</strong>
                <p>
                  An open atlas of countries, cultures, landmarks, foods, and
                  the people who shaped them.
                </p>
              </div>
            </div>

            <nav className="site-footer__nav" aria-label="Footer">
              {footerNav.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <p className="site-footer__copy">
            Built with React, Vite, react-simple-maps, and world-atlas data.
          </p>
        </div>
      </footer>

      <ScrollTopButton />
    </div>
  )
}