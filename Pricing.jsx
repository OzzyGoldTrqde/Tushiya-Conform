import PricingSection from '@/components/home/PricingSection'

export default function Pricing() {
  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-4">
        <h1 className="font-display font-bold text-navy text-4xl mb-3">Pricing</h1>
        <p className="text-muted">All plans include full access to document generators. Upgrade for more saves, branding, and Word export.</p>
      </div>
      <PricingSection />
    </div>
  )
}
