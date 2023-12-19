import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  CreateInviteInput,
  UpdateInviteInput,
  DeleteInviteInput,
  GetInviteQueryVariables,
  ListInvitesQueryVariables,
  ListInvitesByEmailQueryVariables,
  ListInvitesByPhoneQueryVariables,
} from 'API'

export const useInvite = () => {
  const getInvite = async (variables: GetInviteQueryVariables) => {
    const {
      data: { getInvite },
    } = (await API.graphql(
      graphqlOperation(queries.getInvite, variables)
    )) as GraphQLResult<any>
    return getInvite
  }

  const listInvites = async (variables: ListInvitesQueryVariables) => {
    const {
      data: {
        listInvites: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listInvites,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listInvitesByEmail = async (
    variables: ListInvitesByEmailQueryVariables
  ) => {
    const {
      data: {
        listInvitesByEmail: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listInvitesByEmail,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listInvitesByPhone = async (
    variables: ListInvitesByPhoneQueryVariables
  ) => {
    const {
      data: {
        listInvitesByPhone: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listInvitesByPhone,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const createInvite = async (input: CreateInviteInput) => {
    const {
      data: { createInvite },
    } = (await API.graphql({
      query: mutations.createInvite,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return createInvite
  }

  const updateInvite = async (input: UpdateInviteInput) => {
    const {
      data: { updateInvite },
    } = (await API.graphql({
      query: mutations.updateInvite,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return updateInvite
  }

  const deleteInvite = async (input: DeleteInviteInput) => {
    try {
      await API.graphql({
        query: mutations.deleteInvite,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  return {
    getInvite,
    listInvites,
    listInvitesByEmail,
    listInvitesByPhone,
    createInvite,
    updateInvite,
    deleteInvite,
  }
}
