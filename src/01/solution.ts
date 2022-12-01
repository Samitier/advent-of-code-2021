import fs from 'fs/promises'

async function parseInput() {
  const file = await fs.readFile(__dirname + '/input.txt')
  return file
    .toString()
    .split('\n')
    .reduce(
      (prev, curr) => {
        if (isNaN(parseInt(curr))) prev.push(0)
        else prev[prev.length - 1] += parseInt(curr)
        return prev
      },
      [0]
    )
}

async function problem1() {
  const calories = await parseInput()
  console.log(Math.max(...calories))
}

async function problem2() {
  const calories = await parseInput()
  const [first, second, third] = calories.sort((a, b) => b - a)
  console.log(first + second + third)
}
