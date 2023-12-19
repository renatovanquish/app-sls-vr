import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  ListCartsQueryVariables,
  ListCartsByUserQueryVariables,
  CreateCartInput,
  UpdateCartInput,
  DeleteCartInput,
  ListOptionsByCartQueryVariables,
  CreateCartOptionInput,
  UpdateCartOptionInput,
  DeleteCartOptionInput,
} from 'API'

import { toast } from 'react-toast'

export const useCart = () => {
  const listCarts = async (variables: ListCartsQueryVariables) => {
    const {
      data: {
        listCarts: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listCarts,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listCartsByUser = async (variables: ListCartsByUserQueryVariables) => {
    const {
      data: {
        listCartsByUser: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listCartsByUserCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createCart = async (input: CreateCartInput) => {
    try {
      const {
        data: { createCart },
      } = (await API.graphql({
        query: mutations.createCart,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<any>
      return createCart
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const updateCart = async (input: UpdateCartInput) => {
    try {
      await API.graphql(graphqlOperation(mutations.updateCart, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteCart = async (input: DeleteCartInput) => {
    try {
      console.log(input)
      await API.graphql({
        query: mutations.deleteCart,
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

  const createCartOption = async (input: CreateCartOptionInput) => {
    try {
      await API.graphql({
        query: mutations.createCartOption,
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

  const updateCartOption = async (input: UpdateCartOptionInput) => {
    try {
      await API.graphql(graphqlOperation(mutations.updateCartOption, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteCartOption = async (input: DeleteCartOptionInput) => {
    try {
      await API.graphql({
        query: mutations.deleteCartOption,
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

  const listOptionsByCart = async (
    variables: ListOptionsByCartQueryVariables
  ) => {
    const {
      data: {
        listOptionsByCart: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listOptionsByCart,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  return {
    listCarts,
    listCartsByUser,
    createCart,
    updateCart,
    deleteCart,
    listOptionsByCart,
    createCartOption,
    updateCartOption,
    deleteCartOption,
  }
}
