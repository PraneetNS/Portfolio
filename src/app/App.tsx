import { useEffect, useCallback, useState } from 'react'
import { experienceStore } from '@/store/experienceStore'
import { audioManager } from '@/audio/AudioManager'
import { preloadAssets } from '@/utils/preloadAssets'
import { prefersReducedMotion } from '@/utils/math'
import { siteConfig } from '@/config/siteConfig'
import { useExperienceState, useExperienceSelector } from '@/hooks/useExperienceState'
import { useVisibilityPause } from '@/hooks/useVisibilityPause'
import { Experience } from '@/components/scene/Experience'
import { InitialScreen } from '@/components/ui/InitialScreen'
import { FinalInterface } from '@/components/ui/FinalInterface'
import { LoadingIndicator } from '@/components/ui/LoadingIndicator'
import { MuteControl } from '@/components/ui/MuteControl'
import { WebGLFallback } from '@/components/ui/WebGLFallback'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { KitchenMessage } from '@/components/ui/KitchenMessage'
import { DebugPanel } from '@/components/ui/DebugPanel'

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function App() {
  const state = useExperienceState()
  const muted = useExperienceSelector(() => experienceStore.muted)
  const showKitchen = useExperienceSelector(() => experienceStore.showKitchenMessage)
  const [showFinal, setShowFinal] = useState(false)
  const [webglOk] = useState(checkWebGL)

  useEffect(() => {
    if (!webglOk) {
      experienceStore.setWebglAvailable(false)
      return
    }

    audioManager.init()

    preloadAssets()
      .then(() => {
        if (prefersReducedMotion()) {
          experienceStore.setReducedMotion()
          experienceStore.setAssetsReady(true)
          setShowFinal(true)
        } else {
          experienceStore.setAssetsReady(true)
          experienceStore.setState('READY')
        }
      })
      .catch(() => {
        experienceStore.setAssetsReady(true)
        experienceStore.setState('READY')
      })
  }, [webglOk])

  const handleHidden = useCallback(() => {
    import('howler').then(({ Howler }) => Howler.volume(0))
  }, [])

  const handleVisible = useCallback(() => {
    if (!experienceStore.muted) {
      import('howler').then(({ Howler }) => Howler.volume(1))
    }
  }, [])

  useVisibilityPause(handleHidden, handleVisible)

  const handleIgnite = async () => {
    if (!experienceStore.ignite()) return
    await audioManager.unlock()
    audioManager.setMuted(experienceStore.muted)
  }

  const handleCinematicComplete = useCallback(() => {
    setShowFinal(true)
  }, [])

  const handleEnterKitchen = () => {
    const { enterKitchen } = siteConfig
    if (enterKitchen.mode === 'navigate') {
      window.location.href = enterKitchen.navigateTo
    } else {
      experienceStore.setShowKitchenMessage(true)
      setTimeout(() => experienceStore.setShowKitchenMessage(false), 3500)
    }
  }

  const handleToggleMute = () => {
    experienceStore.toggleMute()
    audioManager.setMuted(experienceStore.muted)
  }

  if (!webglOk || state === 'ERROR') {
    return <WebGLFallback />
  }

  const showInitial =
    state === 'READY' || state === 'LOADING' || state === 'IGNITING'
  const showWebGL = true
  const cursorActive =
    state === 'CINEMATIC' || state === 'SETTLED' || state === 'IGNITING' || state === 'READY'
  const showMute = state === 'CINEMATIC' || state === 'SETTLED'

  return (
    <>
      {showWebGL && <Experience onCinematicComplete={handleCinematicComplete} />}

      <LoadingIndicator visible={state === 'LOADING'} />
      <InitialScreen
        visible={showInitial}
        onIgnite={handleIgnite}
        disabled={!experienceStore.assetsReady || state === 'IGNITING'}
      />
      <FinalInterface
        visible={showFinal || state === 'SETTLED' || state === 'REDUCED_MOTION'}
        onEnterKitchen={handleEnterKitchen}
      />
      <KitchenMessage visible={showKitchen} />
      <MuteControl visible={showMute} muted={muted} onToggle={handleToggleMute} />
      <CustomCursor active={cursorActive} />
      {siteConfig.featureFlags.enableDebugPanel && <DebugPanel />}
    </>
  )
}
