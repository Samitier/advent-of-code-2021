import inputExample from './input-example.json'
import input from './input.json'
import { parseInput, foldMatrix, Input } from '../13.1/solution'

function prettyRender(matrix: boolean[][]) {
  for (let row of matrix) {
    console.log(row.map((c) => (c ? '⚪' : '⚫')).join(''))
  }
}

export function transparentOrigami(inputString: Input) {
  const { matrix, folds } = parseInput(inputString)
  let foldedMatrix = matrix
  for (let fold of folds) {
    foldedMatrix = foldMatrix(fold, foldedMatrix)
  }
  prettyRender(foldedMatrix)
}

//console.log(transparentOrigami(inputExample))
console.log(transparentOrigami(input))
