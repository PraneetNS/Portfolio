import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { experienceStore } from '@/store/experienceStore'
import { lerp } from '@/utils/math'

interface CinematicCameraProps {
  mouseRef: React.RefObject<[number, number]>
}

export function CinematicCamera({ mouseRef }: CinematicCameraProps) {
  const { camera } = useThree()
  const shakeRef = useRef({ x: 0, y: 0 })
  const baseZ = useRef(6)
  const targetZ = useRef(6)
  const settled = useRef(false)

  useFrame((state) => {
    const u = experienceStore.sceneUniforms
    const d = experienceStore.debugUniforms
    u.uTime = state.clock.elapsedTime

    const shakeIntensity = (u.uCameraShake + d.cameraShake) * 0.08

    // Procedural shake
    if (shakeIntensity > 0.001) {
      shakeRef.current.x = (Math.random() - 0.5) * shakeIntensity
      shakeRef.current.y = (Math.random() - 0.5) * shakeIntensity
    } else {
      shakeRef.current.x = lerp(shakeRef.current.x, 0, 0.1)
      shakeRef.current.y = lerp(shakeRef.current.y, 0, 0.1)
    }

    // Cinematic push-in during 4.5-6s (z: 6 -> 4.2)
    if (experienceStore.state === 'CINEMATIC') {
      const elapsed = state.clock.elapsedTime
      if (elapsed > 4.5 && elapsed < 7.5) {
        targetZ.current = 4.2
      } else if (elapsed >= 9.0) {
        targetZ.current = 5.0
      }
    } else if (experienceStore.state === 'SETTLED') {
      targetZ.current = 5.2
      settled.current = true
    }

    baseZ.current = lerp(baseZ.current, targetZ.current, 0.02)

    // Parallax after settled
    let parallaxX = 0
    let parallaxY = 0
    if (settled.current && mouseRef.current) {
      parallaxX = (mouseRef.current[0] - 0.5) * 0.15
      parallaxY = (mouseRef.current[1] - 0.5) * 0.08
    }

    // Subtle drift
    const drift = Math.sin(state.clock.elapsedTime * 0.3) * 0.02

    camera.position.x = shakeRef.current.x + parallaxX + drift
    camera.position.y = shakeRef.current.y + parallaxY
    camera.position.z = baseZ.current
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  })

  return null
}
