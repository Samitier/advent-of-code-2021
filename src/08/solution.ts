import fs from 'fs/promises'

enum Direction {
  left,
  up,
  right,
  down,
}

async function parseInput() {
  const file = await fs.readFile(__dirname + '/input.txt')
  return file
    .toString()
    .split('\n')
    .map((a) => a.split('').map(Number))
}

function isHidden(
  matrix: number[][],
  y: number,
  x: number,
  height: number,
  direction: Direction
): boolean {
  if (x < 0 || x >= matrix[0].length || y < 0 || y >= matrix.length) return false
  if (height <= matrix[y][x]) return true
  switch (direction) {
    case Direction.left:
      return isHidden(matrix, y, x - 1, height, direction)
    case Direction.up:
      return isHidden(matrix, y - 1, x, height, direction)
    case Direction.right:
      return isHidden(matrix, y, x + 1, height, direction)
    case Direction.down:
    default:
      return isHidden(matrix, y + 1, x, height, direction)
  }
}

async function problem1() {
  const trees = await parseInput()

  let visibleCount = 0
  for (let y = 1; y < trees.length - 1; ++y) {
    for (let x = 1; x < trees[y].length - 1; ++x) {
      if (
        isHidden(trees, y + 1, x, trees[y][x], Direction.down) &&
        isHidden(trees, y - 1, x, trees[y][x], Direction.up) &&
        isHidden(trees, y, x - 1, trees[y][x], Direction.left) &&
        isHidden(trees, y, x + 1, trees[y][x], Direction.right)
      ) {
        visibleCount++
      }
    }
  }

  console.log(trees.length * trees[0].length - visibleCount)
}

function getScenicScore(
  matrix: number[][],
  y: number,
  x: number,
  height: number,
  direction: Direction
): number {
  if (x < 0 || x >= matrix[0].length || y < 0 || y >= matrix.length) return 0
  if (height <= matrix[y][x]) return 1
  switch (direction) {
    case Direction.left:
      return 1 + getScenicScore(matrix, y, x - 1, height, direction)
    case Direction.up:
      return 1 + getScenicScore(matrix, y - 1, x, height, direction)
    case Direction.right:
      return 1 + getScenicScore(matrix, y, x + 1, height, direction)
    case Direction.down:
    default:
      return 1 + getScenicScore(matrix, y + 1, x, height, direction)
  }
}

async function problem2() {
  const trees = await parseInput()

  let maxScenicScore = 0
  for (let y = 0; y < trees.length; ++y) {
    for (let x = 0; x < trees[y].length; ++x) {
      const score =
        getScenicScore(trees, y - 1, x, trees[y][x], Direction.up) *
        getScenicScore(trees, y + 1, x, trees[y][x], Direction.down) *
        getScenicScore(trees, y, x - 1, trees[y][x], Direction.left) *
        getScenicScore(trees, y, x + 1, trees[y][x], Direction.right)
      maxScenicScore = Math.max(maxScenicScore, score)
    }
  }
  console.log(maxScenicScore)
}

problem2()
