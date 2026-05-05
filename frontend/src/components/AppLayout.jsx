import {Outlet} from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ScrollToHash from "./ScrollToHash"
import "./AppLayout.css"

const AppLayout = () => {
  return (
    <div className="app-layout app-layout--dark">
      <ScrollToHash />
      <Navbar />
      <main className="app-layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout;
