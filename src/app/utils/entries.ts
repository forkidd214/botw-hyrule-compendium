import { gql } from '@apollo/client'
import { getClient } from '@/app/lib/api-client'

type Entry = {
  __typename: string
  id: string
  name: string
  description: string
  commonLocations: string[]
  image: {
    __typename: string
    id: string
    name: string
    src: string
    width: number
    height: number
  }
  category: {
    __typename: string
    id: string
    name: string
  }

  drops: string[]
  edible: boolean | null
  attack: number | null
  defense: number | null
  heartsRecovered: number | null
  cookingEffect: string | null
}

const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`

const GET_ENTRIES_BY_CATEGORY = gql`
  query GetEntriesByCategory($id: ID, $name: String) {
    category(id: $id, name: $name) {
      id
      name
      entries {
        id
        name
        description
        commonLocations
        image {
          id
          name
          src
          height
          width
        }
        category {
          id
          name
        }
        drops
        edible
        attack
        defense
        heartsRecovered
        cookingEffect
      }
    }
  }
`

const GET_ENTRIES = gql`
  query GetEntries {
    entries {
      id
      name
      description
      commonLocations
      image {
        id
        name
        src
        width
        height
      }
      category {
        id
        name
      }
      drops
      edible
      attack
      defense
      heartsRecovered
      cookingEffect
    }
  }
`

// disabling all caching from next-server
// !should explicity 'export {dynamic}' in .tsx files that use the client
const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

const useCategories = async () => {
  return await getClient().query({
    query: GET_CATEGORIES,
  })
}

const useEntries = async () => {
  return await getClient().query({
    query: GET_ENTRIES,
  })
}

const useEntriesByCategory = async (category: {
  id?: string
  name?: string
}) => {
  return await getClient().query({
    query: GET_ENTRIES_BY_CATEGORY,
    variables: { ...category },
  })
}

export { type Entry, useCategories, useEntries, useEntriesByCategory, dynamic }
