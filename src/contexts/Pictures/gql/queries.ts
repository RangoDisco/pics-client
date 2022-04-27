import { gql } from "@apollo/client";

export const FETCHPICTURES = gql`
  query {
    pictures {
      id
      title
      contentUrl
      location
      date
      creationDate
      collections {
        id
        title
      }
    }
  }
`;

export const FETCHPICTUREBYID = gql`
  query findOne($id: Int!) {
    picture(filterPictureInput: { id: $id }) {
      id
      title
      contentUrl
      location
      date
      creationDate
    }
  }
`;
