import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation, Auth } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  CreateFavoriteInput,
  UpdateFavoriteInput,
  DeleteFavoriteInput,
  ListFavoritesQueryVariables,
  ListFavoritesByUserTypeQueryVariables,
  ListFavoritesByFavoriteIDUserQueryVariables
} from 'API'

export const useFavorite = () => {

  const createFavorite = async (input: CreateFavoriteInput) => {
    try {
      return await API.graphql({
        query: mutations.createFavorite,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      console.log(r)
    }
  }

  const updateFavorite = async (input: UpdateFavoriteInput) => {
    try {
      return await API.graphql({
        query: mutations.updateFavorite,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      console.log(r)
    }
  }

  const deleteFavorite = async (input: DeleteFavoriteInput) => {
    try {
      await API.graphql({
        query: mutations.deleteFavorite,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      console.log(r)
    }
  }

  const listFavorites = async (variables: ListFavoritesQueryVariables) => {
    const {
      data: {
        listFavorites: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listFavorites,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listFavoritesByUserType = async (
    variables: ListFavoritesByUserTypeQueryVariables
  ) => {
    const {
      data: {
        listFavoritesByUserType: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listFavoritesByUserType,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listFavoritesByFavoriteIDUser = async (
    variables: ListFavoritesByFavoriteIDUserQueryVariables
  ) => {
    const {
      data: {
        listFavoritesByFavoriteIDUser: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listFavoritesByFavoriteIDUser,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  return {
    createFavorite,
    updateFavorite,
    deleteFavorite,
    listFavorites,
    listFavoritesByUserType,
    listFavoritesByFavoriteIDUser
  }
}
