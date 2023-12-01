import fs from 'fs/promises'

enum Material {
  rock = '#',
  air = '.',
  sand = 'o',
}

type Coord = {
  x: number
  y: number
}

class SandOutOfBoundsError extends Error {}

async function parseInput() {
  const sandSource: Coord = { x: 500, y: 0 }
  const paths: Coord[][] = (await fs.readFile(__dirname + '/input.txt'))
    .toString()
    .split('\n')
    .map((pathStr) =>
      pathStr.split(' -> ').map((coordsStr) => {
        const [x, y] = coordsStr.split(',').map(Number)
        return { x, y }
      })
    )
  // Normalize x axis
  const min = Math.min(...paths.flatMap((a) => a.map((b) => b.x)))
  sandSource.x -= min
  for (let path of paths) for (let coord of path) coord.x -= min
  return { sandSource, paths }
}

function debugRender(matrix: Material[][], sandSource?: Coord) {
  console.clear()
  for (let y = 0; y < matrix.length; ++y) {
    let line = ''
    for (let x = 0; x < matrix[y].length; ++x) {
      if (sandSource && sandSource.x === x && sandSource.y === y) line += '+'
      else line += matrix[y][x]
    }
    console.log(line)
  }
}

function buildMatrix(paths: Coord[][]) {
  const maxX = Math.max(...paths.flatMap((a) => a.map((b) => b.x))) + 1
  const maxY = Math.max(...paths.flatMap((a) => a.map((b) => b.y))) + 3
  const matrix: Material[][] = new Array(maxY)
    .fill('')
    .map((_, i) => new Array(maxX).fill(i === maxY - 1 ? Material.rock : Material.air))
  for (let path of paths) {
    for (let i = 0; i < path.length - 1; ++i) {
      const from = path[i]
      const to = path[i + 1]
      const lineVector = { x: to.x - from.x, y: to.y - from.y }
      for (let x = 0; x <= Math.abs(lineVector.x); ++x) {
        matrix[from.y][from.x + x * Math.sign(lineVector.x)] = Material.rock
      }
      for (let y = 0; y <= Math.abs(lineVector.y); ++y) {
        matrix[from.y + y * Math.sign(lineVector.y)][from.x] = Material.rock
      }
    }
  }
  return matrix
}

function calculateSandfall(matrix: Material[][], { x, y }: Coord, sandSource: Coord): void {
  const newY = y + 1
  if (matrix[newY][x] === Material.air) {
    return calculateSandfall(matrix, { x, y: newY }, sandSource)
  }
  let newX = x - 1
  if (newX < 0) {
    for (let i = 0; i < matrix.length; ++i)
      matrix[i].unshift(i === matrix.length - 1 ? Material.rock : Material.air)
    newX = 0
    sandSource.x += 1
  }
  if (matrix[newY][newX] === Material.air) {
    return calculateSandfall(matrix, { x: newX, y: newY }, sandSource)
  }
  newX = x + 1
  if (newX >= matrix[0].length) {
    for (let i = 0; i < matrix.length; ++i)
      matrix[i].push(i === matrix.length - 1 ? Material.rock : Material.air)
  }
  if (matrix[newY][newX] === Material.air) {
    return calculateSandfall(matrix, { x: newX, y: newY }, sandSource)
  }
  matrix[y][x] = Material.sand
}

async function solution() {
  const { sandSource, paths } = await parseInput()
  const matrix = buildMatrix(paths)
  let unitsOfSand = 0
  try {
    while (true) {
      if (matrix[sandSource.y][sandSource.x] === Material.sand) throw new SandOutOfBoundsError()
      calculateSandfall(matrix, { ...sandSource }, sandSource)
      ++unitsOfSand
    }
  } catch (e) {
    debugRender(matrix)
    console.log(unitsOfSand)
    console.log(e)
  }
}

solution()
