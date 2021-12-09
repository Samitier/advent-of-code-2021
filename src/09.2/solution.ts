import inputExample from './input-example.json'
import input from './input.json'
import { parseInput, getLowestPoints } from '../09.1/solution'

type Direction = 'up' | 'left' | 'right' | 'left' | 'down' | ''
const maxHeight = 9

function calculateBasinSize(
  heightmap: number[][],
  [x, y]: number[],
  visitedPoints: number[][] = []
): number {
  if (
    x < 0 ||
    x >= heightmap[0].length ||
    y < 0 ||
    y >= heightmap.length ||
    heightmap[y][x] === maxHeight
  ) {
    return 0
  }

  visitedPoints.push([x, y])

  let points = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]

  return points.reduce((prev, [newX, newY]) => {
    const isPointVisited = visitedPoints.find(([px, py]) => px === newX && py === newY)
    if (isPointVisited) return prev
    return prev + calculateBasinSize(heightmap, [newX, newY], visitedPoints)
  }, 1)
}

function smokeBasin(inputStrings: string[]) {
  const heightmap = parseInput(inputStrings)
  const lowestPoints = getLowestPoints(heightmap)
  const basinSizes = lowestPoints.map((point) => calculateBasinSize(heightmap, point))
  const [basin1, basin2, basin3] = basinSizes.sort((a, b) => b - a)
  return basin1 * basin2 * basin3
}

//console.log(smokeBasin(inputExample))
console.log(smokeBasin(input))
