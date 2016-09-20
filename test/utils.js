import assert from 'power-assert'
import { round } from '../src/utils'

describe('utils', () => {
  it('round', () => {
    assert(round(-1, 0, 50, 1) === 0)
    assert(round(11, 0, 10, 1) === 10)
  })
})
