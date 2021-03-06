import { gql } from "@apollo/client";

export const FETCHPICTURES = gql`
  query ($first: Int!, $after: Int!) {
    picturesPage(
      filterPictureInput: { pagination: { first: $first, after: $after } }
    ) {
      pictures {
        id
        contentUrl
        location
        date
        creationDate
        collections {
          id
          title
        }
      }
      totalCount
    }
  }
`;

export const FETCHPICTUREBYID = gql`
  query findOne($id: Int!) {
    picture(filterPictureInput: { id: $id }) {
      id
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
      contentUrl
      location
      date
      creationDate
    }
  }
`;

export const FETCHCOLLECTIONS = gql`
  query ($first: Int!, $after: Int!) {
    collectionsPage(
      filterCollectionInput: { pagination: { first: $first, after: $after } }
    ) {
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
          contentUrl
        }
        musicLink
      }
      totalCount
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
        contentUrl
        date
        location
      }
      musicLink
    }
  }
`;
