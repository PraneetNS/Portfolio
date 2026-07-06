import { useEffect, useRef } from 'react'
import { experienceStore } from '@/store/experienceStore'
import { lerp } from '@/utils/math'

export function useMouseHeat() {
  const localHeatRef = useRef(0)
  const targetHeatRef = useRef(0)
  const mouseUvRef = useRef<[number, number]>([0.5, 0.5])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = 1.0 - e.clientY / window.innerHeight
      mouseUvRef.current = [x, y]

      // Map screen position to approximate text UV space
      const textCenterX = 0.5
      const textCenterY = 0.55
      const dist = Math.hypot(x - textCenterX, y - textCenterY)

      if (dist < 0.35 && experienceStore.state !== 'LOADING') {
        targetHeatRef.current = Math.max(0, 1.0 - dist / 0.35)
      } else {
        targetHeatRef.current = 0
      }
    }

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      const touch = e.touches[0]
      const x = touch.clientX / window.innerWidth
      const y = 1.0 - touch.clientY / window.innerHeight
      mouseUvRef.current = [x, y]
      targetHeatRef.current = 0.8
      setTimeout(() => {
        targetHeatRef.current = 0
      }, 600)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchstart', handleTouch, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [])

  const update = () => {
    localHeatRef.current = lerp(localHeatRef.current, targetHeatRef.current, 0.06)
    experienceStore.sceneUniforms.uMouse = mouseUvRef.current
    return localHeatRef.current
  }

  return { update, localHeatRef, mouseUvRef }
}

export type MouseHeatHandle = ReturnType<typeof useMouseHeat>
