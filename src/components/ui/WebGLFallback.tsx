import { siteConfig } from '@/config/siteConfig'
import styles from '@/styles/Fallback.module.css'

export function WebGLFallback() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.label}>{siteConfig.developerName}</p>
        <h1 className={styles.headline}>{siteConfig.headline}</h1>
        <p className={styles.subheadline}>{siteConfig.subheadline}</p>
        <p className={styles.status}>{siteConfig.status}</p>
        <nav className={styles.social} aria-label="Social links">
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer">
            X
          </a>
          <a href={`mailto:${siteConfig.email}`}>Email</a>
        </nav>
        <p className={styles.note}>
          WebGL is unavailable in your browser. This is a static fallback.
        </p>
      </div>
    </div>
  )
}
