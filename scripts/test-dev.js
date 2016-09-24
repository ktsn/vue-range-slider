const config = require('./rollup.config.unit')
const rollup = require('rollup')
const watch = require('rollup-watch')

watch(rollup, config)
  .on('event', event => {
    if (event.code === 'ERROR') {
      console.log(event.error)
    }
  })
