import { FC, useContext, useEffect, useState } from "react";
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
          <label htmlFor="username" className="self-start">
            Username
          </label>
          <input
            required
            name="username"
            id="username"
            className="mt-2 shadow border-b bg-richBlack border-ghostWhite transition-colors duration-200 focus:outline-none focus:border-b-munsellBlue"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="w-1/4 flex flex-col mt-8">
          <label htmlFor="password" className="textMunsellBlue self-start">
            Password
          </label>
          <input
            required
            name="password"
            id="password"
            type="password"
            className="mt-2 shadow border-b bg-richBlack border-ghostWhite focus:outline-none focus:border-b-munsellBlue"
            onChange={(e) => setPassword(e.target.value)}
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
