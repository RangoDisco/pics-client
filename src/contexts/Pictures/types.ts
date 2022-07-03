import { FetchResult } from "@apollo/client";
import { IUser } from "../Users/types";

export interface IPicturesContext {
  picture: IPicture | null;
  collection: ICollection | null;
  isLoading: boolean;
  error: string;
  fetchPictures: (
    first: number,
    after: number
  ) => Promise<
    { pictures: IPicture[]; picturesTotalCount: number } | undefined
  >;
  fetchPictureById: (id: number) => Promise<void>;
  fetchRandomPicture: () => Promise<void>;
  fetchCollections: (
    first: number,
    after: number
  ) => Promise<
    { collections: ICollection[]; collectionsTotalCount: number } | undefined
  >;
  fetchCollectionById: (id: number) => Promise<void>;
  uploadPicture: (
    file: any
  ) => Promise<
    undefined | FetchResult<any, Record<string, any>, Record<string, any>>
  >;
  createPicture: (pictureBody: IPictureInput) => Promise<boolean>;
}
export interface IPicture {
  id: number;
  contentUrl: string;
  location: string;
  date: Date;
  author: IUser;
  creationDate: Date;
  isActive: boolean;
}

export interface IPictureInput {
  location: string;
  date: string;
  contentUrl: string;
  collections: number[];
}

export interface ICollection {
  id: number;
  title: string;
  date: Date;
  description: string;
  pictures: IPicture[];
  author: IUser;
  category: ICategory;
  tags: ITag[];
  musicLink: string;
}

export interface ICategory {
  id: number;
  title: string;
}

export interface ITag {
  id: number;
  title: string;
}
