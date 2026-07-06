import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { smokeVertexShader, smokeFragmentShader } from '@/shaders/effects/smoke'
import { experienceStore } from '@/store/experienceStore'
import type { QualitySettings } from '@/config/qualityConfig'

interface SmokeSystemProps {
  quality: QualitySettings
}

export function SmokeSystem({ quality }: SmokeSystemProps) {
  const groupRef = useRef<THREE.Group>(null)
  const materialsRef = useRef<THREE.ShaderMaterial[]>([])

  const planes = useMemo(() => {
    const configs = []
    for (let i = 0; i < quality.smokePlanes; i++) {
      configs.push({
        position: [
          (Math.random() - 0.5) * 1.5,
          0.5 + i * 0.3,
          -0.5 - i * 0.1,
        ] as [number, number, number],
        scale: [2.5 + Math.random(), 1.5 + Math.random() * 0.5, 1] as [
          number,
          number,
          number,
        ],
        rotation: Math.random() * Math.PI * 0.1,
      })
    }
    return configs
  }, [quality.smokePlanes])

  useFrame((state) => {
    const u = experienceStore.sceneUniforms
    const d = experienceStore.debugUniforms
    const opacity = u.uSmokeOpacity * d.smokeOpacity

    materialsRef.current.forEach((mat) => {
      mat.uniforms.uTime.value = state.clock.elapsedTime
      mat.uniforms.uOpacity.value = opacity
      mat.uniforms.uTurbulence.value = u.uTurbulence
    })

    if (groupRef.current) {
      groupRef.current.visible = opacity > 0.005
    }
  })

  return (
    <group ref={groupRef}>
      {planes.map((cfg, i) => (
        <mesh
          key={i}
          position={cfg.position}
          scale={cfg.scale}
          rotation={[0, 0, cfg.rotation]}
        >
          <planeGeometry args={[1, 1]} />
          <shaderMaterial
            ref={(ref) => {
              if (ref) materialsRef.current[i] = ref
            }}
            vertexShader={smokeVertexShader}
            fragmentShader={smokeFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uOpacity: { value: 0 },
              uTurbulence: { value: 0.3 },
            }}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}
