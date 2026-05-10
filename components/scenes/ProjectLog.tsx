'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

const project = content.projects[0]

const EXAMPLE_QUERIES = [
  'Why did the payment service crash at 3am?',
  'Show me all errors from last deployment',
  'Which requests are taking over 2 seconds?',
]

const EXAMPLE_RESULT = {
  answer: 'Found 3 matching events. At 03:14 UTC, payment-service logged a connection timeout to postgres-primary. This triggered a cascade — 847 requests failed over 4 minutes before auto-recovery.',
  logs: [
    '03:14:02 ERROR connection timeout: postgres-primary',
    '03:14:03 WARN retry attempt 1/3 failed',
    '03:14:07 ERROR circuit breaker opened',
  ],
}

export default function ProjectLog() {
  const sectionRef   = useRef<HTMLElement>(null)
  const titleRef     = useRef<HTMLDivElement>(null)
  const searchBoxRef = useRef<HTMLDivElement>(null)
  const queryRef     = useRef<HTMLSpanElement>(null)
  const resultRef    = useRef<HTMLDivElement>(null)
  const logsRef      = useRef<HTMLDivElement>(null)
  const detailsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
        tl.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        tl.fromTo(searchBoxRef.current, { y: 30, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
        const queryEl = queryRef.current
        if (queryEl) {
          queryEl.textContent = ''
          const chars = EXAMPLE_QUERIES[0].split('')
          tl.to({}, { duration: 0.6, onUpdate: function() { const count = Math.floor(this.progress() * chars.length); if (queryEl) queryEl.textContent = chars.slice(0, count).join('') } }, '-=0.05')
        }
        tl.fromTo(resultRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
        tl.fromTo(logsRef.current?.querySelectorAll('[data-log]') ?? [], { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.25 }, '-=0.2')
        tl.fromTo(detailsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, '-=0.1')
      }, sectionRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        const queryEl = queryRef.current
        if (queryEl) queryEl.textContent = EXAMPLE_QUERIES[0]
        gsap.set(logsRef.current?.querySelectorAll('[data-log]') ?? [], { opacity: 1, x: 0 })
        gsap.fromTo(titleRef.current, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.5,
          scrollTrigger: { trigger: titleRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
        gsap.fromTo(searchBoxRef.current, { opacity: 0, y: 20, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', delay: 0.1,
          scrollTrigger: { trigger: searchBoxRef.current, start: 'top 92%', toggleActions: 'play none none none' },
        })
        gsap.fromTo(resultRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5, delay: 0.1,
          scrollTrigger: { trigger: resultRef.current, start: 'top 92%', toggleActions: 'play none none none' },
        })
        gsap.fromTo(detailsRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5,
          scrollTrigger: { trigger: detailsRef.current, start: 'top 92%', toggleActions: 'play none none none' },
        })
      }, sectionRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="flex flex-col items-center justify-center w-full min-h-screen md:h-screen px-6 md:px-8 py-20 md:py-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl w-full items-start">

        {/* Left — search interface mockup */}
        <div className="flex flex-col gap-4">
          <div ref={titleRef} className="opacity-0 mb-2">
            <span className="font-mono text-xs tracking-widest text-orange uppercase">Chapter {project.chapter}</span>
            <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,3rem)] text-ink leading-tight mt-1">
              {project.title}
            </h2>
            <p className="font-body text-gray text-sm mt-1">{project.tagline}</p>
          </div>

          {/* Search box */}
          <div ref={searchBoxRef} className="opacity-0 border-2 border-ink/15 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-ink/10 bg-ink/[0.02]">
              <div className="w-2 h-2 rounded-full bg-orange/60" />
              <span className="font-mono text-[10px] text-gray tracking-widest uppercase">Log Intelligence</span>
            </div>
            <div className="px-4 py-3 flex items-center gap-3">
              <span className="font-mono text-orange text-sm">›</span>
              <span ref={queryRef} className="font-mono text-sm text-ink flex-1 min-h-[1.2em]" />
              <span className="w-0.5 h-4 bg-orange animate-pulse rounded-full" />
            </div>
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {EXAMPLE_QUERIES.slice(1).map((q, i) => (
                <span key={i} className="font-mono text-[10px] px-2 py-1 bg-ink/5 rounded-full text-gray">{q}</span>
              ))}
            </div>
          </div>

          {/* Result */}
          <div ref={resultRef} className="opacity-0 border border-orange/25 rounded-2xl p-4 bg-orange/[0.03]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-orange" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-orange">Answer</span>
            </div>
            <p className="font-body text-sm text-ink leading-relaxed mb-3">{EXAMPLE_RESULT.answer}</p>
            <div ref={logsRef} className="flex flex-col gap-1 border-t border-orange/15 pt-3">
              {EXAMPLE_RESULT.logs.map((log, i) => (
                <span key={i} data-log="" className="font-mono text-[10px] text-gray/70 opacity-0">{log}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — description + stack */}
        <div ref={detailsRef} className="opacity-0 flex flex-col gap-6 pt-16">
          <p className="font-body text-gray leading-relaxed">{project.description}</p>
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray mb-3">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="font-mono text-xs px-3 py-1.5 bg-ink text-cream rounded-full">{tech}</span>
              ))}
            </div>
          </div>
          <span className="font-mono text-xs tracking-widest uppercase text-orange">● {project.status}</span>

          {/* Links */}
          <div className="flex gap-3 pt-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs px-3 py-1.5 border border-ink/20 rounded-full text-ink hover:border-orange hover:text-orange transition-colors duration-200">
                GitHub →
              </a>
            )}
            {project.website && (
              <a href={project.website} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs px-3 py-1.5 bg-orange text-cream rounded-full hover:opacity-80 transition-opacity duration-200">
                Live →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
