import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setToken } from '../api.js'

export default function Login() {
  const [f, setF] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const nav = useNavigate()
  async function submit(e) {
    e.preventDefault(); setErr('')
    try {
      const r = await api.login(f)
      setToken(r.token)
      nav(r.user.role === 'admin' ? '/admin' : '/portal')
    } catch (e) { setErr(e.message) }
  }
  return (
    <section className="section"><div className="container narrow">
      <h2>Dual-Shield Client Portal</h2>
      <form className="card form" onSubmit={submit}>
        <input required type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <input required type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        {err && <p className="error">{err}</p>}
        <button className="btn primary">Sign in</button>
        <p className="small">Want a look first? <a href="/portal/demo">Open the live demo</a>.</p>
      </form>
    </div></section>
  )
}
