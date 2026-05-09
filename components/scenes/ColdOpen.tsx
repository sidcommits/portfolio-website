'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'
import FloatingElements from '@/components/ui/FloatingElements'

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
          anticipatePin: 1,
        },
      })

      tl.fromTo(nameRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })

      if (ruleRef.current) {
        const len = (ruleRef.current as unknown as SVGGeometryElement).getTotalLength?.() ?? 400
        gsap.set(ruleRef.current, { strokeDasharray: len, strokeDashoffset: len })
        tl.to(ruleRef.current, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.3')
      }

      const titleEl = titleRef.current
      if (titleEl) {
        titleEl.innerHTML = content.hero.title
          .split('')
          .map((ch) => `<span style="opacity:0;display:inline-block">${ch === ' ' ? '&nbsp;' : ch}</span>`)
          .join('')
        tl.to(titleEl.querySelectorAll('span'), { opacity: 1, stagger: 0.04, duration: 0.01 }, '-=0.1')
      }

      tl.fromTo(taglineRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.2')
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
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("/images/grain.png")', backgroundRepeat: 'repeat' }}
      />
      <FloatingElements count={22} />

      <div className="flex flex-col items-center gap-6 text-center px-6">
        <h1
          ref={nameRef}
          className="font-display font-bold text-[clamp(2.5rem,8vw,7rem)] tracking-tight text-ink opacity-0"
        >
          {content.hero.name}
        </h1>

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

      <span
        ref={scrollRef}
        className="absolute bottom-10 font-mono text-xs tracking-widest text-gray opacity-0"
      >
        SCROLL ↓
      </span>
    </section>
  )
}
