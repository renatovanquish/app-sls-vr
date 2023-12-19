import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  GetProductQueryVariables,
  ListProductsByCategorySubCategoryNameQueryVariables,
  ListProductsQueryVariables,
  ListProductsByStatusCategoryNameQueryVariables,
  CreateProductInput,
  ListOptionsQueryVariables,
  CreateOptionInput,
  ListOptionsByProductQueryVariables,
} from 'API'

import { toast } from 'react-toast'

export const useProduct = () => {
  const getProduct = async (variables: GetProductQueryVariables) => {
    const {
      data: { getProduct },
    } = (await API.graphql(
      graphqlOperation(customQueries.getProductCustom, variables)
    )) as GraphQLResult<any>
    return getProduct
  }

  const listProducts = async (variables: ListProductsQueryVariables) => {
    const {
      data: {
        listProducts: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listProductsCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listProductsByCategorySubCategoryName = async (
    variables: ListProductsByCategorySubCategoryNameQueryVariables
  ) => {
    const {
      data: {
        listProductsByCategorySubCategoryName: { items, nextToken },
      },
    } = (await API.graphql(
      graphqlOperation(customQueries.listProductsByCategorySubCategoryNameCustom, variables)
    )) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listProductsByStatusCategoryName = async (
    variables: ListProductsByStatusCategoryNameQueryVariables
  ) => {
    const {
      data: {
        listProductsByStatusCategoryName: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listProductsByStatusCategoryNameCustom2,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createProduct = async (input: CreateProductInput) => {
    try {
      await API.graphql({
        query: mutations.createProduct,
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

  const updateProduct = async (input: any) => {
    try {
      await API.graphql(graphqlOperation(mutations.updateProduct, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteProduct = async (input: any) => {
    try {
      await API.graphql(graphqlOperation(mutations.deleteProduct, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const listOptionsByProduct = async (
    variables: ListOptionsByProductQueryVariables
  ) => {
    const {
      data: {
        listOptionsByProduct: { items, nextToken },
      },
    } = (await API.graphql(
      graphqlOperation(queries.listOptionsByProduct, variables)
    )) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createOption = async (input: CreateOptionInput) => {
    try {
      return await API.graphql({
        query: mutations.createOption,
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

  const updateOption = async (input: any) => {
    try {
      await API.graphql(graphqlOperation(mutations.updateOption, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteOption = async (input: any) => {
    try {
      await API.graphql(graphqlOperation(mutations.deleteOption, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  return {
    getProduct,
    listProducts,
    listProductsByCategorySubCategoryName,
    listProductsByStatusCategoryName,
    createProduct,
    updateProduct,
    deleteProduct,
    listOptionsByProduct,
    createOption,
    updateOption,
    deleteOption,
  }
}
