-- ==========================================================================
-- Tushiya Conform — Seed: Risk Templates
-- These are stored server-side for future API delivery of templates.
-- Frontend currently uses /frontend/src/data/riskTemplates.js directly.
-- ==========================================================================

-- This table is optional — create it if you want to manage templates via DB.
create table if not exists public.risk_templates (
  id          text primary key,
  title       text not null,
  category    text not null,
  legislation text[],
  hazards     jsonb default '[]'::jsonb,
  created_at  timestamptz default now()
);

insert into public.risk_templates (id, title, category, legislation, hazards) values
(
  'mine-001',
  'Open-Pit Drilling Operations',
  'Mining & Quarrying',
  array['Mines Health & Safety Act', 'Labour Act 11 of 2007 Ch.11'],
  '[
    {
      "activity": "Rotary percussion drilling",
      "hazard": "Rotating drill string — entanglement of clothing/limbs",
      "severity": 4, "likelihood": 3,
      "controls": ["Full-body exclusion zone", "LOTO before approaching", "Competent driller"],
      "residualSeverity": 4, "residualLikelihood": 1,
      "ppe": ["Hard hat","Safety boots","Ear protection","Eye protection"]
    }
  ]'::jsonb
),
(
  'rail-001',
  'Track Laying Operations — Northern Railway Extension',
  'Rail Construction',
  array['Labour Act 11 of 2007', 'TransNamib Safety Standards'],
  '[
    {
      "activity": "Working in active rail corridor",
      "hazard": "Struck by rail vehicle during track works",
      "severity": 5, "likelihood": 3,
      "controls": ["Possession order from TransNamib", "Look-out posted at 1 km", "Radio comms throughout"],
      "residualSeverity": 5, "residualLikelihood": 1,
      "ppe": ["High-visibility Class 3 vest","Hard hat","Safety boots"]
    }
  ]'::jsonb
);
