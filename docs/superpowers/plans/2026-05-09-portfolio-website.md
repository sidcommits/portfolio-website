# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Siddhant's cinematic scroll-driven portfolio — 8 pinned scenes that play like a film as the user scrolls, built in Next.js 14 with GSAP ScrollTrigger.

**Architecture:** Single scrollable page (`app/page.tsx`) composes 8 scene components. Each scene uses GSAP ScrollTrigger to pin itself to the viewport while its animation plays, then unpins for the next scene. All personal data lives in `content.ts` — zero hardcoded content in components.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP 3 + ScrollTrigger, Framer Motion 11, Lenis (smooth scroll), Inter + Syne + JetBrains Mono fonts.

---

## File Map

| File | Responsibility |
|---|---|
| `content.ts` | Single source of truth for all personal data |
| `lib/gsap.ts` | Register GSAP plugins, export typed ScrollTrigger helpers |
| `app/layout.tsx` | Root layout: fonts, metadata, Lenis provider, Cursor |
| `app/page.tsx` | Compose all 8 scene components in order |
| `app/globals.css` | CSS variables (palette, fonts), base reset, scrollbar |
| `components/ui/Cursor.tsx` | Custom electric orange cursor with hover scale |
| `components/ui/Navbar.tsx` | Fixed minimal nav, fades in after Scene 1 |
| `components/ui/AnimatedText.tsx` | Reusable typewriter / fade-up text primitive |
| `components/ui/Counter.tsx` | Count-up number animation using GSAP |
| `components/scenes/ColdOpen.tsx` | Scene 1: name + rule draw + typewriter |
| `components/scenes/Stakes.tsx` | Scene 2: statement slam + 3 counters |
| `components/scenes/Engineer.tsx` | Scene 3: clip-path photo reveal + bio |
| `components/scenes/ProjectLog.tsx` | Scene 4: SVG flow diagram + stack tags |
| `components/scenes/ProjectMeal.tsx` | Scene 5: phone mockup + card flip sequence |
| `components/scenes/ProjectNFT.tsx` | Scene 6: QR draw + NFT glow reveal |
| `components/scenes/Timeline.tsx` | Scene 7: horizontal film strip |
| `components/scenes/Invitation.tsx` | Scene 8: contact CTA |
| `public/images/sid.jpg` | Profile photo (Sid provides) |
| `pm2.config.js` | PM2 process config for VPS |
| `nginx.conf` | Nginx server block template |

---

## Task 1: Project Initialisation

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `next.config.ts`

- [ ] **Step 1: Scaffold Next.js 14 app**

```bash
cd /Users/sid/Desktop/Projects/portfolio-website
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
```

When prompted: no to src directory, yes to App Router.

- [ ] **Step 2: Install animation + scroll dependencies**

```bash
npm install gsap @gsap/react framer-motion lenis
npm install -D @types/node
```

- [ ] **Step 3: Install font packages**

```bash
npm install @fontsource/inter @fontsource/syne @fontsource/jetbrains-mono
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: `ready - started server on 0.0.0.0:3000`. Open `http://localhost:3000` — default Next.js page visible.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: initialise Next.js 14 portfolio project"
```

---

## Task 2: CSS Variables + Global Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css entirely**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --cream:   #FAF8F5;
  --ink:     #0D0D0D;
  --orange:  #FF4500;
  --gray:    #6B6B6B;
  --white:   #FFFFFF;

  --font-display: 'Syne', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-body);
  overflow-x: hidden;
}

body {
  background: var(--cream);
  cursor: none; /* custom cursor replaces default */
}

/* Hide default scrollbar — Lenis manages scroll */
::-webkit-scrollbar { display: none; }
html { scrollbar-width: none; }

/* Orange accent utility */
.accent { color: var(--orange); }
.accent-bg { background: var(--orange); }
.accent-border { border-color: var(--orange); }
```

- [ ] **Step 2: Update tailwind.config.ts to expose CSS vars**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:  'var(--cream)',
        ink:    'var(--ink)',
        orange: 'var(--orange)',
        gray:   'var(--gray)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
        mono:    ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "feat: add CSS design tokens and Tailwind palette"
```

---

## Task 3: Content Schema

**Files:**
- Create: `content.ts`

- [ ] **Step 1: Create content.ts with full type definitions and data**

```typescript
// content.ts
export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Project {
  chapter: string
  title: string
  tagline: string
  description: string
  stack: string[]
  status: 'shipped' | 'in progress'
  link: string | null
}

export interface TimelineItem {
  year: string
  label: string
  sublabel: string
  type: 'work' | 'education'
}

export interface Content {
  hero: { name: string; title: string; tagline: string }
  stakes: { statement: string; stats: Stat[] }
  about: { photo: string; bio: string; tags: string[] }
  projects: Project[]
  timeline: TimelineItem[]
  contact: { email: string; github: string; linkedin: string }
}

export const content: Content = {
  hero: {
    name: 'Siddhant Deshpande',
    title: 'Distributed Systems Engineer',
    tagline: 'I build the infrastructure that keeps things running at scale.',
  },

  stakes: {
    statement:
      'Every app you love runs on infrastructure most people never think about. I think about it every day.',
    stats: [
      { value: 4, suffix: '+', label: 'Years of engineering' },
      { value: 2, suffix: '',  label: 'Graduate degrees' },
      { value: 3, suffix: '',  label: 'Systems shipped' },
    ],
  },

  about: {
    photo: '/images/sid.jpg',
    bio: "I'm a distributed systems engineer who obsesses over the invisible layer that makes software work at scale. I've shipped production systems, built AI-powered tooling, and I'm always working on something that solves a real problem.",
    tags: ['Distributed Systems', 'RAG Pipelines', 'TypeScript', 'Python', 'Go', 'Vector DBs'],
  },

  projects: [
    {
      chapter: '01',
      title: 'Semantic Log Search',
      tagline: 'Find anything in your logs. Just ask.',
      description:
        'Logs emitted to Loki are embedded and stored in a vector database. A RAG pipeline lets engineers query them in plain English — no more grep marathons.',
      stack: ['Python', 'Loki', 'Vector DB', 'RAG', 'LLM'],
      status: 'shipped',
      link: null, // replace with logs.yourdomain.com
    },
    {
      chapter: '02',
      title: 'Surprise Meal',
      tagline: 'Subscriptions that actually delight.',
      description:
        'Load a balance, answer a few questions about your taste, and let the system order you a surprising meal from a different restaurant every time. No decision fatigue.',
      stack: ['React Native', 'Node.js', 'AI', 'Payment API'],
      status: 'in progress',
      link: null,
    },
    {
      chapter: '03',
      title: 'NFT Display Monitor',
      tagline: 'Where crypto meets the physical world.',
      description:
        'Scan a QR code, upload your photo, and watch your NFT materialise on a physical display screen. Bridges on-chain assets with the real world.',
      stack: ['Crypto', 'QR', 'WebSockets', 'Display'],
      status: 'shipped',
      link: null, // replace with nft.yourdomain.com
    },
  ],

  timeline: [
    { year: '2019', label: 'BS Computer Science', sublabel: 'University name here', type: 'education' },
    { year: '2021', label: 'Software Engineer', sublabel: 'Company name here', type: 'work' },
    { year: '2023', label: 'MS Distributed Systems', sublabel: 'University name here', type: 'education' },
    { year: '2024', label: 'Senior Engineer', sublabel: 'Company name here', type: 'work' },
  ],

  contact: {
    email: 'siddhantdeshpande3@gmail.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
  },
}
```

- [ ] **Step 2: Verify TypeScript accepts the schema**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add content.ts
git commit -m "feat: add typed content schema with portfolio data"
```

---

## Task 4: GSAP Setup

**Files:**
- Create: `lib/gsap.ts`

- [ ] **Step 1: Create GSAP plugin registration module**

```typescript
// lib/gsap.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once — safe to call multiple times
export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger)
}

// Shared ScrollTrigger defaults for scene pinning
export const sceneTriggerDefaults = {
  scrub: 1,          // smooth scrub — 1 second lag
  pin: true,
  anticipatePin: 1,
}

export { gsap, ScrollTrigger }
```

- [ ] **Step 2: Verify import resolves**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/gsap.ts
git commit -m "feat: add GSAP plugin registration and shared defaults"
```

---

## Task 5: Root Layout + Lenis Smooth Scroll

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/ui/LenisProvider.tsx`

- [ ] **Step 1: Create Lenis provider as a client component**

```tsx
// components/ui/LenisProvider.tsx
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/gsap'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGSAP()

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 2: Update root layout**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/jetbrains-mono/400.css'
import './globals.css'
import LenisProvider from '@/components/ui/LenisProvider'
import Cursor from '@/components/ui/Cursor'

export const metadata: Metadata = {
  title: 'Siddhant Deshpande — Distributed Systems Engineer',
  description:
    'Portfolio of Siddhant Deshpande — software engineer specialising in distributed systems, RAG pipelines, and infrastructure that scales.',
  openGraph: {
    title: 'Siddhant Deshpande — Distributed Systems Engineer',
    description: 'I build the infrastructure that keeps things running at scale.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/ui/LenisProvider.tsx
git commit -m "feat: add Lenis smooth scroll provider and root layout"
```

---

## Task 6: Custom Cursor

**Files:**
- Create: `components/ui/Cursor.tsx`

- [ ] **Step 1: Create cursor component**

```tsx
// components/ui/Cursor.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { registerGSAP } from '@/lib/gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    const dot = dotRef.current
    if (!dot) return

    // Follow mouse with slight lag
    const onMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    // Scale up on interactive elements
    const onEnter = () => gsap.to(dot, { scale: 3.5, duration: 0.2 })
    const onLeave = () => gsap.to(dot, { scale: 1, duration: 0.2 })

    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll('a, button, [data-cursor-grow]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-multiply"
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: 'var(--orange)',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
```

- [ ] **Step 2: Verify cursor appears in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Move mouse — orange dot should follow cursor. Default cursor should be hidden.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Cursor.tsx
git commit -m "feat: add custom electric orange cursor"
```

---

## Task 7: Navbar

**Files:**
- Create: `components/ui/Navbar.tsx`

- [ ] **Step 1: Create navbar**

```tsx
// components/ui/Navbar.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

const NAV_LINKS = [
  { label: 'About',    href: '#engineer' },
  { label: 'Work',     href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Fade in after 2.5s (Scene 1 has played)
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 2.5, ease: 'power2.out' }
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 opacity-0"
    >
      {/* Monogram */}
      <span className="font-display font-bold text-lg tracking-tight text-ink">
        {content.hero.name.split(' ').map((n) => n[0]).join('')}
      </span>

      {/* Links */}
      <ul className="flex gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="font-body text-sm text-gray hover:text-orange transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

- [ ] **Step 2: Verify navbar renders and fades in**

```bash
npm run dev
```

Open `http://localhost:3000`. Wait ~2.5s — navbar should fade in at top. Links should turn orange on hover.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Navbar.tsx
git commit -m "feat: add minimal fixed navbar with delayed fade-in"
```

---

## Task 8: AnimatedText + Counter Primitives

**Files:**
- Create: `components/ui/AnimatedText.tsx`
- Create: `components/ui/Counter.tsx`

- [ ] **Step 1: Create AnimatedText — typewriter variant**

```tsx
// components/ui/AnimatedText.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  /** 'typewriter' types char by char; 'fadeup' fades up as a block */
  variant?: 'typewriter' | 'fadeup'
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  variant = 'fadeup',
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (variant === 'typewriter') {
      // Split into character spans
      el.innerHTML = text
        .split('')
        .map((ch) => `<span style="opacity:0">${ch === ' ' ? '&nbsp;' : ch}</span>`)
        .join('')

      gsap.to(el.querySelectorAll('span'), {
        opacity: 1,
        duration: 0.05,
        stagger: 0.04,
        delay,
        ease: 'none',
      })
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' }
      )
    }
  }, [text, delay, variant])

  return (
    <span ref={ref} className={className}>
      {variant === 'fadeup' ? text : null}
    </span>
  )
}
```

- [ ] **Step 2: Create Counter**

```tsx
// components/ui/Counter.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export default function Counter({ value, suffix = '', duration = 2, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${Math.round(obj.val)}${suffix}`
      },
    })
  }, [value, suffix, duration])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/AnimatedText.tsx components/ui/Counter.tsx
git commit -m "feat: add AnimatedText and Counter UI primitives"
```

---

## Task 9: Scene 1 — Cold Open

**Files:**
- Create: `components/scenes/ColdOpen.tsx`

- [ ] **Step 1: Create ColdOpen scene**

```tsx
// components/scenes/ColdOpen.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { content } from '@/content'

export default function ColdOpen() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef    = useRef<HTMLHeadingElement>(null)
  const ruleRef    = useRef<SVGLineElement>(null)
  const titleRef   = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const scrollRef  = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: false, // entrance plays freely, not scrub-tied
          anticipatePin: 1,
        },
      })

      // Name fades in
      tl.fromTo(nameRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })

      // Rule draws left to right
      if (ruleRef.current) {
        const len = ruleRef.current.getTotalLength?.() ?? 400
        gsap.set(ruleRef.current, { strokeDasharray: len, strokeDashoffset: len })
        tl.to(ruleRef.current, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.3')
      }

      // Title typewriter
      const titleEl = titleRef.current
      if (titleEl) {
        titleEl.innerHTML = content.hero.title
          .split('')
          .map((ch) => `<span style="opacity:0;display:inline-block">${ch === ' ' ? '&nbsp;' : ch}</span>`)
          .join('')
        tl.to(titleEl.querySelectorAll('span'), { opacity: 1, stagger: 0.04, duration: 0.01 }, '-=0.1')
      }

      // Tagline fades up
      tl.fromTo(taglineRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.2')

      // Scroll indicator pulses
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      gsap.to(scrollRef.current, { y: 8, repeat: -1, yoyo: true, duration: 0.9, ease: 'sine.inOut' })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center w-full h-screen bg-cream overflow-hidden"
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("/images/grain.png")', backgroundRepeat: 'repeat' }}
      />

      <div className="flex flex-col items-center gap-6 text-center px-6">
        <h1
          ref={nameRef}
          className="font-display font-bold text-[clamp(2.5rem,8vw,7rem)] tracking-tight text-ink opacity-0"
        >
          {content.hero.name}
        </h1>

        {/* Horizontal rule */}
        <svg width="400" height="2" className="w-full max-w-lg">
          <line ref={ruleRef} x1="0" y1="1" x2="400" y2="1" stroke="var(--orange)" strokeWidth="1.5" />
        </svg>

        <p
          ref={titleRef}
          className="font-mono text-sm tracking-[0.2em] uppercase text-gray"
        />

        <p
          ref={taglineRef}
          className="font-body text-lg md:text-xl text-ink max-w-xl opacity-0"
        >
          {content.hero.tagline}
        </p>
      </div>

      {/* Scroll indicator */}
      <span
        ref={scrollRef}
        className="absolute bottom-10 font-mono text-xs tracking-widest text-gray opacity-0"
      >
        SCROLL ↓
      </span>
    </section>
  )
}
```

- [ ] **Step 2: Add grain texture placeholder**

Create an empty file so the path doesn't 404 (replace with a real grain PNG later):

```bash
mkdir -p /Users/sid/Desktop/Projects/portfolio-website/public/images
touch /Users/sid/Desktop/Projects/portfolio-website/public/images/grain.png
touch /Users/sid/Desktop/Projects/portfolio-website/public/images/sid.jpg
```

- [ ] **Step 3: Wire into page.tsx temporarily**

```tsx
// app/page.tsx
import ColdOpen from '@/components/scenes/ColdOpen'
import Navbar from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
    </main>
  )
}
```

- [ ] **Step 4: Verify Scene 1 in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. You should see: name fades in → orange line draws → title types → tagline appears → "SCROLL ↓" pulses. Navbar fades in after 2.5s.

- [ ] **Step 5: Commit**

```bash
git add components/scenes/ColdOpen.tsx app/page.tsx public/images/
git commit -m "feat: add Scene 1 ColdOpen with GSAP entrance animations"
```

---

## Task 10: Scene 2 — The Stakes

**Files:**
- Create: `components/scenes/Stakes.tsx`

- [ ] **Step 1: Create Stakes scene**

```tsx
// components/scenes/Stakes.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { content } from '@/content'
import Counter from '@/components/ui/Counter'

export default function Stakes() {
  const sectionRef   = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLParagraphElement>(null)
  const statsRef     = useRef<HTMLDivElement>(null)
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onEnter: () => setCounting(true),
        },
      })

      tl.fromTo(
        statementRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
      )
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="stakes"
      className="flex flex-col items-center justify-center w-full h-screen bg-cream px-6"
    >
      <p
        ref={statementRef}
        className="font-display font-bold text-[clamp(1.5rem,4vw,3rem)] text-center text-ink max-w-4xl leading-tight opacity-0"
      >
        {content.stakes.statement.split('infrastructure').map((part, i) =>
          i === 0 ? (
            <span key={i}>{part}<span className="text-orange underline decoration-orange">infrastructure</span></span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>

      <div ref={statsRef} className="flex gap-16 mt-16 opacity-0">
        {content.stakes.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <span className="font-display font-bold text-[clamp(3rem,8vw,6rem)] text-ink leading-none">
              {counting ? (
                <Counter value={stat.value} suffix={stat.suffix} duration={2} />
              ) : (
                `0${stat.suffix}`
              )}
            </span>
            <span className="font-mono text-xs tracking-widest uppercase text-gray">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
// app/page.tsx
import ColdOpen from '@/components/scenes/ColdOpen'
import Stakes   from '@/components/scenes/Stakes'
import Navbar   from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
      <Stakes />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Scroll past Scene 1 — Scene 2 should pin, statement slams in, stats appear, counters count up.

- [ ] **Step 4: Commit**

```bash
git add components/scenes/Stakes.tsx app/page.tsx
git commit -m "feat: add Scene 2 Stakes with counter animations"
```

---

## Task 11: Scene 3 — The Engineer

**Files:**
- Create: `components/scenes/Engineer.tsx`

- [ ] **Step 1: Create Engineer scene**

```tsx
// components/scenes/Engineer.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'
import Image from 'next/image'

export default function Engineer() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef   = useRef<HTMLDivElement>(null)
  const bioRef     = useRef<HTMLDivElement>(null)
  const tagsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Clip-path curtain reveal on photo
      tl.fromTo(
        photoRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut' }
      )

      // Bio lines stagger in
      tl.fromTo(
        bioRef.current?.querySelectorAll('p') ?? [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )

      // Tags pop in
      tl.fromTo(
        tagsRef.current?.querySelectorAll('span') ?? [],
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, stagger: 0.08, duration: 0.3, ease: 'back.out(1.7)' },
        '-=0.2'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="engineer"
      className="flex items-center justify-center w-full h-screen bg-cream px-8"
    >
      <div className="grid grid-cols-2 gap-20 max-w-5xl w-full items-center">
        {/* Photo with clip-path reveal */}
        <div
          ref={photoRef}
          className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <Image
            src={content.about.photo}
            alt={content.hero.name}
            fill
            className="object-cover object-top"
            priority
          />
          {/* Fallback placeholder */}
          <div className="absolute inset-0 bg-ink/10 flex items-center justify-center">
            <span className="font-display font-bold text-6xl text-ink/20">
              {content.hero.name.split(' ').map((n) => n[0]).join('')}
            </span>
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-8">
          <div ref={bioRef} className="flex flex-col gap-4">
            <p className="font-mono text-xs tracking-widest uppercase text-orange opacity-0">
              The Engineer
            </p>
            <p className="font-display font-bold text-3xl text-ink leading-snug opacity-0">
              {content.hero.name}
            </p>
            <p className="font-body text-base text-gray leading-relaxed opacity-0">
              {content.about.bio}
            </p>
          </div>

          <div ref={tagsRef} className="flex flex-wrap gap-2">
            {content.about.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1.5 border border-ink/20 rounded-full text-ink opacity-0"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
// app/page.tsx
import ColdOpen  from '@/components/scenes/ColdOpen'
import Stakes    from '@/components/scenes/Stakes'
import Engineer  from '@/components/scenes/Engineer'
import Navbar    from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
      <Stakes />
      <Engineer />
    </main>
  )
}
```

- [ ] **Step 3: Verify photo reveal in browser**

```bash
npm run dev
```

Scroll to Scene 3 — photo should wipe in from left, bio lines appear, tags pop in.

- [ ] **Step 4: Commit**

```bash
git add components/scenes/Engineer.tsx app/page.tsx
git commit -m "feat: add Scene 3 Engineer with clip-path photo reveal"
```

---

## Task 12: Scene 4 — Semantic Log Search

**Files:**
- Create: `components/scenes/ProjectLog.tsx`

- [ ] **Step 1: Create ProjectLog scene**

```tsx
// components/scenes/ProjectLog.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

const project = content.projects[0]

export default function ProjectLog() {
  const sectionRef  = useRef<HTMLElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const diagramRef  = useRef<SVGSVGElement>(null)
  const detailsRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Chapter title card slams in
      tl.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })

      // Animate SVG paths
      const paths = diagramRef.current?.querySelectorAll('[data-animate]') ?? []
      paths.forEach((path) => {
        const len = (path as SVGPathElement).getTotalLength?.() ?? 200
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      })
      tl.to(paths, { strokeDashoffset: 0, stagger: 0.3, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')

      // Node labels fade in
      tl.fromTo(
        diagramRef.current?.querySelectorAll('[data-label]') ?? [],
        { opacity: 0 },
        { opacity: 1, stagger: 0.2, duration: 0.3 },
        '-=0.5'
      )

      // Details slide up
      tl.fromTo(detailsRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="flex flex-col items-center justify-center w-full h-screen bg-cream px-8"
    >
      {/* Chapter title */}
      <div ref={titleRef} className="w-full max-w-5xl mb-12 opacity-0">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs tracking-widest text-orange uppercase">Chapter {project.chapter}</span>
        </div>
        <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] text-ink leading-none mt-1">
          {project.title}
        </h2>
        <p className="font-body text-gray mt-2">{project.tagline}</p>
      </div>

      <div className="grid grid-cols-2 gap-16 max-w-5xl w-full items-center">
        {/* SVG Flow Diagram */}
        <svg
          ref={diagramRef}
          viewBox="0 0 400 200"
          className="w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Loki node */}
          <rect x="10" y="80" width="80" height="40" rx="6" fill="var(--ink)" />
          <text data-label x="50" y="105" textAnchor="middle" fill="var(--cream)" fontSize="10" fontFamily="monospace" opacity="0">Loki Logs</text>

          {/* Arrow 1 */}
          <path data-animate d="M90 100 L150 100" stroke="var(--orange)" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Vector DB node */}
          <rect x="150" y="70" width="100" height="60" rx="6" fill="var(--ink)" />
          <text data-label x="200" y="102" textAnchor="middle" fill="var(--cream)" fontSize="10" fontFamily="monospace" opacity="0">Vector DB</text>
          <text data-label x="200" y="116" textAnchor="middle" fill="var(--orange)" fontSize="8" fontFamily="monospace" opacity="0">embeddings</text>

          {/* Arrow 2 */}
          <path data-animate d="M250 100 L310 100" stroke="var(--orange)" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* RAG node */}
          <rect x="310" y="80" width="80" height="40" rx="6" fill="var(--orange)" />
          <text data-label x="350" y="105" textAnchor="middle" fill="var(--cream)" fontSize="10" fontFamily="monospace" opacity="0">Natural Language</text>

          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="var(--orange)" />
            </marker>
          </defs>
        </svg>

        {/* Project details */}
        <div ref={detailsRef} className="flex flex-col gap-6 opacity-0">
          <p className="font-body text-gray leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="font-mono text-xs px-3 py-1.5 bg-ink text-cream rounded-full">
                {tech}
              </span>
            ))}
          </div>
          <span className="font-mono text-xs tracking-widest uppercase text-orange">
            ● {project.status}
          </span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
// app/page.tsx
import ColdOpen   from '@/components/scenes/ColdOpen'
import Stakes     from '@/components/scenes/Stakes'
import Engineer   from '@/components/scenes/Engineer'
import ProjectLog from '@/components/scenes/ProjectLog'
import Navbar     from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
      <Stakes />
      <Engineer />
      <ProjectLog />
    </main>
  )
}
```

- [ ] **Step 3: Verify diagram animation**

```bash
npm run dev
```

Scroll to Scene 4 — title appears, arrows draw across the diagram, node labels fade in, description slides up.

- [ ] **Step 4: Commit**

```bash
git add components/scenes/ProjectLog.tsx app/page.tsx
git commit -m "feat: add Scene 4 Semantic Log Search with SVG flow diagram"
```

---

## Task 13: Scene 5 — Surprise Meal

**Files:**
- Create: `components/scenes/ProjectMeal.tsx`

- [ ] **Step 1: Create ProjectMeal scene**

```tsx
// components/scenes/ProjectMeal.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

const project = content.projects[1]

export default function ProjectMeal() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const phoneRef   = useRef<HTMLDivElement>(null)
  const card1Ref   = useRef<HTMLDivElement>(null)
  const card2Ref   = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      tl.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
      tl.fromTo(phoneRef.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      tl.fromTo(card1Ref.current, { rotateY: 90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      tl.fromTo(card2Ref.current, { rotateY: 90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.1')
      tl.fromTo(detailsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center w-full h-screen bg-cream px-8"
    >
      <div ref={titleRef} className="w-full max-w-5xl mb-10 opacity-0">
        <span className="font-mono text-xs tracking-widest text-orange uppercase">Chapter {project.chapter}</span>
        <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] text-ink leading-none mt-1">
          {project.title}
        </h2>
        <p className="font-body text-gray mt-2">{project.tagline}</p>
      </div>

      <div className="grid grid-cols-2 gap-16 max-w-5xl w-full items-center">
        {/* Phone mockup with sequence cards */}
        <div ref={phoneRef} className="relative flex flex-col items-center gap-4 opacity-0" style={{ perspective: 800 }}>
          {/* Phone shell */}
          <div className="relative w-52 border-4 border-ink rounded-[2rem] bg-cream overflow-hidden shadow-2xl">
            <div className="h-4 bg-ink rounded-b-xl mx-auto w-20" /> {/* notch */}
            <div className="flex flex-col gap-3 p-4 min-h-[320px]">
              {/* Wallet card */}
              <div ref={card1Ref} className="bg-orange rounded-xl p-3 text-cream opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                <p className="font-mono text-xs uppercase tracking-wide">Balance</p>
                <p className="font-display font-bold text-2xl">₹1,000</p>
              </div>

              {/* Meal reveal card */}
              <div ref={card2Ref} className="bg-ink rounded-xl p-3 text-cream opacity-0 flex flex-col gap-1" style={{ transformStyle: 'preserve-3d' }}>
                <p className="font-mono text-xs uppercase tracking-wide text-orange">Today's surprise</p>
                <p className="font-display font-bold text-base">🍜 Ramen from Ichiban</p>
                <p className="font-mono text-xs text-cream/60">Delivered in 30 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div ref={detailsRef} className="flex flex-col gap-6 opacity-0">
          <p className="font-body text-gray leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="font-mono text-xs px-3 py-1.5 bg-ink text-cream rounded-full">
                {tech}
              </span>
            ))}
          </div>
          <span className="font-mono text-xs tracking-widest uppercase text-orange animate-pulse">
            ◉ {project.status}
          </span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
// app/page.tsx
import ColdOpen    from '@/components/scenes/ColdOpen'
import Stakes      from '@/components/scenes/Stakes'
import Engineer    from '@/components/scenes/Engineer'
import ProjectLog  from '@/components/scenes/ProjectLog'
import ProjectMeal from '@/components/scenes/ProjectMeal'
import Navbar      from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
      <Stakes />
      <Engineer />
      <ProjectLog />
      <ProjectMeal />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser — phone slides in, cards flip**

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add components/scenes/ProjectMeal.tsx app/page.tsx
git commit -m "feat: add Scene 5 Surprise Meal with phone mockup animation"
```

---

## Task 14: Scene 6 — NFT Display Monitor

**Files:**
- Create: `components/scenes/ProjectNFT.tsx`

- [ ] **Step 1: Create ProjectNFT scene**

```tsx
// components/scenes/ProjectNFT.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

const project = content.projects[2]

export default function ProjectNFT() {
  const sectionRef  = useRef<HTMLElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const qrRef       = useRef<SVGSVGElement>(null)
  const frameRef    = useRef<HTMLDivElement>(null)
  const detailsRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      tl.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })

      // QR paths draw
      const qrPaths = qrRef.current?.querySelectorAll('path') ?? []
      qrPaths.forEach((path) => {
        const len = path.getTotalLength?.() ?? 100
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      })
      tl.to(qrPaths, { strokeDashoffset: 0, stagger: 0.05, duration: 0.3 }, '-=0.2')

      // NFT frame glows in
      tl.fromTo(
        frameRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.3)' },
        '-=0.1'
      )

      // Orange glow pulse
      tl.to(frameRef.current, {
        boxShadow: '0 0 40px 12px rgba(255,69,0,0.35)',
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'sine.inOut',
      })

      tl.fromTo(detailsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center w-full h-screen bg-cream px-8"
    >
      <div ref={titleRef} className="w-full max-w-5xl mb-10 opacity-0">
        <span className="font-mono text-xs tracking-widest text-orange uppercase">Chapter {project.chapter}</span>
        <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] text-ink leading-none mt-1">
          {project.title}
        </h2>
        <p className="font-body text-gray mt-2">{project.tagline}</p>
      </div>

      <div className="grid grid-cols-2 gap-16 max-w-5xl w-full items-center">
        <div className="flex items-center gap-8">
          {/* QR Code SVG */}
          <svg ref={qrRef} viewBox="0 0 80 80" className="w-28 h-28 flex-shrink-0" fill="none">
            {/* Simplified QR pattern */}
            <path d="M5 5 H30 V30 H5 Z" stroke="var(--ink)" strokeWidth="3" fill="none" />
            <path d="M10 10 H25 V25 H10 Z" stroke="var(--orange)" strokeWidth="2" fill="none" />
            <path d="M50 5 H75 V30 H50 Z" stroke="var(--ink)" strokeWidth="3" fill="none" />
            <path d="M55 10 H70 V25 H55 Z" stroke="var(--orange)" strokeWidth="2" fill="none" />
            <path d="M5 50 H30 V75 H5 Z" stroke="var(--ink)" strokeWidth="3" fill="none" />
            <path d="M10 55 H25 V70 H10 Z" stroke="var(--orange)" strokeWidth="2" fill="none" />
            <path d="M40 5 V75" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M5 40 H75" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>

          {/* Arrow */}
          <span className="text-orange text-2xl">→</span>

          {/* NFT Display Frame */}
          <div
            ref={frameRef}
            className="w-32 h-40 border-4 border-ink rounded-xl bg-ink flex items-center justify-center opacity-0"
          >
            <div className="flex flex-col items-center gap-1 text-center p-2">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange to-yellow-400 opacity-90" />
              <p className="font-mono text-xs text-cream mt-1">NFT #4821</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div ref={detailsRef} className="flex flex-col gap-6 opacity-0">
          <p className="font-body text-gray leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="font-mono text-xs px-3 py-1.5 bg-ink text-cream rounded-full">
                {tech}
              </span>
            ))}
          </div>
          <span className="font-mono text-xs tracking-widest uppercase text-orange">● {project.status}</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
// app/page.tsx
import ColdOpen    from '@/components/scenes/ColdOpen'
import Stakes      from '@/components/scenes/Stakes'
import Engineer    from '@/components/scenes/Engineer'
import ProjectLog  from '@/components/scenes/ProjectLog'
import ProjectMeal from '@/components/scenes/ProjectMeal'
import ProjectNFT  from '@/components/scenes/ProjectNFT'
import Navbar      from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
      <Stakes />
      <Engineer />
      <ProjectLog />
      <ProjectMeal />
      <ProjectNFT />
    </main>
  )
}
```

- [ ] **Step 3: Verify glow pulse on NFT frame**

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add components/scenes/ProjectNFT.tsx app/page.tsx
git commit -m "feat: add Scene 6 NFT Display Monitor with QR draw and glow"
```

---

## Task 15: Scene 7 — Timeline Film Strip

**Files:**
- Create: `components/scenes/Timeline.tsx`

- [ ] **Step 1: Create Timeline scene**

```tsx
// components/scenes/Timeline.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const strip = stripRef.current
      if (!strip) return

      // Pin section and scroll the film strip horizontally
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth + 128),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${strip.scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="flex flex-col justify-center w-full h-screen bg-cream overflow-hidden"
    >
      {/* Section label */}
      <p className="font-mono text-xs tracking-widest uppercase text-orange px-16 mb-8">
        The Journey
      </p>

      {/* Horizontal film strip */}
      <div ref={stripRef} className="flex items-center gap-0 pl-16">
        {content.timeline.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 border-l-2 border-ink/10 pl-8 mr-16 group"
          >
            <span className="font-mono text-xs text-orange">{item.year}</span>
            <h3 className="font-display font-bold text-xl text-ink mt-1 leading-snug">
              {item.label}
            </h3>
            <p className="font-body text-sm text-gray mt-1">{item.sublabel}</p>
            <span
              className={`inline-block mt-3 font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border ${
                item.type === 'education'
                  ? 'border-orange text-orange'
                  : 'border-ink/30 text-gray'
              }`}
            >
              {item.type}
            </span>
          </div>
        ))}

        {/* End cap */}
        <div className="flex-shrink-0 w-32 flex items-center justify-center pl-8">
          <span className="font-mono text-xs text-gray">Present →</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
// app/page.tsx
import ColdOpen    from '@/components/scenes/ColdOpen'
import Stakes      from '@/components/scenes/Stakes'
import Engineer    from '@/components/scenes/Engineer'
import ProjectLog  from '@/components/scenes/ProjectLog'
import ProjectMeal from '@/components/scenes/ProjectMeal'
import ProjectNFT  from '@/components/scenes/ProjectNFT'
import Timeline    from '@/components/scenes/Timeline'
import Navbar      from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
      <Stakes />
      <Engineer />
      <ProjectLog />
      <ProjectMeal />
      <ProjectNFT />
      <Timeline />
    </main>
  )
}
```

- [ ] **Step 3: Verify horizontal scroll — timeline should scroll sideways as you scroll down**

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add components/scenes/Timeline.tsx app/page.tsx
git commit -m "feat: add Scene 7 horizontal timeline film strip"
```

---

## Task 16: Scene 8 — The Invitation

**Files:**
- Create: `components/scenes/Invitation.tsx`

- [ ] **Step 1: Create Invitation scene**

```tsx
// components/scenes/Invitation.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

export default function Invitation() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const linksRef    = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
      tl.fromTo(
        linksRef.current?.querySelectorAll('a, span') ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
      tl.fromTo(ctaRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex flex-col items-center justify-center w-full h-screen bg-cream px-8 text-center"
    >
      <h2
        ref={headlineRef}
        className="font-display font-bold text-[clamp(2rem,6vw,5rem)] text-ink max-w-3xl leading-tight opacity-0"
      >
        The next chapter needs a co-author.
      </h2>

      <div ref={linksRef} className="flex flex-col items-center gap-4 mt-12">
        <a
          href={`mailto:${content.contact.email}`}
          className="font-mono text-sm text-gray hover:text-orange transition-colors opacity-0"
        >
          {content.contact.email}
        </a>
        <div className="flex gap-8">
          <a
            href={content.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest uppercase text-gray hover:text-orange transition-colors opacity-0"
          >
            GitHub
          </a>
          <a
            href={content.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest uppercase text-gray hover:text-orange transition-colors opacity-0"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <a
        ref={ctaRef}
        href={`mailto:${content.contact.email}`}
        className="mt-10 px-8 py-4 bg-orange text-cream font-display font-bold text-lg rounded-full hover:scale-105 transition-transform duration-200 opacity-0"
        data-cursor-grow
      >
        Let's talk →
      </a>

      <p className="font-mono text-xs text-gray/40 mt-16 tracking-widest">
        {new Date().getFullYear()} · {content.hero.name}
      </p>
    </section>
  )
}
```

- [ ] **Step 2: Assemble final page.tsx**

```tsx
// app/page.tsx
import ColdOpen    from '@/components/scenes/ColdOpen'
import Stakes      from '@/components/scenes/Stakes'
import Engineer    from '@/components/scenes/Engineer'
import ProjectLog  from '@/components/scenes/ProjectLog'
import ProjectMeal from '@/components/scenes/ProjectMeal'
import ProjectNFT  from '@/components/scenes/ProjectNFT'
import Timeline    from '@/components/scenes/Timeline'
import Invitation  from '@/components/scenes/Invitation'
import Navbar      from '@/components/ui/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <ColdOpen />
      <Stakes />
      <Engineer />
      <ProjectLog />
      <ProjectMeal />
      <ProjectNFT />
      <Timeline />
      <Invitation />
    </main>
  )
}
```

- [ ] **Step 3: Do a full scroll-through in browser**

```bash
npm run dev
```

Scroll from top to bottom — all 8 scenes should play in sequence without layout jumps.

- [ ] **Step 4: Commit**

```bash
git add components/scenes/Invitation.tsx app/page.tsx
git commit -m "feat: add Scene 8 Invitation and complete full page assembly"
```

---

## Task 17: Responsive + Reduced Motion

**Files:**
- Modify: `app/globals.css`
- Create: `lib/useReducedMotion.ts`

- [ ] **Step 1: Create reduced motion hook**

```typescript
// lib/useReducedMotion.ts
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

- [ ] **Step 2: Disable scroll pinning on mobile in globals.css**

```css
/* Add at end of app/globals.css */

/* Mobile: disable cursor, simplify layout */
@media (max-width: 768px) {
  body { cursor: auto; }

  /* Stack two-column grids */
  .grid-cols-2 { grid-template-columns: 1fr !important; }
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Guard GSAP pinning in LenisProvider for mobile**

In `components/ui/LenisProvider.tsx`, add a mobile check:

```tsx
// Add after `registerGSAP()` in the useEffect:
const isMobile = window.innerWidth < 768
if (isMobile) return // skip Lenis + ScrollTrigger on mobile

// ... rest of Lenis setup
```

- [ ] **Step 4: Verify mobile layout at 375px**

In browser devtools, set viewport to 375px width. Scroll through — animations should be skipped, content should be readable in a single column.

- [ ] **Step 5: Commit**

```bash
git add lib/useReducedMotion.ts app/globals.css components/ui/LenisProvider.tsx
git commit -m "feat: add mobile fallback and prefers-reduced-motion support"
```

---

## Task 18: Deploy Config

**Files:**
- Create: `pm2.config.js`
- Create: `nginx.conf`

- [ ] **Step 1: Create PM2 config**

```javascript
// pm2.config.js
module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/path/to/portfolio-website', // update to actual path on VPS
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
}
```

- [ ] **Step 2: Create Nginx config template**

```nginx
# nginx.conf
# Place at /etc/nginx/sites-available/portfolio
# Then: ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- [ ] **Step 3: Add build + deploy instructions to README**

```bash
# On VPS, after cloning:
npm install
npm run build
pm2 start pm2.config.js
pm2 save
pm2 startup   # follow printed instructions to auto-start on reboot

# Nginx:
sudo cp nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo nginx -t && sudo systemctl reload nginx
```

- [ ] **Step 4: Commit**

```bash
git add pm2.config.js nginx.conf
git commit -m "feat: add PM2 and Nginx deploy config for VPS"
```

---

## Task 19: Final Build Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. No TypeScript errors. All routes show green.

- [ ] **Step 2: Run production server locally**

```bash
npm run start
```

Open `http://localhost:3000`. Do a full scroll-through:
- [ ] Scene 1: name fades, rule draws, title types, tagline appears
- [ ] Scene 2: statement, counters count up
- [ ] Scene 3: photo reveals, bio appears, tags pop in
- [ ] Scene 4: diagram draws, details appear
- [ ] Scene 5: phone slides, cards flip
- [ ] Scene 6: QR draws, NFT glows
- [ ] Scene 7: timeline scrolls horizontally
- [ ] Scene 8: invitation fades in, CTA bounces in
- [ ] Navbar: fades in after Scene 1, all links visible

- [ ] **Step 3: Fill in real content**

Update `content.ts` with:
- [ ] Real GitHub URL
- [ ] Real LinkedIn URL
- [ ] Real experience entries (roles, companies, dates)
- [ ] Real education institution names and years
- [ ] Short personal bio (2-3 sentences)
- [ ] Domain name in `pm2.config.js` and `nginx.conf`

- [ ] **Step 4: Add profile photo**

Copy your photo to `public/images/sid.jpg`. Recommended: square crop, min 800×800px.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete portfolio website — all 8 scenes, deploy config, real content"
```

---

## Checklist: Spec Coverage

| Spec requirement | Covered by |
|---|---|
| 8 cinematic scenes | Tasks 9–16 |
| Scroll = time / storyboard | GSAP ScrollTrigger pin in every scene |
| Cream/ink/orange palette | Task 2 (CSS vars) |
| Syne + Inter + JetBrains Mono | Task 5 (layout) |
| Custom orange cursor | Task 6 |
| Minimal fixed navbar | Task 7 |
| AnimatedText + Counter primitives | Task 8 |
| `content.ts` single source of truth | Task 3 |
| Lenis smooth scroll | Task 5 |
| Mobile simplified / reduced motion | Task 17 |
| SEO metadata + OG | Task 5 (layout metadata) |
| VPS + Nginx + PM2 deploy | Task 18 |
