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
  github: string | null
  website: string | null
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  location: string
  type: 'work' | 'education'
  headline: string
  impact: string
  impactLabel: string
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
  experience: ExperienceItem[]
  projects: Project[]
  timeline: TimelineItem[]
  contact: { email: string; github: string; linkedin: string; domain: string }
}

export const content: Content = {
  hero: {
    name: 'Siddhant Deshpande',
    title: 'Backend · Distributed Systems · AI',
    tagline: 'I build the infrastructure that keeps things running at scale.',
  },

  stakes: {
    statement:
      'Backend services, cloud pipelines, DevOps automation, AI tooling — different problems, same standard: ship it reliably and make it scale.',
    stats: [
      { value: 3, suffix: '+', label: 'Years of engineering' },
      { value: 2, suffix: '',  label: 'Graduate degrees' },
      { value: 1, suffix: '',  label: 'arXiv preprint' },
    ],
  },

  about: {
    photo: '/images/sid.jpg',
    bio: "Backend engineer with 3+ years shipping Python/FastAPI services, cloud infrastructure, CI/CD pipelines, and AI tooling across startups, research, and enterprise. MSc from TU Dresden. Comfortable from API design to Kubernetes deployments — I like to own problems end to end.",
    tags: ['Python', 'FastAPI', 'AWS', 'Distributed Systems', 'RAG', 'OpenTelemetry', 'Kubernetes', 'Docker'],
  },

  experience: [
    {
      role: 'Backend Software Engineer',
      company: 'Constellr GmbH',
      period: 'Aug 2024 – Feb 2026',
      location: 'Freiburg, DE (Remote)',
      type: 'work',
      headline: 'Reduced deployment effort by 80% with GitHub Actions automation for AWS Lambda.',
      impact: '80',
      impactLabel: '% less manual deployment',
    },
    {
      role: 'Student Research Assistant',
      company: 'Fraunhofer IVI',
      period: 'Mar 2023 – May 2024',
      location: 'Dresden, DE',
      type: 'work',
      headline: 'Cut regression issues by 60% with ML model integration tests for battery simulations.',
      impact: '60',
      impactLabel: '% fewer regressions',
    },
    {
      role: 'Associate Analyst — SAP Backend',
      company: 'Deloitte USI',
      period: 'Sep 2021 – Sep 2022',
      location: 'Pune, IN',
      type: 'work',
      headline: 'Saved 70% of monthly manual effort with inventory automation in ABAP.',
      impact: '70',
      impactLabel: '% manual effort saved',
    },
    {
      role: 'Full-Stack Software Engineer',
      company: 'Appsay.co',
      period: 'Jul 2020 – Jan 2021',
      location: 'Pune, IN',
      type: 'work',
      headline: 'Boosted API response time by 35% using Prometheus + Grafana to find and fix a backend bottleneck.',
      impact: '35',
      impactLabel: '% faster API responses',
    },
  ],

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
      github: 'https://github.com/sidcommits/semantic-log-search',
      website: null,
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
      github: 'https://github.com/sidcommits/surprise-meal',
      website: null,
    },
    {
      chapter: '03',
      title: 'NFT Display Monitor',
      tagline: 'Where crypto meets the physical world.',
      description:
        'Scan a QR code, upload your photo, and watch your NFT materialise on a physical display screen. Bridges on-chain assets with the real world.',
      stack: ['Solidity', 'WebSockets', 'QR', 'PWA'],
      status: 'shipped',
      link: null,
      github: 'https://github.com/sidcommits/nft-display-monitor',
      website: null,
    },
  ],

  timeline: [
    { year: '2018', label: 'BSc Computer Science', sublabel: 'Fergusson College, Pune · CGPA 9.88', type: 'education' },
    { year: '2020', label: 'Full-Stack Engineer', sublabel: 'Appsay.co · Pune', type: 'work' },
    { year: '2021', label: 'SAP Backend Analyst', sublabel: 'Deloitte USI · Pune', type: 'work' },
    { year: '2022', label: 'MSc Distributed Systems', sublabel: 'TU Dresden · Grade 1.9', type: 'education' },
    { year: '2023', label: 'Research Assistant', sublabel: 'Fraunhofer IVI · Dresden', type: 'work' },
    { year: '2024', label: 'Backend Engineer', sublabel: 'Constellr GmbH · Freiburg', type: 'work' },
  ],

  contact: {
    email: 'siddhantdeshpande07@gmail.com',
    github: 'https://github.com/sidcommits',
    linkedin: 'https://linkedin.com/in/sideshpande',
    domain: 'siddhantdeshpande.com',
  },
}
