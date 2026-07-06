export const smokeVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const smokeFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uOpacity;
uniform float uTurbulence;

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
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  uv.y += uTime * 0.03 * uTurbulence;
  uv.x += sin(uTime * 0.2 + uv.y * 3.0) * 0.02;

  float n = fbm(uv * 3.0 + uTime * 0.05);
  float edge = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.5, vUv.y);
  edge *= smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);

  float alpha = n * edge * uOpacity * 0.35;
  vec3 color = vec3(0.08, 0.08, 0.09);

  if (alpha < 0.005) discard;
  gl_FragColor = vec4(color, alpha);
}
`
