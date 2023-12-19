import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  GetOrderQueryVariables,
  ListOrdersQueryVariables,
  ListOrdersByUserStatusCreatedAtQueryVariables,
  ListOrdersByUserCreatedAtQueryVariables,
  ListOrdersByStatusCreatedAtQueryVariables,
  CreateOrderInput,
  UpdateOrderInput,
  DeleteOrderInput,
  CreateOrderItemInput,
  UpdateOrderItemInput,
  DeleteOrderItemInput,
  ListOptionsByOrderItemQueryVariables,
  CreateOrderItemOptionInput,
  UpdateOrderItemOptionInput,
  DeleteOrderItemOptionInput,
} from 'API'

import { toast } from 'react-toast'

export const useOrder = () => {
  const getOrder = async (variables: GetOrderQueryVariables) => {
    const {
      data: { getOrder },
    } = (await API.graphql({
      query: customQueries.getOrderCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return getOrder
  }

  const listOrders = async (variables: ListOrdersQueryVariables) => {
    const {
      data: {
        listOrders: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listOrders,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listOrdersByUserStatusCreatedAt = async (
    variables: ListOrdersByUserStatusCreatedAtQueryVariables
  ) => {
    const {
      data: {
        listOrdersByUserStatusCreatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listOrdersByUserStatusCreatedAt,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listOrdersByUserCreatedAt = async (
    variables: ListOrdersByUserCreatedAtQueryVariables
  ) => {
    const {
      data: {
        listOrdersByUserCreatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listOrdersByUserCreatedAtCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listOrdersByStatusCreatedAt = async (
    variables: ListOrdersByStatusCreatedAtQueryVariables
  ) => {
    const {
      data: {
        listOrdersByStatusCreatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listOrdersByStatusCreatedAtCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createOrder = async (input: CreateOrderInput) => {
    try {
      const r = (await API.graphql({
        query: mutations.createOrder,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as any
      return r && r.data && r.data.createOrder ? r.data.createOrder : r
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const updateOrder = async (input: UpdateOrderInput) => {
    try {
      const {
        data: {
          updateOrder,
        },
      } = await API.graphql({
        query: mutations.updateOrder,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as GraphQLResult<any>
      return updateOrder
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteOrder = async (input: DeleteOrderInput) => {
    try {
      await API.graphql(graphqlOperation(mutations.deleteOrder, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const createOrderItem = async (input: CreateOrderItemInput) => {
    try {
      const r = (await API.graphql({
        query: mutations.createOrderItem,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as any
      console.log(r)
      return r && r.data && r.data.createOrderItem ? r.data.createOrderItem : r
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const updateOrderItem = async (input: UpdateOrderItemInput) => {
    try {
      await API.graphql({
        query: mutations.updateOrderItem,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteOrderItem = async (input: DeleteOrderItemInput) => {
    try {
      await API.graphql({
        query: mutations.deleteOrderItem,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const listOptionsByOrderItem = async (
    variables: ListOptionsByOrderItemQueryVariables
  ) => {
    const {
      data: {
        listOptionsByOrderItem: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listOptionsByOrderItem,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createOrderItemOption = async (input: CreateOrderItemOptionInput) => {
    try {
      await API.graphql({
        query: mutations.createOrderItemOption,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const updateOrderItemOption = async (input: UpdateOrderItemOptionInput) => {
    try {
      await API.graphql({
        query: mutations.updateOrderItemOption,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteOrderItemOption = async (input: DeleteOrderItemOptionInput) => {
    try {
      await API.graphql({
        query: mutations.deleteOrderItemOption,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  return {
    getOrder,
    listOrders,
    listOrdersByUserStatusCreatedAt,
    listOrdersByUserCreatedAt,
    listOrdersByStatusCreatedAt,
    createOrder,
    updateOrder,
    deleteOrder,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
    listOptionsByOrderItem,
    createOrderItemOption,
    updateOrderItemOption,
    deleteOrderItemOption,
  }
}
