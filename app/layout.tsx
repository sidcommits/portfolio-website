import type { Metadata } from 'next'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/jetbrains-mono/400.css'
import './globals.css'
import LenisProvider from '@/components/ui/LenisProvider'
import Cursor from '@/components/ui/Cursor'
import RotatingBackground from '@/components/ui/RotatingBackground'

export const metadata: Metadata = {
  title: 'Siddhant Deshpande — Distributed Systems Engineer',
  description:
    'Portfolio of Siddhant Deshpande — software engineer specialising in distributed systems, RAG pipelines, and infrastructure that scales.',
  openGraph: {
    title: 'Siddhant Deshpande — Distributed Systems Engineer',
    description: 'I build the infrastructure that keeps things running at scale.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <RotatingBackground />
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
