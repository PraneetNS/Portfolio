import { useEffect, useState } from 'react'
import { detectQualityLevel } from '@/utils/math'
import { getQualitySettings } from '@/utils/quality'
import type { QualityLevel } from '@/config/qualityConfig'

export function useQualityLevel() {
  const [level] = useState<QualityLevel>(() => detectQualityLevel())
  const { settings } = getQualitySettings(level)
  return { level, settings }
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
