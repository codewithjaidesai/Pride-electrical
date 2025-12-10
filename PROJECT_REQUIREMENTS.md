# Pride Electrical Website - Project Requirements & Architecture

## IMPORTANT: This is the Source of Truth
This document (`PROJECT_REQUIREMENTS.md`) should be saved in the root of the repository.
When working on this project, always refer back to this file for:
- Business context and rules
- Architecture decisions
- Phase definitions and scope
- Technical specifications

If you're unsure about any implementation detail, re-read the relevant section of this document.

---

## Project Overview

### Business Context
**Pride Electrical** is India's largest dealer of **Dowell's** brand cable accessories (a Polycab subsidiary). We specialize in:
- Cable Lugs (Copper, Aluminium, Bi-metallic)
- Cable Glands (Brass, Stainless Steel, Nylon)
- Crimping Tools & Accessories
- Connectors for sector-shaped conductors

**Office Locations:**
- Hyderabad, India (Primary)
- Mumbai, India

### Website Goals
1. **Brand Presence**: Establish Pride Electrical as the go-to Dowell's dealer online
2. **Product Discovery**: Searchable catalog of 2500+ products with specifications
3. **Automated Quoting**: Smart quote generator using cable-industry business rules
4. **SEO Dominance**: Rank higher than competitors for cable accessory searches
5. **Lead Generation**: Capture customer inquiries and quote requests

### Target Audience
- Electrical contractors
- Industrial procurement teams
- Electrical wholesalers
- Project engineers (power, construction, infrastructure)

---

## Technical Architecture

### Stack Decision
```
Frontend:       Next.js 14 (App Router)
Styling:        Tailwind CSS
Hosting:        Vercel (free tier)
CMS:            Sanity (Phase 4 - for blog/SEO content)
Database:       JSON files initially, can migrate to DB later
Forms:          Email via Resend/SendGrid or Formspree
```

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                        VERCEL HOSTING                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    ┌─────────────────────────────────────────────────────┐  │
│    │              NEXT.JS APPLICATION                     │  │
│    ├─────────────────────────────────────────────────────┤  │
│    │                                                      │  │
│    │   PAGES:                                            │  │
│    │   ├── / (Homepage)                                  │  │
│    │   ├── /about                                        │  │
│    │   ├── /contact                                      │  │
│    │   ├── /products (Catalog)                           │  │
│    │   ├── /products/[category]                          │  │
│    │   ├── /products/[category]/[product]                │  │
│    │   ├── /quote-generator                              │  │
│    │   └── /blog (Phase 4)                               │  │
│    │                                                      │  │
│    └─────────────────────────────────────────────────────┘  │
│                              │                               │
│         ┌────────────────────┼────────────────────┐         │
│         ▼                    ▼                    ▼         │
│    ┌──────────┐      ┌─────────────┐      ┌───────────┐    │
│    │ Product  │      │   Quote     │      │   CMS     │    │
│    │ Data     │      │   Engine    │      │ (Sanity)  │    │
│    │ (JSON)   │      │ (Business   │      │           │    │
│    │          │      │  Rules)     │      │           │    │
│    └──────────┘      └─────────────┘      └───────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Folder Structure
```
pride-electrical-website/
├── PROJECT_REQUIREMENTS.md    # THIS FILE - Source of Truth
├── BUSINESS_RULES.md          # Detailed quoting rules
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   ├── about/
│   │   ├── contact/
│   │   ├── products/
│   │   │   ├── page.tsx       # All products
│   │   │   └── [category]/
│   │   │       ├── page.tsx   # Category page
│   │   │       └── [slug]/
│   │   │           └── page.tsx  # Product detail
│   │   ├── quote-generator/
│   │   └── blog/              # Phase 4
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── home/
│   │   ├── products/
│   │   ├── quote/
│   │   └── ui/                # Reusable UI components
│   │
│   ├── lib/
│   │   ├── products.ts        # Product data utilities
│   │   ├── quote-engine.ts    # Quote calculation logic
│   │   └── utils.ts
│   │
│   └── data/
│       ├── products/          # Product JSON files by category
│       │   ├── copper-lugs.json
│       │   ├── aluminium-lugs.json
│       │   ├── cable-glands.json
│       │   └── ...
│       └── catalog-metadata.json
│
└── public/
    ├── images/
    │   ├── logo/
    │   ├── products/
    │   └── banners/
    └── documents/
        └── dowells-catalog.pdf
```

---

## Design Specifications

### Color Palette
```css
/* Primary - Professional Deep Blue */
--primary-900: #0f172a;
--primary-800: #1e293b;
--primary-700: #1e3a5f;  /* Main brand color */
--primary-600: #2563eb;
--primary-500: #3b82f6;

/* Accent - Energetic Orange */
--accent-500: #f97316;
--accent-600: #ea580c;

/* Dowell's Brand Red (use sparingly for brand references) */
--dowells-red: #e63329;

/* Neutrals */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-900: #111827;

/* Semantic */
--success: #22c55e;
--warning: #eab308;
--error: #ef4444;
```

### Typography
- **Headings**: Inter or system-ui (bold weights)
- **Body**: Inter or system-ui (regular weights)
- **Monospace**: For product codes/catalog numbers

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Business Rules for Quote Engine

### CRITICAL: These rules MUST be implemented exactly

### Rule 1: Source of Truth
The Dowell's catalog PDF is the source of truth for all pricing and product specifications.
Always pull exact list prices from the extracted product data.

### Rule 2: Customer Translation
When customers request "cables", they actually need:
- Cable Glands (for cable entry/termination)
- Cable Lugs (for conductor termination)

Always match compatible sizes based on cable specifications.

### Rule 3: Core Multiplier Formula
```
Glands Quantity = Order Quantity (1 gland per cable end)
Lugs Quantity = Order Quantity × Number of Cores
```

**Examples:**
| Cable Type | Order Qty | Glands Needed | Lugs Needed |
|------------|-----------|---------------|-------------|
| 1 core     | 10        | 10            | 10          |
| 2 core     | 10        | 10            | 20          |
| 3 core     | 10        | 10            | 30          |
| 4 core     | 10        | 10            | 40          |

### Rule 4: 3.5 Core Special Rule
For 3.5 core cables:
```
Glands = Order Quantity
Lugs = (Qty × 3) of FULL SIZE + (Qty × 1) of HALF SIZE
Half Size = Cable Size ÷ 2 (in sq mm)
```

**Example:**
- 3.5 core, 70 sq mm cable, Quantity 10
- Glands: 10 units
- Lugs: 30 units of 70 sq mm + 10 units of 35 sq mm

### Rule 5: Size Alternatives
If exact size unavailable, offer the closest available size (typically next size UP for safety).
Always verify lug type matches customer specification:
- Ring type
- Pin type
- Fork type
- Insulated vs non-insulated
- Bi-metallic

### Rule 6: Insulated Pin Type - Small Sizes
When customer requests "Insulated Pin Type" in sizes 0.5-1.5 sq mm:
- They likely need **End Sealing Ferrules Insulated** (not Pin Terminals)
- Flag as uncertain in quote
- Provide BOTH options with note

### Rule 7: Copper Flat Type Mapping
"Copper Flat Type" requests → Map to **Copper Tube Terminal Medium Duty (CUS series)**

Standard hole sizes:
- 70 sq mm → 10mm hole (CUS-17)
- 185 sq mm → 12mm hole

### Rule 8: Industry Standard Hole Sizes
When customer doesn't specify hole size, use industry standards:
- 185 sq mm aluminium lugs → 12mm hole size
- (More standards to be added as discovered)

### Rule 9: Size Format Normalization
Normalize all size formats before matching:
```
Input formats → Normalized
"sqmm"       → "sq mm"
"sq.mm"      → "sq mm"
"mm²"        → "sq mm"
"mm2"        → "sq mm"
"square mm"  → "sq mm"
```

---

## Development Phases

### Phase 1: Foundation & Brand Presence
**Goal:** Get online with professional presence
**Estimated Time:** 1-2 Claude Code sessions

**Deliverables:**
- [ ] Next.js 14 project initialized with TypeScript
- [ ] Tailwind CSS configured with custom color palette
- [ ] Homepage with:
  - [ ] Hero section ("India's Largest Dowell's Dealer")
  - [ ] Product categories preview (Lugs, Glands, Tools)
  - [ ] Why Choose Us section (trust signals)
  - [ ] Call-to-action sections
- [ ] About page (company story, offices, placeholder for team)
- [ ] Contact page with form (Name, Email, Phone, Company, Message)
- [ ] Responsive header with navigation
- [ ] Footer with contact info, quick links, social placeholders
- [ ] Mobile-responsive design throughout
- [ ] Basic SEO (meta tags, Open Graph, robots.txt, sitemap)
- [ ] Favicon and logo placeholders

**Not in Phase 1:**
- Product catalog pages
- Quote generator
- Blog/CMS
- Form backend (just frontend for now)

---

### Phase 2: Product Catalog
**Goal:** Searchable product database from Dowell's catalog
**Estimated Time:** 2-3 Claude Code sessions
**Dependency:** Product data extracted from PDF (provided separately)

**Deliverables:**
- [ ] Product data JSON files organized by category
- [ ] Products listing page with:
  - [ ] Category filters
  - [ ] Search functionality
  - [ ] Size/specification filters
  - [ ] Grid/list view toggle
- [ ] Category landing pages (for SEO)
- [ ] Individual product detail pages with:
  - [ ] Specifications table
  - [ ] Catalog number
  - [ ] List price
  - [ ] Related products
- [ ] Breadcrumb navigation
- [ ] SEO optimization for product pages

**Product Categories to Include:**
1. Copper Lugs (Tube Terminals, Sector Lugs, Ring/Pin/Fork)
2. Aluminium Lugs
3. Bi-metallic Lugs
4. Cable Glands (Brass, SS304, SS316, Nylon)
5. Connectors (In-line, Reducer)
6. End Sealing Ferrules
7. Tools & Accessories

---

### Phase 3: Quote Generator
**Goal:** Automated quote system using business rules
**Estimated Time:** 2-3 Claude Code sessions
**Dependency:** Phase 2 complete, Business Rules finalized

**Deliverables:**
- [ ] Quote generator page with multi-step form:
  - [ ] Step 1: Cable specifications (size, cores, type, quantity)
  - [ ] Step 2: Select gland type (if needed)
  - [ ] Step 3: Select lug type and specifications
  - [ ] Step 4: Review & generate
- [ ] Quote calculation engine implementing all business rules
- [ ] Quote summary with:
  - [ ] Line items with quantities and list prices
  - [ ] Core multiplier breakdown shown
  - [ ] Notes/warnings (e.g., size alternatives, uncertain items)
- [ ] PDF quote generation (downloadable)
- [ ] Email quote submission (to Pride Electrical team for review)
- [ ] Quote reference number generation
- [ ] Form validation and error handling

**Quote Flow:**
```
Customer Input → Validation → Business Rules Applied →
Product Matching → Price Calculation → Quote Generated →
Email to Pride Electrical → Team Reviews → Responds to Customer
```

---

### Phase 4: CMS & SEO Content
**Goal:** Easy content management for blog and SEO
**Estimated Time:** 1-2 Claude Code sessions
**Dependency:** Phases 1-3 complete

**Deliverables:**
- [ ] Sanity CMS integration
- [ ] Blog section with:
  - [ ] Article listing page
  - [ ] Individual article pages
  - [ ] Categories/tags
  - [ ] Author info
- [ ] SEO-optimized article template
- [ ] CMS schemas for:
  - [ ] Blog posts
  - [ ] Product updates/announcements
  - [ ] FAQ items
- [ ] Documentation for content editors

**Initial SEO Content Ideas:**
- "Complete Guide to Cable Gland Selection"
- "Copper vs Aluminium Lugs: When to Use What"
- "Understanding Cable Lug Size Charts"
- "How to Calculate Cable Accessories for Your Project"
- Location pages for Hyderabad/Mumbai

---

### Phase 5: Future Enhancements (Not in Initial Scope)
- Customer accounts and quote history
- Inventory/stock integration
- WhatsApp Business API integration
- Automated email responses
- Analytics dashboard
- Multi-language support (Hindi)

---

## Maintenance Procedures

### Updating Product Catalog (1-2x per year)
1. Receive new Dowell's price list PDF
2. Run extraction script: `npm run extract-catalog`
3. Review extracted data in `/src/data/products/`
4. Commit and push to deploy
5. Verify prices on live site

### Publishing SEO Articles (Monthly)
1. Log into Sanity CMS dashboard
2. Create new "Blog Post"
3. Write content with proper headings (H2, H3)
4. Add featured image
5. Fill SEO fields (meta description, keywords)
6. Publish

### Adding New Business Rules
1. Update `BUSINESS_RULES.md` in repo
2. Update `PROJECT_REQUIREMENTS.md` (this file)
3. Implement in `/src/lib/quote-engine.ts`
4. Add test cases
5. Deploy and verify

---

## Contact Information (To Be Updated)

### Hyderabad Office
- Address: [TO BE PROVIDED]
- Phone: [TO BE PROVIDED]
- Email: [TO BE PROVIDED]

### Mumbai Office
- Address: [TO BE PROVIDED]
- Phone: [TO BE PROVIDED]
- Email: [TO BE PROVIDED]

### General
- WhatsApp: [TO BE PROVIDED]
- Business Hours: [TO BE PROVIDED]
- Website: pride-electrical-website.vercel.app (temporary)

---

## Getting Started for Claude Code

When starting a new session, begin with:
```
I'm working on the Pride Electrical website. Please read PROJECT_REQUIREMENTS.md
in the repo root to understand the full context, architecture, and current phase.

Current status: [PHASE X - description of what's done and what's next]

Today I want to work on: [specific task]
```

This ensures continuity between sessions.

---

## Changelog

| Date | Change | Phase |
|------|--------|-------|
| 2024-12-10 | Initial project requirements created | Setup |

---

*Last Updated: 2024-12-10*
*Document Version: 1.0*
