import inputExample from './input-example.json'
import input from './input.json'

function calculatePoints(line: string) {
  let points = 0
  for (let i = 0; i < line.length; ++i) {
    const char = line.charAt(i)
    const charPoints = [')', ']', '}', '>'].indexOf(char) + 1
    points = points * 5 + charPoints
  }
  return points
}

function findCompletionLine(line: string) {
  const openChars: string[] = []
  for (let i = 0; i < line.length; ++i) {
    const char = line.charAt(i)
    if (isOpeningChar(char)) openChars.unshift(char)
    else {
      const lastChar = openChars.shift()
      if (!lastChar || !isClosing(lastChar, char)) return ''
    }
  }
  return openChars.map((c) => findClosingChar(c)).join('')
}

function isOpeningChar(char: string) {
  return ['[', '(', '<', '{'].includes(char)
}

function isClosing(open: string, close: string) {
  return findClosingChar(open) === close
}

function findClosingChar(char: string): string {
  switch (char) {
    case '(':
      return ')'
    case '[':
      return ']'
    case '{':
      return '}'
    case '<':
      return '>'
  }
  throw Error('Trying to close closed char')
}

function syntaxScoring(inputStrings: string[]) {
  const results = inputStrings
    .map((i) => findCompletionLine(i))
    .filter((i) => i)
    .map((l) => calculatePoints(l))
    .sort((a, b) => a - b)
  return results[Math.floor(results.length / 2)]
}

console.log(syntaxScoring(inputExample))
console.log(syntaxScoring(input))
