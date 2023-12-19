import { fetchWrapper } from 'lib/fetch-wrapper'
import { DocTypes } from 'API'

import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'

import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

export const usePagarme = () => {
  const getCustomerIDPagarme = async (user: any) => {
    if (!user || !user.profile || !user.profile.doc) {
      return null
    }

    const phone = user.phone.replace(/\D/g, '')
    const country_code = phone.substring(0, 2)
    const number = phone.substring(4, 13)
    const area_code = phone.substring(2, 4)

    const body = {
      name: user.name,
      email: user.email,
      code: user.id,
      document: user.profile.doc,
      type: 'individual',
      document_type:
        user.profile && user.profile.docType
          ? user.profile.docType
          : DocTypes.CPF,
      phones: {
        mobile_phone: {
          country_code,
          number,
          area_code,
        },
      },
    }

    const customer = await fetchWrapper.post('/api/pagarme/customers', body)

    if (customer && customer.data && customer.data.id) {
      await API.graphql(
        graphqlOperation(mutations.updateProfile, {
          input: {
            userID: user.id,
            customerPagarmeID: customer.data.id,
          },
        })
      )
      return customer.data.id
    }

    return null
  }

  const updateCustomerPagarme = async (
    customerPagarmeID: string,
    body: any
  ) => {
    return customerPagarmeID
      ? await fetchWrapper.put(
          `/api/pagarme/customers/${customerPagarmeID}`,
          body
        )
      : null
  }

  const createAddressPagarme = async (customerPagarmeID: string, body: any) => {
    return customerPagarmeID
      ? await fetchWrapper.post(
          `/api/pagarme/customers/${customerPagarmeID}/addresses`,
          body
        )
      : null
  }

  const deleteAddressPagarme = async (
    customerPagarmeID: string,
    addressPagarmeID: string
  ) => {
    return customerPagarmeID && addressPagarmeID
      ? await fetchWrapper.delete(
          `/api/pagarme/customers/${customerPagarmeID}/addresses/${addressPagarmeID}`
        )
      : null
  }

  const createCardsPagarme = async (customerPagarmeID: string, body: any) => {
    return customerPagarmeID
      ? await fetchWrapper.post(
          `/api/pagarme/customers/${customerPagarmeID}/cards`,
          body
        )
      : null
  }

  const deleteCardPagarme = async (
    customerPagarmeID: string,
    cardPagarmeID: string
  ) => {
    return customerPagarmeID && cardPagarmeID
      ? await fetchWrapper.delete(
          `/api/pagarme/customers/${customerPagarmeID}/cards/${cardPagarmeID}`
        )
      : null
  }

  const updateCardsPagarme = async (
    customerPagarmeID: string,
    cardPagarmeID: string,
    body: any
  ) => {
    return customerPagarmeID && cardPagarmeID
      ? await fetchWrapper.put(
          `/api/pagarme/customers/${customerPagarmeID}/cards/${cardPagarmeID}`,
          body
        )
      : null
  }

  const createOrderPagarme = async (body: any) => {
    return await fetchWrapper.post(`/api/pagarme/orders`, body)
  }

  return {
    getCustomerIDPagarme,
    updateCustomerPagarme,
    createAddressPagarme,
    deleteAddressPagarme,
    createCardsPagarme,
    deleteCardPagarme,
    updateCardsPagarme,
    createOrderPagarme,
  }
}
