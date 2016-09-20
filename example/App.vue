<template lang="html">
  <div>
    <range-slider min="50" max="300" step="50"></range-slider>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  data () {
    return {}
  },
  components: {
    RangeSlider
  }
}
</script>
