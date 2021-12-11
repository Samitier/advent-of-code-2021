import inputExample from './input-example.json'
import input from './input.json'
import { parseInput, nextStep } from '../11.1/solution'

function dumboOctopus(inputStrings: string[]) {
  const octopusLevels = parseInput(inputStrings)
  let explosionCount = 0
  let stepCount = 0
  while (explosionCount !== octopusLevels.length * octopusLevels[0].length) {
    explosionCount = nextStep(octopusLevels)
    ++stepCount
  }
  return stepCount
}

console.log(dumboOctopus(inputExample))
console.log(dumboOctopus(input))
