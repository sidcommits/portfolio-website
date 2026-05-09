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

      const qrPaths = Array.from(qrRef.current?.querySelectorAll('path') ?? []) as SVGPathElement[]
      qrPaths.forEach((path) => {
        const len = path.getTotalLength?.() ?? 100
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      })
      tl.to(qrPaths, { strokeDashoffset: 0, stagger: 0.05, duration: 0.3 }, '-=0.2')

      tl.fromTo(
        frameRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.3)' },
        '-=0.1'
      )

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
          <svg ref={qrRef} viewBox="0 0 80 80" className="w-28 h-28 flex-shrink-0" fill="none">
            <path d="M5 5 H30 V30 H5 Z" stroke="var(--ink)" strokeWidth="3" fill="none" />
            <path d="M10 10 H25 V25 H10 Z" stroke="var(--orange)" strokeWidth="2" fill="none" />
            <path d="M50 5 H75 V30 H50 Z" stroke="var(--ink)" strokeWidth="3" fill="none" />
            <path d="M55 10 H70 V25 H55 Z" stroke="var(--orange)" strokeWidth="2" fill="none" />
            <path d="M5 50 H30 V75 H5 Z" stroke="var(--ink)" strokeWidth="3" fill="none" />
            <path d="M10 55 H25 V70 H10 Z" stroke="var(--orange)" strokeWidth="2" fill="none" />
            <path d="M40 5 V75" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M5 40 H75" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>

          <span className="text-orange text-2xl">→</span>

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

        <div ref={detailsRef} className="flex flex-col gap-6 opacity-0">
          <p className="font-body text-gray leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech: string) => (
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
