import { useState } from 'react'
import { ScrollText, Download, ArrowLeft, Save } from 'lucide-react'
import { exportPolicyPDF } from '@/lib/pdfExport'

const POLICIES = [
  {
    id: 'hse-policy',
    title: 'Health & Safety Policy',
    sub: 'ISO 45001 · Labour Act 11 of 2007 Ch.11',
    icon: '🛡️',
    legislation: 'Labour Act 11 of 2007 (Chapter 11) · OHS Regulations 1997 (GN 156)',
    body: `[Company Name] is committed to providing a safe and healthy workplace for all employees, contractors, and visitors. The health, safety, and welfare of our people is a core value that underpins every activity we undertake.

POLICY COMMITMENTS:
• Comply with all applicable Namibian legislation, including the Labour Act 11 of 2007 (Chapter 11) and OHS Regulations 1997.
• Identify, assess, and control all occupational health and safety risks arising from our operations.
• Set measurable HSE objectives and targets and review them regularly.
• Provide adequate resources — financial, human, and physical — to implement this policy.
• Ensure all employees receive appropriate HSE training and supervision.
• Consult with employees and their representatives on matters affecting their health and safety.
• Investigate all incidents and near-misses to identify root causes and prevent recurrence.
• Continuously improve our OHS management system in line with ISO 45001:2018.

MANAGEMENT RESPONSIBILITIES:
Senior management is ultimately accountable for the health and safety performance of the company. Line managers are responsible for implementing this policy within their areas of control. All employees have a duty to take reasonable care for their own safety and that of others.

This policy will be reviewed annually or following any significant change to our operations.`,
  },
  {
    id: 'environmental-policy',
    title: 'Environmental Policy',
    sub: 'ISO 14001 · EMA Act 7 of 2007',
    icon: '🌿',
    legislation: 'Environmental Management Act 7 of 2007 · Namibia Water Act 54 of 1956',
    body: `[Company Name] recognises that protecting the environment is both a legal obligation and a moral responsibility. We are committed to minimising the environmental impact of our operations throughout Namibia.

POLICY COMMITMENTS:
• Comply fully with the Environmental Management Act 7 of 2007 and all applicable environmental regulations.
• Prevent pollution and reduce waste at source through sound environmental management practices.
• Conserve natural resources — water, energy, and raw materials — and improve efficiency of use.
• Assess and manage the environmental impacts of our activities, products, and services.
• Establish environmental objectives and targets and monitor progress toward them.
• Respond swiftly and effectively to any environmental emergency or spill.
• Engage with local communities and stakeholders on environmental matters.
• Continuously improve our Environmental Management System in line with ISO 14001:2015.

MANAGEMENT RESPONSIBILITIES:
All employees are responsible for understanding and complying with this policy. Environmental performance is a key indicator reviewed at management level. Non-compliance will be treated as a serious disciplinary matter.

This policy will be reviewed annually.`,
  },
  {
    id: 'quality-policy',
    title: 'Quality Policy',
    sub: 'ISO 9001:2015',
    icon: '✅',
    legislation: 'ISO 9001:2015 · Consumer Protection Framework',
    body: `[Company Name] is committed to delivering products and services that consistently meet or exceed the requirements and expectations of our clients.

POLICY COMMITMENTS:
• Meet all applicable statutory and regulatory requirements relating to our products and services.
• Understand and respond to the needs of our clients through regular engagement and feedback.
• Maintain a documented Quality Management System aligned to ISO 9001:2015.
• Set quality objectives and measure our performance against them.
• Train and develop our people to ensure the competence required to deliver quality outcomes.
• Continually improve the effectiveness of our quality management processes.
• Manage our supply chain to ensure quality inputs and subcontracted services.
• Prevent non-conformances through proactive risk management and root-cause analysis.

MANAGEMENT COMMITMENT:
Senior leadership is committed to providing the resources needed to maintain and improve our QMS. All employees are expected to take personal responsibility for the quality of their own work.

This policy is reviewed annually as part of our management review process.`,
  },
  {
    id: 'hiv-aids-policy',
    title: 'HIV/AIDS Workplace Policy',
    sub: 'Labour Act 11 of 2007',
    icon: '❤️',
    legislation: 'Labour Act 11 of 2007 · Namibian National HIV/AIDS Policy',
    body: `[Company Name] acknowledges that HIV/AIDS is a significant public health issue in Namibia and is committed to managing its impact in the workplace with compassion, dignity, and respect.

POLICY COMMITMENTS:
• Prohibit discrimination against employees based on their HIV/AIDS status.
• Maintain strict confidentiality of all HIV-related medical information.
• Provide HIV/AIDS awareness and prevention education for all employees.
• Support employees living with HIV/AIDS to remain productive members of the workforce.
• Provide access to voluntary counselling and testing (VCT) and facilitate referral to treatment.
• Apply universal precautions for all potential blood/fluid exposures in the workplace.
• Comply with the Labour Act 11 of 2007 and the Namibian National HIV/AIDS Policy.

EMPLOYMENT RIGHTS:
• Pre-employment HIV testing is prohibited.
• Employees will not be dismissed solely on the basis of their HIV/AIDS status.
• Reasonable accommodation will be made for employees whose condition affects their work.

This policy applies to all employees, contractors, and visitors on company premises.`,
  },
  {
    id: 'substance-abuse-policy',
    title: 'Alcohol & Substance Abuse Policy',
    sub: 'Labour Act 11 of 2007',
    icon: '🚫',
    legislation: 'Labour Act 11 of 2007 · OHS Regulations 1997',
    body: `[Company Name] is committed to maintaining a drug-free and alcohol-free workplace. The use or possession of alcohol or illegal substances on company premises or during work hours poses an unacceptable risk to safety.

PROHIBITED CONDUCT:
• Attending work, operating equipment, or driving company vehicles while under the influence of alcohol, drugs, or any other intoxicating substance.
• Possessing, consuming, or distributing alcohol or illegal substances on company premises.
• Being unfit for duty due to substance use, including legally prescribed medication that impairs performance.

TESTING:
• Random, post-incident, and reasonable-cause testing may be conducted by a qualified occupational health practitioner.
• A blood alcohol concentration (BAC) of 0.00 g/100 ml is required for all safety-critical roles.
• Refusal to submit to testing will be treated as a positive result.

SUPPORT AND DISCIPLINE:
Employees with substance abuse problems are encouraged to seek assistance. The company will support employees in accessing treatment. However, the company reserves the right to take disciplinary action, including dismissal, for breaches of this policy that put safety at risk.`,
  },
  {
    id: 'fatigue-management-policy',
    title: 'Fatigue Management Policy',
    sub: 'Mines Health & Safety Act',
    icon: '😴',
    legislation: 'Mines Health & Safety Act · Labour Act 11 of 2007 Part D',
    body: `[Company Name] recognises that fatigue is a significant workplace hazard that impairs judgement, reaction time, and vigilance. This policy establishes minimum standards for managing fatigue risk.

MAXIMUM WORKING HOURS:
• Maximum continuous shift: 12 hours (excluding travel time to site).
• Minimum rest between shifts: 10 hours.
• Maximum working hours per week: 60 hours ordinary + overtime.
• Workers in safety-critical roles (driving, crane operation, blasting) — maximum 10-hour shifts.

RESPONSIBILITIES:
• Supervisors must monitor signs of fatigue and relieve workers who are unfit for duty.
• Employees must report fatigue honestly and not undertake safety-critical tasks when impaired.
• Rosters must be designed to allow adequate rest and to minimise circadian disruption.

FATIGUE INDICATORS (REMOVE WORKER FROM DUTY):
• Repeated yawning, heavy eyelids, or difficulty concentrating.
• Micro-sleeps or inability to stay awake at work.
• Mistakes in tasks normally performed without difficulty.
• Employee self-reporting as too fatigued to work safely.

This policy is mandatory for all employees, contractors, and subcontractors on company worksites.`,
  },
  {
    id: 'ppe-policy',
    title: 'PPE Policy',
    sub: 'OHS Regulations 1997',
    icon: '⛑️',
    legislation: 'OHS Regulations 1997 (GN 156) Regulation 9 · Labour Act 11 of 2007',
    body: `[Company Name] is committed to providing appropriate personal protective equipment (PPE) to all employees and ensuring its correct use as required by Namibian OHS legislation.

POLICY COMMITMENTS:
• Provide PPE free of charge to all employees for tasks that require it.
• Select PPE based on a risk assessment of the hazards present.
• Ensure PPE meets recognised standards (SANS/ISO/EN) appropriate for the hazard.
• Train all employees in the correct use, care, storage, and limitations of their PPE.
• Inspect PPE regularly and replace defective or worn equipment without delay.
• Enforce PPE use in all designated areas — non-compliance is a disciplinary matter.

EMPLOYEE RESPONSIBILITIES:
• Wear PPE correctly at all times in designated areas or when instructed by a supervisor.
• Inspect PPE before each use and report damage or loss immediately.
• Store PPE properly to prevent deterioration.
• Not modify PPE in any way that compromises its protective function.

SITE MINIMUM PPE (all visitors and workers on active sites):
Hard hat · Safety boots (steel-toe, ankle support) · High-visibility vest · Safety glasses

Additional PPE is determined by the task-specific risk assessment.`,
  },
  {
    id: 'incident-reporting-policy',
    title: 'Incident Reporting Policy',
    sub: 'Labour Act 11 of 2007 Ch.11',
    icon: '📋',
    legislation: 'Labour Act 11 of 2007 Chapter 11 s.55 · OHS Regulations 1997',
    body: `[Company Name] is committed to reporting, recording, and investigating all occupational incidents to prevent recurrence and comply with Namibian legal requirements.

REPORTING REQUIREMENTS:
• All incidents (injuries, near-misses, dangerous occurrences, property damage) must be reported to the immediate supervisor without delay.
• Fatalities and serious injuries (hospitalisation > 24 hrs) must be reported to the Labour Commissioner within 24 hours as required by the Labour Act 11 of 2007.
• Near-misses must be reported with the same urgency as actual incidents — they are learning opportunities.

INVESTIGATION:
• All lost-time injuries (LTIs) and high-potential near-misses must be investigated by a competent person within 48 hours.
• Root-cause analysis must identify systemic causes, not only human error.
• Corrective actions must be assigned, tracked, and closed within agreed timeframes.

NON-REPORTING:
• Failure to report an incident is a serious breach of this policy and may constitute a criminal offence under the Labour Act. Disciplinary action, up to and including dismissal, will be taken for deliberate non-reporting.

RECORDS:
All incidents are recorded in the company incident register and retained for a minimum of 5 years.`,
  },
  {
    id: 'emergency-preparedness-policy',
    title: 'Emergency Preparedness Policy',
    sub: 'Labour Act 11 of 2007 Reg 18',
    icon: '🚨',
    legislation: 'Labour Act 11 of 2007 Regulation 18 · OHS Regulations 1997',
    body: `[Company Name] is committed to being prepared for emergencies that may affect employees, contractors, visitors, or the surrounding community.

POLICY COMMITMENTS:
• Identify credible emergency scenarios for each operational site.
• Develop, document, and maintain Emergency Response Plans (ERPs) for each site.
• Provide emergency equipment (fire extinguishers, first aid kits, eyewash stations) in adequate quantities and locations.
• Ensure a sufficient number of trained first-aiders are available on site at all times during work hours.
• Conduct emergency drills at least twice per year and document outcomes.
• Establish clear communication channels with emergency services (police, fire brigade, ambulance) and maintain updated contact lists.
• Designate emergency assembly points and ensure all personnel know their location.
• Review and update emergency plans following any drill, incident, or change in operations.

EMPLOYEE RESPONSIBILITIES:
• Know the location of emergency equipment, assembly points, and emergency contacts.
• Participate in emergency drills.
• Report any condition that could lead to an emergency.
• Follow emergency response instructions from designated emergency coordinators.

This policy applies to all worksites operated or managed by [Company Name].`,
  },
  {
    id: 'contractor-management-policy',
    title: 'Contractor Management Policy',
    sub: 'ISO 45001 Clause 8.1.4',
    icon: '🤝',
    legislation: 'ISO 45001:2018 Clause 8.1.4 · Labour Act 11 of 2007',
    body: `[Company Name] recognises that contractors and subcontractors working on our sites are subject to the same HSE risks as our own employees. This policy establishes the minimum requirements for managing contractor safety.

PRE-QUALIFICATION:
• All contractors must be pre-qualified before commencing work on site.
• Pre-qualification includes: company registration, tax clearance, public liability insurance, HSE management system documentation, employee competency records, and incident history.

ON-SITE REQUIREMENTS:
• Contractors must attend site-specific HSE induction before commencing work.
• Contractors must comply with all site HSE rules and this Contractor Management Policy.
• Contractors must submit a method statement and risk assessment for their scope of work before commencing.
• Contractors are responsible for providing appropriate PPE for their own employees.

MONITORING:
• Contractor HSE performance is monitored through regular site inspections, safety observations, and incident tracking.
• Poor HSE performance may result in suspension or removal from site.

CLIENT RESPONSIBILITIES:
[Company Name] will provide contractors with information on site-specific hazards and emergency procedures. We will consult with contractors on HSE matters affecting their work.`,
  },
]

export default function PolicyPage() {
  const [selected, setSelected] = useState(null)
  const [meta, setMeta] = useState({ company: '', address: '', director: '', date: '', documentRef: '' })
  const [body, setBody] = useState('')

  const upd = (k, v) => setMeta(m => ({ ...m, [k]: v }))

  const handleSelect = (policy) => {
    setSelected(policy)
    setBody(policy.body)
  }

  const handleExport = () => {
    if (!selected) return
    exportPolicyPDF({ ...meta, title: selected.title, legislation: selected.legislation, body })
  }

  if (!selected) {
    return (
      <div className="min-h-screen bg-kalahari">
        <div className="bg-navy py-8 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <ScrollText size={18} className="text-flame" />
              <p className="section-label">HSE Policy Generator</p>
            </div>
            <h1 className="font-display font-bold text-white text-2xl sm:text-3xl mb-1">Create HSE Policy</h1>
            <p className="text-white/50 text-sm">ISO 45001 & ISO 14001 aligned · Namibian legislation references · Editable templates</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="font-display font-bold text-navy mb-4">Select Policy Type</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {POLICIES.map(p => (
              <button key={p.id} onClick={() => handleSelect(p)}
                className="card text-left hover:border-flame hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{p.icon}</span>
                  <div>
                    <p className="font-display font-semibold text-navy group-hover:text-flame transition-colors">{p.title}</p>
                    <p className="text-xs text-muted">{p.sub}</p>
                  </div>
                </div>
                <p className="text-xs text-flame font-semibold">Generate &amp; customise →</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kalahari">
      <div className="bg-navy py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setSelected(null)}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-3 transition-colors">
            <ArrowLeft size={14} /> All Policies
          </button>
          <div className="flex items-center gap-2 mb-2">
            <ScrollText size={18} className="text-flame" />
            <p className="section-label">HSE Policy Generator</p>
          </div>
          <h1 className="font-display font-bold text-white text-2xl sm:text-3xl mb-1">
            {selected.icon} {selected.title}
          </h1>
          <p className="text-white/50 text-sm">{selected.legislation}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="card">
          <h2 className="font-display font-bold text-navy mb-4">Company Details</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ['company', 'Company Name'],
              ['address', 'Company Address'],
              ['director', 'Director / CEO Name'],
              ['documentRef', 'Document Reference'],
              ['date', 'Policy Date'],
            ].map(([k, l]) => (
              <div key={k}>
                <label className="block text-xs font-medium text-navy mb-1">{l}</label>
                <input type={k === 'date' ? 'date' : 'text'} value={meta[k]} onChange={e => upd(k, e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy" />
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-navy">Policy Content</h2>
            <span className="text-xs text-muted">Editable — customise to your company</span>
          </div>
          <textarea rows={22} value={body} onChange={e => setBody(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none font-mono leading-relaxed" />
          <p className="text-xs text-muted mt-2">
            Replace <span className="font-mono bg-kalahari px-1 rounded">[Company Name]</span> with your company name before exporting.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <button onClick={handleExport} className="btn-primary">
            <Download size={16} /> Export PDF
          </button>
          <button className="btn-outline">
            <Save size={16} /> Save to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
