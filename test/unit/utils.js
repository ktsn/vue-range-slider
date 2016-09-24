import assert from 'power-assert'
import { round } from '../../src/utils'

describe('utils', () => {
  describe('round', () => {
    it('min, max', () => {
      assert(round(-1, 0, 50, 2) === 0)
      assert(round(11, 0, 10, 2) === 10)
    })

    it('do not touch the value on the multiple of step', () => {
      assert(round(5, 0, 10, 5) === 5)
    })

    it('round to multiple of step', () => {
      assert(round(10, 3, 12, 3) === 9)
    })

    it('fraction', () => {
      assert(round(4.1, 0, 10, 1.5) === 4.5)
    })
  })
})
