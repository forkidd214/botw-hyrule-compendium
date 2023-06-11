// import { gql } from '@apollo/client'
// import { getClient } from '@/app/lib/client'

// export const dynamic = 'force-dynamic'
// // 'auto' | 'force-dynamic' | 'error' | 'force-static'

// const GET_CATEGORIES = gql`
//   query {
//     categories {
//       id
//       name
//     }
//   }
// `

// const GET_ENTRIES_BY_CATEGORY = gql`
//   query GetEntriesByCategory($id: ID, $name: String) {
//     category(id: $id, name: $name) {
//       id
//       name
//       entries {
//         id
//         name
//         description
//         commonLocations
//         image {
//           id
//           name
//           src
//           height
//           width
//         }
//         category {
//           id
//           name
//         }
//         drops
//         edible
//         attack
//         defense
//         heartsRecovered
//         cookingEffect
//       }
//     }
//   }
// `

// const GET_ENTRIES = gql`
//   query GetEntries {
//     entries {
//       id
//       name
//       description
//       commonLocations
//       image {
//         id
//         name
//         src
//         width
//         height
//       }
//       category {
//         id
//         name
//       }
//       drops
//       edible
//       attack
//       defense
//       heartsRecovered
//       cookingEffect
//     }
//   }
// `

export default function Compendium() {
  return <div>under construction...</div>
  // const { loading, error, data } = await getClient().query({
  //   query: GET_CATEGORIES,
  //   variables: {},
  // })

  // if (loading) return <div>Loading...</div>
  // if (error) return <div>{`new Error... ${error}`}</div>

  // return <p>data received during RSC render: {JSON.stringify(data)}</p>
}
