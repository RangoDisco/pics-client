import { IUser } from "../Users/types";

export interface IAuthContext {
  isConnected: boolean;
  setIsConnected: Function;
  checkLogin: Function;
  currentUser: IUser;
  // eslint-disable-next-line no-unused-vars
  handleSignIn: (email: string, password: string) => Promise<void>;
  error: string;
  isLoading: boolean;
  signOut: () => void;
}
