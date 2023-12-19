import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  CreateRestrictedContentViewInput,
  UpdateRestrictedContentViewInput,
  ListRestrictedContentViewByRestrictedContentQueryVariables,
  ListRestrictedContentViewByRestrictedContentUserQueryVariables,
  ListRestrictedContentViewByUserQueryVariables
} from 'API'

export const useRestrictedContentView = () => {

  const createRestrictedContentView = async (
    input: CreateRestrictedContentViewInput
  ) => {
    const {
      data: { createRestrictedContentView },
    } = (await API.graphql({
      query: mutations.createRestrictedContentView,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return createRestrictedContentView
  }

  const updateRestrictedContentView = async (
    input: UpdateRestrictedContentViewInput
  ) => {
    const {
      data: { updateRestrictedContentView },
    } = (await API.graphql({
      query: mutations.updateRestrictedContentView,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return updateRestrictedContentView
  }

  const listRestrictedContentViewByRestrictedContent = async (
    variables: ListRestrictedContentViewByRestrictedContentQueryVariables
  ) => {
    const {
      data: {
        listRestrictedContentViewByRestrictedContent: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listRestrictedContentViewByRestrictedContent,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listRestrictedContentViewByRestrictedContentUser = async (
    variables: ListRestrictedContentViewByRestrictedContentUserQueryVariables
  ) => {
    const {
      data: {
        listRestrictedContentViewByRestrictedContentUser: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listRestrictedContentViewByRestrictedContentUser,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listRestrictedContentViewByUser = async (
    variables: ListRestrictedContentViewByUserQueryVariables
  ) => {
    const {
      data: {
        listRestrictedContentViewByUser: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listRestrictedContentViewByUser,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  return {
    createRestrictedContentView,
    updateRestrictedContentView,
    listRestrictedContentViewByRestrictedContent,
    listRestrictedContentViewByRestrictedContentUser,
    listRestrictedContentViewByUser
  }
}
