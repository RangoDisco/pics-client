import { IUser } from "../Users/types";

export interface IPicturesContext {
  pictures: IPicture[];
  picture: IPicture | null;
  collections: ICollection[];
  collection: ICollection | null;
  isLoading: boolean;
  fetchPictures: () => Promise<void>;
  fetchPictureById: (id: number) => Promise<void>;
  fetchCollections: () => Promise<void>;
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
