import fs from 'fs/promises'

async function parseInput() {
  const file = await fs.readFile(__dirname + '/input.txt')
  return file
    .toString()
    .split('\n')
    .reduce(
      (pairs, line) => {
        if (line) {
          pairs[pairs.length - 1].push(line)
        } else {
          pairs.push([])
        }
        return pairs
      },
      [[]] as string[][]
    )
}

function isNumber(str: string) {
  return !isNaN(parseInt(str))
}

function getNumberStr(str: string) {
  const endNums = [str.indexOf(','), str.indexOf(']')].filter((i) => i !== -1)
  return str.substring(0, Math.min(...endNums))
}

function arePairsOrdered(left: string, right: string): boolean {
  if (left.length === 0 && right.length === 0) return true
  let startLeft = left.charAt(0)
  let startRight = right.charAt(0)
  if (
    (startLeft === '[' && startRight === '[') ||
    (startLeft === ',' && startRight === ',') ||
    (startLeft === ']' && startRight === ']') ||
    (startLeft === ',' && startRight === ',')
  ) {
    return arePairsOrdered(left.substring(1), right.substring(1))
  }
  if (isNumber(startLeft) && isNumber(startRight)) {
    const leftNumStr = getNumberStr(left)
    const rightNumStr = getNumberStr(right)
    if (parseInt(leftNumStr) === parseInt(rightNumStr)) {
      return arePairsOrdered(left.replace(leftNumStr, ''), right.replace(rightNumStr, ''))
    }
    return parseInt(leftNumStr) < parseInt(rightNumStr)
  }
  // Comparing list with integer, convert integer to list first
  if (startLeft === '[' && isNumber(startRight)) {
    const rightNumber = getNumberStr(right)
    return arePairsOrdered(left, right.replace(rightNumber, `[${rightNumber}]`))
  }
  if (startRight === '[' && isNumber(startLeft)) {
    const leftNumber = getNumberStr(left)
    return arePairsOrdered(left.replace(leftNumber, `[${leftNumber}]`), right)
  }
  // Left runs out of items first -> it is ordered
  if (startLeft === ']' && startRight !== ']') return true

  // Right runs out of items first -> not ordered
  if (startRight === ']' && startLeft !== ']') return false

  // console.log('LEFT: ', left)
  // console.log('RIGHT: ', right)
  throw new Error('Failed to solve the problem.')
}

async function problem1() {
  const pairs = await parseInput()

  let orderedPairs = 0
  for (let i = 0; i < pairs.length; ++i) {
    const [left, right] = pairs[i]
    // console.log(i + 1, left, right, arePairsOrdered(left, right))
    if (arePairsOrdered(left, right)) orderedPairs += i + 1
  }

  console.log(orderedPairs)
}

async function problem2() {
  let pairs = await parseInput()
  const dividerPkg1 = '[[2]]'
  const dividerPkg2 = '[[6]]'
  pairs.push([dividerPkg1, dividerPkg2])
  let sortedPairs = pairs.flatMap((p) => p).sort((a, b) => (arePairsOrdered(a, b) ? -1 : 1))
  console.log((sortedPairs.indexOf(dividerPkg1) + 1) * (sortedPairs.indexOf(dividerPkg2) + 1))
}

problem2()
