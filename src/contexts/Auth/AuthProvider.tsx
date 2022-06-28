import { useLazyQuery, useMutation } from "@apollo/client";
import { removeCookies, setCookies } from "cookies-next";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { IUser } from "../Users/types";
import { SIGNIN } from "./gql/mutations";
import { GETCURRENTUSER } from "./gql/queries";
import { IAuthContext, IProfilePictureType } from "./types";
interface IProps {
  children: ReactNode;
}
const authContext = React.createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = (props: IProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [error, setError] = useState("");
  const [profilePictureVariant, setProfilePictureVariant] =
    useState<IProfilePictureType>(undefined);
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
        console.log(res.data.login);
        try {
          setCookies("token", res.data.login.access_token, {
            sameSite: "none",
            maxAge: 1800,
            secure: true,
          });
        } catch (error) {
          console.log("error", error);
        }
        localStorage.setItem("isLoggedIn", "true");
        await fetchCurrentUser();
      } else {
        localStorage.setItem("isLoggedIn", "false");
        setError("Your email or your password is incorrect");
      }
    } catch (error) {
      setError("Your email or your password is incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsConnected(false);
  };

  const fetchCurrentUser = useCallback(async () => {
    try {
      const userRes = await execWhoAmI();
      setCurrentUser(userRes.data?.getSignedInUser);
      return userRes;
    } catch (error) {
      localStorage.setItem("isLoggedIn", "false");
      setIsConnected(false);
    }
  }, [execWhoAmI]);

  const isVariantValid = (variant: string) => {
    return ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"].includes(
      variant
    );
  };

  useEffect(() => {
    (async () => {
      if (currentUser) {
        setIsConnected(true);
        const profilePictureVariant = localStorage.getItem(
          "profilePictureVariant"
        );
        if (profilePictureVariant)
          setProfilePictureVariant(
            profilePictureVariant as IProfilePictureType
          );
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
    profilePictureVariant,
    setProfilePictureVariant,
    isVariantValid,
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
