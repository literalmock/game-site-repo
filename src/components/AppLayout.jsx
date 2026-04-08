import {useEffect, useState} from "react"
import {Outlet} from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import "./AppLayout.css"

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
    <div className={`app-layout ${theme === "dark" ? "app-layout--dark" : "app-layout--light"}`}>
      <Navbar isDark={theme === "dark"} onToggleTheme={toggleTheme} />
      <main className="app-layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout;