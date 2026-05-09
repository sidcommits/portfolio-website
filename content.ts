// content.ts
export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Project {
  chapter: string
  title: string
  tagline: string
  description: string
  stack: string[]
  status: 'shipped' | 'in progress'
  link: string | null
}

export interface TimelineItem {
  year: string
  label: string
  sublabel: string
  type: 'work' | 'education'
}

export interface Content {
  hero: { name: string; title: string; tagline: string }
  stakes: { statement: string; stats: Stat[] }
  about: { photo: string; bio: string; tags: string[] }
  projects: Project[]
  timeline: TimelineItem[]
  contact: { email: string; github: string; linkedin: string }
}

export const content: Content = {
  hero: {
    name: 'Siddhant Deshpande',
    title: 'Distributed Systems Engineer',
    tagline: 'I build the infrastructure that keeps things running at scale.',
  },

  stakes: {
    statement:
      'Every app you love runs on infrastructure most people never think about. I think about it every day.',
    stats: [
      { value: 4, suffix: '+', label: 'Years of engineering' },
      { value: 2, suffix: '',  label: 'Graduate degrees' },
      { value: 3, suffix: '',  label: 'Systems shipped' },
    ],
  },

  about: {
    photo: '/images/sid.jpg',
    bio: "I'm a distributed systems engineer who obsesses over the invisible layer that makes software work at scale. I've shipped production systems, built AI-powered tooling, and I'm always working on something that solves a real problem.",
    tags: ['Distributed Systems', 'RAG Pipelines', 'TypeScript', 'Python', 'Go', 'Vector DBs'],
  },

  projects: [
    {
      chapter: '01',
      title: 'Semantic Log Search',
      tagline: 'Find anything in your logs. Just ask.',
      description:
        'Logs emitted to Loki are embedded and stored in a vector database. A RAG pipeline lets engineers query them in plain English — no more grep marathons.',
      stack: ['Python', 'Loki', 'Vector DB', 'RAG', 'LLM'],
      status: 'shipped',
      link: null,
    },
    {
      chapter: '02',
      title: 'Surprise Meal',
      tagline: 'Subscriptions that actually delight.',
      description:
        'Load a balance, answer a few questions about your taste, and let the system order you a surprising meal from a different restaurant every time. No decision fatigue.',
      stack: ['React Native', 'Node.js', 'AI', 'Payment API'],
      status: 'in progress',
      link: null,
    },
    {
      chapter: '03',
      title: 'NFT Display Monitor',
      tagline: 'Where crypto meets the physical world.',
      description:
        'Scan a QR code, upload your photo, and watch your NFT materialise on a physical display screen. Bridges on-chain assets with the real world.',
      stack: ['Crypto', 'QR', 'WebSockets', 'Display'],
      status: 'shipped',
      link: null,
    },
  ],

  timeline: [
    { year: '2019', label: 'BS Computer Science', sublabel: 'University name here', type: 'education' },
    { year: '2021', label: 'Software Engineer', sublabel: 'Company name here', type: 'work' },
    { year: '2023', label: 'MS Distributed Systems', sublabel: 'University name here', type: 'education' },
    { year: '2024', label: 'Senior Engineer', sublabel: 'Company name here', type: 'work' },
  ],

  contact: {
    email: 'siddhantdeshpande3@gmail.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
  },
}
