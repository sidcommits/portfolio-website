'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { content } from '@/content'

const NAV_LINKS = [
  { label: 'About',    href: '#engineer' },
  { label: 'Work',     href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 2.5, ease: 'power2.out' }
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 opacity-0"
    >
      <span className="font-display font-bold text-lg tracking-tight text-ink">
        {content.hero.name.split(' ').map((n) => n[0]).join('')}
      </span>

      <ul className="hidden md:flex gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="font-body text-sm text-gray hover:text-orange transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
