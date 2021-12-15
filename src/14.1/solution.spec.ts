import inputExample from './input-example.json'
import { extendedPolymerization } from './solution'

test('Should calculate polymer correctly for step 1', () => {
  expect(extendedPolymerization(inputExample, 1).polymer).toBe('NCNBCHB')
})
test('Should calculate polymer correctly for step 2', () => {
  expect(extendedPolymerization(inputExample, 2).polymer).toBe('NBCCNBBBCBHCB')
})
test('Should calculate polymer correctly for step 3', () => {
  expect(extendedPolymerization(inputExample, 3).polymer).toBe('NBBBCNCCNBBNBNBBCHBHHBCHB')
})
test('Should calculate polymer correctly for step 4', () => {
  expect(extendedPolymerization(inputExample, 4).polymer).toBe(
    'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB'
  )
})
