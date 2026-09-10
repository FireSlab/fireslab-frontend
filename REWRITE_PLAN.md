# FireSlab Frontend React Rewrite Plan

> **Document Purpose**: Architectural, routing, component, and data-fetching blueprint for transitioning `Fireslab-frontend/` from the static multi-page vanilla JS demo into a production-grade React application connected to `Fireslab-backend`.

---

## 1. Pages & Routes Mapping

The original demo contains 4 HTML entry points (`index.html`, `products.html`, `projects.html`, `solutions.html`). Below is the mapping to modern React routes:

| Route Path | Page Title | Current Static Source | Purpose & Key Features |
| :--- | :--- | :--- | :--- |
| `/` | **Home** | `index.html` | Brand showcase: Hero slider, animated stats, About company & vision, Solutions parallax preview, Applications grid (6 sectors), Technology & efficiency comparison bars, Heat exchanger tab switcher, Horizontal product preview, Interactive capacity range table, Featured Projects snippet, Contact form, Certifications strip, Footer. |
| `/products` | **Products Showcase** | `products.html` | Full product catalogue featuring the 3D cylindrical slider carousel, category filtering, quick technical spec badges, and modal detail triggers. |
| `/products/:slug` | **Product Detail Page** | `products.js` (Modal data) | Dedicated, SEO-indexable standalone product page (also accessible via modal overlay on `/products`). Renders deep engineering specs, dimensional drawings, materials matrix (SS304/SS316), capacity selector, compatible systems, and FAQs. |
| `/projects` | **Reference Projects** | `projects.html` | Case studies gallery with category filter bar (`All`, `Hotels`, `Hospitals`, `Industrial`, `Swimming Pools`, `Residential`), project photography, installation locations, and equipment used badges. |
| `/solutions` | **Engineering Solutions** | `solutions.html` | Full-screen kinetic GSAP slider with two-line typographic titles, category tags, interactive slide progress bar, and active technical specification expansion pane. |
| `/contact` | **Contact & Consult** | `index.html#contact` | Direct contact landing page with factory address, phone hotline, support email, interactive Google map or direction guide, and RFQ / Quote inquiry form. |
| `*` | **404 Not Found** | Custom | Branded dark-theme error screen with quick navigation links back to Home and Catalogue. |

---

## 2. Component Hierarchy & Breakdown

### 2.1. Shared Components (Across All Pages)

- **`Navbar`**:
  - Brand logo with lightning bolt accent and transparent PNG FireSlab mark.
  - Dropdown menu 1: **Products** (dynamic categories from `GET /api/categories` + "View All Products" button).
  - Dropdown menu 2: **Applications** (dynamic industry sectors from `GET /api/applications`).
  - Nav links: Solutions, Technology, Projects, About, Contact.
  - "Get Quote" primary CTA button.
  - Responsive mobile drawer with toggle animation.
- **`Footer`**:
  - Corporate overview from `site_settings.about_summary`.
  - Social media links (LinkedIn, Instagram, Facebook from `site_settings`).
  - Direct contact links (Hotline phone, support email, factory location from `site_settings`).
  - Quick navigation directory.
  - Legal copyright and attribution.
- **`ProductModal`**:
  - Accessible modal dialog triggered from any product card.
  - Tabs: Overview, Key Features, Materials & Construction, Technical Specs, FAQs.
  - Capacity & Dimensions interactive sizing table.
  - "Request Quote for this Model" button pre-filling the contact form.
- **`ContactSection` / `LeadForm`**:
  - Name, Email, Company, Solution Interest (dropdown matching categories/solutions), and Message.
  - Client-side validation, loading state spinner, and immediate success confirmation card.
  - Submits directly to `POST /api/leads`.
- **`SectionHeader`**:
  - Reusable section tag / eyebrow pill, bold heading with orange/flame highlight, and optional descriptive subtitle.

### 2.2. Page-Specific Components

#### Homepage (`/`)
1. **`HeroSlider`**:
   - Multi-slide carousel with animated transitions, taglines, primary & secondary action buttons.
   - Consumes `GET /api/hero-slides`.
2. **`StatsBar`**:
   - 4-column metric strip (Years Experience, Projects Delivered, Thermal Efficiency, Pressure Tested).
   - Animated numeric counter using IntersectionObserver / GSAP on scroll.
   - Consumes `GET /api/company-stats`.
3. **`AboutSection`**:
   - Narrative from `site_settings.about_summary` & `site_settings.vision_text`.
   - Manufacturing strength card and quality inspection checklist.
4. **`SolutionsParallaxPreview`**:
   - 3D interactive tilt cards (Hot Water Tanks, Spiral Exchangers, Panel Tanks) with vanilla-tilt / mouse parallax.
5. **`ApplicationsGrid`**:
   - 6 responsive sector cells (Space Heating, Utility Water, Pools, Kitchen, Hatcheries, Industries) with background zoom and link to `/products?app=...`.
   - Consumes `GET /api/applications`.
6. **`TechnologySection`**:
   - Spiral Heat Exchanger (97% vs. 70% conventional comparison bar).
   - Shell & Tube turbulator technology metrics (5,000 W/m²K heat transfer rate, 40% faster heating).
   - SS304 & SS316L material quality verification.
7. **`ExchangerComparisonTabs`**:
   - Tab switcher comparing Plate Heat Exchangers (PHE) vs. Spiral Heat Exchangers (SHE) with pros/cons.
8. **`ProductsHorizontalScroll`**:
   - Horizontal sliding preview of featured equipment cards with spec badges and modal trigger.
   - Consumes `GET /api/products`.
9. **`CapacitySelector`**:
   - Capacity range slider (300L to 5000L) dynamically filtering model rows (`FS-500P`, `FS-1000P`, `FS-2000P`, `FS-5000P`).
10. **`FeaturedProjectsSection`**:
    - Top 3 case studies (`is_featured: true`) with photography and system summary.
    - Consumes `GET /api/projects?featured=true`.
11. **`CertificationsBar`**:
    - ISO 9001:2015, ASME Certified, CE Marking, MSME Registered badges.
    - Consumes `GET /api/certifications`.

#### Products Showcase Page (`/products`)
1. **`ProductsCarousel`**:
   - Interactive 3D carousel showcase with active card projection, thumbnail rotation, and pagination buttons.
2. **`ProductsFilterBar`**:
   - Filter chips by category (`Tanks`, `Panel`, `Exchangers`, `Elements`, `Insulation`).
3. **`ProductsGrid`**:
   - Clean grid layout option displaying all products with quick specs and modal launch buttons.

#### Projects Page (`/projects`)
1. **`ProjectsFilterBar`**:
   - Filter pills (`All`, `Hotels`, `Hospitals`, `Industrial`, `Swimming Pools`, `Residential`).
2. **`ProjectsGrid`**:
   - Responsive masonry/card grid showing project image, equipment tag, location icon, title, and description.
   - Consumes `GET /api/projects`.

#### Solutions Page (`/solutions`)
1. **`SolutionsKineticSlider`**:
   - GSAP-driven full-screen slider showing category eyebrow, two-line title (`title_line1`, `title_line2`), description, and background card projection.
   - Consumes `GET /api/solutions`.
2. **`SolutionExpandedSpecs`**:
   - Technical breakdown pane updating automatically with the active solution, showing feature bullet points, equipment linkage, and inquiry CTA.

---

## 3. Data Fetching Architecture & Backend Gaps

### 3.1. Complete Endpoints Ready for Consumption
- `GET /api/products` (returns published products with `card_specs`, `features`, `technical_specs`, `faqs`)
- `GET /api/products/:slug` (single product details)
- `GET /api/projects` (case studies with `?category=` filter)
- `GET /api/solutions` (thermal solutions with two-line titles and feature bullet points)
- `GET /api/categories` (equipment taxonomies for navigation dropdowns and filter bars)
- `GET /api/applications` (industry deployment sectors for navbar and homepage grid)
- `GET /api/settings` (company name, phone, email, address, social links, vision, about text)
- `POST /api/leads` (public quote and contact inquiry form submissions)

### 3.2. Flagged Backend Gaps (Action Required in `Fireslab-backend`)
During our audit against `schema.sql` and `CONTENT_MODEL.md`, the following 3 tables exist in the database schema but **do NOT currently have Express API routes**:

1. **`hero_slides`**:
   - *Table exists*: `tagline`, `title`, `description`, `primary_btn_text`, `primary_btn_url`, `secondary_btn_text`, `secondary_btn_url`, `image_url`, `order_index`, `is_active`.
   - *Missing Route*: `GET /api/hero-slides` (public).
2. **`company_stats`**:
   - *Table exists*: `target_value`, `suffix`, `label`, `order_index`.
   - *Missing Route*: `GET /api/company-stats` (public).
3. **`certifications`**:
   - *Table exists*: `title`, `icon_name`, `badge_image_url`, `order_index`.
   - *Missing Route*: `GET /api/certifications` (public).
4. **`product_variants`**:
   - *Table exists*: `model_code`, `capacity_litres`, `diameter_mm`, `height_mm`, `connection_inch`.
   - *Missing Route*: Can either be exposed via `GET /api/product-variants` or automatically embedded inside `GET /api/products` for sizing tables.

> **Pre-Frontend Task**: We should quickly implement these 3 lightweight public `GET` routes in `Fireslab-backend` (and seed them with the demo's existing stats and slides) so the frontend has 100% dynamic API coverage.

---

## 4. Animations & Interactions Strategy

The static demo features rich animations that give FireSlab its signature industrial feel. Here is how they will be translated to React:

| Interaction | Original Technique | React Implementation Strategy |
| :--- | :--- | :--- |
| **Smooth Scrolling** | `lenis.js` vanilla bundle | Use `@studio-freight/lenis` or `lenis/react` wrapped in a top-level `SmoothScrollProvider` component with an RAF loop. |
| **Scroll Reveals** | `gsap.registerPlugin(ScrollTrigger)` on `.reveal` elements | Use `@gsap/react` with `useGSAP()` hooks. This guarantees that `ScrollTrigger` instances are cleanly killed on component unmount, preventing memory leaks and orphaned DOM references. |
| **Solutions Kinetic Slider** | Complex manual GSAP coordinate transformations | Encapsulated in `<SolutionsKineticSlider />` using React state for active index, with GSAP timeline handling coordinate tweens for the background, card deck, and title text. |
| **3D Card Tilt** | `vanilla-tilt.min.js` | Use lightweight `react-parallax-tilt` or a custom `useTilt` hook with transform/perspective styles. |
| **Numeric Counter** | Vanilla `setInterval` / `requestAnimationFrame` | Lightweight `CountUp` component triggered when scrolled into view via `ScrollTrigger` or `IntersectionObserver`. |
| **Interactive Sizing Slider** | Native `<input type="range">` with manual DOM row hiding | Pure React state: `<input type="range" value={capacity} onChange={...} />` filtering rows declaratively. |

---

## 5. Technology Stack Recommendation

### Comparison: Vite + React Router vs. Next.js App Router

| Evaluation Factor | Option A: Vite + React Router (SPA) | Option B: Next.js (App Router, SSG/ISR) — **RECOMMENDED** |
| :--- | :--- | :--- |
| **SEO & Google Indexing** | **Weak**. Renders an empty `<div id="root"></div>`. Search engine bots must execute client JS to read equipment specs, case studies, and solutions. | **Superior**. Pages are pre-rendered as clean static HTML (SSG) with automatic OpenGraph tags, JSON-LD schema markup, and canonical URLs for every product. |
| **B2B Industrial Conversion** | Slower initial HTML load on mobile networks. | Instant First Contentful Paint (FCP) because HTML is pre-generated on server/edge. |
| **Architecture Harmony** | Separate build setup (Vite vs Next.js). | **Identical stack** to `Fireslab-admin`. Shares Tailwind CSS configurations, TypeScript interfaces, and API patterns. |
| **Existing Frontend Assets** | Drops into current `Fireslab-frontend/` directory directly. | Can be initialized cleanly in `Fireslab-frontend/` with Next.js App Router. |
| **Development Speed** | Fast HMR. | Turbopack HMR is equally fast in Next.js 16. |

### Recommendation:
For a public-facing industrial B2B commercial site, **Next.js (App Router with Static Site Generation / ISR)** is strongly recommended:
1. FireSlab's primary objective is acquiring high-ticket commercial leads (MEP consultants, hotel owners, plant engineers). These buyers find equipment by searching specific engineering terms on Google (`"pressurized water storage tank 5000L SS316"`). SSG guarantees all technical tables, model codes, and descriptions are completely crawled and ranked.
2. If pure SPA simplicity inside the existing Vite config is strictly preferred by the user, **Vite + React Router** can be used with prerendering utilities. However, Next.js remains the industry gold standard for SEO marketing frontends.

---

## 6. Contact Form & Lead Pipeline

- **Endpoint**: `POST /api/leads` on `Fireslab-backend` (Port 5000).
- **Public Access**: Fully unauthenticated, protected by IP rate-limiting (max 5 requests per 15 minutes to prevent spam).
- **Payload Schema**:
  ```json
  {
    "name": "Full Name",
    "email": "work-email@company.com",
    "company": "Company / Contractor Name",
    "solution_interest": "Hot Water Storage Tanks",
    "message": "Project specifications and capacity requirements"
  }
  ```
- **UX States**:
  - Idle: Standard form.
  - Submitting: Disabled inputs + button spinner ("Transmitting Inquiry...").
  - Success: Success card with checkmark ("Inquiry Submitted Successfully - Our engineering team will contact you within 24 hours").
  - Error: Inline notification banner with error details.

---

## 7. Recommended Implementation Sequence

To avoid building too much at once and ensure verified checkpoints:

1. **Step 1: Backend Gaps Closure**:
   - Add routes and seed data for `hero_slides`, `company_stats`, and `certifications` in `Fireslab-backend`.
2. **Step 2: Frontend Setup & Shared Foundation**:
   - Setup React framework, Tailwind design system, global styles, Lenis smooth scroll provider, and Lucide icons.
3. **Step 3: Shared Components (`Navbar`, `Footer`, `ContactForm`)**:
   - Verify navigation, responsive mobile drawer, and lead submission to `POST /api/leads`.
4. **Step 4: Homepage (`/`)**:
   - Hero slider, Stats counter, About, Solutions preview, Applications grid, Tech comparisons, Capacity slider, and Featured Projects.
5. **Step 5: Products Catalogue & Modal (`/products` & `/products/:slug`)**:
   - 3D Carousel, grid view, category filters, and comprehensive technical modal sheet.
6. **Step 6: Projects Page (`/projects`)**:
   - Case studies gallery with category filters.
7. **Step 7: Solutions Page (`/solutions`)**:
   - Kinetic slider presentation and technical spec expansion pane.
