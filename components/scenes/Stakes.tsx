'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'
import Counter from '@/components/ui/Counter'

export default function Stakes() {
  const sectionRef   = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLParagraphElement>(null)
  const statsRef     = useRef<HTMLDivElement>(null)
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
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
        tl.fromTo(statementRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' })
        tl.fromTo(statsRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      }, sectionRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(statementRef.current, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: statementRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
        gsap.fromTo(statsRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.15,
          scrollTrigger: { trigger: statsRef.current, start: 'top 92%', toggleActions: 'play none none none', onEnter: () => setCounting(true) },
        })
      }, sectionRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="stakes"
      className="flex flex-col items-center justify-center w-full min-h-screen md:h-screen px-6 py-20 md:py-0"
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

      <div ref={statsRef} className="flex flex-wrap justify-center gap-10 md:gap-16 mt-10 md:mt-16 opacity-0">
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
