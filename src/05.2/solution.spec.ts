import { getMaxCoords, parseInput } from '../05.1/solution'
import { buildLineMatrix } from './solution'
import input from './input-example.json'

test('Should render matrix correctly', () => {
  const lines = parseInput(input)
  const maxCoords = getMaxCoords(lines)
  const lineMatrix = buildLineMatrix(maxCoords, lines)
  expect(lineMatrix).toStrictEqual([
    [1, 0, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 0, 2, 0, 0],
    [0, 0, 2, 0, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 2, 0, 2, 0, 0],
    [0, 1, 1, 2, 3, 1, 3, 2, 1, 1],
    [0, 0, 0, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
  ])
})
