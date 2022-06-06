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
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PicturesList from "../components/Pictures/PicturesList";
import CollectionsList from "../components/Collection/CollectionsList";
import { ThreeBody } from "@uiball/loaders";

const httpLink = createHttpLink({
  uri: `${process.env.HOST_API}/graphql`,
  credentials: "same-origin",
});
const authLink = setContext((_, { headers }) => {
  const token = getCookie("token");
  return {
    headers: {
      ...headers,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const start = () => setIsLoading(true);
  const end = () => setIsLoading(false);

  useEffect(() => {
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
  }, [router]);

  return (
    <ApolloProvider client={graphqlClient}>
      <AuthProvider>
        <PicturesProvider>
          <NavBar />
          <div
            style={{
              backgroundColor: "#111418",
              color: "white",
              minHeight: "100vh",
              minWidth: "95vw",
            }}
          >
            {isLoading ? (
              <div>
                <div className="flex justify-center items-center h-full">
                  <ThreeBody size={35} speed={1.1} color="white" />
                </div>
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </div>
          <Footer />
        </PicturesProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
