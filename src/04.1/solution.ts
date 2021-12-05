import { numbers, boardStrings } from './input'
// import { numbers, boardStrings } from './exampleInput'

export function parseBoards(boardsAsString: string) {
  return boardsAsString.split('\n\n').map((b) =>
    b.split('\n').map((b) =>
      b
        .split(' ')
        .filter((b) => b)
        .map((b) => parseInt(b))
    )
  )
}

// Returns rate = positive infinity if board is not winnable or the n amount of
// plays to win the board.
// Also returns all the sums of unmarked numbers up until that point.
export function calculateWinningRate(board: number[][], playedNumbers: number[]) {
  const boardCopy: number[][] = JSON.parse(JSON.stringify(board))
  let rate = Number.POSITIVE_INFINITY
  let sum = 0
  for (let i = 0; i < board.length; ++i) {
    for (let j = 0; j < board[i].length; ++j) {
      boardCopy[i][j] = playedNumbers.indexOf(boardCopy[i][j])
      if (boardCopy[i][j] === -1) return { rate, sum }
    }
  }
  for (let i = 0; i < board.length; ++i) {
    rate = Math.min(
      rate,
      Math.max(...boardCopy[i]),
      Math.max(...boardCopy[i].map((_, j) => boardCopy[j][i]))
    )
  }
  sum = boardCopy.reduce(
    (prev1, current1, i) =>
      prev1 +
      current1.reduce((prev2, current2, j) => {
        if (current2 > rate) return prev2 + board[i][j]
        else return prev2
      }, 0),
    0
  )
  return { rate, sum }
}

function bingo() {
  const boards = parseBoards(boardStrings)
  const [winningBoard] = boards
    .map((b) => calculateWinningRate(b, numbers))
    .sort((a, b) => a.rate - b.rate)
  return winningBoard.sum * numbers[winningBoard.rate]
}

//console.log(bingo())
