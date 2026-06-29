import { useState, useCallback } from 'react'
import { Plus, Trash2, Download, Save, ChevronDown, AlertTriangle } from 'lucide-react'
import { RA_TEMPLATES, RA_CATEGORIES, getTemplatesByCategory } from '@/data/riskTemplates'
import { calculateRisk, ratingTailwind, SEVERITY_LABELS, LIKELIHOOD_LABELS } from '@/lib/riskMatrix'
import { exportRiskAssessmentPDF } from '@/lib/pdfExport'
import { NAMIBIAN_LEGISLATION } from '@/data/namibianLegislation'

const PPE_OPTIONS = [
  'Hard hat', 'Safety boots', 'High-visibility vest', 'Safety glasses', 'Face shield',
  'Ear protection', 'Dust mask (P2)', 'Full-face respirator', 'Chemical-resistant gloves',
  'Leather gloves', 'Anti-static clothing', 'Full-body harness', 'Lanyard',
  'Chemical-resistant apron', 'Welding visor', 'Knee pads',
]

function HazardRow({ hazard, index, onChange, onRemove }) {
  const initial = calculateRisk(hazard.severity, hazard.likelihood)
  const residual = calculateRisk(hazard.residualSeverity, hazard.residualLikelihood)

  const update = (field, value) => onChange(index, { ...hazard, [field]: value })

  return (
    <div className="border border-border rounded-xl p-4 bg-white space-y-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-mono text-muted bg-kalahari px-2 py-0.5 rounded">Hazard {index + 1}</span>
        <button onClick={() => onRemove(index)} className="text-red-400 hover:text-red-600 transition-colors">
          <Trash2 size={15} />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Work Activity</label>
          <input value={hazard.activity} onChange={e => update('activity', e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Hazard / Risk Description</label>
          <input value={hazard.hazard} onChange={e => update('hazard', e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
        </div>
      </div>

      {/* Initial risk */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Severity (1–5)</label>
          <select value={hazard.severity} onChange={e => update('severity', +e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} — {SEVERITY_LABELS[n]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Likelihood (1–5)</label>
          <select value={hazard.likelihood} onChange={e => update('likelihood', +e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} — {LIKELIHOOD_LABELS[n]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Initial Risk Score</label>
          <div className={`px-3 py-2 rounded-lg text-center font-mono font-bold text-sm ${ratingTailwind(initial.rating)}`}>
            {initial.score} — {initial.rating}
          </div>
        </div>
        <div />
      </div>

      {/* Controls */}
      <div>
        <label className="block text-xs font-medium text-navy mb-1">Control Measures (one per line)</label>
        <textarea rows={3} value={(hazard.controls || []).join('\n')}
          onChange={e => update('controls', e.target.value.split('\n'))}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
      </div>

      {/* Residual risk */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-caprivi mb-1">Residual Severity</label>
          <select value={hazard.residualSeverity} onChange={e => update('residualSeverity', +e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-caprivi">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} — {SEVERITY_LABELS[n]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-caprivi mb-1">Residual Likelihood</label>
          <select value={hazard.residualLikelihood} onChange={e => update('residualLikelihood', +e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-caprivi">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} — {LIKELIHOOD_LABELS[n]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-caprivi mb-1">Residual Risk Score</label>
          <div className={`px-3 py-2 rounded-lg text-center font-mono font-bold text-sm ${ratingTailwind(residual.rating)}`}>
            {residual.score} — {residual.rating}
          </div>
        </div>
        <div />
      </div>

      {/* PPE */}
      <div>
        <label className="block text-xs font-medium text-navy mb-1">PPE Required</label>
        <div className="flex flex-wrap gap-2">
          {PPE_OPTIONS.map(p => {
            const selected = (hazard.ppe || []).includes(p)
            return (
              <button key={p} onClick={() => {
                const current = hazard.ppe || []
                update('ppe', selected ? current.filter(x => x !== p) : [...current, p])
              }}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${selected
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-muted border-border hover:border-navy'}`}>
                {p}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const blankHazard = () => ({
  activity: '', hazard: '',
  severity: 3, likelihood: 3,
  residualSeverity: 2, residualLikelihood: 2,
  controls: [''], ppe: [],
})

export default function RiskAssessmentPage() {
  const [meta, setMeta] = useState({
    company: '', site: '', activity: '', assessor: '', reviewDate: '', documentRef: '',
    legislation: ['Labour Act 11 of 2007', 'OHS Regulations 1997'],
  })
  const [hazards, setHazards] = useState([blankHazard()])
  const [templateCategory, setTemplateCategory] = useState('')
  const [templateOpen, setTemplateOpen] = useState(false)

  const updateMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }))

  const addHazard = () => setHazards(h => [...h, blankHazard()])

  const updateHazard = useCallback((i, updated) => {
    setHazards(h => h.map((row, idx) => idx === i ? updated : row))
  }, [])

  const removeHazard = useCallback((i) => {
    setHazards(h => h.filter((_, idx) => idx !== i))
  }, [])

  const loadTemplate = (template) => {
    setMeta(m => ({ ...m, activity: template.title, legislation: template.legislation }))
    setHazards(template.hazards.map(h => ({ ...h, controls: h.controls || [''], ppe: h.ppe || [] })))
    setTemplateOpen(false)
  }

  const handleExportPDF = () => exportRiskAssessmentPDF({ ...meta, hazards })

  return (
    <div className="min-h-screen bg-kalahari">
      {/* Page header */}
      <div className="bg-navy py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-flame" />
            <p className="section-label">Risk Assessment Generator</p>
          </div>
          <h1 className="font-display font-bold text-white text-2xl sm:text-3xl mb-1">
            Create Risk Assessment
          </h1>
          <p className="text-white/50 text-sm">
            Aligned to Labour Act 11 of 2007 · Mines Health &amp; Safety Act · OHS Regulations 1997
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Template picker */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-navy">Load a Template</h2>
              <p className="text-xs text-muted mt-0.5">Pre-built hazard sets for Namibian industries</p>
            </div>
            <button onClick={() => setTemplateOpen(!templateOpen)}
              className="flex items-center gap-1.5 text-sm font-semibold text-flame hover:text-flame-dark">
              Browse Templates <ChevronDown size={14} className={templateOpen ? 'rotate-180' : ''} />
            </button>
          </div>

          {templateOpen && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-navy mb-1">Filter by industry</label>
                <select value={templateCategory} onChange={e => setTemplateCategory(e.target.value)}
                  className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy">
                  <option value="">All categories</option>
                  {RA_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {(templateCategory
                  ? RA_TEMPLATES.filter(t => t.category === templateCategory)
                  : RA_TEMPLATES
                ).map(t => (
                  <button key={t.id} onClick={() => loadTemplate(t)}
                    className="text-left p-3 border border-border rounded-lg hover:border-flame hover:bg-kalahari transition-colors">
                    <p className="font-semibold text-navy text-sm">{t.title}</p>
                    <p className="text-xs text-muted mt-0.5">{t.category} · {t.hazards.length} hazards pre-loaded</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Document metadata */}
        <div className="card">
          <h2 className="font-display font-bold text-navy mb-4">Document Details</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ['company', 'Company Name'],
              ['site', 'Site / Location'],
              ['activity', 'Work Activity'],
              ['assessor', 'Assessor Name'],
              ['documentRef', 'Document Reference'],
              ['reviewDate', 'Review Date'],
            ].map(([k, l]) => (
              <div key={k}>
                <label className="block text-xs font-medium text-navy mb-1">{l}</label>
                <input
                  type={k === 'reviewDate' ? 'date' : 'text'}
                  value={meta[k]}
                  onChange={e => updateMeta(k, e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy"
                />
              </div>
            ))}
          </div>

          {/* Legislation picker */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-navy mb-2">Applicable Legislation</label>
            <div className="flex flex-wrap gap-2">
              {NAMIBIAN_LEGISLATION.map(l => {
                const selected = meta.legislation.includes(l.short)
                return (
                  <button key={l.id} onClick={() => {
                    updateMeta('legislation', selected
                      ? meta.legislation.filter(x => x !== l.short)
                      : [...meta.legislation, l.short])
                  }}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${selected
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-muted border-border hover:border-navy'}`}>
                    {l.short}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Hazard rows */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-navy">Hazards &amp; Control Measures</h2>
            <span className="text-xs text-muted">{hazards.length} hazard{hazards.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-4">
            {hazards.map((h, i) => (
              <HazardRow key={i} hazard={h} index={i} onChange={updateHazard} onRemove={removeHazard} />
            ))}
          </div>
          <button onClick={addHazard}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-flame hover:text-flame-dark transition-colors">
            <Plus size={16} /> Add Hazard
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <button onClick={handleExportPDF} className="btn-primary">
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
