import { FileText } from 'lucide-react'

/**
 * Method Statement Generator
 * Combine with a Risk Assessment to produce a full RAMS package
 */
export default function MethodStatementPage() {
  return (
    <div className="min-h-screen bg-kalahari">
      <div className="bg-navy py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={18} className="text-flame" />
            <p className="section-label">Method Statement Generator</p>
          </div>
          <h1 className="font-display font-bold text-white text-2xl sm:text-3xl mb-1">
            Create Method Statement
          </h1>
          <p className="text-white/50 text-sm">Step-by-step safe work procedures · Combine with RA for full RAMS</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="card">
          <h2 className="font-display font-bold text-navy mb-4">Document Details</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Company', 'Site / Location', 'Work Activity Description', 'Responsible Person', 'Document Reference', 'Date'].map(l => (
              <div key={l}>
                <label className="block text-xs font-medium text-navy mb-1">{l}</label>
                <input className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="font-display font-bold text-navy mb-4">Scope of Work</h2>
          <textarea rows={4} placeholder="Describe the scope, purpose, and extent of the work activity…"
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
        </div>

        <div className="card">
          <h2 className="font-display font-bold text-navy mb-4">Plant, Equipment &amp; Materials</h2>
          <textarea rows={4} placeholder="List all plant, tools, equipment, and materials required…"
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
        </div>

        <div className="card">
          <h2 className="font-display font-bold text-navy mb-4">Work Sequence — Step-by-Step Procedure</h2>
          <p className="text-sm text-muted mb-3">Describe each step of the activity, the associated hazards, and control measures.</p>
          {[1,2,3].map(n => (
            <div key={n} className="border border-border rounded-xl p-4 mb-3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">{n}</span>
                <input placeholder={`Step ${n} description`} className="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 pl-10">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Hazards at this step</label>
                  <input className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Controls in place</label>
                  <input className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
                </div>
              </div>
            </div>
          ))}
          <button className="text-sm font-semibold text-flame hover:text-flame-dark">+ Add Step</button>
        </div>

        <div className="flex gap-3">
          <button className="btn-primary">Export PDF</button>
          <button className="btn-outline">Save to Dashboard</button>
        </div>
      </div>
    </div>
  )
}
