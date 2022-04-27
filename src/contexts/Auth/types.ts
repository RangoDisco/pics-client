import { IUser } from "../Users/types";

export interface IAuthContext {
  isConnected: boolean;
  setIsConnected: Function;
  currentUser: IUser | null;
  // eslint-disable-next-line no-unused-vars
  handleSignIn: (email: string, password: string) => Promise<void>;
  fetchCurrentUser: () => Promise<any>;
  error: string;
  isLoading: boolean;
  signOut: () => void;
}
