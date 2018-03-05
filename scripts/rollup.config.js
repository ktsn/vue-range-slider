const fs = require('fs')
const path = require('path')
const babel = require('rollup-plugin-babel')
const vue = require('rollup-plugin-vue')
const replace = require('rollup-plugin-replace')
const sass = require('node-sass')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const meta = require('../package.json')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

const prefixer = postcss([
  autoprefixer({
    browsers: ['> 1%', 'last 2 versions', 'IE >= 9']
  })
])

const banner = `/*!
 * ${meta.name} v${meta.version}
 * ${meta.homepage}
 *
 * @license
 * Copyright (c) 2016-2018 ${meta.author}
 * Released under the MIT license
 * ${meta.homepage}/blob/master/LICENSE
 */`

const name = 'VueRangeSlider'

const plugins = [
  vue({
    compileTemplate: true,
    autoStyles: false,
    css: !process.env.NODE_ENV && (styles => {
      const out = ext => path.resolve(__dirname, '../dist/vue-range-slider.' + ext)

      // save as scss
      fs.writeFile(out('scss'), styles, error => {
        if (error) {
          console.error(error)
          return
        }

        // compile scss
        sass.render({
          data: styles,
          outputStyle: 'expanded',
          outFile: out
        }, (error, result) => {
          if (error) {
            console.error(formatSassError(error))
            return
          }

          // autoprefixer
          prefixer.process(result.css, { from: false }).then(result => {
            result.warnings().forEach(warn => {
              console.warn(warn.toString())
            })
            fs.writeFile(out('css'), result.css, err => {
              if (err) {
                console.error(err)
              }
            })
          })
        })
      })
    })
  }),
  babel({
    exclude: 'node_modules/**'
  })
]
if (process.env.NODE_ENV) {
  plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  )
}

module.exports = {
  input: path.resolve(__dirname, '../src/index.js'),
  plugins,
  output: {
    name,
    banner
  }
}

function formatSassError(e) {
  return `[${e.line}:${e.column}] ${e.message} (${e.file})`
}
