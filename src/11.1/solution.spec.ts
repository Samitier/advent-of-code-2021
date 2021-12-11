import inputExample from './input-example.json'
import { nextStep, parseInput } from './solution'

test('Should calculate next step correctly', () => {
  const octopusLevels = parseInput(inputExample)
  nextStep(octopusLevels)
  expect(octopusLevels).toStrictEqual(
    parseInput([
      '6594254334',
      '3856965822',
      '6375667284',
      '7252447257',
      '7468496589',
      '5278635756',
      '3287952832',
      '7993992245',
      '5957959665',
      '6394862637',
    ])
  )
  nextStep(octopusLevels)
  expect(octopusLevels).toStrictEqual(
    parseInput([
      '8807476555',
      '5089087054',
      '8597889608',
      '8485769600',
      '8700908800',
      '6600088989',
      '6800005943',
      '0000007456',
      '9000000876',
      '8700006848',
    ])
  )
})
