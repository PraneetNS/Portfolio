import { useState } from 'react'
import { BrandLogo } from './BrandLogo'
import './portfolio.css'

const projects = [
  {
    number: '01',
    type: 'AI SYSTEMS · EDUCATION',
    title: 'AI Tutor for Learning Platforms',
    description: 'A course-aware tutoring system designed around learner context, Socratic teaching, mastery tracking, and personalized interventions.',
    stack: ['Laravel', 'React', 'PostgreSQL', 'Redis', 'RAG'],
    link: 'https://github.com/PraneetNS',
    linkLabel: 'Explore projects',
  },
  {
    number: '02',
    type: 'RETRIEVAL · MULTIMODAL AI',
    title: 'Course RAG Research',
    description: 'A retrieval pipeline for lesson transcripts, notes, and slide decks, with hybrid search, reranking, visual evidence, and an evaluation suite.',
    stack: ['Python', 'ChromaDB', 'BM25', 'RRF', 'PyMuPDF'],
    link: 'https://github.com/PraneetNS',
    linkLabel: 'View GitHub',
  },
  {
    number: '03',
    type: 'GENERATIVE AI · VOICE',
    title: 'EduMentor Voice',
    description: 'A voice-first educational assistant combining speech recognition, local language models, text-to-speech, and a web interface.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Whisper', 'llama.cpp'],
    link: 'https://github.com/PraneetNS/STS-Edumentor',
    linkLabel: 'View repository',
  },
  {
    number: '04',
    type: 'COMPUTER VISION',
    title: 'Air Canvas',
    description: 'A hands-free drawing experience that uses real-time hand tracking to turn gestures into a digital canvas.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Flask'],
    link: 'https://github.com/PraneetNS',
    linkLabel: 'More on GitHub',
  },
]

const skillGroups = [
  { title: 'AI / MACHINE LEARNING', skills: ['LLMs', 'RAG', 'Embeddings', 'Hybrid Retrieval', 'Reranking', 'Model Evaluation', 'Transformers', 'Computer Vision'] },
  { title: 'LANGUAGES & BACKEND', skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'FastAPI', 'Flask', 'Laravel', 'Node.js'] },
  { title: 'DATA & INFRASTRUCTURE', skills: ['PostgreSQL', 'Redis', 'ChromaDB', 'Firebase', 'Docker', 'Git', 'Vercel', 'Hugging Face'] },
  { title: 'FRONTEND', skills: ['React', 'HTML', 'CSS', 'Responsive UI', 'REST APIs'] },
]

const navItems = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Journey', '#journey'],
]

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>
}

function SectionHeading({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div className="section-heading">
      <span className="section-index">{index}</span>
      <h2>{title}</h2>
      {note && <span className="section-note">{note}</span>}
    </div>
  )
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="portfolio">
      <header className="topbar">
        <BrandLogo />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? 'CLOSE −' : 'MENU +'}
        </button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-contact" href="mailto:hello@praneetsavant.in">Let's talk <Arrow /></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span className="availability-dot" /> AI ENGINEERING · FULL-STACK DEVELOPMENT</div>
        <div className="hero-title-wrap">
          <p className="eyebrow">HELLO, I'M</p>
          <h1>Praneet<br /><span>Savant.</span></h1>
        </div>
        <div className="hero-bottom">
          <p className="hero-intro">I build thoughtful AI systems and useful software — from retrieval pipelines and learning tools to the interfaces people use every day.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">Explore my work <Arrow /></a>
            <a className="text-link" href="https://github.com/PraneetNS" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          </div>
        </div>
        <div className="hero-index"><span>PORTFOLIO / 2026</span><span>BASED IN INDIA · WORKING WORLDWIDE</span></div>
        <div className="hero-decoration" aria-hidden="true">PS</div>
      </section>

      <section className="about section-shell" id="about">
        <SectionHeading index="01 /" title="A little about me" note="THE PERSON BEHIND THE CODE" />
        <div className="about-grid">
          <h3>Curiosity first.<br /><span>Engineering always.</span></h3>
          <div className="about-copy">
            <p>I'm a B.Tech graduate interested in the space where AI research meets real-world product engineering. I enjoy taking complex technical ideas and turning them into systems that are measurable, useful, and ready to ship.</p>
            <p>My current focus is educational AI: course-grounded retrieval, multimodal document understanding, learner context, and tutoring experiences that help people understand rather than just get an answer.</p>
            <p>I also build across the stack — from Python services and data pipelines to frontend experiences and deployment.</p>
            <a className="inline-link" href="mailto:hello@praneetsavant.in">Have a project in mind? Get in touch <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="projects section-shell" id="projects">
        <SectionHeading index="02 /" title="Selected work" note="BUILDING, TESTING, ITERATING" />
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div>
              <div className="project-main">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <a className="project-link" href={project.link} target="_blank" rel="noreferrer" aria-label={`${project.linkLabel}: ${project.title}`}>{project.linkLabel} <Arrow /></a>
              </div>
              <div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
        <div className="projects-footer"><span>MORE EXPERIMENTS, CODE & NOTES</span><a className="inline-link" href="https://github.com/PraneetNS" target="_blank" rel="noreferrer">Explore GitHub <Arrow /></a></div>
      </section>

      <section className="skills section-shell" id="skills">
        <SectionHeading index="03 /" title="Tools of the trade" note="A PRACTICAL TOOLKIT, ALWAYS EVOLVING" />
        <div className="skills-grid">
          {skillGroups.map(group => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="tag-list">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="journey section-shell" id="journey">
        <SectionHeading index="04 /" title="The journey so far" note="LEARNING BY BUILDING" />
        <div className="journey-grid">
          <div className="journey-label">EDUCATION</div>
          <div className="journey-content">
            <div className="journey-row">
              <div><h3>Bachelor of Technology</h3><p>S. G. Balekundri Institute of Technology · Belgaum, Karnataka</p></div>
              <span>GRADUATED</span>
            </div>
          </div>
          <div className="journey-label">CURRENT FOCUS</div>
          <div className="journey-content">
            <div className="journey-row">
              <div><h3>AI systems & product engineering</h3><p>Course RAG · AI tutoring · Evaluation & observability · Full-stack applications</p></div>
              <span>IN PROGRESS</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <p className="eyebrow">HAVE SOMETHING INTERESTING IN MIND?</p>
        <h2>Let's build<br /><span>something useful.</span></h2>
        <a className="button button-light" href="mailto:hello@praneetsavant.in">Get in touch <Arrow /></a>
        <div className="contact-socials">
          <a href="https://github.com/PraneetNS" target="_blank" rel="noreferrer">GITHUB <Arrow /></a>
          <a href="https://linkedin.com/in/praneetsavant" target="_blank" rel="noreferrer">LINKEDIN <Arrow /></a>
          <a href="mailto:hello@praneetsavant.in">EMAIL <Arrow /></a>
        </div>
      </section>

      <footer className="footer">
        <BrandLogo size={34} showText={false} />
        <span>DESIGNED & BUILT BY PRANEET SAVANT</span>
        <a href="#top">BACK TO TOP ↑</a>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  )
}
