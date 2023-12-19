import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API } from 'aws-amplify'

import * as customQueries from 'graphql/custom-queries'
import * as queries from 'graphql/queries'
import * as mutations from 'graphql/mutations'

import {
    SignedUrlQueryVariables
} from 'API'

export const useSignedUrl = () => {
    const SignedUrl = async (variables: SignedUrlQueryVariables) => {
        const {
          data: { SignedUrl },
        } = (await API.graphql({
          query: queries.signedUrl,
          variables,
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<any>
    
        return { SignedUrl }
      }
    return {
        SignedUrl
    }
}