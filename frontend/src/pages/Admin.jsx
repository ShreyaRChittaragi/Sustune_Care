import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setToken } from '../api.js'

const STATUSES = ['new', 'contacted', 'scheduled', 'won', 'lost']

export default function Admin() {
  const [leads, setLeads] = useState([])
  const [filter, setFilter] = useState('')
  const nav = useNavigate()
  const load = () => api.leads().then(setLeads).catch(() => nav('/login'))
  useEffect(() => { load() }, [])
  async function change(id, status) {
    const u = await api.setLeadStatus(id, status)
    setLeads((ls) => ls.map((l) => (l.id === id ? u : l)))
  }
  const shown = filter ? leads.filter((l) => l.status === filter) : leads
  return (
    <section className="section"><div className="container">
      <div className="row between"><h2>Leads ({shown.length})</h2>
        <div className="row">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          <button className="btn outline" onClick={() => { setToken(null); nav('/') }}>Sign out</button>
        </div>
      </div>
      <div className="scroll"><table>
        <thead><tr><th>When</th><th>Name</th><th>Contact</th><th>Country</th><th>Interest</th><th>City</th><th>Quote</th><th>Slot / Message</th><th>Status</th></tr></thead>
        <tbody>{shown.map((l) => (
          <tr key={l.id}>
            <td>{new Date(l.created_at).toLocaleString()}</td><td>{l.name}</td>
            <td>{l.email}<br />{l.phone}</td><td>{l.country}</td><td>{l.interest}</td><td>{l.city}</td>
            <td>{l.quote_monthly_usd ? `$${l.quote_monthly_usd}/mo` : '—'}</td>
            <td><b>{l.preferred_slot}</b><br />{l.message}</td>
            <td><select value={l.status} onChange={(e) => change(l.id, e.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></td>
          </tr>
        ))}</tbody>
      </table></div>
    </div></section>
  )
}
