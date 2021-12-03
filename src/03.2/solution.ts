import input from './input.json'

function recursiveSearch(inputs: string[], i: number, isSearchingCo2 = false): string {
  const ones: string[] = []
  const zeros: string[] = []
  for (let input of inputs) {
    if (input.charAt(i) === '1') ones.push(input)
    else zeros.push(input)
  }
  let target: string[]
  if (isSearchingCo2) {
    target = ones.length >= zeros.length ? zeros : ones
  } else {
    target = ones.length >= zeros.length ? ones : zeros
  }
  if (target.length === 1) return target[0]
  else return recursiveSearch(target, ++i, isSearchingCo2)
}

function binaryDiagnostic(inputs: string[]) {
  let oxygen = recursiveSearch(inputs, 0, false)
  let co2 = recursiveSearch(inputs, 0, true)
  return parseInt(oxygen, 2) * parseInt(co2, 2)
}

// Example
console.log(
  binaryDiagnostic([
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
  ])
)
// Solution
console.log(binaryDiagnostic(input))
