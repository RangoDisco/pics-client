import type { NextPage } from "next";
import Head from "next/head";

import { useEffect } from "react";
import { usePics } from "../contexts/Pictures/PicturesProvider";
import InfiniteScroll from "react-infinite-scroller";
import PicturesList from "../components/Pictures/PicturesList";

const Home: NextPage = () => {
  const { pictures, picturesTotalCount, fetchPictures, isLoading, error } =
    usePics();

  useEffect(() => {
    (async () => await fetchPictures(20, 0, []))();
  }, [fetchPictures]);

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
              fetchPictures(20, pictures.length, pictures);
            }
          }}
          hasMore={picturesTotalCount > pictures.length}
        >
          <PicturesList pictures={pictures} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
