import fs from 'fs/promises'

enum Play {
  rock,
  paper,
  scissors,
}

function getPlay(play: string) {
  switch (play) {
    case 'A':
    case 'X':
      return Play.rock
    case 'B':
    case 'Y':
      return Play.paper
    default:
      return Play.scissors
  }
}

enum Outcome {
  won,
  lost,
  draw,
}

function getOutcome(opponent: Play, me: Play) {
  if (opponent === me) return Outcome.draw
  if (
    (opponent === Play.rock && me === Play.scissors) ||
    (opponent === Play.scissors && me === Play.paper) ||
    (opponent === Play.paper && me === Play.rock)
  )
    return Outcome.lost
  return Outcome.won
}

function getPoints(opponent: Play, me: Play) {
  let points = 0
  if (me === Play.rock) points += 1
  else if (me === Play.paper) points += 2
  else points += 3

  const outcome = getOutcome(opponent, me)
  if (outcome === Outcome.draw) points += 3
  else if (outcome === Outcome.won) points += 6
  return points
}

async function problem1() {
  const file = await fs.readFile(__dirname + '/input.txt')
  console.log(
    file
      .toString()
      .split('\n')
      .reduce((prev, curr) => {
        const [opponent, me] = curr.split(' ').map((p) => getPlay(p))
        const points = getPoints(opponent, me)
        return prev + points
      }, 0)
  )
}

problem1()
