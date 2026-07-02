import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AppLayout from './components/AppLayout'
import Games from './pages/Games'
import SignupPage from './pages/SignupPage'
import Homepage from './pages/Homepage'
import GameViewerPage from './pages/GameViewerPage'
import Leaderboard from './pages/Leaderboard'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/home" replace />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GameViewerPage/>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
