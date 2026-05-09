'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { registerGSAP } from '@/lib/gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    const dot = dotRef.current
    if (!dot) return

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const onEnter = () => gsap.to(dot, { scale: 3.5, duration: 0.2 })
    const onLeave = () => gsap.to(dot, { scale: 1, duration: 0.2 })

    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll('a, button, [data-cursor-grow]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-multiply"
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: 'var(--orange)',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
