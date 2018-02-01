# vue-range-slider

Simple slider component of Vue.js

## Features

- Compatible with native `input[type="range"]` behavior
- `input`, `change` event support
- Touch device support

## Requirements

Vue >= 2.0

## Installation

### NPM

```bash
npm install --save vue-range-slider
```

### Yarn

```bash
yarn add vue-range-slider
```

## Usage

### Basic Usage

Just import vue-range-slider component and use it in your components. The props are compatible with native `input[type="range"]` element, so you can use `min`, `max`, `step` etc. like native element.

```html
<template>
  <range-slider
    class="slider"
    min="10"
    max="1000"
    step="10"
    v-model="sliderValue">
  </range-slider>
</template>

<script>
import RangeSlider from 'vue-range-slider'
// you probably need to import built-in style
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  data () {
    return {
      sliderValue: 50
    }
  },
  components: {
    RangeSlider
  }
}
</script>

<style>
.slider {
  /* overwrite slider styles */
  width: 200px;
}
</style>
```

Available props:

- `name` - name of the slider input.
- `value` - current value of the slider.
- `disabled` - if true, the slider value cannot be updated.
- `min` - minimum value of the slider.
- `max` - maximum value of the slider.
- `step` - granularity of the slider value. e.g. if this is 3, the slider value will be 3, 6, 9, ...

Available slots:
- `knob` - slot for replacing knob

### Overwrite Default Styles

vue-range-slider is built with Sass for its styling. If you want to customize vue-range-slider styles, you can easily do that by configuring Sass variables. Available variables can be seen in [the component file](src/RangeSlider.vue).

Example of making the slider knob larger:

```sass
// set the variable of the knob size
$knob-size: 30px;

// import the built-in vue-range-slider style
@import '~vue-range-slider/dist/vue-range-slider.scss';
```

## License

MIT
