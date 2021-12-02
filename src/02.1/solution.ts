import input from './input.json'

function dive(inputs: string[]) {
  const positions = inputs.reduce(
    (previous, current) => {
      const [direction, amountStr] = current.split(' ')
      const amount = parseInt(amountStr)
      if (direction === 'up') previous.depth -= amount
      else if (direction === 'down') previous.depth += amount
      else previous.horizontal += amount
      return previous
    },
    { depth: 0, horizontal: 0 }
  )
  return positions.depth * positions.horizontal
}

// Example
console.log(dive(['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']))
// Solution
console.log(dive(input))
