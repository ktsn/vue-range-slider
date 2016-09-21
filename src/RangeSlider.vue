<template lang="html">
  <drag-helper target-selector=".range-slider-handler" @drag="drag" @dragend="dragEnd">
    <span class="range-slider">
      <input class="range-slider-hidden" type="text" :name="name" :value="actualValue">
      <span class="range-slider-handler" :style="{ left: valuePercent + '%' }"></span>
    </span>
  </drag-helper>
</template>

<script>
// @flow

import DragHelper from './DragHelper'
import { round } from './utils'

export default {
  props: {
    name: String,
    value: [String, Number],
    min: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: [String, Number],
      default: 100
    },
    step: {
      type: [String, Number],
      default: 1
    }
  },

  data () {
    return {
      actualValue: Number(this.value) || Number(this.min) || 0
    }
  },

  computed: {
    _min () {
      return Number(this.min)
    },

    _max () {
      return Number(this.max)
    },

    _step () {
      return Number(this.step)
    },

    valuePercent () {
      return (this.actualValue - this._min) / (this._max - this._min) * 100
    }
  },

  watch: {
    value (newValue) {
      this.actualValue = Number(newValue)
    }
  },

  methods: {
    drag (event: Event, offset: { left: number, top: number }) {
      const { offsetWidth } = this.$el
      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth))
      this.emitEvent(this.actualValue)
    },

    dragEnd (event: Event, offset: { left: number, top: number }) {
      const { offsetWidth } = this.$el
      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth))
      this.emitEvent(this.actualValue, true)
    },

    emitEvent(value: number, isDragEnd: ?boolean) {
      this.$emit('input', value)
      if (isDragEnd) {
        this.$emit('change', value)
      }
    },

    valueFromBounds (point: number, width: number) {
      return (point / width) * (this._max - this._min) + this._min
    },

    round (value: number): number {
      return round(value, this._min, this._max, this._step)
    }
  },

  components: {
    DragHelper
  }
}
</script>

<style lang="scss">
.range-slider {
  display: inline-block;
  position: relative;
  height: 20px;
  width: 130px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    height: 4px;
    width: 100%;
    background-color: #ccc;
    transform: translateY(-50%);
  }
}

.range-slider-handler {
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -10px;
  margin-left: -5px;
  height: 20px;
  width: 10px;
  background-color: #aaa;
}

.range-slider-hidden {
  display: none;
}
</style>
