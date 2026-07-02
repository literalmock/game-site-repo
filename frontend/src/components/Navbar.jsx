import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import viewerGames from '../utils/viewerGames'
import { useAuth } from '../context/useAuth'
import { useGamesCatalog } from '../hooks/useGamesCatalog'
import { ChevronDown, Gamepad2, House, LogIn, LogOut, Menu, Search, Trophy, UserRound, X } from './ui/Icons'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '/home', icon: House },
  { label: 'Games', href: '/games', icon: Gamepad2 },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
]

const Navbar = () => {
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchActiveIndex, setSearchActiveIndex] = useState(-1)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const searchWrapRef = useRef(null)
  const accountMenuRef = useRef(null)
  const { games: catalogGames } = useGamesCatalog(viewerGames)

  const searchSuggestions = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, '')
    if (!normalizedQuery) return []

    const scoreGame = (title) => {
      const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '')

      const directIndex = normalizedTitle.indexOf(normalizedQuery)
      if (directIndex !== -1) {
        return 500 - directIndex * 4 - (normalizedTitle.length - normalizedQuery.length)
      }

      let pointer = 0
      let gaps = 0
      let firstMatch = -1
      let lastMatch = -1

      for (const char of normalizedQuery) {
        const matchIndex = normalizedTitle.indexOf(char, pointer)
        if (matchIndex === -1) return -1

        if (firstMatch === -1) firstMatch = matchIndex
        if (lastMatch !== -1) {
          gaps += matchIndex - lastMatch - 1
        }

        lastMatch = matchIndex
        pointer = matchIndex + 1
      }

      const span = lastMatch - firstMatch + 1
      return 300 - gaps * 8 - (span - normalizedQuery.length) * 4
    }

    return catalogGames
      .map((game) => ({ game, score: scoreGame(game.title) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((entry) => entry.game)
  }, [catalogGames, searchQuery])

  const openGameFromSearch = useCallback((game) => {
    if (!game?.id) return
    navigate(`/games/${game.id}`, { state: { game } })
    setSearchQuery('')
    setSearchActiveIndex(-1)
    setIsSearchOpen(false)
  }, [navigate])

  const handleSearchSubmit = useCallback((event) => {
    event.preventDefault()
    if (searchSuggestions.length === 0) return

    const pickedGame = searchActiveIndex >= 0
      ? searchSuggestions[searchActiveIndex]
      : searchSuggestions[0]

    openGameFromSearch(pickedGame)
  }, [openGameFromSearch, searchActiveIndex, searchSuggestions])

  const handleSearchInputKeyDown = useCallback((event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (searchSuggestions.length === 0) return
      setSearchActiveIndex((prev) => (prev + 1) % searchSuggestions.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (searchSuggestions.length === 0) return
      setSearchActiveIndex((prev) => {
        if (prev <= 0) return searchSuggestions.length - 1
        return prev - 1
      })
      return
    }

    if (event.key === 'Escape') {
      setIsSearchOpen(false)
      setSearchActiveIndex(-1)
    }
  }, [searchSuggestions.length])

  const handleLogout = useCallback(async () => {
    await logout()
    setMobileOpen(false)
    setAccountMenuOpen(false)
    navigate('/login', { replace: true })
  }, [logout, navigate])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchWrapRef.current?.contains(event.target)) {
        setIsSearchOpen(false)
        setSearchActiveIndex(-1)
      }

      if (!accountMenuRef.current?.contains(event.target)) {
        setAccountMenuOpen(false)
      }
    }

    window.addEventListener('mousedown', handleOutsideClick)
    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setAccountMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const displayName = user?.username || user?.fullname || 'Player'

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <div className="navbar-left">
            <Link to="/home" className="navbar-brand">
              <img src="/logo_bigtext.webp" alt="Gameverse" />
            </Link>
          </div>

          <div className="navbar-search-wrap" ref={searchWrapRef}>
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
              <Search size={18} className="navbar-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value)
                  setSearchActiveIndex(-1)
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleSearchInputKeyDown}
                placeholder="Search games"
                className="navbar-search-input"
                aria-label="Search available games"
              />
              <button type="submit" className="navbar-search-btn">Search</button>
            </form>

            {isSearchOpen && searchQuery.trim() ? (
              <ul className="navbar-search-suggestions" role="listbox" aria-label="Game suggestions">
                {searchSuggestions.length > 0 ? (
                  searchSuggestions.map((game, index) => (
                    <li key={game.id}>
                      <button
                        type="button"
                        className={`navbar-search-suggestion-item ${searchActiveIndex === index ? 'navbar-search-suggestion-item--active' : ''}`}
                        onMouseEnter={() => setSearchActiveIndex(index)}
                        onClick={() => openGameFromSearch(game)}
                      >
                        <span className="navbar-search-suggestion-title">{game.title}</span>
                        <span className="navbar-search-suggestion-category">{game.category}</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="navbar-search-empty">No matching games found</li>
                )}
              </ul>
            ) : null}
          </div>

          <div className="navbar-right">
            <nav className="navbar-links">
              {NAV_LINKS.map((navLink) => {
                const Icon = navLink.icon

                return (
                <NavLink
                  key={navLink.label}
                  to={navLink.href}
                  aria-label={navLink.label}
                  className={({ isActive }) =>
                    `nav-link nav-link--${navLink.label.toLowerCase().replace(/\s+/g, '-')} ${isActive ? 'is-active' : ''}`
                  }
                >
                  <Icon size={16} className="nav-link-icon" />
                  <span className="nav-link-label">
                    {navLink.label}
                  </span>
                </NavLink>
                )
              })}
            </nav>
            {isAuthenticated ? (
              <div className="navbar-user" ref={accountMenuRef}>
                <button
                  type="button"
                  className="navbar-user-trigger"
                  onClick={() => setAccountMenuOpen((open) => !open)}
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="menu"
                >
                  <UserRound size={14} />
                  <span className="navbar-user-name">{displayName}</span>
                  <ChevronDown size={14} className={`navbar-user-chevron ${accountMenuOpen ? 'is-open' : ''}`} />
                </button>

                {accountMenuOpen ? (
                  <div className="navbar-account-menu" role="menu">
                    <div className="navbar-account-card">
                      <span className="navbar-account-avatar" aria-hidden="true">
                        {displayName.slice(0, 1).toUpperCase()}
                      </span>
                      <div className="navbar-account-copy">
                        <span className="navbar-account-label">Account</span>
                        <span className="navbar-account-name">{displayName}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="navbar-account-item navbar-account-item--danger"
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                to="/login"
                className="signin-btn"
              >
                <LogIn size={14} />
                Sign In
              </Link>
            )}

            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileOpen(p => !p)}
              className="icon-btn mobile-menu-btn"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="navbar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`mobile-drawer ${mobileOpen ? 'mobile-drawer--open' : ''}`}
      >
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">Menu</span>
          <button type="button" onClick={() => setMobileOpen(false)} className="icon-btn mobile-close-btn">
            <X size={16} />
          </button>
        </div>

        <nav className="mobile-nav">
          {NAV_LINKS.map((navLink) => {
            const Icon = navLink.icon

            return (
              <NavLink
                key={navLink.label}
                to={navLink.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}
              >
                <Icon size={15} className="mobile-nav-icon" />
                {navLink.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="mobile-drawer-footer">
          {isAuthenticated ? (
            <button
              type="button"
              className="mobile-signin-btn mobile-signin-btn--button"
              onClick={handleLogout}
            >
              <LogOut size={14} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mobile-signin-btn"
              onClick={() => setMobileOpen(false)}
            >
              <LogIn size={14} />
              Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  )
}

export default Navbar
