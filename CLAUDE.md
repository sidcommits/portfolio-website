# Portfolio Website — Claude Context

## What This Is
Siddhant Deshpande's personal portfolio website. Scroll-driven, cinematic storyboard experience. Built in Next.js 14. Targets tech recruiters and startup founders.

## Design Spec
Full spec at `docs/superpowers/specs/2026-05-09-portfolio-design.md` — read this before making any design decisions.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS variables
- **Scroll animation:** GSAP + ScrollTrigger
- **Component animation:** Framer Motion
- **Smooth scroll:** Lenis
- **Deployment:** Self-hosted VPS + Nginx reverse proxy + PM2

## Visual Identity
- Background: Cream `#FAF8F5`
- Text: Ink-black `#0D0D0D`
- Accent: Electric orange `#FF4500`
- Display font: Clash Display or Syne
- Body font: Inter or DM Sans
- Mono font: JetBrains Mono

## Key Conventions
- All personal data lives in `content.ts` — never hardcode content in components
- 8 scenes, one scrollable page (`app/page.tsx`)
- Scene components live in `components/scenes/`
- Reusable UI primitives live in `components/ui/`
- GSAP ScrollTrigger initialized in `lib/gsap.ts`
- Desktop-first; mobile gets simplified animations (no scroll pinning)

## Commands
```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # start production server (used by PM2 on VPS)
```

## What Needs Filling In (before launch)
See Section 9 of the design spec. Key items:
- Profile photo → `public/images/sid.jpg`
- About bio (2-3 sentences)
- Work experience entries
- GitHub + LinkedIn URLs
- Domain name (for Nginx config)
