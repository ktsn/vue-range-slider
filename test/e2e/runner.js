const path = require('path')
const glob = require('glob')
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const createTestCafe = require('testcafe')

const compiler = webpack(require('../../scripts/webpack.config.example'))

const server = new WebpackDevServer(compiler, {
  contentBase: 'example',
  noInfo: true
})

server.listen(8080, 'localhost', () => {
  createTestCafe('localhost', 1337, 1338)
    .then(testCafe => {
      return testCafe
        .createRunner()
        .src(glob.sync(path.resolve(__dirname, 'specs/**/*.js')))
        .browsers('chrome:headless')
        .run()
    })
    .then(() => {
      process.exit()
    })
})
