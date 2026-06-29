import Hero from '@/components/home/Hero'
import GeneratorsGrid from '@/components/home/GeneratorsGrid'
import Features from '@/components/home/Features'
import Industries from '@/components/home/Industries'
import Legislation from '@/components/home/Legislation'
import PricingSection from '@/components/home/PricingSection'
import FAQ from '@/components/home/FAQ'
import Contact from '@/components/home/Contact'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Hero />
      <GeneratorsGrid />
      <Features />
      <Industries />
      <Legislation />
      <PricingSection />
      <FAQ />
      <Contact />

      {/* Final CTA */}
      <section className="py-16 bg-navy text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-white text-3xl mb-4">
            Start creating your HSE documents today
          </h2>
          <p className="text-white/60 mb-8">
            Join Namibian businesses and HSE professionals using Tushiya Conform to manage compliance — free to start, no credit card required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/signup" className="btn-primary">Create Free Account</Link>
            <Link to="/generators/risk-assessment" className="btn-outline border-white/30 text-white hover:bg-white hover:text-navy">
              Try Risk Assessment
            </Link>
          </div>
          <p className="text-xs text-white/30 mt-6">
            A product of Tushiya HS Consulting · Walvis Bay &amp; Windhoek, Namibia · oswald@tushiyahs.com
          </p>
        </div>
      </section>
    </>
  )
}
