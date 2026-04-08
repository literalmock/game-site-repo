import { useState } from 'react'
import { Moon, Sun, Menu, X, LogIn } from 'lucide-react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#', icon: '/icons/home.png' },
  { label: 'Games', href: '#', icon: '/icons/games.png' },
  { label: 'Leaderboard', href: '#', icon: '/icons/leaderboard.png' },
]

const Navbar = ({ isDark, onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const themeClass = isDark ? 'navbar--dark' : 'navbar--light'

  return (
    <>
      <header className={`navbar ${themeClass}`}>
        <div className="navbar-inner">
          <div className="navbar-left">
            <a href="/" className="navbar-brand">
              <img src="/logo_bigtext.png" alt="Gameverse" />
            </a>
          </div>

          <div className="navbar-search-wrap">
            <label className="navbar-search">
              <img src="/icons/search.png" alt="" className="navbar-search-icon" />
              <input
                type="text"
                placeholder="Search games"
                className="navbar-search-input"
              />
            </label>
          </div>

          <div className="navbar-right">
            <nav className="navbar-links">
              {NAV_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="nav-link"
                >
                  <img src={icon} alt="" className="nav-link-icon" />
                  <span className="nav-link-label">
                    {label}
                  </span>
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Light mode' : 'Dark mode'}
              className="icon-btn"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="/login"
              className="signin-btn"
            >
              <LogIn size={14} />
              Sign In
            </a>

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
        className={`mobile-drawer ${themeClass} ${mobileOpen ? 'mobile-drawer--open' : ''}`}
      >
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">Menu</span>
          <button type="button" onClick={() => setMobileOpen(false)} className="icon-btn mobile-close-btn">
            <X size={16} />
          </button>
        </div>

        <nav className="mobile-nav">
          {NAV_LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="mobile-nav-item"
            >
              <img src={icon} alt="" className="mobile-nav-icon" />
              {label}
            </a>
          ))}
        </nav>

        <div className="mobile-drawer-footer">
          <a
            href="/login"
            className="mobile-signin-btn"
          >
            <LogIn size={14} />
            Sign In
          </a>
        </div>
      </aside>
    </>
  )
}

export default Navbar
