import { useFrame } from '@react-three/fiber'
import { experienceStore } from '@/store/experienceStore'

/**
 * Dynamically updates Bloom intensity from the store each frame
 * without triggering React re-renders.
 */
export function BloomController() {

  useFrame(() => {
    // Bloom is controlled via postUniforms — read in PostProcessingEffects
    // This component ensures uBloomIntensity stays synced
    experienceStore.sceneUniforms.uBloomIntensity = experienceStore.postUniforms.bloom
  })

  return null
}
