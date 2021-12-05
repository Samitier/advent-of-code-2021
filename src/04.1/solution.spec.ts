import { calculateWinningRate, parseBoards } from './solution'

test('Board parses correctly', () => {
  const parsedBoards = parseBoards(
    `31 88 71 23 61
 4  9 14 93 51
52 50  6 34 55
70 64 78 65 95
12 22 41 60 57

42  9 63 56 93
79 59 38 36  7
 6 23 48  0 55
82 45 13 27 83
 1 32  8 40 46`
  )

  expect(parsedBoards[0]).toStrictEqual([
    [31, 88, 71, 23, 61],
    [4, 9, 14, 93, 51],
    [52, 50, 6, 34, 55],
    [70, 64, 78, 65, 95],
    [12, 22, 41, 60, 57],
  ])

  expect(parsedBoards[parsedBoards.length - 1]).toEqual([
    [42, 9, 63, 56, 93],
    [79, 59, 38, 36, 7],
    [6, 23, 48, 0, 55],
    [82, 45, 13, 27, 83],
    [1, 32, 8, 40, 46],
  ])
})

test('Board rate calculated correctly', () => {
  const boardRate = calculateWinningRate(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  )
  expect(boardRate.rate).toBe(2)
  expect(boardRate.sum).toBe(4 + 5 + 6 + 7 + 8 + 9)
})
