import { FC, useContext, useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { useAuth } from "../contexts/Auth/AuthProvider";

const SignIn: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { handleSignIn } = useAuth();

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    console.log(username, password);
  };
  useEffect(() => {
    console.log(!!username && !!password);
    setIsFormValid(!!username && !!password);
  }, [username, password]);
  return (
    <div style={{ minHeight: "100vh" }}>
      <form
        className="flex flex-col justify-center items-center bg-richBlack text-ghostWhite"
        style={{ height: "100vh" }}
        onSubmit={handleFormSubmit}
      >
        <div className="w-1/4 flex flex-col">
          <TextInput
            label="username"
            type="text"
            value={username}
            setValue={setUsername}
            required={true}
          />
        </div>
        <div className="w-1/4 flex flex-col mt-8">
          <TextInput
            label="password"
            type="password"
            value={password}
            setValue={setPassword}
            required={true}
          />
          <button
            disabled={!isFormValid}
            type="submit"
            className={`mt-16 w-1/2 self-center bg-munsellBlue rounded-full p-2 transition:colors duration-200 ${
              !isFormValid && "opacity-25"
            }`}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
