import { numbers, boardStrings } from './input'
//import { numbers, boardStrings } from './exampleInput'
import { parseBoards, calculateWinningRate } from '../04.1/solution'

// Using exactly the same algorithm as first day, just grabbing the last
// board to win (I was lucky AF with this).
function bingo() {
  const boards = parseBoards(boardStrings)
  const [winningBoard] = boards
    .map((b) => calculateWinningRate(b, numbers))
    .sort((a, b) => b.rate - a.rate)
  return winningBoard.sum * numbers[winningBoard.rate]
}

console.log(bingo())
