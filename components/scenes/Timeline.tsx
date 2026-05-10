// components/scenes/Timeline.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const strip = stripRef.current
        if (!strip) return
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
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="flex flex-col justify-center w-full min-h-screen md:h-screen overflow-hidden py-16 md:py-0"
    >
      <p className="font-mono text-xs tracking-widest uppercase text-orange px-6 md:px-16 mb-6 md:mb-8">
        The Journey
      </p>

      {/* Mobile: vertical list */}
      <div className="md:hidden flex flex-col gap-8 px-6">
        {content.timeline.map((item, i) => (
          <div key={i} className="border-l-2 border-orange/30 pl-5">
            <span className="font-mono text-xs text-orange">{item.year}</span>
            <h3 className="font-display font-bold text-lg text-ink mt-1 leading-snug">{item.label}</h3>
            <p className="font-body text-sm text-gray mt-1">{item.sublabel}</p>
            <span className={`inline-block mt-2 font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border ${item.type === 'education' ? 'border-orange text-orange' : 'border-ink/30 text-gray'}`}>{item.type}</span>
          </div>
        ))}
      </div>

      {/* Desktop: horizontal scroll strip */}
      <div ref={stripRef} className="hidden md:flex items-center gap-0 pl-16">
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

        <div className="flex-shrink-0 w-32 flex items-center justify-center pl-8">
          <span className="font-mono text-xs text-gray">Present →</span>
        </div>
      </div>
    </section>

  )
}
