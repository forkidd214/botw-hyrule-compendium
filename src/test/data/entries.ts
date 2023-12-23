import entriesData from './entries-data.json'

let entries = [...entriesData]

async function create(entry: any) {
  entries.push(entry)
  return entry
}

async function read(entryId: string) {
  return entries.find((entry) => entry.id === entryId)
}

async function readManyByName(name: string = '') {
  return entries.filter((entry) =>
    entry.name.toLowerCase().includes(name.toLowerCase())
  )
}

async function reset() {
  entries = [...entriesData]
}

export { create, read, readManyByName, reset }
