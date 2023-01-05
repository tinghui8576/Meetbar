import { gql } from '@apollo/client';

export const USER_QUERY = gql`
 query checkUser($account: String!, $password: String!){
    checkUser(account: $account, password: $password){
      name
      checked
    }
}`;