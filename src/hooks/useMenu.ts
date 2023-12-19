import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  CreateMenuInput,
  UpdateMenuInput,
  DeleteMenuInput,
  GetMenuQueryVariables,
  ListMenusQueryVariables,
} from 'API'

export const useMenu = () => {
  const getMenu = async (variables: GetMenuQueryVariables) => {
    const {
      data: { getMenu },
    } = (await API.graphql(
      graphqlOperation(queries.getMenu, variables)
    )) as GraphQLResult<any>
    return getMenu
  }

  const listMenus = async (variables: ListMenusQueryVariables) => {
    const {
      data: {
        listMenus: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listMenus,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const createMenu = async (input: CreateMenuInput) => {
    const {
      data: { createMenu },
    } = (await API.graphql({
      query: mutations.createMenu,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return createMenu
  }

  const updateMenu = async (input: UpdateMenuInput) => {
    const {
      data: { updateMenu },
    } = (await API.graphql({
      query: mutations.updateMenu,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return updateMenu
  }

  const deleteMenu = async (input: DeleteMenuInput) => {
    try {
      await API.graphql({
        query: mutations.deleteMenu,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  return {
    getMenu,
    listMenus,
    createMenu,
    updateMenu,
    deleteMenu,
  }
}
