export const atmosphereVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.999, 1.0);
}
`

export const atmosphereFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uIntensity;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.1;
    a *= 0.45;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float haze = fbm(uv * 2.0 + uTime * 0.02) * 0.5;
  haze += fbm(uv * 4.0 - uTime * 0.015) * 0.25;

  vec3 baseColor = vec3(0.015, 0.012, 0.01);
  vec3 hazeColor = vec3(0.04, 0.03, 0.025) * haze * uIntensity;

  // Vignette
  float vignette = 1.0 - length(uv - 0.5) * 0.8;

  gl_FragColor = vec4((baseColor + hazeColor) * vignette, 1.0);
}
`
