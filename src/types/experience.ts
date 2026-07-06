export type ExperienceState =
  | 'LOADING'
  | 'READY'
  | 'IGNITING'
  | 'CINEMATIC'
  | 'SETTLED'
  | 'REDUCED_MOTION'
  | 'ERROR'

export interface SceneUniforms {
  uTime: number
  uHeat: number
  uIgnitionProgress: number
  uFlameIntensity: number
  uTurbulence: number
  uMouse: [number, number]
  uAudioIntensity: number
  uRevealLine1: number
  uRevealLine2: number
  uBloomIntensity: number
  uDistortionIntensity: number
  uCameraShake: number
  uEmberRate: number
  uSmokeOpacity: number
  localMouseHeat: number
}

export interface PostProcessingUniforms {
  bloom: number
  vignette: number
  noise: number
  chromaticAberration: number
}

export interface DebugUniforms {
  fireIntensity: number
  heat: number
  turbulence: number
  bloom: number
  particleCount: number
  smokeOpacity: number
  cameraShake: number
  heatDistortion: number
}

export const defaultSceneUniforms = (): SceneUniforms => ({
  uTime: 0,
  uHeat: 0,
  uIgnitionProgress: 0,
  uFlameIntensity: 0,
  uTurbulence: 0.3,
  uMouse: [0, 0],
  uAudioIntensity: 0,
  uRevealLine1: 0,
  uRevealLine2: 0,
  uBloomIntensity: 0.3,
  uDistortionIntensity: 0,
  uCameraShake: 0,
  uEmberRate: 0.2,
  uSmokeOpacity: 0,
  localMouseHeat: 0,
})

export const defaultPostUniforms = (): PostProcessingUniforms => ({
  bloom: 0.3,
  vignette: 0.65,
  noise: 0.04,
  chromaticAberration: 0,
})

export const defaultDebugUniforms = (): DebugUniforms => ({
  fireIntensity: 1,
  heat: 0,
  turbulence: 0.3,
  bloom: 0.3,
  particleCount: 1,
  smokeOpacity: 0.15,
  cameraShake: 0,
  heatDistortion: 0,
})
