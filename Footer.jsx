import { Link } from 'react-router-dom'
import { Shield, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { COMPANY } from '@/data/company'

const cols = [
  {
    title: 'Generators',
    links: [
      { label: 'Risk Assessment', href: '/generators/risk-assessment' },
      { label: 'HIRA',            href: '/generators/hira' },
      { label: 'Method Statement',href: '/generators/method-statement' },
      { label: 'Toolbox Talk',    href: '/generators/toolbox-talk' },
      { label: 'Permit to Work',  href: '/generators/ptw' },
      { label: 'HSE Policy',      href: '/generators/policy' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Dashboard',  href: '/dashboard' },
      { label: 'Pricing',    href: '/pricing' },
      { label: 'Sign Up',    href: '/signup' },
      { label: 'Log In',     href: '/login' },
    ],
  },
  {
    title: 'Tushiya HS Consulting',
    links: [
      { label: 'About Us',        href: 'https://tushiyahs.com/about', external: true },
      { label: 'Our Services',    href: 'https://tushiyahs.com/services', external: true },
      { label: 'Training',        href: 'https://tushiyahs.com/training', external: true },
      { label: 'Free Session',    href: 'https://tushiyahs.com/training#free-session', external: true },
      { label: 'Contact',         href: 'https://tushiyahs.com/contact', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 bg-flame rounded-lg flex items-center justify-center">
              <Shield size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-white text-sm">Tushiya Conform</span>
          </div>
          <p className="text-xs leading-relaxed text-white/50">
            Professional HSE compliance document generators built for Namibian industry — mining, rail, construction, energy, and beyond.
          </p>
          <p className="text-xs text-white/30 mt-4 mb-4">
            A product of Tushiya HS Consulting — proudly Namibian, built for real sites and real operating conditions.
          </p>

          {/* Contact details */}
          <ul className="space-y-2">
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
                <Mail size={13} className="text-flame shrink-0" /> {COMPANY.email}
              </a>
            </li>
            <li>
              <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
                <Phone size={13} className="text-flame shrink-0" /> {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
                <MessageCircle size={13} className="text-caprivi shrink-0" /> WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2 text-xs text-white/60">
              <MapPin size={13} className="text-flame shrink-0" /> {COMPANY.location}
            </li>
          </ul>
        </div>

        {/* Link columns */}
        {cols.map(col => (
          <div key={col.title}>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-white/30 mb-3">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map(l => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noreferrer"
                       className="text-sm text-white/60 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} Tushiya Conform · Tushiya HS Consulting · Namibia</p>
          <p className="text-xs text-white/20">100% Namibian-Owned · ISO 45001 Aligned · Labour Act No. 11 of 2007</p>
        </div>
      </div>
    </footer>
  )
}
