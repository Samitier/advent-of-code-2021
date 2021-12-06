import inputExample from './input-example.json'
import input from './input.json'

const newLanternfish = 8
const resetLanternfish = 6

function lanternfish(input: number[], days: number) {
  const fishes = Array(newLanternfish + 1)
    .fill(0)
    .map((a) => BigInt(a))
  for (let fish of input) fishes[fish] = fishes[fish] + BigInt(1)
  for (let i = 0; i < days; ++i) {
    const reproducedFish = fishes.shift()
    if (!reproducedFish) {
      fishes.push(BigInt(0))
    } else {
      fishes[resetLanternfish] = fishes[resetLanternfish] + reproducedFish
      fishes.push(reproducedFish)
    }
  }
  return fishes.reduce((prev, curr) => prev + curr, BigInt(0))
}

//console.log(lanternfish(inputExample, 256))
console.log(lanternfish(input, 256))
