import { gql } from '@apollo/client';

 export const POST_MSG_QUERY = gql`
 query postMsg($id: ID!){
    postMsg(id:$id){
      name
      sender
      body
    }
  }`;