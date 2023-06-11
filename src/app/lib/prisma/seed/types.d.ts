// seed.json
export type Image = {
  name: string
  src: string
  width: number
  height: number
  entry?: Entry
}

export type Category = {
  name: string
  entries?: Entry[]
}

export type Entry = {
  // common fields
  name: string
  description: string
  image: Image
  category: Category
  commonLocations: string[]
  // optional fields
  drops?: string[]
  edible?: boolean
  attack?: number
  defense?: number
  heartsRecovered?: number
  cookingEffect?: string
}
