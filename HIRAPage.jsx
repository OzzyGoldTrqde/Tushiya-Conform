import { useState, useCallback } from 'react'
import { Plus, Trash2, Download, Save, ShieldCheck } from 'lucide-react'
import { calculateRisk, ratingTailwind, SEVERITY_LABELS, LIKELIHOOD_LABELS } from '@/lib/riskMatrix'
import { exportHIRAPDF } from '@/lib/pdfExport'
import { NAMIBIAN_LEGISLATION } from '@/data/namibianLegislation'

const HAZARD_CATEGORIES = [
  'Physical', 'Chemical', 'Biological', 'Ergonomic', 'Psychosocial',
  'Electrical', 'Mechanical', 'Environmental', 'Radiation', 'Fire & Explosion',
]

const PEOPLE_AFFECTED = [
  'Workers', 'Supervisors', 'Visitors', 'Contractors', 'Public', 'Emergency responders',
]

function HIRARow({ row, index, onChange, onRemove }) {
  const initial  = calculateRisk(row.severity, row.likelihood)
  const residual = calculateRisk(row.residualSeverity, row.residualLikelihood)
  const upd = (f, v) => onChange(index, { ...row, [f]: v })

  return (
    <div className="border border-border rounded-xl p-4 bg-white space-y-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-mono text-muted bg-kalahari px-2 py-0.5 rounded">HIRA Row {index + 1}</span>
        <button onClick={() => onRemove(index)} className="text-red-400 hover:text-red-600 transition-colors">
          <Trash2 size={15} />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Job / Task Step</label>
          <input value={row.task} onChange={e => upd('task', e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Hazard Category</label>
          <select value={row.category} onChange={e => upd('category', e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy">
            <option value="">Select…</option>
            {HAZARD_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Hazard Description</label>
          <input value={row.hazard} onChange={e => upd('hazard', e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Potential Causes</label>
          <textarea rows={2} value={row.causes} onChange={e => upd('causes', e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Potential Consequences</label>
          <textarea rows={2} value={row.consequences} onChange={e => upd('consequences', e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-navy mb-1">People / Assets Affected</label>
        <div className="flex flex-wrap gap-2">
          {PEOPLE_AFFECTED.map(p => {
            const selected = (row.affected || []).includes(p)
            return (
              <button key={p} type="button" onClick={() => {
                const cur = row.affected || []
                upd('affected', selected ? cur.filter(x => x !== p) : [...cur, p])
              }}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${selected
                  ? 'bg-navy text-white border-navy' : 'bg-white text-muted border-border hover:border-navy'}`}>
                {p}
              </button>
            )
          })}
        </div>
      </div>

      {/* Initial risk */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Severity (1–5)</label>
          <select value={row.severity} onChange={e => upd('severity', +e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} — {SEVERITY_LABELS[n]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Likelihood (1–5)</label>
          <select value={row.likelihood} onChange={e => upd('likelihood', +e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} — {LIKELIHOOD_LABELS[n]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Initial Risk</label>
          <div className={`px-3 py-2 rounded-lg text-center font-mono font-bold text-sm ${ratingTailwind(initial.rating)}`}>
            {initial.score} — {initial.rating}
          </div>
        </div>
        <div />
      </div>

      <div>
        <label className="block text-xs font-medium text-navy mb-1">Existing Controls (Preventive Barriers)</label>
        <textarea rows={2} value={row.existingControls} onChange={e => upd('existingControls', e.target.value)}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
      </div>

      <div>
        <label className="block text-xs font-medium text-navy mb-1">Additional Controls Required</label>
        <textarea rows={2} value={row.additionalControls} onChange={e => upd('additionalControls', e.target.value)}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
      </div>

      {/* Residual risk */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-caprivi mb-1">Residual Severity</label>
          <select value={row.residualSeverity} onChange={e => upd('residualSeverity', +e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-caprivi">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} — {SEVERITY_LABELS[n]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-caprivi mb-1">Residual Likelihood</label>
          <select value={row.residualLikelihood} onChange={e => upd('residualLikelihood', +e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-caprivi">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} — {LIKELIHOOD_LABELS[n]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-caprivi mb-1">Residual Risk</label>
          <div className={`px-3 py-2 rounded-lg text-center font-mono font-bold text-sm ${ratingTailwind(residual.rating)}`}>
            {residual.score} — {residual.rating}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Responsible Person</label>
          <input value={row.responsible} onChange={e => upd('responsible', e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
        </div>
      </div>
    </div>
  )
}

const blankRow = () => ({
  task: '', category: '', hazard: '', causes: '', consequences: '',
  affected: [],
  severity: 3, likelihood: 3,
  existingControls: '', additionalControls: '',
  residualSeverity: 2, residualLikelihood: 2,
  responsible: '',
})

export default function HIRAPage() {
  const [meta, setMeta] = useState({
    company: '', site: '', jobTitle: '', assessor: '', date: '', documentRef: '',
    legislation: ['Labour Act 11 of 2007', 'OHS Regulations 1997'],
  })
  const [rows, setRows] = useState([blankRow()])

  const upd = (k, v) => setMeta(m => ({ ...m, [k]: v }))
  const addRow = () => setRows(r => [...r, blankRow()])
  const updateRow = useCallback((i, updated) => setRows(r => r.map((row, idx) => idx === i ? updated : row)), [])
  const removeRow = useCallback((i) => setRows(r => r.filter((_, idx) => idx !== i)), [])

  return (
    <div className="min-h-screen bg-kalahari">
      <div className="bg-navy py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-flame" />
            <p className="section-label">HIRA Generator</p>
          </div>
          <h1 className="font-display font-bold text-white text-2xl sm:text-3xl mb-1">
            Hazard Identification &amp; Risk Assessment
          </h1>
          <p className="text-white/50 text-sm">ISO 45001:2018 aligned · Barrier identification · Labour Act 11 of 2007</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="card">
          <h2 className="font-display font-bold text-navy mb-4">Document Details</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ['company', 'Company Name'],
              ['site', 'Site / Location'],
              ['jobTitle', 'Job / Work Activity'],
              ['assessor', 'Assessor Name'],
              ['documentRef', 'Document Reference'],
              ['date', 'Assessment Date'],
            ].map(([k, l]) => (
              <div key={k}>
                <label className="block text-xs font-medium text-navy mb-1">{l}</label>
                <input type={k === 'date' ? 'date' : 'text'} value={meta[k]} onChange={e => upd(k, e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-xs font-medium text-navy mb-2">Applicable Legislation</label>
            <div className="flex flex-wrap gap-2">
              {NAMIBIAN_LEGISLATION.map(l => {
                const selected = meta.legislation.includes(l.short)
                return (
                  <button key={l.id} type="button" onClick={() => upd('legislation', selected
                    ? meta.legislation.filter(x => x !== l.short)
                    : [...meta.legislation, l.short])}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${selected
                      ? 'bg-navy text-white border-navy' : 'bg-white text-muted border-border hover:border-navy'}`}>
                    {l.short}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-navy">Hazard Identification Table</h2>
            <span className="text-xs text-muted">{rows.length} row{rows.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-4">
            {rows.map((row, i) => (
              <HIRARow key={i} row={row} index={i} onChange={updateRow} onRemove={removeRow} />
            ))}
          </div>
          <button onClick={addRow}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-flame hover:text-flame-dark transition-colors">
            <Plus size={16} /> Add Hazard Row
          </button>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <button onClick={() => exportHIRAPDF({ ...meta, rows })} className="btn-primary">
            <Download size={16} /> Export PDF
          </button>
          <button className="btn-outline">
            <Save size={16} /> Save to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
