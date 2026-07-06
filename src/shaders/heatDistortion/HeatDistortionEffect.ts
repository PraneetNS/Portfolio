import { Effect } from 'postprocessing'
import { Uniform } from 'three'

const fragmentShader = /* glsl */ `
uniform float uIntensity;
uniform float uTime;
uniform vec2 uCenter;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 dir = uv - uCenter;
  float dist = length(dir);

  float wave = sin(uv.y * 30.0 + uTime * 3.0) * 0.002;
  wave += sin(uv.x * 20.0 - uTime * 2.0) * 0.001;
  wave *= uIntensity * smoothstep(0.6, 0.0, dist);

  vec2 offset = dir * wave * uIntensity * 2.0;
  offset.y += uIntensity * 0.003 * sin(uTime * 4.0 + uv.x * 10.0);

  vec2 distortedUv = uv + offset;
  distortedUv = clamp(distortedUv, 0.001, 0.999);

  outputColor = texture2D(inputBuffer, distortedUv);
}
`

export class HeatDistortionEffect extends Effect {
  constructor() {
    super('HeatDistortionEffect', fragmentShader, {
      uniforms: new Map<string, Uniform>([
        ['uIntensity', new Uniform(0)],
        ['uTime', new Uniform(0)],
        ['uCenter', new Uniform([0.5, 0.45])],
      ]),
    })
  }

  update(_renderer: unknown, _inputBuffer: unknown, deltaTime: number) {
    const timeUniform = this.uniforms.get('uTime')
    if (timeUniform) {
      timeUniform.value += deltaTime
    }
  }
}
