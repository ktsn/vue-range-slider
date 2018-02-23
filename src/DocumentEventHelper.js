// @flow
/* global window, document */

export default {
  created () {
    if (typeof document === 'undefined') return
    forEachListener(this, (key, listener) => {
      on(document, key, listener)
    })
  },

  beforeDestroy () {
    if (typeof document === 'undefined') return
    forEachListener(this, (key, listener) => {
      off(document, key, listener)
    })
  }
}

const isBrowser = typeof window !== 'undefined'

const hasPassive = isBrowser && (() => {
  let supported = false

  try {
    const desc: any = {
      get () {
        supported = true
      }
    }
    const opts = Object.defineProperty({}, 'passive', desc)

    window.addEventListener('test', null, opts)
    window.removeEventListener('test', null, opts)
  } catch (e) {
    supported = false
  }

  return supported
})()

function forEachListener(vm: any, f: (key: string, listener: Function) => void) {
  const events = vm.$options.events
  Object.keys(events).forEach(key => {
    f(key, (event: Event) => events[key].call(vm, event))
  })
}

function on(el: EventTarget, name: string, fn: Function): void {
  const options = hasPassive ? { passive: false } : undefined
  el.addEventListener(name, fn, options)
}

function off(el: EventTarget, name: string, fn: Function): void {
  const options = hasPassive ? { passive: false } : undefined
  el.removeEventListener(name, fn, options)
}
