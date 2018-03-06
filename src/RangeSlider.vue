<template lang="html">
  <span class="range-slider" :class="{ disabled }">
    <drag-helper
      v-bind:disabled="disabled"
      @dragstart="dragStart"
      @drag="drag"
      @dragend="dragEnd">
      <span ref="inner" class="range-slider-inner">
        <input class="range-slider-hidden" type="text" :name="name" :value="actualValue" :disabled="disabled">
        <span class="range-slider-rail"></span>
        <span class="range-slider-fill" :style="{ width: valuePercent + '%' }"></span>
        <span class="range-slider-knob" ref="knob" :style="{ left: valuePercent + '%' }">
          <slot name="knob"></slot>
        </span>
      </span>
    </drag-helper>
  </span>
</template>

<script>
// @flow

import DragHelper from './DragHelper'
import { round } from './utils'

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
      actualValue: null,
      dragStartValue: null
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
    dragStart (event: Event, offset: { left: number, top: number }) {
      this.dragStartValue = this.actualValue
      if (event.target === this.$refs.knob) {
        return
      }
      // If the click is out of knob, move it to mouse position
      this.drag(event, offset)
    },

    drag (event: Event, offset: { left: number, top: number }) {
      const { offsetWidth } = this.$refs.inner
      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth))
      this.emitInput(this.actualValue)
    },

    dragEnd (event: Event, offset: { left: number, top: number }) {
      const { offsetWidth } = this.$refs.inner
      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth))

      if (this.dragStartValue !== this.actualValue) {
        this.emitChange(this.actualValue)
      }
    },

    emitInput(value) {
      this.$emit('input', value)
    },

    emitChange(value) {
      this.$emit('change', value)
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
$slider-height: 20px !default;
$slider-width: 130px !default;
$rail-height: 4px !default;
$knob-size: 20px !default;

$rail-color: #e2e2e2 !default;
$rail-fill-color: #21fb92 !default;
$knob-color: #fff !default;

$knob-border: 1px solid #f5f5f5 !default;
$knob-shadow: 1px 1px rgba(0, 0, 0, 0.2) !default;

.range-slider {
  display: inline-block;
  padding: 0 ($knob-size / 2);
  height: $slider-height;
  width: $slider-width;
}

.range-slider.disabled {
  opacity: 0.5;
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
