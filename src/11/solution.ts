import fs from 'fs/promises'

type Monkey = {
  inspectionsCount: bigint
  items: bigint[]
  operation: (item: bigint) => bigint
  test: (item: bigint) => number
}

async function parseInput() {
  const lines = (await fs.readFile(__dirname + '/input.txt')).toString().split('\n')
  const startingItemsStr = 'Starting items:'
  let allDivisibleBy = BigInt(1)

  const monkeys: Monkey[] = []
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i]
    if (line.startsWith('Monkey')) {
      monkeys.push({
        inspectionsCount: BigInt(0),
        items: [],
        operation: () => BigInt(0),
        test: () => 0,
      })
    } else if (line.includes(startingItemsStr)) {
      const items = line
        .replace(startingItemsStr, '')
        .split(',')
        .map((n) => BigInt(n.trim()))
      monkeys[monkeys.length - 1].items = items
    } else if (line.includes('Operation:')) {
      const [_, operationStr] = line.split(' = ')
      const [left, operation, right] = operationStr.split(' ')

      let operationFunc
      if (operation === '+') {
        if (right === 'old') operationFunc = (item: bigint) => item + item
        else operationFunc = (item: bigint) => item + BigInt(right)
      } else {
        if (right === 'old') operationFunc = (item: bigint) => item * item
        else operationFunc = (item: bigint) => item * BigInt(right)
      }
      monkeys[monkeys.length - 1].operation = operationFunc
    } else if (line.includes('Test:')) {
      const splittedTest = line.split(' ')
      const dividend = BigInt(splittedTest[splittedTest.length - 1])
      allDivisibleBy *= dividend
      const monkeyTrue = parseInt(lines[i + 1].charAt(lines[i + 1].length - 1))
      const monkeyFalse = parseInt(lines[i + 2].charAt(lines[i + 2].length - 1))
      monkeys[monkeys.length - 1].test = (item: bigint) =>
        item % dividend === BigInt(0) ? monkeyTrue : monkeyFalse
    }
  }

  return { monkeys, allDivisibleBy }
}

async function solution(rounds = 20) {
  const { monkeys, allDivisibleBy } = await parseInput()

  for (let i = 0; i < rounds; ++i) {
    for (let monkey of monkeys) {
      for (let item of monkey.items) {
        const newItem = monkey.operation(item % allDivisibleBy)
        ++monkey.inspectionsCount
        const newMonkey = monkey.test(newItem)
        monkeys[newMonkey].items.push(newItem)
      }
      monkey.items = []
    }
  }
  const [first, second] = monkeys.map((m) => m.inspectionsCount).sort((a, b) => (b > a ? 1 : -1))
  console.log(first * second)
}

solution()
solution(10000)
