import input from './input.json'

function sonarSweep(values: number[]) {
  const groupedValues: number[] = []
  let startGroup = 0
  while (startGroup + 3 <= values.length) {
    groupedValues.push(values[startGroup] + values[startGroup + 1] + values[startGroup + 2])
    startGroup++
  }
  return groupedValues.reduce((previous, current, i) => {
    if (i !== 0 && current > groupedValues[i - 1]) {
      return previous + 1
    }
    return previous
  }, 0)
}

// Example
console.log(sonarSweep([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]))
// Solution
console.log(sonarSweep(input))
