import './App.css'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AppLayout from './components/AppLayout'
import Homepage from './pages/Homepage'
import SignupPage from './pages/SignupPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<AppLayout/>}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Homepage/>} />
      </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
