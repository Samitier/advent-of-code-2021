import input from './input.json'

function sonarSweep(values: number[]) {
  return values.reduce((previous, current, i) => {
    if (i !== 0 && current > values[i - 1]) return previous + 1
    return previous
  }, 0)
}

// Example
console.log(sonarSweep([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]))
// Solution
console.log(sonarSweep(input))
