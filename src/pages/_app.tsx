import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "../contexts/Auth/AuthProvider";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import * as dotenv from "dotenv";

function MyApp({ Component, pageProps }: AppProps) {
  // dotenv.config();

  const httpLink = createHttpLink({
    uri: "http://locahost:4000/graphql",
  });
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": "*",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
