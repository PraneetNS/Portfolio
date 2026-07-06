import { useSyncExternalStore } from 'react'
import { experienceStore } from '@/store/experienceStore'
import type { ExperienceState } from '@/types/experience'

export function useExperienceState(): ExperienceState {
  return useSyncExternalStore(
    (cb) => experienceStore.subscribe(cb),
    () => experienceStore.state,
    () => experienceStore.state,
  )
}

export function useExperienceSelector<T>(selector: () => T): T {
  return useSyncExternalStore(
    (cb) => experienceStore.subscribe(cb),
    selector,
    selector,
  )
}
