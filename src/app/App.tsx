import { useState, useEffect, useMemo, useRef } from 'react'
import { BrandLogo } from './BrandLogo'
import { articlesData, SUBSTACK_ARCHIVE_URL, SUBSTACK_SUBSCRIBE_URL } from './data/articles'
import './portfolio.css'

// --------------------------------------------------
// DATA DEFINITIONS (Verified from Praneet's repositories)
// --------------------------------------------------

interface ProjectItem {
  id: string
  title: string
  description: string
  stack: string[]
  githubUrl: string
  liveUrl?: string
}

const projectsData: ProjectItem[] = [
  {
    id: 'ai-tutor',
    title: 'Aether AI Tutor',
    description: 'An intelligent pedagogical engine featuring Bayesian Knowledge Tracing (BKT), deterministic concept-graph root cause diagnosis, and Socratic intervention dialogues.',
    stack: ['Python', 'FastAPI', 'React', 'Three.js', 'BKT', 'PostgreSQL'],
    githubUrl: 'https://github.com/PraneetNS/AI_Tutor',
  },
  {
    id: 'course-rag',
    title: 'EduBot Course RAG',
    description: 'An interactive engineering mentor integrating hybrid search (BM25 + vector embeddings), reciprocal rank fusion, multimodal slide grounding, and local LLM reasoning.',
    stack: ['Python', 'ChromaDB', 'BM25', 'FastAPI', 'RRF', 'PyMuPDF'],
    githubUrl: 'https://github.com/PraneetNS/edbot_rag',
  },
  {
    id: 'clinical-sense',
    title: 'Clinical Documentation AI',
    description: 'A clinical documentation assistant converting unstructured medical consultations into standardized SOAP notes with automated ICD-10 extraction and patient records.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Groq', 'TailwindCSS'],
    githubUrl: 'https://github.com/PraneetNS/clinical-sense',
    liveUrl: 'https://clinical-sense.vercel.app',
  },
  {
    id: 'edumentor',
    title: 'EduMentor Voice',
    description: 'A voice-first educational assistant combining low-latency speech recognition, quantized local language models, and text-to-speech audio synthesis.',
    stack: ['FastAPI', 'Whisper', 'llama.cpp', 'React', 'PostgreSQL'],
    githubUrl: 'https://github.com/PraneetNS/STS-Edumentor',
  },
  {
    id: 'myos',
    title: 'MyOS x86 Kernel',
    description: 'A custom x86 operating system kernel booting via GRUB (Multiboot2), protected mode initialization, interrupt descriptor tables (IDT/PIC), and VGA driver built in C and Assembly.',
    stack: ['C', 'x86 Assembly', 'GRUB', 'QEMU', 'Makefile'],
    githubUrl: 'https://github.com/PraneetNS/MyOS',
  },
  {
    id: 'air-canvas',
    title: 'Air Canvas Vision',
    description: 'A contactless digital drawing canvas using real-time computer vision, hand landmark tracking, and gesture geometry for real-time virtual canvas drawing.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    githubUrl: 'https://github.com/PraneetNS/python-projects',
  },
]

interface SkillCategory {
  category: string
  items: string[]
}

const skillsData: SkillCategory[] = [
  {
    category: 'AI / Machine Learning',
    items: [
      'LLMs',
      'RAG',
      'Hybrid Retrieval',
      'Reranking',
      'Bayesian Knowledge Tracing (BKT)',
      'Concept Graphs',
      'Embeddings',
      'Whisper',
      'MediaPipe',
      'OpenCV',
      'Model Evaluation',
    ],
  },
  {
    category: 'Languages & Systems',
    items: ['Python', 'TypeScript', 'JavaScript', 'C', 'x86 Assembly', 'Rust', 'SQL'],
  },
  {
    category: 'Frameworks & Backend',
    items: ['FastAPI', 'Flask', 'React', 'Next.js', 'Node.js', 'Laravel', 'REST APIs'],
  },
  {
    category: 'Data & Infrastructure',
    items: ['PostgreSQL', 'Redis', 'ChromaDB', 'Firebase', 'Docker', 'Git', 'Vercel', 'Hugging Face', 'Linux'],
  },
]

interface RoleItem {
  id: string
  role: string
  period: string
  badge: string
  location?: string
  description: string
}

interface TimelineEntry {
  organization: string
  websiteUrl?: string
  logoUrl?: string
  logoAlt?: string
  initials: string
  totalPeriod?: string
  location?: string
  roles: RoleItem[]
}

const timelineData: TimelineEntry[] = [
  {
    organization: 'Edutainer',
    websiteUrl: 'https://www.edutainer.in',
    logoUrl: '/images/edutainer_icon.png',
    logoAlt: 'Edutainer official logo',
    initials: 'ED',
    totalPeriod: 'Jan 2026 – Present',
    location: 'Bengaluru · On-site',
    roles: [
      {
        id: 'edutainer-engineer',
        role: 'AIML Engineer',
        period: 'June 2026 – Present',
        badge: 'Full-time',
        location: 'Bengaluru · On-site',
        description: 'Integrating AI into legacy systems , Building workflows , automations .',
      },
      {
        id: 'edutainer-intern',
        role: 'AIML Intern',
        period: 'Jan 2026 – June 2026',
        badge: 'Internship',
        location: 'Bengaluru · On-site',
        description: "Building RAG Systems , Finetuning LLM's , Research about models , Integrating AI , Research about machine learning systems",
      },
    ],
  },
  {
    organization: 'VRIF',
    websiteUrl: 'https://www.vtuvrif.com',
    logoUrl: '/images/vrif_logo.png',
    logoAlt: 'Visvesvaraya Research & Innovation Foundation (VRIF) official logo',
    initials: 'VR',
    totalPeriod: 'Aug 2025 – Dec 2025',
    location: 'Belgaum · On-site',
    roles: [
      {
        id: 'vrif-intern',
        role: 'AIML Intern',
        period: 'Aug 2025 – Dec 2025',
        badge: 'Internship',
        location: 'Belgaum · On-site',
        description: 'Building AI Services , Research about machine learning systems',
      },
    ],
  },
]

function TimelineLogo({ item }: { item: TimelineEntry }) {
  const [hasError, setHasError] = useState(false)

  if (!item.logoUrl || hasError) {
    return <span className="timeline-fallback-initials">{item.initials}</span>
  }

  return (
    <img
      src={item.logoUrl}
      alt={item.logoAlt || `${item.organization} logo`}
      className="timeline-logo-img"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}

// --------------------------------------------------
// INLINE ICONS (Matching Lucide minimal aesthetic)
// --------------------------------------------------

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function FolderGitIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 9v12" />
      <path d="M18 15a9 9 0 0 0-9-9" />
    </svg>
  )
}

function GraduationCapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function CommandIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function XTwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function BookOpenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

// --------------------------------------------------
// MAIN APP COMPONENT
// --------------------------------------------------

// --------------------------------------------------
// SCRAMBLE / DECODING ANIMATION CONSTANTS & HELPERS
// --------------------------------------------------

export function App() { return <div className='portfolio-shell' /> }
