import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setToken } from '../api.js'

const fmt = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const flag = (v) => (v.spo2 < 94 || parseInt(v.bp) > 150 || v.pulse > 110 ? 'warn' : 'ok')

export default function Portal({ demo }) {
  const [d, setD] = useState(null)
  const [err, setErr] = useState('')
  const nav = useNavigate()
  useEffect(() => {
    (demo ? api.portalDemo() : api.portalMe()).then(setD).catch((e) => { setErr(e.message); if (!demo) nav('/login') })
  }, [demo])
  if (err && !d) return <section className="section"><div className="container"><p className="error">{err}</p></div></section>
  if (!d) return <section className="section"><div className="container">Loading…</div></section>
  return (
    <section className="section"><div className="container">
      {demo && <div className="banner">You're viewing a demo with sample data. <a href="/#book">Book a consultation →</a></div>}
      <div className="row between">
        <h2>Welcome, {d.client.name}</h2>
        {!demo && <button className="btn outline" onClick={() => { setToken(null); nav('/') }}>Sign out</button>}
      </div>

      <h3>🛡️ Aegis – Properties</h3>
      <div className="grid2">
        {d.properties.map((p) => (
          <div className="card" key={p.id}>
            <h4>{p.name}</h4><small>{p.city}</small>
            <div className="line"><span>Monthly rent</span><b>₹{p.monthly_rent_inr.toLocaleString('en-IN')}</b></div>
            <div className="line"><span>Tenant</span><b>{p.tenant}</b></div>
            <div className="line"><span>Rent status</span><b>{p.rent_status}</b></div>
            <div className="line"><span>Last 80-pt inspection</span><b>{p.last_inspection} · {p.inspection_score}/100</b></div>
          </div>
        ))}
      </div>

      {d.parents.map((pr) => (
        <div key={pr.id}>
          <h3>💙 Sparsh – {pr.name} ({pr.age}, {pr.city})</h3>
          <p className="small">Care companion: <b>{pr.companion || 'Assigning'}</b></p>
          <div className="grid2">
            <div className="card">
              <h4>Recent vitals</h4>
              <table><thead><tr><th>Date</th><th>BP</th><th>Pulse</th><th>SpO₂</th><th>Sugar</th></tr></thead>
                <tbody>{pr.vitals.map((v, i) => <tr key={i} className={flag(v)}><td>{fmt(v.recorded_at)}</td><td>{v.bp}</td><td>{v.pulse}</td><td>{v.spo2}%</td><td>{v.sugar ?? '—'}</td></tr>)}</tbody></table>
            </div>
            <div className="card">
              <h4>Appointments</h4>
              {pr.appointments.map((a) => (
                <div className="item" key={a.id}>
                  <b>{a.doctor}</b> · {a.hospital}<br /><small>{fmt(a.when)} · <span className={'status ' + a.status}>{a.status}</span></small>
                  {a.summary && <p>{a.summary}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div></section>
  )
}
