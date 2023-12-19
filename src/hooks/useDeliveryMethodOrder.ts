import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  ListDeliveryMethodOrdersQueryVariables,
  CreateDeliveryMethodOrderInput,
  UpdateDeliveryMethodOrderInput,
  DeleteDeliveryMethodOrderInput,
} from 'API'

import { toast } from 'react-toast'

export const useDeliveryMethodOrder = () => {

  const listDeliveryMethodOrders = async (variables: ListDeliveryMethodOrdersQueryVariables) => {
    const {
      data: {
        listDeliveryMethodOrders: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listDeliveryMethodOrders,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createDeliveryMethodOrder = async (input: CreateDeliveryMethodOrderInput) => {
    try {
      await API.graphql({
        query: mutations.createDeliveryMethodOrder,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const updateDeliveryMethodOrder = async (input: UpdateDeliveryMethodOrderInput) => {
    try {
      await API.graphql(graphqlOperation(mutations.updateDeliveryMethodOrder, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteDeliveryMethodOrder = async (input: DeleteDeliveryMethodOrderInput) => {
    try {
      await API.graphql(graphqlOperation(mutations.deleteDeliveryMethodOrder, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  return {
    createDeliveryMethodOrder,
    updateDeliveryMethodOrder,
    deleteDeliveryMethodOrder,
    listDeliveryMethodOrders,
  }
}
