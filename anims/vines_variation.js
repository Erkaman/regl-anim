makeAnimation = require('../common.js')

var regl = makeAnimation(function () {
  layer1()
})

var layer1 = regl({
  frag: `
  precision mediump float;

  varying vec2 vUv;

  uniform float tick;
  void main () {
    vec2 uv = vUv;
    vec3 c;

    float x;

    uv.x *= 1.6;
    uv.y *= 1.6;

    x = 0.3 * sin(uv.x * 10.2 + tick * 0.002) * cos(uv.y * uv.x * 9.0 - tick * 0.002);

    x += 0.08 *sin((uv.y) * 10.0);
    x += 0.005 *sin((uv.y - tick*0.001) * 100.0);
    x += 0.002 *sin((uv.x - tick*0.001) * 100.0);

    float a = 0.8*cos(x * 100.0) * sin(x * 70.0);

    c = vec3(1.0, 0.0, 0.1);
    c *= a;

    gl_FragColor = vec4(c, 1.0);
  }`
})
