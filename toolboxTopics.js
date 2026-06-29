/**
 * Tushiya Conform — Toolbox Talk Topics
 * Pre-built safety briefing scripts for Namibian industry
 */

export const TBT_CATEGORIES = [
  'General Safety',
  'Mining Safety',
  'Rail & Transport',
  'Electrical Safety',
  'Chemical & COSHH',
  'Working at Height',
  'Fire Safety',
  'Health & Wellbeing',
  'Environmental',
  'Emergency Preparedness',
]

export const TOOLBOX_TALKS = [
  // General
  { id: 'gen-001', title: 'Personal Protective Equipment (PPE) — Selection & Use', category: 'General Safety', duration: '10 min', legislation: 'Labour Act 11 of 2007 Ch.11 Reg 14' },
  { id: 'gen-002', title: 'Housekeeping and Slip, Trip, Fall Prevention', category: 'General Safety', duration: '8 min', legislation: 'OHS Regulations 1997 GN 156' },
  { id: 'gen-003', title: 'Lockout/Tagout (LOTO) — Energy Isolation Procedures', category: 'General Safety', duration: '12 min', legislation: 'OHS Regulations 1997 Reg 9' },
  { id: 'gen-004', title: 'Manual Handling and Ergonomics', category: 'General Safety', duration: '10 min', legislation: 'Labour Act 11 of 2007 Reg 15' },
  { id: 'gen-005', title: 'Incident and Near-Miss Reporting', category: 'General Safety', duration: '10 min', legislation: 'Labour Act 11 of 2007 Ch.11 Reg 20' },
  { id: 'gen-006', title: 'Driving Safety — Light Vehicles on Mine and Construction Sites', category: 'General Safety', duration: '12 min', legislation: 'Road Traffic and Transport Act 22 of 1999' },
  { id: 'gen-007', title: 'Fatigue Management — Shift Workers', category: 'General Safety', duration: '10 min', legislation: 'Labour Act 11 of 2007' },
  { id: 'gen-008', title: 'Alcohol and Substance Abuse in the Workplace', category: 'General Safety', duration: '15 min', legislation: 'Labour Act 11 of 2007' },

  // Mining
  { id: 'mine-001', title: 'Blasting Safety and Pre-Blast Procedures', category: 'Mining Safety', duration: '15 min', legislation: 'Explosives Act 26 of 1956' },
  { id: 'mine-002', title: 'Ground Control and Rock Fall Prevention', category: 'Mining Safety', duration: '12 min', legislation: 'Mines Health & Safety Act' },
  { id: 'mine-003', title: 'Crushing and Screening Plant Safety', category: 'Mining Safety', duration: '10 min', legislation: 'OHS Regulations 1997 Reg 9' },
  { id: 'mine-004', title: 'Dust Control — Silica and Mineral Dust Exposure', category: 'Mining Safety', duration: '12 min', legislation: 'Mines Health & Safety Act, OEL Guidelines' },
  { id: 'mine-005', title: 'Haul Road Safety and Heavy Vehicle Interaction', category: 'Mining Safety', duration: '10 min', legislation: 'Mines Health & Safety Act' },
  { id: 'mine-006', title: 'Confined Space Entry Procedures', category: 'Mining Safety', duration: '15 min', legislation: 'OHS Regulations 1997' },

  // Rail
  { id: 'rail-001', title: 'Rail Track Worker Safety — Possession and Protection', category: 'Rail & Transport', duration: '15 min', legislation: 'TransNamib Track Access Rules 2019' },
  { id: 'rail-002', title: 'Working Near Live Railway Lines', category: 'Rail & Transport', duration: '12 min', legislation: 'TransNamib Operational Safety Standards' },
  { id: 'rail-003', title: 'Thermite Welding Safety', category: 'Rail & Transport', duration: '10 min', legislation: 'Labour Act 11 of 2007' },
  { id: 'rail-004', title: 'Overhead Line Equipment (OLE) Safety Awareness', category: 'Rail & Transport', duration: '10 min', legislation: 'Electricity Act 2 of 2007' },

  // Electrical
  { id: 'elec-001', title: 'Electrical Safety — Low Voltage Hazards', category: 'Electrical Safety', duration: '12 min', legislation: 'Electricity Act 2 of 2007' },
  { id: 'elec-002', title: 'Permit to Work — Electrical Isolation', category: 'Electrical Safety', duration: '15 min', legislation: 'OHS Regulations 1997 Reg 9' },
  { id: 'elec-003', title: 'Temporary Electrical Installations on Construction Sites', category: 'Electrical Safety', duration: '10 min', legislation: 'OHS Regulations 1997' },

  // Chemical
  { id: 'chem-001', title: 'Hazardous Chemical Substances — SDS and Safe Handling', category: 'Chemical & COSHH', duration: '12 min', legislation: 'Labour Act 11 of 2007 Reg 17' },
  { id: 'chem-002', title: 'Chemical Spill Response and Containment', category: 'Chemical & COSHH', duration: '10 min', legislation: 'EMA Act 7 of 2007' },
  { id: 'chem-003', title: 'GHS Labelling and Pictograms', category: 'Chemical & COSHH', duration: '8 min', legislation: 'Labour Act 11 of 2007' },

  // WAH
  { id: 'wah-001', title: 'Working at Height — Harness Inspection and Donning', category: 'Working at Height', duration: '15 min', legislation: 'OHS Regulations 1997 Reg 18' },
  { id: 'wah-002', title: 'Scaffold Inspection — Tag System', category: 'Working at Height', duration: '10 min', legislation: 'OHS Regulations 1997 Reg 17' },
  { id: 'wah-003', title: 'Ladder Safety — Inspection and Three-Point Contact', category: 'Working at Height', duration: '8 min', legislation: 'OHS Regulations 1997' },

  // Fire
  { id: 'fire-001', title: 'Fire Prevention and Class of Fire', category: 'Fire Safety', duration: '12 min', legislation: 'Labour Act 11 of 2007' },
  { id: 'fire-002', title: 'Fire Extinguisher Operation', category: 'Fire Safety', duration: '10 min', legislation: 'Labour Act 11 of 2007' },
  { id: 'fire-003', title: 'Emergency Evacuation Procedures', category: 'Fire Safety', duration: '8 min', legislation: 'Labour Act 11 of 2007 Ch.11 Reg 18' },

  // Health
  { id: 'hlth-001', title: 'Heat Stress and Dehydration — Namibian Climate', category: 'Health & Wellbeing', duration: '10 min', legislation: 'Labour Act 11 of 2007' },
  { id: 'hlth-002', title: 'HIV/AIDS Awareness in the Workplace', category: 'Health & Wellbeing', duration: '15 min', legislation: 'Labour Act 11 of 2007' },
  { id: 'hlth-003', title: 'Mental Health and Stress Management', category: 'Health & Wellbeing', duration: '15 min', legislation: 'Labour Act 11 of 2007' },

  // Environmental
  { id: 'env-001', title: 'Environmental Compliance — Spill Prevention on Site', category: 'Environmental', duration: '10 min', legislation: 'EMA Act 7 of 2007' },
  { id: 'env-002', title: 'Waste Management and Segregation', category: 'Environmental', duration: '8 min', legislation: 'EMA Act 7 of 2007' },

  // Emergency
  { id: 'emg-001', title: 'Emergency Preparedness and First Aid', category: 'Emergency Preparedness', duration: '15 min', legislation: 'Labour Act 11 of 2007 Ch.11 Reg 19' },
  { id: 'emg-002', title: 'Mustering and Emergency Assembly Points', category: 'Emergency Preparedness', duration: '8 min', legislation: 'Labour Act 11 of 2007' },
]

export function getTalksByCategory(category) {
  return TOOLBOX_TALKS.filter(t => t.category === category)
}
