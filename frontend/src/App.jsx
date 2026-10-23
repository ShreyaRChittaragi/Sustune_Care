import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Portal from './pages/Portal.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  return (
    <>
      {!isLanding && <Nav />}
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/portal/demo" element={<Portal demo />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isLanding && <Footer />}
    </>
  )
}
