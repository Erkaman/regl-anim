function rainbow (reglLib, canvasId) {
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
      vec3 c;

      float d = (uv.x - 0.5);
      float e = abs(d);
      float s = sign(d);

      // make symmetric.
      uv.x -= 0.5;
      uv.x = abs(uv.x);

      float x = uv.x +  (0.1 + 0.01 * sin(tick*0.08)) * sin((uv.y) * 10.0);
      float a = sin(x * 100.0) + 0.8*cos(x * 400.0);

      float f = 20.0;
      float p = -tick * 0.05;

      float r = sin(f*uv.x + 0.0 + p) * 0.25 + 0.25;
      float g = sin(f*uv.x + 2.0 + p) * 0.25 + 0.25;
      float b = sin(f*uv.x + 4.0 + p) * 0.25 + 0.25;

      c = vec3(r, g, b);

      float f2 = 28.0;
      p = -tick * 0.09;
      r = sin(f2*uv.y + 0.0 - p) * 0.40 + 0.1;
      g = sin(f2*uv.y*uv.x + 2.0 - p) * 0.25 + 0.25;
      b = sin(f2*uv.y + 4.0 - p) * 0.25 + 0.25;
      c += vec3(r,g,b);

      c *= smoothstep(0.0, 2.0, a+1.0);
      gl_FragColor = vec4(c, 1.0);
    }`
  })
}

module.exports = rainbow
