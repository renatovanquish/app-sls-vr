import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

import * as queries from "graphql/queries";
import * as mutations from "graphql/mutations";

import {
  CreateQuizInput,
  UpdateQuizInput,
  DeleteQuizInput,
  ListQuizQueryVariables,
  ListQuizByStatusQueryVariables,
  CreateQuizQuestionInput,
  UpdateQuizQuestionInput,
  DeleteQuizQuestionInput,
  ListQuestionsByQuizQueryVariables
} from "API";

export const useQuiz = () => {
  const createQuiz = async (input: CreateQuizInput) => {
    const {
      data: { createQuiz },
    } = (await API.graphql({
      query: mutations.createQuiz,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>;
    return createQuiz;
  };

  const updateQuiz = async (input: UpdateQuizInput) => {
    const {
      data: { updateQuiz },
    } = (await API.graphql({
      query: mutations.updateQuiz,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>;
    return updateQuiz;
  };

  const deleteQuiz = async (input: DeleteQuizInput) => {
    try {
      await API.graphql({
        query: mutations.deleteQuiz,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const listQuiz = async (variables: ListQuizQueryVariables) => {
    const {
      data: {
        listQuiz: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listQuiz,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>;
    return { items, nextToken };
  };

  const listQuizByStatus = async (variables: ListQuizByStatusQueryVariables) => {
    const {
      data: {
        listQuizByStatus: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listQuizByStatus,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>;
    return { items, nextToken };
  };

  const createQuizQuestion = async (input: CreateQuizQuestionInput) => {
    const {
      data: { createQuizQuestion },
    } = (await API.graphql({
      query: mutations.createQuizQuestion,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>;
    return createQuizQuestion;
  };

  const updateQuizQuestion = async (input: UpdateQuizQuestionInput) => {
    const {
      data: { updateQuizQuestion },
    } = (await API.graphql({
      query: mutations.updateQuizQuestion,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<any>;
    return updateQuizQuestion;
  };

  const deleteQuizQuestion = async (input: DeleteQuizQuestionInput) => {
    try {
      await API.graphql({
        query: mutations.deleteQuizQuestion,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const listQuestionsByQuiz = async (variables: ListQuestionsByQuizQueryVariables) => {
    const {
      data: {
        listQuestionsByQuiz: { items, nextToken },
      },
    } = (await API.graphql({
      query: queries.listQuestionsByQuiz,
      variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>;
    return { items, nextToken };
  };

  return {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    listQuiz,
    listQuizByStatus,
    createQuizQuestion,
    updateQuizQuestion,
    deleteQuizQuestion,
    listQuestionsByQuiz
  };
};
