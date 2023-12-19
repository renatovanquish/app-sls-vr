import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  CreateDataBaseInput,
  UpdateDataBaseInput,
  DeleteDataBaseInput,
  ListDataBasesQueryVariables,
  ListDataBasesByNameQueryVariables,
  CreateDataBaseItemInput,
  UpdateDataBaseItemInput,
  DeleteDataBaseItemInput,
  ListItemsByDataBaseCreatedAtQueryVariables,
  ListItemsByUserCreatedAtQueryVariables,
} from 'API'

export const useDataBase = () => {
  const listDataBases = async (variables: ListDataBasesQueryVariables) => {
    const {
      data: {
        listDataBases: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listDataBases,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listDataBasesByName = async (
    variables: ListDataBasesByNameQueryVariables
  ) => {
    const {
      data: {
        listDataBasesByName: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listDataBasesByName,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const createDataBase = async (input: CreateDataBaseInput) => {
    const {
      data: { createDataBase },
    } = (await API.graphql({
      query: mutations.createDataBase,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return createDataBase
  }

  const updateDataBase = async (input: UpdateDataBaseInput) => {
    const {
      data: { updateDataBase },
    } = (await API.graphql({
      query: mutations.updateDataBase,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return updateDataBase
  }

  const deleteDataBase = async (input: DeleteDataBaseInput) => {
    try {
      await API.graphql({
        query: mutations.deleteDataBase,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  const createDataBaseItem = async (input: CreateDataBaseItemInput) => {
    try {
      const {
        data: { createDataBaseItem },
      } = (await API.graphql({
        query: mutations.createDataBaseItem,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<any>
      return createDataBaseItem
    } catch (error: any) {
      console.log(error)
    }

  }

  const updateDataBaseItem = async (input: UpdateDataBaseItemInput) => {
    const {
      data: { updateDataBaseItem },
    } = (await API.graphql({
      query: mutations.updateDataBaseItem,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return updateDataBaseItem
  }

  const deleteDataBaseItem = async (input: DeleteDataBaseItemInput) => {
    try {
      await API.graphql({
        query: mutations.deleteDataBaseItem,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  const listItemsByDataBaseCreatedAt = async (
    variables: ListItemsByDataBaseCreatedAtQueryVariables
  ) => {
    const {
      data: {
        listItemsByDataBaseCreatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listItemsByDataBaseCreatedAtCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listItemsByUserCreatedAt = async (
    variables: ListItemsByUserCreatedAtQueryVariables
  ) => {
    const {
      data: {
        listItemsByUserCreatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listItemsByUserCreatedAt,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  return {
    listDataBases,
    listDataBasesByName,
    createDataBase,
    updateDataBase,
    deleteDataBase,
    createDataBaseItem,
    updateDataBaseItem,
    deleteDataBaseItem,
    listItemsByDataBaseCreatedAt,
    listItemsByUserCreatedAt,
  }
}
