import { faker } from '@faker-js/faker'

export function buildEntry(overrides: any = null) {
  return {
    id: faker.string.uuid(),
    name: faker.animal.dog(),
    description: faker.lorem.sentence(),
    commonLocations: faker.location.state(),
    image: {
      id: faker.string.uuid(),
      name: faker.lorem.words,
      src: faker.image.url,
      width: faker.number.int(800),
      height: faker.number.int(800),
    },
    category: {
      id: faker.string.uuid(),
      name: ['animals', 'food', 'monsters', 'materials', 'equipment'][
        Math.floor(Math.random() * 5)
      ],
    },

    drops: faker.lorem.words().split(' '),
    edible: faker.datatype.boolean(),
    attack: faker.number.int(5),
    defense: faker.number.int(5),
    heartsRecovered: faker.number.int(5),
    cookingEffect: faker.lorem.words(),
    ...overrides,
  }
}
