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

      tl.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })

      const paths = diagramRef.current?.querySelectorAll('[data-animate]') ?? []
      paths.forEach((path) => {
        const len = (path as SVGPathElement).getTotalLength?.() ?? 200
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      })
      tl.to(paths, { strokeDashoffset: 0, stagger: 0.3, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')

      tl.fromTo(
        diagramRef.current?.querySelectorAll('[data-label]') ?? [],
        { opacity: 0 },
        { opacity: 1, stagger: 0.2, duration: 0.3 },
        '-=0.5'
      )

      tl.fromTo(detailsRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const DA = 'data-animate' as any
  const DL = 'data-label' as any

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="flex flex-col items-center justify-center w-full h-screen bg-cream px-8"
    >
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
        <svg
          ref={diagramRef}
          viewBox="0 0 400 200"
          className="w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="80" width="80" height="40" rx="6" fill="var(--ink)" />
          <text {...{[DL]: ''}} x="50" y="105" textAnchor="middle" fill="var(--cream)" fontSize="10" fontFamily="monospace" opacity="0">Loki Logs</text>

          <path {...{[DA]: ''}} d="M90 100 L150 100" stroke="var(--orange)" strokeWidth="2" />

          <rect x="150" y="70" width="100" height="60" rx="6" fill="var(--ink)" />
          <text {...{[DL]: ''}} x="200" y="102" textAnchor="middle" fill="var(--cream)" fontSize="10" fontFamily="monospace" opacity="0">Vector DB</text>
          <text {...{[DL]: ''}} x="200" y="116" textAnchor="middle" fill="var(--orange)" fontSize="8" fontFamily="monospace" opacity="0">embeddings</text>

          <path {...{[DA]: ''}} d="M250 100 L310 100" stroke="var(--orange)" strokeWidth="2" />

          <rect x="310" y="80" width="80" height="40" rx="6" fill="var(--orange)" />
          <text {...{[DL]: ''}} x="350" y="105" textAnchor="middle" fill="var(--cream)" fontSize="10" fontFamily="monospace" opacity="0">Natural Language</text>
        </svg>

        <div ref={detailsRef} className="flex flex-col gap-6 opacity-0">
          <p className="font-body text-gray leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech: string) => (
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
