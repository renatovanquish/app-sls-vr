import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  ListFoldersQueryVariables,
  ListFoldersByNameQueryVariables,
  CreateFolderInput,
  UpdateFolderInput,
  DeleteFolderInput,
} from 'API'

import { toast } from 'react-toast'

export const useFolder = () => {
  const listFoldersByName = async (
    variables: ListFoldersByNameQueryVariables
  ) => {
    const {
      data: {
        listFoldersByName: { items },
      },
    } = (await API.graphql({
      query: queries.listFoldersByName,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return items[0]
  }

  const listFolders = async (variables: ListFoldersQueryVariables) => {
    const {
      data: {
        listFolders: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listFolders,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createFolder = async (input: CreateFolderInput) => {
    try {
      await API.graphql({
        query: mutations.createFolder,
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

  const updateFolder = async (input: UpdateFolderInput) => {
    try {
      await API.graphql(graphqlOperation(mutations.updateFolder, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteFolder = async (input: DeleteFolderInput) => {
    try {
      await API.graphql(graphqlOperation(mutations.deleteFolder, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  return {
    createFolder,
    updateFolder,
    deleteFolder,
    listFolders,
    listFoldersByName,
  }
}
