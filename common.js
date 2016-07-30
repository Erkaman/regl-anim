module.exports = function (cb) {
  const canvas = document.body.appendChild(document.createElement('canvas'))
  var context = canvas.getContext('webgl', {
    antialias: true
  })
  canvas.style.width = '480px'
  canvas.style.height = '270px'

  const regl = require('regl')(context)


/*
  var createReglRecorder = require('regl-recorder')

  const VIDEO_WIDTH = 480
  const VIDEO_HEIGHT = 270

  const regl = require('regl')(require('gl')(VIDEO_WIDTH, VIDEO_HEIGHT, {preserveDrawingBuffer: true, antialias: true}))

  var recorder = createReglRecorder(regl, 500)
*/
  var globalScope = regl({
    attributes: {
      position: [-2, 0, 0, -2, 2, 2]
    },

    uniforms: {
      tick: ({tick}) => tick
    },

    count: 3,

    vert: `
    precision mediump float;
    attribute vec2 position;
    varying vec2 vUv;

    void main () {
      vUv = position;
      gl_Position = vec4(1.0 - 2.0 * position, 0.0, 1);
    }`,

    depth: { enable: false }
  })

  regl.frame(({viewportWidth, viewportHeight}) => {
    regl.clear({ color: [0, 0, 0, 1] })

    globalScope(() => {
      cb()
    })

//    recorder.frame(viewportWidth, viewportHeight)
  })

  return regl
}
