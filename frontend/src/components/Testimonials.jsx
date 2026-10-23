const t = [
  ['Dual-Shield Bundle', 'Managing my villa in Gachibowli while ensuring my 78-year-old father had hospital escorts at Apollo was an emotional nightmare from London. Sustune transformed everything.', 'Dr. Vikramaditya Reddy', 'London, UK • Hub: Hyderabad'],
  ['Sparsh Concierge & Aegis', 'When mom had a vertigo episode at 2 AM India time, the SOS protocol dispatched a paramedic in 12 minutes. They pre-checked her into Manipal before we woke up in California.', 'Ananya & Rohan Sengupta', 'San Jose, CA • Hub: Bengaluru'],
  ['Aegis Complete', "Sustune's institutional escrows and quarterly photographic audits are Wall-Street grade. My rent arrives in my NRE account on the 5th with Form 15CA already drafted.", 'Farhan Siddiqui', 'Dubai, UAE • Hub: Delhi NCR'],
]
const stats = [['₹180Cr+', 'Assets Stewarded'], ['< 14 Mins', 'Avg SOS Response'], ['99.8%', 'On-Time Rent Escrow'], ['4.9 / 5.0', 'Diaspora Trust Rating']]
export default function Testimonials() {
  return (
    <section className="section alt">
      <div className="container">
        <span className="tag">Diaspora Validation</span>
        <h2>Trusted Across 6 Time Zones</h2>
        <div className="stats">{stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
        <div className="grid3">
          {t.map(([tag, q, n, loc]) => (
            <div className="card" key={n}><span className="tag">{tag}</span><p>“{q}”</p><b>{n}</b><small>{loc}</small></div>
          ))}
        </div>
      </div>
    </section>
  )
}
