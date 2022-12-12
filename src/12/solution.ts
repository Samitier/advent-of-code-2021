import fs from 'fs/promises'

export const startPosition = 'S' // a
export const minHeight = 'a'
export const goal = 'E' // z

export async function parseInput() {
  const file = await fs.readFile(__dirname + '/input.txt')
  let start = { x: 0, y: 0 }
  const heightmap = file
    .toString()
    .split('\n')
    .map((r) => r.split(''))
  for (let y = 0; y < heightmap.length; ++y) {
    for (let x = 0; x < heightmap[y].length; ++x) {
      if (heightmap[y][x] === startPosition) {
        start = { x, y }
        heightmap[y][x] = minHeight
      }
    }
  }
  return { heightmap, start }
}

function isClimbable(to: string, from?: string) {
  if (!from) return true
  return (to === goal ? 'z' : to).charCodeAt(0) - from.charCodeAt(0) <= 1
}

function getMinSteps(
  heightmap: string[][],
  visitedPaths: number[][],
  x: number,
  y: number,
  previousElevation?: string,
  currentStep: number = 0
): number {
  if (
    x < 0 ||
    y < 0 ||
    x >= heightmap[0].length ||
    y >= heightmap.length ||
    visitedPaths[y][x] <= currentStep ||
    !isClimbable(heightmap[y][x], previousElevation)
  ) {
    return Infinity
  }
  visitedPaths[y][x] = currentStep
  if (heightmap[y][x] === goal) return 0
  const paths = [
    getMinSteps(heightmap, visitedPaths, x - 1, y, heightmap[y][x], currentStep + 1),
    getMinSteps(heightmap, visitedPaths, x + 1, y, heightmap[y][x], currentStep + 1),
    getMinSteps(heightmap, visitedPaths, x, y - 1, heightmap[y][x], currentStep + 1),
    getMinSteps(heightmap, visitedPaths, x, y + 1, heightmap[y][x], currentStep + 1),
  ]
  return 1 + Math.min(...paths)
}

async function solution1() {
  const { heightmap, start } = await parseInput()
  const visitedPaths = new Array(heightmap.length)
    .fill('')
    .map(() => new Array(heightmap[0].length).fill(Infinity))
  console.log(getMinSteps(heightmap, visitedPaths, start.x, start.y))
}

solution1()
