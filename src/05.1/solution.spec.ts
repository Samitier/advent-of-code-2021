import { buildLineMatrix, getMaxCoords, parseInput } from './solution'
import input from './input-example.json'

test('Should parse input correctly', () => {
  const parsedInput = parseInput(['0,9 -> 5,9', '8,0 -> 0,8'])
  expect(parsedInput[0]).toStrictEqual({ start: { x: 0, y: 9 }, end: { x: 5, y: 9 } })
  expect(parsedInput[1]).toStrictEqual({ start: { x: 8, y: 0 }, end: { x: 0, y: 8 } })
})

test('Should get max coords correctly', () => {
  const maxCoords = getMaxCoords(parseInput(['0,9 -> 5,9', '8,0 -> 0,8']))
  expect(maxCoords.x).toBe(8)
  expect(maxCoords.y).toBe(9)
})

test('Should render matrix correctly', () => {
  const lines = parseInput(input)
  const maxCoords = getMaxCoords(lines)
  const lineMatrix = buildLineMatrix(maxCoords, lines)
  expect(lineMatrix).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 2, 1, 1, 1, 2, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
  ])
})
