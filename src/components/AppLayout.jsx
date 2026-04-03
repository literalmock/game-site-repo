import {useEffect, useState} from "react"
import {Outlet} from "react-router-dom"
import Navbar from "./Navbar"

const AppLayout = () => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    localStorage.setItem("theme", nextTheme)
  }

  return (
    <div className={`min-h-screen transition-colors ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"}`}>
      <Navbar isDark={theme === "dark"} onToggleTheme={toggleTheme} />
      <main className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5 lg:px-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout;