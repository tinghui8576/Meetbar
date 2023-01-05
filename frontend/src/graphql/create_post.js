import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
    mutation createPost($input: CreatePostInput!, $account: String!){
        createPost(input: $input, account: $account){
            title
            id
            host{
                name
            }
            users{
                name
            }
        }
    }
  
`;
