import fs from 'fs/promises'

async function parseInput() {
  const file = await fs.readFile(__dirname + '/input.txt')
  return file.toString().split('\n')
}

function getPointsOfChar(char: string) {
  const points = char.charCodeAt(0) - 96
  return points < 0 ? char.charCodeAt(0) - 64 + 26 : points
}

async function solution1() {
  const bags = await parseInput()
  let total = 0
  for (let bag of bags) {
    const halfLength = Math.floor(bag.length / 2)
    const first = bag.slice(0, halfLength)
    const second = bag.slice(halfLength)
    const [item] = first.split('').filter((i) => second.includes(i))
    if (item) total += getPointsOfChar(item)
  }
  console.log(total)
}

async function solution2() {
  const bags = await parseInput()
  let total = 0
  for (let i = 0; i < bags.length; i += 3) {
    const first = bags[i]
    const second = bags[i + 1]
    const third = bags[i + 2]
    const [item] = first.split('').filter((i) => second.includes(i) && third.includes(i))
    if (item) total += getPointsOfChar(item)
  }
  console.log(total)
}

solution2()
