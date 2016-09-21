// @flow

import DocumentEventHelper from './DocumentEventHelper'
import { relativeMouseOffset } from './utils'

export default {
  mixins: [DocumentEventHelper],

  props: {
    targetSelector: String
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
      event.preventDefault()
      return this.dragStart(event, this.offsetByMouse)
    },

    mousemove (event: MouseEvent) {
      event.preventDefault()
      return this.dragMove(event, this.offsetByMouse)
    },

    mouseup (event: MouseEvent) {
      event.preventDefault()
      return this.dragEnd(event, this.offsetByMouse)
    }
  },

  methods: {
    bindTarget () {
      this.target = this.$el.querySelector(this.targetSelector) || this.$el
    },

    offsetByMouse (event: MouseEvent): { left: number, top: number } {
      return relativeMouseOffset(event, this.$el)
    },

    dragStart (event: Event, f: (event: Event) => { left: number, top: number }) {
      if (this.target !== event.target) return
      this.isDrag = true
      this.$emit('dragstart', event, f(event), this.target)
    },

    dragMove (event: Event, f: (event: Event) => { left: number, top: number }) {
      if (!this.isDrag) return
      this.$emit('drag', event, f(event), this.target)
    },

    dragEnd (event: Event, f: (event: Event) => { left: number, top: number }) {
      if (!this.isDrag) return
      this.isDrag = false
      this.$emit('dragend', event, f(event), this.target)
    }
  },

  render () {
    return this.$slots.default && this.$slots.default[0]
  }
}
