import fs from 'fs/promises'

async function parseInput() {
  const file = await fs.readFile(__dirname + '/input.txt')
  return file.toString().split('\n')
}

function registerSignalStrength(
  currentCycle: number,
  register: number,
  cycles: Map<number, number>
) {
  if (cycles.has(currentCycle)) {
    cycles.set(currentCycle, currentCycle * register)
  }
}

function refreshScreen(cycle: number, register: number, buffer: string) {
  const spriteLeft = register - 1
  const spriteRight = register + 1
  const currentLine = cycle % 40
  let newBuffer = buffer
  if (currentLine === 0 && cycle >= 40) {
    console.log(buffer)
    newBuffer = ''
  }
  if (currentLine >= spriteLeft && currentLine <= spriteRight) {
    newBuffer += '#'
  } else {
    newBuffer += ' '
  }
  //console.log(`cycle: ${cycle}. Sprite is at ${register}`)
  return newBuffer
}

async function solution1() {
  const cycles = new Map<number, number>([
    [20, 0],
    [60, 0],
    [100, 0],
    [140, 0],
    [180, 0],
    [220, 0],
  ])
  const instructions = await parseInput()

  let register = 1
  let currentCycle = 0
  for (let instruction of instructions) {
    ++currentCycle
    registerSignalStrength(currentCycle, register, cycles)
    const [name, amountStr] = instruction.split(' ')
    if (name === 'addx') {
      currentCycle++
      registerSignalStrength(currentCycle, register, cycles)
      register += parseInt(amountStr)
    }
  }
  const sum = [...cycles.values()].reduce((acc, c) => acc + c, 0)
  console.log(sum)
}

async function solution2() {
  const instructions = await parseInput()
  let register = 1
  let currentCycle = 0
  let screenBuffer = ''
  for (let instruction of instructions) {
    screenBuffer = refreshScreen(currentCycle, register, screenBuffer)
    ++currentCycle
    const [name, amountStr] = instruction.split(' ')
    if (name === 'addx') {
      screenBuffer = refreshScreen(currentCycle, register, screenBuffer)
      currentCycle++
      register += parseInt(amountStr)
    }
  }
  // renders additional row even though instructions are over (probably a bit hacky...)
  for (let i = 1; i <= 40; ++i) refreshScreen(currentCycle + i, register, screenBuffer)
}

solution2()
