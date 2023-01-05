import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation  createUser($input:CreateUserInput!){
    createUser(input: $input){
      name
      account
      password
      checked
    }
  }
`;