import input from './input-example.json'
//import input from './input.json'
import { parseInput, calculateOverlaps, getMaxCoords } from '../05.1/solution'

type Coord = { x: number; y: number }

type Line = {
  start: Coord
  end: Coord
}

export function buildLineMatrix(maxCoords: Coord, lines: Line[]) {
  const matrix = Array(maxCoords.y + 1)
    .fill([])
    .map((a) => Array(maxCoords.x + 1).fill(0))
  for (let line of lines) {
    const minX = Math.min(line.start.x, line.end.x)
    const maxX = Math.max(line.start.x, line.end.x)
    const minY = Math.min(line.start.y, line.end.y)
    const maxY = Math.max(line.start.y, line.end.y)
    for (let i = 0; i <= maxX - minX || i <= maxY - minY; ++i) {
      const signX = Math.sign(line.end.x - line.start.x)
      const signY = Math.sign(line.end.y - line.start.y)
      const x = line.start.x + i * signX
      const y = line.start.y + i * signY
      matrix[y][x]++
    }
  }
  return matrix
}

function hydrotermalVenture() {
  const lines = parseInput(input)
  const maxCoords = getMaxCoords(lines)
  const lineMatrix = buildLineMatrix(maxCoords, lines)
  return calculateOverlaps(lineMatrix)
}

// console.log(hydrotermalVenture())
