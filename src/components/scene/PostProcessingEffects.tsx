import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
} from '@react-three/postprocessing'
import { BlendFunction, BloomEffect } from 'postprocessing'
import { Vector2 } from 'three'
import { HeatDistortionEffect } from '@/shaders/heatDistortion/HeatDistortionEffect'
import { experienceStore } from '@/store/experienceStore'
import type { QualitySettings } from '@/config/qualityConfig'

interface PostProcessingEffectsProps {
  quality: QualitySettings
}

export function PostProcessingEffects({ quality }: PostProcessingEffectsProps) {
  const heatEffect = useMemo(() => new HeatDistortionEffect(), [])
  const chromaticOffset = useRef(new Vector2(0, 0))
  const bloomEffectRef = useRef<BloomEffect | null>(null)

  useFrame((state) => {
    const p = experienceStore.postUniforms
    const u = experienceStore.sceneUniforms
    const d = experienceStore.debugUniforms

    if (bloomEffectRef.current) {
      bloomEffectRef.current.intensity = p.bloom * quality.bloomIntensity
    }

    const distortionIntensity =
      (u.uDistortionIntensity + d.heatDistortion) * (quality.heatDistortion ? 1 : 0)

    heatEffect.uniforms.get('uIntensity')!.value = distortionIntensity
    heatEffect.uniforms.get('uTime')!.value = state.clock.elapsedTime

    const ca = p.chromaticAberration
    chromaticOffset.current.set(ca, ca)
  })

  if (!quality.postProcessing) return null

  return (
    <EffectComposer multisampling={quality.dpr[1] > 1.5 ? 4 : 0}>
      <primitive object={heatEffect} />
      <Bloom
        ref={(effect: any) => {
          bloomEffectRef.current = effect as unknown as BloomEffect
        }}
        intensity={0.3}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette offset={0.3} darkness={0.65} blendFunction={BlendFunction.NORMAL} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.04} />
      <ChromaticAberration
        offset={chromaticOffset.current}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  )
}
