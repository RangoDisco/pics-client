import React from "react";
import { IUser } from "../Users/types";

export interface IAuthContext {
  currentUser: IUser | null;
  // eslint-disable-next-line no-unused-vars
  handleSignIn: (email: string, password: string) => Promise<void>;
  fetchCurrentUser: () => Promise<any>;
  error: string;
  isLoading: boolean;
  signOut: () => void;
  profilePictureVariant: IProfilePictureType;
  setProfilePictureVariant: React.Dispatch<
    React.SetStateAction<IProfilePictureType>
  >;
  isVariantValid: (variant: string) => boolean;
}

export type IProfilePictureType =
  | "marble"
  | "beam"
  | "pixel"
  | "sunset"
  | "ring"
  | "bauhaus"
  | undefined;
