import fs from 'fs/promises'

type Dir = {
  name: string
  size: bigint
}

async function parseInput() {
  const file = await fs.readFile(__dirname + '/input.txt')
  return file.toString().split('\n')
}

function updateDir(root: Dir[], dirnames: string[], size: bigint) {
  const name = dirnames.join('.')
  const dir = root.find((f) => f.name === name)
  if (dir) dir.size += size
  else root.push({ name, size })
  if (dirnames.length) updateDir(root, dirnames.slice(0, -1), size)
}

function calculateSolution1(root: Dir[]) {
  let total = BigInt(0)
  for (let dir of root) {
    if (dir.size <= 100000) total += dir.size
  }
  console.log('Solution 1 is: ' + total)
}

function calculateSolution2(root: Dir[]) {
  const totalDiskSpace = BigInt(70000000)
  const neededSpace = BigInt(30000000)
  const availableSpace = totalDiskSpace - root[0].size
  const spaceToDelete = neededSpace - availableSpace

  let sortedRoot = root.sort((a, b) => (a.size >= b.size ? 1 : -1))
  const dirToDelete = sortedRoot.find((f) => f.size >= spaceToDelete)
  console.log('Solution 2 is: ' + dirToDelete?.size)
}

async function solution() {
  const lines = await parseInput()
  const root: Dir[] = [
    {
      name: '',
      size: BigInt(0),
    },
  ]
  let currentDir = []

  for (let line of lines) {
    if (line.startsWith('$ cd')) {
      const [_, __, dirname] = line.split(' ')
      if (dirname === '/') currentDir = []
      else if (dirname === '..') currentDir.pop()
      else currentDir.push(dirname)
    } else if (!line.startsWith('$')) {
      const [sizeStr, name] = line.split(' ')
      if (sizeStr === 'dir') {
        updateDir(root, [...currentDir, name], BigInt(0))
      } else {
        updateDir(root, currentDir, BigInt(sizeStr))
      }
    }
  }

  calculateSolution1(root)
  calculateSolution2(root)
}

solution()
