import assert from 'assert'
import ExamplePage from '../pages/example'

let page

fixture`Example`
  .page`http://localhost:8080/`
  .beforeEach(t => page = new ExamplePage(t))

test('default value', async () => {
  assert(await page.getSliderValue() === '50')
  assert(await page.getValue() === '')
})

test('sets name and value to the input field in the slider', async () => {
  await page
    .setName('some_name')
    .setValue(12)
    .wait

  assert(await page.getSliderName() === 'some_name')
  assert(await page.getSliderValue() === '12')
})

test('updates value by dragging slider', async () => {
  await page.moveSlider(0.25).wait
  assert(await page.getValue() === '75')
})

test('limits between min and max value', async () => {
  await page.moveSlider(2).wait
  assert(await page.getSliderValue() === '100')

  await page.moveSlider(-2).wait
  assert(await page.getSliderValue() === '0')
})

test('changes step value', async () => {
  await page.setValue(20).setStep(50).wait

  // should not modify the value by updating step
  assert(await page.getSliderValue() === '20')

  await page.setValue(0).moveSlider(0.25).wait
  assert(await page.getSliderValue() === '50')

  await page.setValue(0).moveSlider(0.24).wait
  assert(await page.getSliderValue() === '0')
})


test('changes min and max value', async () => {
  await page.setStep(1).setValue(0).setMin(30).wait
  // modify to correct value for current min
  assert(await page.getSliderValue() === '30')
  // but the change should not propagate to parent
  assert(await page.getValue() === '0')

  await page.setMin(0).setStep(3).setValue(9).setMax(8).wait
  // modify to correct value for current max
  assert(await page.getSliderValue() === '6')
  // but the change should not propagate to parent
  assert(await page.getValue() === '9')

  await page.setStep(1).setMin(30).setMax(200).setValue(100).wait

  await page.moveSlider(-1).wait
  assert(await page.getSliderValue() === '30')

  await page.moveSlider(1).wait
  assert(await page.getSliderValue() === '200')
})

test('disables slider', async () => {
  await page.setStep(1).setMin(0).setMax(100).setValue(50).wait

  await page.toggleDisabled()
    .moveSlider(-1).wait
  assert(await page.getSliderValue() === '50')

  await page.toggleDisabled()
    .moveSlider(-1).wait
  assert(await page.getSliderValue() === '0')
})

test('move knob by clicking rail', async () => {
  await page.clickRail(0.75).wait
  assert(await page.getSliderValue() === '75')
})
