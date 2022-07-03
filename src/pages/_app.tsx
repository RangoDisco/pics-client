import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "../contexts/Auth/AuthProvider";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer";
import PicturesProvider from "../contexts/Pictures/PicturesProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThreeBody } from "@uiball/loaders";
import { ThemeProvider } from "next-themes";
import { getCookie } from "cookies-next";
import { createUploadLink } from "apollo-upload-client";

const createHttpLink = () => {
  const token = getCookie("token");
  return createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

export const graphqlClient = new ApolloClient({
  link: createHttpLink() as unknown as ApolloLink,
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
