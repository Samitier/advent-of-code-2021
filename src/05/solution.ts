import fs from 'fs/promises'

type Step = {
  quantity: number
  from: number
  to: number
}

async function parseInput() {
  const steps: Step[] = []
  const boxes: string[][] = []

  const fileLines = (await fs.readFile(__dirname + '/input.txt')).toString().split('\n')

  let hasParsedBoxes = false
  for (let line of fileLines) {
    if (!line) {
      hasParsedBoxes = true
      continue
    }
    if (!hasParsedBoxes) {
      // removes spaces and [ and ] chars
      const boxColumns = line.replace(/\[|\]/g, '').replace(/\s{4}/g, ' ').split(' ')
      if (!boxes.length) {
        boxes.push(...boxColumns.map(() => []))
      }
      boxColumns.forEach((box, column) => {
        if (box && isNaN(parseInt(box))) {
          boxes[column].push(box)
        }
      })
    } else {
      const [_, quantity, __, from, ___, to] = line.split(' ').map((p) => parseInt(p))
      steps.push({ quantity, from, to })
    }
  }
  return { steps, boxes }
}

async function solution1() {
  const { steps, boxes } = await parseInput()
  for (let step of steps) {
    boxes[step.to - 1].unshift(...boxes[step.from - 1].splice(0, step.quantity).reverse())
  }
  console.log(boxes.map((b) => b[0]).join(''))
}

async function solution2() {
  const { steps, boxes } = await parseInput()
  for (let step of steps) {
    boxes[step.to - 1].unshift(...boxes[step.from - 1].splice(0, step.quantity))
  }
  console.log(boxes.map((b) => b[0]).join(''))
}

solution2()
