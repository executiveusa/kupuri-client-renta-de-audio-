---
name: kupuri-audio-rental
description: >
  Specialized skill for building the Kupuri Audio Rental platform. Enforces
  premium event production aesthetic (DOS2A inspired), dark-mode-first design,
  Tailwind best practices, and token-efficient development patterns. Frontend-only
  Vercel deployment with zero hardcoded secrets.
  
patterns:
  - Dark backgrounds with vibrant accents (sky, amber, rose)
  - High-contrast typography (no eyebrow labels)
  - Framer Motion for guided attention only
  - Equipment catalog with filters and detail pages
  - Booking flows with date pickers
  - Responsive mobile-first components
  - No glassmorphism, no pill overload, no gradient abuse
---

# Kupuri Audio Rental — Custom Skill

## Design System

### Colors (CSS Variables)
```css
--primary: #0f172a;        /* slate-950 */
--secondary: #06070b;      /* near-black */
--accent-1: #2ea856;       /* kupuri green */
--accent-2: #ffb21d;       /* kupuri amber */
--text-primary: #f1f5f9;   /* slate-100 */
--text-secondary: #cbd5e1; /* slate-300 */
--text-tertiary: #94a3b8;  /* slate-400 */
```

### Typography Hierarchy
- **H1**: 48-56px, font-black, leading-tight
- **H2**: 32-40px, font-bold, leading-snug
- **H3**: 20-24px, font-bold
- **Body**: 16px, font-normal, max 65ch
- **Small**: 14px, text-secondary

### Spacing Scale
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px (only these)

### Shadows (max)
- Cards: `0 20px 50px rgba(0,0,0,0.4)`
- Buttons hover: `0 25px 50px rgba(14,165,233,0.45)`
- Subtle: `0 2px 8px rgba(0,0,0,0.1)`

### Border Radius
- Cards: 16px max
- Buttons: 8-12px
- Inputs: 8-12px
- No oversized radii (ban 20px+)

## Component Patterns

### Button Variants
```
primary: Gradient sky-400→blue-500, shadow glow on hover, -translate-y-1
secondary: Border + glass (white/15), no gradient, hover bg-white/8
ghost: Text-only, hover to primary color
```

### Cards
```
Border: white/10, 1px
Background: gradient from-slate-800/50 to-slate-950/80
Backdrop: blur-sm
NO: Floating effects, detached panels
```

### Forms
```
Inputs: bg-white/5, border-white/10, focus:border-sky-400/50
Textarea: min-h-28, same border/bg pattern
Select: Native element, styled matching inputs
NO: Floating labels, placeholder-only states
```

## Layout Rules
- **Navbar**: Sticky top, 80px height, solid background on scroll
- **Sections**: Max-w-7xl, px-4 md:px-8 lg:px-8, py-20 md:py-32
- **Portfolio**: 3-column grid → 2 on tablet → 1 on mobile
- **Forms**: 2-column on desktop, 1 on mobile
- **NO**: Hero inside dashboard, floating sidebars, KPI card grids in rentals

## Animation Rules
- Use Framer Motion for entrance animations only (initial → whileInView)
- Hover state: max -translate-y-1, opacity change, no rotating icons
- Duration: 0.5s default, 0.8s for hero entrance
- Viewport: once: true, amount: 0.2 (stagger: delay: index * 0.1)

## API Integration
- All API calls return plain JSON (no GraphQL complexity)
- Equipment fetch: GET `/api/equipment?category=microphones`
- Booking POST: Simple form → mailto: fallback (no auth required initially)
- Error states: Graceful fallback UI, no red alerts

## Vercel Deployment (Frontend-Only)
- **No .env secrets in repo** — use NEXT_PUBLIC_* for safe public values
- Environment: Set in Vercel UI dashboard, never commit
- Fallbacks: Hard-coded defaults for API_BASE_URL, CONTACT_EMAIL
- Builds: `pnpm run build` → Next.js static export compatible

## Token Optimization
- Use mcp2cli for MCP tools (lazy load)
- Load only needed skills: uncodixfy, taste-skill, mcp2cli
- Avoid loading full MCP schemas — summon specific tools only
- Component sizes: Keep under 500 lines, split into sections/
- API routes: Thin layer, Prisma queries in lib/db

## File Organization
```
src/
├── app/
│   ├── api/              ← API routes (thin layer)
│   ├── (pages)/          ← Grouped by feature
│   ├── layout.tsx        ← Root
│   └── page.tsx          ← Home (DOS2A landing)
├── components/
│   ├── layout/
│   ├── sections/         ← Reusable page sections
│   ├── forms/            ← Form components
│   └── ui/               ← Base UI (Button, Card, Input)
├── lib/
│   ├── db.ts             ← Prisma singleton
│   ├── api.ts            ← API client helpers
│   └── hooks.ts          ← Custom React hooks
└── styles/
    └── globals.css       ← Tailwind imports + vars
```

## Checklist Before Commit
- [ ] No console.logs in production code
- [ ] All shadows ≤ 0 20px 50px
- [ ] No gradients on brand elements
- [ ] Border radius: 8-16px max
- [ ] Mobile responsive tested (375px, 768px, 1440px)
- [ ] Framer Motion: entrance only, no hover transforms
- [ ] API fallbacks configured
- [ ] No hardcoded secrets in code
