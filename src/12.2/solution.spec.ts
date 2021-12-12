import { Cave } from '../12.1/solution'
import inputExample1 from './input-example1.json'
import inputExample2 from './input-example2.json'
import inputExample3 from './input-example3.json'
import { passagePathing } from './solution'

test('Should calculate number of paths correctly for example 1', () => {
  expect(passagePathing(inputExample1)).toBe(36)
})
test('Should calculate number of paths correctly for example 2', () => {
  expect(passagePathing(inputExample2)).toBe(103)
})
test('Should calculate number of paths correctly for example 2', () => {
  expect(passagePathing(inputExample3)).toBe(3509)
})
