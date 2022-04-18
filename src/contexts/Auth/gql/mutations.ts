import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation signin($username: String!, $password: String!) {
    signIn(createUserInput: { username: $username, password: $password })
  }
`;

export const GETCURRENTUSER = gql`
  query {
    getSignedInUser {
      id
      username
      role
    }
  }
`;
