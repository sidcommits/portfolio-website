'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export default function Counter({ value, suffix = '', duration = 2, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${Math.round(obj.val)}${suffix}`
      },
    })
  }, [value, suffix, duration])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
