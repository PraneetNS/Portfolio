/**
 * Audio asset paths — place licensed audio files in public/audio/
 * See README.md for setup instructions.
 */
export const audioConfig = {
  ambience: {
    src: ['/audio/ambience.mp3'],
    volume: 0.35,
    loop: true,
  },
  ignition: {
    src: ['/audio/ignition.mp3'],
    volume: 0.6,
    loop: false,
  },
  fire: {
    src: ['/audio/fire.mp3'],
    volume: 0.45,
    loop: true,
  },
  explosion: {
    src: ['/audio/explosion.mp3'],
    volume: 0.7,
    loop: false,
  },
  voiceCue1: {
    src: ['/audio/voice-let-him-cook-now.mp3'],
    volume: 0.85,
    loop: false,
    /** Timeline trigger at ~6.0s — "LET HIM COOK NOW." */
    label: 'LET HIM COOK NOW.',
  },
  voiceCue2: {
    src: ['/audio/voice-let-him-cook.mp3'],
    volume: 0.85,
    loop: false,
    /** Timeline trigger at ~7.5s — "LET HIM COOK." */
    label: 'LET HIM COOK.',
  },
  masterVolume: 0.8,
} as const

export type AudioConfig = typeof audioConfig
