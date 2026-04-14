# 🚀 DOS2A DEPLOYMENT GUIDE

## Overview
This guide walks you through deploying DOS2A to production on Vercel (both frontend and backend as separate projects).

---

## Phase 1: Prerequisites (15 minutes)

### 1.1 Create Required Accounts

**Vercel Account**
- Go to https://vercel.com
- Sign up with GitHub/GitLab
- No credit card required (free tier available)

**Anthropic (Claude API)**
- Go to https://console.anthropic.com
- Create account
- Generate API key
- ⚠️ **Important**: Keep this key secret!

**Upstash Redis**
- Go to https://upstash.com
- Sign up (free tier: 10,000 commands/day)
- Create a new Redis database
- Copy REST URL and token

**GitHub**
- Create a new private repository for dos2a
- Clone the monorepo code here

---

## Phase 2: GitHub Setup (10 minutes)

### 2.1 Initialize Git Repository

```bash
cd dos2a

# Initialize git
git init
git add .
git commit -m "Initial commit - ZEPHYR Protocol"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/dos2a.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Phase 3: Deploy Frontend (15 minutes)

### 3.1 Create Frontend Project on Vercel

**Via Web Dashboard:**
1. Go to https://vercel.com/new
2. Select "Next.js" template
3. Connect your GitHub repository
4. Select `./frontend` as the root directory
5. Click "Deploy"

**OR via CLI:**
```bash
cd frontend
npx vercel --prod
```

### 3.2 Configure Frontend Environment Variables

In Vercel dashboard for frontend project:
1. Go to Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_API_URL=https://dos2a-api.vercel.app
   ```
   (Replace with your actual backend URL from Step 4)

### 3.3 Get Your Frontend URL
- Copy the auto-generated URL (e.g., `https://dos2a-frontend.vercel.app`)
- Or set custom domain: `Settings → Domains → Add awardslevelawards.com`

---

## Phase 4: Deploy Backend (15 minutes)

### 4.1 Create Backend Project on Vercel

**Via Web Dashboard:**
1. Go to https://vercel.com/new
2. Select "Node.js" or "Other"
3. Connect your GitHub repository
4. Select `./backend` as the root directory
5. Click "Deploy"

**OR via CLI:**
```bash
cd backend
npx vercel --prod
```

### 4.2 Configure Backend Environment Variables

In Vercel dashboard for backend project:
1. Go to Settings → Environment Variables
2. Add:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-actual-key-from-console.anthropic.com
   UPSTASH_REDIS_REST_URL=https://your-actual-url.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your-actual-token
   ```
3. Click "Save"
4. Redeploy: Go to Deployments → Redeploy Latest

### 4.3 Get Your Backend URL
- Copy the auto-generated URL (e.g., `https://dos2a-api.vercel.app`)
- Or set custom domain: `api.awardslevelawards.com`

---

## Phase 5: Connect Frontend to Backend (5 minutes)

### 5.1 Update Frontend Environment Variable

In Vercel dashboard for **frontend** project:
1. Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL` to your backend URL
   ```
   NEXT_PUBLIC_API_URL=https://dos2a-api.vercel.app
   ```
3. Go to Deployments → Redeploy Latest

---

## Phase 6: Setup Custom Domain (10 minutes)

### 6.1 Point Domain DNS Records

In your domain registrar (GoDaddy, Namecheap, etc.):

**For Frontend (awardslevelawards.com):**
```
Type: CNAME
Name: @
Value: cname.vercel.com
```

**For Backend API (api.awardslevelawards.com):**
```
Type: CNAME
Name: api
Value: cname.vercel.com
```

### 6.2 Add Domains in Vercel

**Frontend:**
1. Settings → Domains
2. Add `awardslevelawards.com`
3. Vercel will automatically verify DNS

**Backend:**
1. Settings → Domains
2. Add `api.awardslevelawards.com`
3. Vercel will automatically verify DNS

⏳ **Note**: DNS propagation can take 24-48 hours

---

## Phase 7: Test Your Deployment (10 minutes)

### 7.1 Test Frontend

Open in browser:
```
https://awardslevelawards.com
```

Check:
- ✅ Hero loads with animations
- ✅ Language toggle works (ES/EN)
- ✅ Form modal opens/closes
- ✅ No console errors

### 7.2 Test Backend API

```bash
# Test form submission
curl -X POST https://dos2a-api.vercel.app/api/forms/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "eventType": "fiesta",
    "needs": "Audio and lighting for a big party"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "clientName": "Test User",
    "tiers": { ... }
  }
}
```

### 7.3 Test Memory (Upstash)

Submit the form again with the same email:
- Claude should reference prior interaction
- Redis should store conversation history
- Check Upstash dashboard for key-value pairs

---

## Phase 8: Monitoring & Optimization (Ongoing)

### 8.1 Enable Vercel Analytics

**Frontend:**
1. Settings → Analytics
2. Enable Web Analytics
3. Monitor: LCP, CLS, FID

**Backend:**
1. Settings → Analytics
2. Monitor: API response times, error rates

### 8.2 Setup Error Tracking

In Vercel dashboard:
1. Settings → Error Tracking (if available)
2. Configure error notifications

### 8.3 Set Up Environment Variable Rotation

For security, rotate API keys monthly:
1. Create new key in Anthropic console
2. Update `ANTHROPIC_API_KEY` in Vercel
3. Delete old key from Anthropic console

---

## Phase 9: CI/CD & Auto-Deployment (Optional)

Vercel automatically deploys on every push to main:

```bash
# Make changes
git add .
git commit -m "Feature: Add services page"
git push origin main

# Vercel automatically:
# 1. Builds both frontend and backend
# 2. Runs tests (if configured)
# 3. Deploys to production
# 4. Updates DNS
```

---

## Troubleshooting

### Frontend Shows 404
- Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Redeploy frontend after changing API URL

### API Returns 500 Error
- Check backend environment variables are set correctly
- Verify `ANTHROPIC_API_KEY` is valid
- Check Redis connection: `UPSTASH_REDIS_REST_URL` and token

### Form Submission Fails
- Check browser console for errors
- Check Vercel function logs: Deployments → select deployment → Logs

### DNS Not Working
- DNS takes 24-48 hours to propagate
- Use https://dnschecker.org to verify
- Temporarily use Vercel's auto-generated URL while waiting

---

## Security Checklist

- ✅ All API keys stored in Vercel environment variables (not in code)
- ✅ GitHub repository is private
- ✅ No `.env` files committed to git
- ✅ CORS headers configured in backend
- ✅ Input validation with Zod on all endpoints
- ✅ Rate limiting ready (implement in Phase 2)

---

## What's Next?

After Phase 1 deployment:

1. **Phase 2** - Add services page, portfolio, pricing tiers
2. **Phase 3** - WhatsApp and Telegram integration
3. **Phase 4** - Booking system and payment processing
4. **Phase 5** - SEO optimization and analytics

---

## Support

**Issues?**
- Check Vercel logs: https://vercel.com/dashboard
- Check API logs: Backend project → Deployments → Logs
- Check Redis: https://console.upstash.com

**Questions?**
- Vercel docs: https://vercel.com/docs
- Claude docs: https://docs.anthropic.com
- Upstash docs: https://upstash.com/docs

---

**Deployment Status**: ✅ Ready to Deploy
**Estimated Time**: ~1 hour total
**Cost**: FREE (Vercel + Anthropic free tier + Upstash free tier)
