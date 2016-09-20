const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const replace = require('rollup-plugin-replace')
const multiEntry = require('rollup-plugin-multi-entry')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const globals = require('rollup-plugin-node-globals')
const builtins = require('rollup-plugin-node-builtins')

module.exports = {
  entry: 'test/**/*.js',
  dest: '.tmp/test.js',
  format: 'iife',
  moduleName: 'TEST',
  sourceMap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    multiEntry(),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.json']
    }),
    commonjs({
      ignoreGlobal: true
    }),
    globals(),
    builtins()
  ]
}
