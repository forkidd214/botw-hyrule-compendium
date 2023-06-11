/**
 * TODO...
 * 1. testing source files downloaded from [Hyrule-Compendium-API](https://github.com/gadhagod/Hyrule-Compendium-API)
 * 2. upload all images to cloudinary and output image.json to store uploaded images info.
 * 3. update image key for each record and output the single source of truth seed.json file
 * 4. testing seed.json
 * 5. seed mongodb
 */

import { PrismaClient } from '@prisma/client'
import { Entry } from './types'
import { entries } from './data/index'

const prisma = new PrismaClient()

async function seedCategories(entries: Entry[]) {
  const categorySet = new Set<string>()
  entries.forEach((entry) => categorySet.add(entry.category.name))
  const categories = Array.from(categorySet).map((categoryName) => ({
    name: categoryName,
  }))

  const [deleted, created, found] = await prisma.$transaction([
    prisma.category.deleteMany(),
    prisma.category.createMany({
      data: categories,
    }),
    prisma.category.findMany(),
  ])

  return [deleted, created, found]
}

async function seedImages(entries: Entry[]) {
  const images = entries.map((entry) => entry.image)

  const [deleted, created, found] = await prisma.$transaction([
    prisma.image.deleteMany(),
    prisma.image.createMany({
      data: images,
    }),
    prisma.image.findMany(),
  ])

  return [deleted, created, found]
}

async function seedEntries(entries: Entry[]) {
  const categories = await prisma.category.findMany()
  const images = await prisma.image.findMany()

  const categoyIdByName = new Map<string, string>()
  categories.forEach(({ name, id }) => {
    categoyIdByName.set(name, id)
  })
  // console.log(categoyIdByName)

  const imageIdByName = new Map<string, string>()
  images.forEach(({ name, id }) => {
    imageIdByName.set(name, id)
  })
  // console.log(imageIdByName)

  const entriesWithForeignId = entries.map(({ category, image, ...rest }) => ({
    ...rest,
    categoryId: categoyIdByName.get(category.name) as string,
    imageId: imageIdByName.get(image.name),
  }))

  const isForeignIdAdded = entriesWithForeignId.every(
    (entry) => entry.categoryId !== undefined && entry.imageId !== undefined
  )
  if (!isForeignIdAdded) {
    throw new Error('Unmatched foreigh Id of entry')
  }

  const [deleted, created, found] = await prisma.$transaction([
    prisma.entry.deleteMany(),
    prisma.entry.createMany({
      data: entriesWithForeignId,
    }),
    prisma.image.findMany(),
  ])

  return [deleted, created, found]
}

async function main() {
  console.log('start seeding...')

  // comment out for safety
  // const categoryRecords = await seedCategories(entries)
  // const imageRecords = await seedImages(entries)
  // const entryRecords = await seedEntries(entries)
  // console.log({ categoryRecords, imageRecords, entryRecords })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
