import inputExample from './input-example.json'
import input from './input.json'

const digitCount = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]
const uniqueDigits = [1, 4, 7, 8]

// 0 -> 6
// 1 -> 2 *
// 2 -> 5
// 3 -> 5
// 4 -> 4 *
// 5 -> 5
// 6 -> 6
// 7 -> 3 *
// 8 -> 7 *
// 9 -> 6

export function parseInput(inputString: string[]) {
  const parsedInput = inputString.map((k) => k.split(' | ').map((l) => l.split(' ')))
  return { patterns: parsedInput.map((k) => k[0]), outputs: parsedInput.map((k) => k[1]) }
}

function searchUniqueDigits(patterns: string[][]) {
  const digitsPerOutput = patterns.map((a) =>
    a.reduce((prev, current) => {
      const digit = uniqueDigits.find((d) => digitCount[d] === current.length)
      if (digit) return prev + 1
      return prev
    }, 0)
  )
  return digitsPerOutput.reduce((prev, curr) => prev + curr, 0)
}

function seventSegmentSearch(inputString: string[]) {
  const parsedInput = parseInput(inputString)
  return searchUniqueDigits(parsedInput.outputs)
}

//console.log(seventSegmentSearch(inputExample))
//console.log(seventSegmentSearch(input))
