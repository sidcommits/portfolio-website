'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

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

      // Headline appears
      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )

      // Cards stagger in one by one
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
      <div ref={headlineRef} className="w-full max-w-5xl mb-12 opacity-0">
        <p className="font-mono text-xs tracking-widest uppercase text-orange mb-2">The Journey</p>
        <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,4rem)] text-ink leading-none">
          From Pune to Dresden.<br />
          <span className="text-gray font-display font-bold">From SAP to satellites.</span>
        </h2>
      </div>

      {/* Experience cards */}
      <div ref={cardsRef} className="grid grid-cols-2 gap-4 w-full max-w-5xl">
        {content.experience.map((item, i) => (
          <div
            key={i}
            data-card=""
            className="opacity-0 group relative border border-ink/10 rounded-2xl p-6 hover:border-orange/40 transition-colors duration-300"
          >
            {/* Impact number */}
            <div className="flex items-end gap-1 mb-4">
              <span className="font-display font-bold text-[clamp(2.5rem,5vw,4rem)] text-ink leading-none">
                {item.impact}
                <span className="text-orange">%</span>
              </span>
            </div>

            {/* Impact label */}
            <p className="font-mono text-xs tracking-widest uppercase text-orange mb-3">
              {item.impactLabel}
            </p>

            {/* Headline */}
            <p className="font-body text-sm text-gray leading-relaxed mb-5">
              {item.headline}
            </p>

            {/* Company + role + period */}
            <div className="flex items-center justify-between pt-4 border-t border-ink/8">
              <div>
                <p className="font-display font-bold text-sm text-ink">{item.company}</p>
                <p className="font-mono text-[10px] text-gray tracking-wide">{item.role}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[10px] text-gray">{item.period}</p>
                <p className="font-mono text-[10px] text-gray/60">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
