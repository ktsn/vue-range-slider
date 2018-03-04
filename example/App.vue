<template>
  <form action="#" method="get">
    <h4>Vue Range Slider</h4>
    <range-slider
      class="slider slider-small"
      v-model="value"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :no-popover="true"
      :no-calibration="true">
    </range-slider>
    
    <h4>Vue Range Slider with 5-step calibration</h4>
    <range-slider
      class="slider slider-large"
      v-model="value"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :no-popover="true"
      :calibration-count="5">
    </range-slider>
    
    <h4>Vue Range Slider with 10-step calibration</h4>
    <range-slider
      class="slider slider-large"
      v-model="value"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :no-popover="true"
      :calibration-count="10">
    </range-slider>
    
    <h4>Vue Range Slider with popover and calibration</h4>
    <range-slider
      class="slider slider-large"
      v-model="value"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :no-calibration="true">
      <template slot="popover">
        <h4>${{Number(value || 0).toLocaleString('en')}}</h4>
      </template>
    </range-slider>

    <div class="container">
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
        <input class="disabled" type="checkbox" v-model="disabled">
      </div>
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
      max: 2000,
      step: 1,
      disabled: false
    }
  },
  components: {
    RangeSlider
  }
}
</script>

<style>
  .slider {
    width: 100%;
  }

  .slider-small {
    margin-bottom: 20px;
  }

  .slider-large {
    margin-bottom: 80px;
  }

  .container {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 100px;
  }
</style>