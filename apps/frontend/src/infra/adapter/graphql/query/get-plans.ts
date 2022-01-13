import { gql } from 'graphql-request';

export const GET_PLANS = gql`
  query getPlans {
    plans {
      name
      id
      free_minutes
    }
  }
`;
