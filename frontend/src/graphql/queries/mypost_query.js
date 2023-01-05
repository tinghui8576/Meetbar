import { gql } from "@apollo/client";

export const MYPOST_QUERY = gql`
  query myPost($account: String!) {
    myPost(account: $account) {
      posts {
        id
        title
        date
        category
        location
        context
        host {
          name
          account
        }
        users {
          name
          account
        }
      }
    }
  }
`;
