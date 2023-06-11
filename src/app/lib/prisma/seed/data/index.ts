import * as fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const SEED_PATH = path.join(__dirname, './seed.json')

async function readData(path: string) {
  const data = await fs.promises.readFile(path, {
    encoding: 'utf-8',
  })
  return JSON.parse(data)
}

const seed = await readData(SEED_PATH)
const entries = seed.data as any[]

export { SEED_PATH, entries }
