import { IUser } from "../Users/types";

export interface IPicturesContext {
  pictures: IPicture[];
  picturesTotalCount: number;
  picture: IPicture | null;
  collections: ICollection[];
  collectionsTotalCount: number;
  collection: ICollection | null;
  isLoading: boolean;
  error: string;
  fetchPictures: (
    first: number,
    after: number,
    exPics: IPicture[]
  ) => Promise<void>;
  fetchPictureById: (id: number) => Promise<void>;
  fetchRandomPicture: () => Promise<void>;
  fetchCollections: (
    first: number,
    after: number,
    exColls: ICollection[]
  ) => Promise<void>;
  fetchCollectionById: (id: number) => Promise<void>;
}
export interface IPicture {
  id: number;
  title: string;
  contentUrl: string;
  location: string;
  date: Date;
  author: IUser;
  creationDate: Date;
  isActive: boolean;
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
