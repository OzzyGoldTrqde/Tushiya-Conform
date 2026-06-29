const industries = [
  { name: 'Mining & Quarrying',       desc: 'Open-pit, underground, diamond, uranium, copper, zinc — hazard libraries for each ore type and extraction method.' },
  { name: 'Rail Construction',         desc: 'Northern Railway Extension, Kranzberg–Tsumeb, and similar rail projects. Right-of-way, track laying, level crossings.' },
  { name: 'Construction & Civil',      desc: 'Groundworks, structures, roofing, scaffolding, RAMS for principal contractors and subcontractors.' },
  { name: 'Oil, Gas & Energy',         desc: 'Upstream, midstream, solar, and renewable energy — PTW systems, HAZOP support, and SIMOPS risk assessments.' },
  { name: 'Ports & Logistics',         desc: 'Walvis Bay Port Authority aligned — vessel operations, container handling, stevedoring, and cargo risk.' },
  { name: 'Manufacturing & Processing', desc: 'Plant operations, chemical handling, noise monitoring, and machine guarding for Namibian processing facilities.' },
  { name: 'Desalination & Water',       desc: 'EDP and similar plant operations — confined space, chemical dosing, high-pressure systems, and COSHH-equivalent.' },
  { name: 'Facilities & Maintenance',  desc: 'Building maintenance, cleaning, electrical, and plumbing — lone working, PPE matrices, and LOTO procedures.' },
]

export default function Industries() {
  return (
    <section className="py-16 bg-kalahari border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="section-label text-center mb-3">Industries</p>
        <h2 className="font-display font-bold text-navy text-3xl lg:text-4xl text-center mb-3">
          Built for Namibia's industries
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-12">
          Not a one-size-fits-all library. Every hazard, control measure, and legislation reference is matched to the specific risks of each Namibian sector.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map(ind => (
            <div key={ind.name} className="card hover:shadow-sm transition-shadow">
              <h3 className="font-display font-semibold text-navy text-sm mb-2">{ind.name}</h3>
              <p className="text-xs text-muted leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
