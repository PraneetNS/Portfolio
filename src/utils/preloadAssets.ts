import type { Font } from 'three/addons/loaders/FontLoader.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
const fontUrl = '/fonts/droid_sans_bold.typeface.json'

let cachedFont: Font | null = null

export async function preloadFont(): Promise<Font> {
  if (cachedFont) return cachedFont

  const loader = new FontLoader()
  const response = await fetch(fontUrl)
  const json = await response.json()
  cachedFont = loader.parse(json)
  return cachedFont
}

export async function preloadAssets(): Promise<void> {
  await preloadFont()
}

export function getFont(): Font | null {
  return cachedFont
}
