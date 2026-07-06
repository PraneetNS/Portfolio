import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { experienceStore } from '@/store/experienceStore'
import { audioManager } from '@/audio/AudioManager'

export function useCinematicTimeline(onComplete?: () => void) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  const startTimeline = useCallback(() => {
    if (timelineRef.current) return

    experienceStore.beginCinematic()
    const u = experienceStore.sceneUniforms
    const p = experienceStore.postUniforms

    const tl = gsap.timeline({
      onComplete: () => {
        experienceStore.settle()
        onComplete?.()
      },
    })

    // 0.0–1.5s — darkness, ambience, ignition click
    tl.to(u, { uHeat: 0.05, duration: 0.5, ease: 'power2.in' }, 0)
    tl.call(() => audioManager.fadeIn('ambience', 2000), [], 0.2)
    tl.call(() => audioManager.play('ignition'), [], 0.5)

    // 1.5–3.0s — ember reveal "SOMETHING"
    tl.to(u, { uIgnitionProgress: 0.8, duration: 1.2, ease: 'power2.inOut' }, 1.5)
    tl.to(u, { uRevealLine1: 1.0, duration: 1.2, ease: 'power2.inOut' }, 1.5)
    tl.to(u, { uHeat: 0.35, duration: 1.2, ease: 'power1.inOut' }, 1.5)
    tl.to(u, { uEmberRate: 0.5, duration: 1.0, ease: 'power1.out' }, 1.8)

    // 3.0–4.5s — reveal "IS COOKING", controlled flames
    tl.to(u, { uRevealLine2: 1.0, duration: 1.2, ease: 'power2.inOut' }, 3.0)
    tl.to(u, { uFlameIntensity: 0.4, duration: 1.0, ease: 'power1.in' }, 3.2)
    tl.to(u, { uHeat: 0.55, duration: 1.2, ease: 'power1.inOut' }, 3.0)
    tl.to(u, { uSmokeOpacity: 0.12, duration: 1.0, ease: 'power1.in' }, 3.5)
    tl.call(() => audioManager.fadeIn('fire', 1500), [], 3.2)

    // 4.5–6.0s — camera push, distortion, shake
    tl.to(u, { uFlameIntensity: 0.65, duration: 1.2, ease: 'power1.in' }, 4.5)
    tl.to(u, { uTurbulence: 0.6, duration: 1.2, ease: 'power1.in' }, 4.5)
    tl.to(u, { uDistortionIntensity: 0.35, duration: 1.2, ease: 'power1.in' }, 4.5)
    tl.to(u, { uCameraShake: 0.15, duration: 1.2, ease: 'power1.in' }, 4.5)
    tl.to(p, { bloom: 0.55, duration: 1.2, ease: 'power1.in' }, 4.5)
    tl.to(u, { uEmberRate: 0.8, duration: 1.0, ease: 'power1.in' }, 4.5)

    // ~6.0s — voice cue 1, flame surge
    tl.call(() => audioManager.play('voiceCue1'), [], 6.0)
    tl.to(u, { uFlameIntensity: 0.9, duration: 0.4, ease: 'power2.out' }, 6.0)
    tl.to(u, { uTurbulence: 0.85, duration: 0.5, ease: 'power2.out' }, 6.0)
    tl.to(u, { uCameraShake: 0.35, duration: 0.3, ease: 'power2.out' }, 6.0)
    tl.to(u, { uCameraShake: 0.12, duration: 0.5, ease: 'power2.inOut' }, 6.3)
    tl.to(p, { bloom: 0.75, duration: 0.4, ease: 'power2.out' }, 6.0)
    tl.to(u, { uEmberRate: 1.2, duration: 0.5, ease: 'power2.out' }, 6.0)

    // ~7.5s — voice cue 2, full fire burst
    tl.call(() => {
      audioManager.play('voiceCue2')
      audioManager.play('explosion')
    }, [], 7.5)
    tl.to(u, { uFlameIntensity: 1.5, duration: 0.3, ease: 'power3.out' }, 7.5)
    tl.to(u, { uTurbulence: 1.2, duration: 0.4, ease: 'power3.out' }, 7.5)
    tl.to(u, { uDistortionIntensity: 0.7, duration: 0.3, ease: 'power3.out' }, 7.5)
    tl.to(u, { uCameraShake: 0.6, duration: 0.2, ease: 'power3.out' }, 7.5)
    tl.to(p, { bloom: 1.2, chromaticAberration: 0.004, duration: 0.2, ease: 'power3.out' }, 7.5)
    tl.to(u, { uEmberRate: 2.5, duration: 0.3, ease: 'power3.out' }, 7.5)

    // Burst settle start
    tl.to(u, { uFlameIntensity: 1.0, duration: 0.8, ease: 'power2.inOut' }, 8.0)
    tl.to(u, { uCameraShake: 0.08, duration: 0.6, ease: 'power2.inOut' }, 8.0)
    tl.to(p, { bloom: 0.65, chromaticAberration: 0, duration: 0.8, ease: 'power2.inOut' }, 8.0)

    // 9.0–12.0s — settle, reveal final interface
    tl.to(u, { uFlameIntensity: 0.35, duration: 2.0, ease: 'power2.inOut' }, 9.0)
    tl.to(u, { uTurbulence: 0.4, duration: 2.0, ease: 'power2.inOut' }, 9.0)
    tl.to(u, { uDistortionIntensity: 0.1, duration: 2.0, ease: 'power2.inOut' }, 9.0)
    tl.to(u, { uCameraShake: 0, duration: 1.5, ease: 'power2.inOut' }, 9.0)
    tl.to(u, { uHeat: 0.4, duration: 2.0, ease: 'power2.inOut' }, 9.0)
    tl.to(u, { uEmberRate: 0.4, duration: 2.0, ease: 'power2.inOut' }, 9.0)
    tl.to(u, { uSmokeOpacity: 0.06, duration: 2.0, ease: 'power2.inOut' }, 9.0)
    tl.to(p, { bloom: 0.45, duration: 2.0, ease: 'power2.inOut' }, 9.0)
    tl.to(u, { uIgnitionProgress: 1.0, duration: 1.0, ease: 'power1.inOut' }, 9.5)

    timelineRef.current = tl
    tl.play()
  }, [onComplete])

  return { startTimeline }
}
