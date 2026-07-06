import { siteConfig } from '@/config/siteConfig'
import styles from '@/styles/KitchenMessage.module.css'

interface KitchenMessageProps {
  visible: boolean
}

export function KitchenMessage({ visible }: KitchenMessageProps) {
  if (!visible) return null

  return (
    <div className={styles.overlay} role="alert">
      <p className={styles.message}>{siteConfig.enterKitchen.message}</p>
    </div>
  )
}
