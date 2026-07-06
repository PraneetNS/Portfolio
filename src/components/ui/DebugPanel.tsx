import { useControls } from 'leva'
import { experienceStore } from '@/store/experienceStore'

export function DebugPanel() {
  useControls('Fire', {
    fireIntensity: {
      value: 1,
      min: 0,
      max: 3,
      onChange: (v) => {
        experienceStore.debugUniforms.fireIntensity = v
      },
    },
    heat: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (v) => {
        experienceStore.debugUniforms.heat = v
      },
    },
    turbulence: {
      value: 0.3,
      min: 0,
      max: 2,
      onChange: (v) => {
        experienceStore.debugUniforms.turbulence = v
      },
    },
  })

  useControls('Post Processing', {
    bloom: {
      value: 0.3,
      min: 0,
      max: 2,
      onChange: (v) => {
        experienceStore.debugUniforms.bloom = v
        experienceStore.postUniforms.bloom = v
      },
    },
    heatDistortion: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (v) => {
        experienceStore.debugUniforms.heatDistortion = v
      },
    },
  })

  useControls('Particles', {
    particleCount: {
      value: 1,
      min: 0.1,
      max: 2,
      onChange: (v) => {
        experienceStore.debugUniforms.particleCount = v
      },
    },
    smokeOpacity: {
      value: 0.15,
      min: 0,
      max: 1,
      onChange: (v) => {
        experienceStore.debugUniforms.smokeOpacity = v
      },
    },
    cameraShake: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (v) => {
        experienceStore.debugUniforms.cameraShake = v
      },
    },
  })

  return null
}
