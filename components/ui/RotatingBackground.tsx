'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, registerGSAP } from '@/lib/gsap'

const WORDS = [
  // Ring 1 — inner (20 words)
  'Python', 'Golang', 'TypeScript', 'Docker', 'Redis',
  'React', 'Kubernetes', 'Terraform', 'CI/CD', 'REST APIs',
  'PostgreSQL', 'MongoDB', 'MySQL', 'RAG', 'LLM',
  'AI', 'ML', 'Loki', 'Qdrant', 'Solidity',
  // Ring 2 — middle (25 words)
  'FastAPI', 'Node.js', 'Express', 'Java', 'AWS',
  'AWS Lambda', 'Amazon EKS', 'GitHub Actions', 'Jenkins', 'DevOps',
  'Microservices', 'OpenAPI', 'Swagger', 'HBase', 'Prometheus',
  'Grafana', 'Jaeger', 'Tempo', 'OpenAI', 'Vector DB',
  'AI Agents', 'Agentic AI', 'Elasticsearch', 'WebSockets', 'PWA',
  // Ring 3 — outer (30 words)
  'AWS Cognito', 'AWS CodeDeploy', 'GitLab CI/CD', 'Cloud-Native', 'Distributed Systems',
  'IaaC', 'OpenTelemetry', 'Observability', 'Tracing', 'TensorFlow',
  'Keras', 'NumPy', 'Pandas', 'SciPy', 'Transformers',
  'CNNs', 'ResNets', 'Siamese Networks', 'ECG', 'CWT',
  'ABAP', 'S/4HANA', 'Workbox', 'MERN Stack', 'Python Dash',
  'ClaudeCode', 'GitLab CI/CD', 'GitHub Actions', 'Cloud-Native', 'Kubernetes',
]

const RING_CONFIG = [
  { count: 20, radius: 300,  totalRotation:  270, opacity: 0.13 },
  { count: 25, radius: 520,  totalRotation: -200, opacity: 0.11 },
  { count: 30, radius: 740,  totalRotation:  150, opacity: 0.10 },
]

export default function RotatingBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    const container = containerRef.current
    if (!container) return

    const ringEls = Array.from(container.querySelectorAll('[data-ring]'))
    let st: ReturnType<typeof ScrollTrigger.create> | null = null

    // Set initial word positions
    ringEls.forEach((ringEl, ri) => {
      const cfg = RING_CONFIG[ri]
      const words = Array.from(ringEl.querySelectorAll('[data-word]'))
      words.forEach((word, wi) => {
        const angle = (wi / words.length) * 2 * Math.PI
        const x = cfg.radius * Math.cos(angle)
        const y = cfg.radius * Math.sin(angle)
        gsap.set(word, { x, y, opacity: cfg.opacity })
      })
    })

    // Scroll-driven rotation via onUpdate
    st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress

        ringEls.forEach((ringEl, ri) => {
          const cfg = RING_CONFIG[ri]
          const words = Array.from(ringEl.querySelectorAll('[data-word]'))
          const rotationRad = (progress * cfg.totalRotation * Math.PI) / 180

          words.forEach((word, wi) => {
            const baseAngle = (wi / words.length) * 2 * Math.PI
            const angle = baseAngle + rotationRad
            const x = cfg.radius * Math.cos(angle)
            const y = cfg.radius * Math.sin(angle)
            gsap.set(word, { x, y })
          })
        })
      },
    })

    return () => {
      st?.kill()
    }
  }, [])

  let wordIndex = 0

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Offset center: 68% left, 45% top */}
      <div className="absolute" style={{ left: '68%', top: '45%' }}>
        {RING_CONFIG.map((cfg, ri) => {
          const ringWords = WORDS.slice(wordIndex, wordIndex + cfg.count)
          wordIndex += cfg.count
          return (
            <div key={ri} data-ring={ri} className="absolute top-0 left-0">
              {ringWords.map((word, wi) => (
                <span
                  key={wi}
                  data-word=""
                  className="absolute font-mono text-ink whitespace-nowrap opacity-0"
                  style={{
                    fontSize: ri === 0 ? '11px' : ri === 1 ? '10.5px' : '10px',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
