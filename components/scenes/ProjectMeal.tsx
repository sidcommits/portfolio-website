'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

const project = content.projects[1]

export default function ProjectMeal() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const phoneRef   = useRef<HTMLDivElement>(null)
  const card1Ref   = useRef<HTMLDivElement>(null)
  const card2Ref   = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

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
      tl.fromTo(phoneRef.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      tl.fromTo(card1Ref.current, { rotateY: 90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      tl.fromTo(card2Ref.current, { rotateY: 90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.1')
      tl.fromTo(detailsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center w-full h-screen px-8"
    >
      <div ref={titleRef} className="w-full max-w-5xl mb-10 opacity-0">
        <span className="font-mono text-xs tracking-widest text-orange uppercase">Chapter {project.chapter}</span>
        <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] text-ink leading-none mt-1">
          {project.title}
        </h2>
        <p className="font-body text-gray mt-2">{project.tagline}</p>
      </div>

      <div className="grid grid-cols-2 gap-16 max-w-5xl w-full items-center">
        <div ref={phoneRef} className="relative flex flex-col items-center gap-4 opacity-0" style={{ perspective: 800 }}>
          <div className="relative w-52 border-4 border-ink rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="h-4 bg-ink rounded-b-xl mx-auto w-20" />
            <div className="flex flex-col gap-3 p-4 min-h-[320px]">
              <div ref={card1Ref} className="bg-orange rounded-xl p-3 text-cream opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                <p className="font-mono text-xs uppercase tracking-wide">Balance</p>
                <p className="font-display font-bold text-2xl">₹1,000</p>
              </div>
              <div ref={card2Ref} className="bg-ink rounded-xl p-3 text-cream opacity-0 flex flex-col gap-1" style={{ transformStyle: 'preserve-3d' }}>
                <p className="font-mono text-xs uppercase tracking-wide text-orange">Today&apos;s surprise</p>
                <p className="font-display font-bold text-base">🍜 Ramen from Ichiban</p>
                <p className="font-mono text-xs text-cream/60">Delivered in 30 min</p>
              </div>
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
          <span className="font-mono text-xs tracking-widest uppercase text-orange animate-pulse">
            ◉ {project.status}
          </span>
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
