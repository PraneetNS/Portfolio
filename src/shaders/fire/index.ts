export const firePlaneVertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const firePlaneFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uTurbulence;
uniform float uIntensity;
uniform float uBurst;
uniform vec2 uOrigin;

varying vec2 vUv;
varying vec3 vWorldPosition;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float distFromOrigin = length(uv - uOrigin);

  vec2 distorted = uv;
  distorted.y += uTime * 0.15 * uIntensity;
  distorted.x += fbm(vec2(uv.y * 3.0, uTime * uTurbulence)) * 0.08 * uIntensity;

  float n = fbm(distorted * vec2(2.0, 4.0) + vec2(0.0, -uTime * uTurbulence * 0.5));
  n += fbm(distorted * vec2(4.0, 8.0) - vec2(uTime * 0.3, uTime * uTurbulence)) * 0.5;

  float vertical = smoothstep(0.0, 0.15, uv.y) * smoothstep(1.0, 0.3, uv.y);
  float horizontal = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);
  float mask = vertical * horizontal;
  mask *= smoothstep(0.5, 0.0, distFromOrigin * 0.8);

  float flame = n * mask * uIntensity * (1.0 + uBurst * 1.5);
  flame = pow(flame, 1.2);

  float heat = clamp(flame * 2.0, 0.0, 1.0);
  vec3 deepRed = vec3(0.5, 0.03, 0.005);
  vec3 orange = vec3(0.95, 0.28, 0.02);
  vec3 yellow = vec3(1.0, 0.7, 0.12);
  vec3 white = vec3(1.0, 0.92, 0.75);

  vec3 color = mix(deepRed, orange, smoothstep(0.0, 0.35, heat));
  color = mix(color, yellow, smoothstep(0.35, 0.7, heat));
  color = mix(color, white, smoothstep(0.7, 1.0, heat));

  float alpha = flame * vertical;
  alpha = clamp(alpha, 0.0, 0.85);

  if (alpha < 0.01) discard;
  gl_FragColor = vec4(color * 1.3, alpha);
}
`
