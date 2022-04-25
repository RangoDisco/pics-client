import { IUser } from "../Users/types";
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
  category: string;
  tags: string[];
  musicLink: string;
}
