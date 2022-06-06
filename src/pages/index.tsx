import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { useEffect, useState } from "react";
import { usePics } from "../contexts/Pictures/PicturesProvider";
import InfiniteScroll from "react-infinite-scroller";
import PicturesList from "../components/Pictures/PicturesList";
import { IPicture } from "../contexts/Pictures/types";
import { FETCHPICTURES } from "../contexts/Pictures/gql/queries";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createAuthLink, httpLink } from "../../graphqlClient";
import { useRouter } from "next/router";
import { checkCookies } from "cookies-next";

interface IProps {
  ssrPictures: IPicture[];
  ssrPicturesTotalCount: number;
  ssrError: any;
}

const Home: NextPage<IProps> = ({
  ssrPictures,
  ssrPicturesTotalCount,
  ssrError,
}: IProps) => {
  const [pictures, setPictures] = useState<IPicture[]>([]);
  const [picturesTotalCount, setPicturesTotalCount] = useState(0);
  const { fetchPictures, isLoading, error } = usePics();

  const router = useRouter();

  useEffect(() => {
    if (!ssrError) {
      setPictures(ssrPictures);
      setPicturesTotalCount(ssrPicturesTotalCount);
    } else if (ssrError === "Error: No token") {
      router.push("/signin");
    }
  }, [ssrPictures, ssrPicturesTotalCount, ssrError, router]);

  const fetchNextPage = async () => {
    const res = await fetchPictures(20, pictures.length);
    if (res) {
      setPictures((prevPics) => [...prevPics, ...res.pictures]);
      setPicturesTotalCount(res.picturesTotalCount);
    }
  };

  return (
    <>
      <Head>
        <title>Pic-Nic Photos</title>
        <meta name="description" content="Page photos" />
      </Head>
      <div className="bg-richBlack text-ghostWhite">
        {error && <h2 className="p-4 text-center text-red">{error}</h2>}
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            if (!isLoading) {
              fetchNextPage();
            }
          }}
          hasMore={picturesTotalCount > pictures?.length}
        >
          <PicturesList pictures={pictures} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const authLink = createAuthLink({ req });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  if (!checkCookies("token", { req })) {
    throw new Error("No token");
  }

  try {
    const res = await client.query({
      query: FETCHPICTURES,
      variables: {
        first: 20,
        after: 0,
      },
    });

    return {
      props: {
        ssrPictures: res.data.picturesPage.pictures,
        ssrPicturesTotalCount: res.data.picturesPage.totalCount,
      },
    };
  } catch (error) {
    return {
      props: {
        ssrError: "An error occured",
      },
    };
  }
};

export default Home;
