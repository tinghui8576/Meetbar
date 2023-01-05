import { gql } from '@apollo/client';

export const CREATE_MESSAGE = gql`
mutation createMessage($id: ID!, $sender:String!, $body:String!){
    createMessage(id:$id, sender: $sender, body: $body){
      name
      sender
      body
    }
  }
`;