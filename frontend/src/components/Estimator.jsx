import { useEffect, useState } from 'react'
import { api } from '../api.js'

const CITIES = ['Bengaluru', 'Hyderabad', 'Delhi NCR', 'Pune', 'Chennai']
const TIERS = [['essential', 'Essential SOS', '24/7 SOS & Emergency + Monthly Vitals'], ['comprehensive', 'Comprehensive', 'Doctor Escorts + Bi-Weekly Vitals + Weekly Visits'], ['full', 'Full Concierge', 'Unlimited Escorts + 3x Weekly Visits + Dedicated Nurse']]
const CURRENCIES = ['USD', 'GBP', 'AED', 'AUD', 'CAD']
const fmtINR = (n) => '₹' + n.toLocaleString('en-IN')

export default function Estimator({ onQuote }) {
  const [f, setF] = useState({ city: 'Bengaluru', aegis: true, sparsh: true, monthly_rent_inr: 65000, sparsh_tier: 'comprehensive', currency: 'USD' })
  const [q, setQ] = useState(null)
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))

  useEffect(() => {
    if (!f.aegis && !f.sparsh) return
    const t = setTimeout(() => api.quote(f).then((r) => { setQ(r); onQuote?.({ ...r, ...f }) }).catch(() => {}), 200)
    return () => clearTimeout(t)
  }, [f])

  const wa = q && `https://wa.me/918007878863?text=${encodeURIComponent(`Hi Sustune, my Dual-Shield estimate is $${q.net_usd}/month (${f.city}). Please call me.`)}`
  return (
    <section className="section" id="estimator">
      <div className="container">
        <span className="tag">Interactive TCO &amp; ROI Simulator</span>
        <h2>Transparent Diaspora Care Estimator</h2>
        <p className="sub">No hidden broker fees, zero markup on maintenance.</p>
        <div className="grid2">
          <div className="card">
            <h4>1. Target Metropolitan Hub</h4>
            <div className="chips">{CITIES.map((c) => <button key={c} className={f.city === c ? 'chip on' : 'chip'} onClick={() => set('city', c)}>{c}</button>)}</div>
            <h4>2. Scope of Stewardship</h4>
            <div className="chips">
              <button className={f.aegis ? 'chip on' : 'chip'} onClick={() => set('aegis', !f.aegis)}>Aegis Property Shield</button>
              <button className={f.sparsh ? 'chip on' : 'chip'} onClick={() => set('sparsh', !f.sparsh)}>Sparsh Parental Care</button>
            </div>
            {f.aegis && (<>
              <h4>Monthly Rental Value: {fmtINR(f.monthly_rent_inr)}</h4>
              <input type="range" min="25000" max="250000" step="5000" value={f.monthly_rent_inr} onChange={(e) => set('monthly_rent_inr', +e.target.value)} />
            </>)}
            {f.sparsh && (<>
              <h4>Sparsh Healthcare Tier</h4>
              {TIERS.map(([k, name, desc]) => (
                <label key={k} className={'tier' + (f.sparsh_tier === k ? ' on' : '')}>
                  <input type="radio" checked={f.sparsh_tier === k} onChange={() => set('sparsh_tier', k)} /> <b>{name}</b><small>{desc}</small>
                </label>
              ))}
            </>)}
            <h4>Currency</h4>
            <select value={f.currency} onChange={(e) => set('currency', e.target.value)}>{CURRENCIES.map((c) => <option key={c}>{c}</option>)}</select>
          </div>
          <div className="card dark">
            <h3>Live Plan Summary</h3>
            {!q ? <p>Select a scope to see your estimate.</p> : (<>
              <div className="line"><span>Aegis Asset Stewardship</span><b>${q.aegis_usd}/mo</b></div>
              <div className="line"><span>Sparsh Care ({f.sparsh_tier})</span><b>${q.sparsh_usd}/mo</b></div>
              {q.discount_usd > 0 && <div className="line"><span>Dual-Shield Synergy Discount (15%)</span><b className="gold">-${q.discount_usd}/mo</b></div>}
              <div className="total"><span>Total Net Monthly Fee</span><b>${q.net_usd}</b>/ month {f.currency !== 'USD' && <small> ≈ {q.net_local} {f.currency}</small>}</div>
              <p className="small">Billed quarterly or annually. Cancel or pause anytime with 30-day notice.</p>
              <p>Estimated Annual Financial Protection: <b className="gold">~ ${q.protection_usd.toLocaleString()}</b></p>
              <div className="row"><a href="#book" className="btn gold-btn">Lock In This Plan &amp; Schedule Call</a><a href={wa} target="_blank" rel="noreferrer" className="btn ghost">Share Quote via WhatsApp</a></div>
            </>)}
          </div>
        </div>
      </div>
    </section>
  )
}
