import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Shield, ChevronDown, Menu, X } from 'lucide-react'

const generators = [
  { label: 'Risk Assessment',  href: '/generators/risk-assessment' },
  { label: 'HIRA',             href: '/generators/hira' },
  { label: 'Method Statement', href: '/generators/method-statement' },
  { label: 'Toolbox Talk',     href: '/generators/toolbox-talk' },
  { label: 'Permit to Work',   href: '/generators/ptw' },
  { label: 'HSE Policy',       href: '/generators/policy' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [genOpen, setGenOpen] = useState(false)

  return (
    <header className="bg-navy sticky top-0 z-50 border-b border-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-flame rounded-lg flex items-center justify-center">
            <Shield size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-display font-bold text-white text-base leading-none">Tushiya</span>
            <span className="font-display font-bold text-flame text-base leading-none"> Conform</span>
            <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest leading-none mt-0.5">by Tushiya HS Consulting</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Generators dropdown */}
          <div className="relative" onMouseEnter={() => setGenOpen(true)} onMouseLeave={() => setGenOpen(false)}>
            <button className="flex items-center gap-1 px-3 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-white/5">
              Generators <ChevronDown size={14} className={`transition-transform ${genOpen ? 'rotate-180' : ''}`} />
            </button>
            {genOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-border overflow-hidden">
                {generators.map(g => (
                  <NavLink key={g.href} to={g.href}
                    className="block px-4 py-2.5 text-sm text-navy hover:bg-kalahari font-medium transition-colors">
                    {g.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/pricing" className={({isActive}) =>
            `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/5'}`}>
            Pricing
          </NavLink>
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/login" className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors">
            Log in
          </Link>
          <Link to="/signup" className="btn-primary text-sm py-2">
            Start Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/80 hover:text-white">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-dark border-t border-white/10 px-4 py-4 space-y-1">
          <p className="text-xs font-mono text-white/40 uppercase tracking-widest px-3 pb-2">Generators</p>
          {generators.map(g => (
            <Link key={g.href} to={g.href} onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5">
              {g.label}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-3 mt-3 flex gap-2">
            <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 text-white/80 border border-white/20 rounded-lg text-sm font-semibold">Log in</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 bg-flame text-white rounded-lg text-sm font-semibold">Start Free</Link>
          </div>
        </div>
      )}
    </header>
  )
}
