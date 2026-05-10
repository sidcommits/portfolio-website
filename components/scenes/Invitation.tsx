'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'
import Image from 'next/image'

const CONTACT_LINKS = [
  {
    label: 'LinkedIn',
    sub: 'in/sideshpande',
    href: 'https://linkedin.com/in/sideshpande',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    sub: 'sidcommits',
    href: 'https://github.com/sidcommits',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    sub: 'siddhantdeshpande07@gmail.com',
    href: `mailto:${content.contact.email}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m2 7 10 7 10-7"/>
      </svg>
    ),
  },
]

export default function Invitation() {
  const sectionRef  = useRef<HTMLElement>(null)
  const profileRef  = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)
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

      tl.fromTo(profileRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      tl.fromTo(
        cardsRef.current?.querySelectorAll('[data-contact-card]') ?? [],
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
        '-=0.2'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex flex-col items-center justify-center w-full min-h-screen md:h-screen px-6 md:px-8 py-20 md:py-0"
    >
      {/* Profile card */}
      <div ref={profileRef} className="flex flex-col items-center gap-4 mb-12 opacity-0">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full border-2 border-orange/30 overflow-hidden relative">
          <Image
            src={content.about.photo}
            alt={content.hero.name}
            fill
            unoptimized
            className="object-cover"
            style={{ objectPosition: '50% 32%' }}
          />
        </div>
        {/* Name + role */}
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl text-ink">{content.hero.name}</h2>
          <p className="font-mono text-xs tracking-widest uppercase text-gray mt-1">
            Backend · DevOps · AI · Dresden, Germany
          </p>
        </div>
      </div>

      {/* Contact tiles */}
      <div ref={cardsRef} className="flex flex-wrap justify-center gap-4 mb-10">
        {CONTACT_LINKS.map(({ label, sub, href, icon }) => (
          <a
            key={label}
            data-contact-card=""
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="opacity-0 flex flex-col items-center gap-3 w-40 md:w-48 px-4 md:px-6 py-5 border border-ink/12 rounded-2xl hover:border-orange/50 hover:bg-orange/[0.03] transition-all duration-200 group"
            data-cursor-grow=""
          >
            <span className="text-gray group-hover:text-orange transition-colors duration-200">
              {icon}
            </span>
            <div className="text-center">
              <p className="font-display font-bold text-sm text-ink">{label}</p>
              <p className="font-mono text-[10px] text-gray mt-0.5 break-all">{sub}</p>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        ref={ctaRef}
        href={`mailto:${content.contact.email}`}
        className="opacity-0 px-8 py-4 bg-orange text-cream font-display font-bold text-lg rounded-full hover:scale-105 transition-transform duration-200"
        data-cursor-grow=""
      >
        Let&apos;s talk →
      </a>

      <p className="font-mono text-xs text-gray/30 mt-12 tracking-widest">
        {new Date().getFullYear()} · {content.hero.name}
      </p>
    </section>
  )
}
