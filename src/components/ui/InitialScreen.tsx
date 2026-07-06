import { siteConfig } from '@/config/siteConfig'
import styles from '@/styles/InitialScreen.module.css'

interface InitialScreenProps {
  visible: boolean
  onIgnite: () => void
  disabled: boolean
}

export function InitialScreen({ visible, onIgnite, disabled }: InitialScreenProps) {
  if (!visible) return null

  return (
    <div className={styles.overlay} aria-hidden={!visible}>
      <div className={styles.content}>
        <p className={styles.presents}>{siteConfig.developerName} PRESENTS</p>
        <h1 className={styles.headline}>{siteConfig.headline}</h1>
        <button
          className={styles.igniteButton}
          onClick={onIgnite}
          disabled={disabled}
          aria-label="Ignite the experience"
        >
          [ IGNITE ]
        </button>
      </div>
    </div>
  )
}
