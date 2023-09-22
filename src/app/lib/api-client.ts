import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      // process.env.SERVER_HOST
      // 'http://localhost:3000/api/graphql'
      uri: 'https://botw-hyrule-compendium.vercel.app/api/graphql',

      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },

      // only fetch data at build time
      // [nextjs-extended fetch](https://nextjs.org/docs/app/api-reference/functions/fetch#optionsnextrevalidate)
      fetchOptions: { next: { revalidate: false } },
    }),
  })
})
