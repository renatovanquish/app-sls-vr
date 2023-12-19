import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  GetBlockQueryVariables,
  ListBlocksQueryVariables,
  ListBlocksByPageQueryVariables,
  ListBlocksByPageOrderQueryVariables,
  CreateBlockInput,
} from 'API'

import { toast } from 'react-toast'

export const useBlock = () => {
  const getBlock = async (variables: GetBlockQueryVariables) => {
    const {
      data: { getBlock },
    } = (await API.graphql(
      graphqlOperation(queries.getBlock, variables)
    )) as GraphQLResult<any>
    return getBlock
  }

  const listBlocks = async (variables: ListBlocksQueryVariables) => {
    const {
      data: {
        listBlocks: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listBlocks,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listBlocksByPage = async (
    variables: ListBlocksByPageQueryVariables
  ) => {
    const {
      data: {
        listBlocksByPage: { items, nextToken },
      },
    } = (await API.graphql(
      graphqlOperation(queries.listBlocksByPage, variables)
    )) as GraphQLResult<any>

    return { items, nextToken }
  }

  const listBlocksByPageOrder = async (
    variables: ListBlocksByPageOrderQueryVariables
  ) => {
    const {
      data: {
        listBlocksByPageOrder: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listBlocksByPageOrder,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return { items, nextToken }
  }

  const createBlock = async (input: CreateBlockInput) => {
    try {
      const {
        data: { createBlock },
      } = (await API.graphql({
        query: mutations.createBlock,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<any>
      return createBlock
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const updateBlock = async (input: any) => {
    try {
      const {
        data: { updateBlock },
      } = (await API.graphql({
        query: mutations.updateBlock,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<any>

      const pageID = updateBlock.pageID

      const {
        data: { getPage },
      } = (await API.graphql({
        query: customQueries.getPageCustom,
        variables: { id: pageID },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<any>

      if (getPage) {
        const { content, sideColumnContent, description, blocks } = getPage
        let search = ''
        if (content) {
          search = search + content.toLowerCase()
        }
        if (sideColumnContent) {
          search = search + sideColumnContent.toLowerCase()
        }
        if (description) {
          search = search + description.toLowerCase()
        }
        blocks.items.map((block: any) => {
          search = search + block.content.toLowerCase()
        })
        await API.graphql({
          query: mutations.updatePage,
          variables: { input: { id: pageID, search } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })
      }

      return updateBlock
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const deleteBlock = async (input: any) => {
    try {
      await API.graphql(graphqlOperation(mutations.deleteBlock, { input }))
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.info(message)
      }
    }
  }

  return {
    getBlock,
    listBlocks,
    listBlocksByPage,
    listBlocksByPageOrder,
    createBlock,
    updateBlock,
    deleteBlock,
  }
}
