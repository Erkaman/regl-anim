makeAnimation = require('../common.js')

var regl = makeAnimation(function () {
  layer3()
  layer2()
})


var layer2 = regl({
  frag: `
  precision mediump float;

  varying vec2 uv;
  uniform float tick;

  varying vec2 vUv;

  void main () {
    vec2 uv = vUv;
    vec3 c;

    float disp =
      0.22 * sin(uv.y * 10.0 - tick * 0.04) * cos(uv.x*1.3) +
      0.12 * cos(uv.x * 30.0 + tick * 0.02) * cos(uv.x*0.9) ;

    float x = uv.x + disp;

    float a = sin(x * 80.0);
    if(a > 0.0) {
      c = vec3(0.3 + 0.4 * disp, 0.0, 0.0);
    } else {
      c = vec3(0.0, 0.3 + disp * 0.4, 0.0);
    }

    gl_FragColor = vec4(c, 0.5);
  }`,

  blend: {
    enable: true,
    func: {
      src: 'src alpha',
      dst: 'one minus src alpha'
    }
  },
})

var layer3 = regl({
  frag: `
  precision mediump float;

  uniform float tick;
  varying vec2 vUv;

  void main () {
    vec3 c;
    vec2 uv = vUv;

    float disp =
      0.1 * sin(uv.y * 7.0 + tick * 0.04) +
      0.1 * cos(uv.x * 20.0 + tick * 0.02);

    float x = uv.x + disp;

    float a = sin(x * 80.0);
    if(a > 0.0) {
      c = vec3(0.5, 0.4, 0.3 + 0.4 * disp);
    } else {
      c = vec3(0.0, 0.3 + disp * 0.4, 0.0);
    }

    gl_FragColor = vec4(c, 0.5);
  }`,

  blend: {
    enable: true,
    func: {
      src: 'src alpha',
      dst: 'one minus src alpha'
    }
  },
})
