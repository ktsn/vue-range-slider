// @flow

import DocumentEventHelper from './DocumentEventHelper'
import { relativeMouseOffset } from './utils'

export default {
  mixins: [DocumentEventHelper],

  props: {
    disabled: Boolean
  },

  data () {
    return {
      isDrag: false
    }
  },

  events: {
    mousedown (event: MouseEvent) {
      return this.dragStart(event, this.offsetByMouse)
    },

    mousemove (event: MouseEvent) {
      return this.dragMove(event, this.offsetByMouse)
    },

    mouseup (event: MouseEvent) {
      return this.dragEnd(event, this.offsetByMouse)
    },

    touchstart (event: TouchEvent) {
      return this.dragStart(event, this.offsetByTouch)
    },

    touchmove (event: TouchEvent) {
      return this.dragMove(event, this.offsetByTouch)
    },

    touchend (event: TouchEvent) {
      return this.dragEnd(event, this.offsetByTouch)
    },

    touchcancel (event: TouchEvent) {
      return this.dragEnd(event, this.offsetByTouch)
    }
  },

  methods: {
    isInTarget (el: ?HTMLElement): boolean {
      if (!el) return false

      if (el === this.$el) {
        return true
      } else {
        return this.isInTarget(el.parentElement)
      }
    },

    offsetByMouse (event: MouseEvent): { left: number, top: number } {
      return relativeMouseOffset(event, this.$el)
    },

    offsetByTouch (event: TouchEvent): { left: number, top: number } {
      const touch = event.touches.length === 0 ? event.changedTouches[0] : event.touches[0]
      return relativeMouseOffset(touch, this.$el)
    },

    dragStart (event: Event, f: (event: Event) => { left: number, top: number }) {
      if (
        this.disabled ||
        (event.button !== undefined && event.button !== 0) ||
        !this.isInTarget(event.target)
      ) {
        return
      }

      event.preventDefault()
      this.isDrag = true
      this.$emit('dragstart', event, f(event), this.$el)
    },

    dragMove (event: Event, f: (event: Event) => { left: number, top: number }) {
      if (!this.isDrag) return
      event.preventDefault()
      this.$emit('drag', event, f(event), this.$el)
    },

    dragEnd (event: Event, f: (event: Event) => { left: number, top: number }) {
      if (!this.isDrag) return
      event.preventDefault()
      this.isDrag = false
      this.$emit('dragend', event, f(event), this.$el)
    }
  },

  render () {
    return this.$slots.default && this.$slots.default[0]
  }
}
