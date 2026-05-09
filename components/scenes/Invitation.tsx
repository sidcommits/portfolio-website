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
        data-cursor-grow=""
      >
        Let&apos;s talk →
      </a>

      <p className="font-mono text-xs text-gray/40 mt-16 tracking-widest">
        {new Date().getFullYear()} · {content.hero.name}
      </p>
    </section>
  )
}
