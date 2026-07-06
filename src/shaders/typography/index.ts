export const typographyVertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`

export const typographyFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uHeat;
uniform float uIgnitionProgress;
uniform float uFlameIntensity;
uniform float uTurbulence;
uniform vec2 uMouse;
uniform float uAudioIntensity;
uniform float uReveal;
uniform float uLocalHeat;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

// Simplex-style hash noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal = normalize(vNormal);

  // Reveal mask — left to right sweep
  float revealMask = smoothstep(vUv.x - 0.15, vUv.x, uReveal);
  if (revealMask < 0.01) discard;

  // Base metal surface
  float roughNoise = fbm(vec3(vUv * 8.0, uTime * 0.05));
  float microNoise = fbm(vec3(vUv * 24.0, uTime * 0.02));
  float metalRoughness = 0.5 + roughNoise * 0.3 + microNoise * 0.1;

  vec3 coldMetal = vec3(0.04, 0.04, 0.045);
  vec3 darkMetal = vec3(0.08, 0.07, 0.07);

  // Heat propagation from ignition + global heat + mouse proximity
  float mouseDist = length(vUv - uMouse);
  float mouseHeat = exp(-mouseDist * 4.0) * uLocalHeat * 0.8;
  float sweepHeat = smoothstep(uIgnitionProgress - 0.2, uIgnitionProgress + 0.05, vUv.x);
  float heatMask = clamp(uHeat * 0.7 + sweepHeat * uIgnitionProgress + mouseHeat, 0.0, 1.0);

  // Animated cracks
  float crackNoise = fbm(vec3(vUv * 12.0, uTime * 0.15 + heatMask * 2.0));
  float cracks = smoothstep(0.55, 0.65, crackNoise) * heatMask;

  // Heat color progression
  vec3 darkRed = vec3(0.25, 0.02, 0.01);
  vec3 glowRed = vec3(0.8, 0.08, 0.02);
  vec3 hotOrange = vec3(1.0, 0.35, 0.05);
  vec3 whiteHot = vec3(1.0, 0.92, 0.75);

  vec3 heatedColor = mix(coldMetal, darkRed, smoothstep(0.0, 0.2, heatMask));
  heatedColor = mix(heatedColor, glowRed, smoothstep(0.2, 0.45, heatMask));
  heatedColor = mix(heatedColor, hotOrange, smoothstep(0.45, 0.7, heatMask));
  heatedColor = mix(heatedColor, whiteHot, smoothstep(0.7, 0.95, heatMask) * cracks);

  // Edge white-hot glow at high heat
  float edgeFactor = pow(1.0 - abs(dot(normal, viewDir)), 2.0);
  float edgeHeat = edgeFactor * heatMask * 1.5;

  // Emissive
  vec3 emissive = heatedColor * heatMask * 0.6;
  emissive += whiteHot * cracks * heatMask * 2.0;
  emissive += hotOrange * edgeHeat * 0.8;
  emissive *= 1.0 + uAudioIntensity * 0.15;

  // Fire emergence from hot regions
  float flameSeed = fbm(vec3(vUv * vec2(3.0, 6.0), uTime * uTurbulence * 0.5));
  float flameMask = smoothstep(0.3, 0.7, flameSeed) * heatMask * uFlameIntensity;
  emissive += hotOrange * flameMask * 1.2;
  emissive += vec3(1.0, 0.6, 0.1) * flameMask * flameMask * 2.0;

  // Lighting — minimal, moody
  vec3 lightDir = normalize(vec3(0.3, 0.8, 0.5));
  float NdotL = max(dot(normal, lightDir), 0.0);
  float spec = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), 32.0) * (1.0 - heatMask * 0.8);

  vec3 baseColor = mix(coldMetal, darkMetal, metalRoughness);
  baseColor = mix(baseColor, heatedColor, heatMask);
  vec3 finalColor = baseColor * (0.15 + NdotL * 0.25) + spec * vec3(0.3) + emissive;

  // Cooling tint at low heat
  finalColor = mix(finalColor, baseColor, (1.0 - heatMask) * 0.3);

  finalColor *= revealMask;
  gl_FragColor = vec4(finalColor, revealMask);
}
`
