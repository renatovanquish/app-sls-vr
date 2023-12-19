import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  GetRestrictedContentQueryVariables,
  CreateRestrictedContentInput,
  UpdateRestrictedContentInput,
  DeleteRestrictedContentInput, 
  ListRestrictedContentsByRelationOrderQueryVariables,
  ListRestrictedContentViewByRestrictedContentQueryVariables,
} from 'API'

export const useRestrictedContent = () => {
  
  const getRestrictedContent = async (
    variables: GetRestrictedContentQueryVariables
  ) => {
    const {
      data: { getRestrictedContent },
    } = (await API.graphql(
      graphqlOperation(queries.getRestrictedContent, variables)
    )) as GraphQLResult<any>
    return getRestrictedContent
  }

  const listRestrictedContentsByRelationOrder = async (
    variables: ListRestrictedContentsByRelationOrderQueryVariables
  ) => {
    const {
      data: {
        listRestrictedContentsByRelationOrder: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listRestrictedContentsByRelationOrder,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
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

  const createRestrictedContent = async (
    input: CreateRestrictedContentInput
  ) => {
    const {
      data: { createRestrictedContent },
    } = (await API.graphql({
      query: mutations.createRestrictedContent,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return createRestrictedContent
  }

  const updateRestrictedContent = async (
    input: UpdateRestrictedContentInput
  ) => {
    const {
      data: { updateRestrictedContent },
    } = (await API.graphql({
      query: mutations.updateRestrictedContent,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return updateRestrictedContent
  }

  const deleteRestrictedContent = async (
    input: DeleteRestrictedContentInput
  ) => {
    try {
      await API.graphql({
        query: mutations.deleteRestrictedContent,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  return {
    getRestrictedContent,
    listRestrictedContentsByRelationOrder,
    createRestrictedContent,
    updateRestrictedContent,
    deleteRestrictedContent,
  }
}
