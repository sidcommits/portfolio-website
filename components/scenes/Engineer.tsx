'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'
import Image from 'next/image'

export default function Engineer() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef   = useRef<HTMLDivElement>(null)
  const bioRef     = useRef<HTMLDivElement>(null)
  const tagsRef    = useRef<HTMLDivElement>(null)

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
        tl.fromTo(photoRef.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut' })
        tl.fromTo(bioRef.current?.querySelectorAll('p') ?? [], { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        tl.fromTo(tagsRef.current?.querySelectorAll('span') ?? [], { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, stagger: 0.08, duration: 0.3, ease: 'back.out(1.7)' }, '-=0.2')
      }, sectionRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        if (photoRef.current) gsap.set(photoRef.current, { clipPath: 'inset(0 0% 0 0)' })
        gsap.fromTo(bioRef.current?.querySelectorAll('p') ?? [], { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: bioRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
        gsap.fromTo(tagsRef.current?.querySelectorAll('span') ?? [], { opacity: 0, scale: 0.8 }, {
          opacity: 1, scale: 1, stagger: 0.05, duration: 0.3, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: tagsRef.current, start: 'top 92%', toggleActions: 'play none none none' },
        })
      }, sectionRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="engineer"
      className="flex items-center justify-center w-full min-h-screen md:h-screen px-6 md:px-8 py-20 md:py-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 max-w-5xl w-full items-center">
        <div
          ref={photoRef}
          className="relative w-full h-80 md:h-auto md:aspect-[3/4] rounded-2xl overflow-hidden bg-ink/10"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <Image
            src={content.about.photo}
            alt={content.hero.name}
            fill
            unoptimized
            className="object-cover"
            style={{ objectPosition: '50% 32%' }}
            priority
          />
        </div>

        <div className="flex flex-col gap-8">
          <div ref={bioRef} className="flex flex-col gap-4">
            <p className="font-mono text-xs tracking-widest uppercase text-orange opacity-0">
              The Engineer
            </p>
            <p className="font-display font-bold text-3xl text-ink leading-snug opacity-0">
              {content.hero.name}
            </p>
            <p className="font-body text-base text-gray leading-relaxed opacity-0">
              {content.about.bio}
            </p>
          </div>

          <div ref={tagsRef} className="flex flex-wrap gap-2">
            {content.about.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1.5 border border-ink/20 rounded-full text-ink opacity-0"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
