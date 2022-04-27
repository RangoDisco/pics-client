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
import PicturesProvider from "../contexts/Pictures/PicturesProvider";
import { RouteGuard } from "../components/RouteGuard";
// import * as dotenv from "dotenv";

function MyApp({ Component, pageProps }: AppProps) {
  // dotenv.config();

  const httpLink = createHttpLink({
    uri: "http://127.0.0.1:4000/graphql",
    credentials: "same-origin",
  });
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
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
        <PicturesProvider>
          <NavBar />
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
          <Footer />
        </PicturesProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
