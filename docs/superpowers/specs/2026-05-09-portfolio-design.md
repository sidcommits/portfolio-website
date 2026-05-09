# Portfolio Website — Design Spec
**Date:** 2026-05-09
**Owner:** Siddhant Deshpande
**Status:** Approved — ready for implementation

---

## 1. Overview

A scroll-driven, cinematic portfolio website for Siddhant Deshpande, a Distributed Systems Engineer with 4-5 years of experience. The site is structured as a **storyboard** — scrolling through the page feels like advancing through a film. Each section is a "scene" with its own animation personality. The recruiter or startup founder who lands on it doesn't read a resume; they experience a narrative.

**Primary goal:** Get hired or funded. Impress in 5 seconds, communicate value in 30.

**Target audience:** Tech recruiters and startup founders.

---

## 2. Visual Identity

| Token | Value |
|---|---|
| Base background | Cream / off-white `#FAF8F5` |
| Primary text | Ink-black `#0D0D0D` |
| Accent | Electric orange `#FF4500` |
| Secondary text | Warm gray `#6B6B6B` |
| Font — Display | Clash Display or Syne (bold, editorial) |
| Font — Body | Inter or DM Sans (readable, modern) |
| Font — Mono | JetBrains Mono (for code/tech labels) |

**Rules:**
- No pure black (`#000000`) backgrounds. No dark navy.
- Electric orange used sparingly — CTAs, accent lines, cursor, hover states.
- Cream is the dominant tone. Ink-black and orange create contrast.
- Color palette is easily swappable via CSS variables in `globals.css`.

---

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR for SEO, Vercel-compatible, component model |
| Styling | Tailwind CSS + CSS variables | Utility-first, palette via variables |
| Scroll animation | GSAP + ScrollTrigger | Industry standard for scroll-pinning / cinematic scroll |
| Component animation | Framer Motion | React-native animations, page transitions |
| Smooth scroll | Lenis | Silky scroll feel across the whole page |
| Content | `content.ts` (single config file) | All personal data in one place, zero component edits to update |
| Deployment | Self-hosted VPS + Nginx reverse proxy | User already has VPS with existing sites on ports |
| SSL | Certbot (Let's Encrypt) | Free, auto-renewing |
| Contact form | Resend or Formspree | No backend needed |

---

## 4. Deployment Architecture

```
yourdomain.com          → Nginx → Next.js portfolio (port 3000)
logs.yourdomain.com     → Nginx → Semantic Log Search app (existing port)
meals.yourdomain.com    → Nginx → Surprise Meal app (existing port)
nft.yourdomain.com      → Nginx → NFT Display Monitor (existing port)
```

**Nginx config pattern for portfolio:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Process management:** PM2 to keep Next.js alive across reboots.

---

## 5. Project Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx              ← root layout, Lenis init, fonts
│   ├── page.tsx                ← single page, renders all scenes in order
│   └── globals.css             ← CSS variables, base styles
├── components/
│   ├── scenes/
│   │   ├── ColdOpen.tsx        ← Scene 1: name reveal + typewriter
│   │   ├── Stakes.tsx          ← Scene 2: statement + counters
│   │   ├── Engineer.tsx        ← Scene 3: photo reveal + about
│   │   ├── ProjectLog.tsx      ← Scene 4: semantic log search
│   │   ├── ProjectMeal.tsx     ← Scene 5: surprise meal app
│   │   ├── ProjectNFT.tsx      ← Scene 6: NFT display monitor
│   │   ├── Timeline.tsx        ← Scene 7: horizontal film strip
│   │   └── Invitation.tsx      ← Scene 8: contact CTA
│   └── ui/
│       ├── AnimatedText.tsx    ← typewriter + fade text primitive
│       ├── Counter.tsx         ← count-up number animation
│       ├── ProjectCard.tsx     ← shared project scene wrapper
│       ├── Cursor.tsx          ← custom electric orange cursor
│       └── Navbar.tsx          ← minimal fixed nav (name + anchor links)
├── lib/
│   └── gsap.ts                 ← ScrollTrigger registration + config
├── content.ts                  ← ALL personal data (single source of truth)
├── public/
│   └── images/                 ← photo, project screenshots
└── docs/
    └── superpowers/specs/
        └── 2026-05-09-portfolio-design.md
```

---

## 6. Content Schema (`content.ts`)

```typescript
export const content = {
  hero: {
    name: "Siddhant Deshpande",
    title: "Distributed Systems Engineer",
    tagline: "I build the infrastructure that keeps things running at scale."
  },

  stakes: {
    statement: "Every app you love runs on infrastructure most people never think about. I think about it every day.",
    stats: [
      { value: 4, suffix: "+", label: "Years of engineering" },
      { value: 2, suffix: "", label: "Graduate degrees" },
      { value: 3, suffix: "", label: "Systems shipped" }
    ]
  },

  about: {
    photo: "/images/sid.jpg",
    bio: "...", // 2-3 sentences, personality-forward — to be filled by Sid
    tags: ["Distributed Systems", "RAG Pipelines", "TypeScript", "Go", "Python"]
  },

  projects: [
    {
      chapter: "01",
      title: "Semantic Log Search",
      tagline: "Find anything in your logs. Just ask.",
      description: "Logs emitted to Loki are stored in a vector database. A RAG pipeline lets you query them in plain English.",
      stack: ["Python", "Loki", "Vector DB", "RAG", "LLM"],
      status: "shipped",
      link: "logs.yourdomain.com"
    },
    {
      chapter: "02",
      title: "Surprise Meal",
      tagline: "Subscriptions that actually delight.",
      description: "Load a balance, answer a few questions, and let the system order you a surprising meal from a different restaurant every time.",
      stack: ["TBD"],
      status: "in progress",
      link: null
    },
    {
      chapter: "03",
      title: "NFT Display Monitor",
      tagline: "Where crypto meets the physical world.",
      description: "Scan a QR code, upload your photo, and watch your NFT appear on a physical display screen.",
      stack: ["Crypto", "QR", "Display"],
      status: "shipped",
      link: "nft.yourdomain.com"
    }
  ],

  experience: [
    // { role, company, period, bullets[] } — to be filled by Sid
  ],

  education: [
    { degree: "MS", field: "Distributed Systems Engineering", institution: "...", year: "..." },
    { degree: "BS", field: "Computer Science", institution: "...", year: "..." }
  ],

  contact: {
    email: "siddhantdeshpande3@gmail.com",
    github: "...",
    linkedin: "..."
  }
}
```

---

## 7. The 8 Scenes — Animation Spec

### Scene 1 — Cold Open
- Full viewport, cream background
- `name` fades in centered, large display font
- Horizontal rule draws left-to-right (SVG stroke animation)
- `title` types out character by character
- `tagline` fades up from below
- Pulsing `SCROLL ↓` indicator at bottom
- **Pin duration:** ~150vh of scroll

### Scene 2 — The Stakes
- Full-width statement text slams in (scale from 0.8 → 1, opacity 0 → 1)
- Pins while three stat counters count up from 0 simultaneously
- Electric orange underline draws under key words
- **Pin duration:** ~100vh

### Scene 3 — The Engineer
- Photo reveals via clip-path: `inset(0 100% 0 0)` → `inset(0 0% 0 0)` (curtain from right)
- Bio text fades in line by line
- Skill tags pop in with staggered scale animation
- **Pin duration:** ~120vh

### Scene 4 — Chapter 01: Semantic Log Search
- Chapter title card slams in (ink-black full-width bar, white text)
- SVG diagram animates: log nodes → connecting paths draw → vector DB pulses → query result appears
- Stack tags stagger in from bottom
- **Pin duration:** ~150vh

### Scene 5 — Chapter 02: Surprise Meal
- Phone mockup slides in from right
- Sequence: wallet animation → question cards flip in → restaurant card spins → meal reveal + confetti burst
- "In progress" badge pulses with orange glow
- **Pin duration:** ~150vh

### Scene 6 — Chapter 03: NFT Display Monitor
- QR code draws itself (animated SVG path)
- Photo frame appears with upload progress
- NFT materializes in a display frame with electric orange glow pulse
- **Pin duration:** ~120vh

### Scene 7 — Timeline
- Horizontal film strip scrolls sideways as user scrolls down
- Each frame = one milestone (role, degree, year)
- Active frame scales up; inactive frames are slightly dimmed
- **Pin duration:** ~200vh (longer — gives time to read each frame)

### Scene 8 — The Invitation
- Fade back to plain cream — mirrors Scene 1's calm
- Headline: *"The next chapter needs a co-author."*
- Email, GitHub, LinkedIn appear with stagger
- Single electric orange button: `Let's talk →`
- **No pin** — natural page end

---

## 8. Global UI Details

- **Custom cursor:** 12px electric orange dot. Scales to 40px on hover over links/buttons. Blends to `mix-blend-mode: multiply` over text.
- **Navbar:** Fixed, minimal. Left: `SD` monogram. Right: anchor links to each scene. Fades in after Scene 1 completes.
- **Page transitions:** Framer Motion `AnimatePresence` — not needed for single-page but scaffolded for future pages.
- **Responsive:** Desktop-first (recruiters open portfolios on desktop). Mobile gets simplified animations (scroll-pinning disabled on `prefers-reduced-motion` and screens <768px).
- **SEO:** `metadata` in `layout.tsx` — name, title, description, OG image.

---

## 9. What Needs To Be Filled In

Before or during build, Sid needs to provide:
- [ ] Profile photo (`/public/images/sid.jpg`)
- [ ] About bio (2-3 sentences)
- [ ] Work experience entries (role, company, dates, bullet points)
- [ ] Education institution names and years
- [ ] GitHub and LinkedIn URLs
- [ ] Domain name (to finalize Nginx config and project links)
- [ ] Tech stack for Surprise Meal project
- [ ] Tech stack for NFT Display Monitor

---

## 10. Out of Scope

- Blog / writing section (can be added as a future subdomain)
- Dark mode toggle
- CMS / admin panel
- Backend API (contact form handled by third-party)
- Animations on mobile (simplified fallback only)
