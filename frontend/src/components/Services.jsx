import { useState } from 'react'
const data = {
  aegis: { title: 'Aegis (Property)', items: [
    ['Corporate Tenant Scouting', 'Deep background checks, CIBIL scores, employment letters and police verification before keys are handed over.', ['Multi-portal listing syndication', 'Accompanied viewings', 'Lawyer-drafted digital leases']],
    ['Escrow Rent & Tax Compliance', 'Automated rent collection into escrow, transparent TDS deductions and repatriation paperwork.', ['Guaranteed 5th-of-month transfer', 'NRE/NRO remittance assistance', 'Annual Form 15CA/CB']],
    ['Periodic 80-Point Inspections', 'Quarterly audits with HD photos, electrical checks, leak detection and inventory reports.', ['Timestamped photo ledger', 'Direct video walkthrough call', 'Pre-monsoon preventive repairs']],
    ['Turnkey Maintenance & Fit-outs', 'Vetted electricians, plumbers and craftsmen under strict corporate SLAs with zero markup surprises.', ['Itemized quote pre-approvals', 'Deep post-tenancy restoration', 'Emergency plumbing/power response']],
  ]},
  sparsh: { title: 'Sparsh (Parental Care)', items: [
    ['24/7 Rapid SOS', 'Ambulance dispatch and pre-alerted ICU beds at partner hospitals.', ['Under-15-minute dispatch', 'Hospital pre-authorization', 'Instant family alerts']],
    ['Dedicated Care Companion', 'A trained nurse or geriatric escort for every OPD visit, with doctor summaries in your portal.', ['Hospital OPD escorts', 'Recorded consultations', 'Prescription tracking']],
    ['Home Vitals Telemetry', 'Bi-weekly BP, SpO2, pulse and sugar screening with trend reports.', ['Escalation on abnormal readings', 'Lab tests at home', 'Doctor-reviewed trends']],
    ['Medicine & Companionship', 'Doorstep medicine replenishment, pill sorting and warm social visits.', ['Medication delivery & sorting', 'Photo & voice updates', 'Weekly visit options']],
  ]},
}
export default function Services() {
  const [tab, setTab] = useState('aegis')
  const s = data[tab]
  return (
    <section className="section alt" id={tab}>
      <div className="container">
        <span className="tag">Modular Architecture</span>
        <h2>Dual-Shield Service Matrix</h2>
        <p className="sub">Switch between our two divisions. Tailor them separately or bundle them for complete diaspora coverage.</p>
        <div className="tabs">
          {Object.entries(data).map(([k, v]) => (
            <button key={k} className={tab === k ? 'active' : ''} onClick={() => setTab(k)}>{v.title}</button>
          ))}
        </div>
        <span id="aegis" /><span id="sparsh" />
        <div className="grid2">
          {s.items.map(([t, d, bullets]) => (
            <div className="card" key={t}>
              <h3>{t}</h3><p>{d}</p>
              <ul>{bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="bundle">
          <div><b>Bundle Aegis + Sparsh for 15% Synergy Discount</b><p>Unified monthly reporting, dedicated dual account steward and prioritized 24/7 hotline.</p></div>
          <a href="#estimator" className="btn gold-btn">Claim Dual-Shield Bundle</a>
        </div>
      </div>
    </section>
  )
}
