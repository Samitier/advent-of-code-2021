import fs from 'fs/promises'
import { goal, minHeight, parseInput } from './solution'

function isClimbable(to: string, from?: string) {
  if (!from) return true
  return (from === goal ? 'z' : from).charCodeAt(0) - to.charCodeAt(0) <= 1
}

function getMinSteps(
  heightmap: string[][],
  visitedPaths: number[][],
  x: number,
  y: number,
  previousElevation?: string,
  currentStep: number = 0
): void {
  if (
    x < 0 ||
    y < 0 ||
    x >= heightmap[0].length ||
    y >= heightmap.length ||
    visitedPaths[y][x] <= currentStep ||
    !isClimbable(heightmap[y][x], previousElevation)
  ) {
    return
  }
  visitedPaths[y][x] = currentStep

  // Only this condition and isClimbable function change in respect to solution 1. They can prob be merged.
  if (heightmap[y][x] === minHeight) return

  getMinSteps(heightmap, visitedPaths, x - 1, y, heightmap[y][x], currentStep + 1)
  getMinSteps(heightmap, visitedPaths, x + 1, y, heightmap[y][x], currentStep + 1)
  getMinSteps(heightmap, visitedPaths, x, y - 1, heightmap[y][x], currentStep + 1)
  getMinSteps(heightmap, visitedPaths, x, y + 1, heightmap[y][x], currentStep + 1)
}

async function solution2() {
  const { heightmap } = await parseInput()

  const visitedPaths = new Array(heightmap.length)
    .fill('')
    .map(() => new Array(heightmap[0].length).fill(Infinity))

  for (let y = 0; y < heightmap.length; ++y) {
    for (let x = 0; x < heightmap[y].length; ++x) {
      if (heightmap[y][x] !== goal) continue
      getMinSteps(heightmap, visitedPaths, x, y)
    }
  }
  let min = Infinity
  for (let y = 0; y < heightmap.length; ++y) {
    for (let x = 0; x < heightmap[y].length; ++x) {
      if (heightmap[y][x] !== minHeight) continue
      min = Math.min(min, visitedPaths[y][x])
    }
  }
  console.log(min)
}

solution2()
