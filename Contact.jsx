import { Mail, Phone, MessageCircle, MapPin, Calendar } from 'lucide-react'
import { COMPANY } from '@/data/company'

const items = [
  { icon: Mail,  label: 'Email',    value: COMPANY.email,    href: `mailto:${COMPANY.email}` },
  { icon: Phone, label: 'Phone',    value: COMPANY.phone,    href: `tel:${COMPANY.phoneRaw}` },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Message us',  href: COMPANY.whatsapp, external: true },
  { icon: MapPin, label: 'Location', value: COMPANY.location, href: COMPANY.links.contact, external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-kalahari border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="section-label mb-3">Get in touch</p>
            <h2 className="font-display font-bold text-navy text-3xl mb-3">
              Need more than a document?
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Tushiya Conform is built by Tushiya HS Consulting — a proudly Namibian HSE consultancy serving construction, mining, energy, and logistics. We offer on-site audits, ISO 45001 implementation, training, and customs compliance. Your first consultation is free.
            </p>
            <a href={COMPANY.links.freeSession} target="_blank" rel="noreferrer" className="btn-primary">
              <Calendar size={16} /> Book a Free Session
            </a>
            <div className="flex flex-wrap gap-2 mt-6">
              {COMPANY.credentials.map(c => (
                <span key={c} className="text-xs font-mono px-2.5 py-1 rounded-full bg-white border border-border text-muted">{c}</span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {items.map(it => (
              <a key={it.label} href={it.href}
                target={it.external ? '_blank' : undefined}
                rel={it.external ? 'noreferrer' : undefined}
                className="card flex items-start gap-3 hover:border-flame hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-navy/5 border border-navy/10 flex items-center justify-center shrink-0">
                  <it.icon size={17} className="text-navy" />
                </div>
                <div>
                  <p className="text-xs text-muted">{it.label}</p>
                  <p className="font-semibold text-navy text-sm break-all">{it.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
