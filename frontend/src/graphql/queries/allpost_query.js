import { gql } from '@apollo/client';

export const ALLPOST_QUERY = gql`
 query allPost{
    allPost{
      title
      id
      date
      category
      location
      context
      host{
        name
        account
      }
      users{
        name
        account
      }
    }
  }
`;