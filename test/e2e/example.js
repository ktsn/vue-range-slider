const assert = require('power-assert')
const browser = require('testium-mocha').browser

describe('Example', () => {
  before(browser.beforeHook())

  before('load example page', () => {
    browser.navigateTo('/')
    browser.assert.httpStatus(200)
  })

  it('shows the right title', () => {
    assert(browser.getPageTitle() === 'vue-range-slider example')
  })
})
