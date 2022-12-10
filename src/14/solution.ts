import fs from 'fs/promises'

type Pair = {
  elements: string
  insert: string
}

async function parseInput() {
  const file = await fs.readFile(__dirname + '/input-example.txt')
  const [initialValue, _, ...rules] = file.toString().split('\n')
  return {
    initialValue,
    rules: rules
      .map((r) => r.split(' -> '))
      .reduce((map, [key, value]) => {
        map.set(key, value)
        return map
      }, new Map<string, string>()),
  }
}

function calculatePoints(polymer: Map<string, bigint>) {
  const charOccurrences = new Map<string, bigint>()
  polymer.forEach((value, key) => {
    const a = key.charAt(0)
    const b = key.charAt(1)
    charOccurrences.set(a, charOccurrences.get(a) ?? BigInt(0) + value)
    charOccurrences.set(b, charOccurrences.get(b) ?? BigInt(0) + value)
  })

  const sortedChars = [...charOccurrences.values()].sort()
  const min = sortedChars[0]
  const max = sortedChars[sortedChars.length - 1]
  console.log(max - min)
}

async function solution() {
  const { initialValue, rules } = await parseInput()
  const steps = 10
  const polymer = new Map<string, bigint>()

  for (let i = 1; i < initialValue.length; ++i) {
    const key = initialValue.charAt(i - 1) + initialValue.charAt(i)
    const count = polymer.get(key) ?? BigInt(0)
    polymer.set(key, count + BigInt(1))
  }

  for (let i = 0; i < steps; ++i) {
    const keys = polymer.keys()
    for (let key of keys) {
      const value = polymer.get(key) ?? BigInt(0)
      const replacement = rules.get(key)
      if (replacement) {
        const keyA = key.charAt(0) + replacement
        const keyB = replacement + key.charAt(1)
        polymer.set(keyA, (polymer.get(keyA) ?? BigInt(0)) + value)
        polymer.set(keyB, (polymer.get(keyB) ?? BigInt(0)) + value)
        polymer.set(key, BigInt(0))
      }
    }
    console.log(polymer)
  }
  console.log(calculatePoints(polymer))
}

solution()
