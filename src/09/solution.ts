import fs from 'fs/promises'

enum Direction {
  left = 'L',
  right = 'R',
  up = 'U',
  down = 'D',
}

type Position = {
  x: number
  y: number
}

async function parseInput() {
  const file = await fs.readFile(__dirname + '/input.txt')
  return file
    .toString()
    .split('\n')
    .map((row) => {
      const [dirStr, amountStr] = row.split(' ')
      return { direction: dirStr as Direction, amount: parseInt(amountStr) }
    })
}

function updateHeadPosition(headPosition: Position, direction: Direction) {
  switch (direction) {
    case Direction.up:
      return { x: headPosition.x, y: headPosition.y - 1 }
    case Direction.down:
      return { x: headPosition.x, y: headPosition.y + 1 }
    case Direction.left:
      return { x: headPosition.x - 1, y: headPosition.y }
    case Direction.right:
      return { x: headPosition.x + 1, y: headPosition.y }
    default:
      throw new Error('Error: unknown direction.')
  }
}

function updateTailPositionAndVisits(
  headPosition: Position,
  tailPosition: Position,
  visits: Set<string>
) {
  const movement = { x: headPosition.x - tailPosition.x, y: headPosition.y - tailPosition.y }
  const amountOfMovement = Math.max(Math.abs(movement.x), Math.abs(movement.y)) - 1
  const newTailPosition = { ...tailPosition }
  for (let i = 0; i < amountOfMovement; ++i) {
    if (Math.abs(movement.x) >= 1) {
      newTailPosition.x += Math.sign(movement.x)
      movement.x -= Math.sign(movement.x)
    }
    if (Math.abs(movement.y) >= 1) {
      newTailPosition.y += Math.sign(movement.y)
      movement.y -= Math.sign(movement.y)
    }
    visits.add(`${newTailPosition.x}-${newTailPosition.y}`)
  }
  return newTailPosition
}

async function solution1() {
  const motion = await parseInput()
  const tailVisits = new Set<string>(['0-0'])
  let headPosition = { x: 0, y: 0 }
  let tailPosition = { x: 0, y: 0 }

  for (let { direction, amount } of motion) {
    for (let i = 0; i < amount; ++i) {
      headPosition = updateHeadPosition(headPosition, direction)
      tailPosition = updateTailPositionAndVisits(headPosition, tailPosition, tailVisits)
    }
  }

  console.log(tailVisits.size)
}

async function solution2() {
  const motion = await parseInput()
  const tailVisits = Array(10)
    .fill('')
    .map(() => new Set<string>(['0-0']))
  let tailPositions = Array(10)
    .fill('')
    .map(() => ({ x: 0, y: 0 }))

  for (let { direction, amount } of motion) {
    for (let step = 0; step < amount; ++step) {
      tailPositions[0] = updateHeadPosition(tailPositions[0], direction)
      for (let i = 1; i < tailPositions.length; ++i) {
        tailPositions[i] = updateTailPositionAndVisits(
          tailPositions[i - 1],
          tailPositions[i],
          tailVisits[i]
        )
      }
    }
  }
  console.log(tailVisits[tailVisits.length - 1].size)
}

solution2()
