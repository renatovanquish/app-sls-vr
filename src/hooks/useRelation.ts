import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  ListRelationsByTypeStatusUpdatedAtQueryVariables,
  ListRelationsByTypeUpdatedAtQueryVariables,
  ListRelationsByTypeModeUpdatedAtQueryVariables,
  ListRelationsByStatusUpdatedAtQueryVariables,
  ListRelationsByStatusTypeNameQueryVariables,
  GetRelationQueryVariables,
  UpdateRelationInput,
  CreateRelationInput,
  DeleteRelationInput
} from 'API'

export const useRelation = () => {
  const getRelation = async (variables: GetRelationQueryVariables) => {
    const {
      data: { getRelation },
    } = (await API.graphql(
      graphqlOperation(customQueries.getRelationCustom, variables)
    )) as GraphQLResult<any>
    return getRelation
  }

  const listRelationsByStatusUpdatedAt = async (
    variables: ListRelationsByStatusUpdatedAtQueryVariables
  ) => {
    const {
      data: {
        listRelationsByStatusUpdatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listRelationsByStatusUpdatedAt,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listRelationsByTypeUpdatedAt = async (
    variables: ListRelationsByTypeUpdatedAtQueryVariables
  ) => {
    const {
      data: {
        listRelationsByTypeUpdatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listRelationsByTypeUpdatedAtCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listRelationsByTypeModeUpdatedAt = async (
    variables: ListRelationsByTypeModeUpdatedAtQueryVariables
  ) => {
    const {
      data: {
        listRelationsByTypeModeUpdatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listRelationsByTypeModeUpdatedAtCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listRelationsByTypeStatusUpdatedAt = async (
    variables: ListRelationsByTypeStatusUpdatedAtQueryVariables
  ) => {
    const {
      data: {
        listRelationsByTypeStatusUpdatedAt: { items, nextToken },
      },
    } = (await API.graphql(
      graphqlOperation(
        customQueries.listRelationsByTypeStatusUpdatedAtCustom,
        variables
      )
    )) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listRelationsByTypeStatusUpdatedAtApiKey = async (
    variables: ListRelationsByTypeStatusUpdatedAtQueryVariables
  ) => {
    const {
      data: {
        listRelationsByTypeStatusUpdatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listRelationsByTypeStatusUpdatedAtCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listRelationsByStatusTypeName = async (
    variables: ListRelationsByStatusTypeNameQueryVariables
  ) => {
    const {
      data: {
        listRelationsByStatusTypeName: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listRelationsByStatusTypeName,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const createRelation = async (input: CreateRelationInput) => {
    try {
      const {
        data: { createRelation },
      } = (await API.graphql({
        query: mutations.createRelation,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<any>

      return createRelation
    } catch (error: any) {
      console.log(error)
    }
  }

  const updateRelation = async (input: UpdateRelationInput) => {
    try {
      const {
        data: { updateRelation },
      } = (await API.graphql({
        query: mutations.updateRelation,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<any>
      return updateRelation
    } catch (error: any) {
      console.log(error)
    }
  }

  const deleteRelation = async (input: DeleteRelationInput) => {
    try {
      await API.graphql({
        query: mutations.deleteRelation,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  interface RelationContact {
    type: string
    mode: string
    status: string
    name: string | null
    description: string | null
    avatar: string | null
    reference: string | null
    contactID: string
    userID: string
    search?: string
  }
  const createRelationContact = async (input: RelationContact) => {
    const {
      type,
      mode,
      status,
      name,
      description,
      avatar,
      reference,
      contactID,
      userID,
      search,
    } = input

    if (userID === contactID) {
      return {
        createdRelation: {},
        message: { text: 'Você não pode se adicionar como contato.' },
      }
    }

    try {
      const {
        data: { getRelation },
      } = (await API.graphql(
        graphqlOperation(queries.getRelation, {
          id: `${userID}_${contactID}`,
        })
      )) as GraphQLResult<any>

      if (getRelation) {
        return {
          createdRelation: getRelation,
          message: { text: 'Você já tem este contato.' },
        }
      }
    } catch (e) {
      console.log(e)
    }

    try {
      const {
        data: { getRelation },
      } = (await API.graphql(
        graphqlOperation(queries.getRelation, { id: `${contactID}_${userID}` })
      )) as GraphQLResult<any>

      if (getRelation) {
        return {
          createdRelation: getRelation,
          message: { text: 'Você já tem este contato.' },
        }
      }
    } catch (e) {
      console.log(e)
    }

    const relationID = `${userID}_${contactID}`

    try {
      const {
        data: { createRelation },
      } = (await API.graphql({
        query: mutations.createRelation,
        variables: {
          input: {
            id: relationID,
            type,
            mode,
            status,
            name,
            description,
            avatar,
            reference,
            members: [contactID, userID],
            admins: [contactID, userID],
            search,
            updatedAt: new Date().toISOString(),
          },
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<any>

      if (createRelation && createRelation.id) {
        await API.graphql({
          query: mutations.createRelationLink,
          variables: {
            input: {
              relationID: relationID,
              userID,
              type,
              notify: 0,
              search: name ? name.toLowerCase() : '',
            },
          },
          authMode: GRAPHQL_AUTH_MODE.API_KEY,
        })

        await API.graphql({
          query: mutations.createRelationLink,
          variables: {
            input: {
              relationID: relationID,
              userID: contactID,
              type,
              notify: 0,
              search: name ? name.toLowerCase() : '',
            },
          },
          authMode: GRAPHQL_AUTH_MODE.API_KEY,
        })
      }

      return {
        createdRelation: createRelation,
        message: { text: '' },
      }
    } catch (e) {
      console.log(e)
    }

    return { createdRelation: {}, message: { text: '' } }
  }

  return {
    getRelation,
    updateRelation,
    listRelationsByTypeUpdatedAt,
    listRelationsByStatusUpdatedAt,
    listRelationsByTypeStatusUpdatedAt,
    listRelationsByTypeStatusUpdatedAtApiKey,
    listRelationsByTypeModeUpdatedAt,
    listRelationsByStatusTypeName,
    deleteRelation,
    createRelation,
    createRelationContact,
  }
}
