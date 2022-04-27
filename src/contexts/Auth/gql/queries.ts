import { gql } from "@apollo/client";

export const GETCURRENTUSER = gql`
  query {
    getSignedInUser {
      id
      username
      role
    }
  }
`;
