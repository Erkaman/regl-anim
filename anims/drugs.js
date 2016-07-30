makeAnimation = require('../common.js')

var regl = makeAnimation(function () {
  layer1()
  layer12()
})

var layer1 = regl({
  frag: `
  precision mediump float;

  varying vec2 vUv;

  uniform float tick;
  void main () {
    vec2 uv = vUv;

    vec3 c;

    float disp =
      0.2 * sin(uv.y * 10.0 + tick * 0.05) +
      0.1 * cos(uv.x * 30.0 + tick * 0.05);

    float x = uv.x + disp;

    float a = sin(x * 20.0);
    if(a > 0.0) {
      c = vec3(0.4 + disp * 0.8, 0.4 + 0.2 * disp, disp * 0.1);
    } else {
      c = vec3(0.3 *disp, 0.5 - disp*1.0, disp);
    }

    gl_FragColor = vec4(c, 0.9);
  }`
})

var layer12 = regl({
  frag: `
  precision mediump float;

  varying vec2 uv;
  uniform float tick;
  void main () {
    vec3 c;

    float disp =
      0.2 * sin(uv.y * 20.0 +  tick * 0.07) +
      0.1 * cos(uv.x * 24.0 - tick * 0.04);

    float x = uv.x + disp;

    float a = sin(x * 20.0);
    if(a > 0.0) {
      c = vec3(0.0, 0.0, disp * 0.9);
    } else {
      c = vec3(0.3 *disp, 0.9 - disp*2.0, disp);
    }

    gl_FragColor = vec4(c, 0.2);
  }`,
  blend: {
    enable: true,
    func: {
      src: 'src alpha',
      dst: 'one minus src alpha'
    }
  }
})
