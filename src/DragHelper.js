// @flow

import DocumentEventHelper from './DocumentEventHelper'
import { relativeMouseOffset } from './utils'

export default {
  mixins: [DocumentEventHelper],

  props: {
    targetSelector: String,
    disabled: Boolean
  },

  data () {
    return {
      isDrag: false
    }
  },

  watch: {
    target: 'bindTarget'
  },

  mounted () {
    this.bindTarget()
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
    bindTarget () {
      this.target = this.$el.querySelector(this.targetSelector) || this.$el
    },

    offsetByMouse (event: MouseEvent): { left: number, top: number } {
      return relativeMouseOffset(event, this.$el)
    },

    offsetByTouch (event: TouchEvent): { left: number, top: number } {
      const touch = event.touches.length === 0 ? event.changedTouches[0] : event.touches[0]
      return relativeMouseOffset(touch, this.$el)
    },

    dragStart (event: Event, f: (event: Event) => { left: number, top: number }) {
      if (this.disabled || this.target !== event.target) return
      event.preventDefault()
      this.isDrag = true
      this.$emit('dragstart', event, f(event), this.target)
    },

    dragMove (event: Event, f: (event: Event) => { left: number, top: number }) {
      if (!this.isDrag) return
      event.preventDefault()
      this.$emit('drag', event, f(event), this.target)
    },

    dragEnd (event: Event, f: (event: Event) => { left: number, top: number }) {
      if (!this.isDrag) return
      event.preventDefault()
      this.isDrag = false
      this.$emit('dragend', event, f(event), this.target)
    }
  },

  render () {
    return this.$slots.default && this.$slots.default[0]
  }
}
