'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const SYMBOLS = [
  '{ }', '< />', '[ ]', '( )', '=>', '//', '&&', '||',
  'async', 'await', 'goroutine', 'kafka', 'raft',
  'vector', 'loki', 'grpc', 'redis', 'etcd',
  '0x1F', '01', '404', '∞', '::',
  'distributed', 'consensus', 'shard', 'replica',
  'RAG', 'embed', 'index', 'query',
]

interface FloatingElementsProps {
  count?: number
}

export default function FloatingElements({ count = 20 }: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const els = Array.from(container.querySelectorAll('[data-float]'))

    els.forEach((el) => {
      const html = el as HTMLElement

      // Apply random font size client-side only
      html.style.fontSize = `${10 + Math.random() * 8}px`

      const startX = Math.random() * 90
      const startY = Math.random() * 90
      const duration = 7 + Math.random() * 10
      const delay = Math.random() * 6
      const driftX = (Math.random() - 0.5) * 60
      const driftY = (Math.random() - 0.5) * 60
      const targetOpacity = 0.04 + Math.random() * 0.05

      gsap.set(html, {
        x: `${startX}vw`,
        y: `${startY}vh`,
        opacity: 0,
        position: 'absolute',
      })

      gsap.to(html, {
        opacity: targetOpacity,
        duration: 1.5,
        delay,
      })

      gsap.to(html, {
        x: `+=${driftX}`,
        y: `+=${driftY}`,
        duration,
        delay,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(html, {
        rotation: (Math.random() - 0.5) * 20,
        duration: duration * 1.3,
        delay,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })

    return () => {
      gsap.killTweensOf(els)
    }
  }, [])

  const items = Array.from({ length: count }, (_, i) => SYMBOLS[i % SYMBOLS.length])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
    >
      {items.map((symbol, i) => (
        <span
          key={i}
          data-float=""
          className="font-mono text-ink opacity-0 whitespace-nowrap"
        >
          {symbol}
        </span>
      ))}
    </div>
  )
}
