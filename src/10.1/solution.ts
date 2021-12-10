import inputExample from './input-example.json'
import input from './input.json'

function calculatePoints(char: string) {
  switch (char) {
    case ')':
      return 3
    case ']':
      return 57
    case '}':
      return 1197
    case '>':
      return 25137
  }
  console.error('No closing character found!')
  return 0
}

function findCorruptedChar(line: string) {
  const openChars: string[] = []
  for (let i = 0; i < line.length; ++i) {
    const char = line.charAt(i)
    if (isOpeningChar(char)) openChars.unshift(char)
    else {
      const lastChar = openChars.shift()
      if (!lastChar) return ''
      if (!isClosing(lastChar, char)) return char
    }
  }
  return ''
}

function isOpeningChar(char: string) {
  return ['[', '(', '<', '{'].includes(char)
}

function isClosing(open: string, close: string) {
  return (
    (open === '[' && close == ']') ||
    (open === '(' && close === ')') ||
    (open === '{' && close === '}') ||
    (open === '<' && close === '>')
  )
}

function syntaxScoring(inputStrings: string[]) {
  return inputStrings
    .map((i) => findCorruptedChar(i))
    .filter((c) => c)
    .reduce((prev, curr) => prev + calculatePoints(curr), 0)
}

console.log(syntaxScoring(inputExample))
console.log(syntaxScoring(input))
