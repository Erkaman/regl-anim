var fs = require('fs')
var glob = require('glob')
var browserify = require('browserify')
var ClosureCompiler = require('google-closure-compiler').compiler

function pageName (file) {
  return file.replace('anims', 'www/gallery') + '.html'
}

function jsName (file) {
  return file.replace('anims', 'www/gallery') + '.js'
}

glob('anims/*.js', {}, function (err, files) {
  if (err) {
    throw err
  }
  files.forEach(function (file) {
    console.log('file: ', file)
    var b = browserify({
      debug: true
    })
    b.add(file)
    b.bundle(function (err, bundle) {
      if (err) {
        throw err
      }
      console.log('bundled', file)
      minifyAndGenPage(file, bundle)
    })

  })
})

function minifyAndGenPage (file, bundle) {
  var jsFile = jsName(file)
  var minFile = jsFile.replace('.js', '.min.js')

  fs.writeFile(jsFile, bundle, function (err) {
    if (err) {
      throw err
    }

    console.log('minify ', jsFile, ' -> ', minFile)

    var closureCompiler = new ClosureCompiler({
      js: jsFile,
      compilation_level: 'SIMPLE',
      js_output_file: minFile
    })

    closureCompiler.run(function (exitCode, stdOut, stdErr) {
      fs.readFile(minFile, function (err, data) {
        if (err) {
          throw err
        }
        console.log('minified ', minFile)
        console.log('stdout: ', stdOut)
        console.log('stderr: ', stdErr)
        writePage(file, data) // output as div tag here.
      })
    })
  })
}

function writePage (file, bundle) {
  fs.writeFile(pageName(file),
    `<!DOCTYPE html>
      <html>
        <head>
          <title>${file}</title>
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
          <meta charset=utf-8>
        </head>
        <body>
        <script type='text/javascript'>
        ${bundle.toString()}
        </script>
        </body>
      </html>`,
    function (err) {
      if (err) {
        throw err
      }
      console.log('wrote page', pageName(file))
    })
}
