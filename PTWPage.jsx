import { useState } from 'react'
import { ClipboardCheck, Download, ArrowLeft, CheckSquare, Square } from 'lucide-react'
import { exportPTWPDF } from '@/lib/pdfExport'

const PTW_TYPES = [
  {
    id: 'hot-work',
    title: 'Hot Work',
    icon: '🔥',
    desc: 'Welding, cutting, grinding, burning — any ignition source work',
    checks: [
      'Fire extinguisher positioned within 3 m of work area',
      'Combustible materials removed or shielded within 10 m radius',
      'Fire watch assigned and briefed',
      'Hot work area barricaded and signage posted',
      'Welding screens / flash guards in place',
      'Gas cylinders secured upright and away from heat source',
      'Atmosphere tested — LEL < 10% confirmed',
      'Emergency shutdown procedure communicated',
      'Sprinkler / fire suppression system operational',
      'Hot work permit displayed at work site',
    ],
    gasTest: true,
  },
  {
    id: 'confined-space',
    title: 'Confined Space Entry',
    icon: '🕳️',
    desc: 'Entry into tanks, vessels, excavations, silos, manholes',
    checks: [
      'Confined space isolated (all energy sources locked out)',
      'Atmosphere tested — O₂ 19.5–23.5%, LEL < 10%, toxic gases < PEL',
      'Entry supervisor assigned and present',
      'Standby / rescue person assigned outside space',
      'Lifeline and harness fitted to entrant',
      'Rescue equipment at entry point (tripod, winch, SCBA)',
      'Continuous atmospheric monitoring running',
      'Communications system tested',
      'Emergency rescue plan briefed to all personnel',
      'Entry log / sign-in sheet in use',
    ],
    gasTest: true,
  },
  {
    id: 'working-at-height',
    title: 'Working at Height',
    icon: '⬆️',
    desc: 'Any work above 1.8 m from a stable surface',
    checks: [
      'Fall protection plan in place',
      'Full-body harness and lanyard inspected and fitted',
      'Anchor points inspected — SWL > 15 kN confirmed',
      'Exclusion zone below work area established',
      'Scaffold / access equipment inspected by competent person',
      'Weather conditions checked — wind speed < 13 m/s',
      'Tools secured / tethered to prevent dropped objects',
      'Emergency descent / rescue plan briefed',
      'Rescue equipment available on site',
      'Permit displayed at access point',
    ],
    gasTest: false,
  },
  {
    id: 'electrical-isolation',
    title: 'Electrical Isolation',
    icon: '⚡',
    desc: 'LOTO on electrical systems, switchgear, distribution boards',
    checks: [
      'LOTO procedure followed — all energy sources isolated',
      'Isolation verified with approved voltage tester',
      'Personal padlocks and tags applied by each worker',
      'Multi-lock hasp in place if multiple workers',
      'Capacitor / stored energy discharged',
      'Earth bonding applied where required',
      'Caution / "Do Not Operate" tags displayed on all isolators',
      'Relevant drawings / SLDs available on site',
      'Permit displayed at isolation point',
      'Electrical competency certificates verified for workers',
    ],
    gasTest: false,
  },
  {
    id: 'excavation',
    title: 'Excavation & Ground Breaking',
    icon: '⛏️',
    desc: 'Any digging, trenching, or ground penetration work',
    checks: [
      'Underground services located and marked (water, gas, electric, telco)',
      'Cable detection sweep completed — report attached',
      'Dig permit / dial-before-you-dig clearance obtained',
      'Soil classification and shoring design in place',
      'Spoil stockpile > 1 m from excavation edge',
      'Barricades, safety fencing, and warning signs installed',
      'Ladder access within 8 m of workers in excavation',
      'Dewatering pump available if water ingress possible',
      'Daily pre-shift inspection of excavation walls',
      'Emergency evacuation plan communicated to all workers',
    ],
    gasTest: false,
  },
  {
    id: 'lifting-operations',
    title: 'Lifting Operations',
    icon: '🏗️',
    desc: 'Crane, hoist, rigging, and mechanical lifting operations',
    checks: [
      'Lift plan / engineered lift plan prepared and approved',
      'Lifting equipment inspection certificates current',
      'Rigger / slinger competency certificates verified',
      'Crane operator licence verified',
      'SWL of crane, hooks, slings, and shackles confirmed',
      'Ground bearing capacity assessed for mobile crane',
      'Exclusion zone established below load path',
      'Overhead power lines identified and clearance confirmed',
      'Signal person / banksman designated and briefed',
      'Weather conditions checked — wind speed < 10 m/s',
    ],
    gasTest: false,
  },
  {
    id: 'radiation',
    title: 'Radiation (Non-Ionising)',
    icon: '📡',
    desc: 'RF, microwave, UV, laser, or infrared radiation work',
    checks: [
      'Radiation source identified and classified',
      'Exclusion zone established and posted with warning signs',
      'RF / EMF levels measured and recorded',
      'PPE selected based on wavelength and exposure level',
      'Radiation dosimeter / personal monitor issued where required',
      'Medical surveillance records up to date for exposed workers',
      'Emergency procedures for accidental exposure briefed',
      'Radiation source switched off when not actively in use',
      'Regulatory authority notification made if required',
      'Permit displayed at radiation area boundaries',
    ],
    gasTest: false,
  },
  {
    id: 'pressure-testing',
    title: 'Pressure Testing',
    icon: '🔩',
    desc: 'Hydrostatic or pneumatic pressure tests on piping and vessels',
    checks: [
      'Pressure test procedure approved by competent engineer',
      'Test pressure confirmed — not exceeding design limit',
      'All personnel cleared from test area',
      'Relief valve set 10% above test pressure installed',
      'Pressure gauge calibration certificate current',
      'All joints inspected before pressurisation',
      'Exclusion zone and barriers installed',
      'Test fluid identified and safe disposal planned',
      'Bleed and vent points identified and managed',
      'Emergency depressurisation procedure briefed',
    ],
    gasTest: false,
  },
  {
    id: 'chemical-handling',
    title: 'Chemical Handling',
    icon: '🧪',
    desc: 'Transfer, mixing, or disposal of hazardous chemicals',
    checks: [
      'SDS reviewed and accessible at work area',
      'Chemical storage area inspected and compliant',
      'PPE selected per SDS recommendations and worn',
      'Spill kit positioned and accessible',
      'Emergency eyewash / shower within 10 seconds of work area',
      'Ventilation adequate or LEV in place',
      'Incompatible chemicals segregated',
      'Chemical transfer equipment inspected and grounded',
      'Waste disposal plan documented and compliant with EMA',
      'Emergency response plan for spill / exposure briefed',
    ],
    gasTest: false,
  },
  {
    id: 'roof-access',
    title: 'Roof Access',
    icon: '🏠',
    desc: 'Access to fragile, sloped, or flat roofs',
    checks: [
      'Structural load capacity of roof confirmed',
      'Fragile areas identified and marked with warning signs',
      'Roof access ladder inspected and secured',
      'Harness anchor points installed and certified',
      'Guardrails or safety nets installed at leading edges',
      'Weather checked — no work in rain, wind > 10 m/s, or lightning',
      'Skylight covers secured or guarded',
      'Exclusion zone on ground below work area',
      'Rescue plan for fall arrest situation briefed',
      'Permit displayed at roof access point',
    ],
    gasTest: false,
  },
  {
    id: 'night-work',
    title: 'Night Work',
    icon: '🌙',
    desc: 'Any work performed between 18:00 and 06:00',
    checks: [
      'Adequate site lighting confirmed — ≥ 50 lux for general work',
      'Task lighting available for detailed work areas',
      'Worker fitness for night work assessed',
      'Fatigue management plan in place',
      'Increased supervisory presence arranged',
      'Emergency contacts and medical support confirmed available',
      'Access / egress routes clearly marked and lit',
      'Radios / communications tested and operational',
      'Night-specific hazard assessment completed',
      'Security arrangements in place',
    ],
    gasTest: false,
  },
  {
    id: 'diving',
    title: 'Diving Operations',
    icon: '🤿',
    desc: 'SCUBA or surface-supplied diving in any water environment',
    checks: [
      'Dive plan approved by dive supervisor',
      'Diver medical certificate current (< 12 months)',
      'Dive supervisor present and competent',
      'Stand-by diver suited and ready throughout operation',
      'Umbilical / lifeline inspected and functional',
      'Communications system tested (diver to surface)',
      'Dive bell / chamber available for depths > 30 m',
      'O₂ / decompression tables and procedures available',
      'Rescue / first aid including O₂ resuscitation on standby',
      'Dive log records maintained throughout operation',
    ],
    gasTest: false,
  },
]

const GAS_TYPES = ['O₂ (%)', 'LEL (%)', 'CO (ppm)', 'H₂S (ppm)', 'CO₂ (%)', 'SO₂ (ppm)']

function GasTestSection({ tests, onChange }) {
  const addTest = () => onChange([...tests, { time: '', tester: '', O2: '', LEL: '', CO: '', H2S: '', CO2: '', SO2: '', pass: false }])
  const updTest = (i, f, v) => onChange(tests.map((t, idx) => idx === i ? { ...t, [f]: v } : t))

  return (
    <div className="card">
      <h2 className="font-display font-bold text-navy mb-1">Atmospheric / Gas Tests</h2>
      <p className="text-xs text-muted mb-4">Record each gas test before entry / hot work commences. Minimum: O₂ 19.5–23.5%, LEL &lt;10%</p>
      {tests.map((t, i) => (
        <div key={i} className="border border-border rounded-xl p-4 mb-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-navy mb-1">Test Time</label>
            <input type="time" value={t.time} onChange={e => updTest(i, 'time', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
          </div>
          <div>
            <label className="block text-xs font-medium text-navy mb-1">Gas Tester Name</label>
            <input value={t.tester} onChange={e => updTest(i, 'tester', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
          </div>
          {[['O2','O₂ (%)'],['LEL','LEL (%)'],['CO','CO (ppm)'],['H2S','H₂S (ppm)']].map(([f,l]) => (
            <div key={f}>
              <label className="block text-xs font-medium text-navy mb-1">{l}</label>
              <input value={t[f]} onChange={e => updTest(i, f, e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
            </div>
          ))}
          <div className="flex items-end gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-navy cursor-pointer">
              <input type="checkbox" checked={t.pass} onChange={e => updTest(i, 'pass', e.target.checked)} className="rounded" />
              Pass
            </label>
          </div>
        </div>
      ))}
      <button onClick={addTest} className="text-sm font-semibold text-flame hover:text-flame-dark">
        + Add Gas Test
      </button>
    </div>
  )
}

function ChecklistSection({ title, items, checked, onToggle }) {
  const allChecked = items.every((_, i) => checked.includes(i))
  return (
    <div className="card">
      <h2 className="font-display font-bold text-navy mb-4">{title}</h2>
      <div className="space-y-2">
        {items.map((item, i) => {
          const isChecked = checked.includes(i)
          return (
            <button key={i} type="button" onClick={() => onToggle(i)}
              className="w-full flex items-start gap-3 text-left p-2 rounded-lg hover:bg-kalahari transition-colors">
              {isChecked
                ? <CheckSquare size={16} className="text-caprivi shrink-0 mt-0.5" />
                : <Square size={16} className="text-muted shrink-0 mt-0.5" />}
              <span className={`text-sm ${isChecked ? 'text-navy line-through text-muted' : 'text-navy'}`}>{item}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${allChecked
          ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
          {checked.length} / {items.length} items confirmed
        </span>
      </div>
    </div>
  )
}

export default function PTWPage() {
  const [selected, setSelected] = useState(null)
  const [meta, setMeta] = useState({
    permitNo: '', date: '', expiryDate: '', expiryTime: '',
    location: '', workDescription: '',
    issuerName: '', issuerTitle: '', issuerSign: '',
    receiverName: '', receiverTitle: '', receiverCompany: '',
    closureNotes: '',
  })
  const [checkedItems, setCheckedItems] = useState([])
  const [gasTests, setGasTests] = useState([])

  const upd = (k, v) => setMeta(m => ({ ...m, [k]: v }))

  const toggleCheck = (i) => {
    setCheckedItems(cur => cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i])
  }

  const handleSelect = (type) => {
    setSelected(type)
    setCheckedItems([])
    setGasTests(type.gasTest ? [{ time: '', tester: '', O2: '', LEL: '', CO: '', H2S: '', CO2: '', SO2: '', pass: false }] : [])
  }

  const handleExport = () => {
    if (!selected) return
    exportPTWPDF({ ...meta, permitType: selected.title, checks: selected.checks, checkedItems, gasTests })
  }

  if (!selected) {
    return (
      <div className="min-h-screen bg-kalahari">
        <div className="bg-navy py-8 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardCheck size={18} className="text-flame" />
              <p className="section-label">Permit to Work Generator</p>
            </div>
            <h1 className="font-display font-bold text-white text-2xl sm:text-3xl mb-1">Issue Permit to Work</h1>
            <p className="text-white/50 text-sm">12 permit types · Precondition checklists · Digital signatures · Labour Act 11 of 2007</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="font-display font-bold text-navy mb-4">Select Permit Type</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PTW_TYPES.map(t => (
              <button key={t.id} onClick={() => handleSelect(t)}
                className="card text-left hover:border-flame hover:shadow-sm transition-all group">
                <div className="text-2xl mb-2">{t.icon}</div>
                <p className="font-display font-semibold text-navy group-hover:text-flame transition-colors">{t.title}</p>
                <p className="text-xs text-muted mt-1">{t.desc}</p>
                <p className="text-xs text-flame font-semibold mt-2">{t.checks.length} preconditions →</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kalahari">
      <div className="bg-navy py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setSelected(null)}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-3 transition-colors">
            <ArrowLeft size={14} /> All Permit Types
          </button>
          <div className="flex items-center gap-2 mb-2">
            <ClipboardCheck size={18} className="text-flame" />
            <p className="section-label">Permit to Work — {selected.title}</p>
          </div>
          <h1 className="font-display font-bold text-white text-2xl sm:text-3xl mb-1">
            {selected.icon} {selected.title} Permit
          </h1>
          <p className="text-white/50 text-sm">{selected.desc}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Permit details */}
        <div className="card">
          <h2 className="font-display font-bold text-navy mb-4">Permit Details</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ['permitNo', 'Permit Number'],
              ['date', 'Issue Date'],
              ['expiryDate', 'Expiry Date'],
              ['expiryTime', 'Expiry Time'],
              ['location', 'Work Location / Area'],
            ].map(([k, l]) => (
              <div key={k}>
                <label className="block text-xs font-medium text-navy mb-1">{l}</label>
                <input type={k.includes('Date') ? 'date' : k === 'expiryTime' ? 'time' : 'text'}
                  value={meta[k]} onChange={e => upd(k, e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium text-navy mb-1">Description of Work</label>
            <textarea rows={3} value={meta.workDescription} onChange={e => upd('workDescription', e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
          </div>
        </div>

        {/* People */}
        <div className="card">
          <h2 className="font-display font-bold text-navy mb-4">Issuer &amp; Receiver</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-navy">Permit Issuer (Authorising Person)</h3>
              {[['issuerName','Full Name'],['issuerTitle','Job Title / Designation']].map(([k,l]) => (
                <div key={k}>
                  <label className="block text-xs font-medium text-navy mb-1">{l}</label>
                  <input value={meta[k]} onChange={e => upd(k, e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-navy">Permit Receiver (Work Supervisor)</h3>
              {[['receiverName','Full Name'],['receiverTitle','Job Title'],['receiverCompany','Company / Contractor']].map(([k,l]) => (
                <div key={k}>
                  <label className="block text-xs font-medium text-navy mb-1">{l}</label>
                  <input value={meta[k]} onChange={e => upd(k, e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gas tests */}
        {selected.gasTest && (
          <GasTestSection tests={gasTests} onChange={setGasTests} />
        )}

        {/* Precondition checklist */}
        <ChecklistSection
          title="Precondition Checklist"
          items={selected.checks}
          checked={checkedItems}
          onToggle={toggleCheck}
        />

        {/* Closure */}
        <div className="card">
          <h2 className="font-display font-bold text-navy mb-4">Permit Closure</h2>
          <p className="text-xs text-muted mb-3">To be completed when work is finished or permit cancelled.</p>
          <div>
            <label className="block text-xs font-medium text-navy mb-1">Closure Notes / Work Completion Statement</label>
            <textarea rows={3} value={meta.closureNotes} onChange={e => upd('closureNotes', e.target.value)}
              placeholder="Site left clean and safe. All tools removed. Equipment reinstated. Permit closed."
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <button onClick={handleExport} className="btn-primary">
            <Download size={16} /> Export PDF
          </button>
          <button className="btn-outline">Save to Dashboard</button>
        </div>
      </div>
    </div>
  )
}
