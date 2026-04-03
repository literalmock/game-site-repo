import { useState } from 'react'
import { Moon, Sun, Menu, X, House, Gamepad2, Trophy, LogIn, Search } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#', icon: House },
  { label: 'Games', href: '#', icon: Gamepad2 },
  { label: 'Leaderboard', href: '#', icon: Trophy },
]

const Navbar = ({ isDark, onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const bg = isDark ? 'bg-slate-950/95' : 'bg-white/95'
  const border = isDark ? 'border-slate-800' : 'border-slate-200'
  const text = isDark ? 'text-slate-100' : 'text-slate-900'
  const link = isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
  const input = isDark
    ? 'border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500'
    : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400'
  const iconBtn = isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
  const mobileItem = isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-colors duration-300 ${bg} ${border}`}
      >
        <div className="mx-auto grid h-14 w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <a href="/" className={`text-base font-semibold tracking-tight ${text}`}>
              Gameverse
            </a>

            <nav className="hidden items-center gap-2 md:flex">
              {NAV_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`group flex h-9 items-center rounded-md px-2 text-sm transition-colors ${link}`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:max-w-24 group-hover:opacity-100">
                    {label}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden w-full justify-center md:flex">
            <label className={`flex h-9 w-full max-w-sm items-center gap-2 rounded-md border px-3 ${input}`}>
              <Search size={14} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
              <input
                type="text"
                placeholder="Search games"
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
          </div>

          <div className="flex items-center gap-2 justify-self-end">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Light mode' : 'Dark mode'}
              className={`grid h-9 w-9 place-items-center rounded-md transition-colors ${iconBtn}`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="/login"
              className="hidden h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-medium sm:flex"
            >
              <LogIn size={14} />
              Sign In
            </a>

            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileOpen(p => !p)}
              className={`grid h-9 w-9 place-items-center rounded-md transition-colors md:hidden ${iconBtn}`}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 border-r bg-white shadow-xl transition-transform duration-200 ease-in-out md:hidden dark:bg-slate-900 ${border}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className={`flex h-16 items-center justify-between border-b px-5 ${border}`}>
          <span className={`text-base font-semibold ${text}`}>Menu</span>
          <button type="button" onClick={() => setMobileOpen(false)} className={`grid h-8 w-8 place-items-center rounded-lg ${iconBtn}`}>
            <X size={16} />
          </button>
        </div>

        <nav className="px-3 py-3 space-y-0.5">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${mobileItem}`}
            >
              <Icon size={15} />
              {label}
            </a>
          ))}
        </nav>

        <div className={`absolute bottom-0 left-0 right-0 border-t px-4 py-4 ${border}`}>
          <a
            href="/login"
            className={`flex h-9 w-full items-center justify-center gap-1.5 rounded-md border text-sm font-medium ${mobileItem}`}
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
