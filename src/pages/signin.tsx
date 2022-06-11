import { ThreeBody } from "@uiball/loaders";
import Head from "next/head";
import Router from "next/router";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { useAuth } from "../contexts/Auth/AuthProvider";

const SignIn: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { handleSignIn, isLoading, error } = useAuth();

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await handleSignIn(username, password);
    !error && !isLoading && Router.push("/");
  };

  useEffect(() => {
    setIsFormValid(!!username && !!password);
  }, [username, password]);

  return (
    <>
      <Head>
        <title>Pic-Nic Login</title>
        <meta name="description" content="Page photos" />
      </Head>
      <div className="h-screen flex justify-center items-center">
        <form
          className="h-fit lg:w-1/4 md:w-1/2 bg-silk dark:bg-richBlack text-richBlack dark:text-ghostWhite"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col">
            <TextInput
              label="username"
              type="text"
              value={username}
              setValue={setUsername}
              required={true}
            />
          </div>
          <div className="flex flex-col mt-8">
            <TextInput
              label="password"
              type="password"
              value={password}
              setValue={setPassword}
              required={true}
            />
          </div>
          {error && <p className="mt-2">{error}</p>}
          <div className="mt-16 flex justify-center">
            <button
              disabled={!isFormValid || isLoading}
              type="submit"
              className={`w-full lg:w-1/2 self-center bg-rose dark:bg-munsellBlue rounded-full p-2 transition:colors duration-200 text-ghostWhite ${
                (!isFormValid || isLoading) && "opacity-25"
              }`}
            >
              {!isLoading ? (
                "Sign in"
              ) : (
                <div className="flex justify-center items-center">
                  <ThreeBody size={35} speed={1.1} color="white" />
                  <p className="self-center">Loading</p>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
