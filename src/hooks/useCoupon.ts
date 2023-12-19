import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  CreateCouponInput,
  UpdateCouponInput,
  DeleteCouponInput,
  GetCouponQueryVariables,
  ListCouponsQueryVariables,
  ListCouponsByCodeQueryVariables,
  CreateCouponUsedInput,
  ListUsedByCouponQueryVariables,
  ListUsedByCouponUserQueryVariables,
  CreateCouponProductInput,
  UpdateCouponProductInput,
  DeleteCouponProductInput,
  ListProductsByCouponQueryVariables,
} from 'API'

export const useCoupon = () => {
  const getCoupon = async (variables: GetCouponQueryVariables) => {
    const {
      data: { getCoupon },
    } = (await API.graphql(
      graphqlOperation(queries.getCoupon, variables)
    )) as GraphQLResult<any>
    return getCoupon
  }

  const listCouponsByCode = async (
    variables: ListCouponsByCodeQueryVariables
  ) => {
    const {
      data: {
        listCouponsByCode: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listCouponsByCodeCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listCoupons = async (variables: ListCouponsQueryVariables) => {
    const {
      data: {
        listCoupons: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listCoupons,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const createCoupon = async (input: CreateCouponInput) => {
    try {
      const {
        data: { createCoupon },
      } = (await API.graphql({
        query: mutations.createCoupon,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<any>
      return createCoupon
    } catch (r: any) {
      console.log(r)
    }
  }

  const updateCoupon = async (input: UpdateCouponInput) => {
    const {
      data: { updateCoupon },
    } = (await API.graphql({
      query: mutations.updateCoupon,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return updateCoupon
  }

  const deleteCoupon = async (input: DeleteCouponInput) => {
    try {
      await API.graphql({
        query: mutations.deleteCoupon,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  const createCouponUsed = async (input: CreateCouponUsedInput) => {
    try {
      await API.graphql({
        query: mutations.createCouponUsed,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
    } catch (r: any) {
      console.log(r)
    }
  }

  const listUsedByCoupon = async (
    variables: ListUsedByCouponQueryVariables
  ) => {
    const {
      data: {
        listUsedByCoupon: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listUsedByCouponCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const listUsedByCouponUser = async (
    variables: ListUsedByCouponUserQueryVariables
  ) => {
    const {
      data: {
        listUsedByCouponUser: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listUsedByCouponUser,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const createCouponProduct = async (input: CreateCouponProductInput) => {
    try {
      const {
        data: { createCouponProduct },
      } = (await API.graphql({
        query: mutations.createCouponProduct,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<any>
      return createCouponProduct
    } catch (r: any) {
      console.log(r)
    }
  }

  const updateCouponProduct = async (input: UpdateCouponProductInput) => {
    const {
      data: { updateCouponProduct },
    } = (await API.graphql({
      query: mutations.updateCouponProduct,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return updateCouponProduct
  }

  const deleteCouponProduct = async (input: DeleteCouponProductInput) => {
    try {
      await API.graphql({
        query: mutations.deleteCouponProduct,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  const listProductsByCoupon = async (
    variables: ListProductsByCouponQueryVariables
  ) => {
    const {
      data: {
        listProductsByCoupon: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listProductsByCoupon,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  return {
    getCoupon,
    listCoupons,
    listCouponsByCode,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    createCouponUsed,
    listUsedByCoupon,
    listUsedByCouponUser,
    createCouponProduct,
    updateCouponProduct,
    deleteCouponProduct,
    listProductsByCoupon,
  }
}
