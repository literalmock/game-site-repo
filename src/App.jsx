import './App.css'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AppLayout from './components/AppLayout'
import Games from './pages/Games'
import SignupPage from './pages/SignupPage'
import Homepage from './pages/Homepage'
import GameViewerPage from './pages/GameViewerPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<AppLayout/>}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/games" element={<Games />} />
        <Route path="/play" element={<GameViewerPage />} />
      </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
