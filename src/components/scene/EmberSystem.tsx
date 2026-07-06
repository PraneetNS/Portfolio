import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { emberVertexShader, emberFragmentShader } from '@/shaders/effects/ember'
import { experienceStore } from '@/store/experienceStore'
import type { QualitySettings } from '@/config/qualityConfig'

interface EmberSystemProps {
  quality: QualitySettings
}

export function EmberSystem({ quality }: EmberSystemProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const n = Math.floor(quality.emberCount * experienceStore.debugUniforms.particleCount)
    const positions = new Float32Array(n * 3)
    const sizes = new Float32Array(n)
    const brightness = new Float32Array(n)
    const lives = new Float32Array(n)
    const seeds = new Float32Array(n)

    for (let i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4.5
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5 - 0.3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8 + 0.2
      sizes[i] = 1.5 + Math.random() * 3.5
      brightness[i] = 0.3 + Math.random() * 0.7
      lives[i] = Math.random()
      seeds[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aBrightness', new THREE.BufferAttribute(brightness, 1))
    geo.setAttribute('aLife', new THREE.BufferAttribute(lives, 1))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

    return geo
  }, [quality.emberCount])

  useFrame((state) => {
    if (!materialRef.current) return
    const u = experienceStore.sceneUniforms
    const d = experienceStore.debugUniforms
    const burst = u.uFlameIntensity > 1.0 ? (u.uFlameIntensity - 1.0) : 0

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    materialRef.current.uniforms.uRate.value = u.uEmberRate * d.particleCount
    materialRef.current.uniforms.uBurst.value = burst

    if (pointsRef.current) {
      pointsRef.current.visible = u.uEmberRate > 0.05 || experienceStore.state === 'READY'
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={emberVertexShader}
        fragmentShader={emberFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uRate: { value: 0.2 },
          uBurst: { value: 0 },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
