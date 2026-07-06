export const siteConfig = {
  developerName: 'PRANEET SAVANT',
  domain: 'praneetsavant.in',
  headline: 'SOMETHING IS COOKING',
  headlineLine1: 'SOMETHING',
  headlineLine2: 'IS COOKING',
  subheadline: 'PORTFOLIO // COMING SOON',
  status: 'CURRENTLY COOKING',
  email: 'hello@praneetsavant.in',
  social: {
    github: 'https://github.com/praneetsavant',
    linkedin: 'https://linkedin.com/in/praneetsavant',
    x: 'https://x.com/praneetsavant',
  },
  enterKitchen: {
    mode: 'message' as 'message' | 'navigate' | 'transition',
    message: "THE KITCHEN ISN'T READY YET.",
    navigateTo: '/',
  },
  featureFlags: {
    enableDebugPanel: import.meta.env.DEV,
    enableCursorTrail: true,
    enableAudioReactive: true,
    enableHeatInteraction: true,
  },
} as const

export type SiteConfig = typeof siteConfig
