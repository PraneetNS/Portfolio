import type { QualityLevel } from '@/config/qualityConfig'
import { qualityConfig } from '@/config/qualityConfig'

export function detectQualityLevel(): QualityLevel {
  if (qualityConfig.manualOverride) {
    return qualityConfig.manualOverride
  }

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  const cores = navigator.hardwareConcurrency ?? 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  const dpr = window.devicePixelRatio ?? 1

  if (isMobile || cores <= 4 || memory <= 4 || dpr > 2) {
    return 'low'
  }

  if (cores <= 8 || memory <= 8) {
    return 'medium'
  }

  return 'high'
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}
