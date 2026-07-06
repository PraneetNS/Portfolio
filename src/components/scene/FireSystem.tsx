import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { firePlaneVertexShader, firePlaneFragmentShader } from '@/shaders/fire'
import { experienceStore } from '@/store/experienceStore'
import type { QualitySettings } from '@/config/qualityConfig'

interface FireSystemProps {
  quality: QualitySettings
}

export function FireSystem({ quality }: FireSystemProps) {
  const groupRef = useRef<THREE.Group>(null)
  const materialsRef = useRef<THREE.ShaderMaterial[]>([])

  const planes = useMemo(() => {
    const configs = []
    const count = quality.fireLayers
    for (let i = 0; i < count; i++) {
      configs.push({
        position: [0, -0.1 + i * 0.05, 0.15 + i * 0.02] as [number, number, number],
        scale: [3.8 - i * 0.2, 1.8 + i * 0.3, 1] as [number, number, number],
        origin: [0.5, 0.1 + i * 0.05] as [number, number],
      })
    }
    return configs
  }, [quality.fireLayers])

  useFrame((state) => {
    const u = experienceStore.sceneUniforms
    const d = experienceStore.debugUniforms
    const burst = u.uFlameIntensity > 1.0 ? (u.uFlameIntensity - 1.0) * 2.0 : 0

    materialsRef.current.forEach((mat) => {
      mat.uniforms.uTime.value = state.clock.elapsedTime
      mat.uniforms.uTurbulence.value = u.uTurbulence * d.turbulence
      mat.uniforms.uIntensity.value = u.uFlameIntensity * d.fireIntensity
      mat.uniforms.uBurst.value = burst
    })

    if (groupRef.current) {
      groupRef.current.visible = u.uFlameIntensity > 0.01
    }
  })

  return (
    <group ref={groupRef}>
      {planes.map((cfg, i) => (
        <mesh key={i} position={cfg.position} scale={cfg.scale}>
          <planeGeometry args={[1, 1, 1, 1]} />
          <shaderMaterial
            ref={(ref) => {
              if (ref) materialsRef.current[i] = ref
            }}
            vertexShader={firePlaneVertexShader}
            fragmentShader={firePlaneFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uTurbulence: { value: 0.3 },
              uIntensity: { value: 0 },
              uBurst: { value: 0 },
              uOrigin: { value: new THREE.Vector2(...cfg.origin) },
            }}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}
