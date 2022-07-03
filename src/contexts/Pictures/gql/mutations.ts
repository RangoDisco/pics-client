import { gql } from "@apollo/client";

export const UPLOADIMAGE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const CREATEPICTURE = gql`
  mutation CreatePicture($createPictureInput: CreatePictureInput!) {
    createPicture(createPictureInput: $createPictureInput) {
      id
    }
  }
`;
