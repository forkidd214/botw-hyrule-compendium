import { gql } from '@apollo/client'
import { getClient } from '@/lib/client'

export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

const userQuery = gql`
  query {
    greetings
  }
`

export default async function Compendium() {
  const { data } = await getClient().query({ query: userQuery })

  console.log('data...', data)

  return <p>data received during RSC render: {JSON.stringify(data)}</p>
}
