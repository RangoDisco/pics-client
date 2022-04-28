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

export const FETCHRANDOMPICTURE = gql`
  query findRandom {
    pictureRandom {
      id
      title
      contentUrl
      location
      date
      creationDate
    }
  }
`;

export const FETCHCOLLECTIONS = gql`
  query {
    collections {
      id
      title
      date
      description
      category {
        id
        title
      }
      tags {
        id
        title
      }
      pictures {
        id
        title
        contentUrl
      }
      musicLink
    }
  }
`;

export const FETCHCOLLECTIONBYID = gql`
  query ($id: Int!) {
    collection(id: $id) {
      id
      title
      date
      description
      date
      category {
        id
        title
      }
      tags {
        id
        title
      }
      pictures {
        id
        title
        contentUrl
        date
        location
      }
      musicLink
    }
  }
`;
