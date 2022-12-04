import fs from 'fs/promises'

enum Play {
  rock,
  paper,
  scissors,
}

function getOpponentPlay(play: string) {
  switch (play) {
    case 'A':
      return Play.rock
    case 'B':
      return Play.paper
    default:
      return Play.scissors
  }
}

function getOwnPlay(opponent: Play, outcome: Outcome) {
  if (outcome === Outcome.draw) return opponent
  if (outcome === Outcome.won) {
    if (opponent === Play.paper) return Play.scissors
    if (opponent === Play.scissors) return Play.rock
    return Play.paper
  }
  if (opponent === Play.paper) return Play.rock
  if (opponent === Play.scissors) return Play.paper
  return Play.scissors
}

enum Outcome {
  won,
  lost,
  draw,
}

function getOutcome(outcome: string) {
  switch (outcome) {
    case 'X':
      return Outcome.lost
    case 'Y':
      return Outcome.draw
    default:
      return Outcome.won
  }
}

function getPoints(me: Play, outcome: Outcome) {
  let points = 0
  if (me === Play.rock) points += 1
  else if (me === Play.paper) points += 2
  else points += 3

  if (outcome === Outcome.draw) points += 3
  else if (outcome === Outcome.won) points += 6
  return points
}

async function problem2() {
  const file = await fs.readFile(__dirname + '/input.txt')
  console.log(
    file
      .toString()
      .split('\n')
      .reduce((prev, curr) => {
        const [opponentStr, outcomeStr] = curr.split(' ')
        const opponent = getOpponentPlay(opponentStr)
        const outcome = getOutcome(outcomeStr)
        const me = getOwnPlay(opponent, outcome)
        return prev + getPoints(me, outcome)
      }, 0)
  )
}

problem2()
