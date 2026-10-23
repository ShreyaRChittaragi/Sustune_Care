import { useState } from 'react'
import { api } from '../api.js'

export default function BookForm({ quote }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', country: '', interest: 'both', city: 'Bengaluru', preferred_slot: '', message: '' })
  const [state, setState] = useState({ busy: false, done: false, error: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setState({ busy: true, done: false, error: '' })
    try {
      await api.createLead({ ...f, quote_monthly_usd: quote?.net_usd ?? null })
      setState({ busy: false, done: true, error: '' })
    } catch (err) {
      setState({ busy: false, done: false, error: err.message })
    }
  }
  return (
    <section className="section cta" id="book">
      <div className="container narrow">
        <h2>Stop worrying across time zones.<br /><span className="gold">Start experiencing true peace of mind.</span></h2>
        <p className="sub light">Schedule a confidential virtual consultation with a dedicated NRI Care Director. Zero obligation.</p>
        {state.done ? (
          <div className="card success"><h3>Request received ✓</h3><p>Our NRI Care Director will contact you within one business day, aligned to your time zone.</p></div>
        ) : (
          <form className="card form" onSubmit={submit}>
            <div className="grid2">
              <input required placeholder="Full name" value={f.name} onChange={set('name')} />
              <input required type="email" placeholder="Email" value={f.email} onChange={set('email')} />
              <input placeholder="Phone / WhatsApp (with country code)" value={f.phone} onChange={set('phone')} />
              <input placeholder="Country of residence" value={f.country} onChange={set('country')} />
              <select value={f.interest} onChange={set('interest')}>
                <option value="both">Dual-Shield (Both)</option><option value="aegis">Aegis (Property)</option><option value="sparsh">Sparsh (Parental Care)</option>
              </select>
              <select value={f.city} onChange={set('city')}>{['Bengaluru', 'Hyderabad', 'Delhi NCR', 'Pune', 'Chennai'].map((c) => <option key={c}>{c}</option>)}</select>
            </div>
            <input placeholder="Preferred call time & time zone (e.g. Sat 9am PST)" value={f.preferred_slot} onChange={set('preferred_slot')} />
            <textarea rows="3" placeholder="Tell us about your property or parents' needs" value={f.message} onChange={set('message')} />
            {quote && <p className="small">Attached estimate: <b>${quote.net_usd}/month</b></p>}
            {state.error && <p className="error">{state.error}</p>}
            <button className="btn gold-btn" disabled={state.busy}>{state.busy ? 'Sending…' : 'Book Virtual NRI Consultation'}</button>
          </form>
        )}
      </div>
    </section>
  )
}
