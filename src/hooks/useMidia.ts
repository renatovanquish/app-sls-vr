import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  ListMidiaByKeyQueryVariables,
  CreateMidiaInput,
  UpdateMidiaInput,
  DeleteMidiaInput,
} from 'API'

import { toast } from 'react-toast'

export const useMidia = () => {

  const listMidiaByKey = async (variables: ListMidiaByKeyQueryVariables) => {
    const {
      data: {
        listMidiaByKey: { items },
      },
    } = (await API.graphql({
      query: queries.listMidiaByKey,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return items[0]
  }

  const createMidia = async (input: CreateMidiaInput) => {
    try {
      await API.graphql({
        query: mutations.createMidia,
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

  const updateMidia = async (input: UpdateMidiaInput) => {
    try {
      await API.graphql(graphqlOperation(mutations.updateMidia, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteMidia = async (input: DeleteMidiaInput) => {
    try {
      await API.graphql(graphqlOperation(mutations.deleteMidia, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  return {
    createMidia,
    updateMidia,
    deleteMidia,
    listMidiaByKey,
  }
}
