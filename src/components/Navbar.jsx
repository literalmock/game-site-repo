import { useState } from 'react'
import { Moon, Sun, Menu, X, House, Gamepad2, Trophy, LogIn, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '/home', icon: House },
  { label: 'Games', href: '/games', icon: Gamepad2 },
  { label: 'Leaderboard', href: '#', icon: Trophy },
]

const Navbar = ({ isDark, onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const themeClass = isDark ? 'navbar--dark' : 'navbar--light'

  return (
    <>
      <header className={`navbar ${themeClass}`}>
        <div className="navbar-inner">
          <div className="navbar-left">
            <Link to="/home" className="navbar-brand">
              <img src="/logo_bigtext.png" alt="Gameverse" />
            </Link>
          </div>

          <div className="navbar-search-wrap">
            <label className="navbar-search">
              <Search size={18} className="navbar-search-icon" />
              <input
                type="text"
                placeholder="Search games"
                className="navbar-search-input"
              />
            </label>
          </div>

          <div className="navbar-right">
            <nav className="navbar-links">
              {NAV_LINKS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  to={href}
                  aria-label={label}
                  className={`nav-link nav-link--${label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon size={16} className="nav-link-icon" />
                  <span className="nav-link-label">
                    {label}
                  </span>
                </Link>
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

            <Link
              to="/login"
              className="signin-btn"
            >
              <LogIn size={14} />
              Sign In
            </Link>

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
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              to={href}
              onClick={() => setMobileOpen(false)}
              className="mobile-nav-item"
            >
              <Icon size={15} className="mobile-nav-icon" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mobile-drawer-footer">
          <Link
            to="/login"
            className="mobile-signin-btn"
          >
            <LogIn size={14} />
            Sign In
          </Link>
        </div>
      </aside>
    </>
  )
}

export default Navbar
