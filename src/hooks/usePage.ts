import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  GetPageQueryVariables,
  ListPagesByMenuOrderQueryVariables,
  ListPagesQueryVariables,
  ListPagesByStatusMenuOrderQueryVariables,
  CreatePageInput,
} from 'API'

import { toast } from 'react-toast'

export const usePage = () => {
  const getPage = async (variables: GetPageQueryVariables) => {
    const {
      data: { getPage },
    } = (await API.graphql(
      graphqlOperation(queries.getPage, variables)
    )) as GraphQLResult<any>
    return getPage
  }

  const listPages = async (variables: ListPagesQueryVariables) => {
    const {
      data: {
        listPages: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listPages,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listPagesByMenuOrder = async (
    variables: ListPagesByMenuOrderQueryVariables
  ) => {
    const {
      data: {
        listPagesByMenuOrder: { items, nextToken },
      },
    } = (await API.graphql({
        query: queries.listPagesByMenuOrder,
        variables,
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listPagesByStatusMenuOrder = async (
    variables: ListPagesByStatusMenuOrderQueryVariables
  ) => {
    const {
      data: {
        listPagesByStatusMenuOrder: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listPagesByStatusMenuOrder,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listPagesByStatusMenuOrderCustom = async (
    variables: ListPagesByStatusMenuOrderQueryVariables
  ) => {
    const {
      data: {
        listPagesByStatusMenuOrder: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listPagesByStatusMenuOrderCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listPagesByStatusMenuOrderCustom2 = async (
    variables: ListPagesByStatusMenuOrderQueryVariables
  ) => {
    const {
      data: {
        listPagesByStatusMenuOrder: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listPagesByStatusMenuOrderCustom2,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createPage = async (input: CreatePageInput) => {
    try {
      await API.graphql({
        query: mutations.createPage,
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

  const updatePage = async (input: any) => {
    try {
      await API.graphql(graphqlOperation(mutations.updatePage, { input }))
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deletePage = async (input: any) => {
    try {
      await API.graphql(graphqlOperation(mutations.deletePage, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  return {
    getPage,
    listPages,
    listPagesByMenuOrder,
    listPagesByStatusMenuOrder,
    listPagesByStatusMenuOrderCustom,
    listPagesByStatusMenuOrderCustom2,
    createPage,
    updatePage,
    deletePage,
  }
}
