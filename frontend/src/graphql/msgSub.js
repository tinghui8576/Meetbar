import { gql } from "@apollo/client";

export const MESSAGE = gql`
  subscription message($id: ID!) {
    message(id: $id) {
      name
      sender
      body
    }
  }
`;
