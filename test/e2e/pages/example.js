class ExamplePage {
  constructor (browser) {
    this.browser = browser
    this.browser.waitForElementVisible('.range-slider', 5000)
  }

  setName (name) {
    this.browser.setValue('.name', name)
    return this
  }

  setValue (value) {
    this.browser.setValue('.value', value)
    return this
  }

  setMin (min) {
    this.browser.setValue('.min', min)
    return this
  }

  setMax (max) {
    this.browser.setValue('.max', max)
    return this
  }

  setStep (step) {
    this.browser.setValue('.step', step)
    return this
  }

  toggleDisabled () {
    this.browser.click('.disabled')
    return this
  }

  mouseDownSlider () {
    this.browser
      .getElement('.range-slider-knob')
      // intend to mouse down at center
      // knob size === 20
      .movePointerRelativeTo(10, 10)
    this.browser.buttonDown()
    return this
  }

  mouseUp () {
    this.browser.buttonUp()
    return this
  }

  moveSlider (offsetRatio) {
    this.mouseDownSlider()
    this.browser
      .getElement('.range-slider-knob')
      // the width that knob can move is 200
      // keep mouse position at the knob center
      .movePointerRelativeTo(200 * offsetRatio + 10, 10)
    this.mouseUp()
    return this
  }

  getValue () {
    return this.browser.getElement('.value').get('value')
  }

  getSliderName () {
    return this.browser
      .getElement('.range-slider input')
      .get('name')
  }

  getSliderValue () {
    return this.browser
      .getElement('.range-slider input')
      .get('value')
  }
}

module.exports = ExamplePage
