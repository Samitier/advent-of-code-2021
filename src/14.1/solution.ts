import inputExample from './input-example.json'
import input from './input.json'

type Pair = {
  elements: string
  insert: string
}

function parseInput(inputString: string[]) {
  const polymer = inputString[0]
  const pairs: Pair[] = []
  for (let i = 1; i < inputString.length; ++i) {
    const [elements, insert] = inputString[i].split(' -> ')
    pairs.push({ elements, insert })
  }
  return { polymer, pairs }
}

function step(polymer: string, pairs: Pair[]) {
  for (let i = 0; i < polymer.length - 1; ++i) {
    const currentElement = polymer.substring(i, i + 2)
    const pair = pairs.find((p) => p.elements === currentElement)
    if (!pair) continue
    const startStr = polymer.substring(0, i + 1)
    const endStr = polymer.substring(i + 1, polymer.length)
    polymer = startStr + pair.insert + endStr
    ++i
  }
  return polymer
}

function calculatePoints(polymer: string) {
  const sums = new Map<string, number>()
  for (let i = 0; i < polymer.length; ++i) {
    const char = polymer.charAt(i)
    const count = sums.get(char) ?? 0
    sums.set(char, count + 1)
  }
  const min = Math.min(...sums.values())
  const max = Math.max(...sums.values())
  return max - min
}

export function extendedPolymerization(inputString: string[], steps: number) {
  const { polymer, pairs } = parseInput(inputString)
  let newPolymer = polymer
  for (let i = 0; i < steps; ++i) {
    newPolymer = step(newPolymer, pairs)
  }
  return { polymer: newPolymer, points: calculatePoints(newPolymer) }
}

// console.log(extendedPolymerization(inputExample, 10).points)
// console.log(extendedPolymerization(input, 10))
