import { Howl } from 'howler'
import { audioConfig } from '@/config/audioConfig'

type SoundKey = 'ambience' | 'ignition' | 'fire' | 'explosion' | 'voiceCue1' | 'voiceCue2'

interface SoundChannel {
  howl: Howl | null
  loaded: boolean
  failed: boolean
}

class AudioManager {
  private channels: Record<SoundKey, SoundChannel> = {
    ambience: { howl: null, loaded: false, failed: false },
    ignition: { howl: null, loaded: false, failed: false },
    fire: { howl: null, loaded: false, failed: false },
    explosion: { howl: null, loaded: false, failed: false },
    voiceCue1: { howl: null, loaded: false, failed: false },
    voiceCue2: { howl: null, loaded: false, failed: false },
  }

  private unlocked = false
  private muted = false
  private analyser: AnalyserNode | null = null
  private frequencyData = new Uint8Array(128)
  audioIntensity = 0

  init() {
    const keys = Object.keys(this.channels) as SoundKey[]
    for (const key of keys) {
      const config = audioConfig[key]
      try {
        const howl = new Howl({
          src: [...config.src],
          volume: config.volume * audioConfig.masterVolume,
          loop: 'loop' in config ? config.loop : false,
          preload: true,
          html5: key === 'ambience' || key === 'fire',
          onload: () => {
            this.channels[key].loaded = true
          },
          onloaderror: () => {
            this.channels[key].failed = true
            console.warn(`[AudioManager] Failed to load: ${config.src.join(', ')}`)
          },
        })
        this.channels[key].howl = howl
      } catch {
        this.channels[key].failed = true
      }
    }
  }

  async unlock(): Promise<boolean> {
    if (this.unlocked) return true

    try {
      const ctx = Howler.ctx as AudioContext
      if (ctx.state === 'suspended') {
        await ctx.resume()
      }
      this.analyser = ctx.createAnalyser()
      this.analyser.fftSize = 256
      this.analyser.smoothingTimeConstant = 0.85
      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)

      Howler.masterGain.connect(this.analyser)
      this.analyser.connect(ctx.destination)

      this.unlocked = true
      return true
    } catch {
      console.warn('[AudioManager] Failed to unlock audio context')
      return false
    }
  }

  updateAnalyser() {
    if (!this.analyser || this.muted) {
      this.audioIntensity = 0
      return
    }

    this.analyser.getByteFrequencyData(this.frequencyData)
    let sum = 0
    const binCount = Math.min(8, this.frequencyData.length)
    for (let i = 0; i < binCount; i++) {
      sum += this.frequencyData[i]
    }
    const target = (sum / binCount) / 255
    this.audioIntensity += (target - this.audioIntensity) * 0.1
  }

  play(key: SoundKey) {
    if (this.muted || !this.unlocked) return
    const channel = this.channels[key]
    if (channel.failed || !channel.howl) return
    channel.howl.play()
  }

  stop(key: SoundKey) {
    const channel = this.channels[key]
    if (!channel.howl) return
    channel.howl.stop()
  }

  fadeIn(key: SoundKey, duration = 1000) {
    if (this.muted || !this.unlocked) return
    const channel = this.channels[key]
    if (channel.failed || !channel.howl) return
    const howl = channel.howl
    const config = audioConfig[key]
    const targetVol = config.volume * audioConfig.masterVolume
    howl.volume(0)
    howl.play()
    howl.fade(0, targetVol, duration)
  }

  fadeOut(key: SoundKey, duration = 1000) {
    const channel = this.channels[key]
    if (!channel.howl) return
    const howl = channel.howl
    howl.fade(howl.volume(), 0, duration)
    setTimeout(() => howl.stop(), duration)
  }

  setMuted(muted: boolean) {
    this.muted = muted
    Howler.mute(muted)
  }

  isMuted() {
    return this.muted
  }

  dispose() {
    const keys = Object.keys(this.channels) as SoundKey[]
    for (const key of keys) {
      this.channels[key].howl?.unload()
      this.channels[key].howl = null
    }
  }
}

export const audioManager = new AudioManager()
