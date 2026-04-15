# Kupuri Audio - Equipment Rental Platform

## 🎤 Project Overview
Premium audio equipment rental platform for content creators in Mexico City. Built with Next.js 15, React 19, TypeScript, Prisma, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x
- PostgreSQL database
- pnpm package manager

### Installation
```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
pnpm run db:generate

# Push database schema
pnpm run db:push

# Run development server
pnpm run dev
```

Visit `http://localhost:3000` to see the app.

## 📁 Project Structure

```
kupuri-client-renta-de-audio-/
├── prisma/
│   └── schema.prisma                    # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── equipment/route.ts       # Equipment CRUD
│   │   │   ├── equipment/[id]/route.ts  # Equipment detail
│   │   │   └── bookings/route.ts        # Booking CRUD
│   │   ├── equipment/page.tsx           # Equipment listing
│   │   ├── equipment/[id]/page.tsx      # Equipment detail
│   │   ├── bookings/page.tsx            # User bookings
│   │   ├── login/page.tsx               # Login
│   │   ├── signup/page.tsx              # Sign up
│   │   ├── about/page.tsx               # About
│   │   ├── contact/page.tsx             # Contact
│   │   ├── pricing/page.tsx             # Pricing
│   │   ├── categories/page.tsx          # Categories
│   │   ├── faq/page.tsx                 # FAQ
│   │   ├── privacy/page.tsx             # Privacy
│   │   ├── terms/page.tsx               # Terms
│   │   ├── layout.tsx                   # Root layout
│   │   ├── page.tsx                     # Home
│   │   └── globals.css                  # Global styles
│   ├── components/
│   │   ├── layout/navbar.tsx            # Navbar
│   │   ├── layout/footer.tsx            # Footer
│   │   ├── sections/hero.tsx            # Hero
│   │   ├── sections/categories-grid.tsx # Categories
│   │   └── providers.tsx                # Providers
│   └── lib/
│       ├── auth.ts                      # NextAuth
│       └── db.ts                        # Prisma
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── vercel.json
```

## 🎨 Features

- ✅ Home page with hero + categories
- ✅ Equipment catalog with category filtering
- ✅ Equipment detail page with booking
- ✅ User bookings dashboard
- ✅ Auth (login/signup)
- ✅ Pricing, FAQ, About, Contact pages
- ✅ Privacy & Terms pages
- ✅ Responsive design
- ✅ Framer Motion animations

## 🎨 Styling
- **Colors**: Kupuri brand (primary: `#2ea856`, accent: `#ffb21d`)
- **Framework**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Icons**: Emojis

## 📦 Tech Stack
- Next.js 15 + React 19 + TypeScript
- Prisma + PostgreSQL
- NextAuth v5
- Tailwind CSS + Framer Motion

## 🔐 Auth
- NextAuth v5 with Prisma adapter
- Demo password: `kupuri2026`

## 🚀 Deployment
```bash
vercel link --project-id prj_r8nKQLeznNHkaolRnCDoHLxi5gpG
vercel deploy
```
