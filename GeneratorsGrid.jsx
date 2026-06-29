import { Link } from 'react-router-dom'
import { AlertTriangle, Activity, FileText, Mic2, KeyRound, BookOpen, ArrowRight } from 'lucide-react'

const generators = [
  {
    icon: AlertTriangle,
    color: 'text-red-500 bg-red-50 border-red-100',
    title: 'Risk Assessment',
    href: '/generators/risk-assessment',
    count: '380+',
    countLabel: 'Namibian templates',
    desc: 'Build OHSA-compliant risk assessments in 4 steps. Pre-loaded hazard libraries for mining, rail, and construction. Automatic risk matrix, residual risk scoring, and reviewer e-signatures.',
    cta: 'Create Risk Assessment',
  },
  {
    icon: Activity,
    color: 'text-orange-500 bg-orange-50 border-orange-100',
    title: 'HIRA',
    href: '/generators/hira',
    count: '200+',
    countLabel: 'hazard scenarios',
    desc: 'Hazard Identification and Risk Assessment aligned to ISO 45001:2018. Full bowtie diagram support, barrier identification, and competency-linked control measures.',
    cta: 'Start HIRA',
  },
  {
    icon: FileText,
    color: 'text-blue-500 bg-blue-50 border-blue-100',
    title: 'Method Statement',
    href: '/generators/method-statement',
    count: '150+',
    countLabel: 'procedure templates',
    desc: 'Step-by-step safe work procedures for high-risk activities. Combine with a Risk Assessment to produce a complete RAMS package for client submission.',
    cta: 'Write Method Statement',
  },
  {
    icon: Mic2,
    color: 'text-caprivi bg-green-50 border-green-100',
    title: 'Toolbox Talk',
    href: '/generators/toolbox-talk',
    count: '240+',
    countLabel: 'safety topics',
    desc: 'Ready-made safety briefing scripts covering mining, rail, construction, and general industry. Generate, edit, export as PDF, and track attendance with digital sign-off.',
    cta: 'Browse Toolbox Talks',
  },
  {
    icon: KeyRound,
    color: 'text-amber-600 bg-amber-50 border-amber-100',
    title: 'Permit to Work',
    href: '/generators/ptw',
    count: '12',
    countLabel: 'permit types',
    desc: 'Hot work, confined space, working at height, electrical isolation, and more. Sequential approval workflow with isolating authority and area authority e-signatures.',
    cta: 'Issue Permit',
  },
  {
    icon: BookOpen,
    color: 'text-purple-500 bg-purple-50 border-purple-100',
    title: 'HSE Policy',
    href: '/generators/policy',
    count: '60+',
    countLabel: 'policy templates',
    desc: 'ISO 45001 and ISO 14001 aligned policy documents. Covers OHS, environmental, quality, HIV/AIDS workplace policy, and more — customised with your company details.',
    cta: 'Build Policy',
  },
]

export default function GeneratorsGrid() {
  return (
    <section id="generators" className="py-16 bg-kalahari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="section-label text-center mb-3">Document Generators</p>
        <h2 className="font-display font-bold text-navy text-3xl lg:text-4xl text-center mb-2">
          Six generators. Every document you need.
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12">
          Every generator is pre-loaded with Namibia-specific content — hazards, legislation references, control measures, and PPE requirements matched to your industry.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {generators.map(g => (
            <div key={g.title} className="card flex flex-col group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${g.color}`}>
                  <g.icon size={20} />
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-navy text-xl">{g.count}</p>
                  <p className="text-[10px] text-muted">{g.countLabel}</p>
                </div>
              </div>

              <h3 className="font-display font-bold text-navy text-lg mb-2">{g.title}</h3>
              <p className="text-sm text-muted leading-relaxed flex-1 mb-5">{g.desc}</p>

              <Link to={g.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame group-hover:gap-2.5 transition-all">
                {g.cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-border pt-10">
          {[
            ['1,000+', 'Document Templates'],
            ['380+', 'Risk Assessment Templates'],
            ['240+', 'Toolbox Talk Topics'],
            ['12', 'Permit to Work Types'],
            ['100%', 'Free to Start'],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="font-display font-extrabold text-navy text-2xl">{n}</p>
              <p className="text-xs text-muted mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
