import { useState } from 'react'
import { Download, Mic2, Search } from 'lucide-react'
import { TOOLBOX_TALKS, TBT_CATEGORIES, getTalksByCategory } from '@/data/toolboxTopics'
import { exportToolboxTalkPDF } from '@/lib/pdfExport'

export default function ToolboxTalkPage() {
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [company, setCompany] = useState('')
  const [presenter, setPresenter] = useState('')
  const [date, setDate] = useState('')

  const filtered = TOOLBOX_TALKS.filter(t => {
    const matchCat = !category || t.category === category
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleExport = () => {
    if (!selected) return
    exportToolboxTalkPDF({ ...selected, company, presenter, date })
  }

  return (
    <div className="min-h-screen bg-kalahari">
      <div className="bg-navy py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Mic2 size={18} className="text-flame" />
            <p className="section-label">Toolbox Talk Generator</p>
          </div>
          <h1 className="font-display font-bold text-white text-2xl sm:text-3xl mb-1">
            Create Toolbox Talk
          </h1>
          <p className="text-white/50 text-sm">240+ topics · Namibian industry focus · PDF with attendance register</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-3 gap-6">

        {/* Topic browser */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card">
            <h2 className="font-display font-bold text-navy mb-3">Select Topic</h2>

            {/* Search */}
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search topics…"
                className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:border-navy" />
            </div>

            {/* Category filter */}
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-navy">
              <option value="">All categories</option>
              {TBT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* List */}
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {filtered.map(t => (
                <button key={t.id} onClick={() => setSelected(t)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    selected?.id === t.id ? 'bg-navy text-white' : 'hover:bg-kalahari text-navy'
                  }`}>
                  <p className="font-medium leading-tight">{t.title}</p>
                  <p className={`text-xs mt-0.5 ${selected?.id === t.id ? 'text-white/50' : 'text-muted'}`}>
                    {t.category} · {t.duration}
                  </p>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="text-xs text-muted text-center py-6">No topics match your search</p>
              )}
            </div>
          </div>
        </div>

        {/* Editor panel */}
        <div className="lg:col-span-2 space-y-4">
          {selected ? (
            <>
              <div className="card">
                <h2 className="font-display font-bold text-navy text-lg mb-1">{selected.title}</h2>
                <p className="text-xs text-muted mb-4">{selected.category} · {selected.duration} · {selected.legislation}</p>

                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  {[['company', 'Company', company, setCompany], ['presenter', 'Presenter', presenter, setPresenter], ['date', 'Date', date, setDate]].map(([k, l, v, s]) => (
                    <div key={k}>
                      <label className="block text-xs font-medium text-navy mb-1">{l}</label>
                      <input type={k === 'date' ? 'date' : 'text'} value={v} onChange={e => s(e.target.value)}
                        className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-medium text-navy mb-1">Talk Content</label>
                  <textarea rows={12} defaultValue={`[Facilitator: deliver this talk in 10–15 minutes before work commences]\n\nToday we are discussing: ${selected.title}\n\nKey points to cover:\n1. \n2. \n3. \n\nLegislation reference: ${selected.legislation}\n\nQ&A: Ask workers to confirm understanding before signing attendance register.`}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none" />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleExport} className="btn-primary">
                  <Download size={16} /> Export PDF + Attendance Register
                </button>
                <button className="btn-outline">Save to Dashboard</button>
              </div>
            </>
          ) : (
            <div className="card flex flex-col items-center justify-center py-20 text-center">
              <Mic2 size={36} className="text-border mb-4" />
              <p className="font-display font-semibold text-navy">Select a topic</p>
              <p className="text-sm text-muted mt-1">Choose a toolbox talk topic from the list to start editing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
