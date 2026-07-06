# Something Is Cooking — Praneet Savant

A cinematic WebGL portfolio teaser for [praneetsavant.in](https://praneetsavant.in). An award-caliber interactive intro sequence built with custom GLSL shaders, React Three Fiber, and GSAP — not a conventional coming-soon template.

**Concept:** Enter a dark industrial kitchen where something powerful is being built. Click **[ IGNITE ]** to begin a ~12-second cinematic sequence, then land on a minimal coming-soon interface with a living WebGL scene.

---

## Technology Stack

| Layer | Tools |
|-------|-------|
| Build | Vite, TypeScript |
| UI | React 19, CSS Modules |
| WebGL | Three.js, React Three Fiber, @react-three/drei |
| Shaders | Custom GLSL (typography, fire, embers, smoke, heat distortion) |
| Post-processing | @react-three/postprocessing (Bloom, Vignette, Noise, Chromatic Aberration) |
| Animation | GSAP master timeline |
| Audio | Howler.js with Web Audio AnalyserNode |
| Debug (dev only) | Leva |

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Click **[ IGNITE ]** after assets load.

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint |

---

## Production Build & Deployment

```bash
npm run build
```

Output is in `dist/` — deploy as a static site to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static host.

```bash
# Example: Vercel
npx vercel --prod

# Example: Netlify
npx netlify deploy --prod --dir=dist
```

Point `praneetsavant.in` to your host and configure SPA fallback to `index.html`.

---

## Configuration

All developer-facing settings live in config files — no React component edits required.

### `src/config/siteConfig.ts`

- Developer name, headline, status text
- Social links (GitHub, LinkedIn, X)
- Email address
- **Enter the Kitchen** behavior (`message` | `navigate` | `transition`)
- Feature flags

### `src/config/audioConfig.ts`

- Audio file paths, volumes, loop settings
- See [public/audio/README.md](public/audio/README.md)

### `src/config/qualityConfig.ts`

- Particle counts, DPR limits, post-processing toggles
- Set `manualOverride: 'high' | 'medium' | 'low'` to force a quality tier

---

## Audio Asset Setup

The repo ships **without** copyrighted audio. Place licensed files in `public/audio/`:

```
public/audio/
  ambience.mp3              # Industrial ambience loop
  ignition.mp3              # Stove click / ignition
  fire.mp3                  # Fire crackle loop
  explosion.mp3             # Impact burst
  voice-let-him-cook-now.mp3  # "LET HIM COOK NOW." (~6s)
  voice-let-him-cook.mp3      # "LET HIM COOK." (~7.5s)
```

The experience continues silently if files are missing.

---

## Font Setup

Display fonts load from Google Fonts (Bebas Neue, Inter, JetBrains Mono) via `index.html`.

3D typography uses **Droid Sans Bold** from `@react-three/drei/fonts/` for TextGeometry. To swap fonts, update `src/utils/preloadAssets.ts` with another `.typeface.json` path.

---

## Project Architecture

```
src/
  app/              App shell, state orchestration
  components/
    scene/          R3F scene graph (Experience, camera, fire, particles)
    ui/             HTML overlays (InitialScreen, FinalInterface, cursor)
  shaders/
    typography/     Metal heat-reveal shader
    fire/           Procedural flame planes
    effects/        Embers, smoke, atmosphere
    heatDistortion/ Custom post-processing effect
  audio/            AudioManager (Howler.js)
  hooks/            Timeline, mouse heat, quality detection
  config/           siteConfig, audioConfig, qualityConfig
  store/            Experience state machine
  types/            Shared TypeScript types
  utils/            Math, preloading, quality helpers
  styles/           Global CSS + CSS Modules
```

---

## Shader Architecture

### Typography (`shaders/typography/`)

Heavy dark metal material with:
- Procedural roughness (FBM noise)
- Heat mask driven by `uIgnitionProgress`, `uHeat`, mouse proximity
- Color progression: cold metal → dark red → glow → orange → white-hot cracks
- Fire emergence from hot regions via `uFlameIntensity`

**Uniforms:** `uTime`, `uHeat`, `uIgnitionProgress`, `uFlameIntensity`, `uTurbulence`, `uMouse`, `uAudioIntensity`, `uReveal`, `uLocalHeat`

### Fire (`shaders/fire/`)

GPU procedural flames on additive-blended planes:
- Layered FBM noise with upward UV distortion
- Irregular masks (dense bottom, thin turbulent top)
- Color ramp: deep red → orange → yellow → pale white
- Burst multiplier for cinematic peaks

### Embers & Smoke (`shaders/effects/`)

- **Embers:** Instanced `Points` with lifetime, drift, brightness variation
- **Smoke:** Transparent noise-driven planes, kept subtle
- **Atmosphere:** Full-screen procedural haze on initial load

### Heat Distortion (`shaders/heatDistortion/`)

Custom `postprocessing` Effect with timeline-controlled `uIntensity`.

---

## Experience State Machine

| State | Description |
|-------|-------------|
| `LOADING` | Preloading font assets |
| `READY` | Atmospheric scene + IGNITE button |
| `IGNITING` | Audio unlock, timeline start |
| `CINEMATIC` | GSAP master timeline running (~12s) |
| `SETTLED` | Final interface + interactive scene |
| `REDUCED_MOTION` | Skips cinematic, shows final UI |
| `ERROR` | WebGL unavailable — static fallback |

---

## GSAP Cinematic Timeline

One centralized timeline controls shader uniforms, camera shake, bloom, chromatic aberration, ember rate, and audio cues:

| Time | Event |
|------|-------|
| 0.0–1.5s | Darkness, ambience, ignition click |
| 1.5–3.0s | Ember reveals "SOMETHING", metal heats |
| 3.0–4.5s | "IS COOKING" + controlled flames + smoke |
| 4.5–6.0s | Camera push, distortion, shake, bloom rise |
| ~6.0s | Voice cue 1, flame surge |
| ~7.5s | Voice cue 2, full fire burst, chromatic spike |
| 9.0–12.0s | Settle, reveal final interface |

---

## Performance Strategy

- Adaptive quality tiers (high / medium / low) from device signals
- DPR capping per tier
- No per-frame React state — uniforms updated via refs + `useFrame`
- Instanced/buffer particle systems (no per-particle React components)
- Visibility API pauses audio when tab is hidden
- Manual chunk splitting for Three.js and postprocessing
- Resource disposal on unmount

**Targets:** 60 FPS desktop, ~30 FPS mid-range mobile.

---

## Browser Compatibility

- Chrome 90+, Firefox 90+, Safari 15+, Edge 90+
- Requires WebGL 1.0+ (WebGL 2 preferred)
- Graceful static fallback when WebGL is unavailable

---

## Accessibility

- Keyboard-accessible IGNITE and mute controls with visible focus states
- Semantic HTML in final interface (+ visually hidden equivalents)
- `prefers-reduced-motion`: skips cinematic burst, shows simplified settled view
- Custom cursor disabled on touch devices; taps create heat impulses

---

## Development Debug Panel

In dev mode (`import.meta.env.DEV`), Leva exposes controls for fire intensity, heat, turbulence, bloom, particles, smoke, camera shake, and heat distortion. Hidden in production builds.

---

## Integrating Into the Full Portfolio

1. Change `siteConfig.enterKitchen.mode` to `'navigate'` and set `navigateTo` to your portfolio route.
2. Extract `Experience` as a route-level intro component.
3. Reuse `FireTypography` shader material for section headings.
4. Keep `audioConfig` and asset paths centralized.
5. The GSAP timeline can be shortened or triggered on scroll for embedded use.

---

## License

Private portfolio project. Audio assets must be independently licensed.

---

**PRANEET SAVANT** — *Something Is Cooking*
