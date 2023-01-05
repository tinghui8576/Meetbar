import { gql } from '@apollo/client';

export const ATTEND_POST_MUTATION = gql`
    mutation attendPost($id: ID!, $account: String!){
        attendPost(id:$id , account: $account){
            posts{
                location
            }
        }
    }
`;

