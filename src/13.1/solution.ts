import inputExample from './input-example.json'
import input from './input.json'

export type Input = {
  markStrings: string[]
  foldStrings: string[]
}

export function parseInput(inputString: Input) {
  const marks = inputString.markStrings.map((m) => m.split(',').map((m) => parseInt(m)))
  const maxX = Math.max(...marks.map((m) => m[0])) + 1
  const maxY = Math.max(...marks.map((m) => m[1])) + 1

  const matrix = initMatrix(maxX, maxY)
  const folds = inputString.foldStrings
    .map((m) => m.split('='))
    .map(([axis, value]) => {
      if (axis === 'x') return [parseInt(value), 0]
      return [0, parseInt(value)]
    })

  for (let mark of marks) {
    matrix[mark[1]][mark[0]] = true
  }
  return { matrix, folds }
}

function initMatrix(x: number, y: number): boolean[][] {
  return Array(y)
    .fill([])
    .map((a) => Array(x).fill(false))
}

export function foldMatrix(fold: number[], matrix: boolean[][]) {
  if (!fold[0]) return foldVertically(fold[1], matrix)
  else return foldHorizontally(fold[0], matrix)
}

function foldVertically(foldY: number, matrix: boolean[][]) {
  const foldedMatrix = initMatrix(matrix[0].length, foldY)
  const foldValues = matrix.slice(foldY + 1, matrix.length)
  foldValues.reverse()
  for (let i = 0; i < foldedMatrix.length; ++i) {
    for (let j = 0; j < foldedMatrix[i].length; ++j) {
      foldedMatrix[i][j] = matrix[i][j] || foldValues[i][j]
    }
  }
  return foldedMatrix
}

function foldHorizontally(foldX: number, matrix: boolean[][]) {
  const foldedMatrix = initMatrix(foldX, matrix.length)
  const foldValues = matrix.map((m) => m.slice(foldX + 1, matrix[0].length))
  foldValues.forEach((f) => f.reverse())
  for (let i = 0; i < foldedMatrix.length; ++i) {
    for (let j = 0; j < foldedMatrix[i].length; ++j) {
      foldedMatrix[i][j] = matrix[i][j] || foldValues[i][j]
    }
  }
  return foldedMatrix
}

function countDots(matrix: boolean[][]) {
  return matrix.reduce(
    (prev, curr) =>
      prev +
      curr.reduce((prev1, curr1) => {
        if (curr1) return prev1 + 1
        return prev1
      }, 0),
    0
  )
}

export function transparentOrigami(inputString: Input) {
  const { matrix, folds } = parseInput(inputString)
  let foldedMatrix = matrix
  foldedMatrix = foldMatrix(folds[0], matrix)
  return countDots(foldedMatrix)
}

// console.log(transparentOrigami(inputExample))
// console.log(transparentOrigami(input))
