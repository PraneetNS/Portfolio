import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import type { Font } from 'three/addons/loaders/FontLoader.js'
import { typographyVertexShader, typographyFragmentShader } from '@/shaders/typography'
import { getFont } from '@/utils/preloadAssets'
import { experienceStore } from '@/store/experienceStore'

function createTextMesh(
  text: string,
  font: Font,
  size: number,
  yOffset: number,
): THREE.Mesh {
  const geometry = new TextGeometry(text, {
    font,
    size,
    depth: 0.08,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.008,
    bevelSegments: 3,
  })
  geometry.computeBoundingBox()
  geometry.center()
  geometry.translate(0, yOffset, 0)

  const material = new THREE.ShaderMaterial({
    vertexShader: typographyVertexShader,
    fragmentShader: typographyFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uHeat: { value: 0 },
      uIgnitionProgress: { value: 0 },
      uFlameIntensity: { value: 0 },
      uTurbulence: { value: 0.3 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAudioIntensity: { value: 0 },
      uReveal: { value: 0 },
      uLocalHeat: { value: 0 },
    },
    transparent: true,
    side: THREE.DoubleSide,
  })

  return new THREE.Mesh(geometry, material)
}

export function FireTypography() {
  const groupRef = useRef<THREE.Group>(null)
  const line1Ref = useRef<THREE.Mesh | null>(null)
  const line2Ref = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    const font = getFont()
    if (!font || !groupRef.current) return

    const line1 = createTextMesh('SOMETHING', font, 0.42, 0.35)
    const line2 = createTextMesh('IS COOKING', font, 0.42, -0.35)

    line1Ref.current = line1
    line2Ref.current = line2
    const currentGroup = groupRef.current
    currentGroup.add(line1, line2)

    return () => {
      currentGroup.remove(line1, line2)
      line1.geometry.dispose()
      line2.geometry.dispose()
      ;(line1.material as THREE.Material).dispose()
      ;(line2.material as THREE.Material).dispose()
    }
  }, [])

  const syncUniforms = (
    material: THREE.ShaderMaterial,
    reveal: number,
    localHeat: number,
  ) => {
    const u = experienceStore.sceneUniforms
    const d = experienceStore.debugUniforms
    material.uniforms.uTime.value = u.uTime
    material.uniforms.uHeat.value = u.uHeat * (1 + d.heat) 
    material.uniforms.uIgnitionProgress.value = u.uIgnitionProgress
    material.uniforms.uFlameIntensity.value = u.uFlameIntensity * d.fireIntensity
    material.uniforms.uTurbulence.value = u.uTurbulence * d.turbulence
    material.uniforms.uMouse.value.set(u.uMouse[0], u.uMouse[1])
    material.uniforms.uAudioIntensity.value = u.uAudioIntensity
    material.uniforms.uReveal.value = reveal
    material.uniforms.uLocalHeat.value = localHeat
  }

  useFrame(() => {
    const u = experienceStore.sceneUniforms
    const localHeat = u.localMouseHeat

    if (line1Ref.current) {
      syncUniforms(
        line1Ref.current.material as THREE.ShaderMaterial,
        u.uRevealLine1,
        localHeat,
      )
    }
    if (line2Ref.current) {
      syncUniforms(
        line2Ref.current.material as THREE.ShaderMaterial,
        u.uRevealLine2,
        localHeat * 0.7,
      )
    }
  })

  return <group ref={groupRef} position={[0, 0, 0]} />
}
