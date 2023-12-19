import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

// import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  GetDocumentQueryVariables,
  ListDocumentsByOwnerUpdatedAtQueryVariables,
  ListDocumentsByRelationUpdatedAtQueryVariables,
  CreateDocumentInput,
} from 'API'

import { toast } from 'react-toast'

export const useDocument = () => {
  const getDocument = async (variables: GetDocumentQueryVariables) => {
    const {
      data: { getDocument },
    } = (await API.graphql(
      graphqlOperation(queries.getDocument, variables)
    )) as GraphQLResult<any>
    return getDocument
  }

  const listDocumentsByRelationUpdatedAt = async (
    variables: ListDocumentsByRelationUpdatedAtQueryVariables
  ) => {
    const {
      data: {
        listDocumentsByRelationUpdatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listDocumentsByRelationUpdatedAt,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listDocumentsByOwnerUpdatedAt = async (
    variables: ListDocumentsByOwnerUpdatedAtQueryVariables
  ) => {
    const {
      data: {
        listDocumentsByOwnerUpdatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listDocumentsByOwnerUpdatedAt,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const createDocument = async (input: CreateDocumentInput) => {
    try {
      return await API.graphql({
        query: mutations.createDocument,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const updateDocument = async (input: any) => {
    try {
      await API.graphql(graphqlOperation(mutations.updateDocument, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteDocument = async (input: any) => {
    try {
      await API.graphql(graphqlOperation(mutations.deleteDocument, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  return {
    getDocument,
    listDocumentsByOwnerUpdatedAt,
    listDocumentsByRelationUpdatedAt,
    createDocument,
    updateDocument,
    deleteDocument,
  }
}
