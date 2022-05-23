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
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer";
import PicturesProvider from "../contexts/Pictures/PicturesProvider";
import { RouteGuard } from "../components/RouteGuard";

function MyApp({ Component, pageProps }: AppProps) {
  const httpLink = createHttpLink({
    uri: `${process.env.HOST_API}/graphql`,
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
          <div
            style={{
              backgroundColor: "#111418",
              minHeight: "100vh",
              minWidth: "95vw",
            }}
          >
            <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard>
          </div>
          <Footer />
        </PicturesProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
