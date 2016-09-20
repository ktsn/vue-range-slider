// @flow

import { mergeOnHooks, relativeMouseOffset } from './utils'

export default {
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

  methods: {
    bindTarget () {
      this.target = this.$el.querySelector(this.targetSelector) || this.$el
    },

    mouseStart (event: MouseEvent) {
      if (this.target !== event.target) return
      this.isDrag = true
      this.$emit('dragstart', event, relativeMouseOffset(event), this.target)
    },

    mouseMove (event: MouseEvent) {
      if (!this.isDrag) return
      this.$emit('drag', event, relativeMouseOffset(event), this.target)
    },

    mouseEnd (event: MouseEvent) {
      if (!this.isDrag) return
      this.isDrag = false
      this.$emit('dragend', event, relativeMouseOffset(event), this.target)
    }
  },

  render () {
    const child = this.$slots.default && this.$slots.default[0]
    if (!child) return

    mergeOnHooks(child, {
      mousedown: this.mouseStart,
      mousemove: this.mouseMove,
      mouseup: this.mouseEnd
    })

    return child
  }
}
