export const emberVertexShader = /* glsl */ `
attribute float aSize;
attribute float aBrightness;
attribute float aLife;
attribute float aSeed;

uniform float uTime;
uniform float uRate;
uniform float uBurst;

varying float vBrightness;
varying float vLife;
varying float vSeed;

void main() {
  vBrightness = aBrightness;
  vLife = aLife;
  vSeed = aSeed;

  vec3 pos = position;

  // Upward drift with turbulence
  float lifeProgress = mod(uTime * (0.3 + aSeed * 0.4) + aLife, 1.0);
  pos.y += lifeProgress * (1.5 + uRate * 2.0 + uBurst * 3.0);
  pos.x += sin(uTime * 2.0 + aSeed * 6.28) * 0.2 * lifeProgress;
  pos.z += cos(uTime * 1.5 + aSeed * 3.14) * 0.1 * lifeProgress;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float fade = 1.0 - lifeProgress;
  float size = aSize * fade * (1.0 + uBurst * 0.5) * uRate;
  gl_PointSize = max(size * (180.0 / -mvPosition.z), 1.0);
}
`

export const emberFragmentShader = /* glsl */ `
varying float vBrightness;
varying float vLife;
varying float vSeed;

void main() {
  vec2 centered = gl_PointCoord - 0.5;
  float dist = length(centered);
  float glow = smoothstep(0.5, 0.0, dist);

  vec3 emberColor = mix(vec3(1.0, 0.3, 0.05), vec3(1.0, 0.85, 0.4), vBrightness);
  emberColor = mix(emberColor, vec3(1.0, 0.95, 0.8), vBrightness * glow);

  float alpha = glow * vBrightness;
  if (alpha < 0.01) discard;

  gl_FragColor = vec4(emberColor * 1.5, alpha);
}
`
