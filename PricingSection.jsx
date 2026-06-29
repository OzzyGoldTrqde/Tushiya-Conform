import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: 'N$0',
    period: 'forever',
    desc: 'Try Tushiya Conform — create real documents with no commitment.',
    cta: 'Start Free',
    href: '/signup',
    highlight: false,
    features: [
      ['Saved documents', '3'],
      ['Documents per day', '2'],
      ['Risks per assessment', '5'],
      ['Active share links', '1'],
      ['E-signatures per document', '5'],
      ['Signature expiry', '14 days'],
      ['Document retention', '30 days'],
      ['Company branding', false],
      ['Word (.docx) export', false],
      ['Unlocked PDFs', false],
    ],
  },
  {
    name: 'Standard',
    price: 'N$180',
    period: 'per month',
    desc: 'More capacity plus your logo on every document.',
    cta: 'Choose Standard',
    href: '/signup?plan=standard',
    highlight: false,
    features: [
      ['Saved documents', '15'],
      ['Documents per day', '10'],
      ['Risks per assessment', '20'],
      ['Active share links', '8'],
      ['E-signatures per document', '30'],
      ['Signature expiry', '30 days'],
      ['Document retention', '90 days'],
      ['Company branding', true],
      ['Word (.docx) export', false],
      ['Unlocked PDFs', true],
    ],
  },
  {
    name: 'Pro',
    price: 'N$450',
    period: 'per month',
    desc: 'The full toolkit for HSE professionals and consultancies.',
    cta: 'Go Pro',
    href: '/signup?plan=pro',
    highlight: true,
    features: [
      ['Saved documents', '100'],
      ['Documents per day', 'Unlimited'],
      ['Risks per assessment', 'Unlimited'],
      ['Active share links', '30'],
      ['E-signatures per document', '100'],
      ['Signature expiry', '90 days'],
      ['Document retention', '365 days'],
      ['Company branding', true],
      ['Word (.docx) export', true],
      ['Unlocked PDFs', true],
    ],
  },
]

function FeatureRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
      <span className="text-muted">{label}</span>
      {typeof value === 'boolean' ? (
        value
          ? <Check size={15} className="text-caprivi" />
          : <X size={15} className="text-red-300" />
      ) : (
        <span className="font-semibold text-navy">{value}</span>
      )}
    </div>
  )
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 bg-kalahari border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="section-label text-center mb-3">Pricing</p>
        <h2 className="font-display font-bold text-navy text-3xl lg:text-4xl text-center mb-3">
          Start free. Upgrade when you're ready.
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-12">
          Priced in Namibian Dollars. Cancel any time. Enterprise plans available for multi-site businesses and HSE consultancies.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map(t => (
            <div key={t.name} className={`rounded-2xl border p-6 ${t.highlight
              ? 'bg-navy border-navy shadow-xl ring-2 ring-flame'
              : 'bg-white border-border'}`}>
              {t.highlight && (
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-flame mb-2">Most Popular</p>
              )}
              <h3 className={`font-display font-bold text-2xl mb-1 ${t.highlight ? 'text-white' : 'text-navy'}`}>{t.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`font-display font-extrabold text-3xl ${t.highlight ? 'text-white' : 'text-navy'}`}>{t.price}</span>
                <span className={`text-xs ${t.highlight ? 'text-white/50' : 'text-muted'}`}>/ {t.period}</span>
              </div>
              <p className={`text-sm mb-6 ${t.highlight ? 'text-white/60' : 'text-muted'}`}>{t.desc}</p>

              <Link to={t.href}
                className={`block text-center py-2.5 rounded-lg font-semibold text-sm mb-6 transition-colors ${
                  t.highlight
                    ? 'bg-flame text-white hover:bg-flame-dark'
                    : 'bg-navy text-white hover:bg-navy-dark'
                }`}>
                {t.cta}
              </Link>

              <div className={t.highlight ? '[&_.text-muted]:text-white/50 [&_.text-navy]:text-white [&_.border-border]:border-white/10' : ''}>
                {t.features.map(([label, value]) => (
                  <FeatureRow key={label} label={label} value={value} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted mt-8">
          Need more? <a href="mailto:oswald@tushiyahs.com" className="text-flame font-medium hover:underline">Contact Tushiya HS Consulting</a> for Enterprise pricing, white-label, and API access.
        </p>
      </div>
    </section>
  )
}
