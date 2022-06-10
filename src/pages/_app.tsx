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
import { ThreeBody } from "@uiball/loaders";
import { ThemeProvider, useTheme } from "next-themes";

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
  const { setTheme } = useTheme();

  useEffect(() => {
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
  }, [router]);

  useEffect(() => {
    const chosenTheme = localStorage.getItem("chosenTheme");
    if (chosenTheme) {
      setTheme(chosenTheme);
    } else {
      setTheme("light");
    }
  }, [setTheme]);

  return (
    <ApolloProvider client={graphqlClient}>
      <ThemeProvider attribute="class">
        <AuthProvider>
          <PicturesProvider>
            <NavBar />
            <div
              className="bg-silk dark:bg-richBlack"
              style={{
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
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
