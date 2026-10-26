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


export function App() { return <div className='portfolio-shell' /> }
