// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createYoga, createSchema } from 'graphql-yoga'
import prisma from '@/app/lib/prisma/db'

const { handleRequest } = createYoga({
  cors: {
    origin: process.env.SERVER_HOST
      ? `https://${process.env.SERVER_HOST}`
      : 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['X-Custom-Header'],
    methods: ['POST'],
  },

  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Category {
        id: ID!
        name: String!
        entries: [Entry]
      }

      type Image {
        id: ID!
        name: String!
        src: String!
        width: Int
        height: Int
      }

      type Entry {
        "common fields"
        id: ID!
        name: String!
        description: String
        commonLocations: [String]
        image: Image
        category: Category
        "creatures or monsters exclusive"
        drops: [String]
        "creatures exclusive"
        edible: Boolean
        "equipment exclusive"
        attack: Int
        defense: Int
        "materials exclusive"
        heartsRecovered: Float
        cookingEffect: String
      }

      type Query {
        categories: [Category]
        category(id: ID, name: String): Category
        entries: [Entry]
      }
    `,

    resolvers: {
      Query: {
        categories: async () => await prisma.category.findMany(),
        category: async (
          _: any,
          {
            id,
            name,
          }: {
            id?: string
            name?: string
          }
        ) =>
          await prisma.category.findFirstOrThrow({
            where: {
              OR: [
                {
                  id,
                },
                {
                  name,
                },
              ],
            },
            include: {
              entries: {
                include: {
                  image: true,
                  category: true,
                },
              },
            },
          }),
        entries: async () =>
          await prisma.entry.findMany({
            include: {
              category: true,
              image: true,
            },
          }),
      },
    },
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as POST }
