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
    mousedown: 'mouseStart',
    mousemove: 'mouseMove',
    mouseup: 'mouseEnd'
  },

  methods: {
    bindTarget () {
      this.target = this.$el.querySelector(this.targetSelector) || this.$el
    },

    mouseStart (event: MouseEvent) {
      if (this.target !== event.target) return
      this.isDrag = true
      this.$emit('dragstart', event, relativeMouseOffset(event, this.$el), this.target)
    },

    mouseMove (event: MouseEvent) {
      if (!this.isDrag) return
      this.$emit('drag', event, relativeMouseOffset(event, this.$el), this.target)
    },

    mouseEnd (event: MouseEvent) {
      if (!this.isDrag) return
      this.isDrag = false
      this.$emit('dragend', event, relativeMouseOffset(event, this.$el), this.target)
    }
  },

  render () {
    return this.$slots.default && this.$slots.default[0]
  }
}
