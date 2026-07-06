import styles from '@/styles/LoadingIndicator.module.css'

interface LoadingIndicatorProps {
  visible: boolean
}

export function LoadingIndicator({ visible }: LoadingIndicatorProps) {
  if (!visible) return null

  return (
    <div className={styles.container} role="status" aria-label="Loading experience">
      <div className={styles.ember} />
      <span className={styles.text}>Preparing the kitchen</span>
    </div>
  )
}
