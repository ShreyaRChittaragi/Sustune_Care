import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const hash = (id) => (pathname === '/' ? `#${id}` : `/#${id}`)
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="emblem">S</span>
          <span><b>SUSTUNE</b><b className="gold"> CARE</b><small>Aegis • Sparsh • NRIs</small></span>
        </Link>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        <nav className={open ? 'open' : ''} onClick={() => setOpen(false)}>
          <a href={hash('aegis')}>Aegis Property <em className="pill gold-pill">Real Estate</em></a>
          <a href={hash('sparsh')}>Sparsh Care <em className="pill green-pill">Parental Health</em></a>
          <Link to="/portal/demo">Client Portal <em className="pill blue-pill">Live Demo</em></Link>
          <a href={hash('estimator')}>Get Started</a>
          <Link to="/login" className="btn outline">Portal Login</Link>
          <a href={hash('book')} className="btn primary">Book Consultation</a>
        </nav>
      </div>
    </header>
  )
}
