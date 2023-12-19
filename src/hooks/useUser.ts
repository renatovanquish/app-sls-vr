import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
  GetUserQueryVariables,
  GetProfileQueryVariables,
  ListUsersQueryVariables,
  CreateUserInput,
  UpdateUserInput,
  UpdateProfileInput,
  AdminCreateUserMutationVariables,
  AdminAddUserToGroupMutationVariables,
  AdminDeleteUserMutationVariables,
  GetUserByEmailQueryVariables,
  GetUserByPhoneQueryVariables
} from 'API'

import { UserStatus, GenderOptions } from 'models'

export const useUser = () => {
  const listUsers = async (variables: ListUsersQueryVariables) => {
    const {
      data: {
        listUsers: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.listUsersCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  const getUser = async (variables: GetUserQueryVariables) => {
    const {
      data: { getUser },
    } = (await API.graphql(
      graphqlOperation(customQueries.getUserCustom, variables)
    )) as GraphQLResult<any>
    return getUser
  }

  const getUserByEmail = async (variables: GetUserByEmailQueryVariables) => {
    const {
      data: {
        getUserByEmail: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.getUserByEmailCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return items[0]
  }

  const getUserByPhone = async (variables: GetUserByPhoneQueryVariables) => {
    const {
      data: {
        getUserByPhone: { items, nextToken },
      },
    } = (await API.graphql({
      query: customQueries.getUserByPhoneCustom,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return items[0]
  }

  const getProfile = async (variables: GetProfileQueryVariables) => {
    const {
      data: { getProfile },
    } = (await API.graphql({
      query: queries.getProfile,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return getProfile
  }

  const updateUser = async (input: UpdateUserInput) => {
    const {
      data: { updateUser },
    } = (await API.graphql({
      query: mutations.updateUser,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return updateUser
  }

  const updateProfile = async (input: UpdateProfileInput) => {
    const {
      data: { updateProfile },
    } = (await API.graphql({
      query: mutations.updateProfile,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return updateProfile
  }

  const userExists = async (input: AdminCreateUserMutationVariables) => {
    const { email, phone } = input

    const result = {
      id: '',
      hasEmail: false,
      hasPhone: false,
      sameId: false,
      name: '',
    }

    let accountByEmailID
    let accountByEmailName

    let accountByPhoneID
    let accountByPhoneName

    if (email) {
      const {
        data: { getUserByEmail },
      } = (await API.graphql({
        query: queries.getUserByEmail,
        variables: { email },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<any>

      accountByEmailID =
        getUserByEmail &&
        getUserByEmail.items &&
        getUserByEmail.items.length > 0
          ? getUserByEmail.items[0].id
          : ''

      result.hasEmail = accountByEmailID ? true : false
      accountByEmailName =
        getUserByEmail &&
        getUserByEmail.items &&
        getUserByEmail.items.length > 0
          ? getUserByEmail.items[0].name
          : ''
    }

    if (phone) {
      const {
        data: { getUserByPhone },
      } = (await API.graphql({
        query: queries.getUserByPhone,
        variables: { phone },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<any>

      accountByPhoneID =
        getUserByPhone &&
        getUserByPhone.items &&
        getUserByPhone.items.length > 0
          ? getUserByPhone.items[0].id
          : null

      result.hasPhone = accountByPhoneID ? true : false
      accountByPhoneName =
        getUserByPhone &&
        getUserByPhone.items &&
        getUserByPhone.items.length > 0
          ? getUserByPhone.items[0].name
          : null
    }

    result.sameId = accountByEmailID === accountByPhoneID

    result.id = accountByEmailID
      ? accountByEmailID
      : accountByPhoneID
      ? accountByPhoneID
      : null

    result.name = accountByEmailID
      ? accountByEmailName
      : accountByPhoneID
      ? accountByPhoneName
      : null
    return result
  }

  const adminCreateUser = async (input: AdminCreateUserMutationVariables) => {
    const { name, email, phone } = input

    if (!name) {
      return { message: { text: 'Nome é obrigatório' } }
    }

    if (!email && !phone) {
      return { message: { text: 'Email ou celular é obrigatório.' } }
    }

    const {
      data: { adminCreateUser },
    } = (await API.graphql({
      query: mutations.adminCreateUser,
      variables: {
        name,
        email: email ? email.trim().toLowerCase() : null,
        phone: phone ? phone : null,
        messageAction: null,
        passwordLength: process.env.PASSWORD_LENGTH,
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    const inputUser: CreateUserInput = {
      name,
      email: email ? email.trim().toLowerCase() : null,
      phone,
      status: UserStatus.PREREGISTER,
      active: false,
    }

    inputUser.id = adminCreateUser.substr(4, adminCreateUser.length - 5)
    inputUser.search = name.toLowerCase()

    const {
      data: { createUser },
    } = (await API.graphql({
      query: mutations.createUser,
      variables: { input: inputUser },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    await API.graphql({
      query: mutations.createProfile,
      variables: {
        input: {
          userID: inputUser.id,
          gender: GenderOptions.UNKNOWN,
        },
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })

    return {
      createdUser: createUser,
      message: { text: 'Conta criada com sucesso!' },
    }
  }

  const adminUpdateUser = async (input: any) => {
    const { id, name, email, phone, search } = input

    if (!id) {
      return { message: { text: 'Id é obrigatório.' } }
    }

    if (!name) {
      return { message: { text: 'Nome é obrigatório.' } }
    }

    if (!email && !phone) {
      return { message: { text: 'Email ou celular é obrigatório.' } }
    }

    await API.graphql({
      query: mutations.adminCreateUser,
      variables: {
        name,
        email: email ? email.toLowerCase() : null,
        phone: phone ? phone : null,
        id,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })

    const {
      data: { updateUser },
    } = (await API.graphql({
      query: mutations.updateUser,
      variables: {
        input: {
          id,
          name,
          email: email ? email.toLowerCase() : null,
          phone: phone ? phone : null,
          search: name.toLowerCase(),
        },
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return {
      updatedUser: updateUser,
      message: { text: 'Conta atualizada com sucesso!' },
    }
  }

  const resendTempPass = async (input: AdminCreateUserMutationVariables) => {
    const { name, email, phone } = input

    if (!name) {
      return { message: { text: 'Nome é obrigatório' } }
    }

    if (!email && !phone) {
      return { message: { text: 'Email ou celular é obrigatório.' } }
    }

    await API.graphql({
      query: mutations.adminCreateUser,
      variables: {
        name,
        email: email ? email.toLowerCase() : null,
        phone: phone ? phone : null,
        messageAction: 'RESEND',
        passwordLength: process.env.PASSWORD_LENGTH,
        resendTempPass: 1,
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })

    return null
  }

  const adminConfirmSignUp = async (input: any) => {
    const { id } = input

    if (!id) {
      return { message: { text: 'ID é obrigatório' } }
    }

    const r = await API.graphql({
      query: mutations.adminCreateUser,
      variables: {
        id,
        confirmSignUp: 1,
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })
    return r
  }

  const adminAddUserToGroup = async (
    variables: AdminAddUserToGroupMutationVariables
  ) => {
    const { username, groups } = variables

    if (!username) {
      return { message: { text: 'Username é obrigatório' } }
    }

    const {
      data: { adminAddUserToGroup },
    } = (await API.graphql({
      query: mutations.adminAddUserToGroup,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    return adminAddUserToGroup
  }

  const adminDeleteUser = async (variables: AdminDeleteUserMutationVariables) => {

    const {
      data: { adminDeleteUser },
    } = (await API.graphql({
      query: mutations.adminDeleteUser,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    const {
      data: { deleteUser },
    } = (await API.graphql({
      query: mutations.deleteUser,
      variables: { input: { id: variables.id } },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    const {
      data: { deleteProfile },
    } = (await API.graphql({
      query: mutations.deleteProfile,
      variables: { input: { userID: variables.id } },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

  }

  return {
    listUsers,
    getUser,
    getUserByEmail,
    getUserByPhone,
    getProfile,
    userExists,
    adminCreateUser,
    adminUpdateUser,
    resendTempPass,
    updateUser,
    updateProfile,
    adminAddUserToGroup,
    adminConfirmSignUp,
    adminDeleteUser,
  }
}
