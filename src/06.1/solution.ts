import inputExample from './input-example.json'
import input from './input.json'

const newLanternfish = 8
const resetLanternfish = 6

function lanternfish(input: number[], days: number) {
  const fishes = [...input]
  for (let i = 0; i < days; ++i) {
    const newFishes = []
    for (let j = 0; j < fishes.length; ++j) {
      fishes[j]--
      if (fishes[j] === -1) {
        fishes[j] = resetLanternfish
        newFishes.push(newLanternfish)
      }
    }
    fishes.push(...newFishes)
  }
  return fishes.length
}

// console.log(lanternfish(inputExample, 80))
console.log(lanternfish(input, 80))
