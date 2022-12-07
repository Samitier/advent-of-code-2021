import fs from 'fs/promises'

async function parseInput() {
  const file = await fs.readFile(__dirname + '/input.txt')
  return file.toString()
}

async function problem1() {
  const stream = await parseInput()

  const charQueue = []
  let i
  for (i = 0; i < stream.length; ++i) {
    charQueue.push(stream.charAt(i))
    if (charQueue.length > 4) {
      charQueue.shift()
    }
    if (new Set(charQueue).size === 4) break
  }
  console.log(i + 1)
}

async function problem2() {
  const stream = await parseInput()

  const charQueue = []
  let i
  for (i = 0; i < stream.length; ++i) {
    charQueue.push(stream.charAt(i))
    if (charQueue.length > 14) {
      charQueue.shift()
    }
    if (new Set(charQueue).size === 14) break
  }
  console.log(i + 1)
}

problem2()
