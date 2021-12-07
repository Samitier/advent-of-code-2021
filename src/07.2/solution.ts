//import inputExample from './input-example.json'
import input from './input.json'

function whales(input: number[]) {
  const max = Math.max(...input)
  const positions = Array(max).fill(0)
  for (let i = 0; i < positions.length; ++i) {
    positions[i] = input.reduce((prev, curr) => {
      let fuel = 0
      for (let j = 1; j <= Math.abs(curr - i); ++j) {
        fuel += j
      }
      return prev + fuel
    }, 0)
  }
  return Math.min(...positions)
}

//console.log(whales(inputExample))
console.log(whales(input))
