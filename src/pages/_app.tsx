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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThreeBody } from "@uiball/loaders";
import { ThemeProvider } from "next-themes";

const httpLink = createHttpLink({
  uri: `${process.env.HOST_API}/graphql`,
  credentials: "include",
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers": ["access-control-allow-credentials"],
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
      <ThemeProvider attribute="class" defaultTheme="light">
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
