import { ExternalLink } from 'lucide-react'

const legislation = [
  {
    short: 'Labour Act 11 of 2007',
    sub: 'Chapter 11 — Occupational Health & Safety',
    desc: 'The principal Namibian statute imposing OSH duties on employers. Requires hazard identification, risk assessment, safe work procedures, PPE provision, and incident reporting.',
    href: 'https://laws.parliament.na/cms_documents/labour-act-11-of-2007-c3be93d9ad.pdf',
  },
  {
    short: 'OHS Regulations 1997',
    sub: 'GN 156 — General Safety Regulations',
    desc: 'Prescribes specific requirements for machinery, electrical installations, confined spaces, scaffolding, and hazardous substances in Namibian workplaces.',
    href: null,
  },
  {
    short: 'Mines Health & Safety Act',
    sub: 'Namibian Mining Regulations',
    desc: 'Governs health, safety, and environmental standards in Namibian mines. Requires mine safety plans, emergency preparedness, blast procedures, and competency certification.',
    href: null,
  },
  {
    short: 'Explosives Act 26 of 1956',
    sub: 'As amended',
    desc: 'Controls the acquisition, storage, transport, and use of explosives in Namibia. All blast risk assessments reference this Act and associated regulations.',
    href: null,
  },
  {
    short: 'Environmental Management Act (EMA)',
    sub: 'Act 7 of 2007',
    desc: 'Requires Environmental Impact Assessments and environmental management plans for listed activities, including mining, construction, and energy projects.',
    href: null,
  },
  {
    short: 'Namibia Railways Act',
    sub: 'TransNamib Operational Standards',
    desc: 'Governs railway safety including level crossing procedures, rail corridor exclusion zones, and track worker protection — applied to all rail construction RAMS.',
    href: null,
  },
  {
    short: 'Namibian Compensation Act',
    sub: 'PSEMAS / Workmen\'s Compensation',
    desc: 'Requires incident reporting to the Social Security Commission. Tushiya Conform incident records align to SSC reporting requirements for occupational injuries and diseases.',
    href: null,
  },
  {
    short: 'ISO 45001:2018',
    sub: 'Occupational Health & Safety Management',
    desc: 'International standard for OHSMS. All HIRA templates and policy documents are aligned to ISO 45001 Clause 6.1 risk assessment and 8.2 emergency preparedness requirements.',
    href: 'https://www.iso.org/standard/63787.html',
  },
]

export default function Legislation() {
  return (
    <section className="py-16 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="section-label text-center mb-3">Regulatory Alignment</p>
        <h2 className="font-display font-bold text-navy text-3xl lg:text-4xl text-center mb-3">
          Built for Namibian compliance
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-12">
          Every template cites the specific legislation your inspectors, auditors, and clients will check — so you don't have to look it up.
        </p>

        <div className="space-y-3 max-w-4xl mx-auto">
          {legislation.map(l => (
            <div key={l.short} className="border border-border rounded-xl px-5 py-4 bg-kalahari/40 hover:bg-kalahari transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className="font-display font-bold text-navy text-sm">{l.short}</span>
                    <span className="text-xs text-muted">{l.sub}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{l.desc}</p>
                </div>
                {l.href && (
                  <a href={l.href} target="_blank" rel="noreferrer"
                    className="shrink-0 text-flame hover:text-flame-dark transition-colors mt-0.5">
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
