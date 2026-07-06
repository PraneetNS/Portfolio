import styles from '@/styles/MuteControl.module.css'

interface MuteControlProps {
  visible: boolean
  muted: boolean
  onToggle: () => void
}

export function MuteControl({ visible, muted, onToggle }: MuteControlProps) {
  if (!visible) return null

  return (
    <button
      className={styles.button}
      onClick={onToggle}
      aria-label={muted ? 'Unmute audio' : 'Mute audio'}
      aria-pressed={muted}
    >
      {muted ? 'UNMUTE' : 'MUTE'}
    </button>
  )
}
