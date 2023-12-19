import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API } from "aws-amplify";

import * as queries from 'graphql/queries'
import * as mutations from "graphql/mutations";

import { CreateQrCodeScanInput, ListQrCodeScansByUserQueryVariables } from "API";

export const useQrCodeScan = () => {
  const createQrCodeScan = async (input: CreateQrCodeScanInput) => {
    const {
      data: { createQrCodeScan },
    } = (await API.graphql({
      query: mutations.createQrCodeScan,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>;
    return createQrCodeScan;
  };

  const listQrCodeScansByUser = async (
    variables: ListQrCodeScansByUserQueryVariables
  ) => {
    const {
      data: {
        listQrCodeScansByUser: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listQrCodeScansByUser,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>
    return { items, nextToken }
  }

  return {
    createQrCodeScan,
    listQrCodeScansByUser
  };
};
