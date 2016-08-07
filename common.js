
module.exports.runAnimation = function (regl, cb) {
  /*
  var createReglRecorder = require('regl-recorder')
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

module.exports.createRegl = function (reglLib, canvasId) {
  var canvas = document.getElementById(canvasId)
  if (canvas === null) {
    canvas = document.body.appendChild(document.createElement('canvas'))
    canvas.style.width = '480px'
    canvas.style.height = '270px'
  }
  var context = canvas.getContext('webgl', {
    antialias: false
  })

  return reglLib(context)

  /*
    // If we want to record with regl-recorder, we do this instead.
  const VIDEO_WIDTH = 480
  const VIDEO_HEIGHT = 270
  regl = require('regl')(require('gl')(VIDEO_WIDTH, VIDEO_HEIGHT, {preserveDrawingBuffer: true, antialias: true}))
  return regl
  */
}
