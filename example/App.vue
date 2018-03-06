<template>
  <form action="#" method="get">
    <range-slider
      class="slider"
      v-model="value"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"></range-slider>

    <div>
      name
      <input class="name" type="text" v-model="name">
    </div>

    <div>
      value
      <input class="value" type="number" v-model="value">
    </div>

    <div>
      min
      <input class="min" type="number" v-model="min">
    </div>

    <div>
      max
      <input class="max" type="number" v-model="max">
    </div>

    <div>
      step
      <input class="step" type="number" v-model="step">
    </div>

    <div>
      disabled
      <input class="disabled-input" type="checkbox" v-model="disabled">
    </div>
  </form>
</template>

<script>
import RangeSlider from 'vue-range-slider'

export default {
  data () {
    return {
      name: null,
      value: undefined,
      min: 0,
      max: 100,
      step: 1,
      disabled: false
    }
  },
  components: {
    RangeSlider
  }
}
</script>
