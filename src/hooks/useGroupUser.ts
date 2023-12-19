import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  ListGroupUsersQueryVariables,
  ListUsersByGroupQueryVariables,
  ListGroupsByUserQueryVariables,
  CreateGroupUserInput,
  DeleteGroupUserInput,
} from 'API'

import { toast } from 'react-toast'

export const useGroupUser = () => {

  const listGroupUsers = async (
    variables: ListGroupUsersQueryVariables
  ) => {
    const {
      data: {
        listGroupUsers: { items },
      },
    } = (await API.graphql({
      query: queries.listGroupUsers,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return items[0]
  }

  const listUsersByGroup = async (variables: ListUsersByGroupQueryVariables) => {
    const {
      data: {
        listUsersByGroup: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listUsersByGroupCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listGroupsByUser = async (variables: ListGroupsByUserQueryVariables) => {
    const {
      data: {
        listGroupsByUser: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listGroupsByUser,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createGroupUser = async (input: CreateGroupUserInput) => {
    try {
      await API.graphql({
        query: mutations.createGroupUser,
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

  const deleteGroupUser = async (input: DeleteGroupUserInput) => {
    try {
      await API.graphql(graphqlOperation(mutations.deleteGroupUser, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  return {
    listGroupUsers,
    listUsersByGroup,
    listGroupsByUser,
    createGroupUser,
    deleteGroupUser,
  }
}
