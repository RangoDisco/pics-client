import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { checkCookies, getCookie } from "cookies-next";

export const createApolloClient = ({ req }) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "Access-Control-Allow-Credentials": true,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: `${process.env.HOST_API}/graphql`,
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
