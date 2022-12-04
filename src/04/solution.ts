import fs from 'fs/promises'

async function parseInput() {
  const file = await fs.readFile(__dirname + '/input.txt')
  return file
    .toString()
    .split('\n')
    .map((p) => p.split(',').map((p) => p.split('-').map((p) => parseInt(p))))
}

async function problem1() {
  const pairs = await parseInput()
  let total = 0
  for (let pair of pairs) {
    let [start1, end1] = pair[0]
    let [start2, end2] = pair[1]
    if ((start1 <= start2 && end1 >= end2) || (start2 <= start1 && end2 >= end1)) {
      ++total
    }
  }
  console.log(total)
}

async function problem2() {
  const pairs = await parseInput()
  let total = 0
  for (let pair of pairs) {
    let [start1, end1] = pair[0]
    let [start2, end2] = pair[1]
    if (!(end1 < start2 || end2 < start1)) {
      ++total
      console.log(pair)
    }
  }
  console.log(total)
}

problem2()
