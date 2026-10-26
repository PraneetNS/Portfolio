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
const TARGET_NAME = 'PRANEET SAVANT'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const LETTER_INDICES = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13] // skips index 7 (space)

function getRandomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

function generateInitialScramble() {
  return TARGET_NAME.split('').map((char) => (char === ' ' ? ' ' : getRandomChar())).join('')
}

export function App() {
  const [activeSection, setActiveSection] = useState<string>('top')
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('All')
  const [commandOpen, setCommandOpen] = useState<boolean>(false)
  const [commandQuery, setCommandQuery] = useState<string>('')
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false)
  const [showAllArticles, setShowAllArticles] = useState<boolean>(false)
  const [introDone, setIntroDone] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true
    }
    return false
  })

  // Scramble decode states
  const [displayedName, setDisplayedName] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return TARGET_NAME
    }
    return generateInitialScramble()
  })
  const [resolvedCount, setResolvedCount] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return LETTER_INDICES.length
    }
    return 0
  })

  const searchInputRef = useRef<HTMLInputElement>(null)
  const isProgrammaticScrollRef = useRef<boolean>(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  // Random letter scramble and progressive left-to-right decode animation (1.5s decode, hold, smooth exit)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedName(TARGET_NAME)
      setResolvedCount(LETTER_INDICES.length)
      setIntroDone(true)
      return
    }

    const startTime = performance.now()
    const pureScrambleDuration = 200 // ms of full-word rapid scramble
    const decodeDuration = 1150 // ms for progressive left-to-right letter lock-in
    const totalScrambleTime = pureScrambleDuration + decodeDuration // 1350ms total
    const totalLetters = LETTER_INDICES.length // 13 letters

    let rafId: number
    let lastTick = 0
    const frameInterval = 35 // update random letters every 35ms

    const updateFrame = (now: number) => {
      const elapsed = now - startTime

      if (elapsed >= totalScrambleTime) {
        setDisplayedName(TARGET_NAME)
        setResolvedCount(totalLetters)
        return
      }

      if (now - lastTick >= frameInterval) {
        lastTick = now

        let currentResolved = 0
        if (elapsed > pureScrambleDuration) {
          const decodeProgress = (elapsed - pureScrambleDuration) / decodeDuration
          currentResolved = Math.min(totalLetters, Math.floor(decodeProgress * totalLetters))
        }

        const chars = TARGET_NAME.split('')
        for (let i = 0; i < totalLetters; i++) {
          const charIndex = LETTER_INDICES[i]
          if (i >= currentResolved) {
            chars[charIndex] = getRandomChar()
          }
        }

        setDisplayedName(chars.join(''))
        setResolvedCount(currentResolved)
      }

      rafId = requestAnimationFrame(updateFrame)
    }

    rafId = requestAnimationFrame(updateFrame)

    // Unmount intro overlay after scramble (1.5s) + hold (0.9s) + transition (0.6s) = 3.0s
    const unmountTimer = setTimeout(() => {
      setIntroDone(true)
    }, 3100)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(unmountTimer)
    }
  }, [])

  // 1. Scroll-Spy observer for active dock indicator
  useEffect(() => {
    const sectionIds = ['top', 'about', 'work', 'writing', 'skills', 'projects', 'education']
    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return

      const scrollHeight = document.documentElement.scrollHeight
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // If at or near bottom of page (within 80px), education (the last section) is definitely active
      if (windowHeight + scrollPosition >= scrollHeight - 80) {
        setActiveSection('education')
        return
      }

      // If at top of page
      if (scrollPosition < 100) {
        setActiveSection('top')
        return
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // For education at the bottom, trigger earlier as it enters lower-mid viewport
          const threshold = id === 'education' ? windowHeight * 0.72 : windowHeight * 0.4
          if (rect.top <= threshold) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    const resetProgrammatic = () => {
      isProgrammaticScrollRef.current = false
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', resetProgrammatic, { passive: true })
    window.addEventListener('touchmove', resetProgrammatic, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', resetProgrammatic)
      window.removeEventListener('touchmove', resetProgrammatic)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  // 2. Keyboard shortcuts for Command Palette (Cmd+K / Ctrl+K and Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      } else if (e.key === 'Escape' && commandOpen) {
        setCommandOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandOpen])

  // Focus search input when command palette opens
  useEffect(() => {
    if (commandOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)
    } else {
      setCommandQuery('')
    }
  }, [commandOpen])

  // 3. Filtered skills computation
  const skillCategories = useMemo(() => {
    const total = skillsData.reduce((acc, s) => acc + s.items.length, 0)
    return [
      { category: 'All', count: total },
      ...skillsData.map((s) => ({ category: s.category, count: s.items.length })),
    ]
  }, [])
  const displayedSkills = useMemo(() => {
    if (selectedSkillCategory === 'All') {
      return skillsData.flatMap((g) => g.items)
    }
    const found = skillsData.find((s) => s.category === selectedSkillCategory)
    return found ? found.items : []
  }, [selectedSkillCategory])

  const scrollToSection = (id: string) => {
    setCommandOpen(false)
    setActiveSection(id)
    isProgrammaticScrollRef.current = true
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 850)

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 4. Command palette actions
  const commandActions = useMemo(
    () => [
      { label: 'Go to Home / Profile', icon: <HomeIcon />, action: () => scrollToSection('top') },
      { label: 'Go to About', icon: <UserIcon />, action: () => scrollToSection('about') },
      { label: 'Go to Work Experience', icon: <BriefcaseIcon />, action: () => scrollToSection('work') },
      { label: 'Go to Writing & Essays', icon: <BookOpenIcon />, action: () => scrollToSection('writing') },
      { label: 'Go to Skills', icon: <LayersIcon />, action: () => scrollToSection('skills') },
      { label: 'Go to Projects', icon: <FolderGitIcon />, action: () => scrollToSection('projects') },
      { label: 'Go to Education', icon: <GraduationCapIcon />, action: () => scrollToSection('education') },
      {
        label: 'Open Substack Publication (praneetsavant.substack.com)',
        icon: <BookOpenIcon />,
        action: () => {
          window.open(SUBSTACK_ARCHIVE_URL, '_blank', 'noreferrer')
          setCommandOpen(false)
        },
      },
      {
        label: 'Subscribe to Substack Newsletter',
        icon: <MailIcon />,
        action: () => {
          window.open(SUBSTACK_SUBSCRIBE_URL, '_blank', 'noreferrer')
          setCommandOpen(false)
        },
      },
      {
        label: copiedEmail ? 'Email Copied to Clipboard!' : 'Copy Email Address (hello@praneetsavant.in)',
        icon: <MailIcon />,
        action: () => {
          navigator.clipboard.writeText('hello@praneetsavant.in')
          setCopiedEmail(true)
          setTimeout(() => setCopiedEmail(false), 2000)
        },
      },
      {
        label: 'Open GitHub Profile (PraneetNS)',
        icon: <GithubIcon />,
        action: () => {
          window.open('https://github.com/PraneetNS', '_blank', 'noreferrer')
          setCommandOpen(false)
        },
      },
      {
        label: 'Open LinkedIn Profile',
        icon: <LinkedinIcon />,
        action: () => {
          window.open('https://linkedin.com/in/praneetsavant', '_blank', 'noreferrer')
          setCommandOpen(false)
        },
      },
      {
        label: 'Open X / Twitter Profile',
        icon: <XTwitterIcon />,
        action: () => {
          window.open('https://x.com/praneetsavant', '_blank', 'noreferrer')
          setCommandOpen(false)
        },
      },
      {
        label: 'Open Clinical Documentation Demo',
        icon: <GlobeIcon />,
        action: () => {
          window.open('https://clinical-sense.vercel.app', '_blank', 'noreferrer')
          setCommandOpen(false)
        },
      },
    ],
    [copiedEmail]
  )

  const filteredCommands = useMemo(() => {
    if (!commandQuery.trim()) return commandActions
    return commandActions.filter((cmd) => cmd.label.toLowerCase().includes(commandQuery.toLowerCase()))
  }, [commandActions, commandQuery])

  return (
    <>
      {/* ==================================================
          OPENING INTRO ANIMATION OVERLAY
          Full-viewport clean white intro that gives way smoothly
          to the underlying portfolio (1.2s - 1.8s)
          ================================================== */}
      {!introDone && (
        <div className="intro-overlay" aria-hidden="true">
          <div className="intro-center-hero">
            <div className="intro-hero-name" aria-label={TARGET_NAME}>
              <span className="scramble-word">
                {displayedName.slice(0, 7).split('').map((char, idx) => (
                  <span
                    key={`first-${idx}`}
                    className={`scramble-char ${idx < resolvedCount ? 'is-resolved' : 'is-scrambling'}`}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="scramble-space">&nbsp;</span>
              <span className="scramble-word">
                {displayedName.slice(8, 14).split('').map((char, idx) => {
                  const globalLetterIdx = idx + 7
                  return (
                    <span
                      key={`last-${idx}`}
                      className={`scramble-char ${globalLetterIdx < resolvedCount ? 'is-resolved' : 'is-scrambling'}`}
                    >
                      {char}
                    </span>
                  )
                })}
              </span>
            </div>
            <p className="intro-hero-tagline">AI ENGINEERING, INTELLIGENT SYSTEMS AT SCALE</p>
          </div>
        </div>
      )}

      <main className="portfolio-shell">
        {/* ==================================================
            HERO / PROFILE HEADER (#top)
            ================================================== */}
        <section className="portfolio-section" id="top" aria-label="Profile Header">
          <div className="hero-header">
            <div className="hero-bio-col">
              <h1 className="hero-name">Praneet Savant</h1>
              <p className="hero-headline">AI/ML engineer and full-stack developer building educational AI systems, course-grounded retrieval pipelines, and systems software.</p>
              <div className="hero-social-row">
                <a className="social-btn" href="mailto:hello@praneetsavant.in" aria-label="Send Email (hello@praneetsavant.in)">
                  <MailIcon />
                </a>
                <a className="social-btn" href="https://github.com/PraneetNS" target="_blank" rel="noreferrer" aria-label="GitHub Profile">
                  <GithubIcon />
                </a>
                <a className="social-btn" href="https://linkedin.com/in/praneetsavant" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile">
                  <LinkedinIcon />
                </a>
                <a className="social-btn" href="https://x.com/praneetsavant" target="_blank" rel="noreferrer" aria-label="X Profile">
                  <XTwitterIcon />
                </a>
              </div>
            </div>

            <div className="hero-avatar-wrap" aria-label="Avatar of Praneet Savant">
              <BrandLogo showText={false} size={92} />
            </div>
          </div>
        </section>

        {/* ==================================================
            ABOUT SECTION (#about)
            ================================================== */}
        <section className="portfolio-section" id="about" aria-label="About Section">
          <div className="section-header">
            <h2 className="section-title">About</h2>
          </div>
          <div className="about-content">
            <p>I'm a B.Tech graduate focused on the intersection of AI research and robust product engineering. I build software systems with strong theoretical grounding that are measurable, dependable, and ready to ship.</p>
            <p>My core research focus centers on educational AI: course-grounded retrieval, multimodal document understanding, Bayesian Knowledge Tracing (BKT), and tutoring systems designed around student context and Socratic intervention.</p>
            <p>Across the stack, I engineer Python services, low-latency APIs, database architectures, and frontend applications — from custom operating system kernels in C to production full-stack systems.</p>
            <div className="about-actions">
              <a className="action-pill-btn" href="mailto:hello@praneetsavant.in">
                <MailIcon />
                <span>Get in touch</span>
              </a>
              <a className="action-pill-btn" href="#projects">
                <FolderGitIcon />
                <span>Explore projects</span>
              </a>
            </div>
          </div>
        </section>

        {/* ==================================================
            WORK EXPERIENCE / TIMELINE (#work)
            ================================================== */}
        <section className="portfolio-section" id="work" aria-label="Work Experience Section">
          <div className="section-header">
            <h2 className="section-title">Work Experience</h2>
            <p className="section-subtitle">Engineering milestones and technical focus</p>
          </div>
          <div className="timeline-wrapper">
            <div className="timeline-line" aria-hidden="true" />
            {timelineData.map((item) => {
              const isMultiRole = item.roles.length > 1

              return (
                <article className="timeline-item" key={item.organization}>
                  <div className="timeline-node">
                    <TimelineLogo item={item} />
                  </div>

                  {isMultiRole ? (
                    // LinkedIn-style connected career progression within the same company
                    <div className="timeline-grouped-entry">
                      <div className="timeline-group-header">
                        <div className="timeline-group-title-row">
                          {item.websiteUrl ? (
                            <a
                              href={item.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="timeline-company-link"
                              aria-label={`${item.organization} website (opens in new tab)`}
                            >
                              <h3 className="timeline-group-company">{item.organization}</h3>
                              <ArrowUpRight />
                            </a>
                          ) : (
                            <h3 className="timeline-group-company">{item.organization}</h3>
                          )}
                        </div>
                        <div className="timeline-group-meta">
                          {item.totalPeriod && <span className="timeline-group-period">{item.totalPeriod}</span>}
                          {item.location && <span className="timeline-location">· {item.location}</span>}
                        </div>
                      </div>

                      <div className="timeline-nested-roles">
                        <div className="timeline-nested-line" aria-hidden="true" />
                        {item.roles.map((subRole) => (
                          <div className="timeline-nested-role-item" key={subRole.id}>
                            <div className="timeline-nested-dot" aria-hidden="true" />
                            <div className="timeline-header">
                              <div>
                                <h4 className="timeline-role">{subRole.role}</h4>
                                <div className="timeline-company-row">
                                  <span className="timeline-badge">{subRole.badge}</span>
                                  {subRole.location && (
                                    <span className="timeline-location">{subRole.location}</span>
                                  )}
                                </div>
                              </div>
                              <span className="timeline-date">{subRole.period}</span>
                            </div>
                            <p className="timeline-desc">{subRole.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Single-role entry (e.g. VRIF)
                    <div>
                      {item.roles.map((subRole) => (
                        <div key={subRole.id}>
                          <div className="timeline-header">
                            <div>
                              <h3 className="timeline-role">{subRole.role}</h3>
                              <div className="timeline-company-row">
                                {item.websiteUrl ? (
                                  <a
                                    href={item.websiteUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="timeline-company-link"
                                    aria-label={`${item.organization} website (opens in new tab)`}
                                  >
                                    <span className="timeline-company">{item.organization}</span>
                                    <ArrowUpRight />
                                  </a>
                                ) : (
                                  <span className="timeline-company">{item.organization}</span>
                                )}
                                <span className="timeline-badge">{subRole.badge}</span>
                                {subRole.location && (
                                  <span className="timeline-location">{subRole.location}</span>
                                )}
                              </div>
                            </div>
                            <span className="timeline-date">{subRole.period}</span>
                          </div>
                          <p className="timeline-desc">{subRole.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        {/* ==================================================
            WRITING / BLOGS SECTION (#writing)
            ================================================== */}
        <section className="portfolio-section" id="writing" aria-label="Writing and Essays Section">
          <div className="writing-section-header">
            <div>
              <h2 className="section-title">Writing</h2>
              <p className="section-subtitle">Technical deep-dives, systems analysis, and AI architecture</p>
            </div>
            <div className="writing-actions-row">
              <a
                href={SUBSTACK_SUBSCRIBE_URL}
                target="_blank"
                rel="noreferrer"
                className="action-pill-btn"
                aria-label="Subscribe to Praneet's Substack"
              >
                <MailIcon />
                <span>Subscribe</span>
              </a>
              <a
                href={SUBSTACK_ARCHIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="action-pill-btn"
                aria-label="View all writing on Substack"
              >
                <span>View all writing</span>
                <ArrowRightIcon />
              </a>
            </div>
          </div>

          <div className="writing-grid">
            {(showAllArticles ? articlesData : articlesData.slice(0, 4)).map((article) => (
              <article key={article.slug} className="writing-card">
                <div className="writing-meta-row">
                  <CalendarIcon />
                  <time dateTime={article.isoDate}>{article.date}</time>
                  <span aria-hidden="true">•</span>
                  <span className="writing-topic-badge">{article.topic}</span>
                  <span aria-hidden="true">•</span>
                  <ClockIcon />
                  <span>{article.readTime}</span>
                </div>

                <h3 className="writing-card-title">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="writing-card-link"
                  >
                    {article.title}
                    <ArrowUpRight />
                  </a>
                </h3>

                <p className="writing-card-desc">{article.subtitle}</p>

                <div className="writing-card-footer">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="writing-read-btn"
                  >
                    <span>Read on Substack</span>
                    <ArrowUpRight />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {articlesData.length > 4 && (
            <div className="writing-toggle-row">
              <button
                type="button"
                className="action-pill-btn"
                onClick={() => setShowAllArticles((prev) => !prev)}
                aria-label={showAllArticles ? 'Show fewer articles' : `Show all ${articlesData.length} articles`}
              >
                {showAllArticles ? (
                  <span>Show fewer articles</span>
                ) : (
                  <span>Show all {articlesData.length} articles</span>
                )}
              </button>
            </div>
          )}
        </section>

        {/* ==================================================
            SKILLS SECTION (#skills)
      </main>
    </>
  )
}
