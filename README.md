# 🎬 DOS2A - Audio & Iluminación Premium
## Full-Stack Application - Built with ZEPHYR Protocol

---

## 📋 Project Overview

**DOS2A** is a modern, bilingual web platform for an audio, lighting, and audiovisual production company based in Mexico City (CDMX).

### Key Features
- ✅ **Cinematic hero** with modern aesthetic (no vibe coding)
- ✅ **Spanish/English bilingual** with language toggle
- ✅ **AI-powered proposals** via Claude API
- ✅ **Persistent memory** using Upstash Redis
- ✅ **WhatsApp & Telegram** webhook integration (future)
- ✅ **Mobile-first responsive** design
- ✅ **Webflow-quality animations** with GSAP

---

## 🏗️ Architecture

### Directory Structure
```
dos2a/
├── frontend/                   (Next.js app, deployed to Vercel)
│   ├── src/
│   │   ├── components/        (React components)
│   │   ├── pages/             (Next.js pages)
│   │   ├── hooks/             (Custom React hooks)
│   │   ├── lib/               (Utilities, API client)
│   │   ├── types/             (TypeScript types)
│   │   └── styles/            (Global styles)
│   ├── public/                (Static assets)
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── vercel.json
│
├── backend/                    (Vercel Functions, serverless API)
│   ├── api/
│   │   ├── forms/             (Form submission handler)
│   │   ├── proposals/         (Proposal generation)
│   │   ├── webhooks/          (WhatsApp, Telegram)
│   │   └── memory/            (Conversation history)
│   ├── lib/
│   │   ├── claude.ts          (Claude API orchestration)
│   │   ├── memory.ts          (Redis memory store)
│   │   ├── whatsapp.ts        (Twilio integration - future)
│   │   └── telegram.ts        (Telegram Bot - future)
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json
│
├── shared/                     (Shared types and constants)
│   ├── types.ts
│   ├── schemas.ts
│   └── constants.ts
│
└── README.md                   (This file)
```

---

## 🚀 Deployment

### Prerequisites
- Vercel account (free or paid)
- GitHub account
- Claude API key (from Anthropic)
- Upstash Redis account (free tier available)

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone <your-github-url> dos2a
cd dos2a

# Install dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

### Step 2: Environment Variables

Create `.env.local` files in both `frontend/` and `backend/` directories:

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://dos2a-api.vercel.app
```

#### Backend (.env.local)
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
UPSTASH_REDIS_REST_URL=https://your-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

### Step 3: Deploy Frontend

```bash
cd frontend

# Deploy to Vercel (interactive setup)
npx vercel

# Or if you have Vercel CLI installed:
vercel --prod

# Once deployed, copy your frontend URL and update backend's NEXT_PUBLIC_API_URL
```

### Step 4: Deploy Backend

```bash
cd backend

# Deploy to Vercel as separate project
npx vercel

# Set environment variables in Vercel dashboard
# Go to Settings → Environment Variables and add:
# - ANTHROPIC_API_KEY
# - UPSTASH_REDIS_REST_URL
# - UPSTASH_REDIS_REST_TOKEN

vercel --prod
```

### Step 5: Connect Domain

In Vercel dashboard:
1. Frontend project → Settings → Domains → Add `awardslevelawards.com`
2. Backend project → Settings → Domains → Add `api.awardslevelawards.com`

---

## 📡 API Endpoints

### Form Submission
```
POST /api/forms/submit

Request:
{
  "name": "Juan García",
  "email": "juan@example.com",
  "eventType": "fiesta|concierto|corporativo|otro",
  "needs": "Necesito audio y iluminación para una fiesta de 200 personas",
  "guestCount": 200,
  "location": "CDMX",
  "date": "2024-06-15"
}

Response:
{
  "success": true,
  "data": {
    "id": "proposal-123",
    "clientName": "Juan García",
    "eventType": "fiesta",
    "tiers": {
      "social": { ... },
      "escenico": { ... },
      "corporativo": { ... }
    },
    "nextSteps": [ ... ],
    "timestamp": "2024-04-14T..."
  }
}
```

### Get Proposal
```
GET /api/proposals/get?email=juan@example.com

Response: ProposalResponse object
```

---

## 🎨 Design System

### Colors
- **Dark**: `#0a0d12` (primary background)
- **Darker**: `#050608` (darker variant)
- **Surface**: `#0f1419` (card backgrounds)
- **Gold**: `#fcd34d` (primary accent)
- **Sky**: `#38bdf8` (secondary accent)
- **Rose**: `#fb7185` (tertiary accent)

### Typography
- **Display**: Sora (bold, headlines)
- **Body**: Inter (readable, body text)
- **Mono**: JetBrains Mono (code)

### Animation
- GSAP for timeline-based sequences
- Webflow-quality cubic-bezier easing
- Staggered reveals for entrance animations

---

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev
# Opens http://localhost:3000
```

### Backend Development
```bash
cd backend
npx vercel dev
# API runs on http://localhost:3000/api
```

### Type Checking
```bash
cd frontend && npm run type-check
cd backend && npm run type-check
```

---

## 📝 Features Implemented (Phase 1)

✅ **Hero Component**
- Cinematic entrance animation
- Modern aesthetic (no vibe coding)
- Spanish/English bilingual
- GSAP timeline orchestration

✅ **Event Form Modal**
- Minimal 4-field form (name, email, type, needs)
- Validation with Zod
- Clean design matching hero

✅ **Backend API**
- Form submission handler
- Claude API integration for proposal generation
- Upstash Redis for persistent memory
- Vercel Functions deployment ready

✅ **Shared Infrastructure**
- TypeScript type definitions
- Design tokens
- Shared schemas

---

## 🔮 Planned Features (Phase 2-4)

- [ ] **Services Page** - Detailed service descriptions
- [ ] **Portfolio/Case Studies** - Showcase past events
- [ ] **Process Explanation** - How DOS2A works
- [ ] **Pricing Details** - Tier breakdowns
- [ ] **FAQ Section** - Common questions
- [ ] **WhatsApp Integration** - Direct messaging
- [ ] **Telegram Bot** - Automated responses
- [ ] **Email Notifications** - SendGrid integration
- [ ] **Booking System** - Calendar integration
- [ ] **Payment Processing** - Stripe/Mercado Pago

---

## 🛠️ Configuration

### Add WhatsApp Integration (Future)
1. Get Twilio credentials
2. Add to `.env.local`
3. Uncomment webhook handlers in `/backend/api/webhooks/whatsapp.ts`

### Add Telegram Bot (Future)
1. Create bot via BotFather on Telegram
2. Add token to `.env.local`
3. Set webhook URL in Telegram settings

### Add Email Notifications (Future)
1. Get SendGrid API key
2. Add to `.env.local`
3. Configure email templates

---

## 📊 Performance Targets

- ✅ LCP < 2.5s
- ✅ CLS < 0.1
- ✅ FID < 100ms
- ✅ Mobile-first responsive
- ✅ WCAG AA accessibility

---

## 🔐 Security

- ✅ Environment variables for secrets (no hardcoding)
- ✅ Upstash Redis for secure data storage
- ✅ CORS headers configured
- ✅ Input validation with Zod
- ✅ Rate limiting ready (implement in Phase 2)

---

## 📞 Support & Contact

**DOS2A Contact**
- Email: 2audioiluminacion@gmail.com
- Instagram: @dos2a
- Location: CDMX, Mexico

---

## 📄 License

Proprietary - DO2SA 2024

---

## 🚀 Built with ZEPHYR Protocol

This project was built using the ZEPHYR Protocol - an autonomous AI development system that:
- Executes frontend and backend in parallel
- Uses phase-locked loops for automatic progression
- Requires zero human dependencies between phases
- Delivers complete, deployable systems

Learn more: See ZEPHYR_PROTOCOL_v1.0.md

---

**Status**: ✅ Phase 1 Complete - Ready for Frontend Deployment
**Next**: Deploy to Vercel, then proceed to Phase 2 (Features)
