function circle (reglLib, canvasId) {
  var createRegl = require('../common.js').createRegl
  var runAnimation = require('../common.js').runAnimation

  const regl = createRegl(reglLib, canvasId)

  runAnimation(regl, function () {
    layer1()
  })

  var layer1 = regl({
    frag: `
    precision mediump float;

    varying vec2 vUv;

    uniform float tick;
    void main () {
      vec2 uv = vUv;
      uv -= 0.5;

      float disp =
        0.05 * sin(uv.y * 50.0 + tick * 0.05)+
        0.04 * cos(uv.x * 50.0 + tick * 0.05) * sin(uv.y * 40.0 + tick * 0.05);

      uv.x += disp;

      float r = length(uv);
      float phi = atan(uv.y,uv.x);

      //    r += 2.0 * sin(r * 0.1);

      vec3 c;

      c = vec3(0.0, 0.0, sin(-10.0*r)*0.6 + 0.3);
      //    c += vec3(0.0, 0.0, sin(10.0*r)*0.6 + 0.3);

      float a = 0.36;
      c *= smoothstep(a + 0.05, a , r);

      gl_FragColor = vec4(c, 1.0);
    }`
  })
}

module.exports = circle
