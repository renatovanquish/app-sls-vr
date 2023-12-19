import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  CreateCategoryInput,
  UpdateCategoryInput,
  DeleteCategoryInput,
  GetCategoryQueryVariables,
  ListCategoriesQueryVariables,
} from 'API'

export const useCategory = () => {
  const getCategory = async (variables: GetCategoryQueryVariables) => {
    const {
      data: { getCategory },
    } = (await API.graphql(
      graphqlOperation(queries.getCategory, variables)
    )) as GraphQLResult<any>
    return getCategory
  }

  const listCategories = async (variables: ListCategoriesQueryVariables) => {
    const {
      data: {
        listCategories: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listCategories,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const createCategory = async (input: CreateCategoryInput) => {
    const {
      data: { createCategory },
    } = (await API.graphql({
      query: mutations.createCategory,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return createCategory
  }

  const updateCategory = async (input: UpdateCategoryInput) => {
    const {
      data: { updateCategory },
    } = (await API.graphql({
      query: mutations.updateCategory,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return updateCategory
  }

  const deleteCategory = async (input: DeleteCategoryInput) => {
    try {
      await API.graphql({
        query: mutations.deleteCategory,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  return {
    getCategory,
    listCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
