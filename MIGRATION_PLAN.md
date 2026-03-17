# Migration Plan: Jekyll Site → Astro

**Source:** `thingsboard.github.io` (Jekyll)
**Target:** `thingsboard.io` (Astro + Starlight)

> **Scope:** Marketing and product pages only. Documentation migration is tracked separately.

---

## Legend

### Complexity

| Level | Dev time (solo) | Dev time (Claude-assisted) | Description |
|-------|-----------------|---------------------------|-------------|
| **L** (Low) | 2–4 h | 0.5–1 h | Static content, straightforward layout |
| **M** (Medium) | 5–8 h | 1–2 h | Standard pages with typical components |
| **H** (High) | 9–16 h | 2–4 h | Complex layouts, dynamic content, multiple sub-pages |
| **VH** (Very High) | 17–40 h | 4–8 h | Large section requiring infrastructure work |

> **Claude-assisted** = Claude writes code + MDX, human reviews, gathers assets (images/copy), tests visually in browser, and makes design/architecture decisions.
> Batch content (blog posts, partner pages) gets an extra ~85 % reduction once a template exists.
> Asset gathering (screenshots from Jekyll, logos, marketing copy) is **not** reduced — human effort only.

### Status

Update the **Status** column as work progresses:

| Value | Meaning |
|-------|---------|
| `[ ]` | Not started |
| `[x]` | Done |

### Testing (optional)

The **Test** column shows minimal dev self-testing time (smoke test, responsive check, cross-browser quick pass).
It is **optional** — fill in only when a dedicated test pass is planned.
Typical rule of thumb: **~15% of Dev time**, rounded to the nearest 0.5 h.

---

## Section summary

| Section | Pages | Dev solo (h) | Dev Claude (h) | Test solo (h) | Test Claude (h) | Priority |
|---------|-------|-------------|----------------|--------------|-----------------|----------|
| Homepage (updates) | 1 | 4–6 | 1–2 | 0.5–1 | 0.5 | P1 |
| Pricing | 1 | 12–20 | 3–5 | 2–3 | 1 | P1 |
| Products — main pages | 9 | 56–88 | 12–18 | 5–8 | 2–3 | P1 |
| Products — sub-pages | 18 | 33–52 | 7–11 | 4–6 | 1–2 | P2 |
| Use Cases | 17 | 65–105 | 14–22 | 7–12 | 3–5 | P2 |
| Industries | 8 | 31–50 | 7–11 | 5–7 | 2–3 | P2 |
| Services | 6 | 36–54 | 8–14 | 5–8 | 2–3 | P1 |
| Case Studies | 32 | 80–118 | 18–28 | 10–16 | 4–6 | P2 |
| Partners | ~65 | 101–178 | 18–30 | 15–26 | 5–8 | P3 |
| Company / About | 1 | 5–8 | 1–2 | 0.5–1 | 0.5 | P2 |
| Careers | 1 | 8–12 | 2–3 | 1–2 | 0.5–1 | P3 |
| Blog | 61+ posts + infra | 106–190 | 25–42 | 15–28 | 6–10 | P2 |
| Root-level marketing | 14 | 57–97 | 12–22 | 8–14 | 3–5 | P2 |
| Miscellaneous pages | 5 | 12–19 | 3–5 | 1–3 | 0.5–1 | P3 |
| **Infrastructure** | — | 54–82 | 12–18 | 8–12 | 3–5 | **Pre-req** |
| **TOTAL** | **~234+** | **~660–1079** | **~143–233** | **~87–147** | **~34–57** | |

---

## Infrastructure (prerequisite)

Must be completed before most marketing pages can be built.

| # | Task | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-------------|------------|---------|----------|--------|
| T1 | Marketing layout | Standalone Astro layout without Starlight sidebar | H | 8–12 | 1–2 | [ ] |
| T2 | Header / Navigation | Top nav with dropdowns for marketing site | H | 10–16 | 2–3 | [ ] |
| T3 | Footer | Full footer with all sections | M | 4–6 | 0.5–1 | [ ] |
| T4 | SEO component | Meta tags, Open Graph, structured data | M | 4–6 | 0.5–1 | [ ] |
| T5 | Forms infrastructure | Contact, Demo Request, Apply — backend/email integration | H | 8–12 | 1–2 | [ ] |
| T6 | Content Collections setup | For Case Studies, Blog, Partners | H | 8–12 | 1–2 | [ ] |
| T7 | Redirects | 301 redirects from legacy URLs | M | 4–6 | 1 | [ ] |
| T8 | Analytics / Cookie banner | GA4, consent banner | M | 4–6 | 0.5–1 | [ ] |
| T9 | Routing strategy | Pages outside `/docs/` — agree on structure | M | 4–6 | — | [ ] |

**Total: 54–82 h dev · 7–13 h test**

---

## 1. Homepage (updates)

**URL:** `/`
**Status:** Partially implemented — needs review against original.

| # | Task | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-------------|------------|---------|----------|--------|
| 1.1 | Diff review | Compare current homepage to original; identify gaps | L | 2–3 | — | [ ] |
| 1.2 | Content sync | Update texts, images, CTA buttons | L | 2–3 | 0.5–1 | [ ] |

**Total: 4–6 h dev · 0.5–1 h test**

---

## 2. Pricing

**URL:** `/pricing/`

| # | Page | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-------------|------------|---------|----------|--------|
| 2.1 | Pricing | Single page with tabs for CE, Cloud, PE, TBMQ. Feature comparison tables, monthly/annual toggle, billing links, contact forms. Most important commercial page. | H | 12–20 | 2–3 | [ ] |

**Notes:**
- Components needed: `PricingTab`, `PricingTable`, `PricingCard`, `PricingToggle`
- Links to external billing gateway
- Consider whether prices are static or fetched from an API

**Total: 12–20 h dev · 2–3 h test**

---

## 3. Products

### 3a. Main product pages

| # | Page | URL | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-----|-------------|------------|---------|----------|--------|
| 3.1 | Products overview | `/products/` | Overview page with product cards | M | 5–8 | 1 | [x] |
| 3.2 | ThingsBoard PE | `/products/thingsboard-pe/` | PE landing: advantages over CE, features, CTA | H | 8–12 | 1–2 | [x] |
| 3.3 | ThingsBoard Cloud | `/products/paas/` | Cloud landing: SLA, regions, managed infra, pricing | H | 8–12 | 1–2 | [x] |
| 3.4 | ThingsBoard Edge | `/products/thingsboard-edge/` | Edge landing: edge computing, architecture, use cases | H | 8–12 | 1–2 | [x] |
| 3.5 | TBMQ (MQTT Broker) | `/products/mqtt-broker/` | TBMQ landing: scale, throughput, comparison | M | 6–10 | 1 | [x] |
| 3.6 | Trendz Analytics | `/products/trendz/` | Trendz landing: analytics, ML, demo request | M | 6–10 | 1 | [x] |
| 3.7 | Mobile Application | `/products/mobile/` | Mobile CE landing | M | 5–8 | 1 | [x] |
| 3.8 | Mobile PE | `/products/mobile-pe/` | Mobile PE landing | M | 5–8 | 1 | [x] |
| 3.9 | License Server | `/products/license-server/` | License management landing | M | 5–8 | 1 | [ ] |

### 3b. Product sub-pages

| # | Page | URL | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-----|-------------|------------|---------|----------|--------|
| 3.10 | Cloud — What is TB Cloud | `/products/paas/what-is-thingsboard-cloud/` | Detailed cloud product description | M | 4–6 | 0.5 | [ ] |
| 3.11 | Cloud — Subscription | `/products/paas/subscription/` | Subscription plan details | M | 4–6 | 0.5 | [ ] |
| 3.12 | Cloud — Billing Info | `/products/paas/billing-info/` | Billing FAQ and information | L | 2–4 | 0.5 | [ ] |
| 3.13 | Cloud — Domains | `/products/paas/domains/` | Custom domain setup guide | L | 2–4 | 0.5 | [ ] |
| 3.14 | Cloud — Privacy Policy | `/products/paas/privacy-policy/` | Privacy policy (Cloud) | L | 2–3 | — | [x] |
| 3.15 | Cloud — Terms of Use | `/products/paas/terms-of-use/` | Terms of use (Cloud) | L | 2–3 | — | [x] |
| 3.16 | Cloud EU — Privacy Policy | `/products/paas/eu/privacy-policy/` | EU Cloud privacy | L | 1–2 | — | [x] |
| 3.17 | Cloud EU — Terms of Use | `/products/paas/eu/terms-of-use/` | EU Cloud terms | L | 1–2 | — | [x] |
| 3.18 | TBMQ — Privacy Policy | `/products/mqtt-broker/privacy-policy/` | TBMQ privacy | L | 1–2 | — | [x] |
| 3.19 | TBMQ — Terms of Use | `/products/mqtt-broker/terms-of-use/` | TBMQ terms | L | 1–2 | — | [x] |
| 3.20 | License Server — Billing Info | `/products/license-server/billing-info/` | LS billing FAQ | L | 2–3 | 0.5 | [ ] |
| 3.21 | License Server — Subscription | `/products/license-server/subscription/` | LS subscription plans | L | 2–3 | 0.5 | [ ] |
| 3.22 | License Server — Perpetual | `/products/license-server/perpetual/` | Perpetual license details | L | 2–3 | 0.5 | [ ] |
| 3.23 | License Server — Privacy Policy | `/products/license-server/privacy-policy/` | LS privacy | L | 1–2 | — | [x] |
| 3.24 | License Server — Terms of Use | `/products/license-server/terms-of-use/` | LS terms | L | 1–2 | — | [x] |
| 3.25 | Trendz — Demo Request | `/products/trendz/request-demo/` | Demo request form for Trendz | M | 3–5 | 0.5 | [x] |
| 3.26 | Edge — Demo Request | `/products/thingsboard-edge/request-demo/` | Demo request form for Edge | M | 3–5 | 0.5 | [x] |
| 3.27 | Demo — Privacy Policy | `/products/demo/privacy-policy/` | Privacy policy for demo environments | L | 1–2 | — | [x] |

**Notes:**
- Main product pages are P1 priority
- Legal pages (privacy, terms) can reuse a shared `LegalPage` component
- Demo request forms require CRM/email integration

**Total 3a: 56–88 h dev · 9–11 h test**
**Total 3b: 33–52 h dev · 4–5 h test**

---

## 4. Use Cases

**URL pattern:** `/use-cases/{slug}/`

All pages share the same structure: hero, scenario description, architecture diagram, dashboard screenshots, live demo link, docs link. Build one `UseCasePage` template, then populate each.

| # | Page | URL | Complexity | Dev (h) | Test (h) | Status |
|---|------|-----|------------|---------|----------|-------|
| 4.0 | `UseCasePage` template | *(reused by all below)* | H | 10–14 | 2 | [x] |
| 4.1 | Smart Energy | `/use-cases/smart-energy/` | M | 3–5 | 0.5 | [x] |
| 4.2 | Smart Farming | `/use-cases/smart-farming/` | M | 3–5 | 0.5 | [x] |
| 4.3 | Smart Metering | `/use-cases/smart-metering/` | M | 3–5 | 0.5 | [x] |
| 4.4 | Smart Irrigation | `/use-cases/smart-irrigation/` | M | 3–5 | 0.5 | [x] |
| 4.5 | Smart Office | `/use-cases/smart-office/` | M | 3–5 | 0.5 | [x] |
| 4.6 | Smart Retail | `/use-cases/smart-retail/` | M | 3–5 | 0.5 | [x] |
| 4.7 | Fleet Tracking | `/use-cases/fleet-tracking/` | M | 3–5 | 0.5 | [x] |
| 4.8 | Site Fleet Tracking | `/use-cases/site-fleet-tracking/` | M | 3–5 | 0.5 | [x] |
| 4.9 | SCADA | `/use-cases/scada/` | H | 5–8 | 1 | [x] |
| 4.10 | SCADA Energy Management | `/use-cases/scada-energy-management/` | H | 5–8 | 1 | [x] |
| 4.11 | SCADA Oil & Gas | `/use-cases/scada-oil-and-gas-drilling-system/` | H | 5–8 | 1 | [x] |
| 4.12 | Environment Monitoring | `/use-cases/environment-monitoring/` | M | 3–5 | 0.5 | [x] |
| 4.13 | Air Quality Monitoring | `/use-cases/air-quality-monitoring/` | M | 3–5 | 0.5 | [x] |
| 4.14 | Healthcare | `/use-cases/health-care/` | M | 3–5 | 0.5 | [x] |
| 4.15 | Tank Level Monitoring | `/use-cases/tank-level-monitoring/` | M | 3–5 | 0.5 | [x] |
| 4.16 | Water Metering | `/use-cases/water-metering/` | M | 3–5 | 0.5 | [x] |
| 4.17 | Waste Management | `/use-cases/waste-management/` | M | 3–5 | 0.5 | [x] |

**Notes:**
- SCADA pages are more complex (P&ID diagrams, process schematics)
- Live demo links should point to `demo.thingsboard.io`

**Total: ~65–105 h dev · ~11–16 h test**

---

## 5. Industries

**URL pattern:** `/industries/{slug}/`

Similar structure to Use Cases — can reuse or share the same template with minor differences.

| # | Page | URL | Complexity | Dev (h) | Test (h) | Status |
|---|------|-----|------------|---------|----------|--------|
| 5.0 | `IndustryPage` template | *(reused by all below; may share with UseCasePage)* | M | 6–10 | 1 | [ ] |
| 5.1 | Industries overview | `/industries/` | M | 4–6 | 0.5 | [ ] |
| 5.2 | Smart Energy | `/industries/smart-energy/` | M | 3–5 | 0.5 | [ ] |
| 5.3 | Smart City | `/industries/smart-city/` | M | 3–5 | 0.5 | [ ] |
| 5.4 | Agriculture | `/industries/agriculture/` | M | 3–5 | 0.5 | [ ] |
| 5.5 | Industry 4.0 | `/industries/industry40/` | M | 3–5 | 0.5 | [ ] |
| 5.6 | Telecom | `/industries/telecom/` | M | 3–5 | 0.5 | [ ] |
| 5.7 | Smart Buildings | `/industries/smart-buildings/` | M | 3–5 | 0.5 | [ ] |
| 5.8 | Warehouse Monitoring | `/industries/warehouse-monitoring/` | M | 3–5 | 0.5 | [ ] |

**Total: ~31–50 h dev · ~5–7 h test**

---

## 6. Services

**URL pattern:** `/services/{slug}/`

| # | Page | URL | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-----|-------------|------------|---------|----------|--------|
| 6.1 | Services overview | `/services/` | Overview of all services with cards | M | 4–6 | 0.5 | [ ] |
| 6.2 | Support Plans | `/services/support/` | Support tier comparison table, SLA details | H | 8–12 | 1–2 | [ ] |
| 6.3 | Trainings | `/services/trainings/` | Training programmes, schedule, registration form | H | 8–12 | 1–2 | [ ] |
| 6.4 | Consulting | `/services/consulting/` | Professional services / consulting offering | M | 4–6 | 0.5 | [ ] |
| 6.5 | Development Services | `/services/development-services/` | Custom IoT solution development | H | 8–12 | 1–2 | [ ] |
| 6.6 | Dev Services — Customer Reviews | `/services/development-services/customers-full-reviews/` | Full testimonials page | M | 4–6 | 0.5 | [ ] |

**Notes:**
- Support Plans contains a complex multi-tier comparison table
- Trainings requires a registration form / calendar integration

**Total: 36–54 h dev · 5–8 h test**

---

## 7. Case Studies

**URL pattern:** `/case-studies/{slug}/`

All case study pages share the same structure: company logo, industry, problem/solution description, results, quote, screenshots.
Build one `CaseStudyPage` template → populate content via MDX files.

### 7a. Infrastructure

| # | Task | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-------------|------------|---------|----------|--------|
| 7.0 | `CaseStudyPage` template | Shared layout for all case studies | H | 8–12 | 1–2 | [ ] |
| 7.1 | Case Studies overview | `/case-studies/` — filterable grid by industry/product | H | 8–12 | 1–2 | [ ] |

### 7b. Individual case studies

| # | Company | URL | Dev (h) | Test (h) | Status |
|---|---------|-----|---------|----------|--------|
| 7.2 | Agrolog | `/case-studies/agrolog/` | 2–3 | 0.5 | [ ] |
| 7.3 | Ariot | `/case-studies/ariot/` | 2–3 | 0.5 | [ ] |
| 7.4 | ASG Tech | `/case-studies/asg-tech/` | 2–3 | 0.5 | [ ] |
| 7.5 | Awake | `/case-studies/awake/` | 2–3 | 0.5 | [ ] |
| 7.6 | Berliner Energieinstitut | `/case-studies/berliner-energieinstitut/` | 2–3 | 0.5 | [ ] |
| 7.7 | Circutor | `/case-studies/circutor/` | 2–3 | 0.5 | [ ] |
| 7.8 | Comet | `/case-studies/comet/` | 2–3 | 0.5 | [ ] |
| 7.9 | Dacor | `/case-studies/dacor/` | 2–3 | 0.5 | [ ] |
| 7.10 | E2C BMS | `/case-studies/e2cbms/` | 2–3 | 0.5 | [ ] |
| 7.11 | Energenix | `/case-studies/energenix/` | 2–3 | 0.5 | [ ] |
| 7.12 | IIoote | `/case-studies/iioote/` | 2–3 | 0.5 | [ ] |
| 7.13 | Iona | `/case-studies/iona/` | 2–3 | 0.5 | [ ] |
| 7.14 | Kalitec | `/case-studies/kalitec/` | 2–3 | 0.5 | [ ] |
| 7.15 | Keners | `/case-studies/keners/` | 2–3 | 0.5 | [ ] |
| 7.16 | Kiotera | `/case-studies/kiotera/` | 2–3 | 0.5 | [ ] |
| 7.17 | MDEG | `/case-studies/mdeg/` | 2–3 | 0.5 | [ ] |
| 7.18 | Nettra | `/case-studies/nettra/` | 2–3 | 0.5 | [ ] |
| 7.19 | OBB Infra | `/case-studies/obb-infra/` | 2–3 | 0.5 | [ ] |
| 7.20 | OneData | `/case-studies/onedata/` | 2–3 | 0.5 | [ ] |
| 7.21 | OneServe | `/case-studies/oneserve/` | 2–3 | 0.5 | [ ] |
| 7.22 | OXI | `/case-studies/oxi/` | 2–3 | 0.5 | [ ] |
| 7.23 | Schwarz | `/case-studies/schwarz/` | 2–3 | 0.5 | [ ] |
| 7.24 | Senseing | `/case-studies/senseing/` | 2–3 | 0.5 | [ ] |
| 7.25 | Suessco | `/case-studies/suessco/` | 2–3 | 0.5 | [ ] |
| 7.26 | Super Bock | `/case-studies/super-bock/` | 2–3 | 0.5 | [ ] |
| 7.27 | Tektelic | `/case-studies/tektelic/` | 2–3 | 0.5 | [ ] |
| 7.28 | TJK Solutions | `/case-studies/tjk-solutions/` | 2–3 | 0.5 | [ ] |
| 7.29 | T-Mobile CZ | `/case-studies/t-mobile-cz/` | 2–3 | 0.5 | [ ] |
| 7.30 | TPS | `/case-studies/tps/` | 2–3 | 0.5 | [ ] |
| 7.31 | Vypin | `/case-studies/vypin/` | 2–3 | 0.5 | [ ] |
| 7.32 | Xtelia | `/case-studies/xtelia/` | 2–3 | 0.5 | [ ] |

**Total: ~80–118 h dev · ~20–27 h test**

---

## 8. Partners

**URL pattern:** `/partners/{section}/`

### 8a. Section pages

| # | Page | URL | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-----|-------------|------------|---------|----------|--------|
| 8.1 | Hardware Partners | `/partners/hardware/` | Partner grid with logos, filter, links to partner detail pages | H | 10–16 | 2 | [ ] |
| 8.2 | Partner Program | `/partners/hardware/program/` | Hardware partnership programme details | M | 4–6 | 0.5 | [ ] |
| 8.3 | Apply for Partnership | `/partners/hardware/apply/` | Application form | M | 4–6 | 1 | [ ] |
| 8.4 | Apply — Thank You | `/partners/hardware/apply/thanks/` | Confirmation page after form submission | L | 1–2 | — | [ ] |
| 8.5 | Distributors | `/partners/distributors/` | Distributor list by region, map | H | 8–12 | 1–2 | [ ] |
| 8.6 | Marketplace | `/partners/marketplace/` | Marketplace of ThingsBoard-based solutions | H | 10–15 | 2 | [ ] |
| 8.7 | Affiliate Program | `/partners/affiliate/` | Affiliate/referral programme | M | 4–6 | 0.5 | [ ] |

### 8b. Individual hardware partner pages (~55 partners)

Each page: company logo, name, device description, link to Device Library.

| # | Task | Dev (h) | Test (h) | Status |
|---|------|---------|----------|--------|
| 8.8 | Partner page template | 5–8 | 1 | [ ] |
| 8.9 | ace-plc | 1–2 | — | [ ] |
| 8.10 | actility | 1–2 | — | [ ] |
| 8.11 | agrosense-makerfabs | 1–2 | — | [ ] |
| 8.12 | akkr8 | 1–2 | — | [ ] |
| 8.13 | arwin-technology-limited | 1–2 | — | [ ] |
| 8.14 | atomsenses | 1–2 | — | [ ] |
| 8.15 | beilai | 1–2 | — | [ ] |
| 8.16 | decode | 1–2 | — | [ ] |
| 8.17 | digicom | 1–2 | — | [ ] |
| 8.18 | digitalcomtech | 1–2 | — | [ ] |
| 8.19 | dragino | 1–2 | — | [ ] |
| 8.20 | dusun | 1–2 | — | [ ] |
| 8.21 | efento | 1–2 | — | [ ] |
| 8.22 | elastel | 1–2 | — | [ ] |
| 8.23 | espressif | 1–2 | — | [ ] |
| 8.24 | exxn | 1–2 | — | [ ] |
| 8.25 | ezurio | 1–2 | — | [ ] |
| 8.26 | fusiondaq | 1–2 | — | [ ] |
| 8.27 | haltian | 1–2 | — | [ ] |
| 8.28 | iothings | 1–2 | — | [ ] |
| 8.29 | iotrouter | 1–2 | — | [ ] |
| 8.30 | kernelgroup | 1–2 | — | [ ] |
| 8.31 | lansitec | 1–2 | — | [ ] |
| 8.32 | machineastro | 1–2 | — | [ ] |
| 8.33 | makerfabs | 1–2 | — | [ ] |
| 8.34 | mclimate | 1–2 | — | [ ] |
| 8.35 | mikrotik | 1–2 | — | [ ] |
| 8.36 | milesight | 1–2 | — | [ ] |
| 8.37 | mokosmart | 1–2 | — | [ ] |
| 8.38 | monoz | 1–2 | — | [ ] |
| 8.39 | ncd | 1–2 | — | [ ] |
| 8.40 | nettra | 1–2 | — | [ ] |
| 8.41 | netvox | 1–2 | — | [ ] |
| 8.42 | radionode | 1–2 | — | [ ] |
| 8.43 | roltek | 1–2 | — | [ ] |
| 8.44 | seeed | 1–2 | — | [ ] |
| 8.45 | senquip | 1–2 | — | [ ] |
| 8.46 | sensiedge | 1–2 | — | [ ] |
| 8.47 | sensy32 | 1–2 | — | [ ] |
| 8.48 | sixfab | 1–2 | — | [ ] |
| 8.49 | smartico | 1–2 | — | [ ] |
| 8.50 | sodaq | 1–2 | — | [ ] |
| 8.51 | solandtec | 1–2 | — | [ ] |
| 8.52 | tektelic | 1–2 | — | [ ] |
| 8.53 | teltonika | 1–2 | — | [ ] |
| 8.54 | temcocontrols | 1–2 | — | [ ] |
| 8.55 | weinzierl | 1–2 | — | [ ] |
| 8.56 | yobiiq | 1–2 | — | [ ] |
| 8.57 | yudash | 1–2 | — | [ ] |

**Notes:**
- Hardware Partners list integrates with Device Library — can reuse existing data
- Marketplace may require a CMS for ongoing content management

**Total 8a: 41–63 h dev · 7–6 h test**
**Total 8b: ~60–115 h dev (template + ~55 pages × 1–2 h)**

---

## 9. Company

| # | Page | URL | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-----|-------------|------------|---------|----------|--------|
| 9.1 | About Us | `/company/` | Company history, mission, values, team, office locations | M | 5–8 | 0.5–1 | [ ] |

**Total: 5–8 h dev · 0.5–1 h test**

---

## 10. Careers

| # | Page | URL | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-----|-------------|------------|---------|----------|--------|
| 10.1 | Careers / Jobs | `/careers/` | Job listings with filter, individual job descriptions, application form | H | 8–12 | 1–2 | [ ] |

**Notes:**
- May require ATS integration or MDX-based job listing files

**Total: 8–12 h dev · 1–2 h test**

---

## 11. Blog

| # | Task | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-------------|------------|---------|----------|--------|
| 11.1 | Blog infrastructure | Content Collection schema, pagination, tags, categories, authors | VH | 20–30 | 3–5 | [ ] |
| 11.2 | Blog index page | Main blog page with filter by category/tag | H | 8–12 | 1–2 | [ ] |
| 11.3 | Post template | Individual post layout: TOC, author bio, related posts, share buttons | H | 8–12 | 1–2 | [ ] |
| 11.4 | Author pages | `/blog/authors/{slug}/` — author profile + post list | M | 4–6 | 0.5 | [ ] |
| 11.5 | Category pages | `/blog/category/{slug}/` — posts filtered by category | M | 3–5 | 0.5 | [ ] |
| 11.6 | RSS feed | `/blog/rss.xml` | L | 2–3 | 0.5 | [ ] |
| 11.7 | Post migration (61 posts) | Convert Jekyll posts → Astro MDX; adapt frontmatter, Liquid tags | M | 61–122 | — | [ ] |

**Notes:**
- Jekyll posts have `author`, `tags`, `date`, `categories` frontmatter
- Some posts may contain complex embedded HTML
- Post migration (11.7) can be partially automated with a script

**Total: ~106–190 h dev · ~6–10 h test**

---

## 12. Root-level marketing pages

| # | Page | URL | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-----|-------------|------------|---------|----------|--------|
| 12.1 | IoT Use Cases | `/iot-use-cases/` | Overview of IoT use cases for the platform | M | 4–6 | 0.5 | [ ] |
| 12.2 | IoT Data Visualization | `/iot-data-visualization/` | Data visualization features and capabilities | M | 5–7 | 1 | [ ] |
| 12.3 | IoT Solutions | `/iot-solutions/` | Overview of IoT solutions offered | M | 4–6 | 0.5 | [ ] |
| 12.4 | Asset Management | `/asset-management/` | Asset management software features | M | 4–6 | 0.5 | [ ] |
| 12.5 | Device Management | `/device-management/` | IoT device management features | M | 4–6 | 0.5 | [ ] |
| 12.6 | Energy Management | `/energy-management/` | Energy management features | M | 4–6 | 0.5 | [ ] |
| 12.7 | Fleet Tracking | `/fleet-tracking/` | Fleet tracking features | M | 4–6 | 0.5 | [ ] |
| 12.8 | Smart Energy | `/smart-energy/` | Smart energy page (may redirect to use-case) | L | 2–4 | — | [ ] |
| 12.9 | Smart Farming | `/smart-farming/` | Smart farming page (may redirect to use-case) | L | 2–4 | — | [ ] |
| 12.10 | Smart Farming Demo | `/smart-farming-demo/` | Interactive live demo showcase | H | 6–10 | 1 | [ ] |
| 12.11 | Smart Metering | `/smart-metering/` | Smart metering page (may redirect to use-case) | L | 2–4 | — | [ ] |
| 12.12 | Monitoring Dashboard | `/monitoring-dashboard/` | IoT monitoring dashboard features | M | 4–6 | 0.5 | [ ] |
| 12.13 | CE vs PE Comparison | `/ce-vs-pe-diff/` | Feature comparison table: CE vs PE | M | 4–6 | 0.5 | [ ] |
| 12.14 | Community | `/community/` | Community links: GitHub, forum, Slack, YouTube | M | 4–6 | 0.5 | [ ] |

**Notes:**
- Pages 12.8, 12.9, 12.11 may be implemented as lightweight redirects (1 h each) if the content duplicates Use Cases pages

**Total: ~57–97 h dev · ~6–7 h test**

---

## 13. Miscellaneous pages

| # | Page | URL | Description | Complexity | Dev (h) | Test (h) | Status |
|---|------|-----|-------------|------------|---------|----------|--------|
| 13.1 | Media Kit | `/mediakit/` | Logos, brand guidelines, press assets (ZIP downloads) | L | 3–5 | 0.5 | [ ] |
| 13.2 | Cookie Policy | `/cookie-policy/` | Cookie usage policy | L | 2–3 | — | [ ] |
| 13.3 | Support Ukraine | `/support-ukraine/` | Company stance page | L | 2–3 | — | [ ] |
| 13.4 | Contact Us | `/docs/contact-us/` | Contact form + office info | M | 4–6 | 1 | [ ] |
| 13.5 | 404 page update | `/404` | Update 404 to match new site design | L | 1–2 | 0.5 | [ ] |

**Total: 12–19 h dev · 2 h test**

---

## Overall estimate

| Category | Solo dev min | Solo dev max | Claude min | Claude max | Test solo | Test Claude |
|----------|-------------|-------------|------------|------------|-----------|-------------|
| Infrastructure | 54 | 82 | 12 | 18 | 13 | 5 |
| Homepage updates | 4 | 6 | 1 | 2 | 1 | 0.5 |
| Pricing | 12 | 20 | 3 | 5 | 3 | 1 |
| Products — main | 56 | 88 | 12 | 18 | 11 | 3 |
| Products — sub-pages | 33 | 52 | 7 | 11 | 5 | 1.5 |
| Use Cases | 65 | 105 | 14 | 22 | 16 | 5 |
| Industries | 31 | 50 | 7 | 11 | 7 | 2.5 |
| Services | 36 | 54 | 8 | 14 | 8 | 2.5 |
| Case Studies | 80 | 118 | 18 | 28 | 27 | 5 |
| Partners — sections | 41 | 63 | 9 | 14 | 6 | 2 |
| Partners — individual pages | 60 | 115 | 9 | 16 | — | — |
| Company | 5 | 8 | 1 | 2 | 1 | 0.5 |
| Careers | 8 | 12 | 2 | 3 | 2 | 1 |
| Blog | 106 | 190 | 25 | 42 | 10 | 4 |
| Root-level marketing | 57 | 97 | 12 | 22 | 7 | 3 |
| Miscellaneous | 12 | 19 | 3 | 5 | 2 | 1 |
| **TOTAL** | **~660** | **~1079** | **~143** | **~233** | **~119** | **~37** |

> **Solo developer:** 660–1080 h dev · ~4–6 months at full capacity
>
> **Claude-assisted:** ~143–233 h of human time — reviewing output, browser testing, decisions, asset gathering.
> At **3–4 h/day** → **6–10 weeks (~1.5–2.5 months)**.
>
> Main bottleneck that cannot be reduced: gathering marketing assets from the Jekyll site (screenshots, copy, partner logos).

---

## Documentation work (current sprint)

> This section tracks active documentation implementation — separate from the marketing migration above.

### D1. Upgrade Instructions

Pages that show step-by-step upgrade guides per platform and version.

**Key files:**
- Model: `src/models/upgrade-instructions.ts` — 37 versions (v3.0 → v4.3.0.1)
- Component: `src/components/UpgradeTable.astro` — version table with 5 platform icon links
- Platform components: `src/components/upgrade-instructions/` — `LinuxUpgradeSteps`, `WindowsUpgradeSteps`, `DockerUpgradeSteps`, `DockerComposeUpgradeSteps`, `PrepareSection`
- Includes: `src/content/_includes/docs/installation/upgrade-instructions/`
- Pages (CE): `src/content/docs/docs/installation/upgrade-instructions/`
- Pages (PE): `src/content/docs/docs/pe/installation/upgrade-instructions/`
- Dynamic routes: `src/pages/docs/installation/` · `src/pages/docs/pe/installation/`

| # | Task | Description | Status |
|---|------|-------------|--------|
| D1.1 | `UpgradeTable` component | Version table with platform links (ubuntu, centos, windows, docker, docker-compose) | [ ] |
| D1.2 | `LinuxUpgradeSteps` | Ubuntu + CentOS step-by-step upgrade instructions | [ ] |
| D1.3 | `WindowsUpgradeSteps` | Windows upgrade instructions | [ ] |
| D1.4 | `DockerUpgradeSteps` | Docker upgrade instructions | [ ] |
| D1.5 | `DockerComposeUpgradeSteps` | Docker Compose upgrade instructions | [ ] |
| D1.6 | `PrepareSection` | PE-only database backup section (shown before upgrade steps) | [ ] |
| D1.7 | CE upgrade-instructions pages | Main page + 5 platform pages (ubuntu, centos, windows, docker, docker-compose) | [ ] |
| D1.8 | PE upgrade-instructions pages | Same as CE, PE variant | [ ] |
| D1.9 | Dynamic routes | `[platform]/[familySlug]` for CE and PE | [ ] |

### D2. Releases Table

Pages that show a filterable/paginated table of ThingsBoard releases.

**Key files:**
- Model: `src/models/releases-table.ts`
- Component: `src/components/ReleasesTable.astro`
- Include: `src/content/_includes/docs/user-guide/releases-table.mdx`
- Pages (CE): `src/content/docs/docs/user-guide/releases-table.mdx`
- Pages (PE): `src/content/docs/docs/pe/user-guide/releases-table.mdx`
- Dynamic routes: `src/pages/docs/user-guide/` · `src/pages/docs/pe/user-guide/`

| # | Task | Description | Status |
|---|------|-------------|--------|
| D2.1 | `ReleasesTable` component | Table with version, date, changelog link, download links | [ ] |
| D2.2 | Releases data model | `src/models/releases-table.ts` — version entries with metadata | [ ] |
| D2.3 | CE releases-table page | `/docs/user-guide/releases-table/` | [ ] |
| D2.4 | PE releases-table page | `/docs/pe/user-guide/releases-table/` | [ ] |
| D2.5 | Dynamic routes | `[familySlug]` for CE and PE | [ ] |

---

## Recommended migration phases

> Timelines below are for **Claude-assisted** work (3–4 h of human time per day).
> Original solo-developer timelines shown in parentheses.

### Phase 1 — Infrastructure (Week 1) *(was: Weeks 1–2)*
- [ ] Marketing layout (no Starlight)
- [ ] Header + Navigation
- [ ] Footer
- [ ] SEO component
- [ ] Forms infrastructure
- [ ] Routing strategy

### Phase 2 — Core commercial pages (Weeks 2–3) *(was: Weeks 3–5)*
- [ ] Pricing
- [ ] Products — 9 main pages
- [ ] Services (Support, Trainings, Dev Services)

### Phase 3 — Content sections (Weeks 4–5) *(was: Weeks 6–10)*
- [ ] Use Cases (all 17 — template + content)
- [ ] Industries (all 8)
- [ ] Root-level marketing pages

### Phase 4 — Social proof (Weeks 6–7) *(was: Weeks 11–14)*
- [ ] Case Studies (template + 31 companies)
- [ ] Company / About
- [ ] Careers

### Phase 5 — Partners + Blog (Weeks 7–9) *(was: Weeks 15–22)*
- [ ] Partners (Hardware, Distributors, Marketplace)
- [ ] Blog infrastructure + post migration

### Phase 6 — Wrap-up (Week 10) *(was: Weeks 23–24)*
- [ ] Product sub-pages (legal, billing)
- [ ] Miscellaneous pages
- [ ] Redirects, Analytics, final QA

> **Total Claude-assisted timeline: ~10 weeks (~2.5 months)** vs. 24 weeks solo.
