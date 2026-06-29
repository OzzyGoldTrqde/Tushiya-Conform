import { Calculator, PenLine, Stamp, Building2, Download, LayoutDashboard } from 'lucide-react'

const features = [
  {
    icon: Calculator,
    title: 'Automatic Risk Matrix',
    desc: 'Built-in 5×5 risk matrix calculates severity × likelihood and residual risk automatically. Colour-coded RAG ratings per hazard row.',
  },
  {
    icon: PenLine,
    title: 'Digital Signatures & Sign-offs',
    desc: 'Share documents via secure link. Workers, contractors, and supervisors sign on any device. Up to 100 e-signatures per document with full audit trail.',
  },
  {
    icon: Stamp,
    title: 'Namibian Legislation Built In',
    desc: 'Every template references the Labour Act 11 of 2007, Mines Health & Safety Act, Explosives Act, and OHS Regulations 1997 — no manual cross-referencing needed.',
  },
  {
    icon: Building2,
    title: 'Your Company Branding',
    desc: 'Upload your logo and company details. Every exported document carries your professional brand — ready for client submission, inspector review, or internal audit.',
  },
  {
    icon: Download,
    title: 'PDF & Word Export',
    desc: 'Download print-ready PDFs or editable Word documents. Professional formatting — page numbers, headers, footers, signature blocks — all generated automatically.',
  },
  {
    icon: LayoutDashboard,
    title: 'Compliance Library Dashboard',
    desc: 'Save all documents to your secure dashboard. Set review dates, track sign-off completion, and manage your entire HSE document library from one place.',
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="section-label text-center mb-3">Platform Features</p>
        <h2 className="font-display font-bold text-navy text-3xl lg:text-4xl text-center mb-3">
          Everything built for the Namibian HSE professional
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-12">
          Designed by HSE practitioners with mining and heavy-industry field experience — not a generic template library.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(f => (
            <div key={f.title} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy/5 border border-navy/10 flex items-center justify-center shrink-0">
                <f.icon size={20} className="text-navy" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-navy mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
