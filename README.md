# Tushiya Conform

**Professional HSE compliance document generation for Namibian industry**
*A product of [Tushiya HS Consulting](https://tushiyahs.com) · Walvis Bay & Windhoek, Namibia*

---

## What it is

Tushiya Conform is a full-stack SaaS platform for generating professional HSE documents — Risk Assessments, HIRA, Method Statements, Toolbox Talks, Permits to Work, and HSE Policies — pre-loaded with Namibia-specific hazards, control measures, and legislation references.

Inspired by platforms like healthsafetyzone.com but built for the Namibian regulatory environment:
- Labour Act 11 of 2007 (Chapter 11 — OHS)
- Mines Health & Safety Act
- OHS Regulations 1997 (GN 156)
- Explosives Act 26 of 1956
- Environmental Management Act 7 of 2007
- TransNamib Track Access Rules

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18 + Vite + Tailwind CSS                  |
| State      | Zustand                                         |
| Routing    | React Router v6                                 |
| Backend    | Node.js + Express                               |
| Database   | Supabase (PostgreSQL + Auth + RLS)              |
| PDF Export | jsPDF + jspdf-autotable                         |
| Word Export| docx (server-side, Pro plan)                    |
| Email      | Nodemailer (SMTP)                               |

---

## Project Structure

```
tushiya-conform/
├── frontend/                        # React + Vite
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx             # Landing page
│       │   ├── Dashboard.jsx        # Saved document library
│       │   ├── Login.jsx / Signup.jsx
│       │   ├── Pricing.jsx
│       │   └── generators/
│       │       ├── RiskAssessmentPage.jsx   ← FULLY BUILT
│       │       ├── ToolboxTalkPage.jsx      ← FULLY BUILT
│       │       ├── MethodStatementPage.jsx  ← SCAFFOLDED
│       │       ├── HIRAPage.jsx             ← STUB
│       │       ├── PTWPage.jsx              ← TYPE GRID
│       │       └── PolicyPage.jsx           ← TYPE GRID
│       ├── components/
│       │   ├── layout/    Navbar, Footer
│       │   └── home/      Hero (animated), Generators, Features,
│       │                  Industries, Legislation, Pricing, FAQ
│       ├── data/
│       │   ├── riskTemplates.js      5 templates, 15+ pre-loaded hazards
│       │   ├── toolboxTopics.js      35+ topics across 10 categories
│       │   └── namibianLegislation.js 10 Namibian legislation items
│       ├── lib/
│       │   ├── riskMatrix.js         5×5 matrix, severity × likelihood
│       │   ├── pdfExport.js          jsPDF export — RA + Toolbox Talk
│       │   └── supabase.js           Auth + CRUD helpers
│       └── stores/
│           ├── authStore.js          Zustand auth
│           └── documentStore.js      Zustand document library
│
├── backend/                         # Node.js + Express
│   └── src/
│       ├── routes/        auth, documents, templates, signatures, export
│       ├── middleware/    auth (Supabase JWT), rateLimit
│       └── services/      docxService, emailService
│
└── supabase/
    ├── migrations/001_initial_schema.sql   Full schema + RLS policies
    └── seed/risk_templates.sql             Optional server-side templates
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd tushiya-conform
npm install
```

### 2. Set up Supabase

1. Create a new project at [app.supabase.com](https://app.supabase.com)
2. Go to **SQL Editor** → paste and run `supabase/migrations/001_initial_schema.sql`
3. Copy your project URL and API keys from **Settings → API**

### 3. Configure environment variables

```bash
# Frontend
cp frontend/.env.example frontend/.env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Backend
cp backend/.env.example backend/.env
# Fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, FRONTEND_URL
```

### 4. Run in development

```bash
npm run dev
# Starts frontend on http://localhost:5173
# Starts backend API on http://localhost:3001
```

---

## Key Features

### Document Generators

| Generator        | Status         | Notes                                              |
|------------------|----------------|----------------------------------------------------|
| Risk Assessment  | ✅ Full build  | Template picker, hazard rows, risk matrix, PDF export |
| Toolbox Talk     | ✅ Full build  | Topic browser, editor, PDF + attendance register   |
| Method Statement | 🟡 Scaffolded  | UI complete — wire up PDF/DOCX export              |
| HIRA             | 🔴 Stub        | Expand from Risk Assessment pattern                |
| Permit to Work   | 🟡 Type grid   | 12 permit types — build individual form per type   |
| HSE Policy       | 🟡 Type grid   | 10 policy types — build Word output per type       |

### Risk Matrix
- 5×5 matrix (Severity × Likelihood)
- Automatic RAG rating: LOW / MEDIUM / HIGH / EXTREME
- Initial and residual risk per hazard row
- PDF export with colour-coded cells

### Digital Signatures
- Share link generation (`/api/signatures/share`)
- Public sign-off via token-scoped URL
- Signature data stored in Supabase
- Sign-off report per document

### Pricing Tiers (NAD)
- **Free**: N$0 — 3 documents, 5 hazards, 5 signatures
- **Standard**: N$180/mo — 15 docs, 20 hazards, company branding
- **Pro**: N$450/mo — 100 docs, unlimited hazards, Word export

---

## Adding Templates

Add new Namibian hazard templates to `frontend/src/data/riskTemplates.js`:

```js
{
  id: 'unique-id',
  title: 'Activity Name',
  category: 'Mining & Quarrying',  // must match RA_CATEGORIES
  legislation: ['Labour Act 11 of 2007'],
  hazards: [
    {
      activity: 'Specific task',
      hazard: 'What could go wrong',
      severity: 4,          // 1–5
      likelihood: 3,        // 1–5
      controls: ['Control measure 1', 'Control measure 2'],
      residualSeverity: 4,
      residualLikelihood: 1,
      ppe: ['Hard hat', 'Safety boots'],
      legislation: 'OHS Regulations 1997 Reg X',
    }
  ],
}
```

---

## Adding Toolbox Talk Topics

Add to `frontend/src/data/toolboxTopics.js`:

```js
{
  id: 'cat-XXX',
  title: 'Topic Title',
  category: 'Mining Safety',   // must match TBT_CATEGORIES
  duration: '10 min',
  legislation: 'Labour Act 11 of 2007 Ch.11',
}
```

---

## Deployment

### Frontend (Netlify / Vercel)
```bash
cd frontend && npm run build
# Deploy the dist/ folder
# Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY as env vars in your host
```

### Backend (Railway / Render)
```bash
# Set all backend env vars in your platform dashboard
# Start command: node src/server.js
# Or use the Procfile if needed
```

---

## Roadmap

- [ ] HIRA generator (bowtie diagram, barrier identification)
- [ ] Permit to Work — individual form builders per type
- [ ] Company profile & logo upload
- [ ] Subscription billing (Stripe or PayGate Namibia)
- [ ] Document version control and audit trail
- [ ] Contractor portal (separate auth flow)
- [ ] Offline mode (PWA / service worker)
- [ ] Mobile app (React Native)

---

## Built By

**Tushiya HS Consulting**
Walvis Bay & Windhoek, Namibia
📧 oswald@tushiyahs.com
📱 +264 81 260 9767 (call / WhatsApp)
🌐 https://tushiyahs.com

*Tushiya Conform is developed by HSE practitioners with 8+ years of Namibian mining, rail, and heavy-industry experience. Documents are aligned to current Namibian legislation but should be reviewed by a competent person before use. First consultation free.*

---

## Licence

Proprietary — © Tushiya HS Consulting, Namibia. Not for redistribution without permission.
