import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  CreateRelationLinkInput,
  DeleteRelationLinkInput,
  UpdateRelationLinkInput,
  ListRelationsLinkQueryVariables,
  ListRelationsLinkByUserTypeNotifyUpdatedAtQueryVariables,
  ListRelationsLinkByRelationUserQueryVariables,
} from 'API'

export const useRelationLink = () => { 
  const listRelationsLinkByUserTypeNotifyUpdatedAt = async (
    variables: ListRelationsLinkByUserTypeNotifyUpdatedAtQueryVariables
  ) => {
    const {
      data: {
        listRelationsLinkByUserTypeNotifyUpdatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listRelationsLinkByUserTypeNotifyUpdatedAtCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listRelationsLinkByRelationUser = async (
    variables: ListRelationsLinkByRelationUserQueryVariables
  ) => {
    const {
      data: {
        listRelationsLinkByRelationUser: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listRelationsLinkByRelationUserCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listRelationsLink = async (
    variables: ListRelationsLinkQueryVariables
  ) => {
    const {
      data: {
        listRelationsLink: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listRelationsLink,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const createRelationLink = async (input: CreateRelationLinkInput) => {
    try {
      return await API.graphql({
        query: mutations.createRelationLink,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  const updateRelationLink = async (input: UpdateRelationLinkInput) => {
    try {
      return await API.graphql({
        query: mutations.updateRelationLink,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  const deleteRelationLink = async (input: DeleteRelationLinkInput) => {
    try {
      await API.graphql({
        query: mutations.deleteRelationLink,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  return {
    listRelationsLinkByUserTypeNotifyUpdatedAt,
    listRelationsLinkByRelationUser,
    listRelationsLink,
    createRelationLink,
    updateRelationLink,
    deleteRelationLink,
  }
}
