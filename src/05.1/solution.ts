//import input from './input-example.json'
import input from './input.json'

type Coord = { x: number; y: number }

type Line = {
  start: Coord
  end: Coord
}

export function parseInput(inputs: string[]) {
  return inputs.map((input) => {
    const [start, end] = input.split(' -> ')
    const parseCoords = (coords: string) => {
      const [x, y] = coords.split(',')
      return { x: parseInt(x), y: parseInt(y) }
    }
    return {
      start: parseCoords(start),
      end: parseCoords(end),
    } as Line
  })
}

export function getMaxCoords(lines: Line[]) {
  const maxCoords: Coord = { x: 0, y: 0 }
  for (let line of lines) {
    maxCoords.x = Math.max(line.start.x, line.end.x, maxCoords.x)
    maxCoords.y = Math.max(line.start.y, line.end.y, maxCoords.y)
  }
  return maxCoords
}

export function buildLineMatrix(maxCoords: Coord, lines: Line[]) {
  const matrix = Array(maxCoords.y + 1)
    .fill([])
    .map((a) => Array(maxCoords.x + 1).fill(0))
  for (let line of lines) {
    if (line.start.x !== line.end.x && line.start.y !== line.end.y) continue
    const minX = Math.min(line.start.x, line.end.x)
    const maxX = Math.max(line.start.x, line.end.x)
    const minY = Math.min(line.start.y, line.end.y)
    const maxY = Math.max(line.start.y, line.end.y)
    for (let i = 0; i <= maxX - minX || i <= maxY - minY; ++i) {
      const x = Math.min(minX + i, maxX)
      const y = Math.min(minY + i, maxY)
      matrix[y][x]++
    }
  }
  return matrix
}

export function calculateOverlaps(matrix: number[][]) {
  const max = 2
  let maxCount = 0
  for (let row of matrix) {
    for (let col of row) {
      if (col >= max) maxCount++
    }
  }
  return maxCount
}

function hydrotermalVenture() {
  const lines = parseInput(input)
  const maxCoords = getMaxCoords(lines)
  const lineMatrix = buildLineMatrix(maxCoords, lines)
  return calculateOverlaps(lineMatrix)
}

// console.log(hydrotermalVenture())
