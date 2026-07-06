import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { experienceStore } from '@/store/experienceStore'
import { audioManager } from '@/audio/AudioManager'
import { useCinematicTimeline } from '@/hooks/useCinematicTimeline'
import { useMouseHeat } from '@/hooks/useMouseHeat'
import { useQualityLevel } from '@/hooks/useQualityLevel'
import { getAdaptiveDpr } from '@/utils/quality'
import { AtmosphericBackground } from './AtmosphericBackground'
import { FireTypography } from './FireTypography'
import { FireSystem } from './FireSystem'
import { EmberSystem } from './EmberSystem'
import { SmokeSystem } from './SmokeSystem'
import { CinematicCamera } from './CinematicCamera'
import { PostProcessingEffects } from './PostProcessingEffects'
import { BloomController } from './BloomController'

interface ExperienceProps {
  onCinematicComplete?: () => void
}

function SceneContent({ mouseRef }: { mouseRef: React.RefObject<[number, number]> }) {
  const { settings } = useQualityLevel()

  return (
    <>
      <color attach="background" args={['#030201']} />
      <fog attach="fog" args={['#030201', 8, 20]} />
      <CinematicCamera mouseRef={mouseRef} />
      <AtmosphericBackground />
      <FireTypography />
      <FireSystem quality={settings} />
      <EmberSystem quality={settings} />
      <SmokeSystem quality={settings} />
      <PostProcessingEffects quality={settings} />
      <BloomController />
    </>
  )
}

function SceneUpdater({
  updateMouse,
  mouseRef,
}: {
  updateMouse: () => number
  mouseRef: React.RefObject<[number, number]>
}) {
  useFrame(() => {
    experienceStore.sceneUniforms.localMouseHeat = updateMouse()
    if (mouseRef.current) {
      mouseRef.current = experienceStore.sceneUniforms.uMouse
    }
    audioManager.updateAnalyser()
    experienceStore.sceneUniforms.uAudioIntensity = audioManager.audioIntensity
  })
  return null
}

function ExperienceCanvas({
  onCinematicComplete,
}: {
  onCinematicComplete?: () => void
}) {
  const { startTimeline } = useCinematicTimeline(onCinematicComplete)
  const startedRef = useRef(false)
  const mouseRef = useRef<[number, number]>([0.5, 0.5])
  const { update: updateMouse } = useMouseHeat()

  useEffect(() => {
    const unsubscribe = experienceStore.subscribe(() => {
      if (experienceStore.state === 'IGNITING' && !startedRef.current) {
        startedRef.current = true
        startTimeline()
      }
    })
    return () => {
      unsubscribe()
    }
  }, [startTimeline])

  return (
    <>
      <SceneUpdater updateMouse={updateMouse} mouseRef={mouseRef} />
      <SceneContent mouseRef={mouseRef} />
    </>
  )
}

export function Experience({ onCinematicComplete }: ExperienceProps) {
  const { level, settings } = useQualityLevel()
  const dpr = getAdaptiveDpr(level)

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
      gl={{
        antialias: settings.dpr[1] > 1,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.1
        gl.setClearColor('#030201')
      }}
      style={{ position: 'fixed', inset: 0 }}
    >
      <Suspense fallback={null}>
        <ExperienceCanvas onCinematicComplete={onCinematicComplete} />
      </Suspense>
    </Canvas>
  )
}
