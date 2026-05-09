'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  variant?: 'typewriter' | 'fadeup'
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  variant = 'fadeup',
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (variant === 'typewriter') {
      el.innerHTML = text
        .split('')
        .map((ch) => `<span style="opacity:0">${ch === ' ' ? '&nbsp;' : ch}</span>`)
        .join('')

      gsap.to(el.querySelectorAll('span'), {
        opacity: 1,
        duration: 0.05,
        stagger: 0.04,
        delay,
        ease: 'none',
      })
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' }
      )
    }
  }, [text, delay, variant])

  return (
    <span ref={ref} className={className}>
      {variant === 'fadeup' ? text : null}
    </span>
  )
}
