import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { atmosphereVertexShader, atmosphereFragmentShader } from '@/shaders/effects/atmosphere'
import { experienceStore } from '@/store/experienceStore'

export function AtmosphericBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1 },
    }),
    [],
  )

  useFrame((state) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    materialRef.current.uniforms.uIntensity.value =
      experienceStore.state === 'LOADING' || experienceStore.state === 'READY' ? 1.2 : 0.8
  })

  return (
    <mesh renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}
