import inputExample from './input-example.json'
import input from './input.json'

export function parseInput(inputStrings: string[]) {
  return inputStrings.map((i) => i.split('').map((i) => parseInt(i)))
}

function isLowestPoint(heightmap: number[][], x: number, y: number) {
  const point = heightmap[y][x]
  const avobe = y === 0 ? -1 : heightmap[y - 1][x]
  const below = y === heightmap.length - 1 ? -1 : heightmap[y + 1][x]
  const left = x === 0 ? -1 : heightmap[y][x - 1]
  const right = x === heightmap[y].length - 1 ? -1 : heightmap[y][x + 1]
  return [avobe, below, left, right].filter((a) => a !== -1).every((a) => point < a)
}

export function getLowestPoints(heightmap: number[][]) {
  const lowestPoints: number[][] = []
  for (let y = 0; y < heightmap.length; ++y) {
    for (let x = 0; x < heightmap[y].length; ++x) {
      if (isLowestPoint(heightmap, x, y)) {
        lowestPoints.push([x, y])
      }
    }
  }
  return lowestPoints
}

function calculateRiskLevel(heightmap: number[][], points: number[][]) {
  return points.reduce((prev, [x, y]) => prev + heightmap[y][x] + 1, 0)
}

function smokeBasin(inputStrings: string[]) {
  const heightmap = parseInput(inputStrings)
  const lowestPoints = getLowestPoints(heightmap)
  return calculateRiskLevel(heightmap, lowestPoints)
}

//console.log(smokeBasin(inputExample))
//console.log(smokeBasin(input))
