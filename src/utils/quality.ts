import type { QualityLevel } from '@/config/qualityConfig'
import { qualityConfig } from '@/config/qualityConfig'
import { detectQualityLevel } from '@/utils/math'

export function getQualitySettings(level?: QualityLevel) {
  const quality = level ?? detectQualityLevel()
  return { level: quality, settings: qualityConfig[quality] }
}

export function getAdaptiveDpr(level?: QualityLevel): [number, number] {
  return getQualitySettings(level).settings.dpr
}
