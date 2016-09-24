const assert = require('power-assert')
const browser = require('testium-mocha').browser
const ExamplePage = require('./pages/example')

describe('Example', () => {
  let page

  before(browser.beforeHook())

  before('load example page', () => {
    browser.navigateTo('/')
    browser.assert.httpStatus(200)
    page = new ExamplePage(browser)
  })

  it('default value', () => {
    assert(page.getSliderValue() === '50')
    assert(page.getValue() === '')
  })

  it('sets name and value to the input field in the slider', () => {
    page
      .setName('some_name')
      .setValue(12)

    assert(page.getSliderName() === 'some_name')
    assert(page.getSliderValue() === '12')
  })

  it('updates value by dragging slider', () => {
    page.moveSlider(0.5)
    assert(page.getValue() === '62')
  })

  it('limits between min and max value', () => {
    page.moveSlider(1)
    assert(page.getSliderValue() === '100')

    page.moveSlider(-1)
    assert(page.getSliderValue() === '0')
  })

  it('changes step value', () => {
    page.setValue(20)
      .setStep(50)

    // should not modify the value by updating step
    assert(page.getSliderValue() === '20')

    page.setValue(0).moveSlider(0.25)
    assert(page.getSliderValue() === '50')

    page.setValue(0).moveSlider(0.24)
    assert(page.getSliderValue() === '0')
  })


  it('changes min and max value', () => {
    page.setStep(1).setValue(0).setMin(30)
    // modify to correct value for current min
    assert(page.getSliderValue() === '30')
    // but the change should not propagate to parent
    assert(page.getValue() === '0')

    page.setMin(0).setStep(3).setValue(9).setMax(8)
    // modify to correct value for current max
    assert(page.getSliderValue() === '6')
    // but the change should not propagate to parent
    assert(page.getValue() === '9')

    page.setStep(1).setMin(30).setMax(200).setValue(100)

    page.moveSlider(-1)
    assert(page.getSliderValue() === '30')

    page.moveSlider(1)
    assert(page.getSliderValue() === '200')
  })

  it('disables slider', () => {
    page.setStep(1).setMin(0).setMax(100).setValue(50)

    page.toggleDisabled()
      .moveSlider(-1)
    assert(page.getSliderValue() === '50')

    page.toggleDisabled()
      .moveSlider(-1)
    assert(page.getSliderValue() === '0')
  })
})
