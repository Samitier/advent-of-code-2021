import inputExample from './input-example.json'
import input from './input.json'

const minEnergy = 0
const maxEnergy = 9

export function parseInput(inputStrings: string[]) {
  return inputStrings.map((s) => s.split('').map((st) => parseInt(st)))
}

function explode(octopusLevels: number[][], x: number, y: number, explosions: number[][]) {
  explosions.push([x, y])
  for (let i = -1; i <= 1; ++i) {
    for (let j = -1; j <= 1; ++j) {
      const newX = x + j
      const newY = y + i
      if (
        newX >= 0 &&
        newY >= 0 &&
        newX <= octopusLevels[0].length - 1 &&
        newY <= octopusLevels.length - 1 &&
        !hasExploded(newX, newY, explosions)
      ) {
        octopusLevels[newY][newX]++
        if (octopusLevels[newY][newX] > maxEnergy) explode(octopusLevels, newX, newY, explosions)
      }
    }
  }
  octopusLevels[y][x] = minEnergy
}

export function nextStep(octopusLevels: number[][]) {
  let explosions: number[][] = []
  for (let y = 0; y < octopusLevels.length; ++y) {
    for (let x = 0; x < octopusLevels[y].length; ++x) {
      if (hasExploded(x, y, explosions)) continue
      octopusLevels[y][x]++
      if (octopusLevels[y][x] > maxEnergy) explode(octopusLevels, x, y, explosions)
    }
  }
  return explosions.length
}

function hasExploded(x: number, y: number, explosions: number[][]) {
  return explosions.some(([ex, ey]) => ex === x && ey === y)
}

function dumboOctopus(inputStrings: string[], iterations: number) {
  const octopusLevels = parseInput(inputStrings)
  let count = 0
  for (let i = 0; i < iterations; ++i) {
    count += nextStep(octopusLevels)
  }
  return count
}

// console.log(dumboOctopus(inputExample, 100))
// console.log(dumboOctopus(input, 100))
