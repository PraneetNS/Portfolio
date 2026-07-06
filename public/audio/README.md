# Audio Assets

Place your licensed audio files in this directory. The experience handles missing files gracefully and continues silently.

## Required Files

| File | Channel | Description | Timeline |
|------|---------|-------------|----------|
| `ambience.mp3` | ambience | Low-frequency industrial ambience loop | Starts at ~0.2s after IGNITE |
| `ignition.mp3` | ignition | Stove ignition / mechanical click | ~0.5s |
| `fire.mp3` | fire | Crackling fire loop | ~3.2s fade in |
| `explosion.mp3` | explosion | Impact / burst sound | ~7.5s |
| `voice-let-him-cook-now.mp3` | voiceCue1 | **"LET HIM COOK NOW."** | ~6.0s |
| `voice-let-him-cook.mp3` | voiceCue2 | **"LET HIM COOK."** | ~7.5s |

## Voice Cue Placeholders

The repository does **not** include copyrighted voice samples. Record or license your own assets and place them at the paths above.

Configure paths and volumes in `src/config/audioConfig.ts`.

## Format Recommendations

- **Format:** MP3 or OGG
- **Ambience/Fire:** 128–192 kbps, seamless loops
- **SFX/Voice:** 192 kbps, short duration
- **Voice:** Mono, normalized to -3 dBFS

## Testing Without Audio

The site works fully without audio files. Check the browser console for `[AudioManager] Failed to load` warnings.
