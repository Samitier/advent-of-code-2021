import inputExample1 from './input-example1.json'
import input from './input.json'

export const startCaveName = 'start'
export const endCaveName = 'end'

export class Cave {
  name: string
  isBig: boolean
  connections: Cave[] = []

  constructor(name: string) {
    this.name = name
    this.isBig = name.charAt(0).toUpperCase() === name.charAt(0)
  }

  addConnection(cave: Cave) {
    if (this.connections.find((c) => c.name === cave.name)) return
    this.connections.push(cave)
  }
}

function findOrCreateCave(caves: Cave[], name: string) {
  let cave = caves.find((c) => c.name === name)
  if (!cave) {
    cave = new Cave(name)
    caves.push(cave)
  }
  return cave
}

export function parseInput(inputStrings: string[]) {
  const paths = inputStrings.map((p) => {
    const [from, to] = p.split('-')
    return { from, to }
  })
  const caves: Cave[] = []
  while (paths.length) {
    const path = paths.shift()
    if (!path) break // TS complains if not.
    const caveFrom = findOrCreateCave(caves, path.from)
    const caveTo = findOrCreateCave(caves, path.to)
    caveFrom.addConnection(caveTo)
    caveTo.addConnection(caveFrom)
  }
  return caves.find((c) => c.name === startCaveName)
}

function pathFinding(currentCave: Cave, path: Cave[]) {
  const currentPath = [...path, currentCave]
  if (currentCave.name === endCaveName) return [currentPath]
  const paths: Cave[][] = []
  for (let connection of currentCave.connections) {
    // If its small and we already passed there, the path is not valid
    if (!connection.isBig && path.includes(connection)) continue
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

//console.log(passagePathing(inputExample1))
//console.log(passagePathing(input))
