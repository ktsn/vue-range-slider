export default class ExamplePage {
  constructor (t) {
    this.t = t
  }

  get wait () {
    return this.t
  }

  setName (name) {
    this.t = this.t.typeText('.name', name, { replace: true })
    return this
  }

  setValue (value) {
    this.t = this.t.typeText('.value', String(value), { replace: true })
    return this
  }

  setMin (min) {
    this.t = this.t.typeText('.min', String(min), { replace: true })
    return this
  }

  setMax (max) {
    this.t = this.t.typeText('.max', String(max), { replace: true })
    return this
  }

  setStep (step) {
    this.t = this.t.typeText('.step', String(step), { replace: true })
    return this
  }

  toggleDisabled () {
    this.t = this.t.click('.disabled')
    return this
  }

  moveSlider (offsetRatio) {
    this.t = this.t.drag(
      '.range-slider-knob',
      // the width that knob can move is 200
      // keep mouse position at the knob center
      200 * offsetRatio,
      0,
      { offsetX: 10, offsetY: 10 }
    )
    return this
  }

  getValue () {
    return this.t.select('.value').value
  }

  getSliderName () {
    return this.t
      .select('.range-slider input')
      .then(el => el.getAttribute('name'))
  }

  getSliderValue () {
    return this.t
      .select('.range-slider input')
      .value
  }
}
