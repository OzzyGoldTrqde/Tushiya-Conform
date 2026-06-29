import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'

// Animated document preview — the signature element of Tushiya Conform
const PREVIEW_ROWS = [
  { activity: 'Diamond core drilling',   hazard: 'Rotating drill string entanglement', severity: 4, likelihood: 3, rating: 'HIGH', control: 'Full-body exclusion zone + LOTO' },
  { activity: 'Explosive handling',       hazard: 'Premature detonation',               severity: 5, likelihood: 2, rating: 'HIGH', control: 'Licensed blaster + blast clearance' },
  { activity: 'Open-pit wall inspection', hazard: 'Rock fall / slope failure',           severity: 4, likelihood: 3, rating: 'HIGH', control: 'Geotechnical sign-off before entry' },
  { activity: 'Reagent chemical dosing',  hazard: 'Chemical splash / vapour inhalation', severity: 3, likelihood: 3, rating: 'MED',  control: 'Chemical-resistant PPE + LEV' },
  { activity: 'Ore conveyor maintenance', hazard: 'Trapped/struck by moving parts',      severity: 4, likelihood: 2, rating: 'MED',  control: 'Isolation, LOTO, PTW required' },
]

function RatingChip({ rating }) {
  const cls = rating === 'HIGH'
    ? 'bg-red-100 text-red-700 border-red-200'
    : 'bg-amber-100 text-amber-700 border-amber-200'
  return <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${cls}`}>{rating}</span>
}

function LiveDocPreview() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(v => (v < PREVIEW_ROWS.length ? v + 1 : v))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-border overflow-hidden w-full max-w-lg font-mono text-[11px]">
      {/* Doc header */}
      <div className="bg-navy px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-white font-display font-bold text-xs">RISK ASSESSMENT</p>
          <p className="text-white/50 text-[10px]">Namibia Open-Pit Mining · RA-2026-047</p>
        </div>
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-caprivi/70" />
        </div>
      </div>

      {/* Meta row */}
      <div className="grid grid-cols-3 gap-px bg-kalahari-dark text-[10px]">
        {[['Site', 'Erongo Open-Pit'], ['Assessor', 'O. Mughongora'], ['Date', new Date().toLocaleDateString('en-NA')]].map(([k, v]) => (
          <div key={k} className="bg-white px-3 py-2">
            <p className="text-white/30 text-[9px] uppercase tracking-wide font-sans">{k}</p>
            <p className="text-navy font-semibold font-sans">{v}</p>
          </div>
        ))}
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-px bg-kalahari-dark text-[9px] uppercase tracking-wider text-muted border-b border-border">
        {[['Activity','col-span-3'],['Hazard','col-span-4'],['Risk','col-span-1'],['Controls','col-span-4']].map(([h,c]) => (
          <div key={h} className={`${c} bg-kalahari px-2 py-1.5`}>{h}</div>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-border min-h-[180px]">
        {PREVIEW_ROWS.slice(0, visible).map((row, i) => (
          <div key={i} className="grid grid-cols-12 gap-px bg-kalahari-dark animate-fade-up text-[10px]">
            <div className="col-span-3 bg-white px-2 py-2 text-navy font-medium leading-tight">{row.activity}</div>
            <div className="col-span-4 bg-white px-2 py-2 text-muted leading-tight">{row.hazard}</div>
            <div className="col-span-1 bg-white px-2 py-2 flex items-start pt-2.5">
              <RatingChip rating={row.rating} />
            </div>
            <div className="col-span-4 bg-white px-2 py-2 text-muted leading-tight">{row.control}</div>
          </div>
        ))}
        {visible < PREVIEW_ROWS.length && (
          <div className="flex items-center gap-2 px-4 py-3 text-muted text-[10px]">
            <span className="inline-block w-3 h-3 rounded-full bg-flame/30 animate-pulse-slow" />
            Generating hazard controls…
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-kalahari border-t border-border px-4 py-2 flex justify-between items-center text-[9px] text-muted">
        <span>Labour Act 11 of 2007 · Mines Health &amp; Safety Act · OHS Regs 1997</span>
        <span className="text-caprivi font-bold">✓ Compliant</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="bg-navy bg-topo relative overflow-hidden">
      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light opacity-95 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: copy */}
          <div>
            <p className="section-label mb-4">Free · Namibia-specific · No signup required</p>
            <h1 className="font-display font-extrabold text-white text-4xl lg:text-5xl xl:text-6xl leading-[1.08] mb-6">
              HSE Compliance<br />
              <span className="text-flame">Documents</span><br />
              Built for Namibia
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              Generate professional Risk Assessments, HIRA, Method Statements, Toolbox Talks, Permits to Work, and HSE Policies — aligned to the Labour Act, Mines Health &amp; Safety Act, and Namibian OHS Regulations. No templates to fill in. Documents generate themselves.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/generators/risk-assessment" className="btn-primary">
                Create Risk Assessment <ArrowRight size={16} />
              </Link>
              <Link to="/signup" className="btn-outline border-white/30 text-white hover:bg-white hover:text-navy">
                Free Account
              </Link>
            </div>

            <ul className="space-y-2">
              {[
                'Labour Act 11 of 2007 · MHSA compliant',
                'Automatic risk matrix — severity × likelihood',
                'Digital signatures & PDF export',
                '0 templates to fill — content pre-populated',
              ].map(t => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-white/60">
                  <CheckCircle size={16} className="text-caprivi mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: live document preview */}
          <div className="flex justify-center lg:justify-end">
            <LiveDocPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
