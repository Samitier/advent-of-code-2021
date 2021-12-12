import { Cave, endCaveName, parseInput, startCaveName } from '../12.1/solution'
import inputExample2 from './input-example2.json'
import inputExample1 from './input-example1.json'
import input from './input.json'

export function isPathInvalid(path: Cave[]) {
  const smallCaves = path.filter((p) => !p.isBig).map((p) => p.name)
  const uniqueSmallCaves = [...new Set(smallCaves)]
  return smallCaves.length - uniqueSmallCaves.length > 1
}

function pathFinding(currentCave: Cave, path: Cave[]) {
  const currentPath = [...path, currentCave]
  if (isPathInvalid(currentPath)) return []
  if (currentCave.name === endCaveName) return [currentPath]
  const paths: Cave[][] = []
  for (let connection of currentCave.connections) {
    // We can't pass twice in the start
    if (connection.name === startCaveName) continue
    // Go there and calculate all possible paths from that cave
    paths.push(...pathFinding(connection, currentPath))
  }
  return paths
}

export function passagePathing(inputStrings: string[]) {
  const startCave = parseInput(inputStrings)
  if (!startCave) throw Error('Parsing error')
  return pathFinding(startCave, []).length
}

// console.log(passagePathing(inputExample1))
// console.log(passagePathing(inputExample2))
// console.log(passagePathing(input))
