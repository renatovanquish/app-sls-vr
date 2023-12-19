import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  CreateScheduleInput,
  UpdateScheduleInput,
  DeleteScheduleInput,
  ListSchedulesByRelationDateTimeQueryVariables,
  ListSchedulesByUserCreatedAtQueryVariables,
} from 'API'

export const useSchedule = () => {
  const createSchedule = async (input: CreateScheduleInput) => {
    const {
      data: { createSchedule },
    } = (await API.graphql({
      query: mutations.createSchedule,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return createSchedule
  }

  const updateSchedule = async (input: UpdateScheduleInput) => {
    const {
      data: { updateSchedule },
    } = (await API.graphql({
      query: mutations.updateSchedule,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return updateSchedule
  }

  const deleteSchedule = async (input: DeleteScheduleInput) => {
    try {
      await API.graphql({
        query: mutations.deleteSchedule,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  const listSchedulesByRelationDateTime = async (
    variables: ListSchedulesByRelationDateTimeQueryVariables
  ) => {
    const {
      data: {
        listSchedulesByRelationDateTime: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listSchedulesByRelationDateTime,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listSchedulesByUserCreatedAt = async (
    variables: ListSchedulesByUserCreatedAtQueryVariables
  ) => {
    const {
      data: {
        listSchedulesByUserCreatedAt: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listSchedulesByUserCreatedAt,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  return {
    createSchedule,
    updateSchedule,
    deleteSchedule,
    listSchedulesByRelationDateTime,
    listSchedulesByUserCreatedAt,
  }
}
