'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

const project = content.projects[2]

function ECGIllustration() {
  const pathRef1 = useRef<SVGPathElement>(null)
  const pathRef2 = useRef<SVGPathElement>(null)

  useEffect(() => {
    const animate = (el: SVGPathElement | null, delay: number) => {
      if (!el) return
      const len = el.getTotalLength?.() ?? 300
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power2.inOut',
        delay,
        repeat: -1,
        repeatDelay: 0.8,
      })
    }
    animate(pathRef1.current, 0)
    animate(pathRef2.current, 1.1)
  }, [])

  return (
    <div className="relative w-full flex flex-col items-center gap-3">
      {/* Badge */}
      <div className="flex items-center gap-2 self-end pr-2">
        <div className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
        <span className="font-mono text-[8px] text-orange tracking-widest uppercase">FeatCNN-TransCNN · 99.9%+ acc.</span>
      </div>

      {/* ECG canvas */}
      <svg viewBox="0 0 220 90" className="w-full max-w-sm" fill="none">
        {/* Grid */}
        {[22, 44, 66].map(y => (
          <line key={y} x1="0" y1={y} x2="220" y2={y} stroke="var(--orange)" strokeWidth="0.3" opacity="0.2" />
        ))}
        {[44, 88, 132, 176].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="90" stroke="var(--orange)" strokeWidth="0.3" opacity="0.2" />
        ))}

        {/* Channel 1 label */}
        <text x="4" y="10" fill="var(--ink)" fontSize="5" fontFamily="monospace" opacity="0.35">Lead II</text>

        {/* ECG beat 1 — normal sinus */}
        <path
          ref={pathRef1}
          d="M0,44 L22,44 C25,44 26,40 28,40 C30,40 31,44 34,44 L38,44 L39,48 L41,10 L43,54 L46,44 L54,44 C57,44 59,38 63,37 C67,36 69,42 73,44 L110,44"
          stroke="var(--orange)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ECG beat 2 — second beat */}
        <path
          ref={pathRef2}
          d="M110,44 L132,44 C135,44 136,40 138,40 C140,40 141,44 144,44 L148,44 L149,48 L151,10 L153,54 L156,44 L164,44 C167,44 169,38 173,37 C177,36 179,42 183,44 L220,44"
          stroke="var(--orange)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* R-peak dots */}
        <circle cx="41" cy="10" r="2.5" fill="var(--orange)" opacity="0.8" />
        <circle cx="151" cy="10" r="2.5" fill="var(--orange)" opacity="0.5" />

        {/* Labels */}
        <text x="4" y="84" fill="var(--orange)" fontSize="5" fontFamily="monospace" opacity="0.6">Normal Sinus Rhythm</text>
        <text x="128" y="84" fill="var(--ink)" fontSize="5" fontFamily="monospace" opacity="0.35">→ Classified</text>
      </svg>

      {/* Tech pills */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {['CWT Preprocessing', 'CNN-Transformer', 'Siamese FeatCNN-Trans'].map((label) => (
          <span key={label} className="font-mono text-[9px] text-gray/60 tracking-wider uppercase border border-ink/10 px-2 py-0.5 rounded-full">
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ProjectECG() {
  const sectionRef  = useRef<HTMLElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const vizRef      = useRef<HTMLDivElement>(null)
  const detailsRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
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
        tl.fromTo(vizRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
        tl.fromTo(detailsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3')
      }, sectionRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(titleRef.current, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.5,
          scrollTrigger: { trigger: titleRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
        gsap.fromTo(vizRef.current, { opacity: 0, scale: 0.92 }, {
          opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: vizRef.current, start: 'top 92%', toggleActions: 'play none none none' },
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
      className="flex flex-col items-center justify-center w-full min-h-screen md:h-screen px-6 md:px-8 py-20 md:py-0"
    >
      <div ref={titleRef} className="w-full max-w-5xl mb-10 opacity-0">
        <span className="font-mono text-xs tracking-widest text-orange uppercase">Chapter {project.chapter}</span>
        <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] text-ink leading-none mt-1">
          {project.title}
        </h2>
        <p className="font-body text-gray mt-2">{project.tagline}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl w-full items-center">
        <div ref={vizRef} className="opacity-0">
          <ECGIllustration />
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
          <div className="flex gap-3 pt-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs px-3 py-1.5 border border-ink/20 rounded-full text-ink hover:border-orange hover:text-orange transition-colors duration-200">
                GitHub →
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs px-3 py-1.5 bg-orange text-cream rounded-full hover:opacity-80 transition-opacity duration-200">
                arXiv →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
