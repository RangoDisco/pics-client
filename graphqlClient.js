import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "cookies-next";

export const httpLink = createHttpLink({
  uri: `${process.env.HOST_API}/graphql`,
  credentials: "same-origin",
});
export const createAuthLink = ({ req }) => {
  const token = getCookie("token", { req });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  return authLink;
};
