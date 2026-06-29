/**
 * Tushiya Conform — Namibian Risk Assessment Templates
 * Pre-built hazard sets for common Namibian industries
 */

export const RA_CATEGORIES = [
  'Mining & Quarrying',
  'Rail Construction',
  'Construction & Civil Works',
  'Oil, Gas & Energy',
  'Ports & Logistics',
  'Manufacturing & Processing',
  'Desalination & Water Treatment',
  'Facilities & Maintenance',
  'Office & Administrative',
  'Agriculture & Forestry',
]

export const RA_TEMPLATES = [
  // ─── MINING ──────────────────────────────────────────────────────────────
  {
    id: 'mine-001',
    title: 'Open-Pit Drilling Operations',
    category: 'Mining & Quarrying',
    legislation: ['Mines Health & Safety Act', 'Labour Act 11 of 2007 Ch.11'],
    hazards: [
      {
        activity: 'Rotary percussion drilling',
        hazard: 'Rotating drill string — entanglement of clothing/limbs',
        severity: 4, likelihood: 3,
        controls: ['Full-body exclusion zone around rotating components', 'Fitted PPE — no loose clothing', 'LOTO before approaching drill string', 'Competent driller on duty at all times'],
        residualSeverity: 4, residualLikelihood: 1,
        ppe: ['Hard hat', 'Safety boots', 'Ear protection', 'Eye protection', 'High-visibility vest'],
        legislation: 'Mines Health & Safety Act, Reg 4.5',
      },
      {
        activity: 'Explosive loading',
        hazard: 'Premature detonation of explosives',
        severity: 5, likelihood: 2,
        controls: ['Licensed blaster in charge', 'Blast clearance zone established and signed off', 'Electronic detonators preferred over shock tube', 'Weather check — no blasting in lightning conditions'],
        residualSeverity: 5, residualLikelihood: 1,
        ppe: ['Blast-rated hard hat', 'Blast glasses', 'Anti-static clothing'],
        legislation: 'Explosives Act 26 of 1956, Reg 13',
      },
      {
        activity: 'Bench wall inspection',
        hazard: 'Rock fall and slope instability',
        severity: 4, likelihood: 3,
        controls: ['Geotechnical engineer sign-off before entry', 'Scaling of loose rock', 'No personnel under active bench', 'Ground vibration monitoring after blasting'],
        residualSeverity: 4, residualLikelihood: 1,
        ppe: ['Hard hat', 'Safety boots', 'High-visibility vest'],
        legislation: 'Mines Health & Safety Act, Reg 6.1',
      },
    ],
  },

  {
    id: 'mine-002',
    title: 'Underground Mine Conveyor Maintenance',
    category: 'Mining & Quarrying',
    legislation: ['Mines Health & Safety Act', 'OHS Regulations 1997'],
    hazards: [
      {
        activity: 'Belt tensioning',
        hazard: 'Caught between belt and pulley — crush/amputation',
        severity: 5, likelihood: 2,
        controls: ['LOTO on all energy sources', 'PTW issued and signed off', 'Exclusion zone — no access while in motion', 'Two-person buddy system'],
        residualSeverity: 5, residualLikelihood: 1,
        ppe: ['Hard hat', 'Gloves', 'Safety boots', 'Ear protection'],
        legislation: 'OHS Regulations 1997, GN 156 Reg 8',
      },
      {
        activity: 'Belt replacement in drive head area',
        hazard: 'Entrapment in drive pulley nip point',
        severity: 5, likelihood: 2,
        controls: ['Full isolation and LOTO verified by maintenance supervisor', 'Written PTW — Mechanical Isolation', 'Physical guarding reinstated before de-isolation'],
        residualSeverity: 5, residualLikelihood: 1,
        ppe: ['Hard hat', 'Safety boots', 'Gloves'],
        legislation: 'OHS Regulations 1997, Reg 9',
      },
    ],
  },

  // ─── RAIL CONSTRUCTION ───────────────────────────────────────────────────
  {
    id: 'rail-001',
    title: 'Track Laying Operations — Northern Railway Extension',
    category: 'Rail Construction',
    legislation: ['Labour Act 11 of 2007', 'TransNamib Safety Standards', 'OHS Regulations 1997'],
    hazards: [
      {
        activity: 'Rail handling and placement',
        hazard: 'Musculoskeletal injury from manual handling of rail sections',
        severity: 3, likelihood: 3,
        controls: ['Mechanical rail laying equipment used wherever possible', 'Team lift for manual handling — minimum 6 persons per rail', 'Pre-lift briefing and designated lift coordinator'],
        residualSeverity: 2, residualLikelihood: 2,
        ppe: ['Gloves', 'Safety boots', 'Hard hat', 'High-visibility vest'],
        legislation: 'Labour Act 11 of 2007, Ch.11 Reg 15',
      },
      {
        activity: 'Working in active rail corridor',
        hazard: 'Struck by rail vehicle/locomotive during track works',
        severity: 5, likelihood: 3,
        controls: ['Possession order obtained from TransNamib Operations', 'Look-out posted at 1 km radius from work area', 'Radio communication maintained throughout possession', 'Red flag and stop boards displayed at rail limits'],
        residualSeverity: 5, residualLikelihood: 1,
        ppe: ['High-visibility Class 3 vest', 'Hard hat', 'Safety boots'],
        legislation: 'TransNamib Track Access Rules 2019',
      },
      {
        activity: 'Thermite welding of rail joints',
        hazard: 'Burns from molten metal and ignition of vegetation',
        severity: 3, likelihood: 3,
        controls: ['Fire watch in position with extinguisher', 'Vegetation cleared 3 m radius of weld point', 'Certified thermite welder only', 'Emergency burn kit on site'],
        residualSeverity: 2, residualLikelihood: 2,
        ppe: ['Welding visor', 'Leather gloves', 'Leather apron', 'Safety boots'],
        legislation: 'Labour Act 11 of 2007, Ch.11',
      },
    ],
  },

  // ─── CONSTRUCTION ────────────────────────────────────────────────────────
  {
    id: 'const-001',
    title: 'Working at Height — Roof and Steel Structure',
    category: 'Construction & Civil Works',
    legislation: ['Labour Act 11 of 2007', 'OHS Regulations 1997'],
    hazards: [
      {
        activity: 'Roof panel installation',
        hazard: 'Fall from height — fatal or serious injury',
        severity: 5, likelihood: 3,
        controls: ['Edge protection installed before work begins', 'Full-body harness and twin-leg lanyard — 100% tie-off rule', 'Access platform or scissor lift preferred over ladders', 'Rescue plan in place before commencing at-height work'],
        residualSeverity: 5, residualLikelihood: 1,
        ppe: ['Hard hat', 'Full-body harness', 'Lanyard', 'Safety boots', 'Hi-vis vest'],
        legislation: 'OHS Regulations 1997, GN 156 Reg 18',
      },
    ],
  },

  // ─── DESALINATION ─────────────────────────────────────────────────────────
  {
    id: 'desal-001',
    title: 'Chemical Dosing — Chlorine and Coagulant Handling',
    category: 'Desalination & Water Treatment',
    legislation: ['Labour Act 11 of 2007', 'OHS Regulations 1997'],
    hazards: [
      {
        activity: 'Chlorine drum change-out',
        hazard: 'Chlorine gas release — respiratory / eye injury',
        severity: 4, likelihood: 2,
        controls: ['Full-face respirator with chlorine cartridges', 'Two-person operation minimum', 'Eyewash station within 10 seconds of dosing area', 'Wind direction check before commencing'],
        residualSeverity: 3, residualLikelihood: 1,
        ppe: ['Full-face respirator', 'Chemical-resistant gloves', 'Chemical-resistant apron', 'Safety boots'],
        legislation: 'Labour Act 11 of 2007, Ch.11 Reg 17',
      },
    ],
  },
]

export function getTemplatesByCategory(category) {
  return RA_TEMPLATES.filter(t => t.category === category)
}

export function getTemplateById(id) {
  return RA_TEMPLATES.find(t => t.id === id)
}
