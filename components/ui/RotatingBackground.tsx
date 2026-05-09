'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, registerGSAP } from '@/lib/gsap'

const WORDS = [
  'Python', 'FastAPI', 'TypeScript', 'Golang', 'Java', 'Node.js', 'Express', 'React',
  'AWS', 'AWS Lambda', 'AWS Cognito', 'Amazon EKS', 'Kubernetes', 'Docker', 'Terraform',
  'CI/CD', 'GitHub Actions', 'GitLab CI/CD', 'Jenkins', 'DevOps', 'Cloud-Native',
  'Distributed Systems', 'Microservices', 'IaaC', 'REST APIs', 'OpenAPI', 'Swagger',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'HBase', 'Prometheus', 'Grafana',
  'OpenTelemetry', 'Tempo', 'Jaeger', 'Observability', 'Tracing',
  'ML', 'AI', 'RAG', 'LLM', 'Agentic AI', 'AI Agents', 'Vector DB', 'Qdrant', 'OpenAI',
  'Loki', 'Elasticsearch', 'TensorFlow', 'Keras', 'NumPy', 'Pandas', 'SciPy',
  'Transformers', 'CNNs', 'ResNets', 'Siamese Networks', 'ECG', 'CWT',
  'ABAP', 'S/4HANA', 'Solidity', 'PWA', 'WebSockets', 'Workbox', 'MERN Stack', 'Python Dash',
]

interface WordParams {
  baseX: number
  baseY: number
  ampX: number
  ampY: number
  freqX: number
  freqY: number
  phaseX: number
  phaseY: number
}

export default function RotatingBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    const container = containerRef.current
    if (!container) return

    const wordEls = Array.from(container.querySelectorAll('[data-word]')) as HTMLElement[]

    // Compute random curve params per word (client-only)
    const params: WordParams[] = wordEls.map(() => ({
      baseX:  5 + Math.random() * 88,        // starting x (% vw), keep within bounds
      baseY:  5 + Math.random() * 88,        // starting y (% vh)
      ampX:   8 + Math.random() * 16,        // how far to drift horizontally (vw)
      ampY:   6 + Math.random() * 12,        // how far to drift vertically (vh)
      freqX:  0.3 + Math.random() * 1.1,    // sinusoidal cycles over full scroll
      freqY:  0.25 + Math.random() * 0.9,
      phaseX: Math.random() * Math.PI * 2,  // random starting phase
      phaseY: Math.random() * Math.PI * 2,
    }))

    // Set initial positions and make visible
    wordEls.forEach((el, i) => {
      const p = params[i]
      const x = p.baseX + p.ampX * Math.sin(p.phaseX)
      const y = p.baseY + p.ampY * Math.cos(p.phaseY)
      gsap.set(el, {
        left: `${x}vw`,
        top:  `${y}vh`,
        opacity: 0.17 + Math.random() * 0.06,
        fontSize: `${13 + Math.random() * 3}px`,
      })
    })

    // Scroll-driven curved motion
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2.5,
      onUpdate: (self) => {
        const progress = self.progress
        wordEls.forEach((el, i) => {
          const p = params[i]
          const x = p.baseX + p.ampX * Math.sin(progress * Math.PI * 2 * p.freqX + p.phaseX)
          const y = p.baseY + p.ampY * Math.cos(progress * Math.PI * 2 * p.freqY + p.phaseY)
          gsap.set(el, { left: `${x}vw`, top: `${y}vh` })
        })
      },
    })

    return () => { st.kill() }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {WORDS.map((word, i) => (
        <span
          key={i}
          data-word=""
          className="absolute font-mono text-ink whitespace-nowrap opacity-0"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}
