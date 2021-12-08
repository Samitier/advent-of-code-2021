import inputExample from './input-example.json'
import input from './input.json'
import { parseInput } from '../08.1/solution'

const digitCount = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]
const uniqueDigits = [1, 4, 7, 8]

// 0 -> 6
// 1 -> 2 * (decodes 4)
// 2 -> 5
// 3 -> 5   (decodes 9)
// 4 -> 4 * (decodes 9)
// 5 -> 5
// 6 -> 6
// 7 -> 3 * (decodes 3 and 0)
// 8 -> 7 * 
// 9 -> 6

// Returns a map with digit-number combinations for each digit of a pattern
// Filled with the known unique digits or -1 for the unknown
function preparePatternMaps(patterns: string[][]) {
  return patterns.map((pattern) => {
    const patternMap = new Map<string, number>()
    for (let digit of pattern) {
      patternMap.set(digit, decodeUniqueDigit(digit))
    }
    return patternMap
  })
}

// Decodes 1, 4, 7 and 8
function decodeUniqueDigit(digit: string) {
  const uniqueDigit = uniqueDigits.find((d) => digitCount[d] === digit.length)
  return uniqueDigit || -1
}

// Decodes numbers that only differ by one part
function decodeNumber(pattern: Map<string, number>, numberToDecode: number, similarNumber: number) {
  let similarDigit = findDigit(pattern, similarNumber)
  for (let digit of pattern.keys()) {
    if (pattern.get(digit) !== -1) continue
    if (digit.length === digitCount[numberToDecode] && includesDigit(similarDigit, digit)) {
      pattern.set(digit, numberToDecode)
      return
    }
  }
}

// Decodes the number six
function decodeSix(pattern: Map<string, number>) {
  for (let digit of pattern.keys()) {
    if (pattern.get(digit) !== -1) continue
    if (digit.length === digitCount[6]) pattern.set(digit, 6)
  }
}

// Decodes the numbers two and five
function decodeTwoAndFive(pattern: Map<string, number>) {
  let nine = findDigit(pattern, 9)
  for (let digit of pattern.keys()) {
    if (pattern.get(digit) !== -1) continue
    const isTwo = digit.split('').find((c) => !nine.includes(c))
    pattern.set(digit, isTwo ? 2 : 5)
  }
}

// Search through the keys of a map
function findDigit(pattern: Map<string, number>, number: Number) {
  for (const [key, value] of pattern) {
    if (value === number) return key
  }
  return ''
}

// Checks if string includes chars of another string (no matter the order)
function includesDigit(digit: string, digitToSearch: string) {
  for (let i = 0; i < digit.length; ++i) {
    let hasChar = digitToSearch.includes(digit[i])
    if (!hasChar) return false
  }
  return true
}

// Decodes all patterns
function decodePatterns(patterns: string[][]) {
  const patternMap = preparePatternMaps(patterns)
  for (let pattern of patternMap) {
    decodeNumber(pattern, 3, 7)
    decodeNumber(pattern, 9, 4)
    decodeNumber(pattern, 0, 1)
    decodeSix(pattern)
    decodeTwoAndFive(pattern)
  }
  return patternMap
}

// Decodes everything and adds the outputs
function seventSegmentSearch(inputString: string[]) {
  const parsedInput = parseInput(inputString)
  const patternMaps = decodePatterns(parsedInput.patterns)

  let total = 0
  for (let i = 0; i < parsedInput.outputs.length; ++i) {
    const output = parsedInput.outputs[i]
    const patternMap = patternMaps[i]

    let number = ''
    for (let digit of output) {
      const decodedDigit = [...patternMap.keys()].find((k) => {
        return digit.length === k.length && includesDigit(digit, k)
      })
      if (!decodedDigit) return -1
      number += patternMap.get(decodedDigit)
    }
    total += parseInt(number)
  }
  return total
}

//console.log(seventSegmentSearch(inputExample))
console.log(seventSegmentSearch(input))
