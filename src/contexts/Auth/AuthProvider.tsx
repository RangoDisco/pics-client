import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { IUser } from "../Users/types";
import { SIGNIN } from "./gql/mutations";
import { GETCURRENTUSER } from "./gql/queries";
import { IAuthContext } from "./types";
interface IProps {
  children: ReactNode;
}
const authContext = React.createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = (props: IProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [execWhoAmI] = useLazyQuery(GETCURRENTUSER);
  const [doSignIn] = useMutation(SIGNIN);

  const handleSignIn = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await doSignIn({
        variables: {
          username: username,
          password: password,
        },
      });
      if (res.data.login) {
        localStorage.setItem("token", res.data.login.access_token);
        await fetchCurrentUser();
      } else {
        setError("Your email or your password is incorrect");
      }
    } catch (error) {
      setError("Your email or your password is incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };

  const fetchCurrentUser = useCallback(async () => {
    try {
      const userRes = await execWhoAmI();
      setCurrentUser(userRes.data?.getSignedInUser);
      return userRes;
    } catch (error) {
      localStorage.removeItem("token");
      setIsConnected(false);
    }
  }, [execWhoAmI]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        setIsConnected(true);
      } else {
        if (localStorage.getItem("token")) {
          await fetchCurrentUser();
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      }
    })();
  }, [currentUser, fetchCurrentUser]);

  const contextValue: IAuthContext = {
    isConnected,
    setIsConnected,
    currentUser,
    fetchCurrentUser,
    handleSignIn,
    error,
    isLoading,
    signOut,
  };

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export function useAuth() {
  return useContext(authContext);
}
export default AuthProvider;
