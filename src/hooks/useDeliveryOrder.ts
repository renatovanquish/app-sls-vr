import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  ListDeliveryOrdersQueryVariables,
  ListDeliveryByOrderQueryVariables,
  ListDeliveryByDateUserQueryVariables,
  ListDeliveryByUserDateQueryVariables,
  ListDeliveryByStatusDateQueryVariables,
  CreateDeliveryOrderInput,
  UpdateDeliveryOrderInput,
  DeleteDeliveryOrderInput,
} from 'API'

import { toast } from 'react-toast'

export const useDeliveryOrder = () => {
  const listDeliveryOrders = async (
    variables: ListDeliveryOrdersQueryVariables
  ) => {
    const {
      data: {
        listDeliveryOrders: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listDeliveryOrdersCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listDeliveryByOrder = async (
    variables: ListDeliveryByOrderQueryVariables
  ) => {
    const {
      data: {
        listDeliveryByOrder: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listDeliveryByOrderCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listDeliveryByDateUser = async (
    variables: ListDeliveryByDateUserQueryVariables
  ) => {
    const {
      data: {
        listDeliveryByDateUser: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listDeliveryByDateUserCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listDeliveryByUserDate = async (
    variables: ListDeliveryByUserDateQueryVariables
  ) => {
    const {
      data: {
        listDeliveryByUserDate: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listDeliveryByUserDateCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }
  
  const listDeliveryByStatusDate = async (
    variables: ListDeliveryByStatusDateQueryVariables
  ) => {
    const {
      data: {
        listDeliveryByStatusDate: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listDeliveryByStatusDateCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createDeliveryOrder = async (input: CreateDeliveryOrderInput) => {
    try {
      await API.graphql({
        query: mutations.createDeliveryOrder,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const updateDeliveryOrder = async (input: UpdateDeliveryOrderInput) => {
    try {
      await API.graphql({
        query: mutations.updateDeliveryOrder,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteDeliveryOrder = async (input: DeleteDeliveryOrderInput) => {
    try {
      await API.graphql({
        query: mutations.deleteDeliveryOrder,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  return {
    listDeliveryOrders,
    listDeliveryByOrder,
    listDeliveryByDateUser,
    listDeliveryByUserDate,
    listDeliveryByStatusDate,
    createDeliveryOrder,
    updateDeliveryOrder,
    deleteDeliveryOrder,
  }
}
