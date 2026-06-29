/**
 * Tushiya Conform — Namibian Legislation Reference
 * Used in document footers, legislation pickers, and compliance notes
 */

export const NAMIBIAN_LEGISLATION = [
  {
    id: 'labour-2007',
    short: 'Labour Act 11 of 2007',
    long: 'Labour Act 11 of 2007 — Chapter 11: Occupational Health and Safety',
    category: 'OHS — General',
    summary: 'Principal Namibian statute imposing OSH duties on employers. Requires hazard identification, risk assessment, safe work procedures, PPE, and incident reporting to the Labour Commissioner.',
    applicability: ['All employers', 'All industries'],
    url: 'https://laws.parliament.na/cms_documents/labour-act-11-of-2007-c3be93d9ad.pdf',
  },
  {
    id: 'ohs-regs-1997',
    short: 'OHS Regulations 1997',
    long: 'General Safety Regulations — GN 156 of 1997',
    category: 'OHS — General',
    summary: 'Prescribes specific requirements for machinery, electrical installations, confined spaces, scaffolding, elevated work platforms, and hazardous substances.',
    applicability: ['All employers', 'Construction', 'Manufacturing'],
    url: null,
  },
  {
    id: 'mhsa',
    short: 'Mines Health & Safety Act',
    long: 'Mines Health and Safety Act (Namibia)',
    category: 'OHS — Mining',
    summary: 'Governs health, safety, and environmental standards in all Namibian mines. Requires mine safety plans, emergency preparedness, blast procedures, and inspectorate notification of incidents.',
    applicability: ['Mining operations', 'Quarrying'],
    url: null,
  },
  {
    id: 'explosives-1956',
    short: 'Explosives Act 26 of 1956',
    long: 'Explosives Act 26 of 1956 (as amended)',
    category: 'OHS — Mining',
    summary: 'Controls acquisition, storage, transport, and use of explosives. All blast risk assessments and method statements must reference this Act and Namibian explosive regulations.',
    applicability: ['Mining', 'Blasting contractors', 'Quarrying'],
    url: null,
  },
  {
    id: 'ema-2007',
    short: 'EMA Act 7 of 2007',
    long: 'Environmental Management Act 7 of 2007',
    category: 'Environmental',
    summary: 'Requires EIA and environmental management plans for listed activities including mining, construction, and energy projects. Environmental risk assessments must align to EMA.',
    applicability: ['Mining', 'Construction', 'Energy', 'Industry'],
    url: null,
  },
  {
    id: 'electricity-2007',
    short: 'Electricity Act 2 of 2007',
    long: 'Electricity Act 2 of 2007',
    category: 'Electrical',
    summary: 'Regulates the electricity supply industry including safety standards for electrical installations and OLE systems.',
    applicability: ['All industries', 'Rail', 'Construction'],
    url: null,
  },
  {
    id: 'road-traffic-1999',
    short: 'Road Traffic and Transport Act 22 of 1999',
    long: 'Road Traffic and Transport Act 22 of 1999',
    category: 'Transport',
    summary: 'Governs road transport safety including vehicle standards, driver licensing, and load requirements. Applies to all mine and site vehicle operations on public roads.',
    applicability: ['Mining', 'Construction', 'Logistics'],
    url: null,
  },
  {
    id: 'iso-45001',
    short: 'ISO 45001:2018',
    long: 'ISO 45001:2018 — Occupational Health and Safety Management Systems',
    category: 'Management System',
    summary: 'International standard for OHSMS. All HIRA templates, policy documents, and management review procedures are aligned to ISO 45001 Clause 6.1 (risks and opportunities) and 9.1 (performance evaluation).',
    applicability: ['All industries', 'Certified organisations'],
    url: 'https://www.iso.org/standard/63787.html',
  },
  {
    id: 'iso-14001',
    short: 'ISO 14001:2015',
    long: 'ISO 14001:2015 — Environmental Management Systems',
    category: 'Management System',
    summary: 'International standard for EMS. Environmental risk assessments and aspect/impact registers in Tushiya Conform are aligned to ISO 14001 Clause 6.1.2.',
    applicability: ['All industries', 'Certified organisations'],
    url: 'https://www.iso.org/standard/60857.html',
  },
  {
    id: 'transnamib-rules',
    short: 'TransNamib Track Access Rules',
    long: 'TransNamib Track Access and Safety Rules (2019)',
    category: 'Rail',
    summary: 'Operational safety rules for working in the Namibian rail network. Possession orders, look-out requirements, and flag protection procedures. All rail RAMS must comply.',
    applicability: ['Rail construction', 'Rail maintenance'],
    url: null,
  },
]

export function getLegislationById(id) {
  return NAMIBIAN_LEGISLATION.find(l => l.id === id)
}

export function getLegislationByCategory(category) {
  return NAMIBIAN_LEGISLATION.filter(l => l.category === category)
}
