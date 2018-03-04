<template lang="html">
  <span class="range-slider" ref="elem" @mousedown="shiftKnob" :class="{ disabled }">
    <drag-helper
      target-selector=".range-slider-knob"
      v-bind:disabled="disabled"
      @drag="drag"
      @dragend="dragEnd">
      <span ref="inner" class="range-slider-inner">
        <input class="range-slider-hidden" type="text" :name="name" :value="actualValue" :disabled="disabled">
        <span class="range-slider-rail"></span>
        <span class="range-slider-fill" :style="{ width: valuePercent + '%' }"></span>
        <span class="range-slider-knob" :style="{ left: valuePercent + '%' }">
          <slot name="knob"></slot>
          <popover v-if="!noPopover">
            <slot name="popover"></slot>
          </popover>
        </span>
        <span class="range-slider-calibration" v-if="!noCalibration">
          <span class="calibration-item" v-for="offset in calibrationOffsets" :key="offset" :style="{ left: offset + '%' }">
            <div>|</div>
            <span class="calibration-knob">{{(offset / 100 * (_max - _min)) + _min}}</span>
          </span>
        </span>
      </span>
    </drag-helper>
  </span>
</template>

<script>
// @flow

import DragHelper from './DragHelper'
import { round } from './utils'
import popover from './popover.vue'

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
    },
    noPopover: {
      type: Boolean,
      default: false
    },
    noCalibration: {
      type: Boolean,
      default: false
    },
    calibrationCount: {
      type: Number,
      default: 10
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
    },

    calibrationOffsets () {
      //this can definitely be improved
      return [0, ...'0'.repeat(this.calibrationCount).split('').map((c, i) => (i + 1))].map(i => i / this.calibrationCount * 100)
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
    },

    shiftKnob (e: Event) {

      if (['range-slider', 'range-slider-inner', 'range-slider-fill'].some(c => e.path[0].classList.contains(c))) {
        const x = e.pageX - this.$refs.elem.offsetLeft
      
        const percent = Math.floor(x / this.$refs.elem.offsetWidth * 100)

        this.actualValue = this.round((percent / 100 * (this._max - this._min)) + this._min)

        this.emitEvent(this.actualValue, true)

        console.log(e)
      }
      
    }
  },

  components: {
    DragHelper,
    popover
  },

  mounted () {
    
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

.range-slider-calibration {
  display: block;
  position: absolute;
  width: 100%;
  top: 100%;
  box-sizing: border-box;

  .calibration-item {
    color: #777;
    display: inline-block;
    position: absolute;
    width: 50px;

    .calibration-knob {
      position: absolute;
      left: -30%;
    }
  }
}

.range-slider-hidden {
  display: none;
}
</style>
