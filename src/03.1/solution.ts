import input from './input.json'

function binaryDiagnostic(inputs: string[]) {
  let gamma = ''
  let epsilon = ''
  for (let i = 0; i < inputs[0].length; ++i) {
    let oneCount = inputs.filter((input) => input.charAt(i) === '1').length
    if (oneCount > inputs.length / 2) {
      gamma += '1'
      epsilon += '0'
    } else {
      gamma += '0'
      epsilon += '1'
    }
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2)
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
