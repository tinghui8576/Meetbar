import { gql } from '@apollo/client';

export const POST_ATTENDED_SUBSCRIPTION = gql`
  subscription postAttended($account: String!){
    postAttended(account: $account){
      id
      title
      date
      category
      location
      context
    }
  }
`;