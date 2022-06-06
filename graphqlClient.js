import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { checkCookies, getCookie } from "cookies-next";

export const createApolloClient = ({ req }) => {
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

  const httpLink = createHttpLink({
    uri: `${process.env.HOST_API}/graphql`,
    credentials: "same-origin",
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const execQuery = async (query, variables, { req }) => {
  const client = createApolloClient({ req });

  if (!checkCookies("token", { req })) {
    throw new Error("No token");
  }

  const res = await client.query({
    query: query,
    ...(variables && {
      variables: {
        ...variables,
      },
    }),
  });

  return res;
};
