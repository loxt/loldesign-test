import { gql } from 'graphql-request';

export const GET_CALL_COSTS = gql`
  query getCallCosts {
    callCosts {
      id
      origin
      destiny
      price_per_minute
    }
  }
`;
