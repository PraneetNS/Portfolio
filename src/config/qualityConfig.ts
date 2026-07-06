export type QualityLevel = 'high' | 'medium' | 'low'

export const qualityConfig = {
  /** Set to null for auto-detection */
  manualOverride: null as QualityLevel | null,

  high: {
    dpr: [1, 2] as [number, number],
    emberCount: 800,
    smokePlanes: 6,
    bloomIntensity: 0.85,
    heatDistortion: true,
    postProcessing: true,
    fireLayers: 3,
    cursorTrailParticles: 40,
  },
  medium: {
    dpr: [1, 1.5] as [number, number],
    emberCount: 400,
    smokePlanes: 3,
    bloomIntensity: 0.6,
    heatDistortion: true,
    postProcessing: true,
    fireLayers: 2,
    cursorTrailParticles: 20,
  },
  low: {
    dpr: [1, 1.25] as [number, number],
    emberCount: 150,
    smokePlanes: 1,
    bloomIntensity: 0.4,
    heatDistortion: false,
    postProcessing: true,
    fireLayers: 1,
    cursorTrailParticles: 0,
  },
} as const

export type QualitySettings = (typeof qualityConfig)[QualityLevel]
