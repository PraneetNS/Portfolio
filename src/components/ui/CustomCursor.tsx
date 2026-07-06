import { useEffect, useRef, useCallback } from 'react'
import { isTouchDevice } from '@/utils/math'
import { siteConfig } from '@/config/siteConfig'
import styles from '@/styles/CustomCursor.module.css'

interface CustomCursorProps {
  active: boolean
}

export function CustomCursor({ active }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<{ x: number; y: number; life: number; size: number }[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)

  const animate = useCallback(() => {
    const canvas = trailRef.current
    const cursor = cursorRef.current
    if (!canvas || !cursor) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Add trail particle
    if (siteConfig.featureFlags.enableCursorTrail) {
      particlesRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        life: 1,
        size: 2 + Math.random() * 2,
      })
    }

    particlesRef.current = particlesRef.current.filter((p) => {
      p.life -= 0.03
      if (p.life <= 0) return false

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 120, 40, ${p.life * 0.4})`
      ctx.fill()
      return true
    })

    if (particlesRef.current.length > 40) {
      particlesRef.current = particlesRef.current.slice(-40)
    }

    cursor.style.transform = `translate(${mouseRef.current.x}px, ${mouseRef.current.y}px)`

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!active || isTouchDevice()) return

    document.body.classList.add('custom-cursor-active')

    const canvas = trailRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('resize', handleResize)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [active, animate])

  if (!active || isTouchDevice()) return null

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />
      <canvas ref={trailRef} className={styles.trail} aria-hidden="true" />
    </>
  )
}
