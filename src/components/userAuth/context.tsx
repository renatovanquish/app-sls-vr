import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'

import { UserStatus, GenderOptions, InviteStatus } from 'models'
import {
  GetUserQueryVariables,
  GetUserByEmailQueryVariables,
  GetUserByPhoneQueryVariables,
  PaymentMethods,
} from 'API'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import React, { FC, useMemo } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toast'
import { validate } from 'email-validator'
import { formatPhoneNumber } from 'react-phone-number-input'

import { useLog } from 'hooks/useLog'
import { useUser } from 'hooks/useUser'
import { usePagarme } from 'hooks/usePagarme'
import { useInvite } from 'hooks/useInvite'

import crypto from 'lib/crypto'
import removeSpecialCharacters from 'lib/removeSpecialCharacters'

export interface User {
  id: string | null
  name: string | null
  email: string | null
  phone?: string | null
  avatar?: string | null
  status?: string | null
  active?: boolean | null
  createdAt?: Date | null
  groups?: [string | null]
  isAdmin?: boolean | null
  token?: string | null
  search?: string | null
  tempAvatar?: string | null
}

export interface Profile {
  userID: string | null
  doc: string | null
  docType: string | null
  specialties: string | null
  subSpecialties: string | null
  profession: string | null
  bio: string | null
  gender: GenderOptions | null
  birth: string | null
  notes: string | null
  urlUserName: string | null
  urlEnable: boolean | null
  allowViewEmail: boolean | null
  allowViewPhone: boolean | null
  pix: string | null
  customerPagarmeID: string
  uuid: string
}

export interface State {
  isLoading: boolean
  isError: boolean
  isAuthenticating: boolean
  user: User | null
  profile: Profile | null
  confirmEmail: string | null
  confirmPhone: string | null
  login: string | null
  oldpass: string | null
  tempPass: string
}

const initialState = {
  isLoading: true,
  isError: false,
  isAuthenticating: true,
  user: null,
  profile: null,
  confirmEmail: null,
  confirmPhone: null,
  login: null,
  oldpass: null,
  tempPass: '',
}

type Action =
  | { type: 'FETCH_USER_DATA_INIT' }
  | { type: 'FETCH_USER_DATA_SUCCESS'; user: User | null }
  | { type: 'FETCH_USER_DATA_FAILURE' }
  | { type: 'RESET_USER_DATA' }
  | {
      type: 'CONFIRM_CODE'
      confirmEmail: string | null
      confirmPhone: string | null
      login: string | null
      tempPass: string
    }
  | { type: 'CHANGE_PASSWORD'; login: string | null; oldpass: string | null }
  | { type: 'USE_LOGIN'; login: string | null }
  | {
      type: 'CHANGE_LOGIN'
      confirmEmail: string | null
      confirmPhone: string | null
      login: string | null
    }
  | { type: 'FETCH_PROFILE_DATA_INIT' }
  | { type: 'FETCH_PROFILE_DATA_SUCCESS'; profile: Profile | null }
  | { type: 'FETCH_PROFILE_DATA_FAILURE' }
  | { type: 'RESET_PROFILE_DATA' }

export const UserAuthContext = React.createContext<State | any>(initialState)
UserAuthContext.displayName = 'UserAuthContext'

/**
 * userAuthReducer
 */
function userAuthReducer(state: State, action: Action) {
  switch (action.type) {
    case 'FETCH_USER_DATA_INIT': {
      return {
        ...state,
        user: null,
        isLoading: true,
        isError: false,
        isAuthenticating: true,
      }
    }

    case 'FETCH_USER_DATA_SUCCESS': {
      return {
        ...state,
        user: action.user,
        isLoading: false,
        isError: false,
        isAuthenticating: false,
      }
    }

    case 'FETCH_USER_DATA_FAILURE': {
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: true,
        isAuthenticating: false,
      }
    }

    case 'RESET_USER_DATA': {
      return { ...state, user: null, isLoading: false, isError: false }
    }

    case 'CONFIRM_CODE': {
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: false,
        confirmEmail: action.confirmEmail,
        confirmPhone: action.confirmPhone,
        login: action.login,
        tempPass: action.tempPass,
      }
    }

    case 'CHANGE_PASSWORD': {
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: false,
        login: action.login,
        oldpass: action.oldpass,
      }
    }

    case 'USE_LOGIN': {
      return {
        ...state,
        login: action.login,
      }
    }

    case 'CHANGE_LOGIN': {
      return {
        ...state,
        confirmEmail: action.confirmEmail,
        confirmPhone: action.confirmPhone,
        login: action.login,
      }
    }

    case 'FETCH_PROFILE_DATA_INIT': {
      return { ...state, profile: null, isLoading: true, isError: false }
    }

    case 'FETCH_PROFILE_DATA_SUCCESS': {
      return {
        ...state,
        profile: action.profile,
        isLoading: false,
        isError: false,
      }
    }

    case 'FETCH_PROFILE_DATA_FAILURE': {
      return { ...state, profile: null, isLoading: false, isError: true }
    }

    case 'RESET_PROFILE_DATA': {
      return { ...state, profile: null, isLoading: false, isError: false }
    }
  }
}

interface Props {
  props?: React.ReactNode
}

export const UserAuthProvider: FC<Props> = (props) => {
  const router = useRouter()
  const [state, dispatch] = React.useReducer(userAuthReducer, initialState)

  const { setLogUser } = useLog()
  const {
    userExists,
    resendTempPass,
    adminAddUserToGroup,
    adminConfirmSignUp,
  } = useUser()

  const { listInvitesByEmail, listInvitesByPhone, updateInvite } = useInvite()

  const {
    getCustomerIDPagarme,
    updateCustomerPagarme,
    createAddressPagarme,
    deleteAddressPagarme,
    createCardsPagarme,
    deleteCardPagarme,
    updateCardsPagarme,
  } = usePagarme()

  /**
   * CHECK CURRENT USER
   */
  React.useEffect(() => {
    let isMounted = true
    const fetchUserData = async () => {
      if (isMounted) {
        dispatch({ type: 'FETCH_USER_DATA_INIT' })
        dispatch({ type: 'FETCH_PROFILE_DATA_INIT' })
      }
      try {
        if (isMounted) {
          const cognitoUser = await Auth.currentAuthenticatedUser()
          if (cognitoUser) {
            const user = await checkUserAuth(cognitoUser, setLogUser)
            if (user) {
              dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user })
            } else {
              dispatch({ type: 'FETCH_USER_DATA_FAILURE' })
            }
          } else {
            dispatch({ type: 'FETCH_USER_DATA_FAILURE' })
          }
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: 'FETCH_USER_DATA_FAILURE' })
        }
      }
    }
    fetchUserData()
    return () => {
      isMounted = false
    }
  }, [])

  /**
   * Resend Temporary Password
   */
  const resendTempPassword = async (login: string) => {
    let loginFmt = login.trim().toLowerCase()
    let loginMethod

    if (validate(loginFmt)) {
      loginMethod = 'EMAIL'
    } else {
      loginMethod = 'PHONE'
      const onlyNumbers = login.replace(/\D/g, '')
      if (onlyNumbers.substr(0, 2) !== '55') {
        loginFmt = '+55' + onlyNumbers
      } else {
        loginFmt = '+' + onlyNumbers
      }
    }

    let login2: any
    let userTemp: any

    if (loginMethod === 'EMAIL') {
      try {
        login2 = await getUserByEmail({ email: loginFmt })
        if (
          login2 &&
          login2.data &&
          login2.data.getUserByEmail &&
          login2.data.getUserByEmail.items[0]
        ) {
          userTemp = login2.data.getUserByEmail.items[0]
          const variables = {
            name: userTemp.name,
            email: userTemp.email ? userTemp.email.toLowerCase() : null,
            phone: userTemp.phone ? userTemp.phone : null,
          }
          await resendTempPass(variables)
          return {
            data: {
              message: `Senha temporária reenviada para o email ${loginFmt}. Volte para o login, informe o email no usuário e a senha recebida.`,
            },
            login,
          }
        } else {
          return { data: { message: 'Usuário não localizado.' } }
        }
      } catch (error3) {
        console.log(error3)
        return { data: { message: 'Usuário não localizado.' } }
      }
    } else {
      try {
        login2 = await getUserByPhone({ phone: loginFmt })
        if (
          login2 &&
          login2.data &&
          login2.data.getUserByPhone &&
          login2.data.getUserByPhone.items[0]
        ) {
          userTemp = login2.data.getUserByPhone.items[0]
          const variables = {
            name: userTemp.name,
            email: userTemp.email ? userTemp.email.toLowerCase() : null,
            phone: userTemp.phone ? userTemp.phone : null,
          }
          await resendTempPass(variables)
          return {
            data: {
              message: `Senha temporária reenviada por SMS para o telefone ${formatPhoneNumber(
                loginFmt as any
              )}. Volte para o login, informe o número do telefone no usuário e a senha recebida no SMS.`,
            },
            login,
          }
        } else {
          return { data: { message: 'Usuário não localizado.' } }
        }
      } catch (error5) {
        return { data: { message: 'Usuário não localizado.' } }
      }
    }
  }

  /**
   * SignUp
   */
  const signUp = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    try {
      const UserExists = { email, phone }
      const { hasEmail, hasPhone } = await userExists(UserExists)

      if (hasEmail && hasPhone) {
        return {
          message:
            'Já existe uma conta com este email e telefone. Clique abaixo no link (Ir para o Login) e tente fazer o login ou recuperar sua senha.',
        }
      } else if (hasEmail) {
        return {
          message: `Já existe uma conta com este email. Clique abaixo no link (Ir para o Login) e tente fazer o login ou recuperar a senha informando o email ${email}.`,
        }
      } else if (hasPhone) {
        return {
          message: `Já existe uma conta com este telefone. Clique abaixo no link (Ir para o Login) e tente fazer o login ou recuperar a senha informando o número ${phone.substr(
            3,
            15
          )}.`,
        }
      } else {
        const resSignUp = await Auth.signUp({
          username: process.env.DEFAULT_LOGIN === 'PHONE' ? phone : email,
          password: password,
          attributes: { name, email, phone_number: phone },
        })

        const user: User = {
          id: resSignUp.userSub,
          name,
          email,
          phone,
          status: UserStatus.PREREGISTER,
          search: name.toLowerCase(),
          active: false,
        }

        await API.graphql({
          query: mutations.createUser,
          variables: { input: user },
          authMode: GRAPHQL_AUTH_MODE.API_KEY,
        })

        await API.graphql({
          query: mutations.createProfile,
          variables: {
            input: {
              userID: resSignUp.userSub,
              gender: GenderOptions.UNKNOWN,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.API_KEY,
        })

        if (!process.env.NO_SIGNUP_CONFIRMATION) {
          dispatch({
            type: 'CONFIRM_CODE',
            confirmPhone: phone,
            confirmEmail: email,
            login: process.env.DEFAULT_LOGIN === 'PHONE' ? phone : email,
            tempPass: password,
          })
        }

        // invite
        const inviteEmailExist = await listInvitesByEmail({ email })
        if (inviteEmailExist.items.length > 0) {
          const invite = inviteEmailExist.items[0]
          if (invite.groups.length > 0) {
            const params = {
              username: resSignUp.userSub,
              groups: JSON.stringify(invite.groups),
            }
            await adminAddUserToGroup(params)
          }

          await updateInvite({
            id: invite.id,
            status: InviteStatus.ACCEPTED,
          })
        }

        /*
        const invitePhoneExist = await listInvitesByPhone({ phone })
        if (invitePhoneExist.items.length > 0) {
          const invite = invitePhoneExist.items[0]

          if (invite.groups.length > 0) {
            const params = {
              username: resSignUp.userSub,
              groups: JSON.stringify(invite.groups),
            }
            await adminAddUserToGroup(params)
          }

          await updateInvite({
            id: invite.id,
            status: InviteStatus.ACCEPTED,
          })
        }
        */

        if (process.env.NO_SIGNUP_CONFIRMATION) {
          await adminConfirmSignUp({ id: resSignUp.userSub })
          const cognitoUser = await Auth.signIn(
            process.env.DEFAULT_LOGIN === 'PHONE' ? phone : email,
            password
          )
          const userAuth = await checkUserAuth(cognitoUser, setLogUser)
          if (userAuth) {
            dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user: userAuth })
          }
          return { message: '' }
        }

        return null
      }
    } catch (error: any) {
      console.log(error)
      let message = 'Verifique os dados informados e tente novamente.' 
      const m = error && error.errors && error.errors[0] && error.errors[0].message ? error.errors[0].message : ''
      if (m.toLowerCase().indexOf('password') > -1) {
        message = 'A senha deve ter pelo menos 6 caracteres.'
      } else if (m.toLowerCase().indexOf('phone') > -1) {
        message = 'Verifique o número do telefone informado.'
      }
      return { message }
    }
  }

  /**
   * SignIn
   */
   const signIn = async (login: string, password: string) => {
    try {
      let loginFmt = login.trim().toLowerCase()

      if (!validate(login)) {
        const onlyNumbers = login.replace(/\D/g, '')
        if (onlyNumbers.substr(0, 2) !== '55') {
          loginFmt = '+55' + onlyNumbers
        } else {
          loginFmt = '+' + onlyNumbers
        }
      }

      const confirmEmail = validate(login) ? loginFmt : null
      const confirmPhone = validate(login) ? null : loginFmt
      dispatch({ type: 'CHANGE_LOGIN', confirmEmail, confirmPhone, login })

      const cognitoUser = await Auth.signIn(loginFmt, password)

      if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
        dispatch({ type: 'CHANGE_PASSWORD', login, oldpass: password })
        return { newPasswordRequired: true }
      } else {
        const user = await checkUserAuth(cognitoUser, setLogUser)
        if (user) {
          dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user })
          setLogUser({
            userID: user.id,
            tag: 'LOGIN',
            notes: `Conectou pelo login: ${login}.`,
          })
        } else {
          dispatch({ type: 'FETCH_USER_DATA_FAILURE' })
        }
        return user
      }
    } catch (error2: any) {
      let loginFmt = login.trim().toLowerCase()
      let loginMethod

      if (validate(login)) {
        loginMethod = 'EMAIL'
      } else {
        loginMethod = 'PHONE'
        const onlyNumbers = login.replace(/\D/g, '')
        if (onlyNumbers.substr(0, 2) !== '55') {
          loginFmt = '+55' + onlyNumbers
        } else {
          loginFmt = '+' + onlyNumbers
        }
      }

      if (error2.code === 'UserNotFoundException') {
        let login2: any
        if (loginMethod === 'EMAIL') {
          try {
            login2 = await getUserByEmail({ email: loginFmt })
            console.log(login2)
            if (
              login2 &&
              login2.data &&
              login2.data.getUserByEmail &&
              login2.data.getUserByEmail.items[0]
            ) {
              // signIn(login2?.data?.getUserByEmail?.items[0].phone, password)
              const cognitoUser = await Auth.signIn(
                login2?.data?.getUserByEmail?.items[0].phone,
                password
              )

              console.log(cognitoUser)

              if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
                dispatch({
                  type: 'CHANGE_PASSWORD',
                  login: login2?.data?.getUserByEmail?.items[0].phone,
                  oldpass: password,
                })
                return { newPasswordRequired: true }
              } else {
                const user = await checkUserAuth(cognitoUser, setLogUser)
                if (user) {
                  dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user })
                  setLogUser({
                    userID: user.id,
                    tag: 'LOGIN',
                    notes: `Conectou pelo login: ${login2?.data?.getUserByEmail?.items[0].phone}.`,
                  })
                } else {
                  dispatch({ type: 'FETCH_USER_DATA_FAILURE' })
                }
                return user
              }
            } else {
              return { message: 'Usuário não localizado.' }
            }
          } catch (error3) {
            console.log('not found', error3)
            return error3 //{ message: 'Usuário não localizado.' }
          }
        } else {
          try {
            login2 = await getUserByPhone({ phone: loginFmt })
            if (
              login2 &&
              login2.data &&
              login2.data.getUserByPhone &&
              login2.data.getUserByPhone.items[0]
            ) {
              // signIn(login2?.data?.getUserByPhone?.items[0].email, password)
              dispatch({
                type: 'CONFIRM_CODE',
                confirmPhone: loginFmt,
                confirmEmail: login2?.data?.getUserByPhone?.items[0].email,
                login: login2?.data?.getUserByPhone?.items[0].email,
                tempPass: password,
              })
              const cognitoUser = await Auth.signIn(
                login2?.data?.getUserByPhone?.items[0].email,
                password
              )

              if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
                dispatch({
                  type: 'CHANGE_PASSWORD',
                  login: login2?.data?.getUserByPhone?.items[0].email,
                  oldpass: password,
                })
                return { newPasswordRequired: true }
              } else {
                const user = await checkUserAuth(cognitoUser, setLogUser)
                if (user) {
                  dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user })
                  setLogUser({
                    userID: user.id,
                    tag: 'LOGIN',
                    notes: `Conectou pelo login: ${login2?.data?.getUserByPhone?.items[0].email}.`,
                  })
                } else {
                  dispatch({ type: 'FETCH_USER_DATA_FAILURE' })
                }
                return user
              }
            } else {
              return { message: 'Usuário não localizado.' }
            }
          } catch (error4) {
            return error4 // { message: 'Usuário não localizado.' }
          }
        }
        return { message: 'tryLogin' }
      }

      if (error2.code === 'NotAuthorizedException') {
        dispatch({
          type: 'USE_LOGIN',
          login: login.trim().toLowerCase(),
        })
        return error2
      }

      dispatch({
        type: 'CONFIRM_CODE',
        login: login.trim().toLowerCase(),
        confirmEmail: process.env.DEFAULT_LOGIN === 'EMAIL' ? loginFmt : '',
        confirmPhone: process.env.DEFAULT_LOGIN === 'PHONE' ? loginFmt : '',
        tempPass: password,
      })

      return error2
    }
  }

  /**
   * ConfirmSignUp
   */
  const confirmSignUp = async (login: string, code: string) => {
    try {
      const r = await Auth.confirmSignUp(login, code)
      if (r === 'SUCCESS') {
        const cognitoUser = await Auth.signIn(login, state.tempPass)
        if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
          dispatch({ type: 'CHANGE_PASSWORD', login, oldpass: state.tempPass })
          return { newPasswordRequired: true }
        } else {
          const user = await checkUserAuth(cognitoUser, setLogUser)
          dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user })
        }
      }
      return r
    } catch (error) {
      return error
    }
  }

  /**
   * ResendSignUp
   */
   const resendSignUp = async (login: string) => {
    return Auth.resendSignUp(login)
      .then((data) => {
        console.log(data)
        return data
      })
      .catch(async (error) => {
        let loginFmt = login.trim().toLowerCase()
        let loginMethod

        if (validate(login)) {
          loginMethod = 'EMAIL'
        } else {
          loginMethod = 'PHONE'
          const onlyNumbers = login.replace(/\D/g, '')
          if (onlyNumbers.substr(0, 2) !== '55') {
            loginFmt = '+55' + onlyNumbers
          } else {
            loginFmt = '+' + onlyNumbers
          }
        }

        let login2: any
        if (loginMethod === 'EMAIL') {
          try {
            login2 = await getUserByEmail({ email: loginFmt })
            if (
              login2 &&
              login2.data &&
              login2.data.getUserByEmail &&
              login2.data.getUserByEmail.items[0]
            ) {
              return Auth.resendSignUp(
                login2.data.getUserByEmail.items[0].phone
              )
                .then((data) => {
                  console.log(data)
                  return data
                })
                .catch(async (error) => {
                  console.log(error)
                })
            } else {
              return { message: 'Usuário não localizado.' }
            }
          } catch (error3) {
            console.log('not found', error3)
            return error3 //{ message: 'Usuário não localizado.' }
          }
        } else {
          try {
            login2 = await getUserByPhone({ phone: loginFmt })
            if (
              login2 &&
              login2.data &&
              login2.data.getUserByPhone &&
              login2.data.getUserByPhone.items[0]
            ) {
              return Auth.resendSignUp(
                login2.data.getUserByPhone.items[0].email
              )
                .then((data) => {
                  console.log(data)
                  return data
                })
                .catch(async (error) => {
                  console.log(error)
                })
            } else {
              return { message: 'Usuário não localizado.' }
            }
          } catch (error4) {
            return error4 // { message: 'Usuário não localizado.' }
          }
        }
      })
  }

  /**
   * ForgotPassword
   */
  const forgotPassword = async (login: string) => {
    let loginFmt = login.trim().toLowerCase()
    if (!validate(loginFmt)) {
      const onlyNumbers = login.replace(/\D/g, '')
      if (onlyNumbers.substr(0, 2) !== '55') {
        loginFmt = '+55' + onlyNumbers
      } else {
        loginFmt = '+' + onlyNumbers
      }
    }
    return Auth.forgotPassword(loginFmt)
      .then((data) => {
        dispatch({
          type: 'USE_LOGIN',
          login: login.trim().toLowerCase(),
        })
        return {
          data,
          login: loginFmt,
        }
      })
      .catch(async (error) => {
        let loginFmt = login.trim().toLowerCase()
        let loginMethod

        if (validate(login)) {
          loginMethod = 'EMAIL'
        } else {
          loginMethod = 'PHONE'
          const onlyNumbers = login.replace(/\D/g, '')
          if (onlyNumbers.substr(0, 2) !== '55') {
            loginFmt = '+55' + onlyNumbers
          } else {
            loginFmt = '+' + onlyNumbers
          }
        }

        if (error.code === 'UserNotFoundException') {
          let login2: any
          if (loginMethod === 'EMAIL') {
            try {
              login2 = await getUserByEmail({ email: loginFmt })
              if (
                login2 &&
                login2.data &&
                login2.data.getUserByEmail &&
                login2.data.getUserByEmail.items[0]
              ) {
                return Auth.forgotPassword(
                  login2.data.getUserByEmail.items[0].phone
                )
                  .then((data2) => {
                    return {
                      data: data2,
                      login: login2.data.getUserByEmail.items[0].phone,
                    }
                  })
                  .catch(async (error2) => {
                    if (error2.code === 'NotAuthorizedException') {
                      return await resendTempPassword(
                        login2.data.getUserByEmail.items[0].phone
                      )
                    } else {
                      await resendTempPassword(
                        login2.data.getUserByEmail.items[0].phone
                      )
                      return {
                        data: error2,
                        login: login2.data.getUserByEmail.items[0].phone,
                      }
                    }
                  })
              } else {
                return { data: { message: 'Usuário não localizado.' } }
              }
            } catch (error3) {
              return { data: { message: 'Usuário não localizado.' } }
            }
          } else {
            try {
              login2 = await getUserByPhone({ phone: loginFmt })
              if (
                login2 &&
                login2.data &&
                login2.data.getUserByPhone &&
                login2.data.getUserByPhone.items[0]
              ) {
                // signIn(, password)
                return Auth.forgotPassword(
                  login2?.data?.getUserByPhone?.items[0].email
                )
                  .then((data3) => {
                    return {
                      data: data3,
                      login: login2?.data?.getUserByPhone?.items[0].email,
                    }
                  })
                  .catch(async (error4) => {
                    if (error4.code === 'NotAuthorizedException') {
                      return await resendTempPassword(
                        login2?.data?.getUserByPhone?.items[0].email
                      )
                    } else {
                      await resendTempPassword(
                        login2?.data?.getUserByPhone?.items[0].email
                      )
                      return {
                        data: error4,
                        login: login2?.data?.getUserByPhone?.items[0].email,
                      }
                    }
                  })
              } else {
                return { data: { message: 'Usuário não localizado.' } }
              }
            } catch (error5) {
              return { data: { message: 'Usuário não localizado.' } }
            }
          }
        } else if (error.code === 'NotAuthorizedException') {
          dispatch({
            type: 'USE_LOGIN',
            login: login.trim().toLowerCase(),
          })
          return await resendTempPassword(login)
        } else {
          dispatch({
            type: 'USE_LOGIN',
            login: login.trim().toLowerCase(),
          })
          await resendTempPassword(login)
          return {
            data: error,
            login,
          }
        }
      })
  }

  /**
   * ForgotPasswordSubmit
   */
  const forgotPasswordSubmit = async (
    email: string,
    code: string,
    newpassword: string
  ) => {
    return Auth.forgotPasswordSubmit(email, code, newpassword)
      .then((r: any) => {
        return Auth.signIn(email, newpassword)
          .then(async (cognitoUser: any) => {
            const user = await checkUserAuth(cognitoUser, setLogUser)
            dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user })
            setLogUser({
              userID: user.id,
              tag: 'RECUPERAÇÃO DE SENHA',
              notes: `Recuperou a senha por email: ${user.email}.`,
            })
          })
          .catch((error: any) => {
            return error
          })
      })
      .catch((error: any) => {
        return error
      })
  }

  /**
   * ChangePassword
   */
  const changePassword = async (oldPassword: string, newPassword: string) => {
    return Auth.currentAuthenticatedUser()
      .then(async (cognitoUser) => {
        const r = await Auth.changePassword(
          cognitoUser,
          oldPassword,
          newPassword
        )
        setLogUser({
          userID: cognitoUser.username,
          tag: 'ALTERAÇÃO DE SENHA',
          notes: `Alterou a senha de acesso.`,
        })
        return r
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }

  /**
   * ChangePasswordRequired
   */
  const changePasswordRequired = async (
    email: string,
    phone: string,
    newPassword: string
  ) => {
    const username = state.login as string
    const password = state.oldpass as string
    let loginFmt = username.trim().toLowerCase()
    if (!validate(username)) {
      const onlyNumbers = username.replace(/\D/g, '')
      if (onlyNumbers.substr(0, 2) !== '55') {
        loginFmt = '+55' + onlyNumbers
      } else {
        loginFmt = '+' + onlyNumbers
      }
    }

    const CognitoUser = await Auth.signIn(loginFmt, password)

    if (CognitoUser && CognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
      const { requiredAttributes } = CognitoUser.challengeParam

      await Auth.completeNewPassword(
        CognitoUser,
        newPassword,
        requiredAttributes
      )

      await API.graphql({
        query: mutations.updateUser,
        variables: {
          input: {
            id: CognitoUser.username,
            email: email
              ? email.trim().toLowerCase()
              : CognitoUser &&
                CognitoUser.attributes &&
                CognitoUser.attributes.email
              ? CognitoUser.attributes.email
              : CognitoUser &&
                CognitoUser.challengeParam &&
                CognitoUser.challengeParam.userAttributes &&
                CognitoUser.challengeParam.userAttributes.email
              ? CognitoUser.challengeParam.userAttributes.email
              : null,
            phone: phone
              ? phone
              : CognitoUser &&
                CognitoUser.attributes &&
                CognitoUser.attributes.phone_number
              ? CognitoUser.attributes.phone_number
              : CognitoUser &&
                CognitoUser.challengeParam &&
                CognitoUser.challengeParam.userAttributes &&
                CognitoUser.challengeParam.userAttributes.phone_number
              ? CognitoUser.challengeParam.userAttributes.phone_number
              : null,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })

      const user = await checkUserAuth(CognitoUser, setLogUser)

      if (user) {
        dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user })
      } else {
        dispatch({ type: 'FETCH_USER_DATA_FAILURE' })
      }
    } else {
      return null
    }
  }

  /**
   * SignOut
   */
  const signOut = async (userID: string) => {
    try {
      setLogUser({
        userID,
        tag: 'LOGOUT',
        notes: 'Desconectou do App.',
      })
      await Auth.signOut()
      dispatch({ type: 'RESET_USER_DATA' })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * GET - USER
   * ******************************************************
   */
  const getUser = async (variables: GetUserQueryVariables) => {
    const {
      data: { getUser },
    } = (await API.graphql(
      graphqlOperation(customQueries.getUserCustom, variables)
    )) as GraphQLResult<any>
    return getUser
  }

  /**
   * GET - USER BY EMAIL
   * ******************************************************
   */
  const getUserByEmail = async (variables: GetUserByEmailQueryVariables) => {
    const result = await API.graphql({
      query: queries.getUserByEmail,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })
    return result
  }

  /**
   * GET - USER BY PHONE
   * ******************************************************
   */
  const getUserByPhone = async (variables: GetUserByPhoneQueryVariables) => {
    const result = await API.graphql({
      query: queries.getUserByPhone,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })
    return result
  }

  /**
   * getProfile
   */
  const getProfile = async (userID: string) => {
    try {
      const variables = { userID }
      const getProfileResult: any = (await API.graphql({
        query: queries.getProfile,
        variables,
      })) as unknown
      if (
        getProfileResult &&
        getProfileResult.data &&
        getProfileResult.data.getProfile
      ) {
        const profile = getProfileResult.data.getProfile
        dispatch({ type: 'FETCH_PROFILE_DATA_SUCCESS', profile })
        return profile
      } else {
        const input: Profile = {
          userID,
          doc: null,
          docType: null,
          specialties: null,
          subSpecialties: null,
          profession: null,
          bio: null,
          gender: GenderOptions.UNKNOWN,
          birth: null,
          notes: null,
          urlUserName: null,
          urlEnable: null,
          allowViewEmail: true,
          allowViewPhone: true,
          pix: null,
          customerPagarmeID: '',
          uuid: ''
        }

        await API.graphql({
          query: mutations.createProfile,
          variables: { input },
        })

        dispatch({ type: 'FETCH_PROFILE_DATA_SUCCESS', profile: input })
        return input
      }
    } catch (error) {
      dispatch({ type: 'FETCH_USER_DATA_FAILURE' })
      console.log(error)
    }
  }

  /**
   * User Data Update
   */
  const updateUser = async (data: any) => {
    const user: any = state.user

    let userChange = false
    let userInput: any = {}

    if (data.name && data.name !== user.name) {
      user.name = data.name
      userInput.name = data.name
      userInput.search = data.name.toLowerCase()
      userChange = true
    }
    if (data.email && data.email.toLowerCase() !== user.email) {
      user.email = data.email.toLowerCase()
      userInput.email = data.email.toLowerCase()
      userChange = true
    }
    if (data.phone && data.phone !== user.phone) {
      user.phone = data.phone
      userInput.phone = data.phone
      userChange = true
    }
    if (data.avatar && data.avatar !== user.avatar) {
      user.avatar = data.avatar
      userInput.avatar = data.avatar
      userChange = true
    }
    if (data.tempAvatar && data.tempAvatar !== user.tempAvatar) {
      user.tempAvatar = data.tempAvatar
    }

    if (userChange) {
      try {
        userInput.id = user.id
        await API.graphql({
          query: mutations.updateUser,
          variables: { input: userInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })

        setLogUser({
          userID: user.id,
          tag: 'ALTERAÇÃO DA CONTA',
          notes: 'Alterou dados de acesso.',
          message: JSON.stringify(userInput),
        })
      } catch (r: any) {
        console.log(r)
        const message =
          r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
        if (message) {
          toast.info(message)
        }
      }
    }

    let profileChange = false
    let profileInput: any = {}

    let profile: any = state.profile

    if (!profile) {
      profile = await getProfile(user.id)
    }

    if (data.birth && data.birth !== profile.birth) {
      profile.birth = data.birth
      profileInput.birth = data.birth
      profileInput.birthDay = data.birth.substr(5, 5)
      profileChange = true
    }
    if (data.gender && data.gender !== profile.gender) {
      profile.gender = data.gender
      profileInput.gender = data.gender
      profileChange = true
    }
    if (data.doc && data.doc !== profile.doc) {
      profile.doc = data.doc
      profileInput.doc = data.doc
      user.profile.doc = data.doc
      profileChange = true
    }
    if (data.docType && data.docType !== profile.docType) {
      profile.docType = data.docType
      profileInput.docType = data.docType
      user.profile.docType = data.docType
      profileChange = true
    }

    if (profileChange) {
      try {
        profileInput.userID = user.id
        await API.graphql(
          graphqlOperation(mutations.updateProfile, { input: profileInput })
        )
        setLogUser({
          userID: user.id,
          tag: 'ALTERAÇÃO DO PERFIL',
          notes: 'Alterou dados do perfil.',
          message: JSON.stringify(profileInput),
        })
      } catch (r: any) {
        console.log(r)
        const message =
          r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
        if (message) {
          toast.info(message)
        }
      }
    }

    dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user })
    dispatch({ type: 'FETCH_PROFILE_DATA_SUCCESS', profile })

    if (userChange) {
      Auth.currentAuthenticatedUser()
        .then((cognitoUser) => {
          const attributes: any = {
            name: user.name,
            email: user.email,
          }
          if (data.hasOwnProperty('phone')) {
            attributes.phone_number = user.phone
          }
          return Auth.updateUserAttributes(cognitoUser, attributes)
        })
        .then((data) => {})
        .catch((err) => console.log(err))
    }

    if (process.env.PAGARME_API) {
      if (user.profile && user.profile.customerPagarmeID) {
        const customerPagarmeID = user.profile.customerPagarmeID

        const phone = user.phone.replace(/\D/g, '')
        const country_code = phone.substring(0, 2)
        const number = phone.substring(4, 13)
        const area_code = phone.substring(2, 4)

        const body = {
          name: user.name,
          email: user.email,
          code: user.id,
          document: data.doc ? data.doc : user.doc ? user.doc : null,
          type: 'individual',
          document_type: data.docType
            ? data.docType
            : user.docType
            ? user.docType
            : null,
          phones: {
            mobile_phone: {
              country_code,
              number,
              area_code,
            },
          },
        }
        const r = await updateCustomerPagarme(customerPagarmeID, body)
        if (r && r.data && r.data.id) {
          const customerIDPagarme = r.data.id
          profile.customerPagarmeID = customerIDPagarme
          dispatch({ type: 'FETCH_PROFILE_DATA_SUCCESS', profile })

          user.profile.customerPagarmeID = customerIDPagarme
          dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user })
        }
      } else {
        const body = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          id: user.id,
          profile: {
            doc: data.doc ? data.doc : user.doc ? user.doc : null,
            docType: data.docType
              ? data.docType
              : user.docType
              ? user.docType
              : null,
          },
        }
        const customerIDPagarme = await getCustomerIDPagarme(body)
        if (customerIDPagarme) {
          profile.customerPagarmeID = customerIDPagarme
          dispatch({ type: 'FETCH_PROFILE_DATA_SUCCESS', profile })

          user.profile.customerPagarmeID = customerIDPagarme
          dispatch({ type: 'FETCH_USER_DATA_SUCCESS', user })
        }
      }
    }
  }

  /**
   * Profile Data Update
   */
  const updateProfile = async (data: any) => {
    const profile: any = state.profile
    const input: any = { userID: profile.userID }

    Object.keys(profile).forEach((p: any) => {
      if (p !== 'userID') {
        if (data.hasOwnProperty(p)) {
          profile[p] = data[p]
          input[p] = data[p]
        }
      }
    })

    dispatch({ type: 'FETCH_PROFILE_DATA_SUCCESS', profile })

    try {
      await API.graphql(graphqlOperation(mutations.updateProfile, { input }))
      setLogUser({
        userID: profile.userID,
        tag: 'ALTERAÇÃO DO PERFIL',
        notes: 'Alterou dados do perfil.',
        message: JSON.stringify(input),
      })
    } catch (r: any) {
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.info(message)
      }
    }
  }

  /**
   * List Addresses
   */
  const listAddresses = async (userID: string) => {
    try {
      const {
        data: {
          listAddressesByUser: { items },
        },
      } = (await API.graphql(
        graphqlOperation(queries.listAddressesByUser, { userID })
      )) as GraphQLResult<any>
      return items
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Adress Update
   */
  const updateUserAddresses = async (input: any) => {
    try {
      const user = state.user as any
      let customerPagarmeID =
        user.profile && user.profile.customerPagarmeID
          ? user.profile.customerPagarmeID
          : ''
      if (process.env.PAGARME_API) {
        if (!customerPagarmeID) {
          customerPagarmeID = await getCustomerIDPagarme(user)
        }
      }
      if (input && input.id) {
        if (input.addressPagarmeID) {
          await deleteAddressPagarme(customerPagarmeID, input.addressPagarmeID)
          const addressPagarme = await createAddressPagarme(customerPagarmeID, {
            line_1: `${input.street} ${input.number}`,
            line_2: input.complement,
            zip_code: input.zipcode,
            city: input.city,
            state: input.state,
            country: 'BR', // input.country
          })
          input.addressPagarmeID =
            addressPagarme && addressPagarme.data && addressPagarme.data.id
              ? addressPagarme.data.id
              : null
        } else {
          const addressPagarme = await createAddressPagarme(customerPagarmeID, {
            line_1: `${input.street} ${input.number}`,
            line_2: input.complement,
            zip_code: input.zipcode,
            city: input.city,
            state: input.state,
            country: 'BR', // input.country
          })
          input.addressPagarmeID =
            addressPagarme && addressPagarme.data && addressPagarme.data.id
              ? addressPagarme.data.id
              : null
        }

        const r: any = await API.graphql(
          graphqlOperation(mutations.updateAddress, { input })
        )

        if (r && r.data && r.data.updateAddress) {
          const updateAddress = r.data.updateAddress
          const user: any = state.user
          setLogUser({
            userID: user.id,
            tag: 'ATUALIZAÇÃO DADOS PESSOAIS',
            notes: 'Alterou um endereço.',
            message: JSON.stringify(input),
          })
          toast('Endereço atualizado com sucesso.', {
            backgroundColor: '#263238',
            color: '#fff',
          })

          return updateAddress
        }
        return null
      } else {
        delete input.id
        const addressPagarme = await createAddressPagarme(customerPagarmeID, {
          line_1: `${input.street} ${input.number}`,
          line_2: input.complement,
          zip_code: input.zipcode,
          city: input.city,
          state: input.state,
          country: 'BR', // input.country
        })
        input.addressPagarmeID =
          addressPagarme && addressPagarme.data && addressPagarme.data.id
            ? addressPagarme.data.id
            : null
        const r: any = await API.graphql(
          graphqlOperation(mutations.createAddress, { input })
        )
        if (r && r.data && r.data.createAddress) {
          const createAddress = r.data.createAddress
          const user: any = state.user
          setLogUser({
            userID: user.id,
            tag: 'ATUALIZAÇÃO DADOS PESSOAIS',
            notes: 'Adicionou um endereço.',
            message: JSON.stringify(input),
          })
          toast('Endereço adicionado com sucesso.', {
            backgroundColor: '#263238',
            color: '#fff',
          })
          return createAddress
        }
        return null
      }
    } catch (error: any) {
      console.log(error)
      const message =
        error && error.errors[0] && error.errors[0].message
          ? error.errors[0].message
          : null
      if (message) {
        toast.error(message)
      }
      return null
    }
  }

  /**
   * Adress Delete
   */
  const deleteUserAddresses = async (input: any) => {
    try {
      const user = state.user as any
      let customerPagarmeID =
        user.profile && user.profile.customerPagarmeID
          ? user.profile.customerPagarmeID
          : ''
      if (process.env.PAGARME_API) {
        if (!customerPagarmeID) {
          customerPagarmeID = await getCustomerIDPagarme(user)
        }
      }
      const r: any = await API.graphql(
        graphqlOperation(mutations.deleteAddress, { input: { id: input.id } })
      )
      if (r && r.data && r.data.deleteAddress) {
        const deleteAddress = r.data.deleteAddress
        const user: any = state.user
        setLogUser({
          userID: user.id,
          tag: 'ATUALIZAÇÃO DADOS PESSOAIS',
          notes: 'Removeu um endereço.',
          message: JSON.stringify(input),
        })
        toast('Endereço excluído com sucesso.', {
          backgroundColor: '#263238',
          color: '#fff',
        })
      }
      await deleteAddressPagarme(customerPagarmeID, input.addressPagarmeID)
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  /**
   * List PayMethods
   */
  const listPayMethods = async (userID: string) => {
    try {
      const {
        data: {
          listPayMethodsByUser: { items },
        },
      } = (await API.graphql(
        graphqlOperation(queries.listPayMethodsByUser, { userID })
      )) as GraphQLResult<any>
      return items
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * PayMethod Update
   */
  const updatePayMethod = async (input: any) => {
    try {
      if (!input.method) {
        input.method = PaymentMethods.CREDIT
      }

      const user = state.user as any
      let customerPagarmeID =
        user.profile && user.profile.customerPagarmeID
          ? user.profile.customerPagarmeID
          : ''

      if (process.env.PAGARME_API) {
        if (!customerPagarmeID) {
          customerPagarmeID = await getCustomerIDPagarme(user)
          console.log(customerPagarmeID)
        }
      }

      if (input.method === PaymentMethods.PIX) {
        const items = await listPayMethods(user.id)
        if (items && items.length > 0) {
          const payMethod = items.find(
            (item: any) => item.method === PaymentMethods.PIX
          )
          if (payMethod) {
            payMethod.exists = true
            return payMethod
          }
        }
      }

      if (input.method === PaymentMethods.ONDELIVERY) {
        const items = await listPayMethods(user.id)
        if (items && items.length > 0) {
          const payMethod = items.find(
            (item: any) => item.method === PaymentMethods.ONDELIVERY
          )
          if (payMethod) {
            payMethod.exists = true
            return payMethod
          }
        }
      }

      let billing_address_exists = false
      let billing_address = {} as any
      const addresses = await listAddresses(user.id)
      if (addresses.length > 0) {
        billing_address_exists = true
        const addressSel = addresses[0]
        billing_address = {
          line_1: `${addressSel.street} ${addressSel.number} ${addressSel.complement}`,
          zip_code: addressSel.zipcode,
          city: addressSel.city,
          state: addressSel.state,
          country: 'BR',
        }
      }

      input.label =
        input.method === PaymentMethods.PIX
          ? 'PIX'
          : input.method === PaymentMethods.ONDELIVERY
          ? 'Pagamento na entrega'
          : `**** **** **** ${input.number.substr(-4)}`

      input.holderName =
        input.method === PaymentMethods.PIX ||
        input.method === PaymentMethods.ONDELIVERY
          ? ''
          : removeSpecialCharacters(input.holderName).toUpperCase()

      if (input && input.id) {
        if (
          process.env.PAGARME_API &&
          input.cardPagarmeID &&
          billing_address_exists
        ) {
          let body = {
            number: `${input.number}`,
            holder_name: input.holderName,
            exp_month: parseInt(input.expMonth),
            exp_year: parseInt(input.expYear),
            cvv: input.cvv,
            billing_address,
          } as any
          if (input.holderDocument) {
            body.holder_document = input.holderDocument
          }
          const cardPagarme = await updateCardsPagarme(
            customerPagarmeID,
            input.cardPagarmeID,
            body
          )
          if (
            cardPagarme.data &&
            cardPagarme.data.message &&
            cardPagarme.data.message == 'The request is invalid.'
          ) {
            toast.error(
              'Cartão recusado! Verifique os dados e tente novamente.'
            )
          } else {
            input.cardPagarmeID =
              cardPagarme && cardPagarme.data && cardPagarme.data.id
                ? cardPagarme.data.id
                : null
            input.brand =
              cardPagarme && cardPagarme.data && cardPagarme.data.brand
                ? cardPagarme.data.brand
                : ''
          }
        }
        const numberHash = crypto.encrypt({
          number: `${input.number}`,
        }) as string
        input.number = numberHash
        const r: any = await API.graphql(
          graphqlOperation(mutations.updatePayMethod, { input })
        )
        if (r && r.data && r.data.updatePayMethod) {
          const upm = r.data.updatePayMethod
          const user: any = state.user
          setLogUser({
            userID: user.id,
            tag: 'ATUALIZAÇÃO DADOS PESSOAIS',
            notes: 'Atualizou uma forma de pagamento.',
            message: input.label,
          })
          toast('Método de pagamento atualizado com sucesso.', {
            backgroundColor: '#263238',
            color: '#fff',
          })
          return upm
        }
        return null
      } else {
        delete input.id
        if (
          input.method === PaymentMethods.PIX ||
          input.method === PaymentMethods.ONDELIVERY
        ) {
          input.expMonth = 0
          input.expYear = 0
        } else {
          if (process.env.PAGARME_API && billing_address_exists) {
            let body = {
              number: `${input.number}`,
              holder_name: input.holderName,
              exp_month: parseInt(input.expMonth),
              exp_year: parseInt(input.expYear),
              cvv: input.cvv,
              billing_address,
            } as any
            if (input.holderDocument) {
              body.holder_document = input.holderDocument
            }
            const cardPagarme = await createCardsPagarme(
              customerPagarmeID,
              body
            )
            if (
              cardPagarme.data &&
              cardPagarme.data.message &&
              cardPagarme.data.message == 'The request is invalid.'
            ) {
              toast.error(
                'Cartão recusado! Verifique os dados e tente novamente.'
              )
            } else {
              input.cardPagarmeID =
                cardPagarme && cardPagarme.data && cardPagarme.data.id
                  ? cardPagarme.data.id
                  : null
              input.brand =
                cardPagarme && cardPagarme.data && cardPagarme.data.brand
                  ? cardPagarme.data.brand
                  : ''
            }
          }
          const numberHash = crypto.encrypt({
            number: `${input.number}`,
          }) as string
          input.number = numberHash
        }
        const r: any = await API.graphql(
          graphqlOperation(mutations.createPayMethod, { input })
        )

        if (r && r.data && r.data.createPayMethod) {
          const cpm = r.data.createPayMethod
          const user: any = state.user
          setLogUser({
            userID: user.id,
            tag: 'ATUALIZAÇÃO DADOS PESSOAIS',
            notes: 'Adicionou uma forma de pagamento.',
            message: input.label,
          })
          toast('Forma de pagamento adicionada com sucesso.', {
            backgroundColor: '#263238',
            color: '#fff',
          })
          return cpm
        }
      }
    } catch (error: any) {
      console.log(error)
      return null
    }
  }

  /**
   * PayMethods Delete
   */
  const deletePayMethod = async (e: any) => {
    try {
      const user = state.user as any
      let customerPagarmeID =
        user.profile && user.profile.customerPagarmeID
          ? user.profile.customerPagarmeID
          : ''
      if (process.env.PAGARME_API) {
        if (!customerPagarmeID) {
          customerPagarmeID = await getCustomerIDPagarme(user)
        }
      }
      const r: any = await API.graphql(
        graphqlOperation(mutations.deletePayMethod, { input: { id: e.id } })
      )
      if (r && r.data && r.data.deletePayMethod) {
        const dpm = r.data.deletePayMethod
        const user: any = state.user
        setLogUser({
          userID: user.id,
          tag: 'ATUALIZAÇÃO DADOS PESSOAIS',
          notes: 'Removeu uma forma de pagamento.',
          message: e.label,
        })
        toast('Cartão excluído com sucesso.', {
          backgroundColor: '#263238',
          color: '#fff',
        })
        await deleteCardPagarme(customerPagarmeID, e.cardPagarmeID)
      }
    } catch (r: any) {
      console.log(r)
      const message =
        r && r.errors[0] && r.errors[0].message ? r.errors[0].message : null
      if (message) {
        toast.error(message)
      }
    }
  }

  const value = useMemo(
    () => ({
      ...state,
      signOut,
      signIn,
      forgotPassword,
      forgotPasswordSubmit,
      signUp,
      resendSignUp,
      confirmSignUp,
      changePassword,
      changePasswordRequired,
      updateUser,
      updateProfile,
      listAddresses,
      updateUserAddresses,
      deleteUserAddresses,
      listPayMethods,
      updatePayMethod,
      deletePayMethod,
      getUser,
      getProfile,
    }),
    [state]
  )

  return <UserAuthContext.Provider value={value} {...props} />
}

/**
 * useUserAuth Component
 */
export const useUserAuth = () => {
  const context = React.useContext(UserAuthContext)
  if (context === undefined) {
    throw new Error(`useUserAuth must be used within a UserAuthProvider`)
  }
  return context
}

interface Props {
  children?: React.ReactNode
}

export const ManagedUserAuthContext: FC<Props> = ({ children }) => (
  <UserAuthProvider>{children}</UserAuthProvider>
)

/**
 * Check && Format userAuth
 */
async function checkUserAuth(cognitoUser: any, setLogUser: any) {
  try {
    const variables = { id: cognitoUser.username }

    const {
      data: { getUser },
    } = (await API.graphql(
      graphqlOperation(customQueries.getUserCustom, variables)
    )) as GraphQLResult<any>

    if (getUser) {
      if (getUser.name && getUser.name.toLowerCase() != getUser.search) {
        await API.graphql({
          query: mutations.updateUser,
          variables: {
            input: {
              id: getUser.id,
              search: getUser.name.toLowerCase(),
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })
      }

      if (!getUser.active) {
        const {
          data: { updateUser },
        } = (await API.graphql({
          query: mutations.updateUser,
          variables: {
            input: {
              id: cognitoUser.username,
              search: getUser.name.toLowerCase(),
              active: true,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<any>

        setLogUser({
          userID: cognitoUser.username,
          tag: 'ATIVAÇÃO DA CONTA',
          notes: `Ativou a conta de acesso.`,
        })

        return handleUserAuth(updateUser, cognitoUser)
      } else {
        return handleUserAuth(getUser, cognitoUser)
      }
    } else {
      const user: User = {
        id: cognitoUser.username,
        name:
          cognitoUser && cognitoUser.attributes && cognitoUser.attributes.name
            ? cognitoUser.attributes.name
            : '.',
        email:
          cognitoUser && cognitoUser.attributes && cognitoUser.attributes.email
            ? cognitoUser.attributes.email
            : cognitoUser &&
              cognitoUser.challengeParam &&
              cognitoUser.challengeParam.userAttributes &&
              cognitoUser.challengeParam.userAttributes.email
            ? cognitoUser.challengeParam.userAttributes.email
            : null,
        phone:
          cognitoUser &&
          cognitoUser.attributes &&
          cognitoUser.attributes.phone_number
            ? cognitoUser.attributes.phone_number
            : cognitoUser &&
              cognitoUser.challengeParam &&
              cognitoUser.challengeParam.userAttributes &&
              cognitoUser.challengeParam.userAttributes.phone_number
            ? cognitoUser.challengeParam.userAttributes.phone_number
            : null,
        status: UserStatus.ACTIVE,
        search:
          cognitoUser && cognitoUser.attributes && cognitoUser.attributes.name
            ? cognitoUser.attributes.name.toLowerCase()
            : '',
        active: true,
      }

      const createUserResult: any = await API.graphql({
        query: mutations.createUser,
        variables: { input: user },
      })

      await API.graphql({
        query: mutations.createProfile,
        variables: {
          input: {
            userID: cognitoUser.username,
            gender: GenderOptions.UNKNOWN,
          },
        },
      })

      setLogUser({
        userID: user.id,
        tag: 'ATIVAÇÃO DA CONTA',
        notes: `Ativou a conta de acesso.`,
      })

      if (
        createUserResult &&
        createUserResult.data &&
        createUserResult.data.createUser
      ) {
        const { id, name, email, active, avatar, phone, status } =
          createUserResult.data.createUser
        return handleUserAuth(
          { id, name, email, active, avatar, phone, status },
          cognitoUser
        )
      }

      return null
    }
  } catch (error) {
    console.log(error)
  }
}

async function handleUserAuth(user: any, cognitoUser: any) {
  // if (cognitoUser.signInUserSession.accessToken.payload['cognito:groups']) {}

  user.groups =
    cognitoUser &&
    cognitoUser.signInUserSession &&
    cognitoUser.signInUserSession.accessToken &&
    cognitoUser.signInUserSession.accessToken.payload['cognito:groups']
      ? cognitoUser.signInUserSession.accessToken.payload['cognito:groups']
      : []

  user.isAdmin = user.groups.includes('Admin')

  // user.token = (await Auth.currentSession()).getIdToken().getJwtToken()
  // user.token2 = (await Auth.currentSession()).getAccessToken().getJwtToken()

  return user
}
