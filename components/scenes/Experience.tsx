'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

/* ── Company illustrations ─────────────────────────────────────── */

function SatelliteIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full h-20">
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }
        @keyframes earthPulse {
          0%, 100% { opacity: 0.85; }
          50%       { opacity: 1; }
        }
        @keyframes signalPing {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
      <svg viewBox="0 0 100 80" className="w-28 h-20" fill="none">
        {/* Signal rings */}
        <circle cx="50" cy="40" r="22" stroke="var(--orange)" strokeWidth="0.5" opacity="0.2"
          style={{ animation: 'signalPing 2s ease-out infinite' }} />
        <circle cx="50" cy="40" r="22" stroke="var(--orange)" strokeWidth="0.5" opacity="0.2"
          style={{ animation: 'signalPing 2s ease-out 0.7s infinite' }} />
        {/* Earth */}
        <circle cx="50" cy="40" r="14" fill="#1a3a5c"
          style={{ animation: 'earthPulse 3s ease-in-out infinite' }} />
        <circle cx="50" cy="40" r="14" fill="none" stroke="#2a5c8c" strokeWidth="1.5" />
        {/* Continent blobs */}
        <ellipse cx="46" cy="36" rx="4" ry="3" fill="#2d6a4f" opacity="0.8" />
        <ellipse cx="55" cy="42" rx="3" ry="4" fill="#2d6a4f" opacity="0.7" />
        {/* Orbiting satellite */}
        <g style={{ transformOrigin: '50px 40px', animation: 'orbit 3s linear infinite' }}>
          {/* Satellite body */}
          <rect x="47" y="8" width="6" height="4" rx="1" fill="var(--ink)" />
          {/* Solar panels */}
          <rect x="38" y="9" width="8" height="2" rx="0.5" fill="var(--orange)" opacity="0.9" />
          <rect x="54" y="9" width="8" height="2" rx="0.5" fill="var(--orange)" opacity="0.9" />
          {/* Signal beam */}
          <line x1="50" y1="12" x2="50" y2="26" stroke="var(--orange)" strokeWidth="0.5"
            strokeDasharray="2 2" opacity="0.6" />
        </g>
      </svg>
    </div>
  )
}

function ResearchIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full h-20">
      <style>{`
        @keyframes traceLine {
          from { stroke-dashoffset: 120; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes blipDot {
          0%, 100% { r: 2; opacity: 1; }
          50%       { r: 4; opacity: 0.5; }
        }
      `}</style>
      <svg viewBox="0 0 110 80" className="w-32 h-20" fill="none">
        {/* Grid lines */}
        {[20, 35, 50, 65].map(y => (
          <line key={y} x1="10" y1={y} x2="100" y2={y} stroke="var(--ink)" strokeWidth="0.3" opacity="0.15" />
        ))}
        {[25, 45, 65, 85].map(x => (
          <line key={x} x1={x} y1="15" x2={x} y2="70" stroke="var(--ink)" strokeWidth="0.3" opacity="0.15" />
        ))}
        {/* Axes */}
        <line x1="10" y1="65" x2="100" y2="65" stroke="var(--ink)" strokeWidth="1" opacity="0.3" />
        <line x1="10" y1="15" x2="10"  y2="65" stroke="var(--ink)" strokeWidth="1" opacity="0.3" />
        {/* Anomaly detection line (normal) */}
        <polyline
          points="10,55 25,52 40,54 55,50 70,53 85,51 100,52"
          stroke="var(--ink)" strokeWidth="1.5" opacity="0.3" strokeLinecap="round"
        />
        {/* ML model line */}
        <polyline
          points="10,55 25,48 40,44 55,38 70,32 85,28 100,25"
          stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="120" style={{ animation: 'traceLine 2.5s ease-out infinite' }}
        />
        {/* Blip dots */}
        <circle cx="55" cy="38" r="3" fill="var(--orange)"
          style={{ animation: 'blipDot 1.5s ease-in-out infinite' }} />
        <circle cx="85" cy="28" r="2.5" fill="var(--orange)" opacity="0.7"
          style={{ animation: 'blipDot 1.5s ease-in-out 0.5s infinite' }} />
        {/* Label */}
        <text x="12" y="28" fill="var(--orange)" fontSize="6" fontFamily="monospace" opacity="0.7">
          ML model
        </text>
      </svg>
    </div>
  )
}

function EnterpriseIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full h-20">
      <style>{`
        @keyframes flowDot {
          0%   { offset-distance: 0%; opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes nodeGlow {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
      <svg viewBox="0 0 120 70" className="w-36 h-20" fill="none">
        {/* Nodes */}
        {[
          { cx: 15, cy: 35, label: 'PO' },
          { cx: 50, cy: 20, label: 'ERP' },
          { cx: 50, cy: 50, label: 'INV' },
          { cx: 90, cy: 35, label: 'GO' },
        ].map((n, i) => (
          <g key={i} style={{ animation: `nodeGlow 2s ease-in-out ${i * 0.5}s infinite` }}>
            <circle cx={n.cx} cy={n.cy} r="10" fill="var(--ink)" opacity="0.85" />
            <text x={n.cx} y={n.cy + 3} textAnchor="middle" fill="var(--cream)"
              fontSize="5.5" fontFamily="monospace">{n.label}</text>
          </g>
        ))}
        {/* Connections */}
        <line x1="25" y1="30" x2="40" y2="22" stroke="var(--orange)" strokeWidth="1" opacity="0.4" />
        <line x1="25" y1="40" x2="40" y2="48" stroke="var(--orange)" strokeWidth="1" opacity="0.4" />
        <line x1="60" y1="22" x2="80" y2="32" stroke="var(--orange)" strokeWidth="1" opacity="0.4" />
        <line x1="60" y1="48" x2="80" y2="38" stroke="var(--orange)" strokeWidth="1" opacity="0.4" />
        {/* Animated flow dots */}
        {[[25, 30, 40, 22], [25, 40, 40, 48], [60, 22, 80, 32], [60, 48, 80, 38]].map(([x1, y1, x2, y2], i) => (
          <circle key={i} r="2.5" fill="var(--orange)"
            style={{ animation: `flowDot 1.8s ease-in-out ${i * 0.45}s infinite` }}>
            <animateMotion dur="1.8s" begin={`${i * 0.45}s`} repeatCount="indefinite"
              path={`M${x1},${y1} L${x2},${y2}`} />
          </circle>
        ))}
        {/* ABAP label */}
        <text x="60" y="66" textAnchor="middle" fill="var(--ink)" fontSize="5.5"
          fontFamily="monospace" opacity="0.4">S/4HANA · ABAP · OData</text>
      </svg>
    </div>
  )
}

function ChatIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full h-20">
      <style>{`
        @keyframes bubbleIn {
          0%   { opacity: 0; transform: scale(0.7) translateY(4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; }
          30%            { opacity: 1; }
        }
      `}</style>
      <svg viewBox="0 0 110 75" className="w-32 h-20" fill="none">
        {/* Phone frame */}
        <rect x="30" y="5" width="50" height="65" rx="8" fill="var(--ink)" fillOpacity="0.08" stroke="var(--ink)" strokeOpacity="0.2" strokeWidth="1" />
        <rect x="45" y="8" width="20" height="3" rx="1.5" fill="var(--ink)" opacity="0.2" />
        {/* Chat bubbles — left */}
        <rect x="34" y="16" width="28" height="10" rx="5" fill="var(--ink)" opacity="0.15"
          style={{ animation: 'bubbleIn 0.4s ease-out 0s both' }} />
        <rect x="34" y="30" width="20" height="10" rx="5" fill="var(--ink)" opacity="0.15"
          style={{ animation: 'bubbleIn 0.4s ease-out 0.6s both' }} />
        {/* Chat bubbles — right (orange) */}
        <rect x="48" y="44" width="28" height="10" rx="5" fill="var(--orange)" opacity="0.25"
          style={{ animation: 'bubbleIn 0.4s ease-out 1.2s both' }} />
        {/* Typing indicator */}
        <g style={{ animation: 'bubbleIn 0.4s ease-out 1.8s both' }}>
          <rect x="34" y="58" width="22" height="9" rx="4.5" fill="var(--ink)" opacity="0.12" />
          {[40, 45, 50].map((x, i) => (
            <circle key={i} cx={x} cy="62.5" r="1.5" fill="var(--ink)" opacity="0.4"
              style={{ animation: `typing 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </g>
        {/* WebSocket label */}
        <text x="55" y="75" textAnchor="middle" fill="var(--ink)" fontSize="5"
          fontFamily="monospace" opacity="0.35">WebSockets · PWA</text>
      </svg>
    </div>
  )
}

/* ── Scene ─────────────────────────────────────────────────────── */

const ILLUSTRATIONS = [
  SatelliteIllustration,
  ResearchIllustration,
  EnterpriseIllustration,
  ChatIllustration,
]

export default function Experience() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('[data-card]') ?? []

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )

      cards.forEach((card, i) => {
        tl.fromTo(card,
          { opacity: 0, x: 60, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'power2.out' },
          i === 0 ? '-=0.1' : '-=0.15'
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="flex flex-col items-center justify-center w-full h-screen px-8 py-16"
    >
      {/* Headline */}
      <div ref={headlineRef} className="w-full max-w-5xl mb-10 opacity-0">
        <p className="font-mono text-xs tracking-widest uppercase text-orange mb-2">Experience</p>
        <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.8rem)] text-ink leading-none">
          3+ years across startups,{' '}
          <span className="text-gray">research labs, and enterprise.</span>
        </h2>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="grid grid-cols-2 gap-5 w-full max-w-5xl">
        {content.experience.map((item, i) => {
          const Illustration = ILLUSTRATIONS[i]
          return (
            <div
              key={i}
              data-card=""
              className="opacity-0 flex flex-col border border-ink/10 rounded-2xl p-5 hover:border-orange/30 transition-colors duration-300 group"
            >
              {/* Illustration */}
              <div className="mb-4">
                <Illustration />
              </div>

              {/* Company */}
              <p className="font-display font-bold text-base text-ink leading-tight group-hover:text-orange transition-colors duration-200">
                {item.company}
              </p>

              {/* Role */}
              <p className="font-mono text-[10px] text-gray mt-1 leading-relaxed">
                {item.role}
              </p>

              {/* Period + location */}
              <div className="mt-auto pt-4 border-t border-ink/8 flex flex-col gap-0.5">
                <p className="font-mono text-[9px] text-gray/70">{item.period}</p>
                <p className="font-mono text-[9px] text-gray/50">{item.location}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
