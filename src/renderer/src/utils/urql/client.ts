import { Client, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
import {
  GraphCacheConfig,
  ItemsDocument,
  ItemsQuery,
  MeUserDocument,
  MeUserQuery,
  MyOrderDocument,
  MyOrderQuery
} from '../../hooks/graphql'
const Config: GraphCacheConfig = {
  updates: {
    Mutation: {
      login: ({ login }, _, cache) => {
        const query = MeUserDocument
        cache.updateQuery<MeUserQuery>(
          {
            query
          },
          (data) => {
            if (data) {
              data.meUser = login.user
              return data
            }
            return {
              meUser: login.user
            }
          }
        )
      },
      logout: ({ logout }, _, cache) => {
        const query = MeUserDocument

        cache.updateQuery<MeUserQuery>(
          {
            query
          },
          (data) => {
            if (logout) {
              if (data) {
                data.meUser = null
                return data
              }
            }
            return data
          }
        )
      },
      createItem({ createItem }, _, cache) {
        const query = ItemsDocument
        cache.updateQuery<ItemsQuery>({ query }, (data) => {
          if (data?.items && createItem.item) {
            data.items.push(createItem.item)
          }
          return data
        })
      },
      handelOrder({ handelOrder }, _, cache) {
        const query = MyOrderDocument
        cache.updateQuery<MyOrderQuery>({ query }, (data) => {
          if (!data?.MyOrder) {
            return { MyOrder: handelOrder.order }
          } else {
            console.log(data)
            data.MyOrder!.soldItems = data.MyOrder!.soldItems
            return data
          }
        })
      },
      removeItem({removeItem},_,cache){
        const query =MyOrderDocument
        cache.updateQuery<MyOrderQuery>({ query }, (data) => {
          if(!removeItem){
            data!.MyOrder = null
            return data
          }
          data!.MyOrder!.soldItems = data!.MyOrder!.soldItems
          return data 
        })

      }
    }
  },
  storage: {
    readData: async () => {
      return new Promise(() => {})
    },
    writeData: async () => {}
  }
}
const client = new Client({
  url: 'http://localhost:4000/graphql',
  // requestPolicy:"cache-and-network",
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [cacheExchange<GraphCacheConfig>(Config), fetchExchange]
})

export default client
