// @flow
/* global document */

export default {
  created () {
    if (typeof document === 'undefined') return
    forEachListener(this, (key, listener) => {
      document.addEventListener(key, listener)
    })
  },

  beforeDestroy () {
    if (typeof document === 'undefined') return
    forEachListener(this, (key, listener) => {
      document.removeEventListener(key, listener)
    })
  }
}

function forEachListener(vm: any, f: (key: string, listener: Function) => void) {
  const events = vm.$options.events
  Object.keys(events).forEach(key => {
    f(key, (event: Event) => events[key].call(vm, event))
  })
}
