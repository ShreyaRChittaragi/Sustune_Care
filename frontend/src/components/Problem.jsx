const pains = [
  ['The 3:00 AM Anxious Awakening', 'Waking up to a missed call in San Jose or London, frantic about whether mom took her heart medicine.'],
  ['Parents Concealing Symptoms', "'Beta, we are completely fine!' — parents downplay chest discomfort or dizziness so you don't panic."],
  ['Reluctant Favors from Relatives', 'Calling overburdened cousins or neighbors to escort your parents through 4-hour hospital queues.'],
]
const protocol = [
  ['24/7 Rapid SOS & Pre-Alerted ICUs', 'Clinical dispatch under 15 minutes, admissions pre-authorized at Apollo, Fortis or Manipal.'],
  ['Certified Healthcare Companion', 'A trained nurse or geriatric escort accompanies every appointment and records consultations into your portal.'],
  ['Routine Telemetry & Joyful Visits', 'Bi-weekly vitals, doorstep medicine replenishment and warm check-ins with photo & voice updates.'],
]
export default function Problem() {
  return (
    <section className="section">
      <div className="container">
        <span className="tag">The NRI Reality</span>
        <h2>The Anxiety of Distance, Resolved.</h2>
        <p className="sub">Sustune Care replaces guesswork and dependence on distant relatives with institutional responsibility and heartfelt care.</p>
        <div className="grid2">
          <div className="card danger">
            <h3>Relying on Relatives &amp; Ad-Hoc Fixes</h3>
            {pains.map(([t, d]) => <div className="item" key={t}><b>{t}</b><p>{d}</p></div>)}
            <p className="foot">Average NRI time lost in ad-hoc resolution: <b>14 hours / month</b></p>
          </div>
          <div className="card dark">
            <h3>Guaranteed Corporate Accountability</h3>
            {protocol.map(([t, d]) => <div className="item" key={t}><b className="gold">✓ {t}</b><p>{d}</p></div>)}
            <p className="foot">Managed via private <b>Dual-Shield Client Portal</b> · <a href="/portal/demo" className="gold">View Portal Demo →</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}
