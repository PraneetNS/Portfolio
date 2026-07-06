import { siteConfig } from '@/config/siteConfig'
import styles from '@/styles/FinalInterface.module.css'

interface FinalInterfaceProps {
  visible: boolean
  onEnterKitchen: () => void
}

export function FinalInterface({ visible, onEnterKitchen }: FinalInterfaceProps) {
  return (
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <div className={styles.content}>
        <h1 className={styles.headline}>{siteConfig.headline}</h1>
        <p className={styles.name}>{siteConfig.developerName}</p>
        <p className={styles.subheadline}>{siteConfig.subheadline}</p>
        <p className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          {siteConfig.status}
        </p>

        <nav className={styles.social} aria-label="Social links">
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
            LINKEDIN
          </a>
          <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer">
            X
          </a>
          <a href={`mailto:${siteConfig.email}`}>EMAIL</a>
        </nav>

        <button
          className={styles.enterButton}
          onClick={onEnterKitchen}
          aria-label="Enter the kitchen"
        >
          [ ENTER THE KITCHEN ]
        </button>
      </div>

      {/* Semantic HTML for accessibility — visually hidden */}
      <div className="sr-only">
        <h1>{siteConfig.headline}</h1>
        <p>{siteConfig.developerName}</p>
        <p>{siteConfig.subheadline}</p>
        <p>Status: {siteConfig.status}</p>
      </div>
    </div>
  )
}
