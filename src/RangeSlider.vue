<template lang="html">
  <span class="range-slider">
    <drag-helper
      target-selector=".range-slider-knob"
      v-bind:disabled="disabled"
      @drag="drag"
      @dragend="dragEnd">
      <span ref="inner" class="range-slider-inner">
        <input class="range-slider-hidden" type="text" :name="name" :value="actualValue">
        <span class="range-slider-rail"></span>
        <span class="range-slider-fill" :style="{ width: valuePercent + '%' }"></span>
        <span class="range-slider-clickarea" @click="clickSet"></span>
        <span class="range-slider-knob" :style="{ left: valuePercent + '%' }"></span>
      </span>
    </drag-helper>
  </span>
</template>

<script>
// @flow

import DragHelper from './DragHelper'
import { round, relativeMouseOffset } from './utils'

export default {
  props: {
    name: String,
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
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
      actualValue: null
    }
  },

  created () {
    const { _min: min, _max: max } = this
    let defaultValue = Number(this.value)

    if (this.value == null || isNaN(defaultValue)) {
      if (min > max) {
        defaultValue = min
      } else {
        defaultValue = (min + max) / 2
      }
    }

    this.actualValue = this.round(defaultValue)
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
      const value = Number(newValue)
      if (newValue != null && !isNaN(value)) {
        this.actualValue = this.round(value)
      }
    },
    min () {
      this.actualValue = this.round(this.actualValue)
    },
    max () {
      this.actualValue = this.round(this.actualValue)
    }
  },

  methods: {

    clickSet (event: Event) {
      const { offsetWidth } = this.$refs.inner
      const mouseOffSet = relativeMouseOffset(event, event.target)
      this.actualValue = this.round(this.valueFromBounds(mouseOffSet.left, offsetWidth))
      this.emitEvent(this.actualValue)
    },

    drag (event: Event, offset: { left: number, top: number }) {
      const { offsetWidth } = this.$refs.inner
      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth))
      this.emitEvent(this.actualValue)
    },

    dragEnd (event: Event, offset: { left: number, top: number }) {
      const { offsetWidth } = this.$refs.inner
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
$slider-height: 20px;
$slider-width: 130px;
$rail-height: 4px;
$knob-size: 20px;

$rail-color: #e2e2e2;
$rail-fill-color: #21fb92;
$knob-color: #fff;

$knob-border: 1px solid #f5f5f5;
$knob-shadow: 1px 1px rgba(0, 0, 0, 0.2);

.range-slider {
  display: inline-block;
  padding: 0 ($knob-size / 2);
  height: $slider-height;
  width: $slider-width;
}

.range-slider-inner {
  display: inline-block;
  position: relative;
  height: 100%;
  width: 100%;
}

.range-slider-rail,
.range-slider-fill {
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  height: $rail-height;
  border-radius: $rail-height / 2;
  transform: translateY(-50%);
}

.range-slider-rail {
  width: 100%;
  background-color: $rail-color;
}

.range-slider-fill {
  background-color: $rail-fill-color;
}

.range-slider-clickarea {
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30%;
  background-color: transparent;
  transform: translateY(-50%);
}

.range-slider-knob {
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  box-sizing: border-box;
  height: $knob-size;
  width: $knob-size;
  border: $knob-border;
  border-radius: 50%;
  background-color: $knob-color;
  box-shadow: $knob-shadow;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.range-slider-hidden {
  display: none;
}
</style>
