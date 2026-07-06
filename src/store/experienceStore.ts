import type { ExperienceState, SceneUniforms, PostProcessingUniforms, DebugUniforms } from '@/types/experience'
import {
  defaultSceneUniforms,
  defaultPostUniforms,
  defaultDebugUniforms,
} from '@/types/experience'

type Listener = () => void

class ExperienceStore {
  private listeners = new Set<Listener>()
  private _state: ExperienceState = 'LOADING'
  private _assetsReady = false
  private _webglAvailable = true
  private _muted = false
  private _showKitchenMessage = false
  private _hasIgnited = false

  readonly sceneUniforms: SceneUniforms = defaultSceneUniforms()
  readonly postUniforms: PostProcessingUniforms = defaultPostUniforms()
  readonly debugUniforms: DebugUniforms = defaultDebugUniforms()

  get state() {
    return this._state
  }

  get assetsReady() {
    return this._assetsReady
  }

  get webglAvailable() {
    return this._webglAvailable
  }

  get muted() {
    return this._muted
  }

  get showKitchenMessage() {
    return this._showKitchenMessage
  }

  get hasIgnited() {
    return this._hasIgnited
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach((l) => l())
  }

  setState(state: ExperienceState) {
    if (this._state === state) return
    this._state = state
    this.notify()
  }

  setAssetsReady(ready: boolean) {
    this._assetsReady = ready
    this.notify()
  }

  setWebglAvailable(available: boolean) {
    this._webglAvailable = available
    if (!available) {
      this._state = 'ERROR'
    }
    this.notify()
  }

  setMuted(muted: boolean) {
    this._muted = muted
    this.notify()
  }

  toggleMute() {
    this.setMuted(!this._muted)
  }

  setShowKitchenMessage(show: boolean) {
    this._showKitchenMessage = show
    this.notify()
  }

  ignite(): boolean {
    if (this._hasIgnited || this._state !== 'READY') return false
    this._hasIgnited = true
    this._state = 'IGNITING'
    this.notify()
    return true
  }

  beginCinematic() {
    this._state = 'CINEMATIC'
    this.notify()
  }

  settle() {
    this._state = 'SETTLED'
    this.notify()
  }

  setReducedMotion() {
    this._state = 'REDUCED_MOTION'
    this.notify()
  }
}

export const experienceStore = new ExperienceStore()

export function useExperienceStore() {
  return experienceStore
}
