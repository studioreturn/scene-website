# Scene — ourscene.uk

Marketing site and public profile layer for the **Scene** iOS app. Built with Next.js 14 (App Router), Tailwind CSS, deployed on Vercel.

---

## Routes

| Route | Type | Description |
|---|---|---|
| `/` | Static | Marketing homepage |
| `/[username]` | SSR | Public user profile |
| `/privacy` | Static | Privacy policy placeholder |
| `/.well-known/apple-app-site-association` | Static JSON | iOS Universal Links config |

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Profile pages are driven by **mock data** by default — see [Swapping in the real Supabase function](#1-swap-in-the-real-supabase-edge-function) below.

Visit [http://localhost:3000/willgreen](http://localhost:3000/willgreen) to preview the profile page with mock data.

---

## Configuration TODOs

### 1. Swap in the real Supabase Edge Function

1. Open `lib/supabase.ts`.
2. Set `MOCK_MODE = false`.
3. Add the anon key to your environment:

```bash
# .env.local
SUPABASE_ANON_KEY=sb_publishable_JgxFfMF17caRez2K6C_KBQ_H8BqWVS-
```

4. Update the fetch helper to read from `process.env.SUPABASE_ANON_KEY` instead of the hardcoded constant.

The Edge Function should be deployed at:
```
POST https://pppynzuccijjqydhtjgu.supabase.co/functions/v1/public-profile
Body: { "username": "<username>" }
Returns: { profile: { displayName, username, bio, avatarURL }, gigs: [...], stats: { gigCountThisYear, mostVisitedVenue } }
```

---

### 2. Fill in the Apple Team ID

1. Go to [developer.apple.com → Account → Membership](https://developer.apple.com/account/#!/membership/).
2. Copy your **Team ID**.
3. Replace `REPLACE_WITH_TEAM_ID` in **two** places:
   - `public/.well-known/apple-app-site-association`

---

### 3. Fill in the App Store ID

Once the app is live on the App Store:

1. Go to [App Store Connect → My Apps → Your App → App Information](https://appstoreconnect.apple.com/).
2. Copy the **Apple ID** (numeric, e.g. `1234567890`).
3. Replace `REPLACE_WITH_APP_STORE_ID` in:
   - `app/layout.tsx` — `apple-itunes-app` meta tag
   - `components/AppStoreButton.tsx` — App Store URL

---

### 4. Deploy to Vercel and point ourscene.uk at it

**Deploy:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (first time — follow the prompts)
vercel

# Production deploy
vercel --prod
```

Or connect the GitHub repo to Vercel via the dashboard — it will auto-deploy on every push to `main`.

**Environment variables on Vercel:**

In the Vercel dashboard → Project → Settings → Environment Variables, add:

| Key | Value |
|---|---|
| `SUPABASE_ANON_KEY` | `sb_publishable_JgxFfMF17caRez2K6C_KBQ_H8BqWVS-` |

**Custom domain:**

1. In Vercel → Project → Settings → Domains, add `ourscene.uk` and `www.ourscene.uk`.
2. Vercel will show you the DNS records to add (usually an A record and a CNAME).
3. Add those records in your domain registrar's DNS settings.
4. Vercel provisions an SSL certificate automatically.

---

## Project structure

```
app/
  layout.tsx                   Root layout, Inter font, global meta
  page.tsx                     Marketing homepage (static)
  [username]/
    page.tsx                   Profile page (SSR, generateMetadata)
    loading.tsx                Skeleton loader
    not-found.tsx              404 with link home
  privacy/
    page.tsx                   Privacy policy placeholder
public/
  .well-known/
    apple-app-site-association iOS Universal Links config (no extension)
  og-default.png               Default Open Graph card image
lib/
  supabase.ts                  Edge Function fetch helper + mock data
  types.ts                     TypeScript types (SceneProfile, SceneGig, etc.)
components/
  Nav.tsx                      Sticky nav
  Hero.tsx                     Hero section
  FeatureGrid.tsx              Three feature tiles
  AppStoreButton.tsx           App Store CTA button
  ProfileCard.tsx              Full profile layout
  GigStub.tsx                  Ticket-style gig card
  OpenInAppButton.tsx          Universal Link "Open in Scene" button
  StatPill.tsx                 Stat badge pill
```

---

## Design tokens

| Token | Value |
|---|---|
| Background | `#0A0A0A` |
| Surface | `#1A1A1A` |
| Accent | `#C8F53A` |
| Muted text | `#737373` |
| Border | `#333333` |
| Font | Inter (via `next/font/google`) |
