import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Are the documents free?',
    a: 'Yes — you can create and download your first documents without creating an account. Free accounts give you 3 saved documents and 2 per day. Standard and Pro plans unlock more capacity, company branding, and Word export.',
  },
  {
    q: 'Are these documents legally compliant in Namibia?',
    a: 'Every template references current Namibian legislation including the Labour Act 11 of 2007 (Chapter 11), Mines Health & Safety Act, Explosives Act, and OHS Regulations 1997. Tushiya Conform is developed by Tushiya HS Consulting, a Namibian HSE consultancy with over 8 years of mining and heavy-industry experience. Documents should be reviewed by a competent person before implementation.',
  },
  {
    q: 'What is a HIRA and when do I need one?',
    a: 'A Hazard Identification and Risk Assessment (HIRA) is required under the Labour Act 11 of 2007 and ISO 45001:2018 before any work activity begins. It systematically identifies hazards, evaluates risk levels, and determines control measures. HIRAs are mandatory in mines and for any notifiable high-risk activity.',
  },
  {
    q: 'Can I use these for mine sites?',
    a: 'Yes. Tushiya Conform includes dedicated hazard libraries for open-pit mining, underground mining, diamond recovery, uranium processing, and blasting operations — aligned to the Mines Health & Safety Act and Namibia Mines Inspectorate requirements.',
  },
  {
    q: 'How do digital signatures work?',
    a: 'Share any saved document via a secure link. Recipients open the document on any device, read it, and sign electronically. You can collect up to 100 signatures per document (Pro plan) and download a sign-off report confirming who has read and acknowledged the assessment.',
  },
  {
    q: 'Can I add my company logo and branding?',
    a: 'Company branding is available on Standard and Pro plans. Upload your logo, company name, registration number, and contact details — they appear on every generated PDF and Word document automatically.',
  },
  {
    q: 'What is a Permit to Work and do I need one for my site?',
    a: 'A Permit to Work (PTW) is a formal written system for controlling high-risk non-routine work — hot work, confined space entry, working at height, electrical isolation, and excavations. PTWs are legally required under the OHS Regulations and Mines Health & Safety Act for defined activities.',
  },
  {
    q: 'Can Tushiya HS Consulting help me implement these documents on site?',
    a: 'Yes. Tushiya Conform is powered by Tushiya HS Consulting. If you need on-site implementation, training, auditing, customs compliance, or a retainer HSE service, contact us directly at oswald@tushiyahs.com or +264 81 260 9767. Your first consultation is free.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-kalahari transition-colors">
        <span className="font-display font-semibold text-navy text-sm">{q}</span>
        <ChevronDown size={16} className={`shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 bg-white border-t border-border">
          <p className="text-sm text-muted leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-16 bg-white border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="section-label text-center mb-3">FAQ</p>
        <h2 className="font-display font-bold text-navy text-3xl lg:text-4xl text-center mb-10">
          Common questions
        </h2>
        <div className="space-y-3">
          {faqs.map(f => <FAQItem key={f.q} {...f} />)}
        </div>
      </div>
    </section>
  )
}
